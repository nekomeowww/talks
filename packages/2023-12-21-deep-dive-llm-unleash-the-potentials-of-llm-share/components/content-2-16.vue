<script setup lang="ts">
const chars = {
  '你': ['好', '叫', '今', '要', '想'],
  '好': ['，', '吗', '我', '好', '看'],
  '，': ['世', '我', '请', '要', '想'],
  '世': ['界', '人'],
  '界': ['。'],
}
</script>

<template>
  <div class="text-3xl" text-black font-semibold>
    像人一样思考
  </div>

  <div flex flex-col>
    <div my-2 text-neutral-400>
      <span transition="all ease-in-out" duration-1500>
        「单字接龙」游戏
      </span>
    </div>
    <div
      flex items-center justify-center text-4xl text-black h="[340px]" transition="all ease-in-out" duration-1500
      :class="[
        Object.keys(chars).length + 1 >= $slidev.nav.clicks && $slidev.nav.clicks !== 0 ? 'opacity-100' : 'opacity-0',
      ]"
    >
      <div relative flex flex-row>
        <div
          v-for="(char, index) in Object.keys(chars)" :key="index" h-16 w-16 flex items-center justify-center
          rounded-lg p-4 transition="all ease-in-out" duration-500 :class="[
            $slidev.nav.clicks >= index + 1 ? 'opacity-100' : 'opacity-0',
          ]"
        >
          <span>{{ char }}</span>
        </div>
        <div
          absolute bottom-0 transition="all ease-in-out" duration-250 :class="[
            $slidev.nav.clicks === 0 ? 'translate-x-[16px]' : '',
            $slidev.nav.clicks === 1 ? 'translate-x-[16px]' : '',
            $slidev.nav.clicks === 2 ? 'translate-x-[80px]' : '',
            $slidev.nav.clicks === 3 ? 'translate-x-[144px]' : '',
            $slidev.nav.clicks === 4 ? 'translate-x-[208px]' : '',
            $slidev.nav.clicks >= 5 ? 'translate-x-[272px]' : '',
          ]"
        >
          <div h="[4px]" w-8 animate-pulse rounded-full bg-black />
          <div
            v-for="(char, index) in Object.values(chars)" :key="index" translate-x="[4px]" translate-y="[9px]" absolute
            h-full flex flex-col gap-2 text-2xl transition="all ease-in-out" duration-500 :class="[
              (index + 1) === $slidev.nav.clicks ? 'opacity-100' : 'opacity-0',
            ]"
          >
            <span
              v-for="(possibleChar, possibleCharIndex) in char" :key="possibleCharIndex" :class="[
                possibleCharIndex === 0 ? 'text-gray-500' : '',
                possibleCharIndex === 1 ? 'text-gray-400' : '',
                possibleCharIndex === 2 ? 'text-gray-300' : '',
                possibleCharIndex === 3 ? 'text-gray-200' : '',
                possibleCharIndex >= 4 ? 'text-gray-100' : '',
              ]"
            >
              {{ possibleChar }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
