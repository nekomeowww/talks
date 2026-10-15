<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

/**
 * D3: the four control layers as a left-to-right signal path, ending at the
 * keys. Each wire carries traffic at its layer's speed: one slow packet from
 * the LLM, steady per-tick dots through skills and reflexes, a dense 20 Hz
 * stream out of the arbiter. Now and then a reflex fires and its wire turns
 * pink (preempt).
 */
const props = defineProps<{
  clicks: number
}>()

interface Station {
  icon: string
  title: string
  zh: string
  speed: string
  desc: string
  dark?: boolean
}

const stations: Station[] = [
  { icon: 'i-twemoji:brain', title: 'Thinking', zh: '大模型：定目标、调工具', speed: 'seconds', desc: 'LLM planner, ~60 tools. Sees changes, not full state.' },
  { icon: 'i-twemoji:hammer-and-wrench', title: 'Skills', zh: '技能：把任务一步步做完', speed: 'ticks', desc: 'Jobs, action graphs: portal, dragon, blueprints.' },
  { icon: 'i-twemoji:high-voltage', title: 'Reflexes', zh: '反射：岩浆、溺水、怪物', speed: 'same tick', desc: 'Override everything above, in the same tick.' },
  { icon: 'i-twemoji:locked', title: 'Control arbiter', zh: '仲裁：一个键只有一个主人', speed: '20 Hz', desc: 'REFLEX › FOREGROUND › BACKGROUND', dark: true },
]

const keys = ['W', 'A', 'S', 'D']

// Settle instantly when the presenter jumps more than one click.
const instant = ref(false)
watch(() => props.clicks, async (n, o) => {
  if (Math.abs(n - (o ?? 0)) > 1) {
    instant.value = true
    await nextTick()
    requestAnimationFrame(() => requestAnimationFrame(() => (instant.value = false)))
  }
})
</script>

<template>
  <div class="flow" :class="{ instant }">
    <div class="track" />

    <div class="seg seg1" :class="{ on: clicks >= 2 }">
      <div class="packet" />
      <div class="seg-label">
        tool call
      </div>
    </div>
    <div class="seg seg2 dots" :class="{ on: clicks >= 3 }" />
    <div class="seg seg3 dots" :class="{ on: clicks >= 4 }" />
    <div class="seg seg4 dots fast" :class="{ on: clicks >= 4 }" />

    <div class="row">
      <div
        v-for="(s, i) in stations"
        :key="s.title"
        class="station"
        :class="{ shown: clicks >= i + 1, dark: s.dark, reflex: i === 2, live: clicks >= 4 }"
      >
        <div class="bubble">
          <div :class="s.icon" class="icon" />
          <div v-if="i === 2" class="preempt">
            preempt!
          </div>
        </div>
        <div class="title">
          {{ s.title }}
        </div>
        <div class="zh-line">
          {{ s.zh }}
        </div>
        <div class="speed">
          {{ s.speed }}
        </div>
        <div class="desc">
          {{ s.desc }}
        </div>
      </div>

      <div class="station keys-station" :class="{ shown: clicks >= 4, live: clicks >= 4 }">
        <div class="keys">
          <span v-for="(k, i) in keys" :key="k" class="key" :style="{ animationDelay: `${i * 0.37}s` }">{{ k }}</span>
        </div>
        <div class="title">
          Keys
        </div>
        <div class="zh-line">
          按键
        </div>
      </div>
    </div>

    <div class="foot" :class="{ shown: clicks >= 4 }">
      <span class="foot-en">Any other code that presses a key fails the build.</span>
      <span class="foot-zh">谁绕过仲裁直接按键，测试就让构建失败</span>
    </div>
  </div>
</template>

<style scoped>
.flow {
  --c1: 93px;
  --c2: 279px;
  --c3: 465px;
  --c4: 651px;
  --c5: 806px;
  --wire-y: 40px;
  position: relative;
  width: 868px;
  height: 290px;
}

.instant,
.instant * {
  transition: none !important;
}

.track {
  position: absolute;
  left: var(--c1);
  width: calc(var(--c5) - var(--c1));
  top: calc(var(--wire-y) - 1px);
  height: 0;
  border-top: 2px dashed rgb(10 37 64 / 14%);
}

/* Wires between stations */
.seg {
  position: absolute;
  top: calc(var(--wire-y) - 7px);
  height: 14px;
  opacity: 0;
  transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1);
}

.seg.on {
  opacity: 1;
}

.seg1 {
  left: calc(var(--c1) + 44px);
  width: calc(var(--c2) - var(--c1) - 88px);
}

.seg2 {
  left: calc(var(--c2) + 44px);
  width: calc(var(--c3) - var(--c2) - 88px);
}

.seg3 {
  left: calc(var(--c3) + 44px);
  width: calc(var(--c4) - var(--c3) - 88px);
}

.seg4 {
  left: calc(var(--c4) + 44px);
  width: calc(var(--c5) - var(--c4) - 92px);
}

.seg-label {
  position: absolute;
  left: 0;
  right: 0;
  top: -20px;
  text-align: center;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #456e95;
}

.packet {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 99px;
  background: #e87aa4;
  box-shadow: 0 0 0 4px rgb(232 122 164 / 22%), 0 4px 10px rgb(232 122 164 / 40%);
  animation: packet 3.2s cubic-bezier(0.45, 0, 0.2, 1) infinite;
}

