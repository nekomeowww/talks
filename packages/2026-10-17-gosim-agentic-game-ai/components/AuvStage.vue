<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'
import { computed, onUnmounted, reactive, ref, watch } from 'vue'

/**
 * AUV: programmable computer use. Left column carries the words and two
 * measured numbers; right column is a desk of five windows driven by five
 * cursors (AUV overlay colours) with a small terminal in front.
 *
 * clicks 0: name, one line of what it is, the desk idle.
 * clicks 1: why: per-step LLM calls are slow; the terminal shows a command.
 * clicks 2: cursors run; macOS click latency, auv today vs waits off vs native.
 * clicks 3: Windows: auv matches native SendInput.
 *
 * Numbers come from LobeHub goal goal_8FDMn9pjmEDS (injection -> app receives,
 * T-146 macOS and T-147 Windows findings).
 */

const props = defineProps<{ clicks: number }>()
const c = computed(() => props.clicks)
const active = useIsSlideActive()

// AUV mark (apps/docs-website/src/lib/icon.ts PART_PATHS)
const MARK = [
  'M66.0727 102.798C68.7703 96.4007 78.2297 96.4006 80.9272 102.798L112.409 177.46C114.535 182.5 110.66 188 104.982 188H42.0177C36.3401 188 32.4649 182.5 34.5905 177.46L66.0727 102.798Z',
  'M97.4346 109.203C94.6354 101.911 98.6982 96 106.509 96H149.755C155.616 96 162.069 100.435 164.169 105.906L181.679 151.522C189.502 171.903 178.147 188.424 156.316 188.424V188.424C140.592 188.424 123.276 176.524 117.641 161.844L97.4346 109.203Z',
  'M221.927 181.202C219.23 187.599 209.77 187.599 207.073 181.202L175.591 106.54C173.465 101.5 177.34 96 183.018 96L245.982 96C251.66 96 255.535 101.5 253.409 106.54L221.927 181.202Z',
]
const MARK_COLOR = ['#3fd9dd', '#9b7dff', '#ff74b1']

// Ghost cursor (auv-driver-overlay-common/assets/cursor-auv.svg outline)
const GHOST = 'M3 2 Q0 0 0 4 L0 20 Q0 24 3 21.5 L8 17 Q9.5 15.5 12 15.5 L16 15.5 Q20 15.5 17 12.5 Z'

// Overlay colours, in the order the scene assigns them to windows.
const COLORS = [
  { fill: '#3fd9dd', edge: '#cefffd', ink: '#0b3a3c' },
  { fill: '#ff74b1', edge: '#ffe1ee', ink: '#ffffff' },
  { fill: '#9b7dff', edge: '#ebe4ff', ink: '#ffffff' },
  { fill: '#86d94a', edge: '#ecffd9', ink: '#1d3a08' },
  { fill: '#ffb238', edge: '#fff0d4', ink: '#4a2e00' },
]

// Five overlapping windows on a 460 x 300 desk.
const WINDOWS = [
  { x: 0, y: 0, w: 220, h: 140 },
  { x: 124, y: 26, w: 220, h: 140 },
  { x: 240, y: 6, w: 220, h: 140 },
  { x: 20, y: 124, w: 220, h: 140 },
  { x: 150, y: 150, w: 220, h: 140 },
]

// Targets per window, inside the visible part of each window.
const TARGETS = [
  [[30, 56], [86, 74], [60, 100], [104, 48]],
  [[160, 64], [186, 96], [210, 54], [232, 88]],
  [[380, 48], [420, 74], [396, 104], [436, 44]],
  [[46, 176], [94, 206], [70, 236], [120, 184]],
  [[176, 230], [200, 262], [188, 210], [300, 184]],
]

interface Cursor { x: number, y: number, fx: number, fy: number, tx: number, ty: number, t0: number, next: number, ti: number }
interface Ripple { id: number, x: number, y: number, color: string, t0: number }

const cursors = reactive<Cursor[]>(TARGETS.map(ts => ({
  x: ts[0][0],
  y: ts[0][1],
  fx: ts[0][0],
  fy: ts[0][1],
  tx: ts[0][0],
  ty: ts[0][1],
  t0: 0,
  next: 0,
  ti: 0,
})))
const ripples = ref<Ripple[]>([])
const LOG0 = ['ok  click  window 3', 'ok  click  window 1', 'ok  click  window 5']
const log = ref<string[]>([...LOG0])
const now = ref(0)
let ripId = 0
let raf = 0

