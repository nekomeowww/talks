<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

/**
 * The community avatar wall that drifts behind every slide.
 *
 * A sponsorkit-style avatar tile (see scripts/build-community-wall) is repeated
 * on a plane tilted like a slightly top-down camera, and the plane scrolls from
 * the bottom right to the top left forever.
 *
 * Frontmatter:
 * - wall: number - opacity of the wall on this slide (default 0: only slides that ask for it show the wall)
 */
const props = defineProps<{
  src: string
}>()

const { currentSlideRoute } = useNav()
const frontmatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
const opacity = computed(() => +(frontmatter.value.wall ?? 0))
</script>

<template>
  <div class="wall-viewport" :style="{ opacity }" aria-hidden="true">
    <div class="wall-plane" :style="{ backgroundImage: `url(${props.src})` }" />
  </div>
</template>

<style scoped>
.wall-viewport {
  position: absolute;
  inset: 0;
  z-index: -5;
  overflow: hidden;
  pointer-events: none;
  perspective: 1400px;
  perspective-origin: 50% 0%;
  transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  mask-image: radial-gradient(120% 90% at 60% 55%, black 30%, transparent 85%);
  -webkit-mask-image: radial-gradient(120% 90% at 60% 55%, black 30%, transparent 85%);
}

.wall-plane {
  position: absolute;
  left: -60%;
  top: -60%;
  width: 220%;
  height: 220%;
  background-size: 1600px auto;
  background-repeat: repeat;
  transform: rotateX(48deg) rotateZ(-18deg);
  transform-origin: 50% 50%;
  animation: wall-drift 90s linear infinite;
}

@keyframes wall-drift {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -1600px -911px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wall-plane {
    animation: none;
  }
}
</style>