@keyframes packet {
  0% {
    left: 0;
    opacity: 0;
    transform: scale(0.4);
  }
  6% {
    opacity: 1;
    transform: scale(1);
  }
  58% {
    left: calc(100% - 14px);
    opacity: 1;
    transform: scale(1);
  }
  66%,
  100% {
    left: calc(100% - 14px);
    opacity: 0;
    transform: scale(0.4);
  }
}

.dots {
  --dot: #6292bf;
  background-image: radial-gradient(circle at center, var(--dot) 3.2px, transparent 3.8px);
  background-size: 22px 14px;
  background-repeat: repeat-x;
  animation: flow 0.6s linear infinite;
}

.seg3.dots {
  animation:
    flow 0.6s linear infinite,
    tint 5s steps(1) infinite;
}

.dots.fast {
  --dot: #0a2540;
  background-image: radial-gradient(circle at center, var(--dot) 2.4px, transparent 3px);
  background-size: 9px 14px;
  animation: flow-fast 0.2s linear infinite;
}

@keyframes flow {
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: 22px;
  }
}

@keyframes flow-fast {
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: 9px;
  }
}

@keyframes tint {
  0%,
  100% {
    --dot: #6292bf;
    filter: none;
  }
  70% {
    filter: hue-rotate(115deg) saturate(1.6) brightness(1.15);
  }
  84% {
    filter: none;
  }
}

/* Stations */
.row {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 186px) 124px;
}

.station {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 8px;
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 500ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 650ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 500ms ease;
}

.station.shown {
  opacity: 1;
  transform: none;
  filter: none;
}

.bubble {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 10px 26px rgb(10 37 64 / 12%);
}

.icon {
  font-size: 38px;
}

.station.dark .bubble {
  background: #0a2540;
  box-shadow: 0 10px 26px rgb(10 37 64 / 30%);
}

.station:first-child.shown .bubble {
  animation: think 3.6s ease-in-out infinite;
}

@keyframes think {
  0%,
  100% {
    box-shadow: 0 10px 26px rgb(10 37 64 / 12%), 0 0 0 0 rgb(232 122 164 / 0%);
  }
  20% {
    box-shadow: 0 10px 26px rgb(10 37 64 / 12%), 0 0 0 10px rgb(232 122 164 / 18%);
  }
}

.station.reflex.live .bubble {
  animation: zap 5s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

@keyframes zap {
  0%,
  66%,
  88%,
  100% {
    transform: scale(1);
    box-shadow: 0 10px 26px rgb(10 37 64 / 12%);
  }
  72% {
    transform: scale(1.14);
    box-shadow: 0 10px 26px rgb(10 37 64 / 12%), 0 0 0 10px rgb(247 219 143 / 70%);
  }
  80% {
    transform: scale(1);
    box-shadow: 0 10px 26px rgb(10 37 64 / 12%), 0 0 0 6px rgb(247 219 143 / 45%);
  }
}

.preempt {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 9px;
  border-radius: 99px;
  font-size: 10.5px;
  font-weight: 700;
  white-space: nowrap;
  color: #fff;
  background: #e87aa4;
  opacity: 0;
}

.station.reflex.live .preempt {
  animation: preempt 5s ease infinite;
}

@keyframes preempt {
  0%,
  66%,
  88%,
  100% {
    opacity: 0;
    transform: translate(-50%, 4px);
  }
  72%,
  84% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.title {
  margin-top: 14px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
}

.zh-line {
  margin-top: 4px;
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 12.5px;
  color: rgb(10 37 64 / 62%);
}

.speed {
  margin-top: 12px;
  min-width: 96px;
  padding: 3px 12px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 700;
  background: rgb(255 255 255 / 78%);
  border: 1px solid rgb(10 37 64 / 10%);
  font-variant-numeric: tabular-nums;
}

.station.dark .speed {
  background: #0a2540;
  border-color: #0a2540;
  color: #fff;
}

.desc {
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.45;
  color: rgb(10 37 64 / 60%);
  max-width: 168px;
}

/* Keys */
.keys {
  height: 80px;
  display: grid;
  grid-template-columns: repeat(2, 32px);
  grid-template-rows: repeat(2, 32px);
  gap: 6px;
  align-content: center;
  justify-content: center;
}

.key {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  background: #fff;
  box-shadow: 0 3px 0 rgb(10 37 64 / 14%), 0 6px 14px rgb(10 37 64 / 8%);
}

.keys-station.live .key {
  animation: press 1.5s ease-in-out infinite;
}

@keyframes press {
  0%,
  100% {
    transform: none;
    background: #fff;
    color: #0a2540;
  }
  12%,
  30% {
    transform: translateY(2px);
    background: #0a2540;
    color: #fff;
    box-shadow: 0 1px 0 rgb(10 37 64 / 14%);
  }
  40% {
    transform: none;
  }
}

.foot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 14px;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) 300ms,
    transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 300ms,
    filter 500ms ease 300ms;
}

.foot.shown {
  opacity: 1;
  transform: none;
  filter: none;
}

.foot-en {
  font-size: 15px;
  font-weight: 700;
}

.foot-zh {
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 13px;
  color: rgb(10 37 64 / 60%);
}

@media (prefers-reduced-motion: reduce) {
  .packet,
  .dots,
  .bubble,
  .key,
  .preempt {
    animation: none !important;
  }
}
</style>
