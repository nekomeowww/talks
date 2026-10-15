<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

/**
 * AIRI as a tech tree, seen through a camera.
 *
 * The root sits top-right. A trunk runs down-left from it; each branch hangs
 * off the trunk and its leaves extend to the left in lanes (wrapping after
 * PER_ROW leaves). Every click the camera flies (~1.2 s, with a small zoom-out
 * dip mid-flight) to the branches that appear at that click, so the camera
 * travels top-right -> bottom-left. After the last group it pulls back to the
 * whole tree and a legend fades in. Opening the slide at a later click
 * renders the settled frame.
 *
 * Leaf status: done (green, check), wip (gold, half ring), open (dashed).
 * The component fills its positioned parent (the slide, 980x552).
 */

export interface TreeNode {
  id: string
  label: string
  zh?: string
  parent?: string
  showAt: number
  status?: 'done' | 'wip' | 'open'
}

const props = defineProps<{
  nodes: TreeNode[]
  clicks: number
}>()

const VW = 980
const VH = 552
const PER_ROW = 4
const ROW = 64
const LANE_GAP = 14
const COL_GAP = 18
const STEM = 34
const SLANT = 0.36
const SIZE = {
  root: { w: 280, h: 76 },
  branch: { w: 196, h: 56 },
  leaf: { w: 230, h: 52 },
}

const rootNode = computed(() => props.nodes.find(n => !n.parent)!)
const branches = computed(() => props.nodes.filter(n => n.parent === rootNode.value.id))
const leavesOf = (id: string) => props.nodes.filter(n => n.parent === id)
const kind = (n: TreeNode) => !n.parent ? 'root' : n.parent === rootNode.value.id ? 'branch' : 'leaf'
const sizeOf = (n: TreeNode) => SIZE[kind(n)]

// x of the trunk's right column at height y: lower rows drift left.
const anchor = (y: number) => -SLANT * y
const trunkX = (y: number) => anchor(y) + 24
const ROOT_Y = -100

const layout = computed(() => {
  const pos = new Map<string, { x: number, y: number }>()
  const root = rootNode.value
  const rootBottom = ROOT_Y + SIZE.root.h / 2
  pos.set(root.id, { x: trunkX(rootBottom) - SIZE.root.w / 2 + 70, y: ROOT_Y })
  let row = 0
  branches.value.forEach((b, lane) => {
    const leaves = leavesOf(b.id)
    const rows = Math.max(1, Math.ceil(leaves.length / PER_ROW))
    const ys = Array.from({ length: rows }, (_, k) => (row + k) * ROW + lane * LANE_GAP)
    row += rows
    const by = ys.reduce((a, c) => a + c, 0) / ys.length
    const bx = anchor(by) - SIZE.branch.w / 2
    pos.set(b.id, { x: bx, y: by })
    leaves.forEach((l, k) => {
      const col = k % PER_ROW
      const lx = bx - SIZE.branch.w / 2 - STEM - SIZE.leaf.w / 2 - col * (SIZE.leaf.w + COL_GAP)
      pos.set(l.id, { x: lx, y: ys[Math.floor(k / PER_ROW)] })
    })
  })
  return pos
})

function bbox(list: TreeNode[]) {
  let x0 = Infinity
  let y0 = Infinity
  let x1 = -Infinity
  let y1 = -Infinity
  list.forEach((n) => {
    const p = layout.value.get(n.id)!
    const s = sizeOf(n)
    x0 = Math.min(x0, p.x - s.w / 2)
    x1 = Math.max(x1, p.x + s.w / 2)
    y0 = Math.min(y0, p.y - s.h / 2)
    y1 = Math.max(y1, p.y + s.h / 2)
  })
  return { x0, y0, x1, y1 }
}

const lastStep = computed(() => Math.max(...props.nodes.map(n => n.showAt)))
const isFinal = computed(() => props.clicks > lastStep.value)

// Camera: world point (x, y) lands on slide point (cx, cy) at scale s.
interface Cam { x: number, y: number, s: number, cx: number, cy: number }
interface Region { x0: number, y0: number, x1: number, y1: number, max: number }

// The title owns the top-left on the opening shot only.
function regionFor(click: number): Region {
  if (click > lastStep.value)
    return { x0: 30, y0: 30, x1: VW - 30, y1: VH - 62, max: 9 }
  if (click <= 0)
    return { x0: 600, y0: 210, x1: VW - 40, y1: 430, max: 1.4 }
  return { x0: 34, y0: 50, x1: VW - 34, y1: VH - 50, max: 1.2 }
}

