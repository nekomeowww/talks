<script setup lang="ts">
import { animate } from 'animejs'
import { nextTick, onBeforeUnmount, onMounted, shallowRef, useTemplateRef } from 'vue'

interface ReelItem {
  icon: string
}

const reelOneBase: ReelItem[] = [
  { icon: 'i-mingcute:document-2-line' },
]

const reelTwoBase: ReelItem[] = [
  { icon: 'i-mingcute:vue-line' },
]

const reelThreeBase: ReelItem[] = [
  { icon: 'i-mingcute:chart-line-line' },
]

const repeatCount = 80
const restingRepeatIndex = 60
const reelOneItems = repeatItems(reelOneBase, repeatCount)
const reelTwoItems = repeatItems(reelTwoBase, repeatCount)
const reelThreeItems = repeatItems(reelThreeBase, repeatCount)

const reelOneTrack = useTemplateRef<HTMLElement>('reelOneTrack')
const reelTwoTrack = useTemplateRef<HTMLElement>('reelTwoTrack')
const reelThreeTrack = useTemplateRef<HTMLElement>('reelThreeTrack')
const itemHeight = shallowRef(0)
const reelOneOffset = shallowRef(0)
const reelTwoOffset = shallowRef(0)
const reelThreeOffset = shallowRef(0)
let intervalId: number | undefined

function repeatItems<T>(items: T[], repeat: number) {
  return Array.from({ length: repeat }).flatMap(() => items)
}

function spin(
  track: HTMLElement,
  baseItems: ReelItem[],
  cycles: number,
  offsetRef: { value: number },
  duration: number,
  forcedIndex = 0,
) {
  if (!itemHeight.value)
    return

  const cycleSize = baseItems.length * itemHeight.value
  const targetIndex = forcedIndex >= 0 ? forcedIndex : Math.floor(Math.random() * baseItems.length)
  if (!offsetRef.value) {
    offsetRef.value = -((restingRepeatIndex * baseItems.length + targetIndex) * itemHeight.value)
    track.style.transform = `translateY(${offsetRef.value}px)`
  }

  if (offsetRef.value + cycles * cycleSize > 0) {
    offsetRef.value = -((restingRepeatIndex * baseItems.length + targetIndex) * itemHeight.value)
    track.style.transform = `translateY(${offsetRef.value}px)`
  }

  const from = offsetRef.value
  const target = from + cycles * cycleSize

  offsetRef.value = target

  animate(track, {
    translateY: [from, target],
    duration,
    ease: 'outCubic',
    onComplete: () => {
      offsetRef.value = target
    },
  })
}

function startSpins() {
  if (!reelOneTrack.value || !reelTwoTrack.value || !reelThreeTrack.value)
    return

  spin(reelOneTrack.value, reelOneBase, 2, reelOneOffset, 1150)
  spin(reelTwoTrack.value, reelTwoBase, 3, reelTwoOffset, 1450)
  spin(reelThreeTrack.value, reelThreeBase, 4, reelThreeOffset, 1750)

  intervalId = window.setInterval(() => {
    spin(reelOneTrack.value!, reelOneBase, 2, reelOneOffset, 1150)
    spin(reelTwoTrack.value!, reelTwoBase, 3, reelTwoOffset, 1450)
    spin(reelThreeTrack.value!, reelThreeBase, 4, reelThreeOffset, 1750)
  }, 5000)
}

onMounted(async () => {
  await nextTick()

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion)
    return

  const firstItem = reelOneTrack.value?.querySelector<HTMLElement>('.reel-item')
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
  <div class="concept-reel" aria-label="从结构化 prompt 到可重复评测">
    <div class="reel-window">
      <div ref="reelOneTrack" class="reel-track">
        <div v-for="(item, index) in reelOneItems" :key="`reel-one-${index}`" class="reel-item">
          <div class="reel-icon" :class="item.icon" />
        </div>
      </div>
    </div>

    <div class="reel-window">
      <div ref="reelTwoTrack" class="reel-track">
        <div v-for="(item, index) in reelTwoItems" :key="`reel-two-${index}`" class="reel-item">
          <div class="reel-icon" :class="item.icon" />
        </div>
      </div>
    </div>

    <div class="reel-window">
      <div ref="reelThreeTrack" class="reel-track">
        <div v-for="(item, index) in reelThreeItems" :key="`reel-three-${index}`" class="reel-item">
          <div class="reel-icon" :class="item.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.concept-reel {
  display: flex;
  gap: 0.8rem;
  color: rgb(255 255 255 / 72%);
  filter: drop-shadow(0 1rem 3rem rgb(0 0 0 / 32%));
}

.reel-window {
  width: 7rem;
  height: 7rem;
  overflow: hidden;
}

.reel-track {
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.reel-item {
  display: grid;
  width: 7rem;
  height: 7rem;
  flex: 0 0 7rem;
  place-items: center;
}

.reel-icon {
  width: 6rem;
  height: 6rem;
  color: currentcolor;
}
</style>
