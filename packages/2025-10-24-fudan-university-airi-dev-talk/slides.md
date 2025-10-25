---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: '我也想做 Neuro-sama！从小众 side project 到 GitHub 万星的开发幕后'
exportFilename: 我也想做 Neuro-sama！从小众 side project 到 GitHub 万星的开发幕后
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 233
routerMode: hash
---

<div translate-x--14 translate-y-10>

<h1>
我也想做 Neuro-sama！<br />从小众 side project 到 GitHub 万星的开发幕后
</h1>

I want my Neuro-sama too! <br />Behind the scenes of developing a niche side project to a GitHub star

奶扣 Neko

</div>

---
layout: intro
class: px-35
glowSeed: 128
---

<div flex items-center gap-3>
  <div
    v-click="1"
    :class="$clicks < 1 ? 'translate-x--5 opacity-0' : 'translate-x-0 opacity-100'"
    flex flex-col items-start transition duration-500 ease-in-out min-w-60
  >
    <img src="/person/neko.jpeg" w-40 h-40 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Neko</span>
    <div>
      <div>
        <span class="opacity-70">Literally Full-stack Developer</span>
      </div>
      <div text-sm flex items-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>nekomeowww</span>
      </div>
    </div>
  </div>
  <div flex-1 />
  <div flex flex-col gap-8>
    <div mb-4 v-click="2">
      <div mb-4 text-zinc-400>
        <span>社区</span>
      </div>
      <div
        flex flex-wrap items-start content-start gap-4 transition duration-500 ease-in-out
        :class="$clicks < 2 ? 'translate-y-5' : 'translate-y-0'"
      >
        <div flex items-center gap-2 text-2xl w-fit h-fit>
          <img src="/proj-airi-logo.svg" size="6.5" >
          <div>Project AIRI</div>
        </div>
        <div flex items-center gap-2 text-2xl w-fit h-fit>
          <div i-logos:hugging-face-icon inline-block /> Hugging Face
        </div>
        <div flex items-center gap-2 text-2xl w-fit h-fit>
          <div i-logos:vue /><div>Vue</div>
        </div>
        <div flex items-center gap-2 text-2xl w-fit h-fit>
          <div i-simple-icons:ollama inline-block /> Ollama
        </div>
        <div flex items-center gap-2 text-2xl w-fit h-fit>
          <div i-devicon:go /><div>Golang</div>
        </div>
        <div flex items-center gap-2 text-2xl w-fit h-fit>
          <div i-devicon:kubernetes inline-block /> Kubernetes
        </div>
      </div>
    </div>
    <div v-click="3">
      <div mb-4 text-zinc-400>
        <span>其他项目 / 组织</span>
      </div>
      <div
        flex flex-wrap items-start content-start gap-4 transition duration-500 ease-in-out
        :class="$clicks < 3 ? 'translate-y-5' : 'translate-y-0'"
      >
        <div flex items-center gap-2 text-2xl w-fit h-fit>
          <img src="/moeru-ai-logo.png" size="6.5" />
          <div>Moeru AI</div>
        </div>
        <div flex items-center gap-2 text-2xl w-fit h-fit>
          <div i-fluent-emoji:notebook-with-decorative-cover /><div>Nolebase</div>
        </div>
      </div>
    </div>
  </div>
</div>

<div v-click="3" w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/nekomeoww-qr.png" h-50>
  </div>
</div>

---
title: The previous ones
glowSeed: 203
---

