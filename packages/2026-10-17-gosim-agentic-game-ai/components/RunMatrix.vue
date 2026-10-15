<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

/**
 * D5: the planner wake baseline (airicraft docs/experiments/
 * 2026-09-27-planner-wake-baseline.md): 9 frozen-world scenarios x 3 batches,
 * same build, deepseek-v4.1-flash. Click 1 fills the matrix, click 2 picks out
 * iron-pickaxe (the only disagreement), click 3 shows the cost spread of two
 * passing iron-pickaxe runs on one commit (autonomous-playtest-log D159 vs
 * D163, qwen3-8-27b), click 4 is the conclusion.
 */
const props = defineProps<{
  clicks: number
}>()

const rows: { name: string, r: [boolean, boolean, boolean] }[] = [
  { name: 'bread-cooperative-watch', r: [false, false, false] },
  { name: 'farm_easy', r: [true, true, true] },
  { name: 'farm_from_scratch', r: [false, false, false] },
  { name: 'farm_harder', r: [false, false, false] },
  { name: 'get_water', r: [true, true, true] },
  { name: 'iron-pickaxe', r: [true, false, true] },
  { name: 'pickup', r: [true, true, true] },
  { name: 'sea_grass', r: [false, false, false] },
  { name: 'underground', r: [true, true, true] },
]

const totals = [0, 1, 2].map(b => rows.filter(row => row.r[b]).length)
const STAGGER = 60

function delay(row: number, batch: number) {
  return (batch * rows.length + row) * STAGGER
}

function totalDelay(batch: number) {
  return ((batch + 1) * rows.length) * STAGGER + 80
}

const spread = [
  { label: 'requests', zh: '请求数', a: 38, b: 71, fa: '38', fb: '71' },
  { label: 'input tokens', zh: '输入 token', a: 1.58, b: 3.14, fa: '1.6M', fb: '3.1M' },
]

const instant = ref(false)
watch(() => props.clicks, async (n, o) => {
  if (Math.abs(n - (o ?? 0)) > 1) {
    instant.value = true
    await nextTick()
    requestAnimationFrame(() => requestAnimationFrame(() => (instant.value = false)))
  }
})
</script>

<template>
  <div class="wrap" :class="{ instant, focus: clicks >= 2 }">
    <div class="matrix">
      <div class="head">
        <span class="sc">scenario</span>
        <span v-for="b in 3" :key="b" class="col">batch {{ b }}</span>
      </div>
      <div
        v-for="(row, ri) in rows"
        :key="row.name"
        class="row"
        :class="{ hot: row.name === 'iron-pickaxe' }"
      >
        <span class="sc name">{{ row.name }}</span>
        <span
          v-for="(ok, bi) in row.r"
          :key="bi"
          class="cell"
          :class="[ok ? 'pass' : 'fail', { shown: clicks >= 1 }]"
          :style="{ transitionDelay: clicks >= 1 ? `${delay(ri, bi)}ms` : '0ms', animationDelay: `${bi * 260}ms` }"
        >{{ ok ? 'PASS' : 'FAIL' }}</span>
      </div>
      <div class="totals">
        <span class="sc">passed</span>
        <span
          v-for="(t, bi) in totals"
          :key="bi"
          class="total"
          :class="{ shown: clicks >= 1, low: t < 5 }"
          :style="{ transitionDelay: clicks >= 1 ? `${totalDelay(bi)}ms` : '0ms' }"
        >{{ t }}/9</span>
      </div>
      <div class="caption">
        9 frozen-world scenarios · same build · deepseek-v4.1-flash · isolated clients
      </div>
    </div>

    <div class="side">
      <div class="flip-note" :class="{ shown: clicks >= 2 }">
        <div class="fn-en">
          <b>iron-pickaxe</b>: <span class="p">PASS</span> → <span class="f">FAIL</span> → <span class="p">PASS</span>
        </div>
        <div class="fn-zh">
          九个场景里只有它变了：换一批，结果就翻
        </div>
      </div>

      <div class="spread" :class="{ shown: clicks >= 3 }">
        <div class="sp-title">
          Same task, same commit, two passing runs
        </div>
        <div class="sp-zh">
          同一个任务、同一个 commit，两次都成功，花费却差了将近一倍
        </div>
        <div v-for="(m, mi) in spread" :key="m.label" class="metric">
          <div class="m-label">
            {{ m.label }}
          </div>
          <div class="bars">
            <div class="bar a" :style="{ width: clicks >= 3 ? `${(m.a / m.b) * 100}%` : '0%', transitionDelay: `${200 + mi * 160}ms` }">
              <span>{{ m.fa }}</span>
            </div>
            <div class="bar b" :style="{ width: clicks >= 3 ? '100%' : '0%', transitionDelay: `${280 + mi * 160}ms` }">
              <span>{{ m.fb }}</span>
            </div>
          </div>
        </div>
        <div class="sp-foot">
          iron-pickaxe · qwen3-8-27b · both PASSED
        </div>
      </div>

      <div class="verdict" :class="{ shown: clicks >= 4 }">
        <div class="v-en">
          A single run is an anecdote.
        </div>
        <div class="v-zh">
          跑一次的结果，只能算个例
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  display: grid;
  grid-template-columns: 440px 1fr;
  gap: 40px;
  width: 868px;
  align-items: start;
}

