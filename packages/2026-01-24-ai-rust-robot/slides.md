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
class: py-10
---

# 今天聊什么

<span>用机械臂的视角串起 AIRI 的具身之路</span>

<div mt-6 />

<v-clicks>
<div flex items-center gap-3 text-2xl>
  <div i-carbon:folder-details-reference text-blue-300 /> 项目背景与公开视频
</div>
<div flex items-center gap-3 text-2xl>
  <div i-carbon:iot-platform text-emerald-300 /> 机械臂怎么做，能学到什么
</div>
<div flex items-center gap-3 text-2xl>
  <div i-carbon:chart-relationship text-amber-300 /> 逆运动学、模型架构、现状
</div>
<div flex items-center gap-3 text-2xl>
  <div i-carbon:cloud-upload text-purple-300 /> 开发流程、数采与仿真
</div>
<div flex items-center gap-3 text-2xl>
  <div i-carbon:container-software text-cyan-300 /> 我们的 Rust 组件与现场 demo
</div>
</v-clicks>

---
class: py-10
---

# 项目背景

<span>看看大家的视频</span>

<div mt-6 />

<div grid="~ cols-2" gap-4>
  <div
    class="rounded-lg overflow-hidden border-2 border-amber-800/50 bg-amber-900/20 h-40 flex items-center justify-center"
  >
    <div text="sm white/60">公开视频 1：装配 / 起步</div>
  </div>
  <div
    class="rounded-lg overflow-hidden border-2 border-yellow-800/50 bg-yellow-900/20 h-40 flex items-center justify-center"
  >
    <div text="sm white/60">公开视频 2：操作 / 任务</div>
  </div>
  <div
    class="rounded-lg overflow-hidden border-2 border-orange-800/50 bg-orange-900/20 h-40 flex items-center justify-center"
  >
    <div text="sm white/60">公开视频 3：交互 / 抓取</div>
  </div>
  <div
    class="rounded-lg overflow-hidden border-2 border-rose-800/50 bg-rose-900/20 h-40 flex items-center justify-center"
  >
    <div text="sm white/60">公开视频 4：复盘 / 对比</div>
  </div>
</div>

<div mt-8 />

<div grid="~ cols-2" gap-4>
  <div border="2 solid amber-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-200>
      <div i-carbon:cloud-app text-sm mr-1 />
      <div text-xs>
        <em>Hugging Face Hub</em>
      </div>
    </div>
    <div bg="amber-800/10" px-4 py-3>
      <div text="sm white/80">LeRobot 组织页，集中放模型、数据集与 Spaces</div>
      <div text="xs white/50" mt-2>huggingface.co/lerobot</div>
    </div>
  </div>
  <div border="2 solid orange-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="orange-800/30" px-3 py-2 text-orange-200>
      <div i-carbon:book text-sm mr-1 />
      <div text-xs>
        <em>LeRobot 文档</em>
      </div>
    </div>
    <div bg="orange-800/10" px-4 py-3>
      <div text="sm white/80">从安装、教程、硬件、仿真到策略与数据工具的入口</div>
      <div text="xs white/50" mt-2>huggingface.co/docs/lerobot</div>
    </div>
  </div>
</div>

---
class: py-10
---

# 机械臂是怎么做的

<span>拆解成感知、规划、控制三层</span>

<div mt-6 />

<div grid grid-cols-3 gap-3 h-75>

<v-clicks>

<div border="2 solid yellow-800/50" rounded-lg overflow-hidden bg="yellow-900/10" backdrop-blur-sm h-full>
  <div flex items-center bg="yellow-800/30" px-3 py-2 text-yellow-200>
    <div i-carbon:camera text-sm mr-2 />
    <div font-semibold>感知层</div>
  </div>
  <div bg="yellow-900/5" px-4 py-3>
    <div flex flex-col gap-3>
      <div>
        <div text-sm font-medium>多模态输入</div>
        <div text-xs opacity-70>RGB-D / 触觉 / 状态量</div>
      </div>
      <div>
        <div text-sm font-medium>状态估计</div>
        <div text-xs opacity-70>目标、夹爪、环境</div>
      </div>
      <div>
        <div text-sm font-medium>语义理解</div>
        <div text-xs opacity-70>语言 + 视觉对齐</div>
      </div>
    </div>
  </div>
</div>

