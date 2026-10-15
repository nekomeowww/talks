<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { animate, stagger } from 'animejs'

import liuziheng from '../public/team/3361559784.png'
import kwaa from '../public/team/kwaa.png'
import lemonNeko from '../public/team/LemonNekoGH.png'
import lulu from '../public/team/lulu0119.png'
import rainbowBird from '../public/team/luoling8192.png'
import makito from '../public/team/sumimakito.png'

/**
 * The rest of the team behind AIRI and the projects in this talk (the speaker
 * and Rin are introduced at the start). Avatars are local
 * copies of the GitHub avatars so the slide works offline.
 */
const people = [
  { name: '藍+85CD', login: 'kwaa', role: 'Agent infra', avatar: kwaa },
  { name: 'RainbowBird', login: 'luoling8192', role: 'Product', avatar: rainbowBird },
  { name: 'LemonNeko', login: 'LemonNekoGH', role: 'Dome Keeper, Factorio', avatar: lemonNeko },
  { name: 'Makito', login: 'sumimakito', role: 'Pipelines', avatar: makito },
  { name: 'Lulu', login: 'lulu0119', role: 'AIRI Mayor', avatar: lulu },
  { name: '刘梓恒', login: '3361559784', role: 'AUV', avatar: liuziheng },
]

const root = useTemplateRef<HTMLElement>('root')

// The deck's blurred fade-in, one person after another.
onMounted(() => {
  if (!root.value || matchMedia('(prefers-reduced-motion: reduce)').matches)
    return
  animate(root.value.querySelectorAll('.person'), {
    opacity: [0, 1],
    filter: ['blur(6px)', 'blur(0px)'],
    translateY: [16, 0],
    delay: stagger(80, { start: 250 }),
    duration: 600,
    ease: 'out(3)',
  })
})
</script>

<template>
  <div ref="root" class="team">
    <div v-for="p in people" :key="p.login" class="person">
      <img :src="p.avatar" :alt="p.name">
      <div class="name">
        {{ p.name }}
      </div>
      <div class="login">
        <span class="i-ri:github-fill" />{{ p.login }}
      </div>
      <div class="role">
        {{ p.role }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.team {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20px;
  column-gap: 8px;
  max-width: 600px;
  margin: 0 auto;
}

.person {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.person img {
  width: 92px;
  height: 92px;
  border-radius: 999px;
  object-fit: cover;
  box-shadow: 0 8px 22px rgb(10 37 64 / 12%);
}

.name {
  margin-top: 10px;
  font-size: 17px;
  font-weight: 700;
}

.login {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  color: rgb(10 37 64 / 55%);
}

.role {
  margin-top: 2px;
  font-size: 13px;
  color: #285091;
}
</style>
