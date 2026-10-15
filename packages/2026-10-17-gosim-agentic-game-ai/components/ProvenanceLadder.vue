<script setup lang="ts">
/**
 * E4: the provenance ladder. Rungs are listed bottom-up; each click reveals
 * its rungs one after another with an anime.js stagger (plain fade + small
 * rise). Going backward, or opening the slide at a later click, sets the
 * settled state without animating.
 */
import { animate, stagger, utils } from 'animejs'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  clicks: number
}>()

const rungs = [
  { text: 'Pixels changed in region X', kind: 'measured', showAt: 1 },
  { text: 'The red bar got shorter', kind: 'detector', showAt: 2 },
  { text: 'The red bar is health', kind: 'tested hypothesis', showAt: 2 },
  { text: 'The player took damage', kind: 'reasoning', showAt: 3 },
  { text: 'That was a bad trade', kind: 'judgment', showAt: 3 },
]

const root = ref<HTMLElement>()
const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function els() {
  return Array.from(root.value?.querySelectorAll<HTMLElement>('.rung') ?? [])
}

function settle(n: number) {
  for (const [i, el] of els().entries()) {
    utils.remove(el)
    utils.set(el, rungs[i].showAt <= n ? { opacity: 1, translateY: 0 } : { opacity: 0, translateY: 8 })
  }
}

onMounted(() => settle(props.clicks))

watch(() => props.clicks, (n, o) => {
  if (reduced || n !== o + 1) {
    settle(n)
    return
  }
  const fresh = els().filter((_, i) => rungs[i].showAt === n)
  if (!fresh.length)
    return
  animate(fresh, {
    opacity: [0, 1],
    translateY: [8, 0],
    duration: 520,
    ease: 'out(3)',
    delay: stagger(180),
  })
})
</script>

<template>
  <div ref="root" class="ladder">
    <div
      v-for="(r, i) in rungs"
      :key="r.text"
      class="rung"
      :class="{ top: i === rungs.length - 1 }"
      :style="{ '--i': i }"
    >
      <span>{{ r.text }}</span><em>{{ r.kind }}</em>
    </div>
    <div class="cap">
      The provenance ladder <span>每往上一格，都是一次推断</span>
    </div>
  </div>
</template>

<style scoped>
.ladder {
  display: flex;
  flex-direction: column-reverse;
  gap: 6px;
}

.cap {
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgb(10 37 64 / 55%);
}

.cap span {
  margin-left: 8px;
  font-weight: 500;
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
}

.rung {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-left: calc(var(--i) * 18px);
  padding: 7px 0 7px 14px;
  border-left: 3px solid rgb(69 110 149 / calc(30% + var(--i) * 15%));
  font-size: 17px;
  font-weight: 600;
  color: #0a2540;
  opacity: 0;
}

.rung em {
  font-style: normal;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 500;
  color: rgb(10 37 64 / 48%);
  white-space: nowrap;
}

.rung.top {
  border-left-color: #e87aa4;
}
</style>
