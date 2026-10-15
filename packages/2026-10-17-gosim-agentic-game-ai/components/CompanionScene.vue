<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

import airiImg from '../public/closing/airi.png'
import gameVideo from '../public/games/airicraft.mp4'

/**
 * "A companion is a voice agent": a game frame on the left, AIRI (a cut-out
 * of her Live2D model) over its bottom-right corner, the player's voice input
 * and a live chat on the right. Each click plays one exchange in real time
 * (player speaks -> transcript bubble -> AIRI reacts, speaks or acts).
 * Going backwards or opening a later click directly shows the settled frame.
 *
 * Colours follow @proj-airi/chromatic's shade model (oklch lightness per shade,
 * chroma 0.18 + cos(hue) * 0.04 scaled per shade), baked here for the hue AIRI
 * uses (baseHue 220.44, see moeru-ai/airi uno.config.ts) plus its complementary
 * (+180) and a pink at hue 0. Source: github.com/proj-airi/chromatic
 * packages/preset/src/shared.ts (createBakedColorShades). Not a dependency.
 */
const props = defineProps<{ clicks: number }>()

type Who = 'you' | 'airi' | 'act' | 'think'
interface Line { at: number, delay: number, who: Who, en: string, zh?: string, dur?: number }

const topics = [
  { en: 'Live, in your game', zh: '实时陪你玩' },
  { en: 'When to speak, when to act', zh: '什么时候开口，什么时候动手' },
  { en: 'Knows the game', zh: '懂这个游戏' },
  { en: 'Plays fair, remembers you', zh: '不作弊，记得你' },
]

const lines: Line[] = [
  { at: 0, delay: 0, who: 'airi', en: 'I\'m here. Go on, I\'m watching.', zh: '我在呢，你玩，我看着。' },
  { at: 1, delay: 1000, who: 'you', en: 'Can you check the chest for iron?', zh: '帮我看看箱子里有没有铁？' },
  { at: 1, delay: 1700, who: 'airi', en: 'Creeper, behind you!', zh: '身后有苦力怕！', dur: 900 },
  { at: 1, delay: 2600, who: 'act', en: 'Reflex: dodge first, answer later', zh: '先躲开，再回答' },
  { at: 2, delay: 1000, who: 'you', en: 'How do I get to the Nether?', zh: '怎么去下界？' },
  { at: 2, delay: 1500, who: 'think', en: '' },
  { at: 2, delay: 2300, who: 'airi', en: '10 obsidian and a flint and steel. Want me to build the portal?', zh: '10 块黑曜石加打火石，要我来搭门吗？', dur: 2200 },
  { at: 3, delay: 1000, who: 'you', en: 'Any diamonds around here?', zh: '附近有钻石吗？' },
  { at: 3, delay: 1500, who: 'think', en: '' },
  { at: 3, delay: 2300, who: 'airi', en: 'I can\'t see through walls. But you liked the river cave. Dig there?', zh: '我可不会透视。不过你上次喜欢河边那个洞，去那儿挖挖？', dur: 2400 },
]

// Elapsed ms since the current click started; Infinity = settled.
const elapsed = ref(Number.POSITIVE_INFINITY)
let raf = 0
let t0 = 0
function tick(now: number) {
  elapsed.value = now - t0
  if (elapsed.value < 6000)
    raf = requestAnimationFrame(tick)
  else
    elapsed.value = Number.POSITIVE_INFINITY
}
watch(() => props.clicks, (c, prev) => {
  cancelAnimationFrame(raf)
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  if (c > prev && !reduce) {
    t0 = performance.now()
    elapsed.value = 0
    raf = requestAnimationFrame(tick)
  }
  else {
    elapsed.value = Number.POSITIVE_INFINITY
  }
})
onBeforeUnmount(() => cancelAnimationFrame(raf))

const visible = (l: Line) => props.clicks > l.at || (props.clicks === l.at && elapsed.value >= l.delay)
// One exchange per click. "Thinking" dots only live until the answer arrives.
const shownLines = computed(() => lines
  .map((l, i) => ({ ...l, key: i }))
  .filter((l, i) => {
    if (l.at !== props.clicks || !visible(l))
      return false
    if (l.who === 'think') {
      const answer = lines[i + 1]
      return !visible(answer)
    }
    return true
  }))

const youTalking = computed(() => elapsed.value < 1000 && props.clicks >= 1)
const airiTalking = computed(() => lines.some(l =>
  l.who === 'airi' && l.at === props.clicks && elapsed.value >= l.delay && elapsed.value < l.delay + (l.dur ?? 1200)))

const creeperOn = computed(() => props.clicks === 1 && elapsed.value >= 250)
const creeperHandled = computed(() => props.clicks === 1 && elapsed.value >= 2600)

const topic = computed(() => topics[Math.min(props.clicks, topics.length - 1)])
const bars = Array.from({ length: 30 }, (_, i) => ({
  base: 0.18 + 0.14 * Math.abs(Math.sin(i * 1.7)),
  delay: `${(i * 97) % 600}ms`,
  dur: `${420 + ((i * 53) % 380)}ms`,
}))
</script>

