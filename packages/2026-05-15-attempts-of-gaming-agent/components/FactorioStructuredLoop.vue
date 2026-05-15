<script setup lang="ts">
import { animate, stagger } from 'animejs'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import LiquidGlass from './LiquidGlass.vue'

const props = withDefaults(defineProps<{
  clicks?: number
}>(), {
  clicks: 0,
})

interface LoopNode {
  id: string
  title: string
  kicker: string
  detail: string
  icon: string
  color: 'amber' | 'cyan' | 'lime' | 'rose' | 'violet'
  x: number
  y: number
  step: number
}

interface Point {
  x: number
  y: number
}

interface Box {
  left: number
  top: number
  width: number
  height: number
}

interface LoopEdge {
  from: string
  to: string
  step: number
}

const nodes: LoopNode[] = [
  {
    id: 'chat',
    title: 'Human chat',
    kicker: 'Intent',
    detail: 'Goal enters through the chat command',
    icon: 'i-carbon:chat',
    color: 'amber',
    x: 24,
    y: 58,
    step: 0,
  },
  {
    id: 'agent',
    title: 'Agent parser',
    kicker: 'Observe',
    detail: 'Reads chat, stdout, and mod errors',
    icon: 'i-carbon:flow-logs-vpc',
    color: 'cyan',
    x: 248,
    y: 34,
    step: 1,
  },
  {
    id: 'tools',
    title: 'Tool calls',
    kicker: 'State',
    detail: 'Inventory and recipes become typed data',
    icon: 'i-carbon:tools',
    color: 'lime',
    x: 472,
    y: 58,
    step: 2,
  },
  {
    id: 'policy',
    title: 'JSON policy',
    kicker: 'Plan',
    detail: 'LLM returns steps and executable commands',
    icon: 'i-carbon:json',
    color: 'violet',
    x: 690,
    y: 150,
    step: 3,
  },
  {
    id: 'mod',
    title: 'RCON / autorio',
    kicker: 'Act',
    detail: 'The mod moves, mines, and builds',
    icon: 'i-carbon:industry',
    color: 'rose',
    x: 466,
    y: 204,
    step: 4,
  },
  {
    id: 'done',
    title: 'Lua loop',
    kicker: 'Wait',
    detail: 'All operations complete, then continue',
    icon: 'i-carbon:checkmark-outline',
    color: 'cyan',
    x: 142,
    y: 204,
    step: 4,
  },
]

const edges: LoopEdge[] = [
  { from: 'chat', to: 'agent', step: 1 },
  { from: 'agent', to: 'tools', step: 2 },
  { from: 'tools', to: 'policy', step: 3 },
  { from: 'policy', to: 'mod', step: 4 },
  { from: 'mod', to: 'done', step: 4 },
  { from: 'done', to: 'agent', step: 5 },
]

const visibleStep = computed(() => props.clicks)
const activeNodeId = computed(() => nodes[Math.min(props.clicks, nodes.length - 1)]?.id ?? 'chat')
const animatedScope = ref<HTMLElement | null>(null)
const stageElement = ref<HTMLElement | null>(null)
const nodeElements = new Map<string, HTMLElement>()
const svgBox = ref({ width: 920, height: 318 })
const measuredPaths = ref<string[]>([])
const pathAnimation = ref<ReturnType<typeof animate> | null>(null)
let resizeObserver: ResizeObserver | undefined
let measureFrame = 0

function nodeStyle(node: LoopNode) {
  return {
    '--node-x': `${node.x}px`,
    '--node-y': `${node.y}px`,
  }
}

function nodeVisible(node: LoopNode) {
  return node.step <= visibleStep.value
}

function edgeVisible(edge: LoopEdge) {
  return edge.step <= visibleStep.value
}

function setNodeElement(id: string, element: Element | null) {
  if (element instanceof HTMLElement) {
    nodeElements.set(id, element)
    return
  }

  nodeElements.delete(id)
}

function elementBox(element: HTMLElement): Box {
  return {
    left: element.offsetLeft,
    top: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight,
  }
}

function boxCenter(box: Box): Point {
  return {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
  }
}

function edgePoint(box: Box, toward: Point): Point {
  const center = boxCenter(box)
  const dx = toward.x - center.x
  const dy = toward.y - center.y
  const halfWidth = box.width / 2
  const halfHeight = box.height / 2
  const scale = 1 / Math.max(Math.abs(dx) / halfWidth, Math.abs(dy) / halfHeight, 1)

  return {
    x: center.x + dx * scale,
    y: center.y + dy * scale,
  }
}

