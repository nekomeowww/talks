<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

/**
 * E5b: one scenario env, several policies in parallel isolated clients;
 * what is still missing before it is a real RL environment; and the three
 * layers of data a Play already records.
 *
 * Click 0: one environment and the three backends it can run. Click 1: what
 * is missing. Click 2: the data layers. Every state is static once settled.
 */
const props = defineProps<{
  clicks: number
}>()

const lanes = [
  { icon: 'i-ph:plugs-connected-bold', name: 'OpenAI-compatible', models: 'DeepSeek · Qwen · GLM · Nemotron' },
  { icon: 'i-ph:asterisk-bold', name: 'Anthropic', models: 'Messages API' },
  { icon: 'i-ph:terminal-window-bold', name: 'Codex', models: 'app-server' },
]

const missing = [
  { en: 'Dense reward', zh: '过程奖励，不只看终点' },
  { en: 'A step() API', zh: '一步一步可控的接口' },
  { en: 'Dataset exporter', zh: '把录制导成数据集' },
  { en: 'A cross-model leaderboard', zh: '每个模型都跑够次数' },
]

const layers = [
  { en: 'Planner traces', zh: '规划轨迹', who: 'tool-using LLMs' },
  { en: '20 Hz actions', zh: '每 tick 的按键和视角', who: 'action models' },
  { en: 'What it could see', zh: '它当时真能看到什么', who: 'perception' },
]

const instant = ref(false)
watch(() => props.clicks, async (n, o) => {
  if (Math.abs(n - (o ?? 0)) > 1) {
    instant.value = true
    await nextTick()
    requestAnimationFrame(() => requestAnimationFrame(() => (instant.value = false)))
  }
})
</script>

<template>
  <div class="pl" :class="{ instant }">
    <div class="top on">
      <div class="env">
        <div i-twemoji:pick class="env-i" />
        <div class="env-t">
          iron-pickaxe
        </div>
        <div class="env-z">
          同一个环境
        </div>
      </div>
      <svg class="fan" width="70" height="150" viewBox="0 0 70 150">
        <path d="M0 75 C 35 75, 35 22, 70 22" />
        <path d="M0 75 L 70 75" />
        <path d="M0 75 C 35 75, 35 128, 70 128" />
      </svg>
      <div class="lanes">
        <div v-for="(l, i) in lanes" :key="l.name" class="lane">
          <div :class="l.icon" class="lane-i" />
          <div class="lane-name">
            <div class="ln">
              {{ l.name }}
            </div>
            <div class="lm">
              {{ l.models }}
            </div>
          </div>
        </div>
        <div class="lanes-cap">
          Swap the model. Keep the same world and the same checks.
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="missing" :class="{ on: clicks >= 1 }">
        <div class="h">
          <div i-ph:circle-dashed-bold class="h-i rose" /> Not there yet <span class="h-z">还没有的</span>
        </div>
        <div class="miss-grid">
          <div v-for="(m, i) in missing" :key="m.en" class="miss" :style="{ transitionDelay: clicks >= 1 ? `${i * 90}ms` : '0ms' }">
            <div class="me">
              {{ m.en }}
            </div>
            <div class="mz">
              {{ m.zh }}
            </div>
          </div>
        </div>
      </div>

      <div class="layers" :class="{ on: clicks >= 2 }">
        <div class="h">
          <div i-ph:stack-bold class="h-i blue" /> Data, three layers <span class="h-z">数据分三层</span>
        </div>
        <div v-for="(d, i) in layers" :key="d.en" class="layer" :style="{ transitionDelay: clicks >= 2 ? `${i * 110}ms` : '0ms' }">
          <span class="le">{{ d.en }}</span>
          <span class="lz">{{ d.zh }}</span>
          <span class="lw">→ {{ d.who }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pl {
  width: 868px;
}

.instant,
.instant * {
  transition: none !important;
}

.top {
  display: grid;
  grid-template-columns: 150px 70px 1fr;
  align-items: center;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 450ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 450ms ease;
}

.top.on {
  opacity: 1;
  filter: none;
  transform: none;
}

.env {
  height: 118px;
  border-radius: 20px;
  background: #0a2540;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 14px 32px rgb(10 37 64 / 22%);
}

.env-i {
  font-size: 34px;
}

.env-t {
  margin-top: 6px;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 14px;
  font-weight: 700;
}

.env-z {
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 11.5px;
  color: rgb(255 255 255 / 70%);
}

.fan path {
  fill: none;
  stroke: rgb(69 110 149 / 55%);
  stroke-width: 2;
  stroke-dasharray: 4 5;
}

.lanes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lane {
  height: 44px;
  display: grid;
  grid-template-columns: 26px 230px 1fr 64px;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border-radius: 14px;
  background: rgb(255 255 255 / 75%);
  box-shadow: 0 6px 16px rgb(10 37 64 / 7%);
  opacity: 0;
  transform: translateX(-12px);
  transition:
    opacity 400ms ease,
    transform 550ms cubic-bezier(0.22, 1, 0.36, 1);
}

.top.on .lane {
  opacity: 1;
  transform: none;
}

.lane-i {
  font-size: 20px;
  color: #456e95;
}

.ln {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.15;
}

.lm {
  font-size: 11px;
  color: rgb(10 37 64 / 55%);
}

.run {
  position: relative;
  height: 6px;
  border-radius: 99px;
  background: rgb(10 37 64 / 8%);
  overflow: hidden;
}

.cursor {
  position: absolute;
  inset: 0 auto 0 0;
  width: 100%;
  border-radius: 99px;
  background: #6292bf;
  transform-origin: left;
  transform: scaleX(0);
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.cursor.done {
  transform: scaleX(1);
}

.client {
  font-size: 11px;
  font-weight: 700;
  color: rgb(10 37 64 / 45%);
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.lanes-cap {
  margin-top: 2px;
  padding-left: 14px;
  font-size: 11.5px;
  color: rgb(10 37 64 / 55%);
}

.lanes-cap code {
  font-size: 11px;
}

.bottom {
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
}

.missing,
.layers {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 450ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 450ms ease;
}

.missing.on,
.layers.on {
  opacity: 1;
  filter: none;
  transform: none;
}

.h {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
}

.h-z {
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: rgb(10 37 64 / 55%);
}

.h-i {
  font-size: 18px;
}

.h-i.rose {
  color: #e87aa4;
}

.h-i.blue {
  color: #456e95;
}

.miss-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.miss {
  height: 52px;
  padding: 0 12px;
  border-radius: 14px;
  border: 1.5px dashed rgb(232 122 164 / 60%);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.me {
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.mz {
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 11px;
  color: rgb(10 37 64 / 55%);
}

.layer {
  height: 34px;
  display: grid;
  grid-template-columns: 136px 1fr auto;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgb(10 37 64 / 9%);
}

.layer:last-child {
  border-bottom: none;
}

.le {
  font-size: 14px;
  font-weight: 700;
}

.lz {
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 12px;
  color: rgb(10 37 64 / 60%);
}

.lw {
  font-size: 12px;
  font-weight: 700;
  color: #456e95;
}

@media (prefers-reduced-motion: reduce) {
  .cursor,
  .fan path {
    animation: none !important;
  }
}
</style>
