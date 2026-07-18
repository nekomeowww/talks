---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: 不可控下的可控：用 Vue 的方式开发 Agent
exportFilename: 不可控下的可控-用-Vue-的方式开发-Agent
info: |
  Vue Conf 2026
  Speakers: RainbowBird 洛灵 (@luoling8192) · Neko (@nekomeowww)
lineNumbers: false
drawings:
  persist: true
mdc: true
clicks: 0
preload: false
glow: bottom
glowOpacity: 0.4
glowSeed: 233
routerMode: hash
duration: 40min
defaults:
  layout: default
---
<!-- slide:A1 -->

<div :class="['flex items-center justify-center flex-col']">
  <div :class="['opacity-50', 'translate-y--15 scale-95']">
    <ConceptReel />
  </div>

  <div :class="['flex flex-col items-center justify-center gap-4']">
    <div :class="['text-white/30 text-xl']">在不确定的输出中，建立可验证的开发过程</div>
    <div :class="['m-0 mt-1 text-white text-6xl leading-none']">不可控下的可控</div>
    <div :class="['mt-1 text-white/82 text-2xl']">用 Vue 的方式开发 Agent</div>
  </div>
</div>

<!--
[两人一起]
大家好。今天想聊一个 Agent 开发里很常见的矛盾：模型的输出其实很难完全控制，但开发过程本身是可以更稳、更可预期的。接下来，我们会分两条线讲：一条是怎么把 Context 组织得更清楚，另一条是怎么重复跑、反复比较 Agent 的结果。
-->

---
layout: center
class: px-24!
glow: full
glowSeed: 205
clicks: 2
---
<!-- slide:A2 -->

<div :class="['grid grid-cols-2 gap-28 items-start']">
  <article v-click :class="['flex flex-col items-center text-center']">
    <img :src="'/avatar-nekomeowww.png'" alt="Neko" :class="['w-50 h-50 mb-4 object-cover rounded-full']" />
    <h2 :class="['m-0 text-white text-3xl leading-tight tracking-0']">Neko</h2>
    <div :class="['mt-2 text-white/68 text-sm']">LobeHub 开源工程师</div>
    <div
      :class="[
        'mt-3 flex items-center gap-2',
        'text-white/78 text-sm font-mono underline decoration-dashed decoration-white/45 underline-offset-3',
      ]"
    >
      <span :class="['i-mdi-github']" /> nekomeowww
    </div>
  </article>

  <article v-click :class="['flex flex-col items-center text-center']">
    <img :src="'/avatar-luoling8192.png'" alt="RainbowBird 洛灵" :class="['w-50 h-50 mb-4 object-cover rounded-full']" />
    <h2 :class="['m-0 text-white text-3xl leading-tight tracking-0']">RainbowBird 洛灵</h2>
    <div :class="['mt-2 text-white/68 text-sm']">AIRI 核心成员</div>
    <div
      :class="[
        'mt-3 flex items-center gap-2',
        'text-white/78 text-sm font-mono underline decoration-dashed decoration-white/45 underline-offset-3',
      ]"
    >
      <span :class="['i-mdi-github']" /> luoling8192
    </div>
  </article>
</div>

<!--
[click] [Neko] 大家好，我是 Neko，Project AIRI 的创始人。

[click] [洛灵] 我是洛灵，Project AIRI 的核心成员，平时是个数字游民。正式开始之前，先请 Neko 带大家看看我们一直在做的项目，聊聊我们为什么持续研究 Agent 的开发方式。
-->

---
title: 过往演讲
class: px-22!
glowSeed: 203
---
<!-- slide:A3 -->

<div class="grid grid-cols-2 gap-4">
  <div
    v-for="index in 4"
    :key="index"
    class="group relative h-51 overflow-hidden rounded-xl bg-black"
  >
    <img
      :src="`/previous-talks/session-${index}.png`"
      :alt="`Neko 的过往演讲 ${index}`"
      class="h-full w-full object-cover transition duration-250 group-hover:opacity-45 group-hover:grayscale"
    />
    <img
      :src="`/previous-talks/session-${index}-qr.png`"
      :alt="`过往演讲 ${index} 的二维码`"
      class="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 opacity-0 transition duration-250 group-hover:opacity-100"
    />
  </div>
</div>

<!--
[Neko] 在 AIRI 之前，我陆续做过一些关于 LLM、Kubernetes 和 Agent 工程实践的分享。这些探索最后汇到了一起，就是 Project AIRI。我们不只是想做一个能对话的 AI，而是希望把 AI 角色真正放进真实场景里，同时让 Agent 的开发过程更像平常写软件。
-->

---
class: py-10 text-center
glow: center
glowSeed: 318
---
<!-- slide:A4 -->

<h1 class="font-rounded">Project AIRI</h1>

<div class="mb-5 text-white/62">尝试重现 Neuro-sama：装载 AI 角色灵魂的开源容器</div>

<img :src="'/airi/airi-screenshot-2.png'" alt="Project AIRI 项目主页" class="mx-auto w-[48rem] rounded-xl" />

<!--
[Neko] Project AIRI 是一个开源的 AI 虚拟伙伴项目。它不只是回答问题，而是有角色、有实时语音、能调用工具，还能进到游戏和虚拟世界里。
-->

---
class: py-10 relative text-center
glow: center
---
<!-- slide:A5 -->

<h1 class="font-rounded">Project AIRI</h1>

<img :src="'/airi/airi-github-qr.png'" alt="Project AIRI GitHub 二维码" class="absolute bottom-7 left-9 z-1 w-38 rounded-lg" />
<img :src="'/airi/airi-screenshot-1.png'" alt="Project AIRI 开发界面" class="mx-auto mt-5 w-[48rem] rounded-xl" />

<!--
[Neko] AIRI 的代码、桌面端和角色运行环境都在 GitHub 上开源了。现在它已经可以实时对话，也能进入 Minecraft、Factorio 这类游戏里。今天我们要聊的 Context 怎么组织、Benchmark 怎么做，其实都是从这种真实项目里遇到的问题。
-->

---
layout: center
class: text-center
glow: full
glowSeed: 42792
---
<!-- slide:A6 -->

<div class="i-mdi-github mx-auto mb-8 text-7xl text-white/72" />
<NumberIncreaser :value="42792" class-name="text-8xl font-bold tracking-tight text-white" />
<div class="mt-4 text-3xl text-white/78">GitHub Stars</div>
<div class="mt-8 font-mono text-sm text-white/42">github.com/moeru-ai/airi · 2026-07-18</div>

<!--
[Neko] 截至 2026 年 7 月 18 日，Project AIRI 在 GitHub 上已经拿到了 42,792 颗星。这个数字肯定还会变，但它至少说明一件事：我们今天聊的不是一个只活在 PPT 里的概念项目。接下来交给洛灵，从我们最开始写 Agent 的样子讲起，看看 Prompt 是怎么慢慢变成 Context 的。
-->

---
layout: default
class: flex flex-col
clicks: 2
glow: right
glowOpacity: 0.28
---

<!-- slide:B0 -->

# 让我们从 Prompt 开始吧

<div class="mt-2 text-lg text-white/55">告诉模型角色、目标和约束，再给它可以调用的工具。</div>

<div class="mt-9 grid grid-cols-[1.45fr_1fr] items-center gap-8">

```ts
await generateText({
  model,
  system: 'You are a helpful assistant.',
  prompt: userMessage,
  tools: { search, shell },
})
```

<div class="flex flex-col gap-4">
  <div v-click="1" class="rounded-xl bg-blue-400/8 p-5">
    <div class="font-mono text-sm text-blue-300">Prompt</div>
    <div class="mt-2 text-white/72">把角色和任务写得更清楚</div>
  </div>
  <div v-click="2" class="rounded-xl bg-amber-400/8 p-5">
    <div class="text-sm text-amber-300">效果不稳定？</div>
    <div class="mt-2 text-white/72">第一反应：再改好一点 Prompt</div>
  </div>
</div>

</div>

<!--
[洛灵] 不管是 AIRI，还是大家第一次写 Agent，一开始都差不多：选一个模型，写一段 system prompt，把用户输入丢给它，再加几个工具。

[click] 一开始我们肯定会努力把角色、目标、限制写清楚。[click] 效果不好怎么办呢？那就继续改 Prompt 吧。但问题是，事情真有那么简单吗？
-->

---
class: p0
glow: bottom
---

<!-- slide:B1 -->

<div>

# 过往一段时间里有什么火呢？

</div>

<div class="grid grid-cols-2 gap-4 h-[calc(100%-5.25rem)]">
  <div ma flex="~ col gap-2 items-center">
    <img :src="'/ce-anthropic-2.png'" alt="Anthropic 的 Agent Context 构成示意图" w-80 rounded-xl />
  </div>
  <div border="l main" h-full py5 flex="~ col gap-6 justify-center">
    <div flex="~ gap-2" relative v-click>
      <div i-mingcute:message-4-fill text-cyan-300 text-4xl ml--4.5 />
      <div flex="~ col gap-1"><div text-xl>Prompt Engineering</div><div op50>设计提示词的内容与结构</div></div>
    </div>
    <div flex="~ gap-2" relative v-click>
      <div i-mingcute:search-fill text-blue-300 text-4xl ml--4.5 />
      <div flex="~ col gap-1"><div text-xl>RAG</div><div op50>把检索结果加入模型输入</div></div>
    </div>
    <div flex="~ gap-2" relative v-click>
      <div i-mingcute:align-center-fill text-lime-300 text-4xl ml--4.5 />
      <div flex="~ col gap-1"><div text-xl>Context Engineering</div><div op50>组织历史消息、记忆和工具结果</div></div>
    </div>
    <div flex="~ gap-2" relative v-click>
      <div i-mingcute:toy-horse-fill text-amber-300 text-4xl ml--4.5 />
      <div flex="~ col gap-1"><div text-xl>Harness Engineering</div><div op50>协调运行循环、工具调用和反馈</div></div>
    </div>
    <div flex="~ gap-2" relative v-click>
      <div i-mingcute:refresh-2-line text-purple-300 text-4xl ml--4.5 />
      <div flex="~ col gap-1"><div text-xl>Loop Engineering</div><div op50>循环反馈，自迭代</div></div>
    </div>
  </div>