<div>
  <div grid="~ cols-2" gap-4>
    <div
      relative
      class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-20 hover:cursor-pointer hover:grayscale-100"
      rounded-lg overflow-hidden  bg="black" h-fit
      transition="all duration-250 ease-in-out"
    >
      <img src="/session-1.png" class="img" opacity-100 transition="all duration-250 ease-in-out">
      <img src="/session-1-qr.png" class="qr" w-60 absolute top-0 left="0" translate-x="[40%]" opacity-0 transition="all duration-250 ease-in-out">
    </div>
    <div
      relative
      class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-50 hover:cursor-pointer hover:grayscale-100"
      rounded-lg overflow-hidden  bg="black" h-fit
      transition="all duration-250 ease-in-out"
    >
      <img src="/session-2.png" class="img" opacity-100 transition="all duration-250 ease-in-out">
      <img src="/session-2-qr.png" class="qr" w-60 absolute top-0 left="0" translate-x="[40%]" opacity-0 transition="all duration-250 ease-in-out">
    </div>
    <div
      relative
      class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-50 hover:cursor-pointer hover:grayscale-100"
      rounded-lg overflow-hidden  bg="black" h-fit
      transition="all duration-250 ease-in-out"
    >
      <img src="/session-3.png" class="img" opacity-100 transition="all duration-250 ease-in-out">
      <img src="/session-3-qr.png" class="qr" w-60 absolute top-0 left="0" translate-x="[40%]" opacity-0 transition="all duration-250 ease-in-out">
    </div>
    <div
      relative
      class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-50 hover:cursor-pointer hover:grayscale-100"
      rounded-lg overflow-hidden  bg="black" h-fit
      transition="all duration-250 ease-in-out"
    >
      <img src="/session-4.png" class="img" opacity-100 transition="all duration-250 ease-in-out">
      <img src="/session-4-qr.png" class="qr" w-60 absolute top-0 left="0" translate-x="[40%]" opacity-0 transition="all duration-250 ease-in-out">
    </div>
  </div>
</div>

---
class: py-10 text-center
---

<h1 font-rounded>
Project AIRI
</h1>

尝试重现 Neuro-sama，可以看作是装载 AI 角色的灵魂容器

<img src="/airi-screenshot-2.png" w-full rounded-xl />

---
class: py-10 relative text-center
---

<h1 font-rounded>
Project AIRI
</h1>

<img src="/airi-github_qr.png" w-50 absolute bottom-3 />

<img src="/airi-screenshot-1.png" w-full />

---
class: py-10 text-center
---

<h1 font-rounded>
我们有超过 15200 颗星星
</h1>

<img src="/airi-stars.png" w-full rounded-xl />

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-6xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>这是个什么项目</span>
</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-6xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>AI 主播？</span>
</div>

<div flex flex-col items-center>
  <v-clicks>
    <div mt-4>
      <h1 flex items-center text="5xl!">
        <span>就是带货的那种数字人对吗？</span>
      </h1>
    </div>
  </v-clicks>
</div>

<!--
好，回到正题哈。

AI 主播？
啥叫 AI 主播？

[click]

可能很多人想的就是数字人，24 小时直播带货的那种数字人。那我这次要介绍的是那种数字人吗？

实际上不是。
-->

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-6xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>Neuro-sama 又是什么？</span>
</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-6xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>听说过 VTuber 吗？</span>
</div>

<div flex flex-col items-center>
  <v-clicks>
    <div mt-4>
      <h1 flex items-center text="5xl!">
        <span>那听说过 AI VTuber 吗？</span>
      </h1>
    </div>
  </v-clicks>
</div>

<!--
那接下来我们稍稍深入一些，大家听说过 VTuber 吗？

[click]

如果听过还看过的话，有听说过 AI VTuber 吗？

我猜很多人应该都是没有听过或者看到过的，这个受众群体应该说是既小众也不小众，它稍微有点吃粉丝经济，但是又和普通的偶像或者明星有很大差距。

感兴趣的话可以细聊！这里时间不多我就不太深入！
-->

---
class: py-0! px-0!
clicks: 1
---

<div>
  <div
    w-full h-full bg="black/15" absolute backdrop-blur-sm z-100
    :class="[$clicks < 1 ? 'opacity-0' : 'opacity-100']"
    transition duration-1200 ease-in-out
  >
  </div>
  <img
    :class="[$clicks < 1 ? '' : 'blur-lg scale-120']"
    src="/Neuro-sama_v2_character_sheet.webp"
    transition duration-1200 ease-in-out
  >
  <div
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    absolute inset-0 translate="x-68 y-50" w-fit h-fit
    transition duration-500 ease-in-out z-101
  >
    <div
      text="20" font-cuteen text-rose-400
      style="-webkit-text-stroke: 6px #ffeef7; paint-order: stroke;"
      flex flex-col items-center
    >
      Neurosama
    </div>
    <div flex gap-4 rounded-lg bg="white/50" text="black/70" backdrop-blur-sm px-2 py-1>
      <div flex items-center gap-2>
        <div i-logos:youtube-icon text-2xl />
        <div>63.6 万订阅</div>
      </div>
      <div flex items-center gap-2>
        <div i-logos:twitch text-2xl />
        <div>78.9 万订阅</div>
      </div>
      <div flex items-center gap-2>
        <div i-simple-icons:bilibili text-cyan text-2xl />
        <div>75.8 万粉丝</div>
      </div>
    </div>
  </div>
