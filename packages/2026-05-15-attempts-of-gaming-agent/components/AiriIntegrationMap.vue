<script setup lang="ts">
import { computed } from 'vue'

interface GameNode {
  key: string
  click: number
  className: string
  image: string
  icon: string
  label: string
  x: number
  y: number
}

interface IntegrationLine {
  click: number
  d: string
}

const props = defineProps<{
  clicks: number
}>()

const card = {
  width: 174,
  height: 98,
}

const source = {
  x: 500,
  y: 410,
}

const games: GameNode[] = [
  {
    key: 'minecraft',
    click: 1,
    className: 'minecraft',
    image: '/game-banners/minecraft-banner.png',
    icon: 'i-carbon:cube',
    label: 'Minecraft',
    x: 48,
    y: 212,
  },
  {
    key: 'factorio',
    click: 2,
    className: 'factorio',
    image: '/game-banners/factorio-banner.png',
    icon: 'i-carbon:industry',
    label: 'Factorio',
    x: 230,
    y: 144,
  },
  {
    key: 'balatro',
    click: 3,
    className: 'balatro',
    image: '/game-banners/balatro-cover.png',
    icon: 'i-carbon:game-console',
    label: 'Balatro',
    x: 430,
    y: 136,
  },
  {
    key: 'dome',
    click: 4,
    className: 'dome',
    image: '/game-banners/dome-keeper-cover.png',
    icon: 'i-carbon:search-locate',
    label: 'Dome Keeper',
    x: 632,
    y: 168,
  },
  {
    key: 'ksp',
    click: 5,
    className: 'ksp',
    image: '/game-banners/ksp-banner.png',
    icon: 'i-carbon:rocket',
    label: 'KSP',
    x: 694,
    y: 306,
  },
]

function lineTo(game: GameNode): IntegrationLine {
  const target = {
    x: game.x + card.width / 2,
    y: game.y + card.height * 0.68,
  }
  const dx = target.x - source.x
  const lift = 86 + Math.abs(dx) * 0.13
  const c1 = {
    x: source.x + dx * 0.26,
    y: source.y - lift,
  }
  const c2 = {
    x: source.x + dx * 0.72,
    y: target.y + 54,
  }

  return {
    click: game.click,
    d: `M${source.x} ${source.y} C${Math.round(c1.x)} ${Math.round(c1.y)} ${Math.round(c2.x)} ${Math.round(c2.y)} ${Math.round(target.x)} ${Math.round(target.y)}`,
  }
}

const visibleLines = computed(() =>
  games.map(lineTo).map(line => ({
    ...line,
    visible: props.clicks >= line.click,
  })),
)

const visibleGames = computed(() =>
  games.map(game => ({
    ...game,
    visible: props.clicks >= game.click,
  })),
)
</script>

<template>
  <div class="slide-canvas airi-integrations">
    <svg class="integration-lines" viewBox="0 0 1000 560" aria-hidden="true">
      <path
        v-for="line in visibleLines"
        :key="line.click"
        :class="line.visible ? 'is-visible' : ''"
        :d="line.d"
      />
    </svg>

    <div class="integration-heading">
      <div text-3xl font-bold>
        AIRI as the container
      </div>
      <div mt-2 text-sm text="white/55">
        不同游戏不是孤立 demo，而是在测试 AIRI 要怎么接入世界。
      </div>
    </div>

    <div
      v-for="game in visibleGames"
      :key="game.key"
    class="game-card"
      :class="[game.className, game.visible ? 'is-visible' : '']"
      :style="{ left: `${game.x}px`, top: `${game.y}px` }"
    >
      <img :src="game.image">
      <div><div :class="game.icon" /> {{ game.label }}</div>
    </div>

    <div class="airi-core">
      <img src="/proj-airi-logo.svg">
      <div>
        <div text-2xl font-semibold>
          Project AIRI
        </div>
        <div text="white/50" text-sm>
          memory / character / senses / tools
        </div>
      </div>
    </div>
  </div>
</template>