</div>

<!--
[洛灵]
随着 Agent 开始运行，模型获得的输入会变得越来越多。

这个增长过程其实可以拆分成几个阶段。

[click] 最开始是 Prompt Engineering，就是把角色、目标和约束写清楚。

[click] 然后加上 RAG，把文档和检索结果也塞进去。

[click] 再往后，历史消息、记忆和工具返回的结果都要组织起来。关注点就从一句 Prompt 变成了整个 Context。

[click] 外面是 Harness Engineering，负责协调运行循环、工具调用和反馈。

[click] 到现在又有了 Loop Engineering：不只是跑一个循环，而是把反馈也接回来，让 Agent 自己迭代。到这儿，效果好不好已经不是某一句提示词能决定的了。
-->

---
class: flex flex-col
clicks: 8
---

<!-- slide:B2 -->

# 看起来 Harness 中 Context Engineering 依然重要

<ContextSources :clicks="$clicks" />

<!--
[洛灵] 那 Context 里到底装了什么呢？模型每次调用的时候，这一刻需要的所有信息，都得塞进同一个 Context Window 里。

[click] 首先是 System Prompt，定义一下 Agent 是谁、基本规则是什么。

[click] 然后是用户这次的输入。

[click] 为了上下文连贯，还得带上历史消息。

[click] 如果需要外部知识，就再加检索结果和长期记忆。

[click] Agent 要行动，还得知道有哪些工具、参数长什么样。

[click] Skill 会补充某类任务的做法和约束。

[click] 当前步骤、计划和工具的返回值，这些又一直在变。

[click] Context 一长，真正的难点就变成了：选什么内容放进去、按什么顺序编排、什么时候重新整理。
-->

---
layout: default
---
<!-- slide:B3 -->
# 这些 Context 最终都要组装成发给模型的消息

```ts {*|3-5|8-14|8,11,14|15-19}{maxHeight:'340px'}
return {
  break: true,
  result: ''
    + 'You choose to read the messages from the group (perhaps you are already engaging the topics in the group).'
    + 'Imaging you are using Telegram app on the mobile phone, and you are reading the messages from the group chat.'
    + '\n'
    + 'Previous 30 messages (including what you said):\n'
    + `${lastNMessagesOneliner || 'No messages'}`
    + '\n'
    + 'All the messages you requested to read:\n'
    + `${unreadHistoryMessageOneliner || 'No messages'}`
    + '\n'
    + 'Relevant chat messages may help you recall the memories:\n'
    + `${relevantChatMessagesOneliner || 'No relevant messages'}`
    + '\n'
    + 'Feel free to ignore by just sending an empty array within a object with key "messages" (i.e.'
    + '{ "messages": [] }).'
    + 'If you would like to participate, send me an array of messages (i.e. { "messages": [] }) you would '
    + 'like to send without telling you willing to participate.'
    + '\n'
    + 'Choose your action.',
}
```

<div v-click class="mt-4 text-center text-white/55">即使把内容拆成文件，最终仍要靠字符串拼成一条消息。</div>

<!--
[洛灵]
我们直接拿真实项目来看。这是一个 Telegram 聊天机器人的代码：所有 Context 最后都要变成发给模型的 messages，而这里选择了直接拼字符串。

[click] 开头先用自然语言告诉 Agent 现在要做什么。

[click] 中间加上历史消息、未读消息和相关记忆。

[click] 但你看，动态变量、默认值、换行符全混在一起，文本结构已经很难一眼看清楚了。

[click] 最后还要补输出格式和行动约束。少一个空格、少一个换行、默认值写错，都要到运行时才可能发现。

[click] 就算把内容拆到不同文件里，最后还是要拼回一条消息。
-->

---
clicks: 2
class: flex justify-center items-center gap-20 px40 text-xl
---
<!-- slide:B3a -->

<h1 text-4xl absolute :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
transition duration-500 ease-in-out>
  我们需要的，只是更好的 Prompt 吗？
</h1>

<div flex flex-col items-center>

<v-clicks>

<div mt-20>

<h1 flex items-center text="6xl!">
  <img :src="'/ecosystem/velin-logo.svg'" alt="Velin logo" class="mr-4 h-18 w-18" />
  <span>Velin</span>
</h1>

</div>

<div text-base mt-16 text-white:65>
  <span>用 Vue 组件组织持续变化的 Context</span>
</div>

</v-clicks>

</div>

<!--
[洛灵] 所以问题就来了：我们需要的，只是更好的 Prompt 吗？到这儿应该能感觉到，光有 Prompt 已经不够了——这些一直变来变去的内容，得有一种更可靠的组织方式。

[click] Velin 的做法，是把 Vue 里熟悉的组件模型拿过来组织 Context。[click] 我们还是用组件、Props、条件渲染、响应式更新，把模型最后收到的那条消息变成一次明确、可检查的渲染结果。
-->

---
class: flex flex-col
glow: right
glowOpacity: 0.28
---
<!-- slide:B4 -->
# Vue 已经提供了组织动态内容所需的能力

<div class="grid gap-2 mt-5">
  <div v-click class="grid grid-cols-[12rem_2rem_1fr] items-center gap-3 min-h-12 px-3 py-2">
    <div class="flex items-center gap-2 text-base"><span class="i-mdi-format-text-variant-outline text-xl" />组织文本结构</div>
    <span class="i-mingcute:arrow-right-line text-white/26 text-2xl" />
    <code>template</code>
  </div>
  <div v-click class="grid grid-cols-[12rem_2rem_1fr] items-center gap-3 min-h-12 px-3 py-2">
    <div class="flex items-center gap-2 text-base"><span class="i-mdi-shield-check-outline text-xl" />声明动态输入</div>
    <span class="i-mingcute:arrow-right-line text-white/26 text-2xl" />
    <code>defineProps</code>
  </div>
  <div v-click class="grid grid-cols-[12rem_2rem_1fr] items-center gap-3 min-h-12 px-3 py-2">
    <div class="flex items-center gap-2 text-base"><span class="i-mdi-content-copy text-xl" />复用 Context 片段</div>
    <span class="i-mingcute:arrow-right-line text-white/26 text-2xl" />
    <code>component / import</code>
  </div>
  <div v-click class="grid grid-cols-[12rem_2rem_1fr] items-center gap-3 min-h-12 px-3 py-2">
    <div class="flex items-center gap-2 text-base"><span class="i-mdi-source-branch text-xl" />按条件插入内容</div>
    <span class="i-mingcute:arrow-right-line text-white/26 text-2xl" />
    <code>v-if</code>
  </div>
  <div v-click class="grid grid-cols-[12rem_2rem_1fr] items-center gap-3 min-h-12 px-3 py-2">
    <div class="flex items-center gap-2 text-base"><span class="i-mdi-refresh-auto text-xl" />输入变化后重新渲染</div>
    <span class="i-mingcute:arrow-right-line text-white/26 text-2xl" />
    <code>reactivity</code>
  </div>
</div>

<div v-click class="mt-auto pb-6 text-center text-white/55 font-mono">prompt = f(context)</div>

<!--
[洛灵]
Velin 没有让我们去学一套全新的组织方式，而是直接用 Vue 已经有的能力。

[click] 模板用来表达文本结构。

[click] Props 声明每个 Context 片段需要什么输入。

[click] 组件和 import 负责拆分、组合、复用。

[click] v-if 决定某段内容在什么条件下才放进 Context。

[click] 输入一变，响应式系统就重新生成结果。

[click] 把 Context 当成输入，最终的 Prompt 就是一次明确的渲染：prompt 是 context 的函数。
-->

---
layout: default
class: flex flex-col
---
<!-- slide:B5 -->
# 把 Context 写成 Vue 组件

<div class="text-xl opacity-60 pb-3">字符串 → 独立组件 → 有类型的调用</div>

<div class="mt-6 context-component-evolution">

````md magic-move {at:1, duration:850}
```ts
// read-message.ts（旧版）:prompt 埋在业务代码里
result: ''
  + 'You choose to read the messages from the group...'
  + '\n'
  + 'Previous 30 messages (including what you said):\n'
  + `${lastNMessagesOneliner || 'No messages'}`
  + '\n'
  + 'All the messages you requested to read:\n'
  + `${unreadHistoryMessageOneliner || 'No messages'}`
  + '\n'
  + 'Relevant chat messages may help you recall the memories:\n'
  + `${relevantChatMessagesOneliner || 'No relevant messages'}`
```

```velin
<!-- action-read-messages.velin.md:prompt 是一个独立文件 -->
<script setup lang="ts">
const props = defineProps<{
  lastMessages?: string
  unreadHistoryMessages?: string
  relevantChatMessages?: string
}>()
</script>

You choose to read the messages from the group...

Previous 30 messages (including what you said):
{{ props.lastMessages || 'No messages' }}

All the messages you requested to read:
{{ props.unreadHistoryMessages || 'No messages' }}

Relevant chat messages may help you recall the memories:
{{ props.relevantChatMessages || 'No relevant messages' }}
```

```ts
// 调用侧：业务代码里只剩一个有类型的函数调用
result: await actionReadMessages({
  lastMessages: lastNMessagesOneliner,
  unreadHistoryMessages: unreadHistoryMessageOneliner,
  relevantChatMessages: relevantChatMessagesOneliner,
})
```
````

</div>

<!--
[洛灵]
回到刚才那个 Telegram 机器人，我们把这段拼字符串的代码改造成 Vue 组件。

[click] 先把业务代码里的长字符串挪到 `.velin.md` 文件，动态内容用 Props 声明。

[click] 调用侧就只剩一个有类型的函数调用。代码表达的意思没变，但文本结构和输入边界都清楚多了。
-->

---
layout: default
class: flex flex-col
---
<!-- slide:B6 -->
# Skill 也可以写成组件

<div class="mt-10">

````md magic-move {at:1}
```velin
<script setup lang="ts">
import Persona from './persona.velin.md'
</script>

<Persona />
```

```velin
<script setup lang="ts">
import Persona from './persona.velin.md'
import ActionReadMessages from './action-read-messages.velin.md'
</script>

<Persona />
<ActionReadMessages />
```

