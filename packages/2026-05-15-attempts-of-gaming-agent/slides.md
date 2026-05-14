---
layout: center
class: font-cover
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: 'Attempts of Gaming Agent, What We Learned 2026'
exportFilename: Attempts of Gaming Agent, What We Learned 2026
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 233
routerMode: hash
---

<div class="font-cover" translate-x--14 translate-y-8>

<h1>
Attempts of Gaming Agent,<br />What We Learned 2026
</h1>

<p text="white/70" text-xl>
Minecraft, Factorio, Balatro, Dome Keeper, KSP, and AIRI
</p>

<div mt-8 flex items-center gap-4 text-lg>
  <img src="/proj-airi-logo.svg" size="10">
  <span>Neko / LemonNeko</span>
</div>

<AiriSpeak :at="0" headline="Opening cue">
欢迎来到 Attempts of Gaming Agent。今天我们会从 AIRI 的角色容器出发，聊聊这些游戏 Agent 尝试到底教会了我们什么。
</AiriSpeak>

</div>

<img src="/airi-logo-grayscaled-light-2.svg" class="w-170 opacity-25" absolute right="[-30%]" bottom="[-210%]">

<!--
Activity: https://luma.com/71bdapoj
-->

---
layout: intro
class: px-20
glowSeed: 128
---

<div flex flex-col h-full justify-center gap-8>
  <div>
    <div text-2xl font-semibold>Speakers</div>
    <div text="white/50" mt-2>把 AIRI 的角色容器和游戏 Agent 的具体尝试放在同一条线上讲。</div>
  </div>

<div grid="~ cols-2" gap-12 items-center>
  <div
    border="2 solid pink-500/25" rounded-xl bg="pink-500/8" backdrop-blur px-8 py-7
  >
    <div flex items-center gap-6>
      <img src="/person/neko.jpeg" w-34 h-34 rounded-full object-cover>
      <div>
        <div text-2xl font-semibold>Neko</div>
        <div text="pink-200/80" mt-2>Project AIRI / Moeru AI</div>
      </div>
    </div>
    <div mt-7 grid="~ cols-2" gap-3 text-sm>
      <div flex items-center gap-2><div i-ri:github-fill /> nekomeowww</div>
      <div flex items-center gap-2><img src="/proj-airi-logo.svg" size="5"> Project AIRI</div>
      <div flex items-center gap-2><div i-logos:vue /> Vue / Frontend</div>
      <div flex items-center gap-2><div i-devicon:kubernetes /> Infra / Kubernetes</div>
    </div>
    <div mt-6 text="white/60" text-sm leading-6>
      负责 AIRI 的整体产品、工程架构和多模态体验探索；这次主要补充 AIRI 背景、Minecraft 方向和整体分层设想。
    </div>
  </div>

  <div
    border="2 solid cyan-500/25" rounded-xl bg="cyan-500/8" backdrop-blur px-8 py-7
  >
    <div flex items-center gap-6>
      <img src="/person/neko.jpeg" w-34 h-34 rounded-full object-cover grayscale>
      <div>
        <div text-2xl font-semibold>LemonNeko</div>
        <div text="cyan-200/80" mt-2>Game Agent Experiments</div>
      </div>
    </div>
    <div mt-7 grid="~ cols-2" gap-3 text-sm>
      <div flex items-center gap-2><div i-carbon:game-console /> Games</div>
      <div flex items-center gap-2><div i-carbon:tools /> Tools / Mods</div>
      <div flex items-center gap-2><div i-carbon:view /> Vision</div>
      <div flex items-center gap-2><div i-carbon:flow /> Agent loops</div>
    </div>
    <div mt-6 text="white/60" text-sm leading-6>
      负责多款游戏 Agent 的具体尝试；这页头像暂用 Neko 的占位图，后续替换 LemonNeko 的照片。
    </div>
  </div>
</div>
</div>

<!--
TODO: Replace LemonNeko avatar and adjust bio text.
-->

---
title: The previous ones
glowSeed: 203
---

