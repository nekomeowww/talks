---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: '爱，螃蟹，机器人：具身智能的冒险'
exportFilename: 爱，螃蟹，机器人：具身智能的冒险
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 233
routerMode: hash
---

<div translate-y-0 flex flex-col items-center gap-4 relative>

<div absolute scale-130 class="opacity-50 translate-y--15">
  <EffectSlotMachine />
</div>

<div flex flex-col items-center translate-y-40>
  <div class="text-lg text-white/30">
    AI, Crab, Robot: Adventure with Embodied AI
  </div>
  <div class="text-3xl">
    爱，螃蟹，机器人：具身智能的冒险
  </div>
  <div class="translate-y-5 text-white/50">
    奶扣 Neko / Makito Yu / Liet
  </div>
</div>

</div>

---
layout: intro
class: px-35
glowSeed: 205
---

<div flex>
  <div
    v-click="1" flex flex-col items-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
  >
    <img src="/person/neko.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl >Neko</span>
    <div items-center>
      <div>
        <span class="opacity-70">Software Engineer</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>nekomeowww</span>
      </div>
    </div>
  </div>
  <div flex-1 />
  <div
    v-click="2" flex flex-col items-center transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
  >
    <img src="/person/sumimakito.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Makito</span>
    <div items-center>
      <div class="opacity-70 flex items-center gap-2">
        <div i-simple-icons:kong></div><span>Kong Staff</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>sumimakito</span>
      </div>
    </div>
  </div>
  <div flex-1 />
  <div
    v-click="3" flex flex-col items-center transition duration-500 ease-in-out
    :class="$clicks < 3 ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
  >
    <img src="/person/lietblue.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Liet</span>
    <div flex-col items-center>
      <div>
        <span class="opacity-70">Software engineer</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>lietblue</span>
      </div>
    </div>
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
      class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-50 hover:cursor-pointer hover:grayscale-100"
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
我们有超过 17000 颗星星
</h1>

<img src="/airi-stars.png" w-full rounded-xl />

---
class: px-0! pt-6!
---

<div px-10 text-4xl mb-4>
  一起玩 异星工厂 Factorio
</div>

<video autoplay muted loop>
  <source src="/airi-plays-factorio.mp4" />
</video>

---
class: py-10
glow: bottom
glowSeed: 350
---

# 那今天有什么好东西？

<span>异星工厂好玩，我也想要 AIRI 有现实世界里的机械臂可以操作！</span>

<div mt-8 />

<v-clicks>

- 具身智能都有些啥？
- 怎么样可以自己拥有一个？
- 流程都有什么？
- 如何利用现有的 Rust 生态一起共建自己的具身智能？
- 还有什么值得做的？

</v-clicks>

---
class: py-10
---

<div class="relative">
  <video v-click autoplay muted loop class="relative rounded-md w-120" :class="[$clicks === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-100', $clicks > 1 ? 'opacity-30 scale-75' : '']" transition="all duration-500 ease-in-out">
    <source src="/videos/pistar06-coffee.mp4" />
  </video>
  <video v-click  autoplay muted loop class="absolute rounded-md w-120 top-1/4 left-[calc(25%-4rem)]" :class="[$clicks === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-100', $clicks > 2 ? 'opacity-30 scale-75' : '']" transition="all duration-500 ease-in-out">
    <source src="/videos/pistar06-folding-box.mp4" />
  </video>
  <video v-click autoplay muted loop class="absolute rounded-md w-120 top-1/2 left-[calc(50%-8rem)] " :class="[$clicks === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-100', $clicks > 3 ? 'opacity-30 scale-75' : '']" transition="all duration-500 ease-in-out">
    <source src="/videos/pistar06-laundry.mp4" />
  </video>
</div>

---
class: py-10
---

# 机器人？不写 Agent 了吗？怎么想研究机器人了

<span>从“机器人学”到“机器人学习”的学习起点</span>

<div mt-12 />

<div grid grid-cols-2 gap-3 h-75>