```velin
<script setup lang="ts">
import Persona from './persona.velin.md'
import ActionReadMessages from './action-read-messages.velin.md'
import ReplyFormat from './reply-format.velin.md'
</script>

<Persona />
<ActionReadMessages />
<ReplyFormat />
```
````

</div>

<!--
[洛灵]
同一份 Context 通常还要组合人设、行动说明、回复格式——这些就是我们说的 Skill。在 Velin 里，Skill 也是组件，直接用 import 引进来，像搭积木一样拼起来就行。需要新增或替换一段内容时，也不用回到一个更长的字符串里去改。
-->

---
clicks: 3
---
<!-- slide:B7 -->
# 修改 Props，最终 Context 随之更新

<div class="text-sm opacity-50 pb-3">左侧编写组件，中间预览结果，右侧调整 Props。</div>

<div class="relative">
  <img :src="'/velin-playground-crop.png'" alt="Velin Playground 的源码、Prompt 与 Props 三栏界面" class="rounded-lg" />
  <div v-mark="{ at: 1, type: 'box', color: '#60a5fa' }" class="absolute left-[4.8%] top-[2.5%] h-[96%] w-[36.5%]">
    <span v-click="1" class="absolute left-2 top-2 rounded-xl bg-blue-500/50 px-3 py-1 text-xs">source</span>
  </div>
  <div v-mark="{ at: 2, type: 'box', color: '#34d399' }" class="absolute left-[43.4%] top-[2.5%] h-[38%] w-[31%]">
    <span v-click="2" class="absolute left-2 top-2 rounded-xl bg-emerald-500/50 px-3 py-1 text-xs">result</span>
  </div>
  <div v-mark="{ at: 3, type: 'box', color: '#c084fc' }" class="absolute left-[75.2%] top-[2.5%] h-[35%] w-[23.5%]">
    <span v-click="3" class="absolute left-2 top-2 rounded-xl bg-purple-500/50 px-3 py-1 text-xs">props</span>
  </div>
</div>

<!--
[洛灵]
Playground 把源码、渲染结果和 Props 放在同一个界面里。

[click] 左边这一栏是组件源码。[click] 中间是渲染出来的 Prompt。[click] 右边可以直接调 Props。改一下右边的输入，中间的 Context 就会重新渲染，能直接预览这组 Props 对应的排版和条件渲染结果。
-->

---
clicks: 4
class: flex flex-col justify-center items-center px-24
---
<!-- slide:B7a -->

<h1 class="text-4xl text-center">
  原生支持主流生态
</h1>

<div class="mt-18 flex w-full items-center justify-center gap-16">
  <div v-click="1" class="flex h-26 w-26 items-center justify-center transition duration-500 ease-in-out">
    <div class="i-simple-icons:vuedotjs text-7xl text-[#42b883]" />
  </div>
  <div v-click="2" class="flex h-26 w-26 items-center justify-center transition duration-500 ease-in-out">
    <div class="i-simple-icons:react text-7xl text-[#61dafb]" />
  </div>
  <div v-click="3" class="flex h-26 w-26 items-center justify-center transition duration-500 ease-in-out">
    <div class="i-simple-icons:markdown text-7xl text-white/85" />
  </div>
  <div v-click="4" class="flex h-26 w-26 items-center justify-center transition duration-500 ease-in-out">
    <div class="i-simple-icons:mdx translate-y-1 text-8xl text-[#f9ac00]" />
  </div>
</div>

<!--
[洛灵]
Velin 不要求大家离开熟悉的组件生态。Vue 和 React 都能直接当原生组件模型用；如果你们团队更习惯把内容写在 Markdown 里，也可以选 Vue Markdown 或者 MDX。
-->

---
clicks: 3
class: flex justify-center items-center gap-20 px-40 text-xl
glowSeed: 5830
---
<!-- slide:B7b -->

<h1 text-4xl absolute :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
transition duration-500 ease-in-out>
  只能在浏览器和前端用吗？
</h1>

<div flex flex-col items-center>

<div mt-20 flex items-center gap-18>
  <div v-click="1" flex flex-col items-center gap-5 transition duration-500 ease-in-out>
    <div class="i-logos:chrome text-7xl" />
  </div>
  <div v-click="2" flex flex-col items-center gap-5 transition duration-500 ease-in-out>
    <div class="i-logos:nodejs-icon-alt text-7xl" />
  </div>
  <div v-click="3" flex flex-col items-center gap-5 transition duration-500 ease-in-out>
    <div class="i-unjs:nitro text-7xl text-white/90" />
  </div>
</div>

<div
  text-base mt-16 text-white:65 transition duration-500 ease-in-out
  :class="$clicks < 1 ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'"
>
  <span>浏览器环境直接使用 Web Runtime；Node.js 与 Edge 环境则通过 SSR（server-rendering）完成渲染。</span>
</div>

</div>

<!--
[洛灵]
那它只能在浏览器和前端用吗？也不是。

[click] 浏览器里可以直接用 Web Runtime。[click] 到了 Node.js 环境，就通过 SSR，也就是 server-rendering 的方式来渲染。[click] Edge 环境里，Nitro 这类运行时也能承接 SSR，同一套组件表达可以跑在不同地方。所以重点不是前端页面，而是组件化描述和渲染 runtime 可以放到哪去执行。
-->

---
layout: default
class: flex flex-col
---
<!-- slide:B8 -->
# 在实际项目中组织 Prompt

<div class="mt-6 pb-2 text-white/70">
  Cahciua ·
  <a href="https://github.com/Menci/Cahciua" class="text-white/70">github.com/Menci/Cahciua</a>
  · <code>prompts/</code>
</div>

```
prompts/
├── system.velin.md
├── late-binding.velin.md
├── compaction-late-binding.velin.md
├── …
├── image-to-text-system.velin.md
├── sticker-animation-to-text-system.velin.md
└── custom-emoji-to-text-system.velin.md
```

<div class="mt-auto grid grid-cols-3 gap-4 pb-6 text-sm">
  <div v-click class="p-4 rounded-xl bg-green-500/10">
    <div class="text-green-300 font-mono">system</div>
    <div class="opacity-70 pt-1">组织系统说明</div>
  </div>
  <div v-click class="p-4 rounded-xl bg-blue-500/10">
    <div class="text-blue-300 font-mono">late-binding</div>
    <div class="opacity-70 pt-1">注入运行时内容</div>
  </div>
  <div v-click class="p-4 rounded-xl bg-purple-500/10">
    <div class="text-purple-300 font-mono">*-to-text</div>
    <div class="opacity-70 pt-1">将多模态输入转成文本</div>
  </div>
</div>

<!--
[洛灵]
这是 Cahciua 项目里 `prompts/` 目录的节选。

[click] 系统说明放在 `system` 组件里，[click] 运行时要注入的内容放在 `late-binding`，[click] 还有一组 `*-to-text`，负责把多模态输入转成文本。项目变大以后，你还是能按职责找到对应的 Prompt 去改。

Source: https://github.com/Menci/Cahciua
-->

---
layout: default
glowSeed: 2494583128848484862562
---
<!-- slide:B9 -->
# 那我们一起开发一个 Agent 吧！

````md magic-move {at:1}
```ts
import SystemPrompt from './system-prompt.velin.md'
import { renderComponent } from '@velin-dev/core-vue/render-node'

const systemPrompt = await renderComponent(SystemPrompt, {})
```

```ts
import SystemPrompt from './system-prompt.velin.md'
import { renderComponent } from '@velin-dev/core-vue/render-node'
import { generateText } from '@xsai/generate-text'
import { message } from '@xsai/utils-chat'
import { baseURL, apiKey, model } from './client'

const systemPrompt = await renderComponent(SystemPrompt, {})

await generateText({
  baseURL,
  apiKey,
  model,
  messages: [message.system(systemPrompt)],
})
```

```ts
import SystemPrompt from './system-prompt.velin.md'
import { renderComponent } from '@velin-dev/core-vue/render-node'
import { generateText } from '@xsai/generate-text'
import { rawTool } from '@xsai/tool'
import { message } from '@xsai/utils-chat'
import { shellTool } from './tools/shell'
import { baseURL, apiKey, model } from './client'

const systemPrompt = await renderComponent(SystemPrompt, {})

await generateText({
  baseURL,
  apiKey,
  model,
  messages: [message.system(systemPrompt)],
  tools: [rawTool(shellTool)],
})
```

```ts
import SystemPrompt from './system-prompt.velin.md'
import { renderComponent } from '@velin-dev/core-vue/render-node'
import { generateText } from '@xsai/generate-text'
import { rawTool } from '@xsai/tool'
import { message } from '@xsai/utils-chat'
import { shellTool } from './tools/shell'
import { stepCountAtLeast } from '@xsai/generate-text/shared-chat'
import { baseURL, apiKey, model } from './client'

const systemPrompt = await renderComponent(SystemPrompt, {})

await generateText({
  baseURL,
  apiKey,
  model,
  messages: [message.system(systemPrompt)],
  tools: [rawTool(shellTool)],
  stopWhen: stepCountAtLeast(20),
})
```
````

<!--
[Neko]
Velin 的工作到这儿就结束了：组件渲染成 system message，然后交给 Agent。再搭配上模型、工具和停止条件，同一份消息就会进入多轮执行。下一部分我们就从这个循环继续往下看。
-->

---
layout: default
class: flex flex-col
clicks: 4
glowOpacity: 0.4
---
<!-- slide:C1 -->
# Agent 如何一步步完成任务

<div class="mt-8 text-sm text-white/45">渲染后的 messages 会与 model 和 tools 一起交给 Agent 循环</div>

<div class="mt-24 flex items-center justify-center gap-3 font-mono text-lg">
  <div v-click="1" class="flex items-center gap-2 text-blue-300">
    <span class="i-ph-brain text-3xl" />
    <span>model</span>
  </div>
  <span v-click="2" class="i-ph-arrow-right text-white/30" />
  <div v-click="2" class="flex items-center gap-2 text-yellow-300">
    <span class="i-ph-wrench text-3xl" />
    <span>tool call</span>
  </div>
  <span v-click="3" class="i-ph-arrow-right text-white/30" />
  <div v-click="3" class="flex items-center gap-2 text-green-300">
    <span class="i-ph-terminal-window text-3xl" />
    <span>tool result</span>
  </div>
  <span v-click="4" class="i-ph-arrow-right text-white/30" />
  <div v-click="4" class="flex items-center gap-3">
    <span class="text-blue-300">model</span>
    <span class="i-ph-arrow-right text-white/30" />
    <span class="text-purple-300">answer</span>
  </div>
