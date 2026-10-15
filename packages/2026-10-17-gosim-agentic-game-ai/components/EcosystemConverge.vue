<script setup lang="ts">
import { animate, stagger } from 'animejs'
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'

import airiLogo from '../public/ecosystem/airi-icon-dark-rounded.png'
import alintLogo from '../public/ecosystem/alint-logo.svg'
import auvLogo from '../public/ecosystem/auv-logo.svg'
import velinLogo from '../public/ecosystem/velin-logo.svg'
import viewalLogo from '../public/ecosystem/vieval-logo.svg'
import balatroWordmark from '../public/logos/balatro.png'
import skylinesWordmark from '../public/logos/cities-skylines-2.png'
import domeKeeperWordmark from '../public/logos/dome-keeper.png'
import factorioWordmark from '../public/logos/factorio.png'
import kspWordmark from '../public/logos/ksp.png'
import osuLogo from '../public/logos/osu.webp'

/**
 * Moeru AI ecosystem on a warm near-black stage. Click 0: AIRI alone in the
 * middle. At `at` (default 1) the project names + logos fade in with a short
 * stagger and a small slide from their side: games on the left, agent tooling
 * and voice/runtime on the right. Going back resets; opening at the click
 * shows the settled map.
 * The component fills its positioned parent (the slide, 980x552).
 */
const props = defineProps<{
  clicks: number
  at?: number
}>()

interface Item { name: string, role: string, logo?: string, icon?: string, wordmark?: string }
interface Group { id: string, title: string, zh: string, side: 'left' | 'right', cols: number, items: Item[] }

const groups: Group[] = [
  {
    id: 'play',
    title: 'Games we play',
    zh: '玩过的游戏',
    side: 'left',
    cols: 1,
    items: [
      { name: 'Airicraft', role: 'Minecraft agent', icon: 'i-twemoji:pick' },
      { name: 'recorder-minecraft', role: 'game evidence', icon: 'i-twemoji:film-frames' },
      { name: 'Balatro', role: 'YOLO + CL', wordmark: balatroWordmark },
      { name: 'Factorio', role: 'code as policy', wordmark: factorioWordmark },
      { name: 'Kerbal Space Program', role: 'orbital planning', wordmark: kspWordmark },
      { name: 'Dome Keeper', role: 'Godot data', wordmark: domeKeeperWordmark },
      { name: 'Cities: Skylines II', role: 'AIRI Mayor', wordmark: skylinesWordmark },
      { name: 'osu!', role: 'high-frequency input', logo: osuLogo },
    ],
  },
  {
    id: 'agent',
    title: 'Agent toolkit',
    zh: '智能体工具链',
    side: 'right',
    cols: 2,
    items: [
      { name: 'AUV', role: 'computer use', logo: auvLogo },
      { name: 'xsAI', role: 'LLM SDK', icon: 'i-twemoji:sparkles' },
      { name: 'Velin', role: 'prompt as Vue', logo: velinLogo },
      { name: 'Vieval', role: 'evals', logo: viewalLogo },
      { name: 'alint', role: 'intent lint', logo: alintLogo },
    ],
  },
  {
    id: 'runtime',
    title: 'Voice & runtime',
    zh: '语音与运行时',
    side: 'right',
    cols: 2,
    items: [
      { name: 'unspeech', role: 'speech gateway', icon: 'i-twemoji:speaking-head' },
      { name: 'ortts', role: 'local TTS', icon: 'i-twemoji:speaker-high-volume' },
      { name: 'Eventa', role: 'IPC events', icon: 'i-twemoji:satellite-antenna' },
      { name: 'gpuu', role: 'WebGPU', icon: 'i-twemoji:high-voltage' },
      { name: 'hfup', role: 'HF deploy', icon: 'i-twemoji:hugging-face' },
    ],
  },
]

const root = useTemplateRef<HTMLElement>('root')
const at = props.at ?? 1

const q = (sel: string) => root.value ? Array.from(root.value.querySelectorAll<HTMLElement>(sel)) : []

let running: { pause?: () => void }[] = []
function stop() {
  running.forEach(a => a.pause?.())
  running = []
}

// Items slide a few pixels in from their own side while fading in.
const offset = (el: HTMLElement) => el.dataset.side === 'left' ? -16 : 16

function reset() {
  stop()
  q('.item').forEach((el) => {
    el.style.transform = `translateX(${offset(el)}px)`
    el.style.opacity = '0'
  })
  q('.fade').forEach((el) => {
    el.style.opacity = '0'
  })
  q('.link').forEach((el) => {
    el.style.strokeDashoffset = '1'
  })
}

function settle() {
  stop()
  q('.item, .fade').forEach((el) => {
    el.style.transform = ''
    el.style.opacity = ''
  })
  q('.link').forEach((el) => {
    el.style.strokeDashoffset = '0'
  })
}

