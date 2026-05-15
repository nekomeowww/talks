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
glowSeed: 45499218
routerMode: hash
---

<div class="font-cover" translate-x--30 translate-y-20>

<h1>
Attempts of Gaming Agent,<br />What We Learned
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

<div grid="~ cols-2" gap-12 items-stretch>
  <div
    h-full flex flex-col border="2 solid pink-500/25" rounded-xl bg="pink-500/8" backdrop-blur px-8 py-7
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
    h-full flex flex-col border="2 solid cyan-500/25" rounded-xl bg="cyan-500/8" backdrop-blur px-8 py-7
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

<AiriIntegrationMap :clicks="$clicks" />

---
layout: default
class: px-12 py-8
glowSeed: 405
clicks: 5
---

<div text-4xl font-bold>接口路线：从确定性到通用性</div>
<div mt-2 text="white/50">每往右一步，游戏专用接口更少，感知和控制的不确定性更多。</div>

<div class="route-lane" mt-9>
  <div class="route-card route-teal" :class="$clicks >= 1 ? 'is-visible' : ''">
    <div class="route-icon" i-carbon:api text-teal-300 />
    <div class="route-label">
      <strong>Mod API</strong>
      <span>readable state</span>
    </div>
  </div>
  <div class="route-connector" :class="$clicks >= 2 ? 'is-visible' : ''" />
  <div class="route-card route-sky" :class="$clicks >= 2 ? 'is-visible' : ''">
    <div class="route-icon" i-carbon:tools text-sky-300 />
    <div class="route-label">
      <strong>Tools</strong>
      <span>typed actions</span>
    </div>
  </div>
  <div class="route-connector" :class="$clicks >= 3 ? 'is-visible' : ''" />
  <div class="route-card route-violet" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div class="route-icon" i-carbon:code text-violet-300 />
    <div class="route-label">
      <strong>Code Policy</strong>
      <span>executable plan</span>
    </div>
  </div>
  <div class="route-connector" :class="$clicks >= 4 ? 'is-visible' : ''" />
  <div class="route-card route-cyan" :class="$clicks >= 4 ? 'is-visible' : ''">
    <div class="route-icon" i-carbon:view text-cyan-300 />
    <div class="route-label">
      <strong>Vision</strong>
      <span>screen states</span>
    </div>
  </div>
  <div class="route-connector hard" :class="$clicks >= 5 ? 'is-visible' : ''" />
  <div class="route-card route-orange hard" :class="$clicks >= 5 ? 'is-visible' : ''">
    <div class="route-icon" i-carbon:keyboard text-orange-300 />
    <div class="route-label">
      <strong>Input</strong>
      <span>key & mouse</span>
    </div>
  </div>
</div>

<div mt-4 grid="~ cols-3" gap-4 text-sm class="route-notes">
  <div v-click text="teal-200">左侧：状态可读，先验证策略。</div>
  <div v-click text="sky-200">中段：目标变成可执行计划。</div>
  <div v-click text="orange-200">右侧：更通用，也更不确定。</div>
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
    <div mt-3 text="white/82">第一个选择：一个足够开放，也足够难直播的世界。</div>
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
clicks: 5
---

<div text-3xl font-bold>应该怎么能玩 Minecraft 呢？</div>
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

<div mt-4 class="learning-card compact note-card" :class="$clicks >= 5 ? 'is-visible' : ''">
  <div text-xs uppercase tracking-wider text="orange-300/80">The Silent Killer</div>
  <div mt-1 text-lg font-semibold>这条路工作过，但不适合一直往前硬推。</div>
  <div mt-2 text-sm leading-6 text="white/58">
    事件太多、视觉不是第一人称、直播展示很别扭；后来才转向
    <span font-bold text-orange-300>Fabric 客户端</span>
    和
    <span font-bold text-red-300>更视觉化的游戏</span>。
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 515
clicks: 5
---

<div text-4xl font-bold>那就... 拼成一个工作流？</div>
<div mt-2 text="white/50">先靠 Mineflayer 把世界变成事件，再让 Agent 计划和执行。</div>

<EventFunnel :clicks="$clicks" />