</div>

<div v-click="4" class="mt-auto pb-6 text-center text-white/55">
  工具结果会写回 messages；模型随后决定继续调用工具，或给出最终回答。
</div>

<!--
[Neko]
Velin 把 Context 渲染成 messages，接下来就进入 Agent 的运行过程。模型根据当前消息选工具，工具执行完把结果写回 messages，然后模型再决定下一步。这个循环一直持续到模型给出最终回答，或者触发了停止条件。

同一个任务再跑一遍，这条路径不一定完全一样。模型可能选不同的工具，也可能调用次数不同。
-->

---
layout: default
clicks: 3
---
<!-- slide:C2 -->
# 重复运行同一个任务，会得到不同的结果

<AgentSamplingLab :clicks="$clicks" />

<!--
[Neko]
只跑一两次的时候，我们看到的只是个别结果，很难判断 Agent 整体表现怎么样。

[click] 把次数加到 10 次，结果开始散开。[click] 加到 50 次，局部轮廓慢慢显现。[click] 到 200 次，哪些区域稳定、哪些区域容易波动，才更容易看出来。

这里不用记什么统计指标。关键是：单次结果不足以代表这个 Agent。
-->

---
layout: default
class: py-10 flex flex-col
clicks: 6
---
<!-- slide:C3 -->

<div flex>
  <div flex-1>
    <h1 mb="0!">用重复抽样观察整体表现</h1>
    <span text="sm white/50 nowrap">蒙特卡罗方法提供了一种简单的观察方式</span>
  </div>
  <div flex items-center text-4xl>
    <div i-ph:dice-five mr-2 />
    <span font-normal>Monte Carlo</span>
  </div>
</div>

<div v-click="1" class="mt-14">

Wikipedia:

> Monte Carlo methods are “<span v-mark="{ at: 2, color: 'rgb(144, 200, 255)', type: 'underline' }">based on repeated random sampling for obtaining numerical results</span>.”<sup><a href="https://en.wikipedia.org/wiki/Monte_Carlo_method">[1]</a></sup>

</div>

<div v-click="3" class="mt-12 text-xl leading-10 text-white/75">
  对 Agent 进行评测时，可以<span v-mark="{ at: 4, color: 'rgb(144, 200, 255)', type: 'underline' }">重复运行</span>同一个任务，<span v-mark="{ at: 5, color: 'rgb(144, 200, 255)', type: 'underline' }">记录每次结果</span>，再从这些样本中<span v-mark="{ at: 6, color: 'rgb(144, 200, 255)', type: 'underline' }">观察</span>整体表现。
</div>

<div class="mt-auto pb-2 text-xs text-white/45">
  <a href="https://en.wikipedia.org/wiki/Monte_Carlo_method">[1] Monte Carlo method — Wikipedia</a>
</div>

<!--
[Neko]
蒙特卡罗方法的定义很宽，这里只借用最朴素的一个直觉：通过重复随机抽样拿到一组结果。

对应到 Agent，就是固定任务和运行条件，重复执行、记录结果，再汇总这些样本。我们不展开公式，也不要求大家记住指标；这一页只是想说明，为什么后面需要 Benchmark。
-->

---
layout: default
clicks: 7
---
<!-- slide:D1 -->
# 不同的 Benchmark 关注不同能力

<div class="grid grid-cols-[1.5fr_1fr] gap-10 pt-3 h-94">
  <div class="relative min-h-0">
    <img
      v-click="1"
      :src="'/benchmarks/qwen3.5-397b-a17b-benchmarks.png'"
      alt="Qwen3.5 模型卡中的 Benchmark 表格"
      class="absolute inset-0 m-auto max-h-82 max-w-full shadow-xl transition-all duration-400 rounded-xl"
      :class="$clicks > 1 ? 'scale-95 -translate-x-4 opacity-25' : 'opacity-100'"
    >
    <img
      v-click="2"
      :src="'/benchmarks/seed2.0-model-card-benchmarks.png'"
      alt="Seed2.0 模型卡中的 Benchmark 表格"
      class="absolute inset-0 m-auto max-h-82 max-w-full shadow-xl transition-all duration-400 rounded-xl"
      :class="$clicks > 2 ? 'scale-97 translate-x-3 opacity-30' : 'opacity-100'"
    >
    <img
      v-click="3"
      :src="'/benchmarks/deepseek-v3.2-report-benchmarks.png'"
      alt="DeepSeek-V3.2 技术报告中的 Benchmark 表格"
      class="absolute inset-0 m-auto max-h-82 max-w-full shadow-xl rounded-xl"
    >
  </div>

  <div class="border-l border-white/15 flex flex-col gap-7 justify-center">
    <div v-click="4" class="flex items-center gap-3 -ml-2">
      <span class="h-4 w-4 rounded-full bg-blue-300" />
      <span class="text-xl">知识与推理</span>
    </div>
    <div v-click="5" class="flex items-center gap-3 -ml-2">
      <span class="h-4 w-4 rounded-full bg-green-300" />
      <span class="text-xl">代码</span>
    </div>
    <div v-click="6" class="flex items-center gap-3 -ml-2">
      <span class="h-4 w-4 rounded-full bg-yellow-300" />
      <span class="text-xl">指令遵循</span>
    </div>
    <div v-click="7" class="flex items-center gap-3 -ml-2">
      <span class="h-4 w-4 rounded-full bg-purple-300" />
      <span class="text-xl">Agent 与工具使用</span>
    </div>
  </div>
</div>

<!--
[Neko]
模型报告通常会同时列出好几组 Benchmark，因为每组关注的能力不一样：有的看知识和推理，有的看代码、指令遵循，或者 Agent 的工具使用。

这里我们不逐个解释 Benchmark 的名字，也不横向比较不同报告的分数。只要记住一件事：你想观察什么能力，就要准备对应的任务和判定方式。
-->

---
layout: default
class: flex flex-col
clicks: 4
---
<!-- slide:D2 -->
# 一个 Benchmark，只需要三步

<div class="mt-28 flex items-center justify-center gap-4 text-xl">
  <div v-click="1" class="flex flex-1 items-center justify-center gap-2 whitespace-nowrap">
    <span class="i-ph-file-arrow-up text-4xl text-blue-300" />
    <span>给 Agent 一个输入</span>
  </div>
  <span v-click="2" class="i-ph-arrow-right shrink-0 text-white/30" />
  <div v-click="2" class="flex flex-1 items-center justify-center gap-2 whitespace-nowrap">
    <span class="i-ph-play-circle text-4xl text-green-300" />
    <span>运行待测 Agent</span>
  </div>
  <span v-click="3" class="i-ph-arrow-right shrink-0 text-white/30" />
  <div v-click="3" class="flex flex-1 items-center justify-center gap-2 whitespace-nowrap">
    <span class="i-ph-check-circle text-4xl text-yellow-300" />
    <span>用函数检查结果</span>
  </div>
</div>

<div v-click="4" class="mt-auto pb-6 text-center text-4xl text-purple-200">
  这就是一个最小的 Benchmark。
</div>

<!--
[Neko]
先给 Agent 一个具体输入，然后把它当成一个已有的黑盒去跑，最后用函数检查结果。检查可以返回布尔值、数字，或者更具体的评分。

这三步已经构成一个最小的 Benchmark。重复运行和汇总结果，都是在这个基础上再增加的能力。
-->

---
layout: default
class: py-10 flex flex-col
glow: right
clicks: 6
---
<!-- slide:D3 -->
# MCPMark：健壮的 MCP 强化学习环境

<span>让 Agent 在真实应用环境中完成任务，再用程序检查环境状态</span>

<div class="mt-10 grid grid-cols-[24rem_1fr] gap-12">
  <div v-click="1">
    <img
      :src="'/mcpmark/mcpmark-overview.png'"
      alt="MCPMark 项目概览"
      class="w-full rounded-xl"
    >
    <a href="https://github.com/eval-sys/mcpmark" class="mt-3 flex items-center justify-center gap-2 text-sm text-white/60 no-underline">
      <span class="i-ri:github-fill" />
      <span>eval-sys/mcpmark</span>
    </a>
  </div>

  <div class="flex flex-col justify-center gap-4 text-xl">
    <div v-click="2" class="flex items-center gap-3">
      <span class="i-carbon:chevron-up text-green-300" />
      <span><span class="text-green-300">127</span> 个任务</span>
    </div>
    <div v-click="3" class="flex items-center gap-3">
      <span class="i-carbon:chevron-up text-green-300" />
      <span><span class="text-blue-300">38</span> 组初始环境状态</span>
    </div>
    <div v-click="4" class="flex items-center gap-3">
      <span class="i-carbon:chevron-up text-green-300" />
      <span><span class="text-yellow-300">5</span> 类 MCP 服务环境</span>
    </div>
    <div v-click="5" class="flex items-center gap-3">
      <span class="i-carbon:chevron-up text-green-300" />
      <span>用程序检查任务完成后的环境状态</span>
    </div>
  </div>
</div>

<div v-click="6" class="mt-auto pb-6 flex items-center gap-3 text-sm text-white/55">
  <span class="i-ph-users-three text-green-300" />
  <span>共同第一作者、维护者 · <a href="https://openreview.net/forum?id=uobROwBsJm" class="text-white/55 no-underline">ICLR 2026 Poster</a></span>
  <a href="https://arxiv.org/abs/2509.24002" class="text-white/45 no-underline">arXiv:2509.24002</a>
</div>

<!--
[Neko]
MCPMark 是我们实际参与构建的 Agent Benchmark。它把 127 个任务放进五类真实的 MCP 环境里，还为任务准备了 38 个初始状态。Agent 完成多步工具调用后，评测程序会直接检查环境状态，而不只是判断最终回答的文字。