function cameraFor(click: number): Cam {
  const list = click > lastStep.value
    ? props.nodes
    : props.nodes.filter(n => n.showAt === Math.max(0, click) || (click === 1 && !n.parent))
  const b = bbox(list)
  const r = regionFor(click)
  const s = Math.min(r.max, (r.x1 - r.x0) / (b.x1 - b.x0), (r.y1 - r.y0) / (b.y1 - b.y0))
  return { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2, s, cx: (r.x0 + r.x1) / 2, cy: (r.y0 + r.y1) / 2 }
}

const cam = ref<Cam>(cameraFor(props.clicks))
const instant = ref(true)
let raf = 0

function fly(to: Cam) {
  cancelAnimationFrame(raf)
  const from = { ...cam.value }
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    cam.value = to
    return
  }
  const t0 = performance.now()
  const dur = 1200
  const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / dur)
    const e = ease(t)
    const dip = 1 - 0.14 * Math.sin(Math.PI * t)
    cam.value = {
      x: from.x + (to.x - from.x) * e,
      y: from.y + (to.y - from.y) * e,
      s: (from.s + (to.s - from.s) * e) * dip,
      cx: from.cx + (to.cx - from.cx) * e,
      cy: from.cy + (to.cy - from.cy) * e,
    }
    if (t < 1)
      raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

watch(() => props.clicks, (c) => {
  instant.value = false
  fly(cameraFor(c))
})

onMounted(() => {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    instant.value = false
  }))
})
onBeforeUnmount(() => cancelAnimationFrame(raf))

const camStyle = computed(() => {
  const { x, y, s, cx, cy } = cam.value
  return { transform: `translate(${cx - x * s}px, ${cy - y * s}px) scale(${s})` }
})

const shown = (n: TreeNode) => props.clicks >= n.showAt

// Reveal order within a click: branch first, then its leaves left to right.
const order = computed(() => {
  const m = new Map<string, number>()
  const counts = new Map<number, number>()
  props.nodes.forEach((n) => {
    const k = counts.get(n.showAt) ?? 0
    m.set(n.id, k)
    counts.set(n.showAt, k + 1)
  })
  return m
})
const delay = (n: TreeNode) => 500 + order.value.get(n.id)! * 70

interface Edge { id: string, d: string, node: TreeNode }
const edges = computed<Edge[]>(() => {
  const list: Edge[] = []
  const root = rootNode.value
  const rp = layout.value.get(root.id)!
  let prevY = rp.y + SIZE.root.h / 2
  branches.value.forEach((b) => {
    const p = layout.value.get(b.id)!
    const r = 16
    const right = p.x + SIZE.branch.w / 2
    const d = `M ${trunkX(prevY)} ${prevY} L ${trunkX(p.y - r)} ${p.y - r} Q ${trunkX(p.y)} ${p.y}, ${trunkX(p.y) - r} ${p.y} L ${right} ${p.y}`
    list.push({ id: `t-${b.id}`, d, node: b })
    prevY = p.y
    let prev: TreeNode | undefined
    leavesOf(b.id).forEach((l, k) => {
      const lp = layout.value.get(l.id)!
      const lr = lp.x + SIZE.leaf.w / 2
      if (k % PER_ROW === 0) {
        const x1 = p.x - SIZE.branch.w / 2
        const mx = x1 - STEM / 2
        const ld = lp.y === p.y
          ? `M ${x1} ${p.y} L ${lr} ${lp.y}`
          : `M ${x1} ${p.y} C ${mx} ${p.y}, ${mx} ${lp.y}, ${lr} ${lp.y}`
        list.push({ id: `l-${l.id}`, d: ld, node: l })
      }
      else {
        const pp = layout.value.get(prev!.id)!
        list.push({ id: `l-${l.id}`, d: `M ${pp.x - SIZE.leaf.w / 2} ${lp.y} L ${lr} ${lp.y}`, node: l })
      }
      prev = l
    })
  })
  return list
})

defineExpose({ isFinal })
</script>