<div>
  <div grid="~ cols-2" gap-4>
    <div
      relative
      class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-50 hover:cursor-pointer hover:grayscale-100"
      rounded-lg overflow-hidden bg="black" h-fit
      transition="all duration-250 ease-in-out"
    >
      <img src="/session-1.png" class="img" opacity-100 transition="all duration-250 ease-in-out">
      <img src="/session-1-qr.png" class="qr" w-60 absolute top-0 left="0" translate-x="[40%]" opacity-0 transition="all duration-250 ease-in-out">
    </div>
    <div
      relative
      class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-50 hover:cursor-pointer hover:grayscale-100"
      rounded-lg overflow-hidden bg="black" h-fit
      transition="all duration-250 ease-in-out"
    >
      <img src="/session-2.png" class="img" opacity-100 transition="all duration-250 ease-in-out">
      <img src="/session-2-qr.png" class="qr" w-60 absolute top-0 left="0" translate-x="[40%]" opacity-0 transition="all duration-250 ease-in-out">
    </div>
    <div
      relative
      class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-50 hover:cursor-pointer hover:grayscale-100"
      rounded-lg overflow-hidden bg="black" h-fit
      transition="all duration-250 ease-in-out"
    >
      <img src="/session-3.png" class="img" opacity-100 transition="all duration-250 ease-in-out">
      <img src="/session-3-qr.png" class="qr" w-60 absolute top-0 left="0" translate-x="[40%]" opacity-0 transition="all duration-250 ease-in-out">
    </div>
    <div
      relative
      class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-50 hover:cursor-pointer hover:grayscale-100"
      rounded-lg overflow-hidden h-fit
      transition="all duration-250 ease-in-out"
    >
      <div w-120 h-60 bg-neutral-500 opacity-30 backdrop-blur border="neutral-100 2 solid" rounded-lg />
    </div>
  </div>
</div>

---
class: py-10 text-center
glowSeed: 91
---

<h1 font-rounded>
Project AIRI
</h1>

<div text-xl text="white/70">
从“想要一个能一起玩的 AI 伙伴”开始，到尝试给角色接入真实的游戏世界。
</div>

<img src="/airi-screenshot-2.png" w-full rounded-xl mt-8 />

<!--
Source note: AIRI vision is referenced from DreamLog 0x1 and existing AIRI talks.
-->

---
layout: center
class: px-18
glowSeed: 311
---

<div flex flex-col gap-8>
  <div text-4xl font-bold>为什么是游戏？</div>
  <div grid="~ cols-3" gap-5>
    <div v-click border="2 solid sky-500/30" bg="sky-500/10" rounded-xl p-6>
      <div i-carbon:screen text-5xl text-sky-300 mb-5 />
      <div text-xl>完整环境</div>
      <div mt-3 text="white/55" leading-6>有画面、规则、目标、失败和反馈。</div>
    </div>
    <div v-click border="2 solid teal-500/30" bg="teal-500/10" rounded-xl p-6>
      <div i-carbon:decision-tree text-5xl text-teal-300 mb-5 />
      <div text-xl>决策闭环</div>
      <div mt-3 text="white/55" leading-6>观察、计划、动作、等待结果可以被反复测试。</div>
    </div>
    <div v-click border="2 solid violet-500/30" bg="violet-500/10" rounded-xl p-6>
      <div i-carbon:ibm-watson-machine-learning text-5xl text-violet-300 mb-5 />
      <div text-xl>多模态压力测试</div>
      <div mt-3 text="white/55" leading-6>语言、视觉、工具调用和实时执行会一起暴露问题。</div>
    </div>
  </div>
</div>

---
layout: full
class: p-0!
glowSeed: 312
clicks: 5
---