<div mt-4 class="learning-card compact note-card" :class="$clicks >= 5 ? 'is-visible' : ''">
  <div text-xs uppercase tracking-wider text="orange-300/80">The Silent Killer</div>
  <div mt-1 text-lg font-semibold>这条路工作过，但不适合一直往前硬推。</div>
  <div mt-2 text-sm leading-6 text="white/58">
    事件太多、视觉不是第一人称、直播展示很别扭；后来才转向
    <span font-bold text-orange-300>Fabric 客户端</span>
    和
    <span font-bold text-red-300>更视觉化的游戏</span>。
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
    <div mt-3 text="white/82">纯 mod 与 code as policy：人类在聊天栏说话，Agent 调工具，mod 执行。</div>
  </div>
</div>

---
layout: default
class: p-0!
glowSeed: 612
clicks: 6
---

<FactorioStructuredLoop :clicks="$clicks" />

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

<div text-4xl font-bold>第一次的自动 YOLO 识图打标！</div>
<div mt-2 text="white/50">可是... 这么多的游戏内物品怎么都搞完呢？Mod 也太累了吧？</div>

<div class="factorio-vision-panel" mt-8>
  <div class="tech-tree">
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

  <div class="vision-state-chart" :class="$clicks >= 3 ? 'is-visible' : ''">
    <div class="vision-chart-title">
      <span>From detection to executable state</span>
      <strong>难点在 planning 和 code generation</strong>
    </div>
    <div class="vision-bars">
      <div style="--bar: 10px">
        <span>objects</span>
      </div>
      <div style="--bar: 16px">
        <span>recipes</span>
      </div>
      <div style="--bar: 24px">
        <span>topology</span>
      </div>
      <div style="--bar: 34px">
        <span>actions</span>
      </div>
      <div class="danger" style="--bar: 44px">
        <span>Lua code</span>
      </div>
    </div>
  </div>
</div>

<div v-click mt-4 class="learning-card factorio-vision-learning">
  <div i-carbon:idea text-orange-300 />
  <div>
    <div text-xl>视觉只是入口，真正卡住的是计划和代码生成。</div>
    <div mt-2 text="white/55">Factorio 要把配方、朝向、物流连接和执行顺序写成可运行的 Lua / RCON 动作；模型一旦少想一步，就不是“看错”，而是整段 plan 不能执行。</div>
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
    <div mt-3 text="white/82">从复杂工厂退一步：规则还复杂，但屏幕和动作空间更窄。</div>
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

<div text-4xl font-bold>肉鸽游戏和强化学习很像吧... 那小丑牌！</div>
<div mt-2 text="white/50">它不是纯游戏 API，而是半个 computer use：看屏幕、读 UI、再把动作落到鼠标点击。</div>

<div class="balatro-note" mt-5>
  <div i-carbon:idea />
  <div>
    <strong>最难的仍然是 Planning。</strong>
    <span>Balatro 每一步都要在手牌、Joker、倍率、商店和未来回合之间取舍；视觉/OCR 能把状态读出来，但很难保证 LLM 能长期稳定地选出好策略。</span>
  </div>
</div>

<div class="stacked-flow balatro-flow" mt-6>
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

<div class="slide-footnote">
  Related context: UNO Arena uses UNO to evaluate LLM sequential decision-making; recent UNO-agent work also frames card games as planning under hidden information and cooperation.
</div>

---
layout: default
class: px-12 py-8
glowSeed: 720
clicks: 4
---

<div text-4xl font-bold>为什么是这些游戏？</div>
<div mt-2 text="white/50">它们分别卡住 Agent 的不同能力，不是随便挑的 demo。</div>

<div class="game-difficulty-grid title-icon-cards" mt-8>
  <div v-click class="difficulty-card">
    <div class="difficulty-title"><strong>Minecraft</strong><div i-carbon:cube text-green-300 /></div>
    <span>开放世界、事件复杂、目标不明确；适合测试长期任务和具身交互。</span>
  </div>
  <div v-click class="difficulty-card">
    <div class="difficulty-title"><strong>Factorio</strong><div i-carbon:industry text-amber-300 /></div>
    <span>配方、方向、物流网络；适合测试结构化 API 与空间规划。</span>
  </div>
  <div v-click class="difficulty-card">
    <div class="difficulty-title"><strong>Balatro</strong><div i-carbon:game-console text-rose-300 /></div>
    <span>屏幕可控、规则严密；适合测试视觉状态、OCR 和点击执行。</span>
  </div>
  <div v-click class="difficulty-card">
    <div class="difficulty-title"><strong>Dome Keeper / KSP</strong><div i-carbon:rocket text-zinc-200 /></div>
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
      <div v-click><div i-carbon:screen /> Godot viewport screenshot every 0.5s</div>
      <div v-click><div i-carbon:search-locate /> labels from game object tree</div>
      <div v-click><div i-carbon:list-boxes /> YOLO dataset + train/val/test split</div>
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

