import type { Client as AiriClient, WebSocketEventOf, WebSocketLikeConstructor } from '@proj-airi/server-sdk'
import type { CreateSparkNotifyEventOptions } from './protocol'

import { Client } from '@proj-airi/server-sdk'

import { createModuleIdentity, createSparkNotifyEvent } from './protocol'

interface AiriSpeakClientOptions {
  url?: string
  token?: string
  sourceId?: string
  sourceInstanceId?: string
}

let client: AiriClient | undefined
let readyPromise: Promise<void> | undefined
let currentKey = ''

function resolveUrl(url?: string) {
  return url || import.meta.env.VITE_AIRI_WS_URL || 'ws://localhost:6121/ws'
}

function resolveToken(token?: string) {
  return token || import.meta.env.VITE_AIRI_WS_TOKEN || undefined
}

function closeCurrentClient() {
  client?.close()
  client = undefined
  readyPromise = undefined
}

export async function ensureAiriConnection(options: AiriSpeakClientOptions = {}) {
  if (typeof window === 'undefined')
    return

  const url = resolveUrl(options.url)
  const token = resolveToken(options.token)
  const source = createModuleIdentity(options.sourceId, options.sourceInstanceId)
  const key = `${url}|${token ?? ''}|${source.id}`

  if (client?.isReady && currentKey === key)
    return

  if (readyPromise && currentKey === key)
    return readyPromise

  closeCurrentClient()
  currentKey = key

  client = new Client({
    name: source.plugin.id,
    url,
    token,
    identity: source,
    possibleEvents: ['spark:notify'],
    websocketConstructor: WebSocket as unknown as WebSocketLikeConstructor,
    heartbeat: {
      readTimeout: 60_000,
      pingInterval: 20_000,
    },
    onError: (error) => {
      console.warn('[AiriSpeak] AIRI websocket client error', error)
    },
  })

  readyPromise = client.ready({ timeout: 10_000 }).finally(() => {
    readyPromise = undefined
  })

  return readyPromise
}

export async function sendAiriSparkNotify(options: CreateSparkNotifyEventOptions & AiriSpeakClientOptions) {
  await ensureAiriConnection(options)

  if (!client?.isReady)
    throw new Error('AIRI websocket client is not ready')

  client.send(createSparkNotifyEvent(options) as WebSocketEventOf<'spark:notify'>)
}