<div class="slide-canvas airi-integrations">
  <svg class="integration-lines" viewBox="0 0 1000 560" aria-hidden="true">
    <path :class="$clicks >= 1 ? 'is-visible' : ''" d="M500 430 C330 360 230 270 170 140" />
    <path :class="$clicks >= 2 ? 'is-visible' : ''" d="M500 430 C430 310 395 220 370 95" />
    <path :class="$clicks >= 3 ? 'is-visible' : ''" d="M500 430 C560 300 615 215 650 100" />
    <path :class="$clicks >= 4 ? 'is-visible' : ''" d="M500 430 C710 365 795 275 830 155" />
    <path :class="$clicks >= 5 ? 'is-visible' : ''" d="M500 430 C580 395 680 380 790 350" />
  </svg>

  <div class="integration-heading">
    <div text-3xl font-bold>AIRI as the container</div>
    <div mt-2 text-sm text="white/55">不同游戏不是孤立 demo，而是在测试 AIRI 要怎么接入世界。</div>
  </div>

  <div class="game-card minecraft" :class="$clicks >= 1 ? 'is-visible' : ''">
    <img src="/game-banners/minecraft-banner.png" />
    <div><div i-carbon:cube /> Minecraft</div>
  </div>
  <div class="game-card factorio" :class="$clicks >= 2 ? 'is-visible' : ''">
    <img src="/game-banners/factorio-banner.png">
    <div><div i-carbon:industry /> Factorio</div>
  </div>
  <div class="game-card balatro" :class="$clicks >= 3 ? 'is-visible' : ''">
    <img src="/game-banners/balatro-cover.png">
    <div><div i-carbon:game-console /> Balatro</div>
  </div>
  <div class="game-card dome" :class="$clicks >= 4 ? 'is-visible' : ''">
    <img src="/game-banners/dome-keeper-cover.png">
    <div><div i-carbon:search-locate /> Dome Keeper</div>
  </div>
  <div class="game-card ksp" :class="$clicks >= 5 ? 'is-visible' : ''">
    <img src="/game-banners/ksp-banner.png">
    <div><div i-carbon:rocket /> KSP</div>
  </div>

  <div class="airi-core">
    <img src="/proj-airi-logo.svg">
    <div>
      <div text-2xl font-semibold>Project AIRI</div>
      <div text="white/50" text-sm>memory / character / senses / tools</div>
    </div>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 405
clicks: 5
---

<div text-4xl font-bold>接口路线：从确定性到通用性</div>
<div mt-2 text="white/50">每往右一步，游戏专用接口更少，感知和控制的不确定性更多。</div>

<div class="route-lane" mt-9>
  <div class="route-card" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div i-carbon:api text-teal-300 />
    <strong>Mod API</strong>
    <span>Minecraft / Factorio</span>
  </div>
  <div class="route-connector" :class="$clicks >= 2 ? 'is-visible' : ''" />
  <div class="route-card" :class="$clicks >= 2 ? 'is-visible' : ''">
    <div i-carbon:tools text-sky-300 />
    <strong>Tools</strong>
    <span>typed actions</span>
  </div>
  <div class="route-connector" :class="$clicks >= 3 ? 'is-visible' : ''" />
  <div class="route-card" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div i-carbon:code text-violet-300 />
    <strong>Code Policy</strong>
    <span>plan as executable script</span>
  </div>
  <div class="route-connector" :class="$clicks >= 4 ? 'is-visible' : ''" />
  <div class="route-card" :class="$clicks >= 4 ? 'is-visible' : ''">
    <div i-carbon:view text-cyan-300 />
    <strong>Vision</strong>
    <span>YOLO / OCR / screenshot</span>
  </div>
  <div class="route-connector hard" :class="$clicks >= 5 ? 'is-visible' : ''" />
  <div class="route-card hard" :class="$clicks >= 5 ? 'is-visible' : ''">
    <div i-carbon:keyboard text-orange-300 />
    <strong>Input</strong>
    <span>mouse / keyboard / timing</span>
  </div>
</div>

<div mt-8 grid="~ cols-3" gap-4 text-sm>
  <div v-click text="teal-200">左侧适合验证策略，因为世界状态直接可读。</div>
  <div v-click text="sky-200">中段开始测试 Agent 能否把目标变成可执行计划。</div>
  <div v-click text="orange-200">右侧接近通用游戏 AI，但错误来源也最多。</div>
</div>

---
layout: full
class: p-0!
glowSeed: 512
---

<div class="fade-video-slide">
  <video autoplay muted loop>
    <source src="/airi-plays-minecraft.mp4" />
  </video>
  <div class="fade-heading">
    <div flex items-center gap-3 text-2xl font-semibold>
      <div i-carbon:cube /> Minecraft
    </div>
    <div mt-3 text="white/60">第一个选择：一个足够开放，也足够难直播的世界。</div>
  </div>
</div>

<!--
Sources:
- /Users/neko/Git/github.com/moeru-ai/airi/services/minecraft
- /Users/neko/Git/github.com/shinohara-rin/airicraft
-->