我是 MCPMark 的共同第一作者和维护开发者。这些项目和论文信息主要是交代后面判断的实践来源，不需要在这儿展开论文内容。
-->

---
layout: default
class: flex flex-col
clicks: 4
---
<!-- slide:D4 -->
# MCPMark 已进入多份模型报告

<div class="mt-5 flex-1 border-l border-white/15">
  <div v-click="1" class="relative pl-8 pb-5">
    <span class="absolute -left-2 top-1 h-4 w-4 rounded-full bg-green-300" />
    <div class="grid grid-cols-[9rem_1fr] gap-5 items-baseline">
      <div class="text-lg">DeepSeek</div>
      <div>
        <div class="text-base">DeepSeek-V3.2 Technical Report <sup><a href="https://arxiv.org/abs/2512.02556" class="text-white/45 no-underline">[1]</a></sup></div>
        <div class="mt-1 text-sm text-white/55">在 ToolUse 评测中报告 MCP-Mark，并分别比较 thinking 与 non-thinking 模式。</div>
      </div>
    </div>
  </div>

  <div v-click="2" class="relative pl-8 pb-5">
    <span class="absolute -left-2 top-1 h-4 w-4 rounded-full bg-blue-300" />
    <div class="grid grid-cols-[9rem_1fr] gap-5 items-baseline">
      <div class="text-lg">Qwen</div>
      <div>
        <div class="text-base">
          Qwen3.5 / Qwen3.6 Model Cards
          <sup><a href="https://huggingface.co/Qwen/Qwen3.5-397B-A17B#benchmark-results" class="text-white/45 no-underline">[2]</a></sup>
          <sup><a href="https://huggingface.co/Qwen/Qwen3.6-35B-A3B-FP8" class="text-white/45 no-underline">[3]</a></sup>
        </div>
        <div class="mt-1 text-sm text-white/55">连续两代模型卡都使用 MCPMark 评测 Agent 的工具使用能力。</div>
      </div>
    </div>
  </div>

  <div v-click="3" class="relative pl-8 pb-5">
    <span class="absolute -left-2 top-1 h-4 w-4 rounded-full bg-purple-300" />
    <div class="grid grid-cols-[9rem_1fr] gap-5 items-baseline">
      <div class="text-lg">Moonshot AI</div>
      <div>
        <div class="text-base">Kimi K2.6 Model Card <sup><a href="https://huggingface.co/moonshotai/Kimi-K2.6" class="text-white/45 no-underline">[4]</a></sup></div>
        <div class="mt-1 text-sm text-white/55">使用 MCPMark 比较模型在真实 MCP 服务中的工具调用表现。</div>
      </div>
    </div>
  </div>

  <div v-click="4" class="relative pl-8">
    <span class="absolute -left-2 top-1 h-4 w-4 rounded-full bg-yellow-300" />
    <div class="grid grid-cols-[9rem_1fr] gap-5 items-baseline">
      <div class="text-lg">ByteDance Seed</div>
      <div>
        <div class="text-base">Seed2.0 Model Card <sup><a href="https://arxiv.org/abs/2607.00248" class="text-white/45 no-underline">[5]</a></sup></div>
        <div class="mt-1 text-sm text-white/55">在 Tool Use 部分报告 MCP-Mark，与其他工具使用 Benchmark 一起评测。</div>
      </div>
    </div>
  </div>
</div>

<div class="pb-3 text-xs text-white/42">
  补充：<a href="https://huggingface.co/moonshotai/Kimi-K2.7-Code" class="text-white/55 no-underline">Kimi K2.7 Code</a>
  使用经过人工复核的 MCPMark-Verified，需要与原版结果分开比较。
</div>

<!--
[Neko]
这里列的是模型方在自己的模型卡或技术报告里使用 MCPMark，不是 MCPMark 论文自己去评测了哪些模型。DeepSeek-V3.2、Qwen3.5、Qwen3.6、Kimi K2.6、Seed2.0 都在官方材料里报告过相关结果。

Kimi K2.7 Code 用的是经过人工复核的 MCPMark-Verified，评测配置和任务版本需要单独说明。其他报告里出现的 GPT、Claude 或 Gemini 可能只是对比基线，不能说这些模型自己的官方报告就采用了 MCPMark。

前面这些页面交代了为什么要重复评测，以及真实 Benchmark 是怎么设计的。接下来我们不继续聊 Benchmark 有多复杂，而是直接把它写出来。
-->

---
class: flex justify-center items-center gap-20 px40 text-xl
---

<!-- slide:E1 -->

<h1 text-4xl absolute :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
transition duration-500 ease-in-out>
  Benchmark 没有想象中复杂
</h1>

<div flex flex-col items-center>

<v-clicks>

<div mt-20>

<h1 flex items-center text="6xl!">
  <img :src="'/ecosystem/vieval-logo.svg'" alt="Vieval logo" class="mr-4 h-18 w-18" />
  <span font-vieval>Vieval</span>
</h1>

</div>

<div text-base mt-16 text-white:65>
  <span>用 TypeScript 测试的方式编写 Benchmark</span>
</div>

</v-clicks>

</div>

<!--
[Neko]
前面看过真实的 Benchmark 以后，这一页先把实现门槛放低。把 Agent 当成一个已经存在的函数：准备输入，调用它，再检查返回结果。这三个动作就构成一个最小的 Benchmark，后面的组织和统计都建立在这上面。

[click] Vieval 负责把这些检查组织起来。[click] 它沿用 TypeScript 测试的写法，让我们能直接用熟悉的函数、断言和编辑器工具。下一页先从一个只有几行代码的 Case 开始。
-->

---
class: py-10
glowSeed: 100
---

# 现在 Benchmark 的现状

<div mt-6 />

<div flex flex-col gap-4>

<v-clicks>

<div border="2 solid lime-800/50" rounded-lg>
  <div flex items-center bg="lime-800/30" px-3 py-2 text-lime-300>
    <div i-devicon:python text-sm mr-1 />
    <div text-xs>
      <em>Python-first benchmark stack</em>
    </div>
  </div>
  <div bg="lime-800/10" px-4 py-3>
    <div>
      大多数 Benchmark 都围绕 <span text="[#ffd43b]"><div inline-block mr-1 translate-y-0.8 i-devicon:python />Python</span> 环境组织：数据集、依赖、脚本、容器和评测入口都要跟着它走。
    </div>
    <div text-xs flex gap-2 mt-1 text-zinc-400>
      <div>依赖安装慢</div>
      <div>版本漂移</div>
      <div>CUDA / 浏览器 / 服务环境难复现</div>
    </div>
  </div>
</div>

<div border="2 solid amber-800/50" rounded-lg>
  <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-300>
    <div i-mingcute:brain-fill text-sm mr-1 />
    <div text-xs>
      <em>Environment and harness overhead</em>
    </div>
  </div>
  <div bg="amber-800/10" px-4 py-3>
    <div>
      越来越多用例需要真实环境和工具集成：会不会调用某个 CLI、能不能跑通 harness。
    </div>
    <div text-xs flex gap-2 mt-1 text-zinc-400>
      <div>工具链配置重</div>
      <div>Harness 维护复杂</div>
      <div>环境状态难复现</div>
    </div>
  </div>
</div>

<div border="2 solid orange-800/50" rounded-lg>
  <div flex items-center bg="orange-800/30" px-3 py-2 text-orange-300>
    <div i-mingcute:layout-grid-fill text-sm mr-1 />
    <div text-xs>
      <em>Academic benchmark and engineering are disconnected</em>
    </div>
  </div>
  <div bg="orange-800/10" px-4 py-3>
    <div>
      大多数 Benchmark 仍然偏学界，和工程里的业务流程和工作流脱节。
    </div>
    <div text-xs flex gap-2 mt-1 text-zinc-400>
      <div>学界任务偏多</div>
      <div>工程约束偏少</div>
      <div>很难放进日常 CI</div>
    </div>
  </div>
</div>

</v-clicks>

</div>

<!--
[Neko]
这里补一页背景。市面上当然有很多 Benchmark，而且很多都很严肃、覆盖能力也很完整。

[click] 但实际接入的时候，第一个门槛通常不是指标，而是环境。很多 Benchmark 默认就是 Python 栈，数据、脚本、依赖、容器都绑在一起。我们自己的业务如果主要写在 TypeScript 或者别的系统里，就要先把一整套 Python 环境跑起来。

[click] 另一个变化是，越来越多用例不是只看最终文本，而是要进入真实环境：会不会调用某个 CLI，能不能跑通 harness，工具集成之后外部状态有没有被正确改变。这些都让配置和复现成本变高。

[click] 最后是现有 Benchmark 和工程实践脱节的问题。很多 Benchmark 还是偏学界任务，和真实业务流程、工具封装、发布节奏接不上，也容易只观察某一类能力。所以 Vieval 想解决的是：让 Benchmark 可以贴着业务代码写，更容易进入日常开发流程。
-->

---
layout: default
class: flex flex-col
---

<!-- slide:E2 -->

# 从调用函数、检查结果开始

<div class="mt-12" />

````md magic-move {at:1}
```ts
import { analyzeEmotion } from './agent'

const result = await analyzeEmotion(
  'I am feeling very happy today!',
)
```

```ts
import { analyzeEmotion } from './agent'
import { expect } from 'vieval'

const result = await analyzeEmotion(
  'I am feeling very happy today!',
)

expect(result).toBe('happy')
```

```ts
import { caseOf, describeTask, expect } from 'vieval'
import { analyzeEmotion } from './agent'

describeTask('emotion analysis', () => {
  caseOf('happy message', async () => {
    const result = await analyzeEmotion(
      'I am feeling very happy today!',
    )

    expect(result).toBe('happy')
  })
})
```
````

<div v-click="3" class="mt-auto pb-6 text-center text-white/55">
  调用函数、检查结果，再把它记录成一个 Case。
</div>

<!--
[Neko]
这里继续把 Agent 当成已有的黑盒。第一段代码只做一件事：给情绪分类函数一个输入，拿到返回结果。评测代码不需要知道模型怎么选答案，也不需要接管 Agent 的初始化过程。

