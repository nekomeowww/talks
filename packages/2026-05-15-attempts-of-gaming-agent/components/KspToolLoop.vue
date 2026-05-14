<script setup lang="ts">
import { computed } from 'vue'
import { edgePath, type FlowEdge, type FlowNode } from './flowGeometry'

const props = defineProps<{
  clicks: number
}>()

const nodes: FlowNode[] = [
  {
    id: 'goal',
    click: 1,
    x: 38,
    y: 102,
    width: 220,
    height: 116,
    title: 'User Goal',
    subtitle: 'TUI AgentLoop receives the task',
    icon: 'i-carbon:terminal',
    iconClass: 'text-lime-300',
    className: 'ksp-node goal',
  },
  {
    id: 'tool',
    click: 2,
    x: 348,
    y: 28,
    width: 238,
    height: 118,
    title: 'Tool Call',
    subtitle: 'Pydantic schema + OpenAI-compatible chat',
    icon: 'i-carbon:api-1',
    iconClass: 'text-sky-300',
    className: 'ksp-node tool',
  },
  {
    id: 'flight',
    click: 3,
    x: 638,
    y: 122,
    width: 244,
    height: 122,
    title: 'kRPC / MechJeb',
    subtitle: 'vessel, flight, staging, transfer tools',
    icon: 'i-carbon:rocket',
    iconClass: 'text-orange-300',
    className: 'ksp-node flight',
  },
  {
    id: 'result',
    click: 4,
    x: 328,
    y: 222,
    width: 246,
    height: 112,
    title: 'JSON Result',
    subtitle: 'next tool or final reply',
    icon: 'i-carbon:reply',
    iconClass: 'text-teal-300',
    className: 'ksp-node result',
  },
]

const edges: FlowEdge[] = [
  { id: 'goal-tool', from: 'goal', to: 'tool', click: 2, bend: 0.5, lift: 54, fromAnchor: { x: 1, y: 0.38 }, toAnchor: { x: 0, y: 0.54 } },
  { id: 'tool-flight', from: 'tool', to: 'flight', click: 3, bend: 0.48, lift: 18, fromAnchor: { x: 1, y: 0.58 }, toAnchor: { x: 0, y: 0.42 } },
  { id: 'flight-result', from: 'flight', to: 'result', click: 4, bend: 0.5, lift: -52, fromAnchor: { x: 0.22, y: 1 }, toAnchor: { x: 1, y: 0.56 } },
  { id: 'result-goal', from: 'result', to: 'goal', click: 4, bend: 0.42, lift: -36, fromAnchor: { x: 0, y: 0.5 }, toAnchor: { x: 0.78, y: 1 } },
]

const visibleEdges = computed(() =>
  edges.map(edge => ({
    ...edge,
    d: edgePath(nodes, edge),
    visible: props.clicks >= edge.click,
  })),
)
</script>

<template>
  <div class="ksp-loop">
    <svg class="ksp-loop-lines" viewBox="0 0 900 360" aria-hidden="true">
      <path
        v-for="edge in visibleEdges"
        :key="edge.id"
        :class="{ 'is-visible': edge.visible, 'is-return': edge.id === 'result-goal' }"
        :d="edge.d"
      />
    </svg>

    <div
      v-for="node in nodes"
      :key="node.id"
      :class="[node.className, { 'is-visible': clicks >= node.click }]"
      :style="{ left: `${node.x}px`, top: `${node.y}px`, width: `${node.width}px`, height: `${node.height}px` }"
    >
      <div :class="[node.icon, node.iconClass]" />
      <strong>{{ node.title }}</strong>
      <span>{{ node.subtitle }}</span>
    </div>
  </div>
</template>

<style scoped>
.ksp-loop {
  position: relative;
  height: 360px;
  margin-top: 36px;
}

.ksp-loop-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.ksp-loop-lines path {
  fill: none;
  stroke: rgb(190 242 100 / 88%);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 820;
  stroke-dashoffset: 820;
  opacity: 0;
  filter: drop-shadow(0 0 8px rgb(190 242 100 / 42%)) drop-shadow(0 2px 4px rgb(0 0 0 / 76%));
  transition:
    stroke-dashoffset 680ms ease,
    opacity 240ms ease;
}

.ksp-loop-lines path.is-return {
  stroke: rgb(94 234 212 / 86%);
}

.ksp-loop-lines path.is-visible {
  stroke-dashoffset: 0;
  opacity: 1;
}

.ksp-node {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 17px;
  border-radius: 18px;
  opacity: 0;
  transform: translateY(18px) scale(0.96);
  transition:
    opacity 360ms ease,
    transform 420ms ease;
}

.ksp-node.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.ksp-node > div:first-child {
  width: 31px;
  height: 31px;
}

strong {
  font-size: 19px;
  line-height: 1.15;
}

span {
  color: rgb(255 255 255 / 58%);
  font-size: 13px;
  line-height: 1.35;
}
</style>