<div border="2 solid orange-800/50" rounded-lg overflow-hidden bg="orange-900/10" backdrop-blur-sm h-full>
  <div flex items-center bg="orange-800/30" px-3 py-2 text-orange-200>
    <div i-carbon:schematics text-sm mr-2 />
    <div font-semibold>规划层</div>
  </div>
  <div bg="orange-900/5" px-4 py-3>
    <div flex flex-col gap-3>
      <div>
        <div text-sm font-medium>任务分解</div>
        <div text-xs opacity-70>语言到子目标</div>
      </div>
      <div>
        <div text-sm font-medium>动作生成</div>
        <div text-xs opacity-70>轨迹 + 动作序列</div>
      </div>
      <div>
        <div text-sm font-medium>约束处理</div>
        <div text-xs opacity-70>碰撞 / 能力边界</div>
      </div>
    </div>
  </div>
</div>

<div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm h-full>
  <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-200>
    <div i-carbon:control-panel text-sm mr-2 />
    <div font-semibold>控制层</div>
  </div>
  <div bg="amber-900/5" px-4 py-3>
    <div flex flex-col gap-3>
      <div>
        <div text-sm font-medium>底层控制</div>
        <div text-xs opacity-70>力控 / 位置控制</div>
      </div>
      <div>
        <div text-sm font-medium>安全策略</div>
        <div text-xs opacity-70>限幅 / 触发回退</div>
      </div>
      <div>
        <div text-sm font-medium>实时反馈</div>
        <div text-xs opacity-70>关节状态闭环</div>
      </div>
    </div>
  </div>
</div>

</v-clicks>

</div>

---
class: py-10
---

# 机械臂视频并排介绍

<span>从视频中我们学到什么</span>

<div mt-6 />

<div grid="~ cols-3" gap-4>
  <div class="rounded-lg overflow-hidden border-2 border-amber-800/50 bg-amber-900/20 h-40 flex items-center justify-center">
    <div text="sm white/60">视频 A：可重复性</div>
  </div>
  <div class="rounded-lg overflow-hidden border-2 border-yellow-800/50 bg-yellow-900/20 h-40 flex items-center justify-center">
    <div text="sm white/60">视频 B：泛化能力</div>
  </div>
  <div class="rounded-lg overflow-hidden border-2 border-orange-800/50 bg-orange-900/20 h-40 flex items-center justify-center">
    <div text="sm white/60">视频 C：人机协作</div>
  </div>
</div>

<div mt-8 />

<v-clicks>
  <div flex items-center gap-3 text-xl>
    <div i-carbon:arrow-right text-zinc-400 /> 对比流程差异：观测、动作、反馈
  </div>
  <div flex items-center gap-3 text-xl>
    <div i-carbon:arrow-right text-zinc-400 /> 观察失败案例：卡顿、掉落、遮挡
  </div>
  <div flex items-center gap-3 text-xl>
    <div i-carbon:arrow-right text-zinc-400 /> 预估成本：采样、标注、部署
  </div>
</v-clicks>

---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-5xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>还有什么问题？</span>
</div>

<v-clicks>
  <div text-2xl leading-10 text-center>
    机器人为什么这么难做？
  </div>
  <div text-2xl leading-10 text-center>
    虚拟骨骼与真实机械臂的差异在哪里？
  </div>
</v-clicks>

---
class: py-10
---

# 逆运动学综述

<span>机器人难点 & AIRI 的差异</span>

<div mt-6 />

<div grid="~ cols-2" gap-6>
  <div>
    <div text-xl font-semibold mb-3>机器人难点</div>
    <v-clicks>
      <div flex items-center gap-3 text-lg>
        <div i-carbon:close-outline text-rose-300 /> 逆解不唯一，需做约束选择
      </div>
      <div flex items-center gap-3 text-lg>
        <div i-carbon:warning-alt text-amber-300 /> 物理碰撞与安全边界
      </div>
      <div flex items-center gap-3 text-lg>
        <div i-carbon:chart-line text-emerald-300 /> 误差累计导致漂移
      </div>
      <div flex items-center gap-3 text-lg>
        <div i-carbon:time text-sky-300 /> 实时性要求极高
      </div>
    </v-clicks>
  </div>
  <div>
    <div text-xl font-semibold mb-3>与 Project AIRI 的区别</div>
    <v-clicks>
      <div flex items-center gap-3 text-lg>
        <div i-carbon:person text-purple-300 /> 虚拟骨骼可理想化
      </div>
      <div flex items-center gap-3 text-lg>
        <div i-carbon:box text-cyan-300 /> 真实机械臂有硬件约束
      </div>
      <div flex items-center gap-3 text-lg>
        <div i-carbon:humidity text-blue-300 /> 真实世界噪声不可控
      </div>
      <div flex items-center gap-3 text-lg>
        <div i-carbon:science text-emerald-300 /> 需要系统级联调
      </div>
    </v-clicks>
  </div>