function pathBetween(fromElement: HTMLElement, toElement: HTMLElement) {
  const fromBox = elementBox(fromElement)
  const toBox = elementBox(toElement)
  const fromCenter = boxCenter(fromBox)
  const toCenter = boxCenter(toBox)
  const start = edgePoint(fromBox, toCenter)
  const end = edgePoint(toBox, fromCenter)
  const midX = (start.x + end.x) / 2

  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} C ${midX.toFixed(1)} ${start.y.toFixed(1)}, ${midX.toFixed(1)} ${end.y.toFixed(1)}, ${end.x.toFixed(1)} ${end.y.toFixed(1)}`
}

function samePaths(left: string[], right: string[]) {
  return left.length === right.length && left.every((item, index) => item === right[index])
}

function measurePaths() {
  const stage = stageElement.value
  if (!stage)
    return false

  const nextSvgBox = {
    width: stage.offsetWidth,
    height: stage.offsetHeight,
  }
  if (svgBox.value.width !== nextSvgBox.width || svgBox.value.height !== nextSvgBox.height)
    svgBox.value = nextSvgBox

  const nextPaths = edges.map(({ from, to }) => {
    const fromElement = nodeElements.get(from)
    const toElement = nodeElements.get(to)

    if (!fromElement || !toElement)
      return ''

    return pathBetween(fromElement, toElement)
  })
  if (samePaths(measuredPaths.value, nextPaths))
    return false

  measuredPaths.value = nextPaths
  return true
}

function scheduleMeasure() {
  if (measureFrame)
    return

  measureFrame = requestAnimationFrame(() => {
    measureFrame = 0
    measurePaths()
  })
}

function restartPathAnimation() {
  pathAnimation.value?.revert()
  const scope = animatedScope.value
  if (!scope)
    return

  const visibleEdges = scope.querySelectorAll<SVGPathElement>('.factorio-animated-edge.is-visible')
  if (!visibleEdges.length)
    return

  pathAnimation.value = animate(visibleEdges, {
    strokeDashoffset: [0, -48],
    duration: 620,
    delay: stagger(130),
    ease: 'linear',
    loop: true,
  })
}

watch(visibleStep, async () => {
  await nextTick()
  measurePaths()
  restartPathAnimation()
})

onMounted(async () => {
  await nextTick()
  measurePaths()
  if (stageElement.value) {
    resizeObserver = new ResizeObserver(scheduleMeasure)
    resizeObserver.observe(stageElement.value)
    for (const element of nodeElements.values())
      resizeObserver.observe(element)
  }
  restartPathAnimation()
})

onBeforeUnmount(() => {
  pathAnimation.value?.revert()
  resizeObserver?.disconnect()
  if (measureFrame)
    cancelAnimationFrame(measureFrame)
})
</script>

<template>
  <section ref="animatedScope" class="factorio-structured-slide">
    <div class="factorio-copy">
      <h1>CodeAct</h1>
      <p>
        先不追求“像人一样看屏幕”，而是把 Factorio 变成一个可读、可执行、可等待的实验场。
      </p>
    </div>

    <div ref="stageElement" class="factorio-stage-shell">
      <svg class="factorio-connections" :viewBox="`0 0 ${svgBox.width} ${svgBox.height}`" aria-hidden="true">
        <defs>
          <filter id="factorioLineGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          v-for="(edge, index) in edges"
          :key="`base-${edge.from}-${edge.to}`"
          class="factorio-base-edge"
          :class="{ 'is-visible': edgeVisible(edge), 'is-return': edge.from === 'done' || edge.to === 'done' }"
          :d="measuredPaths[index]"
        />
        <path
          v-for="(edge, index) in edges"
          :key="`pulse-${edge.from}-${edge.to}`"
          class="factorio-animated-edge"
          :class="{ 'is-visible': edgeVisible(edge), 'is-return': edge.from === 'done' || edge.to === 'done' }"
          :d="measuredPaths[index]"
        />
      </svg>

      <div class="factorio-conveyor top" />
      <div class="factorio-conveyor bottom" />

      <div
        v-for="node in nodes"
        :key="node.id"
        :ref="element => setNodeElement(node.id, element)"
        class="factorio-node-shell"
        :class="[`tone-${node.color}`, { 'is-visible': nodeVisible(node), 'is-active': activeNodeId === node.id }]"
        :style="nodeStyle(node)"
      >
        <LiquidGlass
          :glow="node.color === 'amber' ? 'amber' : node.color === 'cyan' ? 'cyan' : 'neutral'"
          :radius="14"
          style="width: 100%; height: 100%;"
        >
          <div class="factorio-node-content">
            <div class="factorio-node-icon" :class="node.icon" />
            <div class="factorio-node-body">
              <span>{{ node.kicker }}</span>
              <strong>{{ node.title }}</strong>
              <p>{{ node.detail }}</p>
            </div>
          </div>
        </LiquidGlass>
      </div>
    </div>

    <div class="factorio-bottom-row">
      <div class="factorio-takeaway-shell tone-amber">
        <LiquidGlass glow="amber" :radius="14" style="width: 100%; min-height: 58px;">
          <div class="factorio-takeaway">
            <div class="i-carbon:warning-alt" />
            <div>
              <span>Trade-off</span>
              <strong>确定性让 demo 跑起来，但也锁定了游戏接口。</strong>
            </div>
          </div>
        </LiquidGlass>
      </div>
      <div class="factorio-takeaway-shell tone-cyan">
        <LiquidGlass glow="cyan" :radius="14" style="width: 100%; min-height: 58px;">
          <div class="factorio-takeaway">
            <div class="i-carbon:idea" />
            <div>
              <span>What we learned</span>
              <strong>真正困难的是把“状态”变成可规划的世界模型。</strong>
            </div>
          </div>
        </LiquidGlass>
      </div>
    </div>
  </section>
</template>

<style scoped>
.factorio-structured-slide {
  position: absolute;
  inset: 0;
  overflow: hidden;
  color: white;
}

.factorio-copy {
  position: absolute;
  top: 42px;
  left: 50px;
  z-index: 2;
  width: 760px;
}

.factorio-copy h1 {
  margin: 0;
  font-size: 42px;
  line-height: 1.02;
  letter-spacing: 0;
}

.factorio-copy p {
  margin: 12px 0 0;
  color: rgb(255 255 255 / 70%);
  font-size: 16px;
  line-height: 1.45;
}

.factorio-stage-shell {
  position: absolute;
  left: 40px;
  right: 38px;
  top: 122px;
  height: 318px;
  z-index: 2;
}

.factorio-connections {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.factorio-base-edge,
.factorio-animated-edge {
  fill: none;
  stroke: rgb(251 191 36 / 92%);
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transition: opacity 260ms ease;
}

.factorio-base-edge {
  stroke-width: 3.5;
  opacity: 0;
}

.factorio-base-edge.is-visible {
  opacity: 0.42;
}

.factorio-animated-edge {
  stroke-width: 4.5;
  stroke-dasharray: 30 18;
  filter: url('#factorioLineGlow');
}

.factorio-animated-edge.is-visible {
  opacity: 1;
}

.factorio-base-edge.is-return,
.factorio-animated-edge.is-return {
  stroke: rgb(45 212 191 / 92%);
}

.factorio-animated-edge.is-return {
  stroke-width: 3.4;
}

.factorio-conveyor {
  position: absolute;
  z-index: 1;
  left: 34px;
  right: 56px;
  height: 34px;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 8px;
  background:
    repeating-linear-gradient(90deg, rgb(250 204 21 / 0.22) 0 18px, rgb(0 0 0 / 0.12) 18px 28px),
    linear-gradient(180deg, rgb(255 255 255 / 14%), rgb(255 255 255 / 3%));
  box-shadow: inset 0 0 24px rgb(0 0 0 / 52%);
  opacity: 0.34;
  transform: skewX(-10deg);
}

.factorio-conveyor.top {
  top: 86px;
}

.factorio-conveyor.bottom {
  bottom: 42px;
  left: 116px;
  right: 162px;
  opacity: 0.28;
}

.factorio-node-shell {
  --tone-rgb: 255 255 255;
  position: absolute;
  left: var(--node-x);
  top: var(--node-y);
  z-index: 3;
  width: 200px;
  height: 106px;
  opacity: 0;
  transform: translateY(18px) scale(0.94);
  transition:
    opacity 400ms ease,
    transform 460ms cubic-bezier(0.2, 0.8, 0.2, 1),
    filter 260ms ease;
}

.factorio-node-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px;
}

.factorio-node-shell.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.factorio-node-shell.is-active {
  filter: brightness(1.12) saturate(1.1);
}

.factorio-node-shell.is-active :deep(.liquid-glass) {
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 34%),
    inset 0 -1px 0 rgb(255 255 255 / 18%),
    0 0 0 1px rgb(var(--tone-rgb) / 32%),
    0 26px 78px rgb(var(--tone-rgb) / 22%) !important;
}

.tone-amber {
  --tone-rgb: 251 146 60;
}

.tone-cyan {
  --tone-rgb: 34 211 238;
}

.tone-lime {
  --tone-rgb: 132 204 22;
}

.tone-rose {
  --tone-rgb: 251 113 133;
}

.tone-violet {
  --tone-rgb: 167 139 250;
}

.factorio-node-icon {
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  color: rgb(var(--tone-rgb));
  filter: drop-shadow(0 0 14px rgb(var(--tone-rgb) / 42%));
}

.factorio-node-body {
  min-width: 0;
}

.factorio-node-body span,
.factorio-takeaway span {
  display: block;
  color: rgb(var(--tone-rgb) / 86%);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.13em;
  line-height: 1;
  text-transform: uppercase;
}

.factorio-node-body strong {
  display: block;
  margin-top: 6px;
  color: rgb(255 255 255 / 94%);
  font-size: 17px;
  line-height: 1.1;
}

.factorio-node-body p {
  margin: 6px 0 0;
  color: rgb(255 255 255 / 58%);
  font-size: 12px;
  line-height: 1.32;
}

.factorio-bottom-row {
  position: absolute;
  left: 50px;
  right: 50px;
  bottom: 30px;
  z-index: 2;
  display: flex;
  gap: 16px;
}

.factorio-takeaway-shell {
  --tone-rgb: 251 146 60;
  flex: 1;
}

.factorio-takeaway {
  min-height: 58px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 12px 16px;
}

.factorio-takeaway > div:first-child {
  width: 28px;
  height: 28px;
  color: rgb(var(--tone-rgb));
}

.factorio-takeaway strong {
  display: block;
  margin-top: 4px;
  color: rgb(255 255 255 / 86%);
  font-size: 15px;
  line-height: 1.35;
}
</style>