<template>
  <div class="viewport" :class="{ instant }">
    <div class="world" :style="camStyle">
      <svg class="edges" width="1" height="1">
        <path
          v-for="e in edges"
          :key="e.id"
          :d="e.d"
          class="edge"
          :class="[e.node.status, { shown: shown(e.node) }]"
          :style="{ '--d': `${delay(e.node) - 150}ms` }"
        />
      </svg>
      <div
        v-for="n in nodes"
        :key="n.id"
        class="cap"
        :class="[`k-${kind(n)}`, n.status, { shown: shown(n) }]"
        :style="{
          'left': `${layout.get(n.id)!.x}px`,
          'top': `${layout.get(n.id)!.y}px`,
          'width': `${sizeOf(n).w}px`,
          'height': `${sizeOf(n).h}px`,
          '--d': `${delay(n)}ms`,
        }"
      >
        <div class="cap-text">
          <div class="cap-label">
            {{ n.label }}
          </div>
          <div v-if="n.zh" class="cap-zh">
            {{ n.zh }}
          </div>
        </div>
        <svg v-if="n.status" class="mark" viewBox="0 0 24 24" aria-hidden="true">
          <template v-if="n.status === 'done'">
            <circle cx="12" cy="12" r="11" class="m-done" />
            <path d="M7 12.5l3.2 3.2L17 9" class="m-check" />
          </template>
          <template v-else-if="n.status === 'wip'">
            <circle cx="12" cy="12" r="9.5" class="m-ring" />
            <path d="M12 2.5 A9.5 9.5 0 0 1 12 21.5 Z" class="m-half" />
          </template>
          <circle v-else cx="12" cy="12" r="9.5" class="m-open" />
        </svg>
      </div>
    </div>

    <div class="legend" :class="{ on: isFinal }">
      <span><i class="dot done" />works</span>
      <span><i class="dot wip" />in progress</span>
      <span><i class="dot open" />open</span>
    </div>
  </div>
</template>

<style scoped>
.viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.world {
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: 0 0;
  will-change: transform;
}

.edges {
  position: absolute;
  left: 0;
  top: 0;
  overflow: visible;
}

.edge {
  fill: none;
  stroke: rgb(69 110 149 / 45%);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transition: opacity 250ms ease;
}

.edge.shown {
  opacity: 1;
  transition: opacity 400ms var(--d) ease;
}

.edge.done {
  stroke: rgb(52 194 122 / 75%);
}

.edge.wip {
  stroke: rgb(206 170 91 / 80%);
}

.edge.open {
  stroke-dasharray: 5 7;
}

.cap {
  position: absolute;
  translate: -50% -50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 12px 0 22px;
  border-radius: 999px;
  background: #fff;
  border: 2px solid rgb(10 37 64 / 12%);
  box-shadow: 0 10px 24px rgb(10 37 64 / 8%);
  opacity: 0;
  transition: opacity 250ms ease;
}

.cap.shown {
  opacity: 1;
  transition: opacity 400ms var(--d) ease;
}

.cap.k-root {
  justify-content: center;
  text-align: center;
  padding: 0 24px;
  background: #0a2540;
  border-color: #0a2540;
  color: #fff;
  box-shadow: 0 16px 40px rgb(10 37 64 / 24%);
}

.cap.k-branch {
  justify-content: center;
  text-align: center;
  padding: 0 18px;
  background: #293655;
  border-color: #293655;
  color: #fff;
}

.cap.done {
  background: #def7e9;
  border-color: #34c27a;
}

.cap.wip {
  background: #fdf6e3;
  border-color: #ceaa5b;
}

.cap.open {
  background: rgb(255 255 255 / 55%);
  border-style: dashed;
  border-color: rgb(69 110 149 / 65%);
  box-shadow: none;
}

.cap-text {
  min-width: 0;
}

.cap-label {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.15;
  white-space: nowrap;
}

.k-root .cap-label {
  font-size: 26px;
}

.k-branch .cap-label {
  font-size: 21px;
}

.cap-zh {
  font-size: 13px;
  line-height: 1.3;
  color: rgb(10 37 64 / 60%);
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', 'Noto Sans SC', sans-serif;
  white-space: nowrap;
}

.k-root .cap-zh,
.k-branch .cap-zh {
  color: rgb(255 255 255 / 72%);
  font-size: 14px;
}

.mark {
  flex: none;
  width: 26px;
  height: 26px;
}

.m-done {
  fill: #34c27a;
}

.m-check {
  fill: none;
  stroke: #fff;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.m-ring {
  fill: none;
  stroke: #ceaa5b;
  stroke-width: 2.4;
}

.m-half {
  fill: #ceaa5b;
}

.m-open {
  fill: none;
  stroke: #456e95;
  stroke-width: 2.2;
  stroke-dasharray: 3.5 3;
}

.legend {
  position: absolute;
  left: 40px;
  bottom: 22px;
  display: flex;
  gap: 22px;
  font-size: 15px;
  font-weight: 600;
  color: rgb(10 37 64 / 75%);
  opacity: 0;
  transition: opacity 300ms ease;
}

.legend.on {
  opacity: 1;
  transition: opacity 500ms 900ms ease;
}

.legend span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: 2px solid;
}

.dot.done {
  background: #34c27a;
  border-color: #34c27a;
}

.dot.wip {
  background: #fdf6e3;
  border-color: #ceaa5b;
}

.dot.open {
  border-style: dashed;
  border-color: #456e95;
}

.instant .cap,
.instant .edge,
.instant .legend {
  transition: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .cap,
  .edge,
  .legend {
    transition-duration: 1ms !important;
    transition-delay: 0ms !important;
  }
}
</style>
