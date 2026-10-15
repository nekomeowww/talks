<script setup lang="ts">
import citiesLogo from '../public/logos/cities-skylines-2.png'
import domeLogo from '../public/logos/dome-keeper.png'
import factorioLogo from '../public/logos/factorio.png'
import kspLogo from '../public/logos/ksp.png'
import osuLogo from '../public/logos/osu.webp'

/**
 * Four games, four problems. Four identical columns (logo plate, problem,
 * one number, one line), revealed one per click.
 */
defineProps<{ clicks: number }>()

const games = [
  {
    logo: kspLogo,
    name: 'Kerbal Space Program',
    logoH: 54,
    problem: 'Planning & math',
    num: '<1%',
    numCap: 'of launches worked, early 2026',
    line: 'kRPC and MechJeb do the physics. The model runs the mission.',
    zh: '早期模型算不好轨道。物理交给工具，模型只管排任务。',
  },
  {
    logo: factorioLogo,
    name: 'Factorio',
    logoH: 30,
    problem: 'Macro planning & code',
    num: '1st',
    numCap: 'auto-labeling pipeline',
    line: 'A TypeScript → Lua mod. The model writes code over RCON.',
    zh: '模型通过 RCON 写代码。自动打标也是从这里开始的。',
  },
  {
    logo: osuLogo,
    name: 'osu!',
    logoH: 56,
    problem: 'High-frequency input',
    num: '4 ms',
    numCap: 'jitter · 47 of 48 plays SS',
    line: 'A ±20 ms hit window. A virtual pointer on Wayland, scheduled by deadline.',
    zh: '判定窗口只有 ±20 ms。虚拟指针按时间点调度，0 miss。',
  },
  {
    logo: domeLogo,
    name: 'Dome Keeper',
    logoH: 48,
    problem: 'Data from the engine',
    num: '0.995',
    numCap: 'mAP50 on ores, no hand labels',
    line: 'A Godot mod labels frames from the scene tree while you play.',
    zh: 'Godot mod 边玩边从场景树里打标，不用人工标注。',
  },
]
</script>

<template>
  <div class="og">
    <div class="cols">
      <div
        v-for="(g, i) in games"
        :key="g.name"
        class="col"
        :class="{ on: clicks > i }"
      >
        <div class="plate">
          <img :src="g.logo" :alt="g.name" :style="{ height: `${g.logoH}px` }">
        </div>
        <div class="problem">
          {{ g.problem }}
        </div>
        <div class="num">
          {{ g.num }}
        </div>
        <div class="num-cap">
          {{ g.numCap }}
        </div>
        <div class="line">
          {{ g.line }}
        </div>
        <div class="zh-line">
          {{ g.zh }}
        </div>
      </div>
    </div>

    <div class="also" :class="{ on: clicks >= 4 }">
      <span class="also-label">Also in progress</span>
      <span class="mini-plate"><img :src="citiesLogo" alt="Cities: Skylines II"></span>
      <span class="also-sep">·</span>
      <span class="also-text">Helldivers 2 co-play</span>
      <span class="also-zh">也在做：城市：天际线 2、绝地潜兵 2 联机</span>
    </div>
  </div>
</template>

<style scoped>
.og {
  margin-top: 22px;
}

.cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.col {
  display: flex;
  flex-direction: column;
  min-width: 0;
  opacity: 0;
  transition: opacity 480ms var(--ease-smooth-out);
}

.col.on {
  opacity: 1;
}

.plate {
  height: 84px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f8fb;
  border: 1px solid rgb(10 37 64 / 6%);
  box-shadow: 0 8px 22px rgb(10 37 64 / 8%);
}

.plate img {
  max-width: 82%;
  object-fit: contain;
}

.problem {
  margin-top: 16px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #456e95;
}

.num {
  margin-top: 6px;
  font-size: 38px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  color: #285091;
}

.num-cap {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
}

.line {
  margin-top: 10px;
  font-size: 12.5px;
  line-height: 1.4;
  color: var(--ink-muted);
}

.zh-line {
  margin-top: 6px;
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', 'Noto Sans SC', sans-serif;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--ink-muted);
}

.also {
  margin-top: 26px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--ink-muted);
  opacity: 0;
  transition: opacity 450ms var(--ease-smooth-out) 300ms;
}

.also.on {
  opacity: 1;
}

.also-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.mini-plate {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  border-radius: 10px;
  /* the Cities: Skylines II wordmark is white, so this chip stays dark */
  background: #293655;
}

.mini-plate img {
  height: 20px;
}

.also-sep {
  opacity: 0.5;
}

.also-text {
  font-weight: 700;
  color: var(--ink);
}

.also-zh {
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', 'Noto Sans SC', sans-serif;
  font-size: 11.5px;
}
</style>
