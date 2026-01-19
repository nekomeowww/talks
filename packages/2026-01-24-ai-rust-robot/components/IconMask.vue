<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: '1em',
  },
  label: {
    type: String,
    default: '',
  },
})

const sizeValue = computed(() => {
  if (typeof props.size === 'number')
    return `${props.size}px`
  return props.size
})
</script>

<template>
  <span
    class="icon-mask inline-block align-middle"
    :style="{
      width: sizeValue,
      height: sizeValue,
      backgroundColor: 'currentColor',
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
    }"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  />
</template>
