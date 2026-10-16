<script setup lang="ts">
/**
 * A guided tour over real Recorder Web screenshots. Each click moves a camera
 * onto one labelled region (zoom + dim everything else); the last click pulls
 * back out and keeps every visited region outlined and numbered.
 *
 * The camera is pure CSS transforms keyed on `clicks`, so going backward works
 * and opening the slide at a later click renders the settled frame.
 */
import { computed } from 'vue'

import workspacePng from '../public/recorder/workspace.png'

type Region = [number, number, number, number]

interface Step {
  region?: Region
  /** Regions outlined with their number on the closing overview. */
  outlines?: { n: number, region: Region, badge?: 'top' | 'left' }[]
  title: string
  zh: string
}

const props = defineProps<{
  clicks: number
}>()

// Fractions of the screenshot (x0, y0, x1, y1), measured on the 3840 x 2400 capture.
const R = {
  timeline: [0.154, 0.396, 0.797, 0.994] as Region,
  monitor: [0.156, 0.086, 0.794, 0.371] as Region,
  inputs: [0.803, 0.100, 0.994, 0.367] as Region,
  seen: [0.155, 0.080, 0.996, 0.375] as Region,
  perception: [0.154, 0.602, 0.797, 0.948] as Region,
  planner: [0.154, 0.950, 0.797, 0.974] as Region,
}

const steps: Step[] = [
  {
    title: 'Two workers, one timeline',
    zh: '10 月 15 号跑的两局 Airicraft 评测，每局都是 AI 自己在玩',
  },
  {
    region: R.timeline,
    title: 'Sessions on one clock',
    zh: '两局按实际时间排在一起，一个 AI 一条轨道',
  },
  {
    region: R.seen,
    title: 'What it saw and pressed',
    zh: '它这一刻看到了什么、按了哪些键、手里拿着啥',
  },
  {
    region: R.perception,
    title: 'What it could see',
    zh: '哪条鱼、哪只狐狸什么时候进了它的视野，一行一行都记着',
  },
  {
    region: R.planner,
    title: 'Every planner call is a track',
    zh: '模型每想一次，时间线上就多一段',
  },
  {
    outlines: [
      { n: 1, region: R.timeline },
      { n: 2, region: R.monitor },
      { n: 3, region: R.inputs },
      // The perception and planner rows sit close to each other and to the
      // timeline's own corner, so their badges go to other corners.
      { n: 4, region: R.perception, badge: 'top' },
      { n: 5, region: R.planner, badge: 'left' },
    ],
    title: 'One screen, one clock',
    zh: '发生了什么、看到了什么、按了什么，还有模型在想什么',
  },
]

// Slide canvas and the screenshot fitted inside it (16:10 into 980 x 552).
const SW = 980
const SH = 552
const IH = SH
const IW = SH * 1.6

// Where a zoomed region should land: below the corner label, inside the margins.
const BOX = { x: 36, y: 128, w: 908, h: 396 }

const index = computed(() => Math.min(Math.max(props.clicks, 0), steps.length - 1))
const step = computed(() => steps[index.value])

const camera = computed(() => {
  const r = step.value.region
  if (!r) {
    // Overview: a little smaller, centred and resting on the bottom margin, so
    // the corner title clears the panels and every numbered badge stays in frame.
    const s = 0.8
    return { x: (SW - IW * s) / 2, y: SH - IH * s - 22, s }
  }
  const rw = (r[2] - r[0]) * IW
  const rh = (r[3] - r[1]) * IH
  const s = Math.min(BOX.w / rw, BOX.h / rh)
  const cx = ((r[0] + r[2]) / 2) * IW
  const cy = ((r[1] + r[3]) / 2) * IH
  return {
    x: BOX.x + BOX.w / 2 - s * cx,
    y: BOX.y + BOX.h / 2 - s * cy,
    s,
  }
})

function box(r: Region) {
  return {
    left: `${r[0] * IW}px`,
    top: `${r[1] * IH}px`,
    width: `${(r[2] - r[0]) * IW}px`,
    height: `${(r[3] - r[1]) * IH}px`,
  }
}

// Every region of this tour gets one ring element so rings move instead of popping.
const rings = computed(() => {
  const all = new Map<string, Region>()
  for (const s of steps) {
    if (s.region)
      all.set(s.region.join(), s.region)
    for (const o of s.outlines ?? [])
      all.set(o.region.join(), o.region)
  }
  return [...all.values()].map((region) => {
    const key = region.join()
    const focused = step.value.region?.join() === key
    const outline = step.value.outlines?.find(o => o.region.join() === key)
    const nested = key === R.perception.join() || key === R.planner.join()
    return { key, region, focused, outline, nested }
  })
})
</script>

<template>
  <div class="tour">
    <div
      class="layer"
      :style="{
        'width': `${IW}px`,
        'height': `${IH}px`,
        'transform': `translate(${camera.x}px, ${camera.y}px) scale(${camera.s})`,
        '--s': camera.s,
      }"
    >
      <img :src="workspacePng" class="shot" alt="">
      <div
        v-for="ring in rings"
        :key="ring.key"
        class="ring"
        :class="{ focused: ring.focused, outlined: !!ring.outline, nested: ring.nested }"
        :style="box(ring.region)"
      >
        <span v-if="ring.outline" class="num" :class="ring.outline.badge">{{ ring.outline.n }}</span>
      </div>
    </div>

    <div class="label-wrap corner-frost">
      <Transition name="label" mode="out-in">
        <div :key="index" class="label">
          <div class="label-title">
            {{ step.title }}
          </div>
          <div class="label-zh">
            {{ step.zh }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.tour {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #0d0d0f;
}

.layer {
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: 0 0;
  transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.shot {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.ring {
  position: absolute;
  border-radius: calc(10px / var(--s));
  border: calc(2.5px / var(--s)) solid transparent;
  box-shadow: 0 0 0 4000px rgb(4 8 16 / 0%);
  pointer-events: none;
  transition:
    border-color 400ms ease,
    box-shadow 600ms ease;
}

.ring.focused {
  border-color: #f7db8f;
  box-shadow:
    0 0 0 4000px rgb(4 8 16 / 52%),
    0 0 calc(24px / var(--s)) rgb(247 219 143 / 45%);
}

.ring.outlined {
  border-color: rgb(247 219 143 / 90%);
}

/* The perception and planner rows sit inside the timeline box: dashed so they read apart. */
.ring.outlined.nested {
  border-style: dashed;
}

.num {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(45%, 45%) scale(calc(1 / var(--s)));
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 800;
  color: #0a2540;
  background: #f7db8f;
  box-shadow: 0 4px 12px rgb(0 0 0 / 35%);
  animation: num-in 400ms ease both;
}

.num.top {
  top: 0;
  bottom: auto;
  transform: translate(45%, -45%) scale(calc(1 / var(--s)));
}

.num.left {
  right: auto;
  left: 0;
  transform: translate(-45%, 45%) scale(calc(1 / var(--s)));
}

@keyframes num-in {
  from {
    opacity: 0;
  }
}

.label-wrap {
  position: absolute;
  left: 44px;
  top: 34px;
  z-index: 3;
  max-width: 600px;
}

.label-title {
  margin-top: 4px;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.01em;
}

.label-zh {
  margin-top: 6px;
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 15px;
  color: rgb(255 255 255 / 86%);
}

.label-enter-active,
.label-leave-active {
  transition:
    opacity 380ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 380ms ease;
}

.label-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.label-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .layer,
  .ring,
  .shot {
    transition-duration: 1ms;
  }
}
</style>
