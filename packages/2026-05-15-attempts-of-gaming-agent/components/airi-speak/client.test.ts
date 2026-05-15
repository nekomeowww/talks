/* eslint-disable test/no-import-node-test */
import assert from 'node:assert/strict'
import test from 'node:test'

import { createAiriSpeakClientService } from './client'

class FakeWebSocket {}

interface FakeClientOptions {
  identity: {
    id: string
    plugin: {
      id: string
    }
  }
  token?: string
  url: string
}

class FakeClient {
  static instances: FakeClient[] = []

  closed = false
  isReady = false
  sent: unknown[] = []

  constructor(readonly options: FakeClientOptions) {
    FakeClient.instances.push(this)
  }

  async ready() {
    this.isReady = true
  }

  close() {
    this.closed = true
    this.isReady = false
  }

  send(event: unknown) {
    this.sent.push(event)
  }
}

function createService() {
  FakeClient.instances = []
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {},
  })

  return createAiriSpeakClientService({
    clientConstructor: FakeClient as never,
    websocketConstructor: FakeWebSocket as never,
  })
}

test('reuses one AIRI websocket client service for matching connection options', async () => {
  const service = createService()

  await service.sendSparkNotify({
    text: 'First cue',
    url: 'ws://airi.local/ws',
    token: 'secret',
    sourceId: 'slidev-airi-speaker',
  })
  await service.sendSparkNotify({
    text: 'Second cue',
    url: 'ws://airi.local/ws',
    token: 'secret',
    sourceId: 'slidev-airi-speaker',
  })

  assert.equal(FakeClient.instances.length, 1)
  assert.equal(FakeClient.instances[0].sent.length, 2)
})

test('reconnects when websocket identity changes', async () => {
  const service = createService()

  await service.ensureConnection({
    url: 'ws://airi.local/ws',
    sourceId: 'slidev-airi-speaker',
    sourceInstanceId: 'slide-a',
  })
  await service.ensureConnection({
    url: 'ws://airi.local/ws',
    sourceId: 'slidev-airi-speaker',
    sourceInstanceId: 'slide-b',
  })

  assert.equal(FakeClient.instances.length, 2)
  assert.equal(FakeClient.instances[0].closed, true)
  assert.equal(FakeClient.instances[1].options.identity.id, 'slide-b')
})
