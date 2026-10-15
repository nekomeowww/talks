<script setup lang="ts">
import { computed } from 'vue'

/**
 * A camera exploring a world of game screens.
 *
 * Click 0 shows one screen filling most of the frame. Each click places the
 * next milestone right next to what is already there (an organic cluster
 * around the first screen) and the camera pulls back until everything shown
 * fits. Later on, faint "hidden" screens show up at the edges; the final click
 * pulls back once more, reveals them and tilts the world slightly top-down.
 *
 * Everything is a pure function of `clicks` and driven by CSS transitions, so
 * it works forward, backward and when the slide opens at a later click.
 */

export interface Tile {
  id: string
  title: string
  /** Short label drawn on the tile itself. */
  label?: string
  zh?: string
  year: string
  org?: string
  src?: string
  icon?: string
  tint?: string
  /** Centre of the tile in world pixels; the first screen sits at 0,0. */
  x: number
  y: number
  /** Small tilt in degrees, so the cluster does not look like a grid. */
  r?: number
  /** Click on which the tile pops in as the newest milestone. */
  at?: number
  /** For hidden tiles: click on which a faint hint appears at the edge. */
  hint?: number
}

const props = defineProps<{
  tiles: Tile[]
  clicks: number
  /** Click that reveals every tile and tilts the world. */
  overviewAt: number
}>()

const TILE_W = 480
const TILE_H = 270
const VIEW_W = 980
const VIEW_H = 552
// Area the camera frames before the overview; the caption lives below it.
const FRAME = { x: 40, y: 26, w: 900, h: 404 }
const PAD = 24

const isOverview = computed(() => props.clicks >= props.overviewAt)
const milestones = computed(() => props.tiles.filter(t => t.at !== undefined).sort((a, b) => a.at! - b.at!))

const current = computed(() => {
  if (isOverview.value)
    return undefined
  const shown = milestones.value.filter(t => t.at! <= props.clicks)
  return shown[shown.length - 1] ?? milestones.value[0]
})

function bbox(list: Tile[]) {
  const xs = list.flatMap(t => [t.x - TILE_W / 2 - PAD, t.x + TILE_W / 2 + PAD])
  const ys = list.flatMap(t => [t.y - TILE_H / 2 - PAD, t.y + TILE_H / 2 + PAD])
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, w: maxX - minX, h: maxY - minY }
}

function shownAt(click: number) {
  const list = milestones.value.filter(t => t.at! <= click)
  return list.length ? list : milestones.value.slice(0, 1)
}

function stateOf(tile: Tile): 'off' | 'hint' | 'shown' {
  if (isOverview.value)
    return 'shown'
  if (tile.at !== undefined)
    return tile.at <= props.clicks ? 'shown' : 'off'
  if (tile.hint !== undefined && tile.hint <= props.clicks)
    return 'hint'
  return 'off'
}

// Scale for each click: fit what is shown, never zooming back in.
function scaleAt(click: number) {
  let s = Infinity
  for (let k = 0; k <= click; k++) {
    const b = bbox(shownAt(k))
    s = Math.min(s, FRAME.w / b.w, FRAME.h / b.h)
  }
  return s
}

function overviewScale() {
  const b = bbox(props.tiles)
  return Math.min(VIEW_W / b.w, VIEW_H / b.h) * 0.86
}

// Tile labels: 22 world px until the overview. On the overview the world
// shrinks, so the label grows by the same ratio and keeps the rendered size
// it had on the click before. Font size and padding transition with the camera.
const labelScale = computed(() => {
  if (!isOverview.value)
    return 1
  return scaleAt(props.overviewAt - 1) / overviewScale()
})

const camera = computed(() => {
  if (isOverview.value) {
    const b = bbox(props.tiles)
    const s = overviewScale()
    const tx = VIEW_W / 2 - b.cx * s
    const ty = VIEW_H / 2 - b.cy * s - 22
    return `translate(${tx}px, ${ty}px) scale(${s}) rotateX(18deg) rotateZ(-6deg)`
  }
  const b = bbox(shownAt(props.clicks))
  const s = scaleAt(props.clicks)
  const tx = FRAME.x + FRAME.w / 2 - b.cx * s
  const ty = FRAME.y + FRAME.h / 2 - b.cy * s
  return `translate(${tx}px, ${ty}px) scale(${s}) rotateX(0deg) rotateZ(0deg)`
})
</script>

