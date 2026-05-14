<script setup lang="ts">
import { computed } from 'vue'
import { edgePath, type FlowEdge, type FlowNode } from './flowGeometry'

const props = defineProps<{
  clicks: number
}>()

const nodes: FlowNode[] = [
  {
    id: 'client',
    click: 1,
    x: 308,
    y: 106,
    width: 286,
    height: 142,
    title: 'Fabric Client',
    subtitle: 'first-person runtime + mixins',
    icon: 'i-carbon:screen',
    iconClass: 'text-cyan-200',
    className: 'fabric-center',
  },
  {
    id: 'look',
    click: 2,
    x: 18,
    y: 30,
    width: 238,
    height: 116,
    title: 'take_a_look',
    subtitle: 'visual tool via screenshot',
    tag: 'senses',
    icon: 'i-carbon:view',
    iconClass: 'text-sky-300',
    className: 'fabric-tool look',
  },
  {
    id: 'goal',
    click: 3,
    x: 638,
    y: 28,
    width: 242,
    height: 116,
    title: 'Goal Director',
    subtitle: 'intent to behavior tree',
    tag: 'planning',
    icon: 'i-carbon:tree-view-alt',
    iconClass: 'text-violet-300',
    className: 'fabric-tool goal',
  },
  {
    id: 'controls',
    click: 4,
    x: 616,
    y: 226,
    width: 254,
    height: 116,
    title: 'Look / Move / Chat',
    subtitle: 'client-side embodied controls',
    tag: 'actuation',
    icon: 'i-carbon:movement',
    iconClass: 'text-teal-300',
    className: 'fabric-tool controls',
  },
]

const edges: FlowEdge[] = [
  { id: 'client-look', from: 'client', to: 'look', click: 2, bend: 0.5, lift: 48, fromAnchor: { x: 0.1, y: 0.34 }, toAnchor: { x: 1, y: 0.5 } },
  { id: 'client-goal', from: 'client', to: 'goal', click: 3, bend: 0.5, lift: 52, fromAnchor: { x: 0.88, y: 0.32 }, toAnchor: { x: 0, y: 0.54 } },
  { id: 'client-controls', from: 'client', to: 'controls', click: 4, bend: 0.46, lift: -36, fromAnchor: { x: 0.86, y: 0.74 }, toAnchor: { x: 0, y: 0.44 } },
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
  <div class="fabric-orbit">
    <svg class="fabric-lines" viewBox="0 0 900 360" aria-hidden="true">
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
      <div>
        <div v-if="node.tag" class="fabric-tag">
          {{ node.tag }}
        </div>
        <strong>{{ node.title }}</strong>
        <span>{{ node.subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fabric-orbit {
  position: relative;
  height: 360px;
  margin-top: 30px;
}

.fabric-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.fabric-lines path {
  fill: none;
  stroke: rgb(165 243 252 / 84%);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 760;
  stroke-dashoffset: 760;
  opacity: 0;
  filter: drop-shadow(0 0 10px rgb(103 232 249 / 42%)) drop-shadow(0 2px 5px rgb(0 0 0 / 76%));
  transition:
    stroke-dashoffset 620ms ease,
    opacity 240ms ease;
}

.fabric-lines path.is-visible {
  stroke-dashoffset: 0;
  opacity: 1;
}

.fabric-center,
.fabric-tool {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border-radius: 18px;
  opacity: 0;
  transform: translateY(18px) scale(0.96);
  transition:
    opacity 360ms ease,
    transform 420ms ease;
}

.fabric-center {
  justify-content: center;
}

.fabric-center.is-visible,
.fabric-tool.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fabric-center > div:first-child,
.fabric-tool > div:first-child {
  width: 34px;
  height: 34px;
  flex: none;
}

strong,
span {
  display: block;
}

strong {
  font-size: 20px;
  line-height: 1.15;
}

span {
  margin-top: 7px;
  color: rgb(255 255 255 / 58%);
  font-size: 13px;
  line-height: 1.35;
}

.fabric-tag {
  margin-bottom: 5px;
  color: rgb(255 255 255 / 44%);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
