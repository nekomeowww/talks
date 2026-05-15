<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  clicks: number
}>()

interface OrbitStep {
  id: string
  click: number
  angle: number
  icon: string
  label: string
  subtitle: string
  tone: string
}

interface TerminalLine {
  click: number
  title: string
  body: string
  tone?: string
}

const center = { x: 280, y: 160 }
const radius = { x: 206, y: 94 }
const orbitRotation = -18
const maneuverAngle = 314

const steps: OrbitStep[] = [
  { id: 'llm', click: 1, angle: 198, icon: 'i-carbon:ibm-watson-machine-learning', label: 'LLM', subtitle: '任务理解与规划', tone: 'lime' },
  { id: 'krpc', click: 2, angle: 286, icon: 'i-carbon:api', label: 'kRPC', subtitle: '状态读取与控制', tone: 'sky' },
  { id: 'mechjeb', click: 3, angle: 10, icon: 'i-carbon:rocket', label: 'MechJeb', subtitle: '机动与自动驾驶', tone: 'amber' },
  { id: 'python', click: 3, angle: 104, icon: 'i-carbon:code', label: 'Python', subtitle: '轨道计算与脚本', tone: 'teal' },
]

const terminalLines: TerminalLine[] = [
  { click: 1, title: '核心目标', body: '让 Agent 从任务意图出发，自己拆出轨道、载具、机动和执行步骤。', tone: 'prompt' },
  { click: 2, title: '状态难点', body: 'KSP 的关键状态是连续变化的轨道、速度、燃料和事件窗口，不是一张静态截图。', tone: 'call' },
  { click: 3, title: '规划难点', body: '远航任务需要同时考虑天体知识、delta-v 预算、转移窗口和失败后的重规划。', tone: 'api' },
  { click: 3, title: '执行难点', body: '最终动作必须落到可验证的脚本、远程控制和自动驾驶，而不是一句高层指令。', tone: 'json' },
]

function ellipsePoint(angle: number) {
  const rad = angle * Math.PI / 180
  const rotation = orbitRotation * Math.PI / 180
  const x = Math.cos(rad) * radius.x
  const y = Math.sin(rad) * radius.y

  return {
    x: center.x + x * Math.cos(rotation) - y * Math.sin(rotation),
    y: center.y + x * Math.sin(rotation) + y * Math.cos(rotation),
  }
}

const mainOrbitPath = computed(() => {
  const start = ellipsePoint(0)
  const end = ellipsePoint(180)

  return [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `A ${radius.x} ${radius.y} ${orbitRotation} 1 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
    `A ${radius.x} ${radius.y} ${orbitRotation} 1 1 ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    'Z',
  ].join(' ')
})

const maneuverPoint = computed(() => ellipsePoint(maneuverAngle))

const burnVector = computed(() => {
  const rad = maneuverAngle * Math.PI / 180
  const rotation = orbitRotation * Math.PI / 180
  const dx = -Math.sin(rad) * radius.x
  const dy = Math.cos(rad) * radius.y
  const rotatedDx = dx * Math.cos(rotation) - dy * Math.sin(rotation)
  const rotatedDy = dx * Math.sin(rotation) + dy * Math.cos(rotation)
  const length = Math.hypot(rotatedDx, rotatedDy)
  const start = maneuverPoint.value

  return {
    x1: start.x,
    y1: start.y,
    x2: start.x + rotatedDx / length * 72,
    y2: start.y + rotatedDy / length * 72,
  }
})

const stepPoints = computed(() =>
  steps.map((step) => {
    const rad = step.angle * Math.PI / 180
    return {
      ...step,
      x: center.x + Math.cos(rad) * radius.x,
      y: center.y + Math.sin(rad) * radius.y,
      visible: props.clicks >= step.click,
    }
  }),
)

</script>