function reveal() {
  stop()
  if (matchMedia('(prefers-reduced-motion: reduce)').matches)
    return settle()
  running.push(animate(q('.fade'), {
    opacity: [0, 1],
    delay: stagger(100),
    duration: 500,
    ease: 'outQuad',
  }))
  running.push(animate(q('.item'), {
    translateX: (el: Element) => [offset(el as HTMLElement), 0],
    opacity: [0, 1],
    delay: stagger(50, { start: 150 }),
    duration: 500,
    ease: 'outCubic',
  }))
  running.push(animate(q('.link'), {
    strokeDashoffset: [1, 0],
    delay: stagger(100, { start: 300 }),
    duration: 700,
    ease: 'outCubic',
  }))
}

onMounted(() => {
  if (props.clicks < at)
    reset()
})
onBeforeUnmount(stop)

watch(() => props.clicks >= at, (on) => {
  if (on)
    reveal()
  else
    reset()
})
</script>

<template>
  <div ref="root" class="stage">
    <svg class="links" viewBox="0 0 980 552" aria-hidden="true">
      <path class="link" pathLength="1" d="M 430 330 C 390 330, 380 340, 344 340" />
      <path class="link" pathLength="1" d="M 550 318 C 590 318, 596 262, 616 262" />
      <path class="link" pathLength="1" d="M 550 350 C 590 350, 596 430, 616 430" />
    </svg>

    <div class="hub">
      <div class="hub-tile">
        <img :src="airiLogo" alt="AIRI">
      </div>
      <div class="hub-name">
        AIRI
      </div>
      <div class="hub-role">
        companion · 陪伴
      </div>
    </div>

    <div
      v-for="g in groups"
      :key="g.id"
      class="group"
      :class="[`g-${g.id}`, `cols-${g.cols}`]"
    >
      <div class="group-head fade">
        <span class="group-title">{{ g.title }}</span>
        <span class="group-zh">{{ g.zh }}</span>
      </div>
      <div class="items">
        <div v-for="item in g.items" :key="item.name" class="item" :class="{ 'has-wordmark': item.wordmark }" :data-side="g.side">
          <img v-if="item.wordmark" :src="item.wordmark" :alt="item.name" class="wordmark">
          <div v-else class="logo">
            <img v-if="item.logo" :src="item.logo" alt="">
            <div v-else :class="item.icon" />
          </div>
          <div class="text">
            <div v-if="!item.wordmark" class="name">
              {{ item.name }}
            </div>
            <div class="role">
              {{ item.role }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  position: absolute;
  inset: 0;
  background: #1a1918;
  color: #f3f2f0;
  overflow: hidden;
}

.links {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.link {
  fill: none;
  stroke: rgb(243 242 240 / 30%);
  stroke-width: 1.5;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}

.hub {
  position: absolute;
  left: 490px;
  top: 340px;
  width: 0;
  height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hub > * {
  flex: none;
}

.hub-tile {
  width: 92px;
  height: 92px;
  border-radius: 26px;
  overflow: hidden;
  background: #5f5d6b;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 14px 40px rgb(0 0 0 / 45%);
  margin-top: -30px;
}

.hub-tile img {
  width: 100%;
  height: 100%;
  display: block;
}

.hub-name {
  margin-top: 10px;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
}

.hub-role {
  margin-top: 4px;
  font-size: 12px;
  color: rgb(243 242 240 / 66%);
  white-space: nowrap;
}

.group {
  position: absolute;
}

.g-play {
  left: 56px;
  top: 180px;
  width: 280px;
}

.g-agent {
  left: 628px;
  top: 180px;
  width: 300px;
}

.g-runtime {
  left: 628px;
  top: 362px;
  width: 300px;
}

.group-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgb(243 242 240 / 16%);
}

.group-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #f7db8f;
}

.group-zh {
  font-size: 12px;
  color: rgb(243 242 240 / 60%);
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', 'Noto Sans SC', sans-serif;
}

.items {
  display: grid;
  row-gap: 8px;
  column-gap: 14px;
}

.cols-2 .items {
  grid-template-columns: 1fr 1fr;
}

.item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  will-change: transform;
}

.logo {
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 20px;
}

.logo img {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

/* KSP's navy "SPACE PROGRAM" needs a light edge on the charcoal background. */
.wordmark[alt='Kerbal Space Program'] {
  filter: drop-shadow(0 0 1.5px rgb(255 255 255 / 85%));
}

/* Games show their own wordmark in place of an icon and a name. */
.wordmark {
  flex: none;
  height: 34px;
  width: 112px;
  object-fit: contain;
  object-position: left center;
}

.text {
  min-width: 0;
}

.name {
  font-size: 15.5px;
  font-weight: 700;
  line-height: 1.15;
  white-space: nowrap;
}

.role {
  font-size: 11.5px;
  line-height: 1.2;
  color: rgb(243 242 240 / 62%);
  white-space: nowrap;
}
</style>