<v-clicks>

  <div border="2 solid white/5" rounded-lg overflow-hidden bg="white/5" backdrop-blur-sm h-full>
    <div flex items-center bg="white/10" backdrop-blur px-3 py-2 rounded-md>
      <div i-carbon:flag text-amber-300 text-sm mr-2 />
      <div font-semibold>还能做什么，扭秧歌？</div>
    </div>
    <div px-4 py-3>
      <div text-sm font-medium>机器人挺有意思的</div>
      <div text-xs opacity-70>像是 pi0 的视频里可以帮忙做咖啡叠衣物，未来大有可用</div>
    </div>
  </div>

  <div border="2 solid white/5" rounded-lg overflow-hidden bg="white/5" backdrop-blur-sm h-full>
    <div flex items-center bg="white/10" backdrop-blur px-3 py-2 rounded-md>
      <div i-carbon:chip text-yellow-300 text-sm mr-2 />
      <div font-semibold>难道目前的机器人不够用吗？</div>
    </div>
    <div px-4 py-3>
      <div text-sm font-medium>有不同的 approach 正在寻找办法受限场景的运动学建模</div>
      <div text-xs opacity-70>数据 + 算力替代手工建模</div>
    </div>
  </div>

  <div border="2 solid white/5" rounded-lg overflow-hidden bg="white/5" backdrop-blur-sm h-full>
    <div flex items-center bg="white/10" backdrop-blur px-3 py-2 rounded-md>
      <div i-carbon:connect text-orange-300 text-sm mr-2 />
      <div font-semibold>参与到如今在快速变化和发展的行业</div>
    </div>
    <div px-4 py-3>
      <div text-sm font-medium>目前还没有彻底研究透整个 pipeline 和 研发 的流程</div>
      <div text-xs opacity-70>比如感知到动作的端到端策略</div>
    </div>
  </div>

  <div border="2 solid white/5" rounded-lg overflow-hidden bg="white/5" backdrop-blur-sm h-full>
    <div flex items-center bg="white/10" backdrop-blur px-3 py-2 rounded-md>
      <div i-carbon:data-base text-rose-300 text-sm mr-2 />
      <div font-semibold>值得动手尝试</div>
    </div>
    <div px-4 py-3>
      <div text-sm font-medium>多模态数据与开放数据生态</div>
      <div text-xs opacity-70>生态很丰富，从 3D 打印，到 VR/MR 设备融合，游戏引擎，世界模型...</div>
    </div>
  </div>

</v-clicks>

</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-5xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>所以是什么样的机器人？机械臂？</span>
</div>

---
class: px-0! pt-6! text-center
---

<div px-10 text-4xl mb-4>
  看看它是什么样的
</div>

<video autoplay muted loop>
  <source src="/videos/lerobot-teleop-demo.mp4" />
</video>

---
class: py-10
---

# 具身智能常见三类形态

<span>机械臂、人形机器人、灵巧手各做什么</span>

<div mt-6 />

<div grid="~ cols-3" gap-4 h-75>

<v-clicks>

  <div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm flex flex-col h-full>
    <div flex flex-col justify-center items-center bg="amber-800/30" px-3 py-2 text-amber-200 h="70%">
      <div i-mdi:arm-flex text-6xl mb-4 />
      <div font-semibold>机械臂（Manipulator）</div>
    </div>
    <div bg="amber-900/5" px-4 py-3 flex items-center justify-center flex-col h="30%">
      <div text-sm font-medium>固定底座 + 末端执行器</div>
      <div text-xs opacity-70>擅长抓取、装配、精确操作</div>
    </div>
  </div>

  <div border="2 solid yellow-800/50" rounded-lg overflow-hidden bg="yellow-900/10" backdrop-blur-sm flex flex-col h-full>
    <div flex flex-col justify-center items-center bg="yellow-800/30" px-3 py-2 text-yellow-200 h="70%">
      <div i-mdi:human text-6xl mb-4 />
      <div font-semibold>人形机器人（Humanoid）</div>
    </div>
    <div bg="yellow-900/5" px-4 py-3 flex items-center justify-center flex-col h="30%">
      <div text-sm font-medium>多关节 + 平衡控制</div>
      <div text-xs opacity-70>擅长移动、协作、复杂场景任务</div>
    </div>
  </div>

  <div border="2 solid orange-800/50" rounded-lg overflow-hidden bg="orange-900/10" backdrop-blur-sm flex flex-col h-full>
    <div flex flex-col justify-center items-center bg="orange-800/30" px-3 py-2 text-orange-200 h="70%">
      <div i-mdi:hand-back-left text-6xl mb-4 />
      <div font-semibold>灵巧手（Dexterous Hand）</div>
    </div>
    <div bg="orange-900/5" px-4 py-3 flex items-center justify-center flex-col h="30%">
      <div text-sm font-medium>高自由度、多指接触</div>
      <div text-xs opacity-70>擅长精细抓取与复杂物体操作</div>
    </div>
  </div>

