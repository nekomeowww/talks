<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import frame from '../public/balatro/hand-zh.jpg'

/**
 * Balatro's self-improving perception loop, told on one real game frame.
 *
 * clicks 0: the frame and the problem (a roguelike economy).
 * clicks 1: the mod stages exact cards (a mono "RPC" chip, cards glow in turn).
 * clicks 2: one capture gives pixels + true labels: flash, label boxes pop on
 *           every hand card, the label counter runs to 6,552.
 * clicks 3: YOLO is trained on them: boxes turn into predictions, mAP badge.
 * clicks 4: AUV runs it live; a miss becomes the next label; the loop arrow
 *           closes; Hugging Face chip.
 * clicks 5: honest ending: perception improved, strategy still loses.
 *
 * Opening the slide at a later click renders the settled state: the only
 * time-based effects (flash, counter) run on a live forward click.
 */

const props = defineProps<{ clicks: number }>()

const c = computed(() => props.clicks)

// Card boxes in percent of the cropped frame (1400x924), left to right.
const cards = [
  { id: 'K♠', l: 30.8, t: 58.5, w: 11.2, h: 20.7 },
  { id: 'K♣', l: 37.7, t: 53.1, w: 10.3, h: 21.6 },
  { id: 'K♣', l: 44.9, t: 57.5, w: 10.5, h: 21.3 },
  { id: 'J♥', l: 52.2, t: 56.6, w: 10.1, h: 21.2 },
  { id: '10♣', l: 59.2, t: 56.3, w: 10.1, h: 20.9 },
  { id: '7♠', l: 65.9, t: 56.6, w: 10.3, h: 20.9 },
  { id: '5♦', l: 72.8, t: 57.1, w: 10.3, h: 20.9 },
  { id: '4♠', l: 79.7, t: 57.7, w: 10.3, h: 20.9 },
  { id: '2♥', l: 86.6, t: 57.7, w: 10.9, h: 21.4 },
]

const red = (id: string) => /[♥♦]/.test(id)

const chip = computed(() => {
  if (c.value <= 1)
    return { cmd: 'dataset.stage_cards', arg: 'KS KC KC JH TC 7S 5D 4S 2H' }
  if (c.value === 2)
    return { cmd: 'dataset.capture', arg: '→ frame + true labels' }
  if (c.value === 3)
    return { cmd: 'yolo train', arg: '→ card model' }
  return { cmd: 'auv', arg: '· live run on the real game' }
})

const steps = [
  { en: 'Mod stages exact cards', zh: 'mod 直接把指定的牌发到手上' },
  { en: 'Same frame: pixels + true labels', zh: '同一帧里截图，标签由 mod 给' },
  { en: 'Train YOLO', zh: '拿这些标签训练 YOLO' },
  { en: 'Run live in AUV, misses become labels', zh: '在 AUV 里实战，认错的就是下一批标注' },
]

// Label counter: runs on a live 1 -> 2 click, otherwise shows its settled value.
const TOTAL = 6552
const fmt = (n: number) => n.toLocaleString('en-US')
const countEl = ref<HTMLElement>()
const flash = ref(false)

function setCount(n: number) {
  if (countEl.value)
    countEl.value.textContent = fmt(n)
}
let raf = 0
let flashTimer: ReturnType<typeof setTimeout> | undefined

function runCounter() {
  cancelAnimationFrame(raf)
  const start = performance.now()
  const dur = 1600
  let last = -1
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / dur)
    // step in 12 increments so the text only changes a few times per second
    const step = Math.round((1 - (1 - t) ** 3) * 12)
    if (step !== last) {
      last = step
      setCount(t >= 1 ? TOTAL : Math.round((TOTAL * step) / 12))
    }
    if (t < 1)
      raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

watch(c, (now, before) => {
  if (now >= 2 && before < 2) {
    flash.value = true
    clearTimeout(flashTimer)
    flashTimer = setTimeout(() => (flash.value = false), 700)
    runCounter()
  }
  else if (now < 2) {
    cancelAnimationFrame(raf)
    setCount(0)
  }
  else {
    cancelAnimationFrame(raf)
    setCount(TOTAL)
  }
})

