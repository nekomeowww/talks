<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

/**
 * A depth carousel of game layers that ends as one stack.
 *
 * Clicks 0 .. n-1 (ring): the current game sits front and centre-right, flat
 * and fully opaque. Older games recede along a gentle arc (back in Z, up and a
 * little to the left, smaller and fainter), so the trail reads like part of a
 * ring that the camera pans along. The newest game enters from the right and
 * the front with a blurred fade. Games more than four steps back fade out.
 *
 * Click n (final): every layer moves onto one stack of parallel planes seen
 * from a near-orthographic camera, each with a billboard label.
 *
 * Every layer has one transform with the same function list in both modes
 * (translate3d rotateX rotateY translateZ scale), so CSS interpolates between
 * the ring and the stack. Everything is a pure function of `clicks`.
 */

export interface GameLayer {
  title: string
  zh: string
  /** The capability this game added to the stack, e.g. "macro planning". */
  capability: string
  /** One short English line for the caption. */
  line: string
  src: string
  /** Game logos shown above the caption title, at one fixed height. */
  logos?: string[]
  /** Height multiplier for logos whose shape reads small at the shared height. */
  logoScale?: number
  kind?: 'video' | 'image'
  accent?: string
}

const props = defineProps<{
  layers: GameLayer[]
  clicks: number
  finalTitle?: string
  finalZh?: string
}>()

// World origin in canvas px (the front video's centre in ring mode).
const OX = 688
const OY = 262

// Ring slots by depth (0 = current). x/y/z in world px, ry in deg.
const RING = [
  { x: 0, y: 0, z: 0, ry: 0, op: 1, blur: 0 },
  { x: -120, y: -80, z: -380, ry: 7, op: 0.55, blur: 0.6 },
  { x: -225, y: -165, z: -820, ry: 13, op: 0.35, blur: 1.2 },
  { x: -305, y: -240, z: -1320, ry: 18, op: 0.2, blur: 1.8 },
  { x: -360, y: -300, z: -1880, ry: 22, op: 0, blur: 2.4 },
]
const ENTER = { x: 230, y: 30, z: 220, ry: -6, op: 0, blur: 6 }
const RING_SCALE = 1.28

// Final stack (matches the old settled overview).
const GAP = 150
const FINAL_TILT = 28
const FINAL_PERSP = 4600

const n = computed(() => props.layers.length)
const step = computed(() => Math.max(0, Math.min(props.clicks, n.value)))
const isFinal = computed(() => step.value >= n.value)
const top = computed(() => Math.min(step.value, n.value - 1))

const finalScale = computed(() => {
  const rad = (FINAL_TILT * Math.PI) / 180
  const height = 225 * Math.cos(rad) + (n.value - 1) * GAP * Math.sin(rad)
  return Math.min(0.82, 360 / height) * 0.96
})

function ringSlot(i: number) {
  const d = top.value - i
  if (d < 0)
    return ENTER
  return RING[Math.min(d, RING.length - 1)]
}

function layerState(i: number) {
  if (isFinal.value) {
    const s = finalScale.value
    const lift = ((n.value - 1) * GAP) / 2
    return {
      transform: `translate3d(${545 - OX}px, ${276 - OY}px, 0px) rotateX(${FINAL_TILT}deg) rotateY(0deg) translateZ(${s * (i * GAP - lift)}px) scale3d(${s}, ${s}, ${s})`,
      op: 1,
      blur: 0,
      s,
    }
  }
  const r = ringSlot(i)
  return {
    transform: `translate3d(${r.x}px, ${r.y}px, ${r.z}px) rotateX(0deg) rotateY(${r.ry}deg) translateZ(0px) scale3d(${RING_SCALE}, ${RING_SCALE}, ${RING_SCALE})`,
    op: r.op,
    blur: r.blur,
    s: RING_SCALE,
  }
}

function layerStyle(i: number) {
  const st = layerState(i)
  return {
    '--accent': props.layers[i].accent ?? '#6292BF',
    '--face-op': st.op,
    '--face-blur': `${st.blur}px`,
    '--label-scale': 1 / st.s,
    'transform': st.transform,
  }
}

const stageVars = computed(() => isFinal.value
  ? { '--persp': `${FINAL_PERSP}px`, '--porigin': '545px 155px' }
  : { '--persp': '1300px', '--porigin': `${OX - 40}px ${OY - 70}px` })

const caption = computed(() => props.layers[top.value])

// Pause videos that are fully faded out; play them again when they come back.
const videos = ref<(HTMLVideoElement | null)[]>([])
const timers: ReturnType<typeof setTimeout>[] = []

function visible(i: number) {
  return layerState(i).op > 0
}

function syncPlayback(immediate: boolean) {
  timers.splice(0).forEach(clearTimeout)
  props.layers.forEach((_, i) => {
    const v = videos.value[i]
    if (!v)
      return
    if (visible(i)) {
      v.play().catch(() => {})
    }
    else if (immediate) {
      v.pause()
    }
    else {
      timers.push(setTimeout(() => v.pause(), 1100))
    }
  })
}