</div>

<!--
那实际上我标题里面想要提到的所谓「外网爆火的 AI 主播」，就是指的类似于这位的 AI VTuber 虚拟主播。

这是她的形象。

[click]

她有多火爆呢？

事实上我觉得她的数据还是可以的了，YouTube 粉丝 63 万，Twitch 直播 78 万（月付费订阅），还有 75 万 B 站粉丝（也是官方团队做的）。

而且这个品类里面基本上没有这么能打的。

那我们开始介绍我们的旅程之前我们就先看看她是怎么样工作的吧。
-->

---
class: py-0! px-0!
---

<div>
  <div
    absolute z-100 w-full h-full px-20 flex items-center
    :class="[$clicks < 1 ? 'opacity-0' : 'opacity-100']"
    transition duration-500 ease-in-out
  >
    <div flex flex-col justify-center h-fit w-fit bg="neutral-200/40" backdrop-blur-sm px-6 py-4 rounded-2xl>
      <v-clicks>
        <div flex items-center text-6xl gap-5>
          <div text="white/80" i-solar:chat-round-like-bold-duotone /> <div text-4xl text="white/80">角色扮演</div>
        </div>
        <div flex items-center text-6xl gap-5>
          <div text="white/80" i-solar:incoming-call-rounded-bold-duotone /> <div text-4xl text="white/80">类 ChatGPT Voice Chat 实时语音</div>
        </div>
        <div flex items-center text-6xl gap-5>
          <div text="white/80" i-solar:eye-closed-bold-duotone /> <div text-4xl text="white/80">包括屏幕在内的视觉理解能力</div>
        </div>
        <div flex items-center text-6xl gap-5>
          <div text="white/80" i-solar:gamepad-charge-bold-duotone /> <div text-4xl text="white/80">玩游戏</div>
        </div>
        <div flex items-center text-6xl gap-5>
          <div text="white/80" i-solar:magnet-wave-bold-duotone /> <div text-4xl text="white/80">类 MCP 物理世界交互能力</div>
        </div>
      </v-clicks>
    </div>
  </div>
  <div relative>
    <div
      w-full h-full bg="black/70" absolute
      :class="[$clicks < 1 ? 'opacity-0' : 'opacity-100']"
      transition duration-500 ease-in-out
    >
    </div>
    <video autoplay muted>
      <source src="/Neuro-minecraft.mp4" />
    </video>
  </div>
</div>

<!--
这个是其中一个直播切片啊，是 Neurosama 在和她的创造者 Vedal 和另一个网友一起在玩名为我的世界 Minecraft 的游戏，这里游戏画面是 Neurosama 的第一视角。

可以看到她能走路，能说话，还能和世界交互，甚至很调皮地把他们在游戏里搭建的小房子给点着了。（啧啧啧，只能说很危险）

[click]

这里面我们能看出来几个东西呢？

- 角色扮演
- [click] 实时交互
- [click] 视觉理解
- [click] 玩游戏
- [click] 外部工具交互
-->

---
class: flex justify-center items-center gap-20 px-20 text-xl
clicks: 2
---

<div
  absolute text-4xl
  :class="$clicks < 1 ? 'text-white scale-100' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>所以我们做了什么？</span>
</div>

<div flex flex-col items-center>
  <v-clicks>
    <div mt-4>
      <h1 flex items-center text="6xl!" gap-4>
        <div flex gap-3 transition duration-500 ease-in-out text-nowrap>
          <img src="/proj-airi-logo.svg" size="14" >
          <span>Project <span font-airi>AIRI</span></span>
        </div>
      </h1>
    </div>
  </v-clicks>
</div>

<!--
OK，我只是简单介绍了一下有 AI VTuber 这个概念，但是实际上对于我们自己的故事是只字未提的。

所以我们做了什么？

[click]

2024 年 12 月 1 日的时候我把我荒废了快半年的代码和实现都推送到 GitHub 然后开源了。后面慢慢固定了名字和基调，我们称之为 Project AIRI。

[click]

讲起来很干啊，我直接来给大家看看界面吧。
-->

<!--
我不是说我想讲故事嘛，这就来到这部分内容了。