<template>
  <div class="ksp-tool-loop">
    <div class="terminal-pane" :class="{ 'is-visible': clicks >= 1 }">
      <div class="terminal-bar">
        <span />
        <span />
        <span />
      </div>
      <div class="terminal-body">
        <div
          v-for="(line, index) in terminalLines"
          :key="line.title"
          class="terminal-line"
          :class="[`tone-${line.tone ?? 'plain'}`, { 'is-visible': clicks >= line.click }]"
          :style="{ transitionDelay: `${index * 70}ms` }"
        >
          <strong>{{ line.title }}</strong>
          <span>{{ line.body }}</span>
        </div>
      </div>
    </div>

    <div class="orbit-stage">
      <svg class="orbit-svg" viewBox="0 0 560 320" aria-hidden="true">
        <g
          class="transfer-orbit-group"
          :style="{ transformOrigin: `${maneuverPoint.x}px ${maneuverPoint.y}px` }"
        >
          <path class="transfer-orbit-path" :d="mainOrbitPath" pathLength="100" />
        </g>
        <path class="orbit-track" :d="mainOrbitPath" pathLength="100" />
        <path class="orbit-progress" :d="mainOrbitPath" pathLength="100" />
        <circle class="maneuver-point" :cx="maneuverPoint.x" :cy="maneuverPoint.y" r="4" />
        <line
          v-if="clicks >= 3"
          class="burn-vector"
          :x1="burnVector.x1"
          :y1="burnVector.y1"
          :x2="burnVector.x2"
          :y2="burnVector.y2"
        />
      </svg>

      <div class="planet">
        <div i-carbon:earth-filled />
      </div>

      <div
        v-for="step in stepPoints"
        :key="step.id"
        class="orbit-step"
        :class="[`tone-${step.tone}`, { 'is-visible': step.visible }]"
        :style="{ left: `${step.x - 52}px`, top: `${step.y - 28}px` }"
      >
        <div :class="step.icon" />
        <div>
          <strong>{{ step.label }}</strong>
          <span>{{ step.subtitle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ksp-tool-loop {
  position: relative;
  height: 360px;
  margin-top: 32px;
}

.terminal-pane {
  position: absolute;
  z-index: 4;
  left: 0;
  top: 56px;
  width: 374px;
  height: 266px;
  overflow: hidden;
  border-radius: 14px;
  background:
    linear-gradient(180deg, rgb(8 13 22 / 92%), rgb(4 8 14 / 88%)),
    rgb(0 0 0 / 70%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 14%),
    0 22px 70px rgb(0 0 0 / 32%);
  opacity: 0;
  transform: translateX(-18px);
  transition:
    opacity 360ms ease,
    transform 420ms ease;
}

.terminal-pane.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.terminal-bar {
  display: flex;
  gap: 7px;
  padding: 12px 14px;
  background: rgb(255 255 255 / 6%);
}

.terminal-bar span {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: rgb(255 255 255 / 24%);
}

.terminal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.terminal-line {
  color: rgb(255 255 255 / 58%);
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 300ms ease,
    transform 360ms ease;
}

.terminal-line strong,
.terminal-line span {
  display: block;
}

.terminal-line strong {
  font-size: 12px;
  line-height: 1.2;
}

.terminal-line span {
  margin-top: 3px;
  color: rgb(255 255 255 / 52%);
  font-size: 11px;
  line-height: 1.3;
}

.terminal-line.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.tone-prompt {
  color: rgb(190 242 100 / 92%);
}

.tone-call {
  color: rgb(125 211 252 / 92%);
}

.tone-api {
  color: rgb(251 191 36 / 92%);
}

.tone-json {
  color: rgb(94 234 212 / 92%);
}

.orbit-stage {
  position: absolute;
  z-index: 2;
  left: 356px;
  top: 16px;
  width: 560px;
  height: 320px;
}

.orbit-svg {
  position: absolute;
  z-index: 1;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.orbit-track {
  fill: none;
  stroke: rgb(255 255 255 / 13%);
  stroke-width: 2;
}

.orbit-progress {
  fill: none;
  stroke: rgb(190 242 100 / 86%);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 10 90;
  stroke-dashoffset: 0;
  filter: drop-shadow(0 0 9px rgb(190 242 100 / 42%));
  animation: orbit-draw-loop 2.8s linear infinite;
}

.transfer-orbit-group {
  transform-box: view-box;
  animation: transfer-orbit-breathe 4.8s ease-in-out infinite;
}

.transfer-orbit-path {
  fill: none;
  stroke: rgb(255 255 255 / 22%);
  stroke-width: 1.5;
  stroke-dasharray: 1.4 2.2;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: transfer-dash-flow 3.8s linear infinite;
}

.maneuver-point {
  fill: rgb(190 242 100 / 92%);
  filter: drop-shadow(0 0 8px rgb(190 242 100 / 54%));
}

.burn-vector {
  stroke: rgb(251 146 60 / 90%);
  stroke-width: 4;
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgb(251 146 60 / 55%));
  animation: pulse-vector 1.4s ease-in-out infinite;
}

.planet {
  position: absolute;
  z-index: 2;
  left: 238px;
  top: 120px;
  display: grid;
  width: 84px;
  height: 84px;
  place-items: center;
  border-radius: 999px;
  background:
    radial-gradient(circle at 34% 28%, rgb(186 230 253 / 82%), transparent 20%),
    radial-gradient(circle at 62% 60%, rgb(34 197 94 / 46%), transparent 24%),
    radial-gradient(circle at 50% 50%, rgb(14 165 233 / 40%), rgb(15 23 42 / 75%));
  box-shadow:
    inset 0 1px 16px rgb(255 255 255 / 16%),
    0 0 70px rgb(14 165 233 / 18%);
}

.planet > div {
  width: 34px;
  height: 34px;
  color: rgb(255 255 255 / 72%);
}

.orbit-step {
  position: absolute;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 9px;
  width: 154px;
  min-height: 58px;
  padding: 8px 10px;
  border-radius: 14px;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 10%), rgb(255 255 255 / 4%)),
    rgb(8 13 22 / 24%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 12%);
  backdrop-filter: blur(12px) saturate(1.15);
  color: rgb(255 255 255 / 78%);
  opacity: 0;
  transform: translateY(10px) scale(0.9);
  transition:
    opacity 320ms ease,
    transform 420ms ease;
}