---
layout: default
class: px-12 py-8
glowSeed: 513
clicks: 4
---

<div text-3xl font-bold>Minecraft service: 大脑、通信和计划器</div>
<div mt-2 text-sm text="white/50">核心不是“能不能走路”，而是把复杂事件整理成 Agent 可以规划的状态。</div>

<div class="architecture-stage">
  <div class="arch-node" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div i-carbon:cube text-green-300 />
    <div>
      <div text-lg>Mineflayer Bot</div>
      <div text-xs text="white/45">world events / inventory / chat</div>
    </div>
  </div>
  <div class="arch-node" :class="$clicks >= 2 ? 'is-visible' : ''">
    <div i-carbon:events text-sky-300 />
    <div>
      <div text-lg>EventBus + Rules</div>
      <div text-xs text="white/45">YAML rules normalize noisy events</div>
    </div>
  </div>
  <div class="arch-center">
    <div i-carbon:ibm-watson-machine-learning />
    <div>
      <div text-xl font-semibold>Brain / Planner</div>
      <div text-sm text="white/50">把事件、规则和目标拼成动作</div>
    </div>
  </div>
  <div class="arch-node" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div i-carbon:code text-violet-300 />
    <div>
      <div text-lg>JS Planner Sandbox</div>
      <div text-xs text="white/45">plan becomes executable policy</div>
    </div>
  </div>
  <div class="arch-node" :class="$clicks >= 4 ? 'is-visible' : ''">
    <div i-carbon:tools text-teal-300 />
    <div>
      <div text-lg>TaskExecutor</div>
      <div text-xs text="white/45">action registry calls Mineflayer skills</div>
    </div>
  </div>
</div>

<div v-click mt-4 class="learning-card compact">
  <div i-carbon:warning-alt text-orange-300 />
  <div>
    <div text-lg>这条路后来一度弃坑。</div>
    <div mt-1 text="white/55">事件复杂、视觉难做，bot 视角也不适合直播展示；后面才转向 Fabric 客户端和更视觉化的游戏。</div>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 515
clicks: 5
---

<div text-4xl font-bold>Minecraft Agent flow</div>
<div mt-2 text="white/50">先靠 Mineflayer 把世界变成事件，再让 Agent 计划和执行。</div>

<div class="flow-strip" mt-12>
  <div class="flow-step" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div i-carbon:events text-green-300 />
    <strong>Events</strong>
    <span>chat, block, entity, inventory</span>
  </div>
  <div class="flow-arrow" :class="$clicks >= 2 ? 'is-visible' : ''" />
  <div class="flow-step" :class="$clicks >= 2 ? 'is-visible' : ''">
    <div i-carbon:filter text-sky-300 />
    <strong>Rules</strong>
    <span>filter noise into signals</span>
  </div>
  <div class="flow-arrow" :class="$clicks >= 3 ? 'is-visible' : ''" />
  <div class="flow-step" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div i-carbon:idea text-violet-300 />
    <strong>Plan</strong>
    <span>LLM decides next action</span>
  </div>
  <div class="flow-arrow" :class="$clicks >= 4 ? 'is-visible' : ''" />
  <div class="flow-step" :class="$clicks >= 4 ? 'is-visible' : ''">
    <div i-carbon:tools text-teal-300 />
    <strong>Execute</strong>
    <span>TaskExecutor + action registry</span>
  </div>
</div>

<div v-click mt-12 class="learning-card">
  <div i-carbon:warning-alt text-orange-300 />
  <div>
    <div text-xl>这条路工作过，但不适合一直往前硬推。</div>
    <div mt-2 text="white/55">事件太多、视觉不是第一人称、直播展示很别扭；后来才转向 Fabric 客户端和更视觉化的游戏。</div>
  </div>
</div>

---
layout: full
class: p-0!
glowSeed: 611
---

<div class="fade-video-slide">
  <video autoplay muted loop>
    <source src="/airi-plays-factorio.mp4" />
  </video>
  <div class="fade-heading">
    <div flex items-center gap-3 text-2xl font-semibold>
      <div i-carbon:industry /> Factorio
    </div>
    <div mt-3 text="white/60">纯 mod 与 code as policy：人类在聊天栏说话，Agent 调工具，mod 执行。</div>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 612
clicks: 5
---

