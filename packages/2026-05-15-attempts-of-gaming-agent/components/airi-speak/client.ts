import type {
  AiriWebSocketEvent,
  CreateSparkNotifyEventOptions,
  ModuleIdentity,
} from './protocol'

import {
  createModuleIdentity,
  createProtocolEvent,
  createSparkNotifyEvent,
  parseAiriEventMessage,
} from './protocol'

interface AiriSpeakClientOptions {
  url?: string
  token?: string
  sourceId?: string
  sourceInstanceId?: string
}

type ClientState = 'idle' | 'connecting' | 'ready'

let socket: WebSocket | undefined
let state: ClientState = 'idle'
let readyPromise: Promise<void> | undefined
let currentKey = ''

function sendRaw(event: AiriWebSocketEvent) {
  socket?.send(JSON.stringify(event))
}

function createAnnounceEvent(source: ModuleIdentity) {
  return createProtocolEvent('module:announce', {
    name: source.plugin.id,
    identity: source,
    possibleEvents: ['spark:notify'],
  }, source)
}

function createAuthenticateEvent(token: string, source: ModuleIdentity) {
  return createProtocolEvent('module:authenticate', { token }, source)
}

function resetConnection() {
  state = 'idle'
  readyPromise = undefined
  socket = undefined
}

function resolveUrl(url?: string) {
  return url || import.meta.env.VITE_AIRI_WS_URL || 'ws://localhost:6121/ws'
}

export async function ensureAiriConnection(options: AiriSpeakClientOptions = {}) {
  if (typeof window === 'undefined')
    return

  const url = resolveUrl(options.url)
  const source = createModuleIdentity(options.sourceId, options.sourceInstanceId)
  const key = `${url}|${options.token ?? ''}|${source.id}`

  if (state === 'ready' && socket?.readyState === WebSocket.OPEN && currentKey === key)
    return

  if (state === 'connecting' && readyPromise && currentKey === key)
    return readyPromise

  socket?.close()
  state = 'connecting'
  currentKey = key

  readyPromise = new Promise<void>((resolve, reject) => {
    const ws = new WebSocket(url)
    socket = ws

    const failTimer = window.setTimeout(() => {
      resetConnection()
      reject(new Error(`Timed out connecting to AIRI websocket at ${url}`))
    }, 5000)

    function markReady() {
      window.clearTimeout(failTimer)
      sendRaw(createAnnounceEvent(source))
      state = 'ready'
      resolve()
    }

    ws.addEventListener('open', () => {
      if (options.token)
        sendRaw(createAuthenticateEvent(options.token, source))
    })

    ws.addEventListener('message', (message) => {
      if (typeof message.data !== 'string')
        return

      try {
        const event = parseAiriEventMessage(message.data)
        const data = event?.data as { authenticated?: boolean } | undefined
        if (event?.type === 'module:authenticated' && data?.authenticated)
          markReady()
      }
      catch {
        // Ignore non-JSON transport messages.
      }
    })

    ws.addEventListener('error', () => {
      window.clearTimeout(failTimer)
      resetConnection()
      reject(new Error(`Failed to connect to AIRI websocket at ${url}`))
    })

    ws.addEventListener('close', () => {
      if (socket === ws)
        resetConnection()
    })
  })

  return readyPromise
}

export async function sendAiriSparkNotify(options: CreateSparkNotifyEventOptions & AiriSpeakClientOptions) {
  await ensureAiriConnection(options)

  if (socket?.readyState !== WebSocket.OPEN)
    throw new Error('AIRI websocket is not open')

  sendRaw(createSparkNotifyEvent(options))
}
