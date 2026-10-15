<script setup lang="ts">
import { animate } from 'animejs'
import { computed, onBeforeUnmount, onMounted, reactive, shallowRef, useTemplateRef, watch } from 'vue'

import stats from '../public/community/stats.json'
import moeruLogo from '../public/ecosystem/moeru-ai-logo.png'
import starHistory from '../public/opening/star-history.json'
import projAiriLogo from '../public/proj-airi-logo-transparent.svg'

/**
 * A5: the AIRI star history, flown by a camera.
 *
 * Click 0: the camera sits zoomed in on the first star (Dec 2024).
 * Click 1: the line draws itself and the camera flies along it, the counter
 *          rolls up in sync. When the line reaches the top, little stars burst
 *          out of its tip and fall away under gravity while the camera pulls
 *          back to the whole curve; they fade out, so the end frame is calm.
 * Click 2: the two GitHub org follower counts fly in.
 *
 * Data: public/opening/star-history.json, sampled from the GitHub stargazers
 * API (starred_at) on 2026-10-16; the last point is stats.json airi_stars.
 * Opening the slide at click >= 1 shows the settled frame with no animation.
 */
const props = defineProps<{
  clicks: number
}>()

// Chart geometry, in slide canvas pixels.
const W = 868
const H = 330
const PAD = { left: 10, right: 18, top: 18, bottom: 26 }
const Y_MAX = 55000
const START_SCALE = 2.6

const points = (starHistory.points as [string, number][]).map(([d, c]) => ({ t: Date.parse(`${d}Z`), c }))
const t0 = Date.parse('2024-12-01T00:00Z')
const t1 = points[points.length - 1].t

const xOf = (t: number) => PAD.left + (t - t0) / (t1 - t0) * (W - PAD.left - PAD.right)
const yOf = (c: number) => H - PAD.bottom - c / Y_MAX * (H - PAD.top - PAD.bottom)
const cOfY = (y: number) => (H - PAD.bottom - y) / (H - PAD.top - PAD.bottom) * Y_MAX
const tOfX = (x: number) => t0 + (x - PAD.left) / (W - PAD.left - PAD.right) * (t1 - t0)

// Monotone cubic (Fritsch-Carlson) so the line never dips between samples.
function monotonePath(xs: number[], ys: number[]) {
  const n = xs.length
  const d: number[] = []
  const m: number[] = []
  for (let i = 0; i < n - 1; i++)
    d.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]))
  m.push(d[0])
  for (let i = 1; i < n - 1; i++)
    m.push(d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2)
  m.push(d[n - 2])
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = 0
      m[i + 1] = 0
      continue
    }
    const a = m[i] / d[i]
    const b = m[i + 1] / d[i]
    const s = a * a + b * b
    if (s > 9) {
      const k = 3 / Math.sqrt(s)
      m[i] = k * a * d[i]
      m[i + 1] = k * b * d[i]
    }
  }
  let p = `M${xs[0].toFixed(2)},${ys[0].toFixed(2)}`
  for (let i = 0; i < n - 1; i++) {
    const h = (xs[i + 1] - xs[i]) / 3
    p += `C${(xs[i] + h).toFixed(2)},${(ys[i] + m[i] * h).toFixed(2)} ${(xs[i + 1] - h).toFixed(2)},${(ys[i + 1] - m[i + 1] * h).toFixed(2)} ${xs[i + 1].toFixed(2)},${ys[i + 1].toFixed(2)}`
  }
  return p
}

const xs = points.map(p => xOf(p.t))
const ys = points.map(p => yOf(p.c))
const linePath = monotonePath(xs, ys)
const areaPath = `${linePath}L${xs[xs.length - 1].toFixed(2)},${(H - PAD.bottom).toFixed(2)}L${xs[0].toFixed(2)},${(H - PAD.bottom).toFixed(2)}Z`

