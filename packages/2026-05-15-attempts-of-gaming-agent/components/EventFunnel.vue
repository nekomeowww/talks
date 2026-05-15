<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  clicks: number
}>()

interface EventToken {
  label: string
  x: number
  y: number
  delay: number
}

interface StageLabel {
  id: string
  click: number
  icon?: string
  title: string
  subtitle: string
  tone: string
  point: Point
}

interface Point {
  x: number
  y: number
}

function cubic(from: Point, c1: Point, c2: Point, to: Point): string {
  return `M${from.x} ${from.y} C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`
}

const funnel = {
  input: { x: 336, y: 120 },
  output: { x: 516, y: 120 },
}

const rulesStation = { x: 382, y: 214 }
const branchX = 612
const branchYOffset = 56
const planStation = { x: branchX, y: funnel.output.y - branchYOffset - 24 }
const executeStation = { x: branchX, y: funnel.output.y + branchYOffset - 24 }

const tokens: EventToken[] = [
  { label: 'chat', x: 22, y: 34, delay: 0 },
  { label: 'block', x: 128, y: 18, delay: 80 },
  { label: 'entity', x: 70, y: 92, delay: 160 },
  { label: 'inventory', x: 178, y: 78, delay: 240 },
  { label: 'health', x: 18, y: 154, delay: 320 },
  { label: 'position', x: 156, y: 150, delay: 400 },
]

const labels: StageLabel[] = [
  {
    id: 'rules',
    click: 2,
    point: rulesStation,
    title: 'Attention',
    subtitle: 'noise is compressed into usable signals',
    tone: 'cyan',
  },
  {
    id: 'plan',
    click: 3,
    point: planStation,
    icon: 'i-carbon:idea',
    title: 'Plan',
    subtitle: 'the agent receives a small decision surface',
    tone: 'violet',
  },
  {
    id: 'execute',
    click: 4,
    point: executeStation,
    icon: 'i-carbon:tools',
    title: 'Execute',
    subtitle: 'TaskExecutor maps plans to skills',
    tone: 'teal',
  },
]

const tokenStreams = computed(() =>
  tokens.map(token => {
    const start = { x: token.x + 56, y: token.y + 14 }
    const end = funnel.input
    const c1 = { x: start.x + 96, y: start.y - 16 }
    const c2 = { x: end.x - 74, y: end.y + (start.y - end.y) * 0.34 }

    return {
      id: token.label,
      d: cubic(start, c1, c2, end),
      delay: `${token.delay}ms`,
    }
  }),
)

const signalPath = computed(() =>
  cubic(
    funnel.output,
    { x: funnel.output.x + 34, y: funnel.output.y - 48 },
    { x: planStation.x - 30, y: planStation.y + 14 },
    { x: planStation.x - 12, y: planStation.y + 14 },
  ),
)

const actionPath = computed(() =>
  cubic(
    funnel.output,
    { x: funnel.output.x + 34, y: funnel.output.y + 48 },
    { x: executeStation.x - 30, y: executeStation.y + 14 },
    { x: executeStation.x - 12, y: executeStation.y + 14 },
  ),
)
</script>

