<script setup lang="ts">
import type { Tile } from './TileWall.vue'

import alphago from '../public/history/alphago-lee-sedol-game4.jpg'
import alphastar from '../public/history/alphastar-sc2-vs-tlo.jpg'
import atari from '../public/history/atari-2600.jpg'
import dota from '../public/history/dota2-the-international.jpg'
import factorio from '../public/history/factorio-space-age.jpg'
import minecraft from '../public/history/minecraft-gameplay.jpg'
import nethack from '../public/history/nethack-ascension.png'
import nitrogen from '../public/history/nitrogen-overview.webp'
import sima from '../public/history/sima2-hero.jpg'
import voyager from '../public/history/voyager-components.png'
import TileWall from './TileWall.vue'

// Sources: see the speaker notes of slide B1.
defineProps<{
  clicks: number
}>()

// World layout: a loose brick pattern growing around the first screen.
// Columns are 520 px apart, rows 300 px; odd rows shift by half a column.
const tiles: Tile[] = [
  // Milestones, one per click.
  { id: 'dqn', label: 'DQN · Atari', at: 0, x: 0, y: 0, r: 0, year: '2013–15', org: 'DeepMind', title: 'DQN: one network, 49 Atari games', zh: '只看画面和分数，同一套参数学会 49 款雅达利游戏', src: atari },
  { id: 'gym', label: 'Gym · reset / step', at: 1, x: 522, y: -8, r: 1, year: '2016', org: 'OpenAI', title: 'Gym: reset() → step() → reward', zh: '后来的智能体，基本都活在这个循环里', icon: 'i-ph:arrows-clockwise-bold', tint: '#456E95' },
  { id: 'alphago', label: 'AlphaGo 4–1 Lee Sedol', at: 2, x: 262, y: 304, r: -1, year: '2016', org: 'DeepMind', title: 'AlphaGo beats Lee Sedol 4–1', zh: '下得比人好，但它只会下围棋', src: alphago },
  { id: 'alphastar', label: 'AlphaStar · SC2', at: 3, x: -258, y: 298, r: 0.8, year: '2019', org: 'DeepMind', title: 'AlphaStar: Grandmaster in StarCraft II', zh: '天梯排名超过 99.8% 的玩家', src: alphastar },
  { id: 'five', label: 'OpenAI Five · Dota 2', at: 4, x: -520, y: 6, r: -0.8, year: '2019', org: 'OpenAI', title: 'OpenAI Five beats the Dota 2 world champions', zh: '开放给全网挑战：7,215 胜，42 负', src: dota },
  { id: 'vpt', label: 'VPT · diamond pickaxe', at: 5, x: -262, y: -300, r: 1, year: '2022', org: 'OpenAI', title: 'VPT: 70,000 hours of video → a diamond pickaxe', zh: '看人玩的视频学按键，第一次做出钻石镐', src: minecraft },
  { id: 'voyager', label: 'Voyager · skills', at: 6, x: 258, y: -304, r: -1, year: '2023', org: 'NVIDIA et al.', title: 'Voyager: skills written as code', zh: '大模型不按键了，改成写代码，攒出一个技能库', src: voyager },
  { id: 'sima', label: 'SIMA 2 · 3D games', at: 7, x: 780, y: -296, r: 0.6, year: '2024–25', org: 'Google DeepMind', title: 'SIMA → SIMA 2: one agent, many 3D games', zh: '只看屏幕、只用键鼠，没玩过的游戏也能上手', src: sima },
  { id: 'p2p', label: 'Open P2P', at: 8, x: 782, y: 302, r: -0.6, year: '2026', org: 'Player2 · Elefant AI', title: 'Open P2P: an open model that plays in real time', zh: '8,300 多小时人类游玩数据，模型用 MIT 协议开源', icon: 'i-ph:game-controller-bold', tint: '#E87AA4' },

  // Hidden corners of the world: faint hints first, revealed on the last click.
  { id: 'fle', label: 'Factorio Learning Env.', hint: 6, x: -1040, y: -4, r: 0.8, year: '2025', title: 'Factorio Learning Environment', src: factorio },
  { id: 'balrog', label: 'BALROG · NetHack', hint: 6, x: -780, y: 302, r: -1, year: '2024', title: 'BALROG: NetHack, still nearly unsolved', src: nethack },
  { id: 'codeact', label: 'CodeAct · code actions', hint: 7, x: -782, y: -302, r: 1, year: '2024', title: 'CodeAct: actions as code', icon: 'i-ph:code-bold', tint: '#293655' },
  { id: 'nitrogen', label: 'NitroGen · 1k+ games', hint: 7, x: 1042, y: 4, r: -0.8, year: '2026', title: 'NitroGen: 40k hours, 1,000+ games', src: nitrogen },
  { id: 'genie', label: 'Genie 3 · world model', hint: 8, x: 2, y: -604, r: -0.6, year: '2025', title: 'Genie 3: playable worlds, 720p 24 fps', icon: 'i-ph:globe-hemisphere-east-bold', tint: '#6292BF' },
  { id: 'lumine', label: 'Lumine · Genshin', hint: 8, x: 520, y: -600, r: 0.8, year: '2025', title: 'Lumine: 5 hours of Genshin story', icon: 'i-ph:sparkle-bold', tint: '#CEAA5B' },
  { id: 'pokeblue', label: 'Gemini · Pokémon Blue', hint: 8, x: -520, y: 600, r: 0.6, year: '2025', title: 'Gemini 2.5 Pro finishes Pokémon Blue', icon: 'i-ph:lightning-bold', tint: '#456E95' },
  { id: 'pokered', label: 'Claude · Pokémon Red', hint: 8, x: 0, y: 604, r: -0.8, year: '2026', title: 'Claude finishes Pokémon Red', icon: 'i-ph:lightning-bold', tint: '#E87AA4' },
]
</script>

<template>
  <TileWall :tiles="tiles" :clicks="clicks" :overview-at="9" />
</template>
