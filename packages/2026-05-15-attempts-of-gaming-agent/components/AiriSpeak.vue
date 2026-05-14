<script setup lang="ts">
import type { VNode, VNodeArrayChildren } from 'vue'
import type { SparkNotifyEventData } from './airi-speak/protocol'

import { onSlideLeave, useIsSlideActive, useNav, useSlideContext } from '@slidev/client'
import { computed, shallowRef, useSlots, watch } from 'vue'

import { sendAiriSparkNotify } from './airi-speak/client'
import { normalizeSpeakText } from './airi-speak/protocol'

const props = withDefaults(defineProps<{
  at?: number
  url?: string
  token?: string
  headline?: string
  lane?: string
  kind?: SparkNotifyEventData['kind']
  urgency?: SparkNotifyEventData['urgency']
  destinations?: string[]
  once?: boolean
  replayOnReenter?: boolean
  sourceId?: string
  sourceInstanceId?: string
  cueId?: string
  context?: 'slide' | 'presenter' | 'both'
  debug?: boolean
}>(), {
  at: 0,
  kind: 'ping',
  urgency: 'immediate',
  once: true,
  replayOnReenter: false,
  sourceId: 'slidev-airi-speaker',
  context: 'slide',
})

const slots = useSlots()
const isActive = useIsSlideActive()
const nav = useNav()
const { $clicks, $page, $renderContext } = useSlideContext()
const hasTriggered = shallowRef(false)
const errorMessage = shallowRef('')

function textFromChildren(children: VNodeArrayChildren | string | null | undefined): string {
  if (!children)
    return ''

  if (typeof children === 'string')
    return children

  return children
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number')
        return String(child)

      if (Array.isArray(child))
        return textFromChildren(child)

      return textFromVNode(child)
    })
    .join(' ')
}

function textFromVNode(node: VNode): string {
  if (typeof node.children === 'string')
    return node.children

  if (Array.isArray(node.children))
    return textFromChildren(node.children)

  return ''
}

const speakText = computed(() => normalizeSpeakText(textFromChildren(slots.default?.())))

function hashCueKey(value: string) {
  let hash = 5381
  for (let i = 0; i < value.length; i += 1)
    hash = ((hash << 5) + hash) ^ value.charCodeAt(i)

  return (hash >>> 0).toString(36)
}

function cueStorageKey() {
  const rawKey = props.cueId ?? [
    props.sourceId,
    props.sourceInstanceId,
    $page.value,
    props.at,
    props.headline,
    speakText.value,
  ].join('|')

  return `slidev-airi-speak:${hashCueKey(rawKey)}`
}

function claimCue() {
  if (!props.once || typeof window === 'undefined')
    return true

  const key = cueStorageKey()
  const now = Date.now()

  try {
    const claimedAt = Number(window.localStorage.getItem(key) ?? 0)

    if (Number.isFinite(claimedAt) && now - claimedAt < 60_000)
      return false

    window.localStorage.setItem(key, String(now))
  }
  catch {
    return true
  }

  return true
}

function releaseCue() {
  if (!props.once || typeof window === 'undefined')
    return

  try {
    window.localStorage.removeItem(cueStorageKey())
  }
  catch {}
}

function canRunInRenderContext() {
  if (props.context === 'both')
    return $renderContext.value === 'slide' || $renderContext.value === 'presenter'

  return $renderContext.value === props.context
}

async function triggerSpeak() {
  if (!speakText.value)
    return

  if (props.once && hasTriggered.value)
    return

  if (!claimCue())
    return

  hasTriggered.value = true
  errorMessage.value = ''

  try {
    await sendAiriSparkNotify({
      text: speakText.value,
      url: props.url,
      token: props.token,
      headline: props.headline,
      lane: props.lane,
      kind: props.kind,
      urgency: props.urgency,
      destinations: props.destinations,
      sourceId: props.sourceId,
      sourceInstanceId: props.sourceInstanceId,
    })
  }
  catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
    hasTriggered.value = false
    releaseCue()
    console.warn('[AiriSpeak] failed to send spark:notify', error)
  }
}

watch(
  [isActive, $clicks, speakText],
  ([active, clicks]) => {
    if (!active || nav.isPrintMode.value)
      return

    if (!canRunInRenderContext())
      return

    if (clicks >= props.at)
      void triggerSpeak()
  },
  { immediate: true },
)

onSlideLeave(() => {
  if (props.replayOnReenter)
    hasTriggered.value = false
})
</script>

<template>
  <span v-if="debug" class="airi-speak-debug" :title="errorMessage || speakText">
    <slot />
  </span>
</template>
