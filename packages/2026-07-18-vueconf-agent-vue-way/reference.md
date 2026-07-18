

$clicks > 2 ? 'opacity-30 scale-75' : '']" transition="all duration-500 ease-in-out">
    <source src="/videos/pistar06-folding-box.mp4" />
  </video>
  <video v-click autoplay muted loop class="absolute rounded-md w-120 top-1/2 left-[calc(50%-8rem)]
" :class="[$clicks === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-100', $clicks > 3 ? 'opacity-30
scale-75' : '']" transition="all duration-500 ease-in-out">
    <source src="/videos/pistar06-laundry.mp4" />
  </video>
</div>

这个部分，用多个卡片，从其他模型卡里截图获取的 benchmark 数据，展示说这些模型不同的能力不同之类的。

然后用类似于

---
class: py-10
glowSeed: 230
---

# Features

<span>We solved the problems, partially</span>

<div mt-10 />

<div flex items-center gap-4>

<v-clicks>
  <div
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid purple-800" bg="purple-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:kubernetes-operator h-20 w-20 />
    </div>
    <div bg="purple-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center
text-base>
      <span>Firewatch of workloads</span>
    </div>
  </div>
  <div
    :class="$clicks < 2 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid violet-800" bg="violet-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:ibm-watson-knowledge-studio h-20 w-20 />
    </div>
    <div bg="violet-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center
text-base>
      <span>Enhanced observability</span>
    </div>
  </div>
  <div
    :class="$clicks < 3 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid indigo-800" bg="indigo-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:event-schedule h-20 w-20 />
    </div>
    <div bg="indigo-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Periodic inspection</span>
    </div>
  </div>
  <div
    :class="$clicks < 4 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid blue-800" bg="blue-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:exam-mode h-20 w-20 />
    </div>
    <div bg="blue-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-
base>
      <span>Cascading shutdown</span>
    </div>
  </div>
  <div
    :class="$clicks < 5 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid sky-800" bg="sky-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:ibm-watson-openscale h-20 w-20 />
    </div>
    <div bg="sky-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Intelli-migration</span>
    </div>
  </div>
</v-clicks>

</div>

这样的卡片组（参考）来表示不同的 benchmark。

当然可能 3 到 4 个就好了，可以简单介绍一下不同的维度。

然后接下来，学习 /Users/neko/Git/github.com/nekomeowww/talks/packages/2024-08-21-kubecon-hk/slides.md

的

---
class: py-10
glow: right
---

# Who else have tried

<span>Some of the state of the art blogs, tryouts, and researches</span>

<div mt-4 />

<div flex flex-col gap-4>

<div flex flex-col gap-2>
  <div flex gap-18>
    <div v-click bg="black/20" rounded-lg border="2 solid blue-700" w-70>
      <div text="blue-200" bg="blue-900/40" rounded-lg px-4 py-3 text-center>
        <span>JobSet</span>
      </div>
      <div flex justify-center items-center py-4>
        <a href="https://github.com/kubernetes-sigs/jobset" items-center flex><div inline-block mr-1
i-ri:github-fill />kubernetes-sigs/jobset</a>
      </div>
      <div flex justify-center items-center>
        <div i-devicon:kubernetes inline-block mr-2 h-8 px-2 py-6 /> <span
text="[#5791f7]">Kubernetes</span>
      </div>
    </div>
    <div v-click>
      <div flex flex-col mt-3>
        <div flex items-center><div i-carbon:chevron-up mr-2 text-green-300 /><div i-
devicon:kubernetes inline-block mr-1 translate-y--0.2 /> <span text="[#5791f7]">Kubernetes SIG</
span>&nbsp; project</div>
        <div flex items-center><div i-carbon:chevron-up mr-2 text-green-300 /><div i-
devicon:kubernetes inline-block mr-1 translate-y--0.2 /> <span text="[#5791f7]">Kubernetes</
span>&nbsp;native</div>
        <div flex items-center><div i-carbon:chevron-up mr-2 text-green-300 />Easy to support any
frameworks</div>
        <div flex items-center><div i-carbon:chevron-down mr-2 text-red-300 />Cannot handle events,
and log analysis</div>
        <div flex items-center><div i-carbon:chevron-down mr-2 text-red-300 />Cannot perform periodic
inspection</div>
      </div>
    </div>
  </div>
  <div flex gap-18>
    <div w-70>
      <div v-click bg="[#f7f7f7]" rounded-lg border="2 solid [#1577fc]" flex flex-col justify-center
items-center>
        <div text="[#1577fc]" bg="blue-100" rounded-lg px-4 py-2 text-center w-full>
          <span>DLRover</span>
        </div>
        <img src="/dlrover_logo.png" w-36 rounded-lg px-2 py-4 />
        <div flex justify-center>
          <img src="/Ant_Group_logo.png" h-8 px-2 pb-2 />
        </div>
      </div>
    </div>
    <div v-click>
      <div mt-1 flex flex-col>
        <div flex items-center><div i-carbon:chevron-up mr-2 text-green-300 /><span
text="[#f6432f]"><div inline-block mr-1 translate-y-0.8 i-devicon:pytorch />Trainer</
span>&nbsp;oriented</div>
        <div flex items-center><div i-carbon:chevron-up mr-2 text-red-300 /><span
text="[#f6432f]"><div inline-block mr-1 translate-y-0.8 i-devicon:pytorch />PyTorch</
span>&nbsp;native</div>
        <div flex items-center><div i-carbon:chevron-up mr-2 text-red-300 />Ready to use out of
box&nbsp;<span text="[#64b023]"><div inline-block translate-y-0.8 mr-1 i-bi:nvidia />NVIDIA</
span>&nbsp;error support</div>
        <div flex items-center><div i-carbon:chevron-down mr-2 text-red-300 />Cannot perform periodic
inspection</div>
        <div flex items-center><div i-carbon:chevron-down mr-2 text-red-300 />Not extensible to
various of frameworks & scenarios</div>
      </div>
    </div>
  </div>
</div>

<div flex gap-3 text-sm opacity-50>
  <div v-click rounded-lg flex gap-2 w="[40%]">
    <div bg="[#851717]" rounded-lg flex items-center min-w-8>
      <img src="/Arxiv.svg" w-20 px-3 py-1 />
    </div>
    <div text="zinc-300" rounded-lg px-2 py-1>
      <span>FastPersist: Accelerating Model Checkpointing in Deep Learning</span>
    </div>
  </div>
  <div v-click rounded-lg flex gap-2 w="[60%]">
    <div bg="[#851717]" rounded-lg flex items-center min-w-8>
      <img src="/Arxiv.svg" w-20 px-3 py-1 />
    </div>
    <div text="zinc-300" rounded-lg px-2 py-1>
      <span>DLRover-RM: Resource Optimization for Deep Recommendation Models Training in the Cloud</
span>
    </div>
  </div>
</div>

</div>

部分，介绍一下我在

https://github.com/eval-sys/mcpmark
https://arxiv.org/abs/2509.24002

的工作，我是共同第一作者，也是 MCPMark 的维护开发者。

介绍一下我在 mcpmark 做 Benchmark 的经历。

> 这样可以比较好背书我的 benchmark 见解吧。

mcpmark 的引用挺多的，包括 qwen，seed，还有 deepseek 都有我参与的工作的影子，你可以自己找找看，然后找
sub-agent 列出来一下，我来 review 一下，避免出错了，

然后表述：我自己确实觉得我还算是比较懂 benchmark 吧，你可以给点 <!-- 标记弄到台词里

然后我们介绍说，

用大标题的 形式，类似


---
class: flex justify-center items-center gap-20 px40 text-xl
---

<div text-4xl absolute :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
transition duration-500 ease-in-out>
  <span>So what have we done?</span>
</div>

<div flex flex-col items-center>

<v-clicks>

<div mt-20>

<h1 flex items-center text="6xl!">
  <div i-carbon:microservices-1 mr-3 />
  <span>Kcover</span>
</h1>

</div>

<div text-xs mt-20>
  <span>One simple intall-to-go plugin solution combines both NPD (Node Problem Detector) and
operator</span>
</div>

</v-clicks>

</div>

介绍和说明，vieval，可以引用 /Users/neko/Git/github.com/vieval-dev/vieval/docs/content/public/vieval-
logo-with-text-light.svg 的 logo

下面可以陪一行小字。

然后最后几页我们用 code demonstration 的形式，从 /Users/neko/Git/github.com/vieval-dev/vieval 找几个经
典例子讲一讲，

先从简单的来，比如简单一个 task（任务）有多个 case（案例，轨迹）
然后讲解说现在这个是一个 agent，那多个 task 呢？引出 project
如果是多个不同 sub-agent 呢？引出 workspace
然后如果是多个不同的项目，比如 mem0 和 mem9 对比，引出 comparison

横评（comparison），比如 workspace（类似 vitest 的 monorepo level）和 project（类似 vitest package
level）来讲分级，可以有个有缩进的可视化来讲，也可以给一个 vitest 等价物的放到侧边，当然，comparison 是
没有 vitest 等价物的。

然后我们讲说你需要测试不同的模型和参数的效果，你需要矩阵。

这个我们可以提一嘴 github actions 的 matrix，然后也是单独分几页（每页感觉不要超过太多篇幅和字数，大家
不一定看的过来）
介绍说如果是不同的语言，不同的模型，不同的参数，甚至是不同的提示词，甚至是不同的评测分数，都可以通过
matrix 来解决。

这里你可以用

---
class: py-10
glowSeed: 230
---

# Features

<span>We solved the problems, partially</span>

<div mt-10 />

<div flex items-center gap-4>

<v-clicks>
  <div
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid purple-800" bg="purple-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:kubernetes-operator h-20 w-20 />
    </div>
    <div bg="purple-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center
text-base>
      <span>Firewatch of workloads</span>
    </div>
  </div>
  <div
    :class="$clicks < 2 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid violet-800" bg="violet-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:ibm-watson-knowledge-studio h-20 w-20 />
    </div>
    <div bg="violet-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center
text-base>
      <span>Enhanced observability</span>
    </div>
  </div>
  <div
    :class="$clicks < 3 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid indigo-800" bg="indigo-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:event-schedule h-20 w-20 />
    </div>
    <div bg="indigo-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Periodic inspection</span>
    </div>
  </div>
  <div
    :class="$clicks < 4 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid blue-800" bg="blue-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:exam-mode h-20 w-20 />
    </div>
    <div bg="blue-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-
base>
      <span>Cascading shutdown</span>
    </div>
  </div>
  <div
    :class="$clicks < 5 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid sky-800" bg="sky-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:ibm-watson-openscale h-20 w-20 />
    </div>
    <div bg="sky-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Intelli-migration</span>
    </div>
  </div>
</v-clicks>

</div>

这种。

然后我们讲说事实上 structured output 和 tool call 会有失败率，这个时候失败不只是 json 格式失败，也会有
空 object 的问题，我们校验的时候不能只是评判成功率，我们还要看准确率，所以我们 vieval 是基于 vitest
的，所有的 vitest 的 expect 都和往常写 vitest 的单元测试断言一样工作。

然后介绍说除此以外还有很多功能，比如 llm judge（rubric），或者其他类似的能力，我们也可以用一个矩阵图来
表示，你可以用别的卡片式 + grid 来展示。

然后就差不多了。

我们大概率最后给一个运行期间的截图就结束了。

最后可以学习一下

https://github.com/antfu/talks/blob/main/2025-10-25/src/components/DevToolsKit.vue 类似的组件，写一个
元素周期表一样的图出来，我们把 velin，vieval，以及其他 https://github.com/moeru-ai 下属的仓库都放到一
起讲。

其他的你都可以找到对应的 emoji 和 icon，像是 auv 在 https://github.com/moeru-ai/auv/blob/main/docs/
assets/logo-dark.svg
别的需要用的话，你就拿一下 github description，把 repo description 的 emoji，替换成 https://
icones.js.org/collection/twemoji 就好了。

你觉得如何？基本上就这么改。要分好几页的就是，尽量短小，密集，爽快。

---

# 后续改稿准则

下面这些准则用于继续整理 `slides.md`。前面的内容保留为素材和早期构想；如果早期构想与后续反馈冲突，以这一节为准。

## 演讲目标

这是一场 20 分钟的 VueConf 演讲。演讲需要回答的问题是：熟悉 Vue 和 Vitest 的开发者，可以怎样把已有的开发经验带到 Agent 开发中。

两个主要回答分别是：

- Velin 使用组件、Props、条件渲染和响应式状态组织 Context 与 Prompt。
- Vieval 使用接近 Vitest 的任务、运行和断言方式评测 Agent、模型与任务流程。

整场演讲的主语是「Agent 开发方式」，不是 AIRI、MCPMark 或 Moeru 项目集合。后者分别承担团队背景、实践背书和结尾延伸，不承担贯穿叙事。

## AIRI 的位置

AIRI 只用于说明两位讲者来自什么团队、平时开发什么类型的 Agent。介绍需要简短，不能继续展开 AIRI 的角色设定、业务故事或评测目标。

AIRI 中的旧 Prompt 拼接代码可以作为生产代码证据，但使用完这份证据后，不需要反复回到 AIRI。Velin 和 Vieval 也不需要共享同一个 AIRI 案例。

## 叙事脉络

推荐按下面的顺序构筑整场演讲：

```text
团队背景：我们在开发真实 Agent
→ Agent 的 Context 最终需要被组织和渲染
→ 字符串拼接使 Prompt 难以预览、组合和维护
→ Velin 把这部分工作放进 Vue 熟悉的组件模型
→ 渲染后的消息进入 Agent Loop
→ 同一个任务可能产生不同路径和结果
→ 单次运行不足以判断一次修改
→ Benchmark 固定任务、运行条件和判定方式
→ MCPMark 说明讲者具备实际 Benchmark 设计经验
→ Vieval 把任务、运行、断言和比较带进 TypeScript / Vitest 工作流
→ Context 编排与结果评测共同构成 Agent 开发反馈过程
```

这条脉络中，每一节只负责回答前一节自然产生的问题。不要为了介绍一个术语而开启新的知识分支。

### Velin 段落

Velin 段落优先保留下面的材料：

1. 一份真实的字符串拼接代码。
2. 拼接代码造成的具体问题，例如缺失空格、换行难以检查、变量没有类型约束。
3. 从字符串到 `.velin.md` 的代码演进。
4. Props、条件渲染、组件复用和响应式输入怎样逐步加入。
5. 一份生产项目目录或 Playground，证明这套方式已经实际使用。

Prompt Engineering、Context Engineering 和其他 Agent 的 Context 管理方式只能作为必要背景。背景不能比真实问题和解决方式占用更多时间。

### 从 Velin 过渡到 Vieval

过渡不需要依赖 AIRI。Velin 渲染出消息之后，直接展示消息、模型和工具怎样构成 Agent Loop。

下一步只需要建立一个观察：同一个任务重复执行时，模型可能选择不同工具、经过不同轮次，并产生不同结果。Sampling Lab 可以承担这项展示。

不要为了这个观察展开一段概率论教学。Monte Carlo 可以作为一句来源说明或脚注，不应占用两张独立页面。`pass@k` 和 `pass^k` 不进入演讲，它们对理解 Velin 和 Vieval 没有足够收益。

### Benchmark 与 MCPMark

Benchmark 背景只需要完成两件事：

1. 说明不同 Benchmark 会固定不同任务和判定方式，因此测量的能力不同。
2. 说明讲者在 MCPMark 中实际设计和维护过 Agent Benchmark，后续判断来自实践经验。

MCPMark 不需要展开成另一场论文分享。适合压缩成一至两页高密度内容：

- MCPMark 面向什么任务；
- 任务为什么需要多步工具调用；
- 最终状态怎样被程序化验证；
- 共同第一作者、维护开发者与 ICLR 2026 Poster；
- Qwen、Seed、DeepSeek 等采用或引用情况，以准确来源和脚注呈现。

「我自己确实觉得，我应该还算比较懂 Benchmark」适合放在 presenter notes 中，由讲者口头表达。页面负责提供支撑这句话的事实，不直接写自我评价。

### Vieval 段落

Vieval 的内容不是功能列表，而是一条逐步扩大的使用路径：

```text
一个 Task
→ 多个 Case
→ 多个 Task 组成 Project
→ 多个 Project 组成 Workspace
→ 多套实现进入 Comparison
→ 使用 Matrix 展开运行与评分条件
→ 使用 expect 检查不同类型的证据
→ 保存并比较运行结果
```

术语需要保持准确：

- Task 是被评测的任务范围。
- Case 是测试案例，不等同于一次 Agent 轨迹。
- 一次具体运行产生 outcome 或 trace。
- Project 是一次运行与汇总边界，可以类比 Vitest project/package。
- Workspace 管理一组相关 Project，可以类比 monorepo 层级。
- Comparison 用于跨 Project 或 Workspace 比较不同实现，没有必要强行寻找 Vitest 等价物。

这组概念可以保留，但不能每个术语都使用一张低信息量卡片。优先让同一份代码和同一棵层级树逐步生长，使下一层概念由上一层的规模问题自然产生。

Matrix 也采用渐进表达：

1. 先从一次固定运行开始。
2. 加入模型、语言、参数和 Prompt，形成 `runMatrix`。
3. 再加入 rubric 或 judge model，说明 `evalMatrix` 与运行条件分开。

不要先展示术语，再解释用途。先让听众看到需要比较的变量，再给出 Matrix 的名字和配置。

Structured Output 与 Tool Call 部分需要围绕一个明确判断展开：格式合法不等于任务正确。

可使用简短的真实对照：

- JSON 可以解析，但必要字段为空。
- 工具调用存在，但选择了错误工具。
- 参数结构正确，但参数值无法完成任务。
- 输出、工具和语义判定都满足要求。

在听众理解这些失败方式之后，再引出普通 Vitest `expect`、Structured Output matcher、Tool Call matcher 和 Rubric / LLM Judge。API 名称负责承接概念，不负责替代概念。

Vieval 段落最后需要展示一次实际运行及其产物。CLI 输出、失败 Case、保存的 artifact 或版本比较结果，至少需要出现一项能够让听众判断「运行以后得到了什么」的材料。

## 20 分钟内的取舍

页面数量不是唯一限制，点击次数、代码解释和讲者切换同样占用时间。建议把可讲内容控制在约 20–24 页：

- 开场与团队背景：2–3 页，约 1.5 分钟。
- Velin：6–7 页，约 6 分钟。
- Agent Loop 与重复运行：2–3 页，约 2 分钟。
- Benchmark 与 MCPMark：2 页，约 1.5 分钟。
- Vieval：6–8 页，约 7 分钟。
- 总结、项目集合与结束：2 页，约 2 分钟。

如果安排 Live Demo，需要从对应段落中让出至少两分钟，并减少同类静态页面。

优先删除或合并这些内容：

- 独立的章节过场页；
- Monte Carlo 问答页与定义页；
- `pass@k` / `pass^k`；
- MMLU、GSM8K 等 Benchmark 名词教学；
- EvalScope 产品介绍；
- 重复表达同一组 Matrix 变量的卡片页；
- 只用于列举 matcher 名称、没有展示失败输入输出的页面；
- 展示讲者身份但没有新增事实的履历卡片；
- 向观众展示 Demo 失败兜底方案的文字。

## 页面信息量

「短小、密集、爽快」不等于每页字少。它表示每页只推进一个判断，但可以用充足材料支撑这个判断。

一张页面可以包含多段引用、代码、日志或图表，只要这些材料都在回答同一个问题。相反，一张只有三个抽象名词的卡片页，即使字很少，仍然可能缺少信息。

每页应尽量包含下面三项中的两项：

1. 一个明确判断。
2. 一份具体材料，例如代码、引用、日志、输入输出、配置或运行结果。
3. 一次从材料中得出的归纳。

不同内容采用不同表达方式：

| 内容 | 优先形式 |
|---|---|
| 能力维度与并列分类 | 3–4 张卡片 |
| 研究、论文和行业实践 | 原文引用、来源、脚注、`v-mark` |
| API 与开发方式 | 逐步变化的代码、magic move、行高亮 |
| Task / Project / Workspace / Comparison | 逐步生长的树或层级图 |
| Matrix | 组合展开、前后状态或 GitHub Actions 类比 |
| Structured Output / Tool Call 失败 | 真实输入输出对照 |
| 版本效果与运行产物 | CLI、报告、失败 Case、前后比较 |
| 项目集合 | 元素周期表或生态组件 |

卡片不应成为默认布局。卡片适合并列项，不适合引用、论证、流程或代码演进。

## 点击与 annotation

点击用于控制注意力，而不是把本来很少的信息拆成多次出现。

优先使用点击完成这些事情：

- 标出引用中的关键证据；
- 高亮代码中的问题行；
- 让同一份代码逐步增加能力；
- 展示 Agent Loop 或层级结构的下一步；
- 在 before/after 之间切换；
- 让一棵 Matrix 或组织树逐步展开。

避免让四张同类卡片机械地逐张出现。每一次点击都应该带来一个新的关系、证据或结论。

引用页可以参考 KubeCon deck：原文先出现，再使用 `v-mark` 逐步标出关键词、数字和结论，最后在页脚保留来源。引用内容必须与来源原文一致，不能先写结论再补一个看似相关的链接。

## 中文文风

中文以自然、直接、可口述为优先。页面不是产品文档，也不是论文摘要。

### 标题写法

标题优先写成明确事实、动作或问题对象：

- 「一次成功不能代表下一次」
- 「同一个任务，重复运行 50 次」
- 「固定任务、运行条件和判定方式」
- 「格式合法，内容仍然可能错误」
- 「模型、语言和 Prompt 一起进入 Matrix」
- 「运行结果被保存下来，用于比较两个版本」

避免只负责主持演讲的标题：

- 「共同观察」
- 「如何多一点把握？」
- 「我们刚才做的是什么？」
- 「我们可以测量这些」
- 「稳定性可以怎样看」
- 「评测范围怎样扩展」
- 「这项工作后来出现在哪里」
- 「我们还在做这些」

问题句只有在观众能够立刻理解问题对象，并且本页会直接回答时才使用。

### 句子写法

优先写清楚主语、动作和结果：

- 「Velin 根据 Props 渲染最终 Prompt。」
- 「Agent 每次运行可能选择不同工具。」
- 「Vieval 为每组 Matrix 条件生成独立运行。」
- 「程序检查任务完成后的环境状态。」

减少抽象名词连续堆叠：

- 不写「给能力一个可重复的测量过程」。
- 改写为「固定任务、运行条件和判定方式，再重复执行。」

- 不写「Vieval 把实验留下来」。
- 改写为「Vieval 保存每次运行结果，并按 Case 比较两个版本。」

- 不写「评分可以有多种证据」。
- 改写为「回复内容、JSON 字段和工具调用都可以参与判定。」

减少没有信息的强调词和转折词：

- 少用「真正」「其实」「早就」「显然」「这说明了一件事」。
- 少用「不是……而是……」制造对立。
- 少用「可以怎样」「我们可以」「这些」「这项工作」作为模糊主语。
- 不写「Velin 可以做到！」这类产品宣传句，直接展示它做到了什么。

### 中英文关系

中文负责解释，英文负责正式名称和代码标识。

先写：

> 同一个任务需要在多组模型、语言和 Prompt 下运行。

再出现：

> Vieval 使用 `runMatrix` 展开这些组合。

不要先给出 `task · matrix · score · report`，再要求听众自行理解。

Prompt、Context、Agent、Benchmark、Task、Case、Project、Workspace、Comparison、Matrix 等正式概念需要统一大小写和含义。没有必要翻译的 API 名称保留英文，但附近必须有自然中文解释。

### 字重与强调

中文标题和正文不额外使用 `font-bold` 制造重点，优先使用主题默认字重或 `font-normal`。中文重点通过位置、字号、留白、颜色、引用和 annotation 表达。

英文产品名、API、数字和代码可以使用等宽字体、颜色或适当字重。不要让整页中文都处于粗体状态。

## 证据与准确性

公开事实、论文结论、项目能力和采用情况都需要可追溯来源。来源优先放在页面脚注，而不是只写在 presenter notes。

需要特别检查：

- Wikipedia 的 Monte Carlo 引用必须核对原文；
- MCPMark 的任务数、初始状态数、环境类型和运行方式；
- ICLR 2026 Poster 信息；
- Qwen、Seed、DeepSeek 对 MCPMark 的实际引用或采用方式；
- Velin 当前已经实现的 renderer，不能把尚未实现的 XML 写成现有能力；
- Vieval 示例必须来自当前 API，避免使用旧 alias 或把 Case 与运行轨迹混为一谈；
- 示例数字需要说明是实际结果、fixture 还是解释性假设。

页面上的结论强度不能超过来源。来源只证明「被采用」时，不写成「共同研究」；来源只展示一个 fixture 时，不写成产品整体性能结果。

## 结尾

项目元素周期表是计划中的结尾视觉，可以保留。它出现之前需要先收束本场演讲：

```text
Velin：组织和渲染 Context
Vieval：运行和评测 Agent
```

随后再展示这些工作位于同一组开源项目中。元素周期表负责延伸视野，不负责替代演讲结论。

结束页应回到标题中的「可控」：这里的可控不是让模型变成确定性程序，而是让 Context 的组织方式可维护，让运行条件可记录，让结果可以重复观察和比较。
