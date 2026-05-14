/* eslint-disable test/no-import-node-test */
import assert from 'node:assert/strict'
import test from 'node:test'

import { createSparkNotifyEvent, normalizeSpeakText, parseAiriEventMessage } from './protocol'

test('normalizes component text content before sending it to AIRI', () => {
  assert.equal(normalizeSpeakText('\n  AIRI, say this line.\n\n'), 'AIRI, say this line.')
})

test('uses component text as the spark notify note payload', () => {
  const event = createSparkNotifyEvent({
    text: 'AIRI, introduce this section.',
    headline: 'Slide cue',
    sourceId: 'slidev-airi-speaker',
  })

  assert.equal(event.type, 'spark:notify')
  assert.equal(event.data.headline, 'Slide cue')
  assert.equal(event.data.note, 'AIRI, introduce this section.')
  assert.deepEqual(event.data.destinations, ['proj-airi:stage-*'])
  assert.equal(event.metadata.source.plugin.id, 'slidev-airi-speaker')
})

test('parses superjson wrapped websocket responses from AIRI', () => {
  const event = parseAiriEventMessage(JSON.stringify({
    json: {
      type: 'module:authenticated',
      data: { authenticated: true },
    },
  }))

  assert.equal(event?.type, 'module:authenticated')
  assert.deepEqual(event?.data, { authenticated: true })
})