<div text-2xl font-bold>Factorio: structured game API loop</div>
<div mt-2 text-sm text="white/50">这里不是“看图玩游戏”，而是先用 mod 暴露一个稳定执行环境。</div>

<div class="factorio-loop" mt-5>
  <div class="loop-node human" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div i-carbon:chat />
    <strong>Human chat</strong>
    <span>玩家直接在聊天栏说目标</span>
  </div>
  <div class="loop-arrow" :class="$clicks >= 1 ? 'is-visible' : ''" />
  <div class="loop-node agent" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div i-carbon:ibm-watson-machine-learning />
    <strong>Agent</strong>
    <span>读取 stdout + tools，拼上下文</span>
  </div>
  <div class="loop-arrow" :class="$clicks >= 2 ? 'is-visible' : ''" />
  <div class="loop-node llm" :class="$clicks >= 2 ? 'is-visible' : ''">
    <div i-carbon:json />
    <strong>LLM JSON plan</strong>
    <span>返回动作和工具调用</span>
  </div>

  <div class="loop-return" :class="$clicks >= 5 ? 'is-visible' : ''">
    <div i-carbon:restart />
    <span>next round</span>
  </div>

  <div class="loop-node mod" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div i-carbon:api />
    <strong>RCON / mod</strong>
    <span>执行移动、挖矿、放置建筑</span>
  </div>
  <div class="loop-arrow reverse" :class="$clicks >= 4 ? 'is-visible' : ''" />
  <div class="loop-node done" :class="$clicks >= 4 ? 'is-visible' : ''">
    <div i-carbon:checkmark-outline />
    <strong>completed signal</strong>
    <span>控制台输出完成消息，触发下一轮</span>
  </div>
</div>

<!--
Source: /Users/neko/Git/github.com/moeru-ai/airi-factorio
Runtime flow: factorio-wrapper -> websocket stdout -> agent parser -> neuri/openai gpt-4o JSON -> RCON -> autorio task queue.
-->

---
layout: default
class: px-12 py-8
glowSeed: 613
clicks: 3
---

<div text-4xl font-bold>Factorio: 点了视觉科技树</div>
<div mt-2 text="white/50">想要通用游戏 AI，就不能永远依赖每个游戏的 mod API。</div>

<div class="tech-tree" mt-10>
  <div class="tech-node active">
    <div i-carbon:api />
    <strong>mod API</strong>
    <span>先拿到物品和碰撞箱</span>
  </div>
  <div class="tech-branch" :class="$clicks >= 1 ? 'is-visible' : ''" />
  <div class="tech-node" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div i-carbon:screenshot />
    <strong>screenshot</strong>
    <span>游戏内 API 直接输出图片</span>
  </div>
  <div class="tech-branch" :class="$clicks >= 2 ? 'is-visible' : ''" />
  <div class="tech-node" :class="$clicks >= 2 ? 'is-visible' : ''">
    <div i-carbon:bounding-box />
    <strong>YOLO dataset</strong>
    <span>边界框 + 图片 + data.yaml</span>
  </div>
  <div class="tech-branch danger" :class="$clicks >= 3 ? 'is-visible' : ''" />
  <div class="tech-node danger" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div i-carbon:warning-alt />
    <strong>state explosion</strong>
    <span>配方、方向、连接规则全部压过来</span>
  </div>
</div>

<div v-click mt-10 class="learning-card">
  <div i-carbon:idea text-orange-300 />
  <div>
    <div text-xl>训练模型本身不是最难的。</div>
    <div mt-2 text="white/55">难点在把视觉检测变成可规划状态：建筑配方、传送带方向、管道连接、机械臂输入输出都要同时正确。</div>
  </div>
</div>

<!--
Source: /Users/neko/Git/github.com/moeru-ai/airi-factorio
YOLO side flow: RCON script -> spawn entity -> screenshot -> selection box -> YOLO label -> YOLOv11n training.
-->

---
layout: full
class: p-0!
glowSeed: 711
---

<div class="fade-video-slide">
  <video autoplay muted loop>
    <source src="/airi-plays-balatro.mp4" />
  </video>
  <div class="fade-heading">
    <div flex items-center gap-3 text-2xl font-semibold>
      <div i-carbon:game-console /> Balatro
    </div>
    <div mt-3 text="white/60">从复杂工厂退一步：规则还复杂，但屏幕和动作空间更窄。</div>
  </div>