<template>
  <div class="viewport">
    <div class="world" :style="{ 'transform': camera, '--lk': labelScale }">
      <div
        v-for="tile in tiles"
        :key="tile.id"
        class="tile"
        :class="[stateOf(tile), { current: tile.id === current?.id, overview: isOverview, extra: tile.at === undefined }]"
        :style="{
          'left': `${tile.x - TILE_W / 2}px`,
          'top': `${tile.y - TILE_H / 2}px`,
          'width': `${TILE_W}px`,
          'height': `${TILE_H}px`,
          '--r': `${tile.r ?? 0}deg`,
          'background': tile.tint ?? '#456E95',
        }"
      >
        <img v-if="tile.src" :src="tile.src" alt="">
        <div v-else class="tile-fallback">
          <div :class="tile.icon" class="tile-icon" />
        </div>
        <div class="tile-label">
          <span class="tile-year">{{ tile.year }}</span>
          <span class="tile-title">{{ tile.label ?? tile.title }}</span>
        </div>
      </div>
    </div>

    <Transition name="cap" mode="out-in">
      <div v-if="current" :key="current.id" class="caption">
        <div class="cap-meta">
          <span class="cap-year">{{ current.year }}</span>
          <span>{{ current.org }}</span>
        </div>
        <div class="cap-title">
          {{ current.title }}
        </div>
        <div class="zh">
          {{ current.zh }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  perspective: 1800px;
}

.world {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  transform-origin: 0 0;
  transform-style: preserve-3d;
  transition: transform 1250ms cubic-bezier(0.65, 0, 0.25, 1);
}

.tile {
  position: absolute;
  border-radius: 16px;
  overflow: hidden;
  opacity: 0;
  transform: rotate(var(--r));
  box-shadow: 0 16px 44px rgb(10 37 64 / 20%);
  transition:
    opacity 600ms ease,
    box-shadow 600ms ease;
}

.tile.shown {
  opacity: 1;
}

/* The newest milestone pops in once the camera has started pulling back. */
.tile.shown.current {
  transition-delay: 350ms !important;
  box-shadow:
    0 0 0 6px rgb(255 255 255 / 90%),
    0 0 0 12px rgb(232 122 164 / 45%),
    0 24px 60px rgb(10 37 64 / 26%);
}

/* A faint screen at the edge of the world: something not explored yet. */
.tile.hint {
  opacity: 0.3;
}

/* Screens outside the milestones only ever change opacity: no delay, no
   shadow, size or filter change between hidden, hint and shown. */
.tile.extra {
  transition: opacity 900ms ease;
  transition-delay: 0ms;
}

.tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.tile-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
}

.tile-icon {
  font-size: 110px;
  color: rgb(255 255 255 / 88%);
}

.tile-label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: baseline;
  padding: calc(10px * var(--lk)) calc(18px * var(--lk)) calc(12px * var(--lk));
  gap: calc(12px * var(--lk));
  color: #fff;
  background: rgb(10 20 40 / 70%);
  font-size: calc(22px * var(--lk));
  line-height: 1.15;
  transition:
    opacity 400ms ease,
    font-size 1250ms cubic-bezier(0.65, 0, 0.25, 1),
    padding 1250ms cubic-bezier(0.65, 0, 0.25, 1),
    gap 1250ms cubic-bezier(0.65, 0, 0.25, 1);
}

.tile-year {
  font-weight: 700;
  color: #f7db8f;
  flex: none;
}

.tile-title {
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tile.current .tile-label {
  opacity: 0;
}

.caption {
  position: absolute;
  left: 40px;
  bottom: 26px;
  max-width: 720px;
  padding: 12px 22px 14px;
  border-radius: 20px;
  background: rgb(255 255 255 / 82%);
  backdrop-filter: blur(14px);
  box-shadow: 0 12px 30px rgb(10 37 64 / 14%);
}

.cap-meta {
  display: flex;
  gap: 10px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgb(10 37 64 / 55%);
}

.cap-year {
  color: #e87aa4;
}

.cap-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.15;
}

.caption .zh {
  margin-top: 4px;
}

.cap-enter-active {
  transition: opacity 400ms ease;
  transition-delay: 300ms;
}

.cap-leave-active {
  transition: opacity 200ms ease;
}

.cap-enter-from,
.cap-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .world,
  .tile {
    transition-duration: 1ms !important;
  }
}
</style>
