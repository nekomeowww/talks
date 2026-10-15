<script setup lang="ts">
import type { GameLayer } from './GameStack.vue'

import airicraft from '../public/games/airicraft.mp4'
import balatro from '../public/games/balatro.mp4'
import skylines from '../public/games/cities-skylines-2.jpg'
import domeKeeper from '../public/games/dome-keeper.mp4'
import factorio from '../public/games/factorio.mp4'
import ksp from '../public/games/ksp.mp4'
import mineflayer from '../public/games/minecraft-mineflayer.mp4'
import osu from '../public/games/osu.mp4'
import balatroLogo from '../public/logos/balatro.png'
import skylinesLogo from '../public/logos/cities-skylines-2-dark.png'
import domeKeeperLogo from '../public/logos/dome-keeper.png'
import fabricLogo from '../public/logos/fabric.png'
import factorioLogo from '../public/logos/factorio.png'
import kspLogo from '../public/logos/ksp.png'
import minecraftLogo from '../public/logos/minecraft.svg'
import osuLogo from '../public/logos/osu.webp'
import mineflayerLogo from '../public/logos/prismarinejs.svg'
import GameStack from './GameStack.vue'

defineProps<{
  clicks: number
}>()

const layers: GameLayer[] = [
  { title: 'Minecraft · Mineflayer', capability: 'open world', line: 'A bot on the network protocol. Our first step into a game.', zh: '2025 年初，AIRI 第一次进到游戏里', src: mineflayer, logos: [minecraftLogo, mineflayerLogo], accent: '#4FA35A' },
  { title: 'Factorio', capability: 'macro planning, code as policy', line: 'A mod lets the model write code. Miss one step and the whole plan stops.', zh: '配方、朝向、物流，少想一步，整段计划就跑不起来', src: factorio, logos: [factorioLogo], accent: '#CEAA5B' },
  { title: 'Balatro', capability: 'vision + strategy', line: 'You can read every card and still lose.', zh: '看清点数也不一定打得过纯随机的盲注呀', src: balatro, logos: [balatroLogo], logoScale: 2, accent: '#E87AA4' },
  { title: 'Kerbal Space Program', capability: 'planning & math with tools', line: 'Tools compute the orbits. The model plans the mission.', zh: '轨道交给工具去算，模型负责排任务', src: ksp, logos: [kspLogo], logoScale: 1.6, accent: '#6292BF' },
  { title: 'osu!', capability: 'high-frequency input', line: 'A ±20 ms hit window. Fast, precise input.', zh: '判定窗口只有正负 20 毫秒', src: osu, logos: [osuLogo], logoScale: 1.5, accent: '#F06BA8' },
  { title: 'Dome Keeper', capability: 'data from the engine', line: 'Play in Godot. The engine labels each frame for us.', zh: '在 Godot 里边玩边自动打标，先把数据攒起来', src: domeKeeper, logos: [domeKeeperLogo], logoScale: 1.6, accent: '#8C6BD8' },
  { title: 'Cities: Skylines II', capability: 'an in-game mayor with tools', line: 'AIRI Mayor: chat in the game, and a C# loop builds on the simulation thread.', zh: 'AIRI 当市长：在游戏里聊天，工具直接在模拟线程上建城', src: skylines, kind: 'image', logos: [skylinesLogo], accent: '#456E95' },
  { title: 'Minecraft · Airicraft', capability: 'System 1 + System 2', line: 'Back to the start: a companion inside the real client.', zh: '绕一圈回到起点：住在原版客户端里的 AI 伙伴', src: airicraft, logos: [minecraftLogo, fabricLogo], accent: '#285091' },
]
const finalZh = '每个游戏卡住我们的地方都不一样，\n但每次都多攒下一层'
</script>

<template>
  <GameStack
    :layers="layers"
    :clicks="clicks"
    final-title="Each game was hard in a new way"
    :final-zh="finalZh"
  />
</template>
