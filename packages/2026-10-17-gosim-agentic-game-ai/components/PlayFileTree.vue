<script setup lang="ts">
/**
 * One recorder Play on disk (artifacts-v1 layout), growing click by click:
 * the recorder's capture first, then derived outputs, then a producer
 * extension, and finally a declared gap. Curved links draw in like the
 * vieval trace tree; everything is CSS transitions keyed on `clicks`, so a
 * slide opened directly at a later click renders the settled frame.
 */
import { computed } from 'vue'

const props = defineProps<{
  clicks: number
}>()

type Kind = 'folder' | 'json' | 'jsonl' | 'zip' | 'db' | 'video'

interface Row {
  name: string
  kind: Kind
  depth: number
  showAt: number
  /** Clicks at which this row is the one the code pane talks about. */
  hot: number[]
  parent?: number
}

const ROW = 27
const INDENT = 22

const rows: Row[] = [
  { name: 'plays/<start>--<connection>/', kind: 'folder', depth: 0, showAt: 0, hot: [0] },
  { name: 'metadata.json', kind: 'json', depth: 1, showAt: 0, hot: [0], parent: 0 },
  { name: 'capture/', kind: 'folder', depth: 1, showAt: 1, hot: [], parent: 0 },
  { name: 'events.jsonl', kind: 'jsonl', depth: 2, showAt: 1, hot: [1, 2], parent: 2 },
  { name: 'replay.zip', kind: 'zip', depth: 2, showAt: 1, hot: [1], parent: 2 },
  { name: 'actions.jsonl', kind: 'jsonl', depth: 1, showAt: 3, hot: [3], parent: 0 },
  { name: 'scene.sqlite3', kind: 'db', depth: 1, showAt: 3, hot: [3], parent: 0 },
  { name: 'perception.jsonl', kind: 'jsonl', depth: 1, showAt: 3, hot: [3, 5], parent: 0 },
  { name: 'renders/fpv.mp4', kind: 'video', depth: 1, showAt: 3, hot: [3], parent: 0 },
  { name: 'extensions/airicraft.planner/', kind: 'folder', depth: 1, showAt: 4, hot: [], parent: 0 },
  { name: 'planner-calls.jsonl', kind: 'jsonl', depth: 2, showAt: 4, hot: [4], parent: 9 },
]

interface Group {
  from: number
  to: number
  showAt: number
  label: string
  zh: string
  color: string
}

// The three principles live on the tree itself instead of in cards.
const groups: Group[] = [
  { from: 2, to: 4, showAt: 1, label: 'recorded on the server', zh: '服务端录，只追加', color: '#456E95' },
  { from: 5, to: 8, showAt: 3, label: 'derived, never changed', zh: '派生出来，原始数据不动', color: '#CEAA5B' },
  { from: 9, to: 10, showAt: 4, label: 'same clock', zh: '模型调用也对齐 tick', color: '#E87AA4' },
]

const GAP_AT = 5
const PERCEPTION = 7

function x(depth: number) {
  return depth * INDENT
}

function y(i: number) {
  return i * ROW + ROW / 2
}

/** Elbow from the parent's icon down to the child, rounded like a file tree. */
function link(i: number) {
  const row = rows[i]
  const p = row.parent!
  const px = x(rows[p].depth) + 7
  const top = y(p) + 9
  const cy = y(i)
  const cx = x(row.depth) - 3
  return `M${px} ${top}V${cy - 7}Q${px} ${cy} ${px + 7} ${cy}H${cx}`
}

function linkDelay(i: number) {
  const siblings = rows.filter(r => r.showAt === rows[i].showAt)
  return `${siblings.indexOf(rows[i]) * 70}ms`
}

const height = rows.length * ROW
const gap = computed(() => props.clicks >= GAP_AT)
</script>