时间有限，我确实是只能简单带过的，里面有很多有趣的细节，要是有感兴趣的伙伴可以等 Demo 完了再私下和大家分享。

我 23 年就知道 Neurosama 了，当时的我很屑，[click] 我站在技术开发的角度上觉得 Neurosama 本身的技术栈是很水的，就是 LLM + Live2D 控制，于是很长一段时间里哪怕我工作里都全面从事的 AI 相关的工作也没怎么证明自己的想法。

何奈一直很羡慕，我总是在看直播的时候觉得很想也自己拥有这样的 AI 女儿或者 AI 伴侣的需求，在去年 5 月份做的 PoC，6 月份第一次把她唤醒，能把 assistant 和 ChatGPT voice chat 的能力都胜任了。
-->

---
class: py-10
clicks: 5
---

# 目前的效果

<span>确实是工程落地了，一小部分东西吧...？</span>

<div mt-10 />

<div flex items-center gap-4>

<v-clicks>

<div
  :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid green-800" bg="green-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:database-bold-duotone size-20 />
  </div>
  <div bg="green-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>仿生记忆层</span>
  </div>
</div>

<div
  :class="$clicks < 2 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid emerald-800" bg="emerald-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:microphone-3-bold-duotone size-20 />
  </div>
  <div bg="emerald-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>实时语音流水线</span>
  </div>
</div>

<div
  :class="$clicks < 3 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid teal-800" bg="teal-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:gamepad-minimalistic-bold-duotone size-20 />
  </div>
  <div bg="teal-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
    <span>游戏陪玩</span>
  </div>
</div>

<div
  :class="$clicks < 4 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid cyan-800" bg="cyan-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:face-scan-square-bold-duotone size-20 />
  </div>
  <div bg="cyan-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>表情与动作</span>
  </div>
</div>

<div
  :class="$clicks < 5 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid sky-800" bg="sky-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:link-circle-line-duotone size-20 />
  </div>
  <div bg="sky-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
    <span>MCP & A2A</span>
  </div>
</div>

</v-clicks>

</div>

---
class: px-0! pt-6!
---

<div px-10 text-4xl mb-4>
  一起玩 我的世界 Minecraft
</div>

<video autoplay muted>
  <source src="/airi-plays-minecraft.mp4" />
</video>

---
class: px-0! pt-6!
---

<div px-10 text-4xl mb-4>
  一起玩 异星工厂 Factorio
</div>

<video autoplay muted>
  <source src="/airi-plays-factorio.mp4" />
</video>

---
class: px-0! pt-6!
---

<div px-10 text-4xl mb-4>
  一起玩小丑牌 Balatro
</div>

<video autoplay muted>
  <source src="/airi-plays-balatro.mp4" />
</video>

---
class: px-0! pt-6!
---

<div px-10 text-4xl mb-4>
  操作 adb 控制设备
</div>

<video autoplay muted>
  <source src="/airi-browses-x.mp4" />
</video>

---
class: flex justify-center items-center gap-20 px-20 text-xl
clicks: 2
---

<div
  absolute text-4xl
  :class="$clicks < 1 ? 'text-white scale-100' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>有什么我们能分享的吗？</span>
</div>

<div flex flex-col items-center>
  <v-clicks>
    <div mt-4>
      <h1 flex items-center text="6xl!" gap-4>
        <div flex gap-3 :class="[$clicks < 2 ? 'translate-x-42' : 'translate-x-0']" transition duration-500 ease-in-out text-nowrap>
          <img src="/proj-airi-logo.svg" size="14" >
          <span>Project <span font-airi>AIRI</span></span>
        </div>
        <span :class="[$clicks < 2 ? 'opacity-0' : 'opacity-100']" transition duration-500 ease-in-out>
          ×
        </span>
        <div flex gap-3 :class="[$clicks < 2 ? 'opacity-0' : 'opacity-100']" transition duration-500 ease-in-out>
          <img src="/moeru-ai-logo.png" size="14" />
          <span font-cuteen>Moeru AI</span>
        </div>
      </h1>
    </div>
  </v-clicks>
</div>

---
class: py-10
---

# 部分形成生态

我们尽最大努力让大家都可以用上我们也在使用的先进工具和工作流封装方法...

