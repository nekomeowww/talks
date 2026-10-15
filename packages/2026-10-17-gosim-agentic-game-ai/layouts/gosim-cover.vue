<script setup lang="ts">
import background from '../public/gosim/bg-cover.jpg'
import dateStrip from '../public/gosim/date-white.png'
import logoWhite from '../public/gosim/logo-white.png'

// Title slide from the GOSIM 2026 template ("标题幻灯片").
</script>

<template>
  <div class="slidev-layout gosim-dark" :style="{ backgroundImage: `url(${background})` }">
    <img :src="logoWhite" class="gosim-cover-logo" alt="GOSIM">
    <div class="gosim-cover-body">
      <slot />
      <img :src="dateStrip" class="gosim-cover-date" alt="October 16–17, 2026 Shenzhen, China">
    </div>
  </div>
</template>
