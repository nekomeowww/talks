import type { Client as AiriClient, WebSocketEventOf, WebSocketLikeConstructor } from '@proj-airi/server-sdk'
import type { InjectionKey } from 'vue'
import type { CreateSparkNotifyEventOptions } from './protocol'

import { Client } from '@proj-airi/server-sdk'

import { createModuleIdentity, createSparkNotifyEvent } from './protocol'

export interface AiriSpeakClientOptions {
  url?: string
  token?: string
  sourceId?: string
  sourceInstanceId?: string
}

interface CreateAiriSpeakClientServiceOptions {
  clientConstructor?: typeof Client
  websocketConstructor?: WebSocketLikeConstructor
}

export interface AiriSpeakClientService {
  close: () => void
  ensureConnection: (options?: AiriSpeakClientOptions) => Promise<void> | undefined
  sendSparkNotify: (options: CreateSparkNotifyEventOptions & AiriSpeakClientOptions) => Promise<void>
}

export const airiSpeakClientKey = Symbol('airi-speak-client') as InjectionKey<AiriSpeakClientService>

function resolveUrl(url?: string) {
  return url || import.meta.env?.VITE_AIRI_WS_URL || 'ws://localhost:6121/ws'
}

function resolveToken(token?: string) {
  return token || import.meta.env?.VITE_AIRI_WS_TOKEN || undefined
}

export function createAiriSpeakClientService(options: CreateAiriSpeakClientServiceOptions = {}): AiriSpeakClientService {
  const clientConstructor = options.clientConstructor ?? Client

  let client: AiriClient | undefined
  let readyPromise: Promise<void> | undefined
  let currentKey = ''

  function close() {
    client?.close()
    client = undefined
    readyPromise = undefined
  }

  async function ensureConnection(connectionOptions: AiriSpeakClientOptions = {}) {
    if (typeof window === 'undefined')
      return

    const url = resolveUrl(connectionOptions.url)
    const token = resolveToken(connectionOptions.token)
    const source = createModuleIdentity(connectionOptions.sourceId, connectionOptions.sourceInstanceId)
    const key = `${url}|${token ?? ''}|${source.plugin.id}|${source.id}`

    if (client?.isReady && currentKey === key)
      return

    if (readyPromise && currentKey === key)
      return readyPromise

    close()
    currentKey = key

    const websocketConstructor = options.websocketConstructor ?? (globalThis.WebSocket as unknown as WebSocketLikeConstructor)

    client = new clientConstructor({
      name: source.plugin.id,
      url,
      token,
      identity: source,
      possibleEvents: ['spark:notify'],
      websocketConstructor,
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

  async function sendSparkNotify(connectionOptions: CreateSparkNotifyEventOptions & AiriSpeakClientOptions) {
    await ensureConnection(connectionOptions)

    if (!client?.isReady)
      throw new Error('AIRI websocket client is not ready')

    client.send(createSparkNotifyEvent(connectionOptions) as WebSocketEventOf<'spark:notify'>)
  }

  return {
    close,
    ensureConnection,
    sendSparkNotify,
  }
}

export const defaultAiriSpeakClient = createAiriSpeakClientService()

export async function ensureAiriConnection(options: AiriSpeakClientOptions = {}) {
  return defaultAiriSpeakClient.ensureConnection(options)
}

export async function sendAiriSparkNotify(options: CreateSparkNotifyEventOptions & AiriSpeakClientOptions) {
  return defaultAiriSpeakClient.sendSparkNotify(options)
}
