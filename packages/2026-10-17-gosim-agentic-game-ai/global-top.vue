<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

import logoDark from './public/gosim/logo-dark.png'

// A small GOSIM mark on every slide. Frontmatter `chrome: false` hides it
// (cover, full-bleed video, closing slides).
const { currentSlideRoute } = useNav()
const visible = computed(() => ((currentSlideRoute.value.meta?.slide as any)?.frontmatter?.chrome ?? true) !== false)
</script>

<template>
  <Transition name="chrome">
    <img v-if="visible" :src="logoDark" class="gosim-chrome" alt="GOSIM">
  </Transition>
</template>

<style scoped>
.gosim-chrome {
  position: absolute;
  right: 28px;
  bottom: 20px;
  width: 64px;
  opacity: 0.55;
  pointer-events: none;
}

.chrome-enter-active,
.chrome-leave-active {
  transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.chrome-enter-from,
.chrome-leave-to {
  opacity: 0;
}
</style>
