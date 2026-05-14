<script setup lang="ts">
import { animate, stagger, svg } from 'animejs'
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

const stage = {
  width: 920,
  height: 354,
  cardWidth: 176,
  cardHeight: 98,
}

const nodes: LoopNode[] = [
  {
    id: 'chat',
    title: 'Human chat',
    kicker: 'intent',
    detail: '玩家直接在聊天栏说目标',
    icon: 'i-carbon:chat',
    color: 'amber',
    x: 42,
    y: 56,
    step: 0,
  },
  {
    id: 'agent',
    title: 'Agent parser',
    kicker: 'stdout',
    detail: '解析 chat / command / mod error',
    icon: 'i-carbon:flow-logs-vpc',
    color: 'cyan',
    x: 270,
    y: 42,
    step: 1,
  },
  {
    id: 'tools',
    title: 'Tool calls',
    kicker: 'state',
    detail: 'inventory 与 recipe 先结构化',
    icon: 'i-carbon:tools',
    color: 'lime',
    x: 500,
    y: 58,
    step: 2,
  },
  {
    id: 'policy',
    title: 'JSON policy',
    kicker: 'plan',
    detail: 'LLM 产出计划、步骤与命令',
    icon: 'i-carbon:json',
    color: 'violet',
    x: 698,
    y: 160,
    step: 3,
  },
  {
    id: 'mod',
    title: 'RCON / autorio',
    kicker: 'act',
    detail: 'mod 执行移动、挖矿、建造',
    icon: 'i-carbon:industry',
    color: 'rose',
    x: 470,
    y: 236,
    step: 4,
  },
  {
    id: 'done',
    title: 'Completed signal',
    kicker: 'feedback',
    detail: 'All operations completed 触发下一轮',
    icon: 'i-carbon:checkmark-outline',
    color: 'cyan',
    x: 142,
    y: 232,
    step: 4,
  },
]

const edges = [
  ['chat', 'agent'],
  ['agent', 'tools'],
  ['tools', 'policy'],
  ['policy', 'mod'],
  ['mod', 'done'],
  ['done', 'agent'],
] as const

const visibleStep = computed(() => props.clicks)
const activeNodeId = computed(() => nodes[Math.min(props.clicks, nodes.length - 1)]?.id ?? 'chat')
const animatedScope = ref<HTMLElement | null>(null)
const pathAnimation = ref<ReturnType<typeof animate> | null>(null)

function centerOf(id: string) {
  const node = nodes.find(item => item.id === id)
  if (!node)
    throw new Error(`Unknown Factorio loop node: ${id}`)

  return {
    x: node.x + stage.cardWidth / 2,
    y: node.y + stage.cardHeight / 2,
  }
}

function edgePath(fromId: string, toId: string) {
  const from = centerOf(fromId)
  const to = centerOf(toId)
  const dx = to.x - from.x
  const bend = Math.max(34, Math.min(92, Math.abs(dx) * 0.34))
  const verticalBias = to.y > from.y ? 34 : -34

  if (fromId === 'done' && toId === 'agent') {
    return `M ${from.x} ${from.y - 18} C ${from.x + 18} ${from.y - 118}, ${to.x - 78} ${to.y + 106}, ${to.x - 10} ${to.y + 42}`
  }

  return `M ${from.x + Math.sign(dx || 1) * 62} ${from.y} C ${from.x + bend} ${from.y + verticalBias}, ${to.x - bend} ${to.y - verticalBias}, ${to.x - Math.sign(dx || 1) * 62} ${to.y}`
}

function nodeStyle(node: LoopNode) {
  return {
    '--node-x': `${node.x}px`,
    '--node-y': `${node.y}px`,
  }
}

function nodeVisible(node: LoopNode) {
  return node.step <= visibleStep.value
}

function edgeVisible(index: number) {
  return index + 1 <= visibleStep.value
}