.orbit-step.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.orbit-step > div:first-child {
  display: grid;
  width: 28px;
  height: 28px;
  flex: none;
  place-items: center;
  color: rgb(255 255 255 / 86%);
}

.orbit-step strong,
.orbit-step span {
  display: block;
}

.orbit-step strong {
  color: rgb(255 255 255 / 82%);
  font-size: 12px;
  line-height: 1.1;
}

.orbit-step span {
  margin-top: 3px;
  color: rgb(255 255 255 / 48%);
  font-size: 11px;
  line-height: 1.2;
}

.orbit-step.tone-lime > div:first-child {
  color: rgb(190 242 100);
}

.orbit-step.tone-sky > div:first-child {
  color: rgb(125 211 252);
}

.orbit-step.tone-amber > div:first-child {
  color: rgb(251 191 36);
}

.orbit-step.tone-teal > div:first-child {
  color: rgb(94 234 212);
}

@keyframes pulse-vector {
  0%, 100% {
    opacity: 0.55;
  }

  50% {
    opacity: 1;
  }
}

@keyframes orbit-draw-loop {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -100;
  }
}

@keyframes transfer-dash-flow {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -18;
  }
}

@keyframes transfer-orbit-breathe {
  0%, 100% {
    opacity: 0.32;
    transform: scale(1.16);
  }

  45% {
    opacity: 0.56;
    transform: scale(1.42);
  }

  70% {
    opacity: 0.42;
    transform: scale(1.3);
  }
}
</style>