<template>
  <div class="tree" :style="{ height: `${height}px` }">
    <svg class="links" :width="280" :height="height" aria-hidden="true">
      <template v-for="(row, i) in rows" :key="row.name">
        <path
          v-if="row.parent !== undefined"
          :d="link(i)"
          pathLength="1"
          class="link"
          :class="{ on: clicks >= row.showAt, derived: row.showAt === 3 }"
          :style="{ transitionDelay: clicks >= row.showAt ? linkDelay(i) : '0ms' }"
        />
      </template>
    </svg>

    <div
      v-for="(row, i) in rows"
      :key="row.name"
      class="row"
      :class="{
        on: clicks >= row.showAt,
        hot: row.hot.includes(clicks),
        gap: gap && i === PERCEPTION,
      }"
      :style="{
        top: `${i * ROW}px`,
        left: `${x(row.depth) + 4}px`,
        transitionDelay: clicks >= row.showAt ? `calc(${linkDelay(i)} + 140ms)` : '0ms',
      }"
    >
      <span class="icon" :class="row.kind">
        <template v-if="row.kind === 'jsonl'"><i /><i /><i /></template>
        <template v-else-if="row.kind === 'json'">{ }</template>
        <template v-else-if="row.kind === 'db'"><i /><i /></template>
        <template v-else-if="row.kind === 'video'"><b /></template>
        <template v-else-if="row.kind === 'zip'"><i /></template>
      </span>
      <span class="name">{{ row.name }}</span>
      <span v-if="i === PERCEPTION" class="gap-badge" :class="{ on: gap }">missing ≠ empty</span>
    </div>

    <div
      v-for="g in groups"
      :key="g.label"
      class="group"
      :class="{ on: clicks >= g.showAt }"
      :style="{
        'top': `${g.from * ROW + 4}px`,
        'height': `${(g.to - g.from + 1) * ROW - 8}px`,
        '--c': g.color,
      }"
    >
      <div class="label">
        {{ g.label }}
      </div>
      <div class="zh-small">
        {{ g.zh }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree {
  position: relative;
  width: 448px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.links {
  position: absolute;
  left: 4px;
  top: 0;
  overflow: visible;
}

.link {
  fill: none;
  stroke: rgb(10 37 64 / 28%);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0;
  transition:
    stroke-dashoffset 520ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 200ms ease;
}

.link.on {
  stroke-dashoffset: 0;
  opacity: 1;
}

.row {
  position: absolute;
  height: 27px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding-right: 8px;
  font-size: 12.5px;
  color: rgb(10 37 64 / 62%);
  white-space: nowrap;
  opacity: 0;
  transform: translateY(6px);
  transform-origin: left center;
  transition:
    opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 640ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 420ms ease,
    color 300ms ease;
}

.row.on {
  opacity: 1;
  transform: none;
  filter: none;
}

.row.hot {
  color: #0a2540;
  font-weight: 700;
}

.row .name {
  position: relative;
}

.row.hot .name::after {
  content: '';
  position: absolute;
  left: -4px;
  right: -6px;
  top: -3px;
  bottom: -3px;
  z-index: -1;
  border-radius: 7px;
  background: rgb(247 219 143 / 55%);
}

.row.gap .name {
  color: #b7791f;
  text-decoration: line-through dashed rgb(183 121 31 / 60%);
}

.row.gap .name::after {
  background: rgb(247 219 143 / 35%);
  outline: 1.5px dashed #d69e2e;
}

.icon {
  width: 14px;
  height: 16px;
  flex: none;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  padding: 0 3px;
  border-radius: 3px;
  font-size: 7px;
  line-height: 1;
  color: #fff;
  background: #6292bf;
  box-shadow: 0 2px 6px rgb(10 37 64 / 12%);
}

.icon.folder {
  width: 16px;
  height: 12px;
  border-radius: 2px 4px 4px 4px;
  background: #91d2dd;
  position: relative;
}

.icon.folder::before {
  content: '';
  position: absolute;
  left: 0;
  top: -3px;
  width: 7px;
  height: 4px;
  border-radius: 2px 2px 0 0;
  background: #91d2dd;
}

.icon.json {
  background: #456e95;
  align-items: center;
  letter-spacing: -1px;
}

.icon i {
  display: block;
  height: 1.5px;
  border-radius: 1px;
  background: rgb(255 255 255 / 85%);
}

.icon.jsonl i:nth-child(2) {
  width: 70%;
}

.icon.jsonl i:nth-child(3) {
  width: 45%;
}

.icon.zip {
  background: #ceaa5b;
  align-items: center;
}

.icon.zip i {
  width: 2px;
  height: 9px;
  width: 0;
  background: none;
  border-left: 2px dotted #fff;
}

.icon.db {
  background: #293655;
}

.icon.db i {
  height: 3px;
  border-radius: 50%;
}

.icon.video {
  background: #e87aa4;
  align-items: center;
}

.icon.video b {
  width: 0;
  height: 0;
  border-left: 5px solid #fff;
  border-top: 3.5px solid transparent;
  border-bottom: 3.5px solid transparent;
}

.gap-badge {
  margin-left: 6px;
  padding: 2px 8px;
  border-radius: 99px;
  font-size: 10.5px;
  font-weight: 700;
  color: #8a5a12;
  background: #fdf0c8;
  border: 1px solid #e9c46a;
  opacity: 0;
  transform: none;
  transition:
    opacity 380ms ease,
    transform 560ms cubic-bezier(0.22, 1, 0.36, 1);
}

.gap-badge.on {
  opacity: 1;
  transform: none;
}

.group {
  position: absolute;
  left: 292px;
  width: 156px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 18px;
  font-family: Quicksand, 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  opacity: 0;
  transform: translateX(-8px);
  transition:
    opacity 420ms cubic-bezier(0.22, 1, 0.36, 1) 260ms,
    transform 640ms cubic-bezier(0.22, 1, 0.36, 1) 260ms;
}

.group.on {
  opacity: 1;
  transform: none;
}

/* A soft "}" bracket facing the files it groups: rounded corners and ends. */
.group::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 8px;
  border: 2.5px solid var(--c);
  border-left: none;
  border-radius: 0 9px 9px 0;
}

.group .label {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--c);
}

.zh-small {
  margin-top: 2px;
  font-size: 10.5px;
  color: rgb(10 37 64 / 55%);
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
}

@media (prefers-reduced-motion: reduce) {
  .row,
  .link,
  .group,
  .gap-badge {
    transition-duration: 1ms !important;
  }
}
</style>