.instant,
.instant * {
  transition: none !important;
  animation-duration: 0s !important;
}

/* Matrix */
.head,
.row,
.totals {
  display: grid;
  grid-template-columns: 1fr repeat(3, 66px);
  gap: 8px;
  align-items: center;
}

.head {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(10 37 64 / 50%);
  padding: 0 10px 6px;
}

.col {
  text-align: center;
}

.row {
  height: 25px;
  padding: 0 10px;
  border-radius: 10px;
  transition:
    opacity 400ms ease,
    background 400ms ease;
}

.name {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  letter-spacing: -0.01em;
}

.focus .row:not(.hot) {
  opacity: 0.32;
}

.focus .row.hot {
  background: rgb(255 255 255 / 85%);
  box-shadow: 0 8px 22px rgb(10 37 64 / 10%);
}

.cell {
  height: 20px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #fff;
  opacity: 0;
  transform: scale(0.4);
  transition:
    opacity 260ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.cell.shown {
  opacity: 1;
  transform: none;
}

.cell.pass {
  background: #3aa676;
}

.cell.fail {
  background: #e0607e;
}

.focus .row.hot .cell {
  animation: flip 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes flip {
  0% {
    transform: perspective(200px) rotateX(0);
  }
  50% {
    transform: perspective(200px) rotateX(90deg);
  }
  100% {
    transform: perspective(200px) rotateX(0) scale(1.08);
  }
}

.totals {
  margin-top: 8px;
  padding: 8px 10px 0;
  border-top: 1px solid rgb(10 37 64 / 12%);
}

.totals .sc {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(10 37 64 / 50%);
}

.total {
  text-align: center;
  font-size: 22px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: #285091;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 400ms ease,
    transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 400ms ease;
}

.total.low {
  color: #e0607e;
}

.total.shown {
  opacity: 1;
  transform: none;
  filter: none;
}

.caption {
  margin-top: 8px;
  padding: 0 10px;
  font-size: 11px;
  color: rgb(10 37 64 / 50%);
}

/* Side */
.side {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-top: 18px;
}

.flip-note,
.spread,
.verdict {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 500ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 500ms ease;
}

.flip-note.shown,
.spread.shown,
.verdict.shown {
  opacity: 1;
  transform: none;
  filter: none;
}

.fn-en {
  font-size: 19px;
  font-weight: 600;
}

.fn-en .p {
  color: #3aa676;
  font-weight: 800;
}

.fn-en .f {
  color: #e0607e;
  font-weight: 800;
}

.fn-zh,
.sp-zh {
  margin-top: 4px;
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 12.5px;
  color: rgb(10 37 64 / 60%);
}

.sp-title {
  font-size: 15px;
  font-weight: 700;
}

.metric {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 10px;
  align-items: center;
  margin-top: 12px;
}

.m-label {
  font-size: 12px;
  font-weight: 700;
  color: rgb(10 37 64 / 60%);
  text-align: right;
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bar {
  height: 20px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  min-width: 0;
  overflow: hidden;
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  font-variant-numeric: tabular-nums;
  transition: width 800ms cubic-bezier(0.22, 1, 0.36, 1);
}

.bar.a {
  background: #91d2dd;
  color: #0a2540;
}

.bar.b {
  background: #456e95;
}

.sp-foot {
  margin-top: 8px;
  padding-left: 102px;
  font-size: 11px;
  color: rgb(10 37 64 / 50%);
}

.v-en {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.15;
  background: var(--gosim-heading);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.v-zh {
  margin-top: 4px;
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: rgb(10 37 64 / 70%);
}

@media (prefers-reduced-motion: reduce) {
  .cell {
    animation: none !important;
  }
}
</style>
