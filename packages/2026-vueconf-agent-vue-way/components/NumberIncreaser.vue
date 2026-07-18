<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { animate, utils } from 'animejs'
import { computed, onMounted, onUnmounted, shallowRef, useTemplateRef, watch } from 'vue'

type NumberIncreaserTrigger = 'slide' | 'enter' | 'visible' | 'visibleOnce'

const props = withDefaults(defineProps<{
  value: number
  from?: number
  duration?: number
  ease?: string
  locale?: string
  className?: string
  trigger?: NumberIncreaserTrigger
  rootMargin?: string
  threshold?: number
}>(), {
  from: 0,
  duration: 900,
  ease: 'out(4)',
  locale: 'en-US',
  className: '',
  trigger: 'slide',
  rootMargin: '0px',
  threshold: 0.1,
})

const root = useTemplateRef<HTMLElement>('root')
const isSlideActive = useIsSlideActive()
const { $page, $nav } = useSlideContext()
const hasStarted = shallowRef(false)
const isElementVisible = shallowRef(false)
const displayedValue = shallowRef(props.from)
const counter = { value: props.from }
let animation: ReturnType<typeof animate> | undefined
let observer: IntersectionObserver | undefined

interface InactiveSlideResetState {
  currentPage: number
  slidePage: number
}

function shouldResetInactiveSlide({ currentPage, slidePage }: InactiveSlideResetState): boolean {
  return currentPage <= slidePage
}


const formattedValue = computed(() =>
  new Intl.NumberFormat(props.locale).format(displayedValue.value),
)

function resetToInitial(): void {
  animation?.cancel()
  counter.value = props.from
  displayedValue.value = props.from
  hasStarted.value = false
}

function playAnimation(targetValue: number): void {
  animation?.cancel()

  animation = animate(counter, {
    value: targetValue,
    duration: props.duration,
    ease: props.ease,
    modifier: utils.round(0),
    onUpdate: () => {
      displayedValue.value = counter.value
    },
  })
}

function startAnimation(options: { restart?: boolean } = {}): void {
  if (hasStarted.value && !options.restart)
    return

  if (options.restart)
    resetToInitial()

  hasStarted.value = true
  playAnimation(props.value)
}

function handleVisibility(isIntersecting: boolean): void {
  isElementVisible.value = isIntersecting

  if (props.trigger === 'visible') {
    if (isIntersecting)
      startAnimation({ restart: true })
    else
      resetToInitial()

    return
  }

  if (isIntersecting && !hasStarted.value)
    startAnimation()
  else if (!hasStarted.value)
    resetToInitial()
}

function observeVisibility(): void {
  if (!root.value)
    return

  if (!('IntersectionObserver' in window)) {
    startAnimation()
    return
  }

  observer = new IntersectionObserver((entries) => {
    handleVisibility(entries.some(entry => entry.isIntersecting))

    if (props.trigger === 'visibleOnce' && hasStarted.value) {
      observer?.disconnect()
      observer = undefined
    }
  }, {
    rootMargin: props.rootMargin,
    threshold: props.threshold,
  })

  observer.observe(root.value)
}

onMounted(() => {
  resetToInitial()

  if (props.trigger === 'enter')
    startAnimation()
  else if (props.trigger !== 'slide')
    observeVisibility()
})

watch(isSlideActive, (isActive) => {
  if (props.trigger !== 'slide')
    return

  if (isActive)
    startAnimation({ restart: true })
  else if (shouldResetInactiveSlide({
    currentPage: $nav.value.currentSlideNo,
    slidePage: $page.value,
  }))
    resetToInitial()
}, {
  immediate: true,
})

watch(() => props.value, (value) => {
  if (!hasStarted.value)
    return

  if (props.trigger === 'slide' && !isSlideActive.value)
    return

  if (props.trigger === 'visible' && !isElementVisible.value)
    return

  playAnimation(value)
})

onUnmounted(() => {
  observer?.disconnect()
  animation?.revert()
})
</script>

<template>
  <div ref="root" :class="props.className">
    {{ formattedValue }}
  </div>
</template>
