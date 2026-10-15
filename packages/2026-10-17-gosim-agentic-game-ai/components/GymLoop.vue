<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

/**
 * E5: a real scenario file (airicraft scenarios/iron-pickaxe/scenario.yml)
 * read as a Gym environment. Each click lights the yml lines that become one
 * piece of the loop: reset() from the frozen world, the goal the agent
 * observes and acts on, the check that reads the world (reward), and the
 * budget that ends the episode (done). Outcomes follow
 * ScenarioEvaluationRunner: PASSED, FAILED, STALLED, NEEDS_REVIEW.
 */
const props = defineProps<{
  clicks: number
}>()

type Group = 'reset' | 'goal' | 'reward' | 'done' | ''

interface Line {
  text: string
  group: Group
  indent?: number
  key?: boolean
}

const lines: Line[] = [
  { text: 'id: iron-pickaxe', group: '' },
  { text: 'worldArchive: world.zip', group: 'reset' },
  { text: 'frozen: true', group: 'reset' },
  { text: 'prompt: >-', group: 'goal' },
  { text: 'Starting from only the resources', group: 'goal', indent: 1 },
  { text: 'in this world, obtain one', group: 'goal', indent: 1 },
  { text: 'minecraft:iron_pickaxe. …', group: 'goal', indent: 1 },
  { text: 'checks:', group: 'reward' },
  { text: '- type: inventory_contains', group: 'reward', indent: 1 },
  { text: '  itemId: minecraft:iron_pickaxe', group: 'reward', indent: 1 },
  { text: '  count: 1', group: 'reward', indent: 1 },
  { text: 'budget:', group: 'done' },
  { text: 'maxPlannerTurns: 80', group: 'done', indent: 1 },
  { text: 'maxElapsedTicks: 72000', group: 'done', indent: 1 },
]

const order: Group[] = ['', 'reset', 'goal', 'reward', 'done']
const active = computed<Group>(() => order[Math.min(props.clicks, 4)])
const tags: Record<string, string> = { reset: 'reset()', goal: 'observe · act', reward: 'reward', done: 'done' }

function firstOf(i: number) {
  return lines[i].group !== '' && (i === 0 || lines[i - 1].group !== lines[i].group)
}

const outcomes = [
  { s: 'PASSED', zh: '检查通过', cls: 'pass' },
  { s: 'FAILED', zh: '预算用完没做到', cls: 'fail' },
  { s: 'STALLED', zh: '6,000 tick 毫无动静', cls: 'stall' },
  { s: 'NEEDS_REVIEW', zh: '没有检查，人来判', cls: 'review' },
]