</v-clicks>

</div>

---
class: py-10
---

# 几种不同级别的机器人动作控制

<span>理解「改变什么状态」</span>

<div mt-6 />

<div flex items-center gap-4 h-75>

<v-clicks>

<div
  :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid amber-900" bg="amber-900/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
  flex flex-col items-center
>
  <img src="/category-manipulation.avif" class="aspect-[1.32] object-cover rounded-md h-full">
  <div bg="amber-900/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>Manipulation</span>
  </div>
</div>

<div
  :class="$clicks < 2 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid amber-800" bg="amber-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
  flex flex-col items-center
>
  <img src="/category-locomotion.jpg" class="aspect-[1.32] object-cover rounded-md h-full">
  <div bg="amber-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>Locomotion</span>
  </div>
</div>

<div
  :class="$clicks < 3 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid yellow-800" bg="yellow-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
  flex flex-col items-center
>
  <img src="/category-full-body.jpg" class="aspect-[1.32] object-cover rounded-md h-full">
  <div bg="yellow-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>Whole-Body Control</span>
  </div>
</div>

</v-clicks>

</div>

---
class: py-10
---

# 机械臂从 0 到落地，会经历什么？

<span>非常非常复杂，超乎你的想象</span>

<div mt-8 />

<div flex items-center gap-4>

<v-clicks>

<div
  :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid amber-900" bg="amber-900/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:reel-bold-duotone size-20 />
  </div>
  <div bg="amber-900/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>任务定义</span>
  </div>
</div>

<div
  :class="$clicks < 2 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid amber-800" bg="amber-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:database-bold-duotone size-20 />
  </div>
  <div bg="amber-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>环境搭建</span>
  </div>
</div>

<div
  :class="$clicks < 3 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid yellow-800" bg="yellow-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:screencast-bold-duotone size-20 />
  </div>
  <div bg="yellow-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>数据采集</span>
  </div>
</div>

<div
  :class="$clicks < 4 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid orange-800" bg="orange-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:gamepad-minimalistic-bold-duotone size-20 />
  </div>
  <div bg="orange-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
    <span>数字孪生</span>
  </div>
</div>

<div
  :class="$clicks < 5 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid orange-700" bg="orange-700/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:bill-check-bold-duotone size-20 />
  </div>
  <div bg="orange-700/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
    <span>评估</span>
  </div>
</div>

<div
  :class="$clicks < 5 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid orange-700" bg="orange-700/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:scooter-bold-duotone size-20 />
  </div>
  <div bg="orange-700/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
    <span>实机测试</span>
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
  <span>机械臂哪里来？很贵吗？</span>
</div>

<div flex flex-col items-center>
  <v-clicks>
    <div mt-4>
      <h1 flex items-center text="5xl!">
        <span>¥1300 就可以做到</span>
      </h1>
    </div>
  </v-clicks>
</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-5xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>数据从哪里来？哪里学？</span>
</div>

---
class: px-0! pt-6! text-center
---

<div px-10 text-4xl mb-4>
  可以自己录
</div>

<video autoplay muted loop>
  <source src="/videos/lerobot-pick-and-place-record.mp4" />
</video>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-5xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>这么多复杂的东西都要自己研究吗？</span>
</div>

