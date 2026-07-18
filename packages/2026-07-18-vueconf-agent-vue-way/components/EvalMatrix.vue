<script setup lang="ts">
import type { AutoLayout } from 'animejs'
import { useSlideContext } from '@slidev/client'
import { animate, createLayout, stagger, utils } from 'animejs'
import { nextTick, onMounted, onUnmounted, ref, shallowRef, useTemplateRef, watch } from 'vue'

interface MatrixRun {
  id: string
  fill: string
  languageColor: string
  languageVisible: boolean
  modelColor: string
  modelVisible: boolean
}

const runCounts = [8, 16, 32] as const
const caseAndTaskColors = [
  '#ea580c',
  '#d97706',
  '#ca8a04',
  '#65a30d',
  '#9a3412',
  '#92400e',
  '#854d0e',
  '#3f6212',
] as const
const languageColors = ['#fde047', '#fda4af'] as const
const modelColors = ['#8f7478', '#a8789a'] as const

const { $clicks } = useSlideContext()
const grid = useTemplateRef<HTMLElement>('grid')
const runs = ref<MatrixRun[]>([])
const displayedRuns = shallowRef(0)
const counter = { value: 0 }

let layout: AutoLayout | undefined

function stageForClicks(clicks: number): number {
  return Math.min(Math.max(clicks, 0), runCounts.length - 1)
}

function createRun(index: number, stage: number): MatrixRun {
  const languageIndex = Math.floor(index / 8) % languageColors.length
  const modelIndex = Math.floor(index / 16) % modelColors.length

  return {
    id: `run-${index}`,
    fill: caseAndTaskColors[index % caseAndTaskColors.length],
    languageColor: languageColors[languageIndex],
    languageVisible: stage >= 1,
    modelColor: modelColors[modelIndex],
    modelVisible: stage >= 2,
  }
}

function syncRuns(clicks: number): void {
  const stage = stageForClicks(clicks)
  const targetCount = runCounts[stage]

  while (runs.value.length > targetCount)
    runs.value.pop()

  for (let index = 0; index < runs.value.length; index++)
    Object.assign(runs.value[index], createRun(index, stage))

  while (runs.value.length < targetCount)
    runs.value.push(createRun(runs.value.length, stage))
}

syncRuns($clicks.value)
displayedRuns.value = runs.value.length
counter.value = runs.value.length

onMounted(() => {
  if (!grid.value)
    return

  layout = createLayout(grid.value, {
    children: '[data-matrix-cell]',
    duration: 1040,
    ease: 'out(4)',
    delay: stagger(12),
    enterFrom: {
      opacity: 0,
      scale: 0.55,
    },
    leaveTo: {
      opacity: 0,
      scale: 0.55,
    },
  })
})

watch($clicks, async (clicks) => {
  if (layout)
    layout.record()

  syncRuns(clicks.value)
  await nextTick()

  if (layout) {
    layout.animate({
      duration: 1040,
      ease: 'out(4)',
      delay: stagger(12),
    })
  }

  animate(counter, {
    value: runs.value.length,
    duration: 450,
    ease: 'out(4)',
    modifier: utils.round(0),
    onUpdate: () => {
      displayedRuns.value = counter.value
    },
  })
})

onUnmounted(() => {
  layout?.revert()
})
</script>

<template>
  <section aria-label="Vieval Matrix 调度展开" class="flex h-full w-full flex-col rounded-xl bg-white/4 p-5">
    <div class="mb-4 flex items-end justify-between">
      <div>
        <div class="text-sm text-white/45">
          运行组合
        </div>
        <div class="mt-1 text-xs text-white/30">
          2 个 Task × 每个 4 个 Case × 配置组合
        </div>
      </div>
      <div class="font-mono text-xl text-orange-300">
        {{ displayedRuns }} runs
      </div>
    </div>

    <div
      ref="grid"
      data-matrix-grid
      class="flex flex-wrap content-start items-start justify-start gap-3"
    >
      <div
        v-for="run in runs"
        :key="run.id"
        data-matrix-cell
        class="relative h-11 w-11 flex-none overflow-hidden rounded-lg"
        :style="{
          backgroundColor: run.fill,
        }"
      >
        <span
          class="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full transition-opacity duration-300"
          :class="run.modelVisible ? 'opacity-100' : 'opacity-0'"
          :style="{ backgroundColor: run.modelColor }"
        />
        <span
          class="absolute inset-x-1.5 bottom-1.5 h-1.5 rounded transition-opacity duration-300"
          :class="run.languageVisible ? 'opacity-100' : 'opacity-0'"
          :style="{ backgroundColor: run.languageColor }"
        />
      </div>
    </div>
  </section>
</template>