</div>

<!--
Source: /Users/neko/Git/github.com/proj-airi/game-playing-ai-balatro
Flow: Screen -> mss -> YOLO Entities/UI -> OCR + tooltips -> GameState -> OpenRouter LLM -> ActionExecutor -> mouse clicks.
-->

---
layout: default
class: px-12 py-8
glowSeed: 712
clicks: 4
---

<div text-4xl font-bold>Balatro: 新点的科技树</div>
<div mt-2 text="white/50">把“看屏幕”拆成可训练、可验证、可点击的几层。</div>

<div class="stacked-flow" mt-10>
  <div class="stack-row" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div i-carbon:screen />
    <strong>Screen capture</strong>
    <span>mss gets the current frame</span>
  </div>
  <div class="stack-row" :class="$clicks >= 2 ? 'is-visible' : ''">
    <div i-carbon:bounding-box />
    <strong>Two YOLO models</strong>
    <span>entities and UI are detected separately</span>
  </div>
  <div class="stack-row" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div i-carbon:text-link />
    <strong>OCR + tooltip sweep</strong>
    <span>turn boxes into richer game state</span>
  </div>
  <div class="stack-row" :class="$clicks >= 4 ? 'is-visible' : ''">
    <div i-carbon:cursor-1 />
    <strong>Function call → click</strong>
    <span>LLM chooses an action, executor maps it to mouse input</span>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 720
clicks: 4
---

<div text-4xl font-bold>为什么是这些游戏？</div>
<div mt-2 text="white/50">它们分别卡住 Agent 的不同能力，不是随便挑的 demo。</div>

<div class="game-difficulty-grid" mt-8>
  <div v-click class="difficulty-card">
    <div i-carbon:cube text-green-300 />
    <strong>Minecraft</strong>
    <span>开放世界、事件复杂、目标不明确；适合测试长期任务和具身交互。</span>
  </div>
  <div v-click class="difficulty-card">
    <div i-carbon:industry text-amber-300 />
    <strong>Factorio</strong>
    <span>配方、方向、物流网络；适合测试结构化 API 与空间规划。</span>
  </div>
  <div v-click class="difficulty-card">
    <div i-carbon:game-console text-rose-300 />
    <strong>Balatro</strong>
    <span>屏幕可控、规则严密；适合测试视觉状态、OCR 和点击执行。</span>
  </div>
  <div v-click class="difficulty-card">
    <div i-carbon:rocket text-zinc-200 />
    <strong>Dome Keeper / KSP</strong>
    <span>一个适合数据采集，一个适合 API-native tool loop；分别测试感知和工具编排。</span>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 713
clicks: 4
---

<div class="banner-split">
  <div>
    <div text-4xl font-bold>Dome Keeper</div>
    <div mt-3 text="white/55" text-lg>Factorio 太复杂，于是换一个更适合做视觉数据闭环的游戏。</div>
    <div mt-8 class="small-facts">
      <div v-click><div i-carbon:screenshot /> Godot viewport screenshot every 0.5s</div>
      <div v-click><div i-carbon:bounding-box /> labels from game object tree</div>
      <div v-click><div i-carbon:data-set /> YOLO dataset + train/val/test split</div>
      <div v-click><div i-carbon:warning-alt /> current repo is data-first, not live planner</div>
    </div>
  </div>
  <img src="/game-banners/dome-keeper-cover.png">
</div>

---
layout: default
class: px-12 py-8
glowSeed: 714
clicks: 4
---

<div text-4xl font-bold>Dome Keeper: data-first vision pipeline</div>

<div class="pipeline-svg" mt-10>
  <div class="pipe-node" :class="$clicks >= 1 ? 'is-visible' : ''"><div i-carbon:game-console /> Game View</div>
  <div class="pipe-arrow" :class="$clicks >= 1 ? 'is-visible' : ''" />
  <div class="pipe-node" :class="$clicks >= 2 ? 'is-visible' : ''"><div i-carbon:code /> Godot Mod</div>
  <div class="pipe-arrow" :class="$clicks >= 2 ? 'is-visible' : ''" />
  <div class="pipe-node" :class="$clicks >= 3 ? 'is-visible' : ''"><div i-carbon:screenshot /> Viewport + Labels</div>
  <div class="pipe-arrow" :class="$clicks >= 3 ? 'is-visible' : ''" />
  <div class="pipe-node" :class="$clicks >= 4 ? 'is-visible' : ''"><div i-carbon:ibm-watson-machine-learning /> YOLO Train</div>
