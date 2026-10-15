<script setup lang="ts">
/**
 * The recorder's view of one play, simplified: four stream scopes on one
 * server-tick clock (world truth, what the actor could perceive, what it did,
 * what it was thinking). The last click marks the divergence the recorder
 * dashboard flags: what Alice saw versus what is true now.
 */
defineProps<{
  clicks: number
}>()

interface Mark {
  at: number
  w?: number
  label: string
  kind?: 'warn'
}

interface Track {
  key: string
  name: string
  zh: string
  color: string
  showAt: number
  marks: Mark[]
}

const tracks: Track[] = [
  {
    key: 'world',
    name: 'World',
    zh: '世界真相',
    color: '#285091',
    showAt: 1,
    marks: [
      { at: 6, w: 18, label: 'diamond in chest A' },
      { at: 44, w: 14, label: 'Bob moves it to B' },
      { at: 60, w: 34, label: 'chest A: empty' },
    ],
  },
  {
    key: 'perception',
    name: 'Perception',
    zh: 'Alice 看到了什么',
    color: '#6292BF',
    showAt: 2,
    marks: [
      { at: 4, w: 22, label: 'sees chest A' },
      { at: 40, w: 22, label: 'not in view' },
    ],
  },
  {
    key: 'action',
    name: 'Action',
    zh: '20 Hz 按键与视角',
    color: '#CEAA5B',
    showAt: 3,
    marks: [
      { at: 10, w: 8, label: 'open' },
      { at: 22, w: 16, label: 'walk away' },
      { at: 72, w: 14, label: 'walk back' },
    ],
  },
  {
    key: 'mind',
    name: 'Planner',
    zh: 'LLM 在想什么',
    color: '#E87AA4',
    showAt: 4,
    marks: [
      { at: 18, w: 22, label: 'remember: diamond @A' },
      { at: 70, w: 22, label: 'go get diamond @A' },
    ],
  },
]
</script>

<template>
  <div class="timeline">
    <div class="ruler">
      <span v-for="t in 6" :key="t">tick {{ (t - 1) * 200 }}</span>
    </div>
    <div v-for="track in tracks" :key="track.key" class="track" :class="{ shown: clicks >= track.showAt }">
      <div class="track-name">
        <span class="swatch" :style="{ background: track.color }" />
        <div>
          <div class="name">
            {{ track.name }}
          </div>
          <div class="zh-small">
            {{ track.zh }}
          </div>
        </div>
      </div>
      <div class="lane">
        <div
          v-for="(m, i) in track.marks"
          :key="m.label"
          class="mark"
          :style="{ left: `${m.at}%`, width: `${m.w ?? 10}%`, background: track.color, transitionDelay: `${i * 80 + 120}ms` }"
        >
          {{ m.label }}
        </div>
      </div>
    </div>

    <div class="divergence" :class="{ shown: clicks >= 5 }">
      <div class="div-line" />
      <div class="div-card">
        <div class="div-title">
          observed: Diamond ×1 · world: empty
        </div>
        <div class="zh-small">
          Alice 以为钻石还在 A；世界已经不是这样了。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  position: relative;
  width: 880px;
}

.ruler {
  display: flex;
  justify-content: space-between;
  margin-left: 150px;
  font-size: 10px;
  color: rgb(10 37 64 / 40%);
  font-variant-numeric: tabular-nums;
  border-bottom: 1px dashed rgb(10 37 64 / 15%);
  padding-bottom: 4px;
}

.track {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  height: 54px;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 450ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 450ms ease;
}

.track.shown {
  opacity: 1;
  transform: none;
  filter: none;
}

.track-name {
  width: 150px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.swatch {
  width: 10px;
  height: 28px;
  border-radius: 99px;
}

.name {
  font-size: 14px;
  font-weight: 700;
}

.zh-small {
  font-size: 10.5px;
  color: rgb(10 37 64 / 55%);
  font-family: 'ChillRoundM', 'Noto Sans SC Variable', sans-serif;
}

.lane {
  position: relative;
  flex: 1;
  height: 34px;
  border-radius: 10px;
  background: rgb(255 255 255 / 55%);
  border: 1px solid rgb(255 255 255 / 80%);
}

.mark {
  position: absolute;
  top: 4px;
  bottom: 4px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 8px;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.track.shown .mark {
  transform: scaleX(1);
}

.divergence {
  position: absolute;
  z-index: 0;
  left: calc(150px + 0.72 * 730px);
  top: 18px;
  bottom: -64px;
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 450ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.divergence.shown {
  opacity: 1;
  transform: none;
}

.div-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 50px;
  width: 0;
  border-left: 2px dashed #e5484d;
}

.div-card {
  position: absolute;
  bottom: 0;
  right: -12px;
  width: 280px;
  padding: 8px 12px;
  border-radius: 14px;
  background: #fff;
  border: 1.5px solid #e5484d;
  box-shadow: 0 10px 26px rgb(229 72 77 / 18%);
}

.div-title {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-weight: 700;
  color: #c4303a;
}
</style>