---
class: py-0! px-0! bg-[#ff9d00] relative
---

<div class="absolute bg-[#ff9d00] flex items-center justify-center h-full translate-y--15">
  <img src="/lerobot.png" class="scale-85" >
</div>

<div grid="~ cols-2" gap-4 class="relative z-10 translate-y-100 px-6">
  <div border="2 solid amber-800/95" rounded-lg overflow-hidden>
    <div flex items-center bg="amber-800/50" px-3 py-2 text-amber-200>
      <div i-carbon:document text-sm mr-1 />
      <div text-xs><em>教程定位</em></div>
    </div>
    <div bg="amber-800/90" px-4 py-3>
      <div text="sm white/80">系统化入门：经典机器人学 → 机器人学习 → 通用策略</div>
      <div text="xs white/50" mt-2>Robot Learning: A Tutorial（Space）</div>
    </div>
  </div>
  <div border="2 solid orange-800/95" rounded-lg overflow-hidden>
    <div flex items-center bg="orange-800/50" px-3 py-2 text-orange-200>
      <div i-carbon:cloud-app text-sm mr-1 />
      <div text-xs><em>LeRobot 意义</em></div>
    </div>
    <div bg="orange-800/90" px-4 py-3>
      <div text="sm white/80">把“论文内容”变成“能跑的机器人代码”</div>
      <div text="xs white/50" mt-2>开源、可复现、适合爱好者们上手</div>
    </div>
  </div>
</div>

---
class: py-10
---

# 能做什么？

<span>从基础到通用策略的工具包</span>

<div mt-6 />

<div grid grid-cols-3 gap-3 h-75>

<v-clicks>

  <div border="2 solid yellow-800/50" rounded-lg overflow-hidden bg="yellow-900/10" backdrop-blur-sm h-full>
    <div flex items-center bg="yellow-800/30" px-3 py-2 text-yellow-200>
      <div i-carbon:tree-view text-sm mr-2 />
      <div font-semibold>基础与工具</div>
    </div>
    <div bg="yellow-900/5" px-4 py-3>
      <div flex flex-col gap-3>
        <div>
          <div text-sm font-medium>数据集与采集</div>
          <div text-xs opacity-70>LeRobotDataset / 采集流程 / 批处理</div>
        </div>
        <div>
          <div text-sm font-medium>经典机器人学</div>
          <div text-xs opacity-70>模型、运动、反馈与局限</div>
        </div>
        <div>
          <div text-sm font-medium>平面操作示例</div>
          <div text-xs opacity-70>从理论到可运行 demo</div>
        </div>
      </div>
    </div>
  </div>

  <div border="2 solid orange-800/50" rounded-lg overflow-hidden bg="orange-900/10" backdrop-blur-sm h-full>
    <div flex items-center bg="orange-800/30" px-3 py-2 text-orange-200>
      <div i-carbon:machine-learning text-sm mr-2 />
      <div font-semibold>学习范式</div>
    </div>
    <div bg="orange-900/5" px-4 py-3>
      <div flex flex-col gap-3>
        <div>
          <div text-sm font-medium>强化学习（RL）</div>
          <div text-xs opacity-70>真实机器人成本与限制</div>
        </div>
        <div>
          <div text-sm font-medium>模仿学习（IC）</div>
          <div text-xs opacity-70>仿真 / 直接摇操 / 观看视频教程</div>
        </div>
        <div>
          <div text-sm font-medium>示例策略</div>
          <div text-xs opacity-70>ACT / Diffusion Policy / pi0</div>
        </div>
      </div>
    </div>
  </div>

  <div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm h-full>
    <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-200>
      <div i-carbon:connect text-sm mr-2 />
      <div font-semibold>通用策略</div>
    </div>
    <div bg="amber-900/5" px-4 py-3>
      <div flex flex-col gap-3>
        <div>
          <div text-sm font-medium>VLM / VLA</div>
          <div text-xs opacity-70>视觉语言到动作的统一建模</div>
        </div>
        <div>
          <div text-sm font-medium>代表模型</div>
          <div text-xs opacity-70>ACT / DP / pi0 / SmolVLA / GR00T</div>
        </div>
        <div>
          <div text-sm font-medium>大规模数据</div>
          <div text-xs opacity-70>Open-X / DROID 等数据集</div>
        </div>
      </div>
    </div>
  </div>

</v-clicks>

</div>

---
class: py-10
---

# 为什么 LeRobot 重要

<span>把研究成果变成可实践的完整栈</span>

<div mt-6 />

<div grid="~ cols-2" gap-4>

<v-clicks>

  <div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm>
    <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-200>
      <div i-carbon:layers text-sm mr-2 />
      <div font-semibold>端到端流程</div>
    </div>
    <div bg="amber-900/5" px-4 py-3>
      <div text="sm white/80">采集 → 训练 → 推理 → 部署一站式覆盖</div>
      <div text="xs white/60" mt-2>降低从论文到实机的距离</div>
    </div>
  </div>

  <div border="2 solid orange-800/50" rounded-lg overflow-hidden bg="orange-900/10" backdrop-blur-sm>
    <div flex items-center bg="orange-800/30" px-3 py-2 text-orange-200>
      <div i-carbon:database text-sm mr-2 />
      <div font-semibold>数据标准</div>
    </div>
    <div bg="orange-900/5" px-4 py-3>
      <div text="sm white/80">LeRobotDataset 统一数据格式</div>
      <div text="xs white/60" mt-2>可记录、可分享、可复用</div>
    </div>
  </div>

  <div border="2 solid yellow-800/50" rounded-lg overflow-hidden bg="yellow-900/10" backdrop-blur-sm>
    <div flex items-center bg="yellow-800/30" px-3 py-2 text-yellow-200>
      <div i-carbon:robot text-sm mr-2 />
      <div font-semibold>硬件友好</div>
    </div>
    <div bg="yellow-900/5" px-4 py-3>
      <div text="sm white/80">支持操控 / 行走 / 全身控制平台</div>
      <div text="xs white/60" mt-2>适合学生与个人开发者</div>
    </div>
  </div>

  <div border="2 solid rose-800/50" rounded-lg overflow-hidden bg="rose-900/10" backdrop-blur-sm>
    <div flex items-center bg="rose-800/30" px-3 py-2 text-rose-200>
      <div i-carbon:play-filled text-sm mr-2 />
      <div font-semibold>SOTA 示例</div>
    </div>
    <div bg="rose-900/5" px-4 py-3>
      <div text="sm white/80">RL / BC / Diffusion 等策略可复现</div>
      <div text="xs white/60" mt-2>并提供推理与部署优化</div>
    </div>
  </div>

</v-clicks>

</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-5xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>那能跑起来看看效果吗？</span>
</div>

---
class: px-0! pt-6! text-center
---

<div px-10 text-4xl mb-4>
  可以，但是效果并不理想
</div>

<video autoplay muted loop>
  <source src="/videos/lerobot-smolvla.mp4" />
</video>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-5xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>所以还有很多事情可以做！</span>
</div>

---
class: px-0! pt-6! text-center
---

<div px-10 text-4xl mb-4>
  比如... 数采其实非常复杂
</div>

<video autoplay muted loop>
  <source src="/videos/lerobot-pick-and-place-record-failed.mp4" />
</video>

---
class: py-10
---

# 我们缺数据和工具

<span>具身智能离不开数据与闭环仿真</span>

<div mt-6 />

- 现有的工具聚焦在可视化运动学和关节控制
- 面向硬件且调试困难
- 缺乏录制和管理工具
- 缺乏快速可复现的评估系统
- 仿真与现实差距大

---
class: py-10
clicks: 6
---

# 我们贡献出来的部分

<span>围绕数据、仿真与控制先跑通最小闭环</span>

<div mt-10 />

<div flex items-center gap-4>

<v-clicks>

<div
  :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid amber-900" bg="amber-900/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:link-circle-line-duotone size-20 />
  </div>
  <div bg="amber-900/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>硬件驱动</span>
  </div>
</div>

<div
  :class="$clicks < 2 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid amber-800" bg="amber-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:database-bold-duotone size-20 />
  </div>
  <div bg="amber-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>数据资产</span>
  </div>
</div>

<div
  :class="$clicks < 3 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid yellow-800" bg="yellow-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:microphone-3-bold-duotone size-20 />
  </div>
  <div bg="yellow-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>VR 数采</span>
  </div>
</div>

<div
  :class="$clicks < 4 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid orange-800" bg="orange-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:gamepad-minimalistic-bold-duotone size-20 />
  </div>
  <div bg="orange-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
    <span>仿真回放</span>
  </div>
</div>

<div
  :class="$clicks < 5 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  rounded-lg
  border="2 solid orange-700" bg="orange-700/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:link-circle-line-duotone size-20 />
  </div>
  <div bg="orange-700/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
    <span>远程控制</span>
  </div>
</div>

</v-clicks>

</div>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-5xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>连太多 USB 和线缆了，顾不过来</span>
</div>

---
class: px-0! pt-6! text-center
---

<div px-10 text-4xl mb-4>
  所以我们还开发了单独的固件在其他协议下运行
</div>

<video autoplay muted loop>
  <source src="/videos/lerobot-rc.mp4" />
</video>

---
class: px-0! pt-6! text-center
---

<div px-10 text-4xl mb-4>
  降低硬件调试门槛
</div>

<video autoplay muted loop>
  <source src="/videos/lerobot-visualization.mp4" />
</video>

---
class: py-10
---

# 数采与 VR 数采

<span>把真实世界变成可训练的数据</span>

<div mt-15 />

<div grid="~ cols-2" gap-6>
  <div border="2 solid amber-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-200>
      <div i-carbon:download text-xl mr-1 />
      <div text-2xl>数采</div>
    </div>
    <div bg="amber-800/10" px-4 py-3 text-xl>
    <v-clicks>
      <div text="white/70">真实任务记录：动作、状态、视觉</div>
      <div text="white/70">需要标注清洗与同步对齐</div>
      <div text="white/70">成本高，但效果稳定</div>
    </v-clicks>
    </div>
  </div>
  <div border="2 solid orange-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="orange-800/30" px-3 py-2 text-orange-200>
      <div i-carbon:virtual-private-cloud text-xl mr-1 />
      <div text-2xl>VR 数采</div>
    </div>
    <div bg="orange-800/10" px-4 py-3 text-xl>
    <v-clicks>
      <div text="white/70">交互更自然，能快速造数据</div>
      <div text="white/70">需要解决尺度映射与噪声</div>
      <div text="white/70">适合补齐长尾场景</div>
    </v-clicks>
    </div>
  </div>
</div>

---
class: py-10
---

# 仿真是什么

<span>低成本试错的“第二实验室”</span>

<div mt-15 />

<div grid="~ cols-2" gap-6>
  <div border="2 solid amber-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-200>
      <div i-carbon:cube text-xl mr-1 />
      <div text-2xl>仿真目的</div>
    </div>
    <div bg="amber-800/10" px-4 py-3 text-xl>
    <v-clicks>
      <div text="white/70">验证模型稳定性与安全边界</div>
      <div text="white/70">加速迭代与调参</div>
      <div text="white/70">复现真实世界的极端场景</div>
    </v-clicks>
    </div>
  </div>
  <div border="2 solid yellow-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="yellow-800/30" px-3 py-2 text-yellow-200>
      <div i-carbon:layers text-xl mr-1 />
      <div text-2xl>仿真组成</div>
    </div>
    <div bg="yellow-800/10" px-4 py-3 text-xl>
    <v-clicks>
      <div text="white/70">环境建模 / 物理引擎</div>
      <div text="white/70">传感器模拟 / 噪声注入</div>
      <div text="white/70">任务脚本 / 评估指标</div>
    </v-clicks>
    </div>
  </div>
</div>

<div mt-8 />

<div flex items-center justify-center gap-4>
  <div class="px-4 py-2 rounded-lg border-2 border-amber-800/50 bg-amber-900/20">真实数据</div>
  <div i-carbon:arrow-right text-zinc-500 />
  <div class="px-4 py-2 rounded-lg border-2 border-orange-800/50 bg-orange-900/20">仿真回放</div>
  <div i-carbon:arrow-right text-zinc-500 />
  <div class="px-4 py-2 rounded-lg border-2 border-rose-800/50 bg-rose-900/20">策略迭代</div>
</div>

---
class: py-10
---

# Rust + LeRobot

<span>我们写了什么，改进了什么</span>

<div flex>
  <div text-sm text="zinc-300" text-right flex flex-row gap-2 mt-6 translate-x-2>
    <div flex items-center flex-col font-bold text-xl>
      <img src="/github_repo_lerobot_rs_qr.png" w-50 />
      <div translate-y--4>lerobot-rs</div>
      <div text-xs opacity-70>Rust binding</div>
    </div>
    <div flex items-center flex-col font-bold text-xl>
      <img src="/github_repo_lerobot_rc_qr.png" w-50 style="filter: brightness(1.5);" />
      <div translate-y--4>lerobot-rc</div>
      <div text-xs opacity-70>远程控制</div>
    </div>
    <div flex items-center flex-col font-bold text-xl>
      <img src="/github_repo_airi_qr.png" w-50 />
      <div translate-y--4>lerobot-tui</div>
      <div text-xs opacity-70>机械臂配置</div>
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