const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

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
  <div class="gym" :class="{ instant }">
    <!-- scenario.yml -->
    <div class="yml">
      <div class="file">
        scenarios/iron-pickaxe/scenario.yml
      </div>
      <div
        v-for="(l, i) in lines"
        :key="i"
        class="line"
        :class="[`g-${l.group}`, { lit: l.group !== '' && l.group === active, past: l.group !== '' && order.indexOf(l.group) < order.indexOf(active) }]"
      >
        <span :style="{ paddingLeft: `${(l.indent ?? 0) * 16}px` }">{{ l.text }}</span>
        <span v-if="firstOf(i)" class="tag">{{ tags[l.group] }}</span>
      </div>
    </div>

    <!-- the loop -->
    <div class="loop">
      <svg class="wires" width="500" height="250" viewBox="0 0 500 250">
        <defs>
          <marker id="gym-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
            <path d="M1 1.5 L9 5 L1 8.5 z" fill="#456e95" stroke="#456e95" stroke-width="1.2" stroke-linejoin="round" />
          </marker>
        </defs>
        <!-- reset: world.zip -> World -->
        <path class="w" :class="{ on: clicks >= 1 }" d="M 414 46 L 414 93" marker-end="url(#gym-arrow)" />
        <!-- act: Agent -> World (upper arc) -->
        <path id="gym-act" class="w" :class="{ on: clicks >= 2 }" d="M 182 118 C 226 88, 274 88, 318 118" marker-end="url(#gym-arrow)" />
        <!-- observe: World -> Agent (lower arc) -->
        <path id="gym-obs" class="w" :class="{ on: clicks >= 2 }" d="M 318 144 C 274 174, 226 174, 182 144" marker-end="url(#gym-arrow)" />
        <!-- the check reads the world -->
        <path class="w dashed" :class="{ on: clicks >= 3 }" d="M 414 168 L 414 191" marker-end="url(#gym-arrow)" />
        <!-- one calm packet goes round: act, then observe -->
        <g v-if="clicks >= 2 && !reduced" class="packets">
          <circle r="4.5" class="pk act" opacity="0">
            <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.4;1" calcMode="linear">
              <mpath href="#gym-act" />
            </animateMotion>
            <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.06;0.32;0.4;1" />
          </circle>
          <circle r="4.5" class="pk obs" opacity="0">
            <animateMotion dur="4s" begin="2s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.4;1" calcMode="linear">
              <mpath href="#gym-obs" />
            </animateMotion>
            <animate attributeName="opacity" dur="4s" begin="2s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.06;0.32;0.4;1" />
          </circle>
        </g>
      </svg>

      <div class="wlabel act" :class="{ on: clicks >= 2 }">
        act · tool call
      </div>
      <div class="wlabel obs" :class="{ on: clicks >= 2 }">
        observe
      </div>
      <div class="wlabel reset" :class="{ on: clicks >= 1 }">
        reset()
      </div>

      <div class="node zip" :class="{ on: clicks >= 1 }">
        <div i-twemoji:snowflake class="ni" />
        <div>
          <div class="nt">
            world.zip
          </div>
          <div class="nz">
            冻结的存档
          </div>
        </div>
      </div>

      <div class="node world" :class="{ on: clicks >= 1 }">
        <div i-twemoji:globe-showing-asia-australia class="ni" />
        <div>
          <div class="nt">
            World
          </div>
          <div class="nz">
            全新客户端 · 20 Hz
          </div>
        </div>
      </div>

      <div class="node agent" :class="{ on: clicks >= 2 }">
        <div i-twemoji:robot class="ni" />
        <div>
          <div class="nt">
            Agent
          </div>
          <div class="nz">
            策略：大模型规划器
          </div>
        </div>
      </div>

      <div class="node check" :class="{ on: clicks >= 3 }">
        <div i-twemoji:magnifying-glass-tilted-left class="ni" />
        <div>
          <div class="nt">
            check
          </div>
          <div class="nz">
            读世界，不读对话
          </div>
        </div>
      </div>

      <div class="reward" :class="{ on: clicks >= 3 }">
        <div class="rw-en">
          reward = <b>0 / 1</b>
        </div>
        <div class="nz">
          只在最后给一次
        </div>
      </div>

      <div class="outcomes" :class="{ on: clicks >= 4 }">
        <div
          v-for="(o, i) in outcomes"
          :key="o.s"
          class="oc"
          :class="o.cls"
          :style="{ transitionDelay: clicks >= 4 ? `${i * 90}ms` : '0ms' }"
        >
          <div class="oc-s">
            {{ o.s }}
          </div>
          <div class="oc-z">
            {{ o.zh }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gym {
  display: grid;
  grid-template-columns: 330px 500px;
  gap: 38px;
  width: 868px;
}

.instant,
.instant * {
  transition: none !important;
}

/* yml */
.yml {
  align-self: start;
  padding: 12px 6px 12px 0;
  border-radius: 16px;
  background: rgb(255 255 255 / 68%);
  border: 1px solid rgb(255 255 255 / 85%);
  box-shadow: 0 10px 30px rgb(10 37 64 / 8%);
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 12px;
  line-height: 1.5;
}

.file {
  padding: 0 14px 6px;
  font-size: 10.5px;
  color: rgb(10 37 64 / 45%);
}

.line {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 0 14px;
  border-left: 3px solid transparent;
  color: rgb(10 37 64 / 75%);
  white-space: nowrap;
  transition:
    background 350ms ease,
    color 350ms ease,
    opacity 350ms ease,
    border-color 350ms ease;
}

.line.lit {
  background: rgb(98 146 191 / 16%);
  border-left-color: #6292bf;
  color: #0a2540;
  font-weight: 700;
}

.line.past {
  color: rgb(10 37 64 / 75%);
}

.tag {
  font-family: 'Quicksand Variable', sans-serif;
  font-size: 10.5px;
  font-weight: 700;
  padding: 0 8px;
  border-radius: 99px;
  color: #fff;
  background: #456e95;
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 300ms ease,
    transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
}

.line.lit .tag,
.line.past .tag {
  opacity: 1;
  transform: none;
}

.line.past .tag {
  background: rgb(69 110 149 / 45%);
}

/* loop */
.loop {
  position: relative;
  width: 500px;
  height: 330px;
}

.wires {
  position: absolute;
  inset: 0 0 auto 0;
}

.w {
  fill: none;
  stroke: #456e95;
  stroke-width: 2;
  stroke-linecap: round;
  opacity: 0;
  transition: opacity 500ms ease;
}

.w.dashed {
  stroke-dasharray: 5 5;
}

.w.on {
  opacity: 1;
}

.pk.act {
  fill: #e87aa4;
}

.pk.obs {
  fill: #6292bf;
}

.wlabel {
  position: absolute;
  font-size: 12px;
  font-weight: 700;
  color: #456e95;
  opacity: 0;
  transition: opacity 400ms ease 200ms;
  white-space: nowrap;
}

.wlabel.on {
  opacity: 1;
}

.wlabel.act,
.wlabel.obs {
  left: 250px;
  transform: translateX(-50%);
}

.wlabel.act {
  top: 64px;
}

.wlabel.obs {
  top: 176px;
}

.wlabel.reset {
  left: 426px;
  top: 60px;
}

.node {
  position: absolute;
  width: 172px;
  height: 58px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border-radius: 16px;
  background: rgb(255 255 255 / 88%);
  box-shadow: 0 8px 22px rgb(10 37 64 / 10%);
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 450ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 450ms ease;
}

.node.on {
  opacity: 1;
  transform: none;
  filter: none;
}

.ni {
  font-size: 26px;
  flex: none;
}

.nt {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
}

.nz {
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 11px;
  color: rgb(10 37 64 / 60%);
  white-space: nowrap;
}

.zip {
  left: 328px;
  top: -14px;
  height: 52px;
  background: rgb(145 210 221 / 35%);
}

.world {
  left: 328px;
  top: 102px;
}

.agent {
  left: 0;
  top: 102px;
}

.check {
  left: 328px;
  top: 200px;
}

.reward {
  position: absolute;
  left: 120px;
  top: 206px;
  width: 190px;
  text-align: right;
  opacity: 0;
  transform: translateX(10px);
  transition:
    opacity 450ms ease 250ms,
    transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 250ms;
}

.reward.on {
  opacity: 1;
  transform: none;
}

.rw-en {
  font-size: 16px;
  font-weight: 600;
}

.outcomes {
  position: absolute;
  left: 0;
  right: 0;
  top: 274px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.oc {
  height: 50px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(255 255 255 / 80%);
  box-shadow: 0 6px 16px rgb(10 37 64 / 8%);
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 400ms ease,
    transform 550ms cubic-bezier(0.22, 1, 0.36, 1);
}

.outcomes.on .oc {
  opacity: 1;
  transform: none;
}

.oc-s {
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.oc-z {
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
  font-size: 10.5px;
  color: rgb(10 37 64 / 60%);
}

.oc.pass .oc-s {
  color: #3aa676;
}

.oc.fail .oc-s {
  color: #e0607e;
}

.oc.stall .oc-s {
  color: #ceaa5b;
}

.oc.review .oc-s {
  color: #456e95;
}
</style>