</div>

---
class: py-10
---

# 模型架构简述

<span>VLM / VLA / Flow Matching Policy</span>

<div mt-6 />

<div grid grid-cols-3 gap-3 h-70>

<v-clicks>

<div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm h-full>
  <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-200>
    <div i-carbon:chip text-sm mr-2 />
    <div font-semibold>VLM</div>
  </div>
  <div bg="amber-900/5" px-4 py-3>
    <div flex flex-col gap-3>
      <div text-sm font-medium>视觉 + 语言理解</div>
      <div text-xs opacity-70>将观察转成语义目标</div>
      <div text-xs opacity-70>适合任务理解与指令解析</div>
    </div>
  </div>
</div>

<div border="2 solid orange-800/50" rounded-lg overflow-hidden bg="orange-900/10" backdrop-blur-sm h-full>
  <div flex items-center bg="orange-800/30" px-3 py-2 text-orange-200>
    <div i-carbon:connect text-sm mr-2 />
    <div font-semibold>VLA</div>
  </div>
  <div bg="orange-900/5" px-4 py-3>
    <div flex flex-col gap-3>
      <div text-sm font-medium>视觉 + 语言 + 动作</div>
      <div text-xs opacity-70>统一表征与动作预测</div>
      <div text-xs opacity-70>面向端到端控制</div>
    </div>
  </div>
</div>

<div border="2 solid rose-800/50" rounded-lg overflow-hidden bg="rose-900/10" backdrop-blur-sm h-full>
  <div flex items-center bg="rose-800/30" px-3 py-2 text-rose-200>
    <div i-carbon:flame text-sm mr-2 />
    <div font-semibold>Flow Matching Policy</div>
  </div>
  <div bg="rose-900/5" px-4 py-3>
    <div flex flex-col gap-3>
      <div text-sm font-medium>连续控制策略</div>
      <div text-xs opacity-70>建模动作分布与动力学</div>
      <div text-xs opacity-70>适合细粒度执行</div>
    </div>
  </div>
</div>

</v-clicks>

</div>

---
class: py-10
---

# LeRobot 能做什么

<span>Hugging Face 发起，我们围绕它做了延展</span>

<div mt-6 />

<div grid="~ cols-2" gap-4>
  <div border="2 solid amber-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-200>
      <div i-carbon:cloud-app text-sm mr-1 />
      <div text-xs><em>项目定位</em></div>
    </div>
    <div bg="amber-800/10" px-4 py-3>
      <div text="sm white/80">LeRobot 是 HF 发起的可上手具身智能栈</div>
    </div>
  </div>
  <div border="2 solid yellow-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="yellow-800/30" px-3 py-2 text-yellow-200>
      <div i-carbon:play-filled text-sm mr-1 />
      <div text-xs><em>能玩到什么</em></div>
    </div>
    <div bg="yellow-800/10" px-4 py-3>
      <div text="sm white/80">数采、训练、仿真、部署的完整闭环</div>
    </div>
  </div>
  <div border="2 solid orange-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="orange-800/30" px-3 py-2 text-orange-200>
      <div i-carbon:code text-sm mr-1 />
      <div text-xs><em>我们的尝试</em></div>
    </div>
    <div bg="orange-800/10" px-4 py-3>
      <div text="sm white/80">lerobot-rs / lerobot-rc 做基础能力补齐</div>
    </div>
  </div>
  <div border="2 solid rose-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="rose-800/30" px-3 py-2 text-rose-200>
      <div i-carbon:connect text-sm mr-1 />
      <div text-xs><em>目标方向</em></div>
    </div>
    <div bg="rose-800/10" px-4 py-3>
      <div text="sm white/80">未来把角色引擎接入，连接 AIRI 生态</div>
    </div>
  </div>
</div>

---
class: py-10
clicks: 6
---

# 目前的效果

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
  border="2 solid amber-700" bg="amber-700/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:face-scan-square-bold-duotone size-20 />
  </div>
  <div bg="amber-700/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
    <span>策略训练</span>
  </div>
</div>

<div
  :class="$clicks < 6 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
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
class: py-10
---

# 机械臂开发流程