<template>
  <div class="scene">
    <!-- Game frame -->
    <div class="frame">
      <video :src="gameVideo" autoplay muted loop playsinline />
      <div class="live">
        <span class="dot" /> LIVE · Minecraft
      </div>
      <div class="creeper" :class="{ on: creeperOn, handled: creeperHandled }">
        <svg viewBox="0 0 8 8" class="creeper-face" shape-rendering="crispEdges" aria-hidden="true">
          <rect width="8" height="8" fill="#5dbb63" />
          <rect x="0" y="0" width="2" height="1" fill="#7fd27f" />
          <rect x="5" y="1" width="2" height="1" fill="#4a9e50" />
          <rect x="6" y="6" width="2" height="1" fill="#7fd27f" />
          <rect x="1" y="2" width="2" height="2" fill="#0d1a0e" />
          <rect x="5" y="2" width="2" height="2" fill="#0d1a0e" />
          <rect x="3" y="4" width="2" height="1" fill="#0d1a0e" />
          <rect x="2" y="5" width="4" height="2" fill="#0d1a0e" />
          <rect x="2" y="7" width="1" height="1" fill="#0d1a0e" />
          <rect x="5" y="7" width="1" height="1" fill="#0d1a0e" />
        </svg>
        <div class="creeper-tag">
          {{ creeperHandled ? '✓ moved away' : '3 blocks away' }}
        </div>
      </div>
    </div>

    <!-- AIRI (Live2D model screenshot, static) -->
    <div class="airi-char" :class="{ talking: airiTalking }">
      <div class="speak-ring" />
      <img :src="airiImg" alt="AIRI" class="airi-img">
      <div class="nameplate">
        AIRI
      </div>
    </div>

    <!-- Voice + chat -->
    <div class="side">
      <Transition name="topic" mode="out-in">
        <div :key="topic.en" class="topic">
          <div class="topic-en">
            {{ topic.en }}
          </div>
          <div class="topic-zh">
            {{ topic.zh }}
          </div>
        </div>
      </Transition>

      <div class="voice" :class="{ talking: youTalking }">
        <div class="mic-icon i-ph:microphone-fill" />
        <div class="wave">
          <span
            v-for="(b, i) in bars"
            :key="i"
            :style="{ '--h': b.base, 'animationDelay': b.delay, 'animationDuration': b.dur }"
          />
        </div>
        <div class="voice-label">
          you
        </div>
      </div>

      <div class="chat">
        <TransitionGroup name="pop" tag="div" class="chat-inner">
          <div v-for="l in shownLines" :key="l.key" class="msg" :class="l.who">
            <template v-if="l.who === 'think'">
              <span class="td" /><span class="td" /><span class="td" />
            </template>
            <template v-else-if="l.who === 'act'">
              <span class="i-ph:lightning-fill act-icon" />
              <span>{{ l.en }}<span class="msg-zh act-zh">{{ l.zh }}</span></span>
            </template>
            <template v-else>
              <div>{{ l.en }}</div>
              <div v-if="l.zh" class="msg-zh">
                {{ l.zh }}
              </div>
            </template>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scene {
  /* @proj-airi/chromatic, baseHue 220.44 (chroma 0.1496) */
  --primary-50: oklch(97% 0.02 220.44);
  --primary-100: oklch(95% 0.045 220.44);
  --primary-200: oklch(90% 0.0898 220.44);
  --primary-400: oklch(74% 0.1272 220.44);
  --primary-500: oklch(62% 0.1496 220.44);
  --primary-600: oklch(54% 0.172 220.44);
  --primary-800: oklch(42% 0.1272 220.44);
  --primary-950: oklch(29% 0.0748 220.44);
  /* complementary (+180) */
  --comp-200: oklch(90% 0.0898 40.44);
  --comp-400: oklch(74% 0.1272 40.44);
  --comp-500: oklch(62% 0.1496 40.44);
  /* pink, same shade model at hue 0 */
  --pink-200: oklch(90% 0.0898 0);
  --pink-300: oklch(85% 0.1122 0);
  --pink-400: oklch(74% 0.1272 0);

  position: relative;
  width: 868px;
  height: 352px;
}

/* Game frame */
.frame {
  position: absolute;
  left: 0;
  top: 12px;
  width: 512px;
  height: 288px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 18px 44px rgb(10 37 64 / 18%);
  background: var(--primary-950);
}

.frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.live {
  position: absolute;
  left: 12px;
  top: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #fff;
  background: rgb(10 37 64 / 55%);
  backdrop-filter: blur(8px);
}

.live .dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--comp-400);
}

.creeper {
  position: absolute;
  right: 120px;
  top: 92px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0;
  translate: 140px 0;
  transition: opacity 300ms ease, translate 300ms ease;
}

.creeper.on {
  opacity: 1;
  translate: 0 0;
  transition:
    opacity 400ms ease,
    translate 1100ms cubic-bezier(0.22, 1, 0.36, 1);
}