onMounted(() => setCount(c.value >= 2 ? TOTAL : 0))

onUnmounted(() => {
  cancelAnimationFrame(raf)
  clearTimeout(flashTimer)
})
</script>

<template>
  <div class="bl">
    <!-- The real frame -->
    <div class="frame" :class="{ dim: c >= 5 }">
      <img :src="frame" alt="Balatro, Big Blind, a nine-card hand">

      <!-- 1: cards glow one by one as they are dealt -->
      <div
        v-for="(k, i) in cards"
        :key="`g${i}`"
        class="deal"
        :class="{ on: c === 1 }"
        :style="{ left: `${k.l}%`, top: `${k.t}%`, width: `${k.w}%`, height: `${k.h}%`, animationDelay: `${i * 90}ms` }"
      />

      <!-- 2+: label boxes, 3+: predictions -->
      <div
        v-for="(k, i) in cards"
        :key="`b${i}`"
        class="box"
        :class="{ on: c >= 2, pred: c >= 3 }"
        :style="{ left: `${k.l}%`, top: `${k.t}%`, width: `${k.w}%`, height: `${k.h}%`, transitionDelay: c === 2 ? `${120 + i * 70}ms` : `${i * 30}ms` }"
      >
        <span class="tag" :class="{ red: red(k.id) }">{{ k.id }}</span>
      </div>

      <!-- 4: a miss on the score panel becomes the next label -->
      <div class="miss" :class="{ on: c >= 4 }">
        <span class="miss-tag">miss → next label</span>
      </div>

      <!-- mono command chip -->
      <div class="cmd" :class="{ on: c >= 1 && c < 5 }">
        <span class="prompt">❯</span>
        <span class="cmd-name">{{ chip.cmd }}</span>
        <span class="cmd-arg">{{ chip.arg }}</span>
      </div>

      <!-- 2+: label counter -->
      <div class="badge counter" :class="{ on: c >= 2 }">
        <div ref="countEl" class="num" />
        <div class="cap">
          card labels · <b>0</b> by hand
        </div>
        <div class="sub">
          819 frames · 47 profiles
        </div>
      </div>

      <!-- 3+: model quality -->
      <div class="badge metric" :class="{ on: c >= 3 }">
        <div class="row">
          <span class="num sm">0.978</span><span class="cap">mAP50 · card identity</span>
        </div>
        <div class="row">
          <span class="num sm">0.995</span><span class="cap">enhancement · edition · seal</span>
        </div>
      </div>

      <!-- 4+: published -->
      <div class="hf" :class="{ on: c >= 4 }">
        <span class="hf-emoji">🤗</span>
        <span><b>9 models</b> on huggingface.co/proj-airi <span class="muted-w">(7 Balatro)</span></span>
      </div>

      <!-- 5: still loses -->
      <div class="stamp" :class="{ on: c >= 5 }">
        <div>GAME OVER</div>
        <div class="stamp-sub">
          lost to the boss blind
        </div>
      </div>

      <div class="flash" :class="{ go: flash }" />
    </div>

    <!-- The loop, as four lines of type -->
    <div class="side">
      <div class="lede">
        <div class="lede-en">
          A roguelike <b>economy</b>,<br>not just a card game.
        </div>
        <div class="lede-zh">
          小丑、商店、利息、Boss 盲注，拼的是运营。看屏幕、点鼠标的 harness 玩不转。
        </div>
      </div>

      <div class="loop">
        <div class="back" :class="{ on: c >= 4 }" aria-hidden="true" />
        <div
          v-for="(s, i) in steps"
          :key="s.en"
          class="step"
          :class="{ shown: c > i, active: c === i + 1 }"
        >
          <div class="dot">
            {{ i + 1 }}
          </div>
          <div>
            <div class="step-en">
              {{ s.en }}
            </div>
            <div class="step-zh">
              {{ s.zh }}
            </div>
          </div>
        </div>
      </div>

      <div class="honest" :class="{ on: c >= 5 }">
        <div class="honest-en">
          It sees much better. It still can't <i>play</i>.
        </div>
        <div class="honest-zh">
          看得更准了，打法还是输给 Boss 盲注。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bl {
  display: grid;
  grid-template-columns: 556px 1fr;
  gap: 26px;
  align-items: start;
  margin-top: 14px;
}