<div text-4xl font-bold>一边玩一边就可以打标哦～</div>
<div mt-2 text="white/50">面向 YOLO 视觉通过 Mod API 自动标注 ground 的方案</div>

<div class="pipeline-svg" mt-10>
  <div class="pipe-node" :class="$clicks >= 1 ? 'is-visible' : ''"><div i-carbon:game-console /> Game View</div>
  <div class="pipe-arrow" :class="$clicks >= 1 ? 'is-visible' : ''" />
  <div class="pipe-node" :class="$clicks >= 2 ? 'is-visible' : ''"><div i-carbon:code /> Godot Mod</div>
  <div class="pipe-arrow" :class="$clicks >= 2 ? 'is-visible' : ''" />
  <div class="pipe-node pipe-node-tall" :class="$clicks >= 3 ? 'is-visible' : ''"><div i-carbon:drop-photo /> Viewport + Labels</div>
  <div class="pipe-arrow" :class="$clicks >= 3 ? 'is-visible' : ''" />
  <div class="pipe-node" :class="$clicks >= 4 ? 'is-visible' : ''"><div i-carbon:tree-view-alt /> YOLO Train</div>
</div>

<div mt-8 text="white/60" text-lg leading-7 w-230>
  这条线先把“看见游戏”做成可训练的数据集。Live 推理、LLM planner、键鼠输入执行在当前代码里还没有实装证据。
</div>

---
layout: full
class: p-0!
glowSeed: 612
---

<div class="fade-video-slide">
  <video autoplay muted loop>
    <source src="/airi-demo-airicraft.mp4" />
  </video>
  <div class="fade-heading">
    <div flex items-center gap-3 text-2xl font-semibold>
      <div i-carbon:cube /> Minecraft
    </div>
    <div mt-3 text="white/82">原生客户端：让 AI 角色直接看见并持有一个 Minecraft 游戏客户端。</div>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 514
clicks: 4
---

<div text-4xl font-bold>Minecraft 第二次尝试：原生客户端</div>
<div mt-2 text="white/50">原本的问题我们都想解决，直接让 AI 角色能看到和持有一个游戏客户端如何？</div>

<FabricOrbit :clicks="$clicks" />

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
    <div mt-3 text="white/82">另一条极端路线：状态和执行几乎都通过 API 暴露。</div>
  </div>
</div>

---
layout: default
class: px-12 py-8
glowSeed: 716
clicks: 3
---

<div text-4xl font-bold>都复杂规划了，那你可以规划「旅行者一号」吗？</div>
<div mt-2 text="white/50">诶，事实上发射成功率不足 1%</div>

<KspToolLoop :clicks="$clicks" />

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
class: py-10
glowSeed: 1298
---

# 感兴趣吗？

虽然是开源项目，但是也欢迎感兴趣的设计师，产品经理，工程师们一起去实现这可能的生命形态

<div flex>
  <div text-sm text="zinc-300" text-right flex flex-row gap-2 mt-6 translate-x-2>
    <div flex items-center flex-col font-bold text-xl>
      <img src="/github_qr.png" w-70 />
      <div translate-y--4>GitHub</div>
    </div>
    <div flex items-center flex-col font-bold text-xl>
      <img src="/discord_qr.png" w-70 style="filter: brightness(1.5);" />
      <div translate-y--4>Discord</div>
    </div>
    <div flex items-center flex-col font-bold text-xl>
      <img src="/telegram_qr.png" w-70 style="filter: brightness(1.5);" />
      <div translate-y--4>Telegram</div>
    </div>
  </div>
</div>

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
      <img src="/relu-art-6.gif" size-50 rounded-2xl overflow-hidden translate-y--20>
    </div>
  </div>
  <div text-lg text="zinc-300" text-right flex flex-col gap-3 mt-3>
    <div>
      演示文稿开源在 <a href="https://github.com/nekomeowww/talks"><div inline-block mr-1 translate-y-0.8 i-ri:github-fill />github.com/nekomeowww/talks</a>
    </div>
    <div>
      演示文稿使用 <a href="https://sli.dev"><div inline-block mr-1 translate-y-0.8 i-logos:slidev />sli.dev</a> 构建
    </div>
    <div self-end mt-16 translate-x-14 translate-y--9>
      <img src="/slide_qr.png" w-100 />
    </div>
  </div>
</div>