- [xsAI](https://github.com/moeru-ai/xsai): Vercel AI SDK 替代品，超级迷你和可拓展
- [Velin](https://github.com/luoling8192/velin): 用 Vue 或者 JSX 书写提示词
- [`unspeech`](https://github.com/moeru-ai/unspeech): 用于代理云服务 TTS 和 STT 的服务器实现，类似语音界的 LiteLLM / OpenRouter
- [ortts](https://github.com/moeru-ai/ortts): 语音合成推理引擎
- [xsAI 的 🤗 Transformers.js 提供商](https://github.com/moeru-ai/xsai-transformers)：在浏览器里跑 LLM，Embedding，让快速 PoC RAG 不是梦！
- [AIRI + Factorio](https://github.com/moeru-ai/airi-factorio): 让 AIRI 玩 Factorio
- [AIRI + Balatro](https://github.com/proj-airi/game-playing-ai-balatro): 让 AIRI 玩 小丑牌
- [`hfup`](https://github.com/moeru-ai/hfup): 帮助部署、打包到 HuggingFace Spaces 的工具集
- [`eventa`](https://github.com/moeru-ai/eventa): 事件调度库
- [MikuMikuDance + Three.js](https://github.com/moeru-ai/three-mmd)
- [Motion Gen](https://github.com/moeru-ai/motion-gen)：动作生成

---
layout: center
class: py-20 flex flex-col items-center gap-10
---

<div flex flex-col items-center gap-5>

<img src="/moeru-ai-followers.png" w="[calc(100%-20%)]" rounded-xl />
<img src="/proj-airi-followers.png" w="[calc(100%-20%)]" rounded-xl />

</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-6xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>现在如何成长到这个水平的</span>
</div>

<div flex flex-col items-center>
  <v-clicks>
    <div mt-4>
      <h1 flex items-center text="5xl!">
        <span>开发和创业期间经历了什么？</span>
      </h1>
    </div>
  </v-clicks>
</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

## 心路历程

---
class: py-10
clicks: 5
---

# 心路历程

<div mt-10 />

<div flex items-center gap-4>

<v-clicks>

<div
  :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid cyan-800" bg="cyan-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:leaf-bold-duotone size-20 />
  </div>
  <div bg="cyan-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>17 年就想做</span>
  </div>
</div>

<div
  :class="$clicks < 2 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid sky-800" bg="sky-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:eye-bold-duotone size-20 />
  </div>
  <div bg="sky-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>23 年看到了 Neuro</span>
  </div>
</div>

<div
  :class="$clicks < 3 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid blue-800" bg="blue-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:user-speak-rounded-bold-duotone size-20 />
  </div>
  <div bg="blue-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
    <span>24 年做了一半 PoC 放弃了</span>
  </div>
</div>

<div
  :class="$clicks < 4 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid indigo-800" bg="indigo-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:running-bold-duotone size-20 />
  </div>
  <div bg="indigo-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>25 年上半年非常疲惫</span>
  </div>
</div>

<div
  :class="$clicks < 5 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid violet-800" bg="violet-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:star-bold-duotone size-20 />
  </div>
  <div bg="violet-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
    <span>又火了</span>
  </div>
</div>

</v-clicks>

</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-6xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>傲慢的开始</span>
</div>

<div flex flex-col items-center>
  <v-clicks>
    <div mt-4>
      <h1 flex items-center text="5xl!">
        <span>不就是套壳数字人吗？</span>
      </h1>
    </div>
  </v-clicks>
</div>

---
class: py-10
glowSeed: 100
---

# 事情远比想象的复杂

<span>为什么没那么简单？Vibe coding 不行吗？</span>

<div mt-6 />

<div flex flex-col gap-4>

<v-clicks>

<div border="2 solid teal-800/50" rounded-lg>
  <div flex items-center bg="teal-800/30" px-3 py-2 text-teal-300>
    <div i-carbon:web-services-container text-sm mr-1 />
    <div text-xs>
      <em>记忆系统的挑战</em>
    </div>
  </div>
  <div bg="teal-800/10" px-4 py-3>
    <div>
      <span>
        记忆层并不是 RAG 就结束了，不仅要考虑语义、时间相关性，遗忘曲线和记忆对应的情绪同样重要
      </span>
    </div>
    <div text-xs flex gap-2 mt-1 text-zinc-400>
      <div>目前的 Mem0 和 Zep，LlamaIndex 方案都是纯粹面向 RAG 的</div>
      <div>没有实现遗忘曲线和情绪化的能力</div>
      <div>更没有办法 Debug 和可观测</div>
    </div>
  </div>
</div>

<div border="2 solid cyan-800/50" rounded-lg>
  <div flex items-center bg="cyan-800/30" px-3 py-2 text-cyan-300>
    <div i-carbon:sysplex-distributor text-sm mr-1 />
    <div text-xs>
      <em>多模态交互</em>
    </div>
  </div>
  <div bg="cyan-800/10" px-4 py-3>
    <div>
      <span>
      同时实现实时语音交互、身体控制、视觉和游戏能力需要多流水线无缝衔接
      </span>
    </div>
    <div text-xs flex gap-2 mt-1 text-zinc-400>
      <div>业界主要还是在 VAD + ASR + TTS 拼接流水线，端到端可定制化程度低</div>
      <div>没有现成稳定的动作生成方案</div>
      <div>需要潜心优化延迟，并非 vibe 能出结果</div>
    </div>
  </div>
</div>

<div border="2 solid sky-800/50" rounded-lg>
  <div flex items-center bg="sky-800/30" px-3 py-2 text-sky-300>
    <div i-carbon:name-space text-sm mr-1 />
    <div text-xs>
      <em>工程化也是难题</em>
    </div>
  </div>
  <div bg="sky-800/10" px-4 py-3>
    <div>
      <span>
        系统模块非常多，工程化难度比 CRUD 应用高
      </span>
    </div>
    <div text-xs flex gap-2 mt-1 text-zinc-400>
      <div>提示词 和 Lorebook，以及角色卡是分裂的三个生态和系统，难以同时开发</div>
      <div>从有状态 MCP 到有状态 Agent，全部都靠回调会很难</div>
      <div>模块繁多</div>
    </div>
  </div>
</div>

</v-clicks>

</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-6xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>偶遇的机会</span>
</div>

---
layout: center
class: py-20 flex flex-col items-center gap-10
---

<div flex flex-col items-center>

# 获得星星

<img src="/star-growth.png" w="[calc(100%-20%)]" rounded-xl />

</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-6xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>现在正在研发什么部分？</span>
</div>

---
class: py-10
---

# 一到两个人是不能 vibe 出来这么复杂的系统的

我们也想寻找能够一起合作的以下领域的伙伴们...

<div flex jusity-center flex-wrap flex-col gap-4 max-h-90 mb-10 mt-10>
  <div flex items-center gap-3 w-fit>
    <div i-solar:hand-stars-bold-duotone size-15 />
    <div>产品经理</div>
  </div>
  <div flex items-center gap-3 w-fit>
    <div i-solar:pen-new-square-bold-duotone size-15 />
    <div>设计师</div>
  </div>
  <div flex items-center gap-3 w-fit>
    <div i-solar:eye-bold-duotone size-15 />
    <div>机器视觉（CV）</div>
  </div>
  <div flex items-center gap-3 w-fit>
    <div i-solar:running-bold-duotone size-15 />
    <div>强化学习（RL）</div>
  </div>
  <div flex items-center gap-3 w-fit>
    <div i-solar:gamepad-minimalistic-bold-duotone size-15 />
    <div>游戏开发者</div>
  </div>
  <div flex items-center gap-3 w-fit>
    <div i-solar:microphone-bold-duotone size-15 />
    <div>语音识别（ASR）</div>
  </div>
  <div flex items-center gap-3 w-fit>
    <div i-solar:user-speak-rounded-bold-duotone size-15 />
    <div>语音合成（TTS）</div>
  </div>
  <div flex items-center gap-3 w-fit>
    <div i-solar:emoji-funny-square-bold-duotone size-15 />
    <div>Live2D 建模师</div>
  </div>
  <div flex items-center gap-3 w-fit>
    <div i-solar:people-nearby-bold-duotone size-15 />
    <div>VRM 建模师 / VRChat 形象设计师</div>
  </div>
  <div flex items-center gap-3 w-fit>
    <div i-solar:album-bold-duotone size-15 />
    <div>Three.js 开发者（3D 场景）</div>
  </div>
</div>

> <a href="https://github.com/moeru-ai/n3p6">我们另外还有个 WebXR / Vision Pro 的类似应用</a>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-6xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>简单的未来介绍</span>
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