const gridLines = [10000, 20000, 30000, 40000, 50000].map(v => ({ v, y: yOf(v), label: `${v / 1000}k` }))
const yearTicks = ['2025-01-01', '2025-07-01', '2026-01-01', '2026-07-01'].map(d => ({
  x: xOf(Date.parse(`${d}T00:00Z`)),
  label: new Date(`${d}T00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }),
}))

const line = useTemplateRef<SVGPathElement>('line')
const bigNumber = useTemplateRef<HTMLElement>('bigNumber')
const orgs = useTemplateRef<HTMLElement>('orgs')
const starEls = useTemplateRef<HTMLElement[]>('starEls')

// Camera + progress state, written by anime.js on a plain object.
const state = reactive({
  t: 0, // how much of the line is drawn, 0..1
  z: 0, // pull-back from the zoomed camera to the whole chart, 0..1
  hx: xs[0],
  hy: ys[0],
})
const pathLength = shallowRef(1)
const drawn = shallowRef(0)

const camera = computed(() => {
  const s = START_SCALE + (1 - START_SCALE) * state.z
  // Keep the head a bit left of centre while flying, so the line ahead is visible.
  const ax = W * (0.34 + 0.16 * state.t)
  const ay = H * 0.6
  const tx = (ax - START_SCALE * state.hx) * (1 - state.z)
  const ty = (ay - START_SCALE * state.hy) * (1 - state.z)
  return { s, tx, ty }
})
const headScreen = computed(() => ({
  x: camera.value.tx + camera.value.s * state.hx,
  y: camera.value.ty + camera.value.s * state.hy,
}))
const headCount = computed(() => state.t <= 0 ? points[0].c : state.t >= 1 ? stats.airi_stars : Math.max(1, Math.round(cOfY(state.hy))))
const headDate = computed(() => new Date(tOfX(state.hx)).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }))
const clipWidth = computed(() => state.hx + 1)

// The stars that pop out of the tip of the line: a launch velocity, a delay,
// a spin and a colour each; gravity does the rest.
interface BurstStar { vx: number, vy: number, size: number, spin: number, color: string, delay: number, life: number }
const GRAVITY = 150 // chart px / s^2
// Just two stars of different sizes pop out of the tip: one bigger going up
// and left, a smaller one up and right a moment later.
const stars: BurstStar[] = [
  { vx: -46, vy: -150, size: 34, spin: -120, color: '#F2B705', delay: 0, life: 2400 },
  { vx: 30, vy: -120, size: 20, spin: 160, color: '#E87AA4', delay: 160, life: 2200 },
]

let running: { cancel: () => void }[] = []
function stopAll() {
  running.forEach(a => a.cancel())
  running = []
}

// The drawing rate follows the data: progress runs along a distance where
// moving sideways counts fully and climbing only a little, so flat stretches
// draw slowly and steep climbs shoot up fast.
let lut: { len: number, w: number }[] = []
function buildLut(el: SVGPathElement) {
  const N = 600
  lut = []
  let w = 0
  let prev = el.getPointAtLength(0)
  for (let i = 0; i <= N; i++) {
    const len = pathLength.value * i / N
    const p = el.getPointAtLength(len)
    w += Math.abs(p.x - prev.x) + 0.15 * Math.abs(p.y - prev.y)
    lut.push({ len, w })
    prev = p
  }
}
function lengthAt(t: number) {
  if (!lut.length || t <= 0)
    return pathLength.value * Math.max(0, t)
  if (t >= 1)
    return pathLength.value
  const target = t * lut[lut.length - 1].w
  let lo = 0
  let hi = lut.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (lut[mid].w < target)
      lo = mid
    else hi = mid
  }
  const a = lut[lo]
  const b = lut[hi]
  return a.len + (b.len - a.len) * ((target - a.w) / Math.max(1e-6, b.w - a.w))
}

function placeHead(t: number) {
  const el = line.value
  if (!el)
    return
  const len = lengthAt(t)
  const p = el.getPointAtLength(len)
  drawn.value = len
  state.t = t
  state.hx = p.x
  state.hy = p.y
}

function hideStars() {
  for (const el of starEls.value ?? [])
    el.style.opacity = '0'
}

// One clock drives every star. Stars live in chart space and leave from the
// tip of the line, so they stay with the curve while the camera pulls back.
function burst() {
  const els = starEls.value ?? []
  const o = { x: xs[xs.length - 1], y: ys[ys.length - 1] }
  const end = Math.max(...stars.map(s => s.delay + s.life))
  const clock = { ms: 0 }
  running.push(animate(clock, {
    ms: [0, end],
    duration: end,
    ease: 'linear',
    onUpdate: () => {
      stars.forEach((s, i) => {
        const el = els[i]
        if (!el)
          return
        const t = clock.ms - s.delay
        if (t < 0)
          return
        const u = Math.min(1, t / s.life)
        const sec = t / 1000
        const cam = camera.value
        const x = cam.tx + cam.s * (o.x + s.vx * sec)
        const y = cam.ty + cam.s * (o.y + s.vy * sec + 0.5 * GRAVITY * sec * sec)
        const grow = u < 0.12 ? 0.4 + u / 0.12 * 0.6 : 1 - 0.3 * u
        const scale = grow * (0.55 + 0.45 * cam.s)
        el.style.opacity = String(u < 0.08 ? u / 0.08 : u > 0.45 ? Math.max(0, 1 - (u - 0.45) / 0.55) : 1)
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${(s.spin * sec).toFixed(1)}deg) scale(${scale.toFixed(3)})`
      })
    },
    onComplete: hideStars,
  }))
}

