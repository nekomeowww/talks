<script setup lang="ts">
import logoWhite from '../public/gosim/logo-white.png'

// Full-bleed video slide. Not part of the .pptx template; it keeps the GOSIM
// logo so recorded footage still reads as part of the deck. Put the <video>
// in the slide body (so Vite resolves its src) and the caption in ::caption::.
</script>

<template>
  <div class="slidev-layout gosim-video">
    <slot />
    <div class="gosim-video-caption">
      <slot name="caption" />
    </div>
    <img :src="logoWhite" class="gosim-video-logo" alt="GOSIM">
  </div>
</template>