</div>

<div mt-8 text="white/60" text-lg leading-7 w-230>
  这条线先把“看见游戏”做成可训练的数据集。Live 推理、LLM planner、键鼠输入执行在当前代码里还没有实装证据。
</div>

---
layout: default
class: px-12 py-8
glowSeed: 514
clicks: 4
---

<div text-4xl font-bold>airicraft: Fabric embodied client</div>
<div mt-2 text="white/50">等视觉数据路线讲完，再回到 Minecraft：这次不是 Mineflayer bot，而是客户端里的具身运行时。</div>

<div class="flow-strip" mt-12>
  <div class="flow-step" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div i-carbon:screen />
    <strong>Fabric Client</strong>
    <span>first-person runtime + mixins</span>
  </div>
  <div class="flow-arrow" :class="$clicks >= 2 ? 'is-visible' : ''" />
  <div class="flow-step" :class="$clicks >= 2 ? 'is-visible' : ''">
    <div i-carbon:view />
    <strong>take_a_look</strong>
    <span>visual tool via screenshot</span>
  </div>
  <div class="flow-arrow" :class="$clicks >= 3 ? 'is-visible' : ''" />
  <div class="flow-step" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div i-carbon:tree-view-alt />
    <strong>Goal Director</strong>
    <span>intent to behavior tree</span>
  </div>
  <div class="flow-arrow" :class="$clicks >= 4 ? 'is-visible' : ''" />
  <div class="flow-step" :class="$clicks >= 4 ? 'is-visible' : ''">
    <div i-carbon:movement />
    <strong>Look / Move / Chat</strong>
    <span>client-side embodied controls</span>
  </div>
</div>

<div mt-8 text-xs text="white/38">
  TODO: no evidence of general mining/crafting/combat actions in inspected airicraft files.
</div>

---
layout: full
class: p-0!
glowSeed: 715
---

<div class="fade-video-slide">
  <video autoplay muted loop>
    <source src="/ksp-demo.mp4" />
  </video>
  <div class="fade-heading">
    <div flex items-center gap-3 text-2xl font-semibold>
      <div i-carbon:rocket /> Kerbal Space Program
    </div>
    <div mt-3 text="white/60">另一条极端路线：状态和执行几乎都通过 API 暴露。</div>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 716
clicks: 4
---

<div text-4xl font-bold>KSP: API-native tool loop</div>
<div mt-2 text="white/50">它更像“游戏里的 MCP”：难点从视觉转移到工具编排、任务策略和长期控制。</div>

<div class="flow-strip" mt-12>
  <div class="flow-step" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div i-carbon:terminal />
    <strong>User Goal</strong>
    <span>TUI AgentLoop receives the task</span>
  </div>
  <div class="flow-arrow" :class="$clicks >= 2 ? 'is-visible' : ''" />
  <div class="flow-step" :class="$clicks >= 2 ? 'is-visible' : ''">
    <div i-carbon:api-1 />
    <strong>Tool Call</strong>
    <span>Pydantic schema + OpenAI-compatible chat</span>
  </div>
  <div class="flow-arrow" :class="$clicks >= 3 ? 'is-visible' : ''" />
  <div class="flow-step" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div i-carbon:rocket />
    <strong>kRPC / MechJeb</strong>
    <span>vessel, flight, staging, transfer tools</span>
  </div>
  <div class="flow-arrow" :class="$clicks >= 4 ? 'is-visible' : ''" />
  <div class="flow-step" :class="$clicks >= 4 ? 'is-visible' : ''">
    <div i-carbon:reply />
    <strong>JSON Result</strong>
    <span>next tool or final reply</span>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 800
clicks: 4
---

<div text-sm uppercase tracking-widest text="pink-200/70">LemonNeko</div>
<div text-4xl font-bold mt-2>AIRI 多层 Agent 设想</div>