onMounted(() => syncPlayback(true))
watch(step, () => syncPlayback(false))
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <div class="stage" :class="{ final: isFinal }" :style="stageVars">
    <div class="caption">
      <Transition name="caption-swap" mode="out-in">
        <div v-if="!isFinal" :key="top" class="caption-inner">
          <div v-if="caption.logos?.length" class="caption-logos" :style="{ '--logo-h': `${52 * (caption.logoScale ?? 1)}px` }">
            <img v-for="logo in caption.logos" :key="logo" :src="logo" :alt="caption.title">
          </div>
          <div v-else class="caption-title">
            {{ caption.title }}
          </div>
          <div class="caption-cap" :style="{ color: caption.accent }">
            + {{ caption.capability }}
          </div>
          <div class="caption-line">
            {{ caption.line }}
          </div>
          <div class="zh">
            {{ caption.zh }}
          </div>
        </div>
        <div v-else key="final" class="caption-inner">
          <div class="caption-title final">
            {{ finalTitle }}
          </div>
          <div class="zh final-zh">
            {{ finalZh }}
          </div>
        </div>
      </Transition>
    </div>

    <div class="camera">
      <div class="world">
        <div
          v-for="(layer, i) in layers"
          :key="layer.title"
          class="layer"
          :style="layerStyle(i)"
        >
          <div class="face">
            <video
              v-if="(layer.kind ?? 'video') === 'video'"
              :ref="(el) => { videos[i] = el as HTMLVideoElement | null }"
              :src="layer.src"
              autoplay
              muted
              loop
              playsinline
            />
            <img v-else :src="layer.src" alt="">
          </div>
          <div class="label">
            <span class="dot" />
            <span class="label-text">
              <span class="label-title">{{ layer.title }}</span>
              <span class="label-cap">{{ layer.capability }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  --ease-cam: cubic-bezier(0.22, 1, 0.36, 1);
  --cam-ms: 1000ms;
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.caption {
  position: absolute;
  left: 56px;
  top: 0;
  bottom: 0;
  width: 285px;
  display: flex;
  align-items: center;
  z-index: 2;
}

.caption-inner {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.caption-inner > :not(.caption-logos) {
  max-width: 285px;
}

.caption-logos {
  display: flex;
  align-items: center;
  gap: 16px;
  height: var(--logo-h, 52px);
  margin-bottom: 6px;
}

.caption-logos img {
  height: var(--logo-h, 52px);
  width: auto;
  max-width: 320px;
  object-fit: contain;
  display: block;
}

.caption-title {
  font-size: 2.1rem;
  font-weight: 700;
  line-height: 1.1;
}

.caption-title.final {
  font-size: 2.4rem;
}

.final-zh {
  white-space: pre-line;
}

.caption-cap {
  font-size: 1rem;
  font-weight: 700;
}

.caption-line {
  margin-top: 6px;
  font-size: 1rem;
  line-height: 1.35;
  color: rgb(10 37 64 / 75%);
}

.camera {
  position: absolute;
  inset: 0;
  perspective: var(--persp);
  perspective-origin: var(--porigin);
  transition:
    perspective var(--cam-ms) var(--ease-cam),
    perspective-origin var(--cam-ms) var(--ease-cam);
}

.world {
  position: absolute;
  left: 688px;
  top: 262px;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
}

.layer {
  position: absolute;
  left: -200px;
  top: -112.5px;
  width: 400px;
  height: 225px;
  transform-style: preserve-3d;
  transition: transform var(--cam-ms) var(--ease-cam);
}

.face {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  overflow: hidden;
  background: #0a2540;
  opacity: var(--face-op);
  filter: blur(var(--face-blur));
  box-shadow:
    0 0 0 3px var(--accent),
    0 24px 40px rgb(10 37 64 / 22%);
  transition:
    opacity var(--cam-ms) var(--ease-cam),
    filter var(--cam-ms) var(--ease-cam);
}

.face video,
.face img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Billboard on the right edge; only shown on the final stack. */
.label {
  position: absolute;
  left: calc(100% + 16px);
  top: 50%;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  transform-origin: 0 50%;
  transform: translateY(-50%) rotateX(-28deg) scale3d(var(--label-scale), var(--label-scale), var(--label-scale));
  opacity: 0;
  transition: opacity 200ms ease;
}

.stage.final .label {
  opacity: 1;
  transition: opacity 500ms ease 700ms;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent);
  flex: none;
}

.label-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.label-title {
  font-size: 15px;
  font-weight: 700;
  color: #0a2540;
}

.label-cap {
  font-size: 12.5px;
  color: rgb(10 37 64 / 62%);
}

.caption-swap-enter-active,
.caption-swap-leave-active {
  transition: opacity 280ms ease;
}

.caption-swap-enter-from,
.caption-swap-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .camera,
  .layer,
  .face,
  .label {
    transition-duration: 1ms;
  }
}
</style>