const running = computed(() => c.value >= 2 && active.value)
const MOVE = 520

function easeOut(t: number) {
  return 1 - (1 - t) ** 3
}

function frame(t: number) {
  now.value = t
  cursors.forEach((cur, i) => {
    if (cur.next === 0)
      cur.next = t + 300 + i * 260
    const p = Math.max(0, Math.min(1, (t - cur.t0) / MOVE))
    const e = easeOut(p)
    cur.x = cur.fx + (cur.tx - cur.fx) * e
    cur.y = cur.fy + (cur.ty - cur.fy) * e
    if (t >= cur.next) {
      ripples.value.push({ id: ripId++, x: cur.tx, y: cur.ty, color: COLORS[i].fill, t0: t })
      log.value.push(`ok  click  window ${i + 1}`)
      if (log.value.length > 3)
        log.value.shift()
      cur.ti = (cur.ti + 1) % TARGETS[i].length
      cur.fx = cur.x
      cur.fy = cur.y
      cur.tx = TARGETS[i][cur.ti][0]
      cur.ty = TARGETS[i][cur.ti][1]
      cur.t0 = t + 200
      cur.next = t + 200 + MOVE + 1100 + Math.random() * 900
    }
  })
  ripples.value = ripples.value.filter(r => t - r.t0 < 700)
  raf = requestAnimationFrame(frame)
}

watch(running, (on) => {
  cancelAnimationFrame(raf)
  if (on) {
    cursors.forEach(cur => (cur.next = 0))
    raf = requestAnimationFrame(frame)
  }
  else {
    ripples.value = []
  }
}, { immediate: true })

onUnmounted(() => cancelAnimationFrame(raf))

const shownLog = computed(() => (running.value ? log.value : LOG0))
</script>

<template>
  <div class="auv">
    <!-- left: words and two numbers -->
    <div class="left">
      <div class="brand">
        <svg class="mark" viewBox="30 92 228 100">
          <path v-for="(d, i) in MARK" :key="i" :d="d" :fill="MARK_COLOR[i]" />
        </svg>
        <span class="name">AUV</span>
        <span class="expand">Application Use Via</span>
      </div>
      <div class="headline">
        Programmable computer use
      </div>
      <div class="zh">
        可以写成代码的电脑操作，有点像管整个系统的 Playwright
      </div>

      <div class="why fade" :class="{ on: c >= 1 }">
        <div class="why-en">
          An LLM call on every click is too slow. Put repeated work in code.
        </div>
        <div class="zh">
          每点一下都去问一次 LLM，太慢了。重复的操作就写成代码。
        </div>
      </div>

      <div class="nums">
        <div class="num-block fade" :class="{ on: c >= 2 }">
          <div class="big">
            20.4 <span class="arrow">→</span> 10.6 <span class="unit">ms</span>
          </div>
          <div class="cap">
            macOS click into Chrome, p50
          </div>
          <div class="note">
            Native is 10.1 ms. The gap was a fixed 15 ms wait, in all 5 test apps.
          </div>
        </div>

        <div class="num-block fade" :class="{ on: c >= 3 }">
          <div class="big">
            74 <span class="of">/ 76</span>
          </div>
          <div class="cap">
            Windows cases within 1.5 ms of native
          </div>
          <div class="note">
            SendInput needs no extra wait. It did find a bug: keys without scan codes.
          </div>
        </div>
      </div>
    </div>

    <!-- right: the desk -->
    <div class="right">
      <div class="desk">
        <div
          v-for="(w, i) in WINDOWS"
          :key="i"
          class="win"
          :style="{ left: `${w.x}px`, top: `${w.y}px`, width: `${w.w}px`, height: `${w.h}px`, zIndex: i + 1, borderColor: c >= 2 ? COLORS[i].fill : 'rgb(10 37 64 / 8%)' }"
        >
          <div class="win-bar">
            <i /><i /><i />
          </div>
          <div class="sk">
            <span style="width: 62%" />
            <span style="width: 84%" />
            <span style="width: 48%" />
            <span style="width: 70%" />
          </div>
        </div>

        <!-- small terminal in front -->
        <div class="term">
          <div class="term-bar">
            <i /><i /><i />
          </div>
          <div class="term-body">
            <div v-if="c < 1" class="ln">
              <span class="pr">$</span> <span class="caret" />
            </div>
            <template v-else>
              <div class="ln">
                <span class="pr">$</span> auv invoke <span class="fn">input.clickPoint</span>
              </div>
              <div class="ln dim">
                {{ '  ' }}--relative-to window
              </div>
              <div class="out" :class="{ on: c >= 2 }">
                <div v-for="(l, j) in shownLog" :key="`${j}${l}`" class="ln o">
                  {{ l }}
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- ripples and cursors -->
        <svg class="overlay" :class="{ on: c >= 2 }" viewBox="0 0 460 300">
          <g v-for="r in ripples" :key="r.id" :opacity="1 - (now - r.t0) / 700">
            <circle :cx="r.x" :cy="r.y" :r="4 + 20 * ((now - r.t0) / 700)" fill="none" :stroke="r.color" stroke-width="2" />
          </g>
          <g v-for="(cur, i) in cursors" :key="i" :transform="`translate(${cur.x} ${cur.y}) scale(1.1) translate(-1 -1.5)`">
            <path :d="GHOST" :fill="COLORS[i].fill" :stroke="COLORS[i].edge" stroke-width="1.4" stroke-linejoin="round" />
          </g>
        </svg>
      </div>

      <div class="plat">
        macOS · Windows · Linux, as a CLI, MCP server, JS SDK and gRPC
      </div>
    </div>
  </div>