.creeper.handled {
  translate: 70px 0;
  opacity: 0.85;
  transition:
    opacity 500ms ease,
    translate 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.creeper-face {
  width: 46px;
  height: 46px;
  border-radius: 6px;
  outline: 3px solid var(--comp-400);
  outline-offset: 3px;
  animation: warn 700ms ease-in-out infinite alternate;
}

.handled .creeper-face {
  outline-color: #34c27a;
  animation: none;
}

@keyframes warn {
  to {
    outline-offset: 7px;
    outline-color: var(--comp-200);
  }
}

.creeper-tag {
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  padding: 2px 9px;
  border-radius: 999px;
  background: rgb(10 37 64 / 60%);
  backdrop-filter: blur(6px);
  white-space: nowrap;
}

/* AIRI */
.airi-char {
  position: absolute;
  left: 330px;
  top: 202px;
  width: 230px;
  height: 227px;
}

.airi-img {
  position: relative;
  width: 230px;
  height: 227px;
  display: block;
}

/* Speaking cue: a soft solid halo behind her head, on while she talks. */
.speak-ring {
  position: absolute;
  left: 50%;
  top: 6px;
  width: 150px;
  height: 150px;
  translate: -50% 0;
  border-radius: 999px;
  background: rgb(249 196 218 / 40%);
  opacity: 0;
  scale: 0.92;
  transition: opacity 250ms ease, scale 250ms ease;
}

.talking .speak-ring {
  opacity: 1;
  scale: 1;
}

.nameplate {
  position: absolute;
  left: 44px;
  top: 92px;
  padding: 2px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #fff;
  background: var(--primary-600);
  box-shadow: 0 6px 16px rgb(10 37 64 / 18%);
}

/* Side: topic, voice, chat */
.side {
  position: absolute;
  left: 572px;
  top: 0;
  width: 296px;
  height: 318px;
  display: flex;
  flex-direction: column;
}

.topic {
  height: 52px;
}

.topic-en {
  font-size: 19px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--primary-800);
}

.topic-zh {
  font-size: 13px;
  color: rgb(10 37 64 / 60%);
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', 'Noto Sans SC', sans-serif;
}

.topic-enter-active {
  transition: all 500ms cubic-bezier(0.22, 1, 0.36, 1);
}

.topic-leave-active {
  transition: all 200ms ease;
}

.topic-enter-from {
  opacity: 0;
}

.topic-leave-to {
  opacity: 0;
}

.voice {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgb(255 255 255 / 75%);
  border: 1px solid rgb(255 255 255 / 90%);
  box-shadow: 0 8px 22px rgb(10 37 64 / 8%);
  flex: none;
}

.mic-icon {
  font-size: 18px;
  color: var(--primary-400);
  transition: color 300ms ease;
}

.voice.talking .mic-icon {
  color: var(--comp-500);
}

.wave {
  flex: 1;
  height: 26px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.wave span {
  flex: 1;
  height: 100%;
  border-radius: 99px;
  background: var(--primary-200);
  transform: scaleY(0.12);
  transition: transform 300ms ease, background 300ms ease;
}

.voice.talking .wave span {
  background: var(--primary-500);
  animation: bar ease-in-out infinite alternate;
}

@keyframes bar {
  from {
    transform: scaleY(var(--h));
  }
  to {
    transform: scaleY(1);
  }
}

.voice-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(10 37 64 / 50%);
}

.chat {
  position: relative;
  flex: 1;
  margin-top: 10px;
  overflow: hidden;
}

.chat-inner {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.msg {
  max-width: 280px;
  padding: 8px 14px;
  border-radius: 18px;
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.3;
  box-shadow: 0 6px 16px rgb(10 37 64 / 8%);
}

.msg-zh {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.72;
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', 'Noto Sans SC', sans-serif;
}

.msg.you {
  align-self: flex-end;
  border-bottom-right-radius: 6px;
  background: var(--primary-500);
  color: #fff;
}

.msg.airi,
.msg.think {
  align-self: flex-start;
  border-bottom-left-radius: 6px;
  background: #fff;
  color: var(--primary-950);
  border: 1.5px solid var(--pink-200);
}

.msg.act {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  font-size: 12.5px;
  color: var(--primary-950);
  background: var(--comp-200);
  box-shadow: none;
}

.act-zh {
  display: block;
}

.act-icon {
  flex: none;
  color: var(--comp-500);
}

.msg.think {
  display: flex;
  gap: 5px;
  padding: 12px 14px;
}

.td {
  width: 7px;
  height: 7px;
  border-radius: 99px;
  background: var(--pink-400);
  animation: td 900ms ease-in-out infinite;
}

.td:nth-child(2) {
  animation-delay: 150ms;
}

.td:nth-child(3) {
  animation-delay: 300ms;
}

@keyframes td {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

.pop-enter-active {
  transition:
    opacity 300ms ease,
    transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.pop-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.msg.you.pop-enter-from {
  transform-origin: right bottom;
}

.msg.airi.pop-enter-from,
.msg.act.pop-enter-from {
  transform-origin: left bottom;
}

.pop-leave-active {
  transition: opacity 180ms ease;
}

.pop-leave-to {
  opacity: 0;
}

.pop-move {
  transition: transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .wave span,
  .td,
  .creeper-face {
    animation: none !important;
  }
}
</style>
