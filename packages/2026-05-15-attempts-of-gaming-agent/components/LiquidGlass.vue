<script setup lang="ts">
import { computed } from 'vue'

import { Refractive } from './liquid-glass'

const props = withDefaults(defineProps<{
  as?: string
  glow?: 'pink' | 'cyan' | 'amber' | 'neutral'
  radius?: number
}>(), {
  as: 'div',
  glow: 'neutral',
  radius: 18,
})

const refraction = computed(() => ({
  radius: props.radius,
  blur: 6,
  glassThickness: 70,
  bezelWidth: 8,
  refractiveIndex: 1.5,
  specularOpacity: 0.25,
  specularAngle: Math.PI / 4,
}))
</script>

<template>
  <Refractive
    :as="as"
    class="liquid-glass"
    :class="`liquid-glass-${glow}`"
    :refraction="refraction"
    :style="{
      borderRadius: `${radius}px`,
      background: 'rgb(255 255 255 / 0.12)',
      border: '1px solid rgb(255 255 255 / 0.1)',
    }"
  >
    <slot />
  </Refractive>
</template>

<style scoped>
.liquid-glass {
  position: relative;
  overflow: hidden;
  background: rgb(255 255 255 / 12%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 28%),
    inset 0 -1px 0 rgb(255 255 255 / 22%),
    0 24px 80px rgb(0 0 0 / 28%);
}

.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 18%), transparent 42%),
    radial-gradient(circle at 18% 8%, rgb(255 255 255 / 30%), transparent 34%);
  opacity: 0.72;
}

.liquid-glass::after {
  content: '';
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 0;
  height: 44%;
  pointer-events: none;
  border-radius: 999px 999px 0 0;
  background:
    radial-gradient(85% 115% at 50% 100%, rgb(255 255 255 / 40%), transparent 62%),
    linear-gradient(180deg, transparent, rgb(255 255 255 / 22%));
  filter: blur(8px);
  opacity: 0.82;
  transform: translateY(40%);
}

.liquid-glass-pink {
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 28%),
    inset 0 -1px 0 rgb(255 255 255 / 18%),
    0 24px 80px rgb(236 72 153 / 16%);
}

.liquid-glass-cyan {
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 28%),
    inset 0 -1px 0 rgb(255 255 255 / 18%),
    0 24px 80px rgb(34 211 238 / 16%);
}

.liquid-glass-amber {
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 28%),
    inset 0 -1px 0 rgb(255 255 255 / 18%),
    0 24px 80px rgb(245 158 11 / 16%);
}
</style>