[click] 接着加一个最直接的断言。这段输入表达的是开心，所以正确标签应该是 `happy`。只检查结果是不是在某个枚举范围内，并不能判断分类对不对。如果需要语义判断，也可以把检查逻辑换成 LLM Judge。

[click] 最后用 `describeTask` 和 `caseOf` 给这次输入命个名。它还是同一次函数调用，只是现在可以被 Vieval 发现和运行。[click] 最小循环到这儿就完整了。下一页把返回值换成更常见的结构化数据。
-->

---
layout: default
---

<!-- slide:E3 -->

# 检查结构化信息提取结果

<div class="grid grid-cols-[1.55fr_1fr] gap-5 pt-1">

<div>

````md magic-move {at:1}
```ts
import { extractArticleMetadata } from './agent'

const result = await extractArticleMetadata(article)
```

```ts
import { expect } from 'vieval'
import { extractArticleMetadata } from './agent'

const result = await extractArticleMetadata(article)

expect(typeof result.title).toBe('string')
expect(typeof result.summary).toBe('string')
expect(Array.isArray(result.keywords)).toBe(true)
```

```ts
import { expect } from 'vieval'
import { extractArticleMetadata } from './agent'

const result = await extractArticleMetadata(article)

expect(typeof result.title).toBe('string')
expect(typeof result.summary).toBe('string')
expect(Array.isArray(result.keywords)).toBe(true)
expect(result.title).not.toHaveLength(0)
expect(result.summary).not.toHaveLength(0)
expect(result.keywords).toEqual(
  expect.arrayContaining(['reactivity', 'hydration']),
)
```

```ts
import { expect } from 'vieval'
import { evaluateAssertions, expectRubric } from 'vieval/core/assertions'
import { extractArticleMetadata } from './agent'

const result = await extractArticleMetadata(article)

const [coverage] = await evaluateAssertions([
  expectRubric({
    id: 'keyword-coverage',
    minScore: 0.8,
    judge: async ({ text }) => ({
      reason: 'Counts required topic keywords',
      score: ['reactivity', 'hydration']
        .filter(topic => text.includes(topic)).length / 2,
    }),
  }),
], { text: result.summary })

expect(coverage.score).toScoreRubricGreaterThan(0.8)
```
````

</div>

<aside class="rounded-xl bg-white/6 p-5 text-sm leading-6">
  <div class="mb-3 flex items-center justify-between">
    <span class="text-blue-300">article.txt</span>
    <a href="/vieval/article.txt" class="text-xs text-white/45 no-underline">打开原文 ↗</a>
  </div>
  <p class="text-white/70">
    Vue 3.5 introduced improvements to reactivity, server-side rendering,
    and developer ergonomics. The release reduced memory use in the
    reactivity system and added APIs for controlling hydration.
  </p>
  <div class="mt-5 border-t border-white/10 pt-4 font-mono text-xs text-white/52">
    title: string<br>
    summary: string<br>
    keywords: string[]
  </div>
</aside>

</div>

<div v-click="4" class="mt-2 text-center text-sm text-white/58">
  先确认结构和必填字段，再检查关键词覆盖情况。
</div>

<!--
[洛灵]
第二个 Case 要从文章里提取标题、摘要和关键词。右边是输入文章和期望的字段形状，左边代码还是先调用已有函数。这个例子的重点在于：返回了 JSON，不代表提取任务就做完了。

[click] 第一层先检查类型，确认标题和摘要是字符串、关键词是数组。[click] 第二层再检查空值和已知关键词，排除那种只有结构、没有内容的结果。

[click] 最后一段还是确定性评分：算一下摘要里出现了多少个指定关键词，把命中数量换算成覆盖率。这里的 `judge` 函数没有调用模型，也识别不了同义表达；如果需要判断改写或者语义等价，再换成 LLM Judge。[click] 结构检查和关键词覆盖率可以放在同一个 Case 里。接下来把问题推进到更难验证的研究型回答。
-->

---
layout: default
clicks: 4
---

<!-- slide:E4 -->

# 检查引用是否支持对应结论

<div class="mt-6 grid grid-cols-[1.05fr_1fr] gap-8">

```ts
import { research } from './agent'

interface ResearchResult {
  answer: string
  citations: Array<{
    claim: string
    url: string
  }>
}

const result = await research(question)
```

<div class="border-l border-white/15 py-2">
  <div v-click="1" class="relative pl-8 pb-8">
    <span class="absolute -left-2 top-1 h-4 w-4 rounded-full bg-green-300" />
    <div class="text-xl">最终回答非空</div>
    <div class="mt-1 text-sm text-white/45">排除没有返回正文的情况</div>
  </div>
  <div v-click="2" class="relative pl-8 pb-8">
    <span class="absolute -left-2 top-1 h-4 w-4 rounded-full bg-blue-300" />
    <div class="text-xl">每条关键结论都有引用</div>
    <div class="mt-1 text-sm text-white/45">记录每条结论对应的 URL</div>
  </div>
  <div v-click="3" class="relative pl-8 pb-8">
    <span class="absolute -left-2 top-1 h-4 w-4 rounded-full bg-yellow-300" />
    <div class="text-xl">引用可以定位到实际来源</div>
    <div class="mt-1 text-sm text-white/45">链接可访问，来源可以核验</div>
  </div>
  <div v-click="4" class="relative pl-8">
    <span class="absolute -left-2 top-1 h-4 w-4 rounded-full bg-red-300" />
    <div class="text-xl">来源确实支持这条结论</div>
    <div class="mt-1 text-sm text-white/45">逐条对照结论与原文</div>
  </div>
</div>

</div>

<div class="mt-5 text-xs text-white/38">
  FACT：statement–URL extraction + source-support verification
  · <a href="https://github.com/Ayanami0730/deep_research_bench" class="text-white/55 no-underline">DeepResearchBench</a>
  · <a href="https://arxiv.org/abs/2506.11763" class="text-white/55 no-underline">paper</a>
</div>

<!--
[Neko]
第三个 Case 接近 Deep Research。左边的 Agent 返回最终回答，以及结论和 URL 的对应关系。这里不能只统计引用数量，因为一条链接存在，不代表它支持回答里的那句话。

[click] 第一层确认 Agent 确实给出了回答。[click] 第二层检查每条关键结论是不是都带了引用。[click] 第三层确认链接能访问，而且能定位到实际来源。[click] 最后一层才核验来源内容是否支持对应结论。

DeepResearchBench 的 FACT 也采用类似过程：先抽取 statement–URL，再验证来源支持关系。三个 Case 到这儿说明了一件事：检查函数可以从简单布尔判断逐步扩展，但 Agent 始终可以保持黑盒。下一页看这些 Case 怎么组织起来。
-->

---
layout: default
clicks: 4
---

<!-- slide:E5 -->

# 从一个 Case 开始组织 Benchmark

<div class="mt-8 grid grid-cols-[1.15fr_0.85fr] items-center gap-10">

<div>
  <div class="mb-3 text-sm text-white/45">组织关系</div>
  <div class="grid gap-2">
    <div v-click="3" data-organization-row class="grid min-h-13 grid-cols-[6rem_1fr] items-center rounded-xl bg-purple-400/7 px-4 py-3">
      <span class="text-sm text-purple-200">Workspace</span>
      <span class="font-mono text-xs text-white/58">agent-benchmarks</span>
    </div>
    <div v-click="2" data-organization-row class="ml-7 grid min-h-13 grid-cols-[6rem_1fr] items-center rounded-xl bg-yellow-400/7 px-4 py-3">
      <span class="text-sm text-yellow-200">Project</span>
      <span class="font-mono text-xs text-white/58">common-agents</span>
    </div>
    <div v-click="1" data-organization-row class="ml-14 grid min-h-13 grid-cols-[6rem_1fr] items-center rounded-xl bg-blue-400/7 px-4 py-3">
      <span class="text-sm text-blue-200">Task</span>
      <span class="font-mono text-xs text-white/58">describeTask('emotion analysis')</span>
    </div>
    <div data-organization-row class="ml-21 grid min-h-13 grid-cols-[6rem_1fr] items-center rounded-xl bg-green-400/9 px-4 py-3">
      <span class="text-sm text-green-200">Case</span>
      <span class="font-mono text-xs text-white/70">caseOf('happy message')</span>
    </div>
  </div>
</div>

<div v-click="4" data-comparison>
  <div class="mb-3 text-sm text-white/45">横向比较</div>
  <div class="rounded-xl bg-white/5 p-5">
    <div class="mb-5 flex items-center gap-3">
      <span class="i-ph-arrows-left-right text-2xl text-teal-300" />
      <div>
        <div class="text-xl text-teal-200">Comparison</div>
        <div class="mt-1 text-xs text-white/42">比较不同 Project 或 Workspace 的结果</div>
      </div>
    </div>
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      <div class="rounded-xl bg-blue-400/8 p-4">
        <div class="font-mono text-sm">baseline</div>
        <div class="mt-1 text-xs text-white/45">Project A</div>
      </div>
      <span class="i-ph-arrow-right text-xl text-white/30" />
      <div class="rounded-xl bg-purple-400/8 p-4">
        <div class="font-mono text-sm">candidate</div>
        <div class="mt-1 text-xs text-white/45">Project B</div>
      </div>
    </div>
  </div>
</div>

</div>

<!--
[洛灵]
最下面的 Case 是一次具体输入和它的检查。只有一个 Case 的时候，我们已经能跑评测；层级的作用，是数量增加以后还能知道这些任务属于哪儿。

[click] 同类 Case 归到一个 Task 里。[click] 多个 Task 组成一个 Project。[click] Workspace 再管理多个相关的 Project。这些都是管理关系，不需要为每一层重新写 Agent。

[click] Comparison 不在这条纵向层级里，它横跨 Project 或 Workspace，用来比较不同模型、Prompt 或其他方案。层级解决的是“怎么归类”，下一页的 Matrix 解决“同一批 Case 要在多少种条件下运行”。
-->

---
layout: default
clicks: 2
glowSeed: 3949
---

<!-- slide:E6 -->

# 无需重复配置，矩阵超好用

<div class="mt-8 flex h-88 items-stretch gap-8">

<div class="flex h-full min-w-0 basis-[39%] flex-none flex-col">
  <div class="mb-3 text-sm text-white/45">配置</div>