function restartPathAnimation() {
  pathAnimation.value?.revert()
  const scope = animatedScope.value
  if (!scope)
    return

  const drawables = svg.createDrawable(scope.querySelectorAll<SVGPathElement>('.factorio-animated-edge.is-visible'))
  pathAnimation.value = animate(drawables, {
    draw: ['0 0', '0 1', '1 1'],
    duration: 2200,
    delay: stagger(130),
    ease: 'inOutQuad',
    loop: true,
  })
}

watch(visibleStep, async () => {
  await nextTick()
  restartPathAnimation()
})

onMounted(async () => {
  await nextTick()
  restartPathAnimation()
})

onBeforeUnmount(() => {
  pathAnimation.value?.revert()
})
</script>

<template>
  <section ref="animatedScope" class="factorio-structured-slide">
    <img class="factorio-backdrop" src="/game-banners/factorio-banner.png" alt="">
    <div class="factorio-shade" />

    <div class="factorio-copy">
      <div class="factorio-eyebrow">
        <span class="factorio-dot" />
        LemonNeko / Factorio
      </div>
      <h1>Structured API loop</h1>
      <p>
        先不追求“像人一样看屏幕”，而是把 Factorio 变成一个可读、可执行、可等待的实验场。
      </p>
    </div>

    <div class="factorio-stage-shell">
      <svg class="factorio-connections" :viewBox="`0 0 ${stage.width} ${stage.height}`" aria-hidden="true">
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
          v-for="([from, to], index) in edges"
          :key="`${from}-${to}`"
          class="factorio-animated-edge"
          :class="{ 'is-visible': edgeVisible(index), 'is-return': from === 'done' }"
          :d="edgePath(from, to)"
        />
      </svg>

      <div class="factorio-conveyor top" />
      <div class="factorio-conveyor bottom" />

      <div
        v-for="node in nodes"
        :key="node.id"
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
  background: #060707;
  color: white;
}

.factorio-backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.9) brightness(0.58) contrast(1.08);
  opacity: 0.72;
}

.factorio-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgb(0 0 0 / 86%) 0%, rgb(0 0 0 / 54%) 38%, rgb(0 0 0 / 30%) 100%),
    linear-gradient(180deg, rgb(0 0 0 / 54%) 0%, transparent 44%, rgb(0 0 0 / 70%) 100%);
}

.factorio-copy {
  position: absolute;
  top: 38px;
  left: 50px;
  z-index: 2;
  width: 390px;
}

.factorio-eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  color: rgb(253 186 116 / 88%);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.factorio-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgb(251 146 60);
  box-shadow: 0 0 22px rgb(251 146 60 / 90%);
}

.factorio-copy h1 {
  margin: 12px 0 0;
  font-size: 42px;
  line-height: 1.02;
  letter-spacing: 0;
}

.factorio-copy p {
  margin: 14px 0 0;
  color: rgb(255 255 255 / 70%);
  font-size: 17px;
  line-height: 1.65;
}

.factorio-stage-shell {
  position: absolute;
  left: 40px;
  right: 38px;
  top: 132px;
  height: 354px;
  z-index: 2;
}

.factorio-connections {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.factorio-animated-edge {
  fill: none;
  stroke: rgb(251 191 36 / 92%);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  filter: url('#factorioLineGlow');
  transition: opacity 260ms ease;
}

.factorio-animated-edge.is-visible {
  opacity: 1;
}

.factorio-animated-edge.is-return {
  stroke: rgb(45 212 191 / 92%);
  stroke-width: 3.4;
}

.factorio-conveyor {
  position: absolute;
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
  top: 84px;
}

.factorio-conveyor.bottom {
  bottom: 52px;
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
  width: 176px;
  height: 98px;
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
  gap: 12px;
  padding: 14px;
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
  width: 42px;
  height: 42px;
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
  font-size: 16px;
  line-height: 1.1;
}

.factorio-node-body p {
  margin: 6px 0 0;
  color: rgb(255 255 255 / 58%);
  font-size: 11px;
  line-height: 1.35;
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