function setEl(el: HTMLElement | null, shown: boolean, hidden: string) {
  if (!el)
    return
  el.style.opacity = shown ? '1' : '0'
  el.style.transform = shown ? 'none' : hidden
}

function settle(step: number) {
  stopAll()
  if (step >= 1) {
    placeHead(1)
    state.z = 1
  }
  else {
    placeHead(0)
    state.z = 0
  }
  hideStars()
  setEl(bigNumber.value, step >= 1, 'none')
  setEl(orgs.value, step >= 2, 'none')
}

function fly() {
  stopAll()
  placeHead(0)
  state.z = 0
  hideStars()
  setEl(bigNumber.value, false, 'none')
  const progress = { t: 0 }
  running.push(animate(progress, {
    t: [0, 1],
    duration: 5200,
    ease: 'inOut(2.2)',
    onUpdate: () => placeHead(progress.t),
    onComplete: () => {
      placeHead(1)
      burst()
      pullBack()
    },
  }))
}

function pullBack() {
  const zoom = { z: 0 }
  running.push(animate(zoom, {
    z: [0, 1],
    duration: 1300,
    delay: 250,
    ease: 'inOut(3)',
    onUpdate: () => {
      state.z = zoom.z
    },
  }))
  if (bigNumber.value) {
    running.push(animate(bigNumber.value, {
      opacity: [0, 1],
      duration: 600,
      delay: 950,
      ease: 'out(2)',
    }))
  }
}

function showOrgs(on: boolean) {
  if (!orgs.value)
    return
  if (!on) {
    setEl(orgs.value, false, 'none')
    return
  }
  running.push(animate(orgs.value, {
    opacity: [0, 1],
    duration: 500,
    ease: 'out(2)',
  }))
}

const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  pathLength.value = line.value?.getTotalLength() ?? 1
  if (line.value)
    buildLut(line.value)
  settle(props.clicks)
})
onBeforeUnmount(stopAll)

watch(() => props.clicks, (now, before) => {
  if (reduced || Math.abs(now - before) > 1) {
    settle(now)
    return
  }
  if (now === 1 && before === 0)
    fly()
  else if (now === 2 && before === 1)
    showOrgs(true)
  else
    settle(now)
})
</script>

<template>
  <div class="flight">
    <svg class="chart" :viewBox="`0 0 ${W} ${H}`" :width="W" :height="H" aria-hidden="true">
      <defs>
        <clipPath id="star-clip">
          <rect x="0" y="-200" :width="clipWidth" :height="H + 400" />
        </clipPath>
      </defs>
      <g :transform="`translate(${camera.tx} ${camera.ty}) scale(${camera.s})`">
        <g v-for="g in gridLines" :key="g.v">
          <line :x1="PAD.left" :x2="W - PAD.right" :y1="g.y" :y2="g.y" class="grid" :class="{ goal: g.v === 50000 }" vector-effect="non-scaling-stroke" />
          <text :x="PAD.left + 2" :y="g.y - 4" class="grid-label" :class="{ goal: g.v === 50000 }">{{ g.label }}</text>
        </g>
        <g v-for="y in yearTicks" :key="y.label">
          <text :x="y.x" :y="H - 8" class="year-label" text-anchor="middle">{{ y.label }}</text>
        </g>
        <path :d="areaPath" fill="#6292BF" fill-opacity="0.14" clip-path="url(#star-clip)" />
        <path
          ref="line" :d="linePath" fill="none" stroke="#456E95" :stroke-width="4 / camera.s" stroke-linecap="round"
          :stroke-dasharray="pathLength" :stroke-dashoffset="pathLength - drawn"
        />
      </g>
    </svg>

    <!-- head of the line, in screen space so it does not scale with the camera -->
    <div class="head" :style="{ transform: `translate(${headScreen.x}px, ${headScreen.y}px)` }">
      <div class="head-dot" />
      <div class="head-bubble" :class="{ gone: state.z > 0.05 }">
        <span class="head-count"><svg class="head-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" /></svg>{{ headCount.toLocaleString('en-US') }}</span>
        <span class="head-date">{{ headDate }}</span>
      </div>
    </div>

    <div ref="bigNumber" class="big">
      <div class="big-number-row">
        <svg class="big-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" /></svg>
        <span class="big-value">{{ stats.airi_stars.toLocaleString('en-US') }}</span>
      </div>
      <div class="big-caption">
        stars on <b>moeru-ai/airi</b> · {{ stats.airi_contributors }} contributors
      </div>
    </div>

    <div ref="orgs" class="orgs">
      <div class="org">
        <img :src="projAiriLogo" alt="">
        <div>
          <div class="org-count">
            {{ stats.proj_airi_followers.toLocaleString('en-US') }}
          </div>
          <div class="org-name">
            <b>proj-airi</b> followers
          </div>
        </div>
      </div>
      <div class="org">
        <img :src="moeruLogo" alt="">
        <div>
          <div class="org-count">
            {{ stats.moeru_ai_followers.toLocaleString('en-US') }}
          </div>
          <div class="org-name">
            <b>moeru-ai</b> followers
          </div>
        </div>
      </div>
    </div>

    <div class="sky" aria-hidden="true">
      <div
        v-for="(s, i) in stars" :key="i" ref="starEls" class="sky-star"
        :style="{ fontSize: `${s.size}px`, color: s.color }"
      >
        <svg class="sky-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" /></svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flight {
  position: relative;
  width: 868px;
  height: 330px;
}