</template>

<style scoped>
.auv {
  display: grid;
  grid-template-columns: 1fr 460px;
  gap: 40px;
  align-items: center;
  height: 100%;
  color: var(--ink);
}

/* ---------- left ---------- */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mark {
  width: 64px;
  height: 28px;
}

.name {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.expand {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-muted);
}

.headline {
  margin-top: 14px;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.015em;
}

.zh {
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--ink-muted);
}

.fade {
  opacity: 0;
  transition: opacity 450ms var(--ease-smooth-out);
}

.fade.on {
  opacity: 1;
}

.why {
  margin-top: 18px;
}

.why-en {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
}

.nums {
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
}

.big {
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: #285091;
  white-space: nowrap;
}

.arrow,
.of,
.unit {
  font-size: 20px;
  color: var(--ink-muted);
}

.cap {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
}

.note {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--ink-muted);
}

/* ---------- desk ---------- */
.desk {
  position: relative;
  width: 460px;
  height: 300px;
}

.win {
  position: absolute;
  border-radius: 12px;
  background: #fff;
  border: 2px solid;
  box-shadow: 0 10px 24px rgb(10 37 64 / 10%);
  transition: border-color 400ms ease;
}

.win-bar,
.term-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 20px;
  padding: 0 9px;
}

.win-bar i,
.term-bar i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff5f57;
}

.win-bar i:nth-child(2),
.term-bar i:nth-child(2) {
  background: #febc2e;
}

.win-bar i:nth-child(3),
.term-bar i:nth-child(3) {
  background: #28c840;
}

.sk {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sk span {
  display: block;
  height: 7px;
  border-radius: 4px;
  background: rgb(10 37 64 / 7%);
}

.term {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 236px;
  z-index: 10;
  border-radius: 11px;
  background: #15171a;
  box-shadow: 0 14px 30px rgb(10 37 64 / 24%);
  color: #e8e6df;
  overflow: hidden;
}

.term-body {
  padding: 2px 10px 9px;
  font-family: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;
  font-size: 9.5px;
  line-height: 1.55;
  min-height: 74px;
}

.ln {
  white-space: pre;
}

.pr {
  color: #7fd030;
}

.fn {
  color: #3fd9dd;
}

.dim,
.o {
  color: rgb(232 230 223 / 60%);
}

.out {
  opacity: 0;
  transition: opacity 300ms ease;
}

.out.on {
  opacity: 1;
}

.caret {
  display: inline-block;
  width: 6px;
  height: 11px;
  vertical-align: -2px;
  background: #e8e6df;
  animation: blink 1.2s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.overlay {
  position: absolute;
  inset: 0;
  width: 460px;
  height: 300px;
  z-index: 20;
  overflow: visible;
  pointer-events: none;
  opacity: 0;
  transition: opacity 400ms ease;
}

.overlay.on {
  opacity: 1;
}

.plat {
  margin-top: 18px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink-muted);
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .caret {
    animation: none;
  }
}
</style>