<template>
  <div class="event-funnel">
    <svg class="event-field event-stream-field" viewBox="0 0 900 270" aria-hidden="true">
      <defs>
        <linearGradient id="eventStream" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="rgb(74 222 128 / 0)" />
          <stop offset="0.48" stop-color="rgb(74 222 128 / 0.68)" />
          <stop offset="1" stop-color="rgb(125 211 252 / 0.9)" />
        </linearGradient>
      </defs>

      <path
        v-for="stream in tokenStreams"
        :key="stream.id"
        class="event-stream"
        :class="{ 'is-visible': clicks >= 1 }"
        :style="{ transitionDelay: stream.delay }"
        :d="stream.d"
      />
    </svg>

    <div class="funnel-glass-mask" :class="{ 'is-visible': clicks >= 2 }">
      <span>Rules</span>
    </div>

    <svg class="event-field funnel-overlay-field" viewBox="0 0 900 270" aria-hidden="true">
      <defs>
        <linearGradient id="funnelBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="rgb(255 255 255 / 0.18)" />
          <stop offset="0.52" stop-color="rgb(125 211 252 / 0.12)" />
          <stop offset="1" stop-color="rgb(255 255 255 / 0.03)" />
        </linearGradient>
      </defs>

      <path
        class="signal-edge"
        :class="{ 'is-visible': clicks >= 3 }"
        :d="signalPath"
      />
      <path
        class="action-edge"
        :class="{ 'is-visible': clicks >= 4 }"
        :d="actionPath"
      />
    </svg>

    <div class="noise-label" :class="{ 'is-visible': clicks >= 1 }">
      <div class="noise-title">event noise</div>
      <div class="noise-subtitle">Mineflayer turns the world into too many callbacks</div>
    </div>

    <div
      v-for="token in tokens"
      :key="token.label"
      class="event-token"
      :class="{ 'is-visible': clicks >= 1 }"
      :style="{ left: `${token.x}px`, top: `${token.y}px`, transitionDelay: `${token.delay}ms` }"
    >
      {{ token.label }}
    </div>

    <div
      v-for="label in labels"
      :key="label.id"
      class="signal-station"
      :class="[`tone-${label.tone}`, { 'is-visible': clicks >= label.click }]"
      :style="{ left: `${label.point.x}px`, top: `${label.point.y}px` }"
    >
      <div v-if="label.icon" class="station-marker">
        <div :class="label.icon" />
      </div>
      <div class="station-copy">
        <strong>{{ label.title }}</strong>
        <span>{{ label.subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-funnel {
  position: relative;
  height: 270px;
  margin-top: 24px;
}

.event-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.event-stream-field {
  z-index: 1;
}

.funnel-overlay-field {
  z-index: 3;
}

.event-stream,
.signal-edge,
.action-edge {
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 640;
  stroke-dashoffset: 640;
  opacity: 0;
  transition:
    stroke-dashoffset 720ms ease,
    opacity 240ms ease;
}

.event-stream {
  stroke: url(#eventStream);
  stroke-width: 2.5;
  filter: drop-shadow(0 0 6px rgb(74 222 128 / 45%));
}

.signal-edge {
  stroke: rgb(196 181 253 / 86%);
  stroke-width: 4;
}

.action-edge {
  stroke: rgb(94 234 212 / 88%);
  stroke-width: 4;
}

.event-stream.is-visible,
.signal-edge.is-visible,
.action-edge.is-visible {
  stroke-dashoffset: 0;
  opacity: 1;
}

.funnel-glass-mask {
  position: absolute;
  z-index: 2;
  left: 324px;
  top: 52px;
  width: 190px;
  height: 136px;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 14%), rgb(125 211 252 / 8%) 48%, rgb(255 255 255 / 3%)),
    rgb(255 255 255 / 6%);
  backdrop-filter: blur(8px) saturate(1.35);
  opacity: 0;
  transform: translateX(-18px) scaleX(0.92);
  transform-origin: 50% 50%;
  transition:
    opacity 360ms ease,
    transform 520ms ease;
}

.funnel-glass-mask.is-visible {
  opacity: 1;
  transform: translateX(0) scaleX(1);
}

.funnel-glass-mask span {
  position: absolute;
  left: 18px;
  top: 16px;
  color: rgb(186 230 253 / 88%);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.noise-label {
  position: absolute;
  z-index: 4;
  left: 18px;
  top: 214px;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 360ms ease,
    transform 420ms ease;
}

.noise-label.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.noise-title {
  color: rgb(187 247 208 / 88%);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.noise-subtitle {
  margin-top: 4px;
  color: rgb(255 255 255 / 46%);
  font-size: 12px;
}

.event-token {
  position: absolute;
  z-index: 4;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgb(34 197 94 / 14%);
  color: rgb(220 252 231 / 92%);
  font-size: 13px;
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 18%),
    0 0 18px rgb(34 197 94 / 14%);
  opacity: 0;
  transform: translateX(-18px) scale(0.92);
  transition:
    opacity 320ms ease,
    transform 420ms ease;
}

.event-token.is-visible {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.signal-station {
  position: absolute;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 280px;
  opacity: 0;
  transform: translateX(-12px);
  transition:
    opacity 360ms ease,
    transform 420ms ease;
}

.signal-station.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.signal-station.tone-cyan {
  display: block;
}

.signal-station.tone-cyan .station-copy strong {
  color: rgb(186 230 253 / 88%);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.signal-station.tone-cyan .station-copy span {
  margin-top: 4px;
  color: rgb(255 255 255 / 46%);
  font-size: 12px;
}

.station-marker {
  display: grid;
  width: 28px;
  height: 28px;
  flex: none;
  place-items: center;
}

.station-marker > div {
  width: 24px;
  height: 24px;
  flex: none;
}

.station-copy {
  min-width: 0;
}

.station-copy strong,
.station-copy span {
  display: block;
}

.station-copy strong {
  font-size: 18px;
  line-height: 1.1;
}

.station-copy span {
  margin-top: 5px;
  color: rgb(255 255 255 / 56%);
  font-size: 12px;
  line-height: 1.35;
}

.tone-cyan {
  color: rgb(125 211 252);
}

.tone-violet {
  color: rgb(196 181 253);
}

.tone-teal {
  color: rgb(94 234 212);
}
</style>
