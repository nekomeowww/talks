export interface ModuleIdentity {
  kind: 'plugin'
  plugin: {
    id: string
    version?: string
  }
  id: string
}

export interface AiriWebSocketEvent<T extends string = string, D = unknown> {
  type: T
  data: D
  metadata: {
    source: ModuleIdentity
    event: {
      id: string
      parentId?: string
    }
  }
}

export interface AiriEventMessage {
  type: string
  data?: unknown
}

export interface SparkNotifyEventData {
  id: string
  eventId: string
  lane?: string
  kind: 'alarm' | 'ping' | 'reminder'
  urgency: 'immediate' | 'soon' | 'later'
  headline: string
  note?: string
  payload?: Record<string, unknown>
  ttlMs?: number
  requiresAck?: boolean
  destinations: string[]
  metadata?: Record<string, unknown>
}

export interface CreateSparkNotifyEventOptions {
  text: string
  headline?: string
  sourceId?: string
  sourceInstanceId?: string
  lane?: string
  kind?: SparkNotifyEventData['kind']
  urgency?: SparkNotifyEventData['urgency']
  destinations?: string[]
  payload?: Record<string, unknown>
  ttlMs?: number
  requiresAck?: boolean
  metadata?: Record<string, unknown>
}

export function normalizeSpeakText(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

export function createEventId(prefix = 'slidev') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function createModuleIdentity(sourceId = 'slidev-airi-speaker', sourceInstanceId = sourceId): ModuleIdentity {
  return {
    kind: 'plugin',
    plugin: { id: sourceId },
    id: sourceInstanceId,
  }
}

export function createProtocolEvent<T extends string, D>(
  type: T,
  data: D,
  source: ModuleIdentity,
  parentId?: string,
): AiriWebSocketEvent<T, D> {
  return {
    type,
    data,
    metadata: {
      source,
      event: {
        id: createEventId(),
        parentId,
      },
    },
  }
}

export function createSparkNotifyEvent(options: CreateSparkNotifyEventOptions): AiriWebSocketEvent<'spark:notify', SparkNotifyEventData> {
  const text = normalizeSpeakText(options.text)
  const source = createModuleIdentity(options.sourceId, options.sourceInstanceId)

  return createProtocolEvent('spark:notify', {
    id: createEventId('spark'),
    eventId: createEventId('spark-event'),
    lane: options.lane,
    kind: options.kind ?? 'ping',
    urgency: options.urgency ?? 'immediate',
    headline: options.headline ?? text,
    note: text,
    payload: options.payload,
    ttlMs: options.ttlMs,
    requiresAck: options.requiresAck,
    destinations: options.destinations ?? ['proj-airi:stage-*'],
    metadata: options.metadata,
  }, source)
}

export function parseAiriEventMessage(text: string): AiriEventMessage | undefined {
  const parsed = JSON.parse(text) as unknown
  if (!parsed || typeof parsed !== 'object')
    return

  if ('type' in parsed && typeof parsed.type === 'string')
    return parsed as AiriEventMessage

  if ('json' in parsed) {
    const json = parsed.json
    if (json && typeof json === 'object' && 'type' in json && typeof json.type === 'string')
      return json as AiriEventMessage
  }
}