/* ---------- frame ---------- */
.frame {
  position: relative;
  width: 556px;
  aspect-ratio: 1400 / 924;
  border-radius: 18px;
  overflow: hidden;
  box-shadow:
    0 18px 44px rgb(10 37 64 / 20%),
    0 2px 6px rgb(10 37 64 / 10%);
}

.frame img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 700ms var(--ease-smooth-out);
}

.frame.dim img {
  filter: saturate(0.35) brightness(0.8);
}

.deal {
  position: absolute;
  border-radius: 6px;
  box-shadow:
    0 0 0 2px #f7db8f,
    0 0 14px 3px rgb(247 219 143 / 60%);
  opacity: 0;
}

.deal.on {
  animation: deal 1.6s var(--ease-smooth-out) infinite;
}

@keyframes deal {
  0% {
    opacity: 0;
  }
  18% {
    opacity: 1;
  }
  60%,
  100% {
    opacity: 0;
  }
}

.box {
  position: absolute;
  border: 2px dashed #f7db8f;
  border-radius: 5px;
  background: rgb(247 219 143 / 10%);
  opacity: 0;
  transition:
    opacity 300ms var(--ease-smooth-out),
    border-color 400ms ease,
    background 400ms ease;
}

.box.on {
  opacity: 1;
}

.box.pred {
  border: 2px solid #91d2dd;
  background: rgb(145 210 221 / 8%);
}

.tag {
  position: absolute;
  left: -2px;
  top: -17px;
  padding: 0 4px;
  border-radius: 4px 4px 4px 0;
  font-size: 10.5px;
  font-weight: 800;
  line-height: 15px;
  color: #0a2540;
  background: #f7db8f;
  white-space: nowrap;
  transition: background 400ms ease;
}

.box.pred .tag {
  background: #91d2dd;
}

.tag.red {
  color: #b3261e;
}

.miss {
  position: absolute;
  left: 1.6%;
  top: 52.5%;
  width: 24.6%;
  height: 9.4%;
  border: 2px dashed #ff6b7a;
  border-radius: 6px;
  background: rgb(255 107 122 / 14%);
  opacity: 0;
  transition: opacity 300ms var(--ease-smooth-out);
}

.miss.on {
  opacity: 1;
}

.miss-tag {
  position: absolute;
  left: -2px;
  top: -18px;
  padding: 0 5px;
  border-radius: 4px 4px 4px 0;
  font-size: 10.5px;
  font-weight: 800;
  line-height: 16px;
  color: #fff;
  background: #ff6b7a;
  white-space: nowrap;
}

.cmd {
  position: absolute;
  left: 30.5%;
  top: 33%;
  display: flex;
  align-items: baseline;
  gap: 7px;
  padding: 5px 11px;
  border-radius: 9px;
  background: rgb(14 16 19 / 92%);
  border: 1px solid rgb(255 255 255 / 12%);
  font-family: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace;
  font-size: 11px;
  color: #e7e5dd;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 450ms var(--ease-smooth-out);
}

.cmd.on {
  opacity: 1;
}

.prompt {
  color: #7fd030;
}

.cmd-name {
  color: #00e0e0;
  font-weight: 600;
}

.cmd-arg {
  color: #b8b6ad;
}

.badge {
  position: absolute;
  padding: 8px 12px;
  border-radius: 14px;
  background: rgb(255 255 255 / 94%);
  box-shadow: 0 10px 26px rgb(10 37 64 / 22%);
  color: #0a2540;
  opacity: 0;
  transition: opacity 450ms var(--ease-smooth-out);
}