.flight::before {
  content: '';
  position: absolute;
  inset: -40px -30px -20px;
  border-radius: 48px;
  background: rgb(255 255 255 / 72%);
  /* closest-side: the wash reaches zero before every edge, so no hard line */
  -webkit-mask-image: radial-gradient(closest-side at 50% 55%, black 45%, transparent 100%);
  mask-image: radial-gradient(closest-side at 50% 55%, black 45%, transparent 100%);
}

.chart {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 24px;
  -webkit-mask-image: linear-gradient(90deg, transparent, black 3%, black 97%, transparent);
  mask-image: linear-gradient(90deg, transparent, black 3%, black 97%, transparent);
}

.grid {
  stroke: rgb(10 37 64 / 10%);
  stroke-width: 1;
  stroke-dasharray: 3 5;
}

.grid.goal {
  stroke: rgb(232 122 164 / 55%);
  stroke-width: 1.5;
}

.grid-label {
  font-size: 11px;
  font-weight: 700;
  fill: rgb(10 37 64 / 40%);
}

.grid-label.goal {
  fill: #e87aa4;
}

.year-label {
  font-size: 11px;
  font-weight: 600;
  fill: rgb(10 37 64 / 45%);
}

.head {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.head-dot {
  position: absolute;
  left: -8px;
  top: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid #e87aa4;
  box-shadow: 0 0 0 8px rgb(232 122 164 / 18%), 0 6px 18px rgb(232 122 164 / 40%);
}

.head-bubble {
  position: absolute;
  right: 18px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 8px 14px;
  border-radius: 16px;
  background: rgb(255 255 255 / 88%);
  box-shadow: 0 10px 30px rgb(10 37 64 / 14%);
  white-space: nowrap;
  transition: opacity 0.35s ease;
}

.head-bubble.gone {
  opacity: 0;
}

.head-count {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  color: #0a2540;
}

.head-star,
.big-star,
.sky-svg {
  display: block;
  width: 1em;
  height: 1em;
  flex: none;
}

.head-star {
  font-size: 22px;
  color: #f2b705;
}

.head-date {
  font-size: 13px;
  font-weight: 600;
  color: rgb(10 37 64 / 55%);
}

.big {
  position: absolute;
  left: 470px;
  top: -64px;
  width: 340px;
  opacity: 0;
}

.big::before {
  content: '';
  position: absolute;
  inset: -30px -40px;
  z-index: -1;
  background: rgb(255 255 255 / 85%);
  -webkit-mask-image: radial-gradient(closest-side, black 40%, transparent);
  mask-image: radial-gradient(closest-side, black 40%, transparent);
}

.big-number-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.big-star {
  font-size: 46px;
  color: #f2b705;
}

.big-value {
  font-size: 80px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  color: #285091;
  padding-bottom: 4px;
}

.big-caption {
  margin-top: 6px;
  font-size: 15px;
  color: rgb(10 37 64 / 70%);
  white-space: nowrap;
}

.orgs {
  position: absolute;
  left: 44px;
  top: 132px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  opacity: 0;
}

.org {
  display: grid;
  grid-template-columns: 44px auto;
  align-items: center;
  gap: 12px;
  padding: 8px 20px 8px 10px;
  border-radius: 999px;
  background: rgb(255 255 255 / 85%);
  box-shadow: 0 8px 24px rgb(10 37 64 / 10%);
  width: 220px;
}

.org img {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: contain;
}

.org-count {
  line-height: 1.05;
  font-size: 30px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #285091;
}

.org-name {
  font-size: 13px;
  color: rgb(10 37 64 / 60%);
  white-space: nowrap;
}

.sky {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sky-star {
  position: absolute;
  left: -0.5em;
  top: -0.5em;
  opacity: 0;
  will-change: transform, opacity;
  line-height: 1;
}
</style>
