<script setup lang="ts">
import { computed } from 'vue'
import { edgePath, type FlowEdge, type FlowNode } from './flowGeometry'

const props = defineProps<{
  clicks: number
}>()

const nodes: FlowNode[] = [
  {
    id: 'events',
    click: 1,
    x: 26,
    y: 22,
    width: 278,
    height: 118,
    title: 'World events',
    subtitle: 'chat, block, entity, inventory',
    icon: 'i-carbon:events',
    iconClass: 'text-green-300',
    className: 'event-cloud',
  },
  {
    id: 'rules',
    click: 2,
    x: 374,
    y: 54,
    width: 178,
    height: 108,
    title: 'Rules',
    subtitle: 'filter noise into signals',
    icon: 'i-carbon:filter',
    iconClass: 'text-sky-300',
    className: 'funnel-lens',
  },
  {
    id: 'plan',
    click: 3,
    x: 642,
    y: 18,
    width: 216,
    height: 108,
    title: 'Plan',
    subtitle: 'LLM decides next action',
    icon: 'i-carbon:idea',
    iconClass: 'text-violet-300',
    className: 'funnel-node plan',
  },
  {
    id: 'execute',
    click: 4,
    x: 514,
    y: 150,
    width: 238,
    height: 104,
    title: 'Execute',
    subtitle: 'TaskExecutor + action registry',
    icon: 'i-carbon:tools',
    iconClass: 'text-teal-300',
    className: 'funnel-node execute',
  },
]

const edges: FlowEdge[] = [
  { id: 'events-rules', from: 'events', to: 'rules', click: 2, bend: 0.44, lift: -10, fromAnchor: { x: 0.96, y: 0.5 }, toAnchor: { x: 0.02, y: 0.5 } },
  { id: 'rules-plan', from: 'rules', to: 'plan', click: 3, bend: 0.42, lift: 34, fromAnchor: { x: 0.98, y: 0.38 }, toAnchor: { x: 0.02, y: 0.58 } },
  { id: 'plan-execute', from: 'plan', to: 'execute', click: 4, bend: 0.5, lift: -26, fromAnchor: { x: 0.48, y: 1 }, toAnchor: { x: 0.84, y: 0.04 } },
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
  <div class="event-funnel">
    <svg class="funnel-lines" viewBox="0 0 900 260" aria-hidden="true">
      <path
        v-for="edge in visibleEdges"
        :key="edge.id"
        :class="{ 'is-visible': edge.visible }"
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
      <template v-if="node.id === 'events'">
        <div class="event-pills">
          <span>chat</span>
          <span>block</span>
          <span>entity</span>
          <span>inventory</span>
        </div>
      </template>
      <span v-else>{{ node.subtitle }}</span>
    </div>
  </div>
</template>

<style scoped>
.event-funnel {
  position: relative;
  height: 260px;
  margin-top: 24px;
}

.funnel-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.funnel-lines path {
  fill: none;
  stroke: rgb(125 211 252 / 86%);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 760;
  stroke-dashoffset: 760;
  opacity: 0;
  filter: drop-shadow(0 0 8px rgb(56 189 248 / 55%)) drop-shadow(0 2px 4px rgb(0 0 0 / 70%));
  transition:
    stroke-dashoffset 620ms ease,
    opacity 240ms ease;
}

.funnel-lines path.is-visible {
  stroke-dashoffset: 0;
  opacity: 1;
}

.event-cloud,
.funnel-lens,
.funnel-node {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 18px;
  border-radius: 18px;
  opacity: 0;
  transform: translateY(18px) scale(0.96);
  transition:
    opacity 360ms ease,
    transform 420ms ease;
}

.event-cloud.is-visible,
.funnel-lens.is-visible,
.funnel-node.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.event-cloud > div:first-child,
.funnel-lens > div:first-child,
.funnel-node > div:first-child {
  width: 30px;
  height: 30px;
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

.event-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.event-pills span {
  padding: 4px 9px;
  border-radius: 999px;
  background: rgb(34 197 94 / 12%);
  color: rgb(187 247 208 / 88%);
}
</style>