.badge.on {
  opacity: 1;
}

.counter {
  left: 12px;
  top: 12px;
}

.metric {
  right: 12px;
  top: 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.num {
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  color: #285091;
}

.num.sm {
  font-size: 20px;
  min-width: 52px;
  display: inline-block;
}

.row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.cap {
  font-size: 11.5px;
  font-weight: 700;
}

.sub {
  font-size: 10.5px;
  color: rgb(10 37 64 / 58%);
}

.hf {
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgb(255 255 255 / 88%);
  box-shadow: 0 8px 22px rgb(10 37 64 / 22%);
  font-size: 11.5px;
  color: #0a2540;
  opacity: 0;
  transition: opacity 450ms var(--ease-smooth-out);
}

.hf.on {
  opacity: 1;
}

.hf-emoji {
  font-size: 15px;
}

.muted-w {
  color: rgb(10 37 64 / 55%);
}

.stamp {
  position: absolute;
  left: 50%;
  top: 22%;
  padding: 8px 22px 9px;
  border: 3px solid #ff6b7a;
  border-radius: 14px;
  background: rgb(255 255 255 / 90%);
  color: #e0475a;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-align: center;
  line-height: 1.05;
  opacity: 0;
  transform: translateX(-50%);
  transition: opacity 400ms ease;
}

.stamp.on {
  opacity: 1;
}

.stamp-sub {
  margin-top: 3px;
  font-size: 11px;
  letter-spacing: 0.04em;
  font-weight: 700;
  color: #0a2540;
}

.flash {
  position: absolute;
  inset: 0;
  background: #fff;
  opacity: 0;
  pointer-events: none;
}

.flash.go {
  animation: flash 650ms ease-out;
}

@keyframes flash {
  0% {
    opacity: 0.85;
  }
  100% {
    opacity: 0;
  }
}

/* ---------- side ---------- */
.side {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 2px;
}

.lede-en {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}

.lede-zh {
  margin-top: 4px;
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', 'Noto Sans SC', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: var(--ink-muted);
}

.loop {
  position: relative;
  padding-left: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* The loop back from step 4 to step 1: a rounded bracket with an arrowhead,
   drawn with borders so it never stretches. */
.back {
  position: absolute;
  left: -16px;
  top: 14px;
  bottom: 44px;
  width: 14px;
  border: 2px solid #e87aa4;
  border-right: none;
  border-radius: 12px 0 0 12px;
  opacity: 0;
  transition: opacity 500ms ease;
}

.back::after {
  content: '';
  position: absolute;
  right: -2px;
  top: -6px;
  width: 8px;
  height: 8px;
  border-top: 2px solid #e87aa4;
  border-right: 2px solid #e87aa4;
  transform: rotate(45deg);
}

.back.on {
  opacity: 1;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  opacity: 0;
  transition: opacity 450ms var(--ease-smooth-out);
}

.step.shown {
  opacity: 0.5;
}

.step.active,
.loop:has(.back.on) .step.shown {
  opacity: 1;
}

.dot {
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  background: #456e95;
  transition: background 300ms ease;
}

.step.active .dot {
  background: #e87aa4;
}

.step-en {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
}

.step-zh {
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', 'Noto Sans SC', sans-serif;
  font-size: 11.5px;
  color: var(--ink-muted);
  line-height: 1.4;
}

.honest {
  padding-top: 10px;
  border-top: 1px solid rgb(10 37 64 / 10%);
  opacity: 0;
  transition: opacity 450ms var(--ease-smooth-out);
}

.honest.on {
  opacity: 1;
}

.honest-en {
  font-size: 16px;
  font-weight: 700;
}

.honest-zh {
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', 'Noto Sans SC', sans-serif;
  font-size: 12px;
  color: var(--ink-muted);
}

@media (prefers-reduced-motion: reduce) {
  .deal.on,
  .flash.go {
    animation: none;
  }
}
</style>
