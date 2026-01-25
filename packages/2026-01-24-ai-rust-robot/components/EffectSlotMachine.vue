<script setup lang="ts">
import { animate } from 'animejs'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import IconDeath from '../assets/icon-death.svg?url'
import IconFerris from '../assets/icon-ferris.svg?url'
import IconMask from './IconMask.vue'

type SlotItem
  = | { kind: 'icon', class: string }
    | { kind: 'mask', src: string, class?: string }

const row2Base: SlotItem[] = [
  { kind: 'mask', src: IconFerris, class: 'text-white !size-[8rem]' },
  { kind: 'mask', src: IconDeath, class: 'text-white' },
  { kind: 'icon', class: 'i-ri:bug-fill' },
  { kind: 'icon', class: 'i-ri:code-box-fill' },
  { kind: 'icon', class: 'i-ri:javascript-fill' },
  { kind: 'icon', class: 'i-simple-icons:python' },
]

const row3Base: SlotItem[] = [
  { kind: 'icon', class: 'i-ri:robot-2-fill' },
  { kind: 'icon', class: 'i-ri:brain-2-fill' },
  { kind: 'icon', class: 'i-ri:lightbulb-flash-fill' },
  { kind: 'icon', class: 'i-ri:openai-fill' },
  { kind: 'icon', class: 'i-ri:aliens-fill' },
]

const row2Track = ref<HTMLElement | null>(null)
const row3Track = ref<HTMLElement | null>(null)
const itemHeight = ref(0)
const row2Offset = ref(0)
const row3Offset = ref(0)
let intervalId: number | undefined

const row2Cycles = 2
const row3Cycles = 6
const repeatCount = 10
const row2Items = repeatItems(row2Base, repeatCount)
const row3Items = repeatItems(row3Base, repeatCount)
const row2TargetIndex = row2Base.findIndex(item => item.kind === 'mask' && item.src === '/icon-ferris.svg')
const row3TargetIndex = row3Base.findIndex(item => item.kind === 'icon' && item.class === 'i-ri:robot-2-fill')

function repeatItems<T>(items: T[], repeat: number) {
  return Array.from({ length: repeat }).flatMap(() => items)
}

function normalizeOffset(offset: number, baseLength: number, height: number) {
  const cycleSize = baseLength * height
  let normalized = offset % cycleSize
  if (normalized > 0)
    normalized -= cycleSize

  return normalized
}

function spin(
  track: HTMLElement,
  baseItems: SlotItem[],
  cycles: number,
  offsetRef: { value: number },
  duration: number,
  forcedIndex?: number,
) {
  if (!itemHeight.value)
    return

  const cycleSize = baseItems.length * itemHeight.value
  const targetIndex = typeof forcedIndex === 'number' && forcedIndex >= 0
    ? forcedIndex
    : Math.floor(Math.random() * baseItems.length)

  const distance = (cycles * baseItems.length + targetIndex) * itemHeight.value

  if (offsetRef.value + distance > 0) {
    const cyclesNeeded = Math.ceil((offsetRef.value + distance) / cycleSize)
    offsetRef.value -= cyclesNeeded * cycleSize
    track.style.transform = `translateY(${offsetRef.value}px)`
  }

  const from = offsetRef.value
  const target = offsetRef.value + distance

  offsetRef.value = target

  animate(track, {
    translateY: [from, target],
    duration,
    ease: 'outCubic',
    onComplete: () => {
      const normalized = normalizeOffset(target, baseItems.length, itemHeight.value)
      offsetRef.value = normalized
      track.style.transform = `translateY(${normalized}px)`
    },
  })
}

function startSpins() {
  if (!row2Track.value || !row3Track.value)
    return

  spin(row2Track.value, row2Base, row2Cycles, row2Offset, 2000, row2TargetIndex)
  spin(row3Track.value, row3Base, row3Cycles, row3Offset, 2000, row3TargetIndex)

  intervalId = window.setInterval(() => {
    spin(row2Track.value!, row2Base, row2Cycles, row2Offset, 2000, row2TargetIndex)
    spin(row3Track.value!, row3Base, row3Cycles, row3Offset, 2000, row3TargetIndex)
  }, 5000)
}

onMounted(async () => {
  await nextTick()
  const firstItem = row2Track.value?.querySelector<HTMLElement>('.slot-item')

  itemHeight.value = firstItem?.offsetHeight || 0
  if (itemHeight.value)
    startSpins()
})

onBeforeUnmount(() => {
  if (intervalId)
    clearInterval(intervalId)
})
</script>

<template>
  <div class="effect-slot-machine">
    <div class="slot-row">
      <div class="slot-window">
        <div class="slot-track is-static">
          <div class="slot-item">
            <div class="slot-icon i-ri:heart-3-fill" />
          </div>
        </div>
      </div>
    </div>

    <div class="slot-row">
      <div class="slot-window">
        <div ref="row2Track" class="slot-track">
          <div v-for="(item, index) in row2Items" :key="`row2-${index}`" class="slot-item">
            <IconMask
              v-if="item.kind === 'mask'"
              :src="item.src"
              size="3.5rem"
              class="slot-icon"
              :class="item.class"
            />
            <div v-else class="slot-icon" :class="item.class" />
          </div>
        </div>
      </div>
    </div>

    <div class="slot-row">
      <div class="slot-window">
        <div ref="row3Track" class="slot-track">
          <div v-for="(item, index) in row3Items" :key="`row3-${index}`" class="slot-item">
            <IconMask
              v-if="item.kind === 'mask'"
              :src="item.src"
              size="3.5rem"
              class="slot-icon"
              :class="item.class"
            />
            <div v-else class="slot-icon" :class="item.class" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.effect-slot-machine {
  --slot-size: 7rem;
  display: flex;
  gap: 0.5rem;
}

.slot-row {
  display: flex;
  align-items: center;
}

.slot-window {
  width: var(--slot-size);
  height: var(--slot-size);
  overflow: hidden;
}

.slot-track {
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.slot-track.is-static {
  transform: translateY(0);
}

.slot-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--slot-size);
  height: var(--slot-size);
}

.slot-icon {
  width: var(--slot-size);
  height: var(--slot-size);
}
</style>
