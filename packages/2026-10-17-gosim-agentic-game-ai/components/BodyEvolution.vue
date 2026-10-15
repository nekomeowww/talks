<script setup lang="ts">
import airiLogo from '../public/logos/airi-white.svg'
import fabricLogo from '../public/logos/fabric.png'
import prismarineLogo from '../public/logos/prismarinejs.svg'

/**
 * Mineflayer -> Fabric + Baritone -> our own navigation and control.
 * Three stations on one road; each click draws the road to the next station
 * and pops its logo in. Station 3 carries the result numbers.
 */
defineProps<{ clicks: number }>()
</script>

<template>
  <div class="be">
    <svg class="road" viewBox="0 0 868 20" preserveAspectRatio="none">
      <line class="track" x1="133" y1="10" x2="735" y2="10" />
      <line class="seg" :class="{ on: clicks >= 2 }" x1="133" y1="10" x2="434" y2="10" pathLength="1" />
      <line class="seg" :class="{ on: clicks >= 3 }" x1="434" y1="10" x2="735" y2="10" pathLength="1" />
    </svg>

    <div class="stations">
      <!-- 1 -->
      <div class="st" :class="{ on: clicks >= 1 }">
        <div class="logos">
          <div class="logo">
            <img :src="prismarineLogo" alt="PrismarineJS">
          </div>
        </div>
        <div class="when">
          2025
        </div>
        <div class="name">
          Mineflayer bot
        </div>
        <div class="by">
          PrismarineJS
        </div>
        <div class="line">
          A bot on the network protocol. Mods, pathfinding and spatial reasoning often broke.
        </div>
        <div class="zh-s">
          在协议层假装成玩家，遇到 mod、寻路和空间推理就频频出问题。
        </div>
      </div>

      <!-- 2 -->
      <div class="st" :class="{ on: clicks >= 2 }">
        <div class="logos">
          <div class="logo">
            <img :src="fabricLogo" alt="Fabric" class="pixel">
          </div>
          <span class="plus">+</span>
          <div class="logo word">
            <div class="i-ph:path-bold word-icon" />
            <span>Baritone</span>
          </div>
        </div>
        <div class="when">
          Mar 2026
        </div>
        <div class="name">
          Fabric mod + Baritone
        </div>
        <div class="by">
          FabricMC · cabaletta/baritone
        </div>
        <div class="line">
          The agent uses a real client, so modded servers work. Baritone does the walking.
        </div>
        <div class="zh-s">
          AI 直接用真正的客户端，服务器装了 mod 也照常进。寻路先交给 Baritone。
        </div>
      </div>

      <!-- 3 -->
      <div class="st hero" :class="{ on: clicks >= 3 }">
        <div class="logos">
          <div class="logo airi">
            <img :src="airiLogo" alt="Project AIRI" class="tile">
          </div>
        </div>
        <div class="when">
          Sep 2026
        </div>
        <div class="name">
          Our own body
        </div>
        <div class="by">
          Airicraft · navigation & control
        </div>
        <div class="stats">
          <div><b>60 / 60</b> arrivals, same as Baritone</div>
          <div><b>0.93×</b> its time, on 12 courses</div>
        </div>
        <div class="zh-s">
          寻路和控制都自己写：每个按键只有一个主人。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.be {
  position: relative;
  margin-top: 30px;
}

.road {
  position: absolute;
  left: 0;
  top: 40px;
  width: 100%;
  height: 20px;
  overflow: visible;
}

.track {
  stroke: rgb(10 37 64 / 8%);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 2 10;
  vector-effect: non-scaling-stroke;
}

.seg {
  stroke: #6292bf;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  vector-effect: non-scaling-stroke;
  transition: stroke-dashoffset 800ms var(--ease-smooth-out);
}

.seg.on {
  stroke-dashoffset: 0;
}

.stations {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 34px;
}

.st {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  transition: opacity 480ms var(--ease-smooth-out) 250ms;
}

.st.on {
  opacity: 1;
}

.logos {
  height: 100px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 92px;
  height: 92px;
  border-radius: 24px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 14px 30px rgb(10 37 64 / 14%),
    0 2px 6px rgb(10 37 64 / 8%);
}

.logo img {
  width: 76%;
  height: 76%;
  object-fit: contain;
}

.logo.airi {
  background: #fff;
}

.logo img.tile {
  width: 80%;
  height: 80%;
  border-radius: 20px;
}

.logo img.pixel {
  image-rendering: pixelated;
}

.logo.word {
  flex-direction: column;
  gap: 4px;
  background: #1e2b3c;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.word-icon {
  font-size: 30px;
  color: #91d2dd;
}

.plus {
  font-size: 20px;
  font-weight: 700;
  color: rgb(10 37 64 / 35%);
}

.hero .logo {
  width: 100px;
  height: 100px;
  border-radius: 26px;
  box-shadow:
    0 0 0 4px rgb(98 146 191 / 35%),
    0 16px 34px rgb(40 80 145 / 24%);
}

.when {
  margin-top: 14px;
  padding: 2px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: rgb(255 255 255 / 75%);
  border: 1px solid rgb(10 37 64 / 8%);
}

.hero .when {
  color: #fff;
  background: #285091;
  border-color: transparent;
}

.name {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.15;
}

.by {
  margin-top: 2px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #456e95;
}

.line {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.42;
  color: var(--ink-muted);
}

.stats {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--ink-muted);
}

.stats b {
  font-size: 17px;
  color: var(--ink);
}

.zh-s {
  margin-top: 6px;
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', 'Noto Sans SC', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: var(--ink-muted);
}
</style>
