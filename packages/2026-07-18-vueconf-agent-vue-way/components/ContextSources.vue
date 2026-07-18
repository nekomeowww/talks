<script setup lang="ts">
const props = defineProps<{ clicks: number }>()
const sources = [
  { label: 'System Prompt', position: 'left-4 top-8' },
  { label: '用户输入', position: 'left-4 top-34' },
  { label: '历史消息', position: 'left-4 top-60' },
  { label: '检索结果与记忆', position: 'right-4 top-8' },
  { label: '工具定义', position: 'right-4 top-34' },
  { label: 'Skill', position: 'right-4 top-60' },
  { label: '运行状态', position: 'left-1/2 top-2 -translate-x-1/2' },
] as const
</script>

<template>
  <section
    class="relative mx-auto my-auto h-82 w-full max-w-210"
    aria-label="Agent Context 的来源"
  >
    <svg
      class="absolute inset-0 h-full w-full"
      viewBox="0 0 840 328"
      fill="none"
      aria-hidden="true"
    >
      <path class="context-line" d="M 132 48 C 230 48, 264 128, 340 140" :class="props.clicks > 0 ? 'opacity-70' : 'opacity-0'" />
      <path class="context-line" d="M 132 152 C 230 152, 264 158, 340 164" :class="props.clicks > 1 ? 'opacity-70' : 'opacity-0'" />
      <path class="context-line" d="M 132 256 C 230 256, 264 204, 340 190" :class="props.clicks > 2 ? 'opacity-70' : 'opacity-0'" />
      <path class="context-line" d="M 708 48 C 610 48, 576 128, 500 140" :class="props.clicks > 3 ? 'opacity-70' : 'opacity-0'" />
      <path class="context-line" d="M 708 152 C 610 152, 576 158, 500 164" :class="props.clicks > 4 ? 'opacity-70' : 'opacity-0'" />
      <path class="context-line" d="M 708 256 C 610 256, 576 204, 500 190" :class="props.clicks > 5 ? 'opacity-70' : 'opacity-0'" />
      <path class="context-line" d="M 420 36 L 420 108" :class="props.clicks > 6 ? 'opacity-70' : 'opacity-0'" />
    </svg>

    <div
      v-for="(source, index) in sources"
      :key="source.label"
      data-context-source
      :aria-hidden="props.clicks <= index"
      class="absolute z-10 flex items-center gap-2 text-[1.05rem] transition-all duration-300"
      :class="[
        source.position,
        props.clicks > index
          ? 'visible translate-y-0 opacity-100'
          : 'invisible translate-y-2 opacity-0',
        index >= 3 && index < 6 ? 'flex-row-reverse' : '',
      ]"
    >
      <span class="h-2 w-2 rounded-full bg-teal-300" aria-hidden="true" />
      <span>{{ source.label }}</span>
    </div>

    <div
      class="absolute left-1/2 top-27 z-20 flex h-28 w-40 -translate-x-1/2 items-center justify-center rounded-xl bg-teal-400/12 text-center text-lg text-teal-100"
    >
      Context Window
    </div>

    <p
      v-if="props.clicks >= 8"
      class="absolute bottom-0 left-1/2 w-full -translate-x-1/2 text-center text-[1.05rem] text-white/72"
    >
      Context 变长以后，需要持续筛选内容、调整顺序，并在必要时重新整理。
    </p>
  </section>
</template>

<style scoped>
.context-line {
  stroke: rgb(94 234 212 / 68%);
  stroke-linecap: round;
  stroke-width: 1.5;
  transition: opacity 300ms ease;
}
</style>
