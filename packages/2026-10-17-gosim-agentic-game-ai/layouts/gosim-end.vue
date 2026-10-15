<script setup lang="ts">
import background from '../public/gosim/bg-cover.jpg'
import logoWhite from '../public/gosim/logo-white.png'
import wordmark from '../public/gosim/wordmark-gradient.png'

// Closing slide from the GOSIM 2026 template ("1_标题幻灯片", "Thanks!").
</script>

<template>
  <div class="slidev-layout gosim-dark" :style="{ backgroundImage: `url(${background})` }">
    <img :src="logoWhite" class="gosim-top-logo" alt="GOSIM">
    <img :src="wordmark" class="gosim-top-wordmark" alt="GOSIM Shenzhen 2026">
    <div class="gosim-end-body">
      <slot />
    </div>
  </div>
</template>