<span>Liet 昨天写了一部分，我们补齐流程</span>

<div mt-8 />

<div flex items-center justify-center gap-4 text-lg>
  <div class="px-4 py-2 rounded-lg border-2 border-amber-800/50 bg-amber-900/20">需求定义</div>
  <div i-carbon:arrow-right text-zinc-500 />
  <div class="px-4 py-2 rounded-lg border-2 border-yellow-800/50 bg-yellow-900/20">场景设计</div>
  <div i-carbon:arrow-right text-zinc-500 />
  <div class="px-4 py-2 rounded-lg border-2 border-orange-800/50 bg-orange-900/20">数采</div>
  <div i-carbon:arrow-right text-zinc-500 />
  <div class="px-4 py-2 rounded-lg border-2 border-amber-800/50 bg-amber-900/20">训练 / 策略</div>
  <div i-carbon:arrow-right text-zinc-500 />
  <div class="px-4 py-2 rounded-lg border-2 border-orange-800/50 bg-orange-900/20">仿真验证</div>
  <div i-carbon:arrow-right text-zinc-500 />
  <div class="px-4 py-2 rounded-lg border-2 border-rose-800/50 bg-rose-900/20">实机测试</div>
</div>

<div mt-8 />

<v-clicks>
  <div flex items-center gap-3 text-xl>
    <div i-carbon:dot-mark text-emerald-300 /> 不断迭代：失败案例回灌
  </div>
  <div flex items-center gap-3 text-xl>
    <div i-carbon:dot-mark text-sky-300 /> 维护数据与模型版本
  </div>
</v-clicks>

---
class: py-10
---

# 数采与 VR 数采

<span>把真实世界变成可训练的数据</span>

<div mt-6 />

<div grid="~ cols-2" gap-6>
  <div border="2 solid amber-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-200>
      <div i-carbon:download text-sm mr-1 />
      <div text-xs><em>数采</em></div>
    </div>
    <div bg="amber-800/10" px-4 py-3>
    <v-clicks>
      <div text="sm white/70">真实任务记录：动作、状态、视觉</div>
      <div text="sm white/70">需要标注清洗与同步对齐</div>
      <div text="sm white/70">成本高，但效果稳定</div>
    </v-clicks>
    </div>
  </div>
  <div border="2 solid orange-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="orange-800/30" px-3 py-2 text-orange-200>
      <div i-carbon:virtual-private-cloud text-sm mr-1 />
      <div text-xs><em>VR 数采</em></div>
    </div>
    <div bg="orange-800/10" px-4 py-3>
    <v-clicks>
      <div text="sm white/70">交互更自然，能快速造数据</div>
      <div text="sm white/70">需要解决尺度映射与噪声</div>
      <div text="sm white/70">适合补齐长尾场景</div>
    </v-clicks>
    </div>
  </div>
</div>

---
class: py-10
---

# 仿真是什么

<span>低成本试错的“第二实验室”</span>

<div mt-6 />

<div grid="~ cols-2" gap-6>
  <div border="2 solid amber-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-200>
      <div i-carbon:cube text-sm mr-1 />
      <div text-xs><em>仿真目的</em></div>
    </div>
    <div bg="amber-800/10" px-4 py-3>
    <v-clicks>
      <div text="sm white/70">验证模型稳定性与安全边界</div>
      <div text="sm white/70">加速迭代与调参</div>
      <div text="sm white/70">复现真实世界的极端场景</div>
    </v-clicks>
    </div>
  </div>
  <div border="2 solid yellow-800/50" rounded-lg overflow-hidden>
    <div flex items-center bg="yellow-800/30" px-3 py-2 text-yellow-200>
      <div i-carbon:layers text-sm mr-1 />
      <div text-xs><em>仿真组成</em></div>
    </div>
    <div bg="yellow-800/10" px-4 py-3>
    <v-clicks>
      <div text="sm white/70">环境建模 / 物理引擎</div>
      <div text="sm white/70">传感器模拟 / 噪声注入</div>
      <div text="sm white/70">任务脚本 / 评估指标</div>
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
class: py-10 text-center
---

<h1 font-rounded>
现场 demo
</h1>

<span>设备连接 / 远程控制 / 任务执行</span>

<div mt-10 />

<v-clicks>
  <div text-2xl>Step 1：连接机械臂与传感器</div>
  <div text-2xl>Step 2：通过 lerobot-rc 远程控制</div>
  <div text-2xl>Step 3：执行任务并回放数据</div>
</v-clicks>

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
