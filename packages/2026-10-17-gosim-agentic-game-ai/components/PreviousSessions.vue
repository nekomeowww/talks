<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { animate, stagger } from 'animejs'
import { onMounted, useTemplateRef, watch } from 'vue'

import cover2605Qr from '../public/opening/cover-2026-05-qr.png'
import cover2605 from '../public/opening/cover-2026-05.webp'
import cover2607Qr from '../public/opening/cover-2026-07-qr.png'
import cover2607 from '../public/opening/cover-2026-07.webp'
import s1Qr from '../public/opening/session-1-qr.png'
import s1 from '../public/opening/session-1.webp'
import s2Qr from '../public/opening/session-2-qr.png'
import s2 from '../public/opening/session-2.webp'
import s3Qr from '../public/opening/session-3-qr.png'
import s3 from '../public/opening/session-3.webp'
import s4Poster from '../public/opening/session-4-poster.webp'
import s4Qr from '../public/opening/session-4-qr.png'
import s4Video from '../public/opening/session-4.mp4'

/**
 * A2b: the earlier talks, as a 3x2 wall of covers. Hovering a cover shows
 * its QR code (same as the "The previous ones" slide of the May 2026 talk).
 * Covers fade in one by one when the slide is entered and fade out when it
 * is left; in export/overview they render settled.
 */
interface Session {
  cover: string
  video?: string
  qr: string
  when: string
  where: string
}

const sessions: Session[] = [
  { cover: s2, qr: s2Qr, when: '2025.05', where: 'Hangzhou' },
  { cover: s1, qr: s1Qr, when: '2025.06', where: 'KubeCon Hong Kong' },
  { cover: s3, qr: s3Qr, when: '2025.10', where: 'Fudan University' },
  { cover: s4Poster, video: s4Video, qr: s4Qr, when: '2026.01', where: 'Shanghai × Kong' },
  { cover: cover2605, qr: cover2605Qr, when: '2026.05', where: 'Shanghai' },
  { cover: cover2607, qr: cover2607Qr, when: '2026.07', where: 'Vue + ViteConf' },
]

const tiles = useTemplateRef<HTMLElement[]>('tiles')
const isActive = useIsSlideActive()
const { $renderContext } = useSlideContext()

function settle() {
  for (const el of tiles.value ?? [])
    el.style.opacity = '1'
}

function play() {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduced || $renderContext.value !== 'slide') {
    settle()
    return
  }
  animate(tiles.value ?? [], {
    opacity: [0, 1],
    duration: 500,
    delay: stagger(140, { start: 200 }),
    ease: 'out(2)',
  })
}

function leave() {
  animate(tiles.value ?? [], {
    opacity: 0,
    duration: 300,
    ease: 'out(2)',
  })
}

onMounted(() => {
  if (isActive.value)
    play()
  else
    settle()
})
watch(isActive, (on) => {
  if (on)
    play()
  else
    leave()
})
</script>

<template>
  <div class="wall">
    <div v-for="s in sessions" :key="s.when" ref="tiles" class="tile">
      <div class="shot">
        <video v-if="s.video" class="img" :src="s.video" :poster="s.cover" autoplay muted loop playsinline />
        <img v-else class="img" :src="s.cover" alt="">
        <img class="qr" :src="s.qr" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.wall {
  display: grid;
  grid-template-columns: repeat(3, 290px);
  gap: 26px 26px;
  justify-content: center;
}

.tile {
  opacity: 0;
}

.shot {
  position: relative;
  width: 290px;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 14px 30px rgb(10 37 64 / 22%);
  cursor: pointer;
}

.img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.25s ease, filter 0.25s ease;
}

.qr {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 92%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.shot:hover .img {
  opacity: 0.35;
  filter: grayscale(1);
}

.shot:hover .qr {
  opacity: 1;
}
</style>
