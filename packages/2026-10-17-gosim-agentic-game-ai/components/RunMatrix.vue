<script setup lang="ts">
import { computed } from 'vue'

/**
 * D5: what the planner wake baseline showed (airicraft docs/experiments/
 * 2026-09-27-planner-wake-baseline.md): 9 frozen-world scenarios x 3 batches,
 * same build, deepseek-v4.1-flash. The matrix is shown from the start; each
 * click picks out the rows behind one finding and adds it to the list.
 */
const props = defineProps<{
  clicks: number
}>()

const rows: { name: string, r: [boolean, boolean, boolean] }[] = [
  { name: 'pickup', r: [true, true, true] },
  { name: 'underground', r: [true, true, true] },
  { name: 'get_water', r: [true, true, true] },
  { name: 'farm_easy', r: [true, true, true] },
  { name: 'iron-pickaxe', r: [true, false, true] },
  { name: 'farm_from_scratch', r: [false, false, false] },
  { name: 'farm_harder', r: [false, false, false] },
  { name: 'bread-cooperative-watch', r: [false, false, false] },
  { name: 'sea_grass', r: [false, false, false] },
]

const totals = [0, 1, 2].map(b => rows.filter(row => row.r[b]).length)

const findings = [
  {
    rows: ['farm_from_scratch', 'farm_harder'],
    en: 'Long tasks run out of turns',
    detail: 'Used all 80 / 30 planner turns before the farm was done.',
    zh: '长任务：轮次预算用完了，田还没种完',
  },
  {
    rows: ['bread-cooperative-watch'],
    en: 'It does not wait',
    detail: 'The wheat was just planted. It marked the goal blocked.',
    zh: '麦子刚种下，它不等，直接判定做不了',
  },
  {
    rows: ['sea_grass'],
    en: 'It gives up too early',
    detail: 'A light check failed, then no route. It stopped after ~5 turns.',
    zh: '照明检查失败、找不到路，五轮左右就放弃了',
  },
  {
    rows: ['iron-pickaxe'],
    en: 'The same task flips',
    detail: 'PASS → FAIL → PASS. Batch 2 ran out of turns.',
    zh: '同一个任务，换一批结果就变：跑一次不算数',
  },
]

const active = computed(() => (props.clicks >= 1 && props.clicks <= findings.length) ? findings[props.clicks - 1] : undefined)
const isHot = (name: string) => active.value?.rows.includes(name) ?? false
</script>

<template>
  <div class="wrap" :class="{ focusing: !!active }">
    <div class="matrix">
      <div class="head">
        <span class="sc">scenario</span>
        <span v-for="b in 3" :key="b" class="col">batch {{ b }}</span>
      </div>
      <div v-for="row in rows" :key="row.name" class="row" :class="{ hot: isHot(row.name) }">
        <span class="sc name">{{ row.name }}</span>
        <span v-for="(ok, bi) in row.r" :key="bi" class="cell" :class="ok ? 'pass' : 'fail'">{{ ok ? 'PASS' : 'FAIL' }}</span>
      </div>
      <div class="totals">
        <span class="sc">passed</span>
        <span v-for="(t, bi) in totals" :key="bi" class="total">{{ t }}/9</span>
      </div>
      <div class="caption">
        9 frozen-world scenarios · same build · deepseek-v4.1-flash
      </div>
    </div>

    <div class="findings">
      <div
        v-for="(f, i) in findings"
        :key="f.en"
        class="finding"
        :class="{ shown: clicks > i, current: clicks === i + 1 }"
      >
        <div class="f-en">
          {{ f.en }}
        </div>
        <div class="f-detail">
          {{ f.detail }}
        </div>
        <div class="f-zh">
          {{ f.zh }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 32px;
  align-items: start;
}

.head,
.row,
.totals {
  display: grid;
  grid-template-columns: 11rem repeat(3, 3.6rem);
  align-items: center;
  gap: 6px;
}

.head {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(10 37 64 / 45%);
  margin-bottom: 4px;
}

.row {
  height: 27px;
  border-radius: 8px;
  padding: 0 4px;
  transition: opacity 400ms ease, background 400ms ease;
}

.focusing .row:not(.hot) {
  opacity: 0.3;
}

.row.hot {
  background: rgb(255 255 255 / 75%);
}

.name {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}

.cell {
  text-align: center;
  font-size: 10.5px;
  font-weight: 700;
  border-radius: 6px;
  padding: 3px 0;
  color: #fff;
}

.cell.pass {
  background: #3fa877;
}

.cell.fail {
  background: #e5484d;
}

.totals {
  margin-top: 8px;
  padding: 0 4px;
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  color: rgb(10 37 64 / 45%);
}

.total {
  text-align: center;
  font-size: 22px;
  color: #285091;
  text-transform: none;
}

.caption {
  margin-top: 8px;
  font-size: 10.5px;
  color: rgb(10 37 64 / 45%);
}

.findings {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 18px;
}

.finding {
  padding-left: 14px;
  border-left: 3px solid rgb(10 37 64 / 12%);
  border-radius: 2px;
  opacity: 0;
  filter: blur(6px);
  translate: 0 12px;
  transition:
    opacity 500ms ease,
    filter 500ms ease,
    translate 500ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 400ms ease;
}

.finding.shown {
  opacity: 0.55;
  filter: none;
  translate: 0 0;
}

.finding.current {
  opacity: 1;
  border-left-color: #e5484d;
}

.findings:not(:has(.current)) .finding.shown {
  opacity: 1;
}

.f-en {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
}

.f-detail {
  margin-top: 2px;
  font-size: 12.5px;
  color: rgb(10 37 64 / 65%);
}

.f-zh {
  font-size: 12px;
  color: rgb(10 37 64 / 55%);
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
}

@media (prefers-reduced-motion: reduce) {
  .finding,
  .row {
    transition: none;
  }
}
</style>