<div data-matrix-config class="[&_.slidev-code]:text-[0.65rem]! [&_.slidev-code]:leading-4!">

````md magic-move {at:1}
```ts
runMatrix: {}
```

```ts
runMatrix: {
  extend: {
    language: ['English', '中文'],
  },
}
```

```ts
runMatrix: {
  extend: {
    language: ['English', '中文'],
    model: ['gpt-5.6-luna', 'deepseek-v4-pro'],
  },
}
```
````

</div>

  <div data-matrix-legend class="mt-auto rounded-xl bg-white/4 px-4 py-3 text-xs text-white/48">
    <div class="flex items-center gap-3">
      <span class="w-15 text-white/35">Case</span>
      <span class="h-3 w-3 rounded bg-orange-600" />
      <span class="h-3 w-3 rounded bg-amber-600" />
      <span class="h-3 w-3 rounded bg-yellow-600" />
      <span class="h-3 w-3 rounded bg-lime-600" />
      <span class="ml-2 text-white/35">颜色区分 Case，深浅区分两个 Task</span>
    </div>
    <div class="mt-3 flex items-center gap-3">
      <span class="w-15 text-white/35">语言</span>
      <span class="h-1.5 w-8 rounded bg-[#fde047]" />
      <span>English</span>
      <span class="h-1.5 w-8 rounded bg-[#fda4af]" />
      <span>中文</span>
    </div>
    <div class="mt-3 grid grid-cols-[3.75rem_1fr] items-center gap-3">
      <span class="text-white/35">模型</span>
      <div class="grid grid-cols-2 gap-2 text-[0.65rem]">
        <span class="flex items-center gap-2 whitespace-nowrap"><span class="h-2.5 w-2.5 rounded-full bg-[#8f7478]" />gpt-5.6-luna</span>
        <span class="flex items-center gap-2 whitespace-nowrap"><span class="h-2.5 w-2.5 rounded-full bg-[#a8789a]" />deepseek-v4-pro</span>
      </div>
    </div>
  </div>
</div>

<div class="flex min-w-0 flex-1 items-stretch">
  <EvalMatrix />
</div>

</div>

<!--
[洛灵]
这里预设了两个 Task，每个 Task 有四个 Case。左边 `runMatrix` 还没扩展维度，所以右边先出现 8 个方块；每个方块代表一次实际调度的 Case 运行，颜色用来区分原来的 Case 和 Task。

[click] 加入 English 和中文两种语言以后，同一个 Case 会在两种语言条件下分别跑，方块增加到 16 个，底部色条标记语言。[click] 再加入两个模型，每组语言组合继续展开，最后得到 32 次运行，圆点标记模型。

这里增加的是运行组合，不是新的 Task，也不需要手动复制 Case。既然运行条件会不断增加，结果的评测条件也需要单独表达，下一页把这两者拆开。
-->

---
layout: default
---

<!-- slide:E7 -->

# 运行矩阵和评测矩阵分开配置，互不干扰

<div class="grid h-88 grid-cols-[1.45fr_0.7fr] items-stretch gap-7 pt-1">

<div>

````md magic-move {at:1}
```ts
export default defineConfig({
  projects: [{
    runMatrix: {
      extend: {
        model: ['small', 'large'],
        language: ['zh', 'en'],
        prompt: ['baseline', 'candidate'],
        temperature: [0.2, 0.8],
      },
    },
  }],
})
```

```ts
export default defineConfig({
  projects: [{
    runMatrix: {
      extend: {
        model: ['small', 'large'],
        language: ['zh', 'en'],
        prompt: ['baseline', 'candidate'],
        temperature: [0.2, 0.8],
      },
    },
    evalMatrix: {
      extend: {
        rubric: ['strict', 'lenient'],
        rubricModel: ['judge-mini', 'judge-large'],
      },
    },
  }],
})
```
````

</div>

<div class="flex h-full flex-col justify-center gap-6">
  <div class="border-l-2 border-green-300 pl-5">
    <div class="text-xl text-green-300">runMatrix</div>
    <div class="mt-2 text-white/60">设置 Agent 的运行条件</div>
    <div class="mt-2 text-xs text-white/38">模型 · 语言 · Prompt · 参数</div>
  </div>
  <div v-click.none class="border-l-2 border-blue-300 pl-5">
    <div class="text-xl text-blue-300">evalMatrix</div>
    <div class="mt-2 text-white/60">设置结果的评测条件</div>
    <div class="mt-2 text-xs text-white/38">评分标准 · 评测模型</div>
  </div>
</div>

</div>

<!--
[洛灵]
左边第一段只有 `runMatrix`。模型、语言、Prompt 和参数都属于 Agent 的运行条件，决定每次 Case 运行实际用什么输入和配置。

[click] 第二段加入 `evalMatrix`。评分标准和评测模型属于结果的评测条件，决定同一批运行结果怎么被检查、怎么打分。

两组条件独立展开，运行条件不会和评测条件混在一起。这样我们可以只调整 Judge，重新评测已有方案；也可以只调整 Agent 的运行配置，再用相同标准比较结果。条件明确以后，还要为不同证据选择合适的检查方式。
-->

---
layout: default
class: flex flex-col
clicks: 4
---

<!-- slide:E8 -->

# 格式正确，只是第一步

<div class="mt-8 divide-y divide-white/10 border-y border-white/12 font-mono text-sm">
  <div v-click="1" class="grid grid-cols-[1.15fr_1fr_1.1fr] items-center gap-5 px-4 py-5">
    <code>{}</code>
    <span class="font-sans text-white/68">→ 格式合法，但缺少字段</span>
    <code class="text-green-300">expect(...).toHaveProperty()</code>
  </div>
  <div v-click="2" class="grid grid-cols-[1.15fr_1fr_1.1fr] items-center gap-5 px-4 py-5">
    <code>{ "title": "" }</code>
    <span class="font-sans text-white/68">→ 字段存在，但内容为空</span>
    <code class="text-blue-300">toSatisfyStructuredOutput()</code>
  </div>
  <div v-click="3" class="grid grid-cols-[1.15fr_1fr_1.1fr] items-center gap-5 px-4 py-5">
    <code>tool: search({ query: "" })</code>
    <span class="font-sans text-white/68">→ 工具选择正确，但参数无效</span>
    <code class="text-yellow-300">toSatisfyToolCallArgs()</code>
  </div>
  <div v-click="4" class="grid grid-cols-[1.15fr_1fr_1.1fr] items-center gap-5 px-4 py-5">
    <span class="font-sans">结构完整，内容正确</span>
    <span class="font-sans text-white/68">→ 任务完成</span>
    <code class="text-red-300">toScoreRubricGreaterThan()</code>
  </div>
</div>

<div class="mt-auto grid grid-cols-[1.15fr_1fr_1.1fr] gap-5 px-4 pb-6 text-xs text-white/35">
  <div>示例结果</div>
  <div>需要判断的问题</div>
  <div>对应的检查方法</div>
</div>

<!--
[洛灵]
这一页把前面三个 Case 用过的检查方式放在一起。它不是一个 Matcher 目录，而是想说明：不同证据需要回答不同问题，不能用一个“格式正确”代替任务完成。

[click] 空对象可以正常解析，但缺少必须字段。[click] 字段存在也可能没内容，所以还要检查结构约束和空值。[click] Agent 可能调用了正确工具，却传了无效参数，工具调用本身也需要验证。[click] 只有结构和内容都满足任务要求，才进入最终的语义评分。

这里不需要记住右边 Matcher 的名字。重要的是先确定手里有什么证据，再选择确定性规则、引用核验或者 Judge。跑完之后，这些检查结果还要能被定位，最后一页看报告里保留了什么。
-->

---
class: py-10
clicks: 5
---

# 只能测聊天模型 / LLM 吗？

<span>不约束模型接口，也不要求业务逻辑必须写进 TypeScript</span>

<div mt-8 />

<div grid grid-cols="[9rem_5rem_18rem_5rem_11rem]" items-center justify-center gap-4 text-amber-100>
  <div
    v-click flex items-center justify-center gap-4 transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"
  >
    <div i-mingcute:flask-fill size-18 />
    <span text-xl>Case</span>
  </div>
  <div
    v-after flex items-center justify-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'" delay-300
  >
    <div i-mingcute:large-arrow-right-line size-14 text-orange-300 />
  </div>
  <div
    v-after flex items-center justify-center gap-4 transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'" delay-600
  >
    <div i-mingcute:process-fill size-18 />
    <span text-xl whitespace-nowrap>Inference Executor</span>
  </div>
  <div
    v-after flex items-center justify-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'" delay-900
  >
    <div i-mingcute:large-arrow-right-line size-14 text-orange-300 />
  </div>
  <div
    v-after flex items-center justify-center gap-4 transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'" delay-1200
  >
    <div i-mingcute:server-fill size-18 />
    <span text-xl>Runtime</span>
  </div>
</div>

<div flex flex-col gap-3 mt-6>

<v-clicks>

<div bg="amber-900/30" rounded-lg flex-1 px-4 py-3>
  <div><span>Chat Completions / Responses 只是其中一种 executor</span></div>
  <div text-stone-400 text-sm><span>只要给输入和输出就好了，就和 Vitest 一样</span></div>
</div>

<div bg="orange-900/30" rounded-lg flex-1 px-4 py-3>
  <div><span>业务解耦，环境无关</span></div>
  <div text-stone-400 text-sm><span>如果 Agent 已经在后端、桌面端或仿真环境中运行，executor 只需要把 case 转成一次可观测的调用。</span></div>
</div>

<div bg="amber-900/30" rounded-lg flex-1 px-4 py-3>
  <div><span>HTTP、tRPC、gRPC 都可以是调用协议</span></div>
  <div text-stone-400 text-sm><span>不必重写业务逻辑</span></div>
</div>

</v-clicks>

</div>

<!--
[洛灵]
这里再补一个设计点。前面例子看起来像是在 TypeScript 里直接调用一个函数，但这不是唯一形态。

[click] 在 Vieval 里，Inference Executor 是一个执行边界。Chat Completions、Responses 当然可以作为 executor，但它不是被写死的唯一模型接口。