<div class="layered-agent" mt-10>
  <div class="agent-layer top" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div i-carbon:decision-tree />
    <strong>Top-level LLM</strong>
    <span>要不要玩、目标是什么、什么时候停止</span>
  </div>
  <div class="agent-layer perception" :class="$clicks >= 2 ? 'is-visible' : ''">
    <div i-carbon:view />
    <strong>Perception</strong>
    <span>LLM + YOLO, around 0.2fps</span>
  </div>
  <div class="agent-layer decision" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div i-carbon:ibm-watson-machine-learning />
    <strong>Game Decision</strong>
    <span>LLM planner, around 1fps</span>
  </div>
  <div class="agent-layer execution" :class="$clicks >= 4 ? 'is-visible' : ''">
    <div i-carbon:cursor-1 />
    <strong>Execution</strong>
    <span>YOLO + action model + simulated input, up to 60fps</span>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 821
clicks: 3
---

<div text-4xl font-bold>Why are they hard to deal with?</div>
<div mt-2 text="white/50">游戏 Agent 的难点不只在模型，而在环境、状态和执行之间的断层。</div>

<div mt-8 flex flex-col gap-4>
  <div v-click class="reason-block violet">
    <div class="reason-head"><div i-carbon:box /> <em>Blackbox inside another blackbox</em></div>
    <div>
      游戏本身是黑箱，视觉模型也是黑箱；当它失败时，很难知道是看错了、理解错了，还是动作执行错了。
      <div class="reason-tags"><span>Hard to debug</span><span>Hard to trace</span><span>Hard to reproduce</span></div>
    </div>
  </div>
  <div v-click class="reason-block blue">
    <div class="reason-head"><div i-carbon:sysplex-distributor /> <em>Unreachable state</em></div>
    <div>
      很多关键状态没有直接 API：手牌效果、空间关系、路线阻塞、下一步会触发什么，只能靠观察和推断。
      <div class="reason-tags"><span>Hidden state</span><span>Partial observation</span><span>Temporal context</span></div>
    </div>
  </div>
  <div v-click class="reason-block cyan">
    <div class="reason-head"><div i-carbon:name-space /> <em>Missing control layer</em></div>
    <div>
      LLM 决策很慢，游戏执行很快；需要一个介于“会想”和“会按键”之间的控制层。
      <div class="reason-tags"><span>Timing</span><span>Action model</span><span>Recovery loop</span></div>
    </div>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 822
clicks: 4
---

<div text-4xl font-bold mb-8>我们学到了什么？</div>

<div grid="~ cols-2" gap-4>
  <div v-click class="lesson-block">
    <div i-carbon:data-structured text-teal-300 />
    <div>
      <div text-xl>状态表达比模型更先卡住</div>
      <div mt-2 text="white/55">Agent 需要的不是截图，而是能规划、能校验、能恢复的世界状态。</div>
    </div>
  </div>
  <div v-click class="lesson-block">
    <div i-carbon:debug text-sky-300 />
    <div>
      <div text-xl>可观测性决定迭代速度</div>
      <div mt-2 text="white/55">事件、动作、失败原因没有记录清楚，Agent loop 就很难调。</div>
    </div>
  </div>
  <div v-click class="lesson-block">
    <div i-carbon:timer text-amber-300 />
    <div>
      <div text-xl>不同层需要不同频率</div>
      <div mt-2 text="white/55">顶层 LLM 负责目标，中层 planner 负责策略，底层输入层负责高频控制。</div>
    </div>
  </div>
  <div v-click class="lesson-block">
    <div i-carbon:api-1 text-pink-300 />
    <div>
      <div text-xl>工具接口仍然是捷径</div>
      <div mt-2 text="white/55">Mod/API 帮我们验证策略；视觉路线则暴露通用性边界。</div>
    </div>
  </div>
</div>

---
layout: center
class: text-center
glowSeed: 999
---

# TODO before final version

<div mt-8 text-left mx-auto w-180 text="white/65" leading-8>

- Replace LemonNeko avatar and tighten speaker bio.
- Fill each repo page with code-derived architecture details and speaker notes.
- Add the third Minecraft iteration / visual Minecraft page once the `airi-minecraft` source path is confirmed.
- Expand Factorio prompt / code-as-policy explanation from the Lark planning doc.
- Add final QR / links after public URLs are known.
- Replace placeholder slides with screenshots or diagrams where useful.

</div>