[click] 真正重要的是 case 给出输入，executor 负责把它送到真实运行时，再把输出、工具调用、日志或者状态变化收集回来。

[click] 所以业务逻辑不一定要搬进 TypeScript。如果你的 Agent 已经跑在后端服务、桌面端、游戏环境或者其他系统里，Vieval 可以通过 HTTP、tRPC、gRPC 这类协议去调用它。

[click] 这样 Benchmark 就不需要复制一份业务实现。我们保留原来的产品代码，只在外面加一层可复现、可观测、可断言的执行边界。下一页接着看怎么把这些执行过程接进 OpenTelemetry。
-->

---
layout: default
clicks: 4
---

<!-- slide:E9 -->

<h1 class="flex items-center justify-center gap-4">
  <div class="i-logos:opentelemetry-icon" />
  <span>OpenTelemetry 接入全链路可观测</span>
</h1>

<div class="mt-5 overflow-hidden rounded-lg bg-stone-950/95 shadow-2xl shadow-neutral-950/35">
  <div class="flex items-center justify-between border-b border-stone-700/20 bg-stone-900/65 px-5 py-3">
    <div class="flex items-center gap-3">
      <div class="i-carbon:tree-view-alt text-xl text-sky-300" />
      <div>
        <div class="font-mono text-sm text-white/82">vieval.run / happy-path</div>
        <div class="font-mono text-[0.65rem] text-white/35">trace_id=run-1784062872971-e70b0ae1</div>
      </div>
    </div>
    <div class="flex items-center gap-2 text-xs">
      <span class="rounded bg-green-400/12 px-2 py-1 text-green-300">passed</span>
      <span class="rounded bg-stone-800/80 px-2 py-1 text-white/45">1.74s</span>
      <span class="rounded bg-stone-800/80 px-2 py-1 text-white/45">run=default</span>
      <span class="rounded bg-stone-800/80 px-2 py-1 text-white/45">eval=default</span>
    </div>
  </div>
  <div class="grid grid-cols-[1.05fr_1.35fr_0.75fr]">
    <div class="border-r border-stone-700/20 p-4">
      <div class="space-y-2 font-mono text-xs">
        <div v-click="1" class="flex items-center gap-2 text-white/80">
          <span class="h-2 w-2 rounded-full bg-sky-300" />
          <span>case.returns_happy</span>
        </div>
        <div v-click="2" class="ml-5 flex items-center gap-2 text-white/65">
          <span class="h-2 w-2 rounded-full bg-blue-300" />
          <span>agent.generateText</span>
        </div>
        <div v-click="2" class="ml-10 flex items-center gap-2 text-white/50">
          <span class="h-2 w-2 rounded-full bg-cyan-300" />
          <span>tool.search</span>
        </div>
        <div v-click="3" class="ml-5 flex items-center gap-2 text-white/65">
          <span class="h-2 w-2 rounded-full bg-yellow-300" />
          <span>eval.structured_output</span>
        </div>
        <div v-click="3" class="ml-5 flex items-center gap-2 text-white/65">
          <span class="h-2 w-2 rounded-full bg-amber-300" />
          <span>eval.rubric_judge</span>
        </div>
        <div v-click="4" class="ml-5 flex items-center gap-2 text-white/65">
          <span class="h-2 w-2 rounded-full bg-red-300" />
          <span>artifact.write_report</span>
        </div>
      </div>
    </div>
    <div class="border-r border-stone-700/20 p-4">
      <div class="relative h-[15.6rem] overflow-hidden rounded bg-stone-950/70">
        <div class="absolute inset-y-0 left-[22%] border-l border-stone-700/20" />
        <div class="absolute inset-y-0 left-[46%] border-l border-stone-700/20" />
        <div class="absolute inset-y-0 left-[72%] border-l border-stone-700/20" />
        <div v-click="1" class="absolute left-[5%] top-[10%] h-6 w-[86%] rounded bg-sky-300/20">
          <span class="absolute left-2 top-1 font-mono text-[0.62rem] text-sky-100">case</span>
        </div>
        <div v-click="2" class="absolute left-[18%] top-[27%] h-6 w-[48%] rounded bg-blue-300/25">
          <span class="absolute left-2 top-1 font-mono text-[0.62rem] text-blue-100">agent</span>
        </div>
        <div v-click="2" class="absolute left-[34%] top-[42%] h-5 w-[20%] rounded bg-cyan-300/25">
          <span class="absolute left-2 top-0.5 font-mono text-[0.58rem] text-cyan-100">tool</span>
        </div>
        <div v-click="3" class="absolute left-[66%] top-[58%] h-5 w-[13%] rounded bg-yellow-300/25">
          <span class="absolute left-2 top-0.5 font-mono text-[0.58rem] text-yellow-100">check</span>
        </div>
        <div v-click="3" class="absolute left-[76%] top-[72%] h-5 w-[12%] rounded bg-amber-300/25">
          <span class="absolute left-2 top-0.5 font-mono text-[0.58rem] text-amber-100">judge</span>
        </div>
        <div v-click="4" class="absolute left-[89%] top-[86%] h-5 w-[8%] rounded bg-red-300/25">
          <span class="absolute left-2 top-0.5 font-mono text-[0.58rem] text-red-100">json</span>
        </div>
      </div>
    </div>
    <div class="p-4">
    </div>
  </div>
</div>

<!--
[Neko]
运行 Project 之后，Vieval 会把每个 Case 的结果写进报告。截图不是为了展示某个分数，而是说明一次运行之后，我们能顺着结果找到具体任务、状态和条件。

[click] 顶部先标出 Project 和这次用的运行命令。[click] 左侧汇总通过数量和报告目录，方便找到本次运行生成的文件。[click] 右侧保留 Case 名称、状态和分数；下面的 `run=default::eval=default` 记录它所属的 Matrix 条件。

如果某次结果异常，可以先定位到具体 Case，再查看输入、输出和对应配置；比较不同方案时，也能确认结果来自哪组运行条件和评测条件。Vieval 部分到这儿形成一条完整路径：写 Case，组织并展开运行，选择检查方式，最后留下可以比较的结果。
-->

---
layout: default
class: flex flex-col
clicks: 1
---

<!-- slide:F1 -->

# 组 · 合 · 在 · 一 · 起

<div class="mt-22 w-full flex items-center gap-4">
  <div class="flex flex-col items-center justify-center gap-3 flex-1">
    <h1 flex items-center gap-3>
      <img :src="'/ecosystem/velin-logo.svg'" alt="Velin logo" class="size-20" />
      <span class="text-4xl font-bold">Velin</span>
    </h1>
    <div class="text-lg text-white/65 w-60 text-center">像 Vue 组件一样编写、组合和复用 Context</div>
  </div>

  <div class="i-mingcute:large-arrow-right-fill size-20 text-white/30" />

  <div class="flex flex-col items-center justify-center gap-3 flex-1">
    <h1 flex items-center gap-3>
      <img :src="'/ecosystem/vieval-logo.svg'" alt="Vieval logo" class="size-20" />
      <span class="text-4xl font-vieval font-light">Vieval</span>
    </h1>
    <div class="text-lg text-white/65 w-60 text-center">像 Vitest 测试一样编写、组合和复用 Benchmark</div>
  </div>
</div>

<div v-click class="mt-auto pb-6 text-center text-xl text-white/75">
  组合式 Context，持续集成的 Benchmark
</div>

<!--
[两人]
Velin 让 Prompt 和 Context 可以像 Vue 组件一样编写、组合和复用。Vieval 从几个普通函数开始组织 Benchmark，并保留可以比较的运行结果。这就是今天介绍的两条主线。
-->

---
layout: default
---

<!-- slide:F2 -->

# 我们还在开发这些项目

<MoeruEcosystem />

<!--
[两人]
这一页列出我们正在维护和参与的其他项目。它们关注的方向和成熟度各不相同，这里只保留项目名称和仓库入口，方便大家会后去查看。
-->

---
class: py-10
glowSeed: 1298
---

<!-- slide:F3 -->

# 感兴趣吗？

我们大多数都是开源的！欢迎大家使用。

<div flex>
  <div text-sm text="zinc-300" text-right flex flex-row gap-2 mt-6 translate-x-2>
    <div flex items-center flex-col font-bold text-xl>
      <img :src="'/qr-moeru-ai-velin.svg'" w-70 />
      <div translate-y--4>Velin</div>
    </div>
    <div flex items-center flex-col font-bold text-xl>
      <img :src="'/qr-vieval-dev-vieval.svg'" w-70 />
      <div translate-y--4>Vieval</div>
    </div>
    <div flex items-center flex-col font-bold text-xl>
      <img :src="'/qr-moeru-ai.svg'" w-70 />
      <div translate-y--4>AIRI</div>
    </div>
  </div>
</div>

<!--
[两人]
这一页列出我们正在维护和参与的其他项目。它们关注的方向和成熟度各不相同，这里只保留项目名称和仓库入口，方便大家会后去查看。
-->

---
title: Thank you
class: py-10
glowSeed: 230
---

<div flex>
  <div flex-1>
    <div mt-50 />
    <div flex flex-col gap-4 translate="y--52" h-full>
      <div flex flex-col translate="y-4" flex-1>
        <div text="[48px]">
          谢谢
        </div>
        <div text="white/50">
          Thank you
        </div>
      </div>
      <img :src="'/relu-art-6.gif'" size-50 rounded-2xl overflow-hidden translate-y--20>
    </div>
  </div>
  <div text-lg text="zinc-300" text-right flex flex-col gap-3 mt-3>
    <div>
      演示文稿开源在 <a href="https://github.com/luoling8192/talks"><div inline-block mr-1 translate-y-0.8 i-ri:github-fill />github.com/luoling8192/talks</a>
    </div>
    <div>
      演示文稿使用 <a href="https://sli.dev"><div inline-block mr-1 translate-y-0.8 i-logos:slidev />sli.dev</a> 构建
    </div>
    <div self-end mt-16 translate-x-14 translate-y--9>
      <img :src="'/slide_qr.png'" w-100 />
    </div>
  </div>
</div>

<!--
[两人]
谢谢大家。接下来留三分钟交流，也欢迎会后查看项目或者继续讨论。
-->
