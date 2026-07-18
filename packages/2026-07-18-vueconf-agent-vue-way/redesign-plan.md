# VueConf 2026 Slide 重构工作计划

这份文件记录当前已经确认的叙事、页面、措辞、布局、动画、组件和素材来源。它是继续调研和讨论时使用的工作底稿，不直接替代 `slides.md`。

状态约定：

- **已确认**：用户已经明确指定，后续不要重新设计。
- **当前方案**：根据现有反馈整理，可以继续补充措辞或素材。
- **待查素材**：需要读取代码、论文、模型卡或外部来源后再定稿。
- **待核对**：需要确认 API、事实或引用原文。
- **删除**：不进入下一版演讲。

## 1. 已确认的全局约束

### 1.1 时长

- 整场演讲约 40 分钟。
- Vieval 段落约 20 分钟。
- 开场、团队背景与 Velin 共用其余时间。
- Velin 不做现场 Live Demo，使用截图、代码演进和 magic move。

### 1.2 固定内容

以下内容原则上保持不动：

1. 封面。
2. 两位讲者介绍。
3. AIRI 团队背景。
4. 章节页：

```md
---
layout: section
---

# 编排 · Velin

<div class="opacity-50 text-base">洛灵</div>
```

`# Prompt 已经准备好了` 页面目前也可以保留。后续只核对代码准确性和它与前后页面的衔接，不主动改掉页面结构。

### 1.3 AIRI 的位置

AIRI 只说明两位讲者来自什么团队、平时开发什么类型的 Agent。AIRI 不承担贯穿案例，也不用于串联 Velin 与 Vieval。

AIRI 中的旧 Prompt 拼接代码可以作为真实生产代码证据。使用完这份证据后，不需要反复回到 AIRI 的角色、业务或评测场景。

### 1.4 演讲核心认识

Velin 段落希望听众理解：

> Agent Context 很复杂。继续使用字符串拼接和文件引用时，组合、复用、Skill 引用和最终结果预览都会变得困难。Velin 让 Prompt / Context 像 Vue 组件一样编写、组合和复用，并通过原生 REPL 直接预览渲染结果。

Vieval 段落希望听众理解：

> Benchmark 听起来复杂，实际上并不困难。有 Vieval 之后，准备案例、调用已有 Agent、检查结果和扩展运行条件，都可以像写普通 TypeScript 测试一样完成。

Task、Case、Project、Workspace、Comparison、Matrix 和 matcher 都是这条判断的证据，不是要求听众记住的知识目录。

### 1.5 页面风格

「短小、密集、爽快」表示：

- 每页只推进一个判断；
- 页面可以包含充足代码、引用或输入输出；
- 点击负责控制阅读顺序；
- 不把少量信息拆成多张过场页；
- 不默认使用三张或四张半透明卡片；
- 卡片只用于并列维度，代码、引用、流程和层级关系使用各自适合的形式。

中文标题与正文不额外使用 `font-bold`。重点通过字号、位置、颜色、留白、代码高亮和 `v-mark` 表达。

所有信息卡片继续统一使用 `rounded-xl`；头像、Logo、截图、二维码和代码块不受该规则影响。

## 2. 全场脉络

```text
团队背景：我们在开发真实 Agent
→ Prompt Engineering 逐渐扩展为 Context Engineering
→ Agent Context 同时包含 Prompt、历史、工具、Skill、记忆和运行状态
→ 这些内容最终仍然要被组织和渲染
→ 字符串拼接与文件引用难以组合、复用和预览
→ Velin 把 Context 写成 Vue 组件，并在 REPL 中直接查看结果
→ Velin 渲染出的 Prompt 进入 Agent Loop
→ 同一个任务可能产生不同路径和结果
→ Benchmark 固定输入、运行方式和判定过程
→ MCPMark 说明讲者具备实际 Benchmark 设计经验
→ Benchmark 的最小形态只是调用一个函数并检查返回值
→ Vieval 用三个常见案例展示这件事
→ 案例、项目和运行条件变多时，仍然沿用同一套写法
→ 展示实际运行与项目集合
```

## 3. 页面计划

页面编号在重排后会变化，因此以 `---` 分隔的页面标题和作用为准。

### A. 固定前言

#### A1. 封面

- **状态**：已确认，保留。
- **作用**：提出「不可控下的可控」和「用 Vue 的方式开发 Agent」。
- **组件**：继续使用 `ConceptReel`。

#### A2. 讲者介绍

- **状态**：已确认，保留。
- **作用**：介绍 Neko 与 RainbowBird 洛灵。
- **动画**：两位讲者依次 `v-click`。

#### A3. AIRI

- **状态**：已确认，保留为团队背景。
- **措辞方向**：只说明「一个开源的 AI 虚拟伙伴」和团队平时开发真实 Agent。
- **不要做的事**：不承诺后面所有案例都来自 AIRI；删除 presenter notes 中「后面案例都从它来」的说法。

#### A4. 编排 · Velin

- **状态**：已确认，原样保留。

### B. Velin：从 Prompt 到可组合 Context

#### B1. Prompt Engineering → Context Engineering 时间线

- **状态**：布局已确认，内容待定稿。
- **目的**：保留历史线索，但用一页完成，不展开成长篇行业史。
- **布局**：直接照抄用户提供的 Vite DevTools 页面结构，只替换内容。不要重新设计另一套时间线。
- **Slidev 结构**：

```md
---
class: p0
glow: bottom
---

<div class="grid grid-cols-2 gap-4 h-full">
  <div ma flex="~ col gap-2 items-center">
    <!-- 左侧固定图片或示意图 -->
  </div>

  <div border="l main" h-full py10 flex="~ col gap-8 justify-center">
    <!-- 每个时间节点使用用户给出的 icon + title + description 结构 -->
  </div>
</div>
```

- **右侧时间节点候选措辞**：

  1. `Prompt Engineering`  
     「调整提示词的措辞与结构」
  2. `RAG`  
     「检索结果开始进入 Prompt」
  3. `Context Engineering`  
     「工具、记忆与历史消息共同组成 Context」
  4. `Agent Harness`  
     「Context、工具与反馈过程一起被组织」

- **动画**：每个时间节点沿用用户模板的 `v-click`，从上到下出现。左侧视觉保持固定，不自行设计复杂切换。
- **左侧视觉候选**：
  - 当前 `/ce-anthropic-2.png`；
  - 一张 Prompt → RAG → Context 的合成示意图；
  - 待确认是否存在更适合的原始来源图。
- **参考**：用户在对话中给出的 Vite DevTools 双栏页面代码。实现时直接复制 markup 与交互形式。

#### B2. Agent Context 包含多少不同来源

- **状态**：当前方案。
- **目的**：时间线之后立即说明 Context 为什么比 Prompt 难组织。
- **标题候选**：
  - 「Agent Context 从来不只有 Prompt」
  - 「一次模型调用，会带上哪些内容」
- **页面内容候选**：
  - System Prompt；
  - 当前用户输入；
  - 历史消息；
  - 检索结果与记忆；
  - 工具定义；
  - Skill；
  - 运行状态与上一步工具结果。
- **页面归纳候选**：

> 内容越多，越需要决定放什么、按什么顺序放，以及什么时候重新生成。

- **可视化方向**：多个来源汇入同一个 Context Window。优先使用流向或组装图，不使用七张同类卡片。
- **动画**：来源逐步进入 Context；最后一次点击显示归纳句。
- **与下一页衔接**：这些来源最终仍然需要被组织成模型能够接收的消息。
- **参考素材**：
  - 当前 `slides.md` 的「prompt 只是 context 的一小块」；
  - `/ce-anthropic-2.png`；
  - 当前 Codex / OpenClaw / Hermes 页面中的 Context 来源素材，但不保留三家 Agent 的独立介绍。

#### B3. 最终仍然要组织成文本或消息

- **状态**：当前方案。
- **目的**：从 Context 来源自然落到现有实现问题。
- **标题候选**：
  - 「这些内容，最后仍然要被组织成消息」
  - 「Context 的最后一步仍然是组装」
- **核心材料**：AIRI Telegram bot 旧版 `read-message.ts` 的真实字符串拼接代码。
- **动画**：继续使用 Shiki 点击高亮，依次标出：
  1. Prompt 埋在业务代码里；
  2. 变量和 fallback 写在字符串之间；
  3. 两句话之间缺少空格或换行；
  4. Skill 或复用片段只能依赖更多文件读取和字符串拼接。
- **措辞偏好**：直接描述代码发生了什么，不写「共同观察」或「这些问题前端早已解决」。
- **来源**：当前 `slides.md` 的「先看我们自己的真实代码」。

#### B4. 字符串与文件引用的问题

- **状态**：当前方案，可与 B3 合并。
- **目的**：补足 Skill 引用和最终结果预览困难。
- **内容候选**：
  - 排版依赖 `+`、模板字符串和手写换行；
  - 输入缺少统一类型；
  - Skill 复用停留在文件引用或字符串片段；
  - 条件分支散落在业务代码；
  - 最终 Prompt 无法直接预览。
- **标题候选**：
  - 「文件可以复用，组合仍然依赖字符串」
  - 「Skill 越多，最终 Context 越难看见」
- **布局**：如果保留独立页面，使用真实代码或文件树配合标注，不使用纯标签卡片。

#### B5. Vue 已经提供了组织动态内容的方式

- **状态**：当前方案。
- **目的**：把前面的具体问题映射到 Vue 能力。
- **标题候选**：
  - 「Vue 已经有一套组织动态内容的方式」
  - 「模板、Props、组件与响应式」
- **映射内容**：
  - 字符串排版 → template；
  - 输入变量 → `defineProps`；
  - Skill / 片段复用 → component / import；
  - 条件输入 → `v-if`；
  - Context 变化 → reactivity。
- **归纳**：`prompt = f(context)` 可以保留，但不要使用中文粗体。
- **参考**：当前「而这些问题，前端早已解决」页面。保留映射关系，重写标题与宣传式措辞。

#### B6. 把 Context 写成 Vue 组件

- **状态**：当前方案，Velin 核心展示。
- **目的**：正式引出 Velin。
- **标题候选**：
  - 「把 Context 写成 Vue 组件」
  - 「Prompt 从字符串变成组件」
- **展示形式**：Shiki magic move。
- **代码演进**：
  1. 旧字符串拼接；
  2. 独立 `.velin.md` 文件；
  3. `defineProps` 提供类型；
  4. `v-if` 表达条件；
  5. `import` 并组合 Persona、Skill、ReplyFormat 等组件；
  6. 调用侧只保留有类型的渲染函数。
- **注意**：控制 magic move 阶段数量，避免一次展示过多完整代码。可以拆成两页，但两页必须使用同一份代码继续生长。
- **参考**：当前「所以我们做了 Velin」和「从一句话开始，渐进式长成 Agent prompt」。

#### B7. Skill 也可以是组件

- **状态**：当前方案，代码形态待核对。
- **目的**：回应「Skill 引用困难」。
- **代码候选**：

```velin
<script setup lang="ts">
import Persona from './persona.velin.md'
import ReadMessages from './skills/read-messages.velin.md'
import ReplyFormat from './reply-format.velin.md'
</script>

<Persona />
<ReadMessages />
<ReplyFormat />
```

- **动画**：在同一份 Prompt 中逐个加入组件；最后显示渲染后的完整 Context。
- **待核对**：
  - Velin 当前推荐的组件导入和 Props 写法；
  - 是否存在正式的 Skill 组件示例；
  - 是否应直接称为 Skill，还是更准确地称为可复用 Context 片段。

#### B8. REPL：直接看到最终 Context

- **状态**：已确认需要突出，不做 Live Demo。
- **目的**：组件化解决组织和复用；REPL 解决最终结果不可见。
- **标题候选**：
  - 「渲染结果可以直接预览」
  - 「改 Props，最终 Context 立即更新」
- **素材**：`/velin-playground-crop.png` 或重新截取更清晰的 REPL 图片。
- **页面说明候选**：

> 左侧编写组件，中间查看最终 Prompt，右侧修改 Props。

- **动画**：使用截图上的 `v-mark` 或局部放大，依次标出源码、渲染结果和 Props 面板。不要现场切换页面。
- **参考**：当前「Velin Playground」页面；2024 KubeCon 的引用标注节奏。

#### B9. 生产项目中的组件目录

- **状态**：当前方案，可选。
- **目的**：证明 Context 组件可以在真实项目中按职责拆分。
- **素材**：当前 AIRI / Cahciua `prompts/` 文件树。
- **取舍**：如果 Velin 段落时间不足，只保留一棵目录树，不同时展示两个项目。
- **动画**：标出 system、late-binding、`*-to-text` 三类文件与组件职责。

#### B10. Prompt 已经准备好了

- **状态**：用户认为目前可以，尽量保留。
- **作用**：把 Velin 渲染结果交给 Agent runtime，并作为 Velin → Vieval 的桥。
- **展示形式**：保留 magic move，从 `renderComponent` 逐步加入 messages、tools 和停止条件。
- **待核对**：
  - 当前 xsAI / Velin API 是否准确；
  - `messages: [system(await renderComponent(SystemPrompt))]` 是否为推荐写法；
  - 不展示尚未实现的 XML renderer。

### C. 从 Agent Loop 到 Benchmark

#### C1. Agent 开始行动

- **状态**：需要重写，当前六行轨迹只作为素材。
- **目的**：说明渲染后的 Context 进入模型、工具与消息循环，同一任务可能产生不同路径。
- **可视化方向**：保留 Agent Loop / trace，但减少文字行数。优先展示 `model → tool → result → model` 的循环关系。
- **动画**：每次点击推进一次 model/tool/result，不机械显示六个同构行。
- **参考**：当前「Agent 开始行动」页面。

#### C2. 重复运行以后才看见结果分布

- **状态**：保留互动组件，外围页面压缩。
- **组件**：`components/AgentSamplingLab.vue`。
- **目的**：直观看到两次、十次、五十次、两百次运行的差异。
- **标题候选**：
  - 「同一个任务，重复运行以后」
  - 「一次成功不能代表下一次」
- **删除**：
  - 独立的「如何多一点把握？」过场页；
  - `pass@1` / `pass@4` / `pass^4`；
  - 稳定通过率等指标符号教学。

#### C3. Monte Carlo 来源说明

- **状态**：冲突已记录，当前倾向最多保留一页或一句脚注。
- **早期要求**：使用 2024 KubeCon `SOTA & Researches` 的引用布局，引用 Wikipedia，并最大化使用 `v-mark` annotation。
- **后续反馈**：不应为了重复运行展开概率论教学；20 分钟的 Vieval 段落不需要 `pass@k` / `pass^k`。
- **当前处理**：
  - 不保留问答揭晓页；
  - 如果保留，只使用一页短引用说明「重复随机抽样用于估计数值结果」；
  - 不讲公式，不解释指标；
  - 引用必须核对 Wikipedia 原文并使用脚注。

### D. Benchmark 背景与 MCPMark

#### D1. 不同 Benchmark 测量不同能力

- **状态**：当前方案，保留一页。
- **目的**：说明 Benchmark 会固定不同任务和判定方法，不展开 Benchmark 名词教学。
- **素材**：从 Qwen、Seed、DeepSeek 等正式模型卡中截取 Benchmark 表格。
- **布局**：参考用户在 `reference.md` 中给出的 Features 卡片组，3–4 张卡片即可。
- **卡片内容方向**：不同能力维度，而不是逐一解释 MMLU、GSM8K、HumanEval、IFEval。
- **动画**：每次点击出现一个能力维度；卡片底部保留来源或模型卡标识。
- **参考**：
  - `reference.md` 开头关于模型卡截图的要求；
  - `/public/benchmarks/` 现有三张截图；
  - 2024 / 2025 KubeCon 的 Features 卡片布局。

#### D2. Benchmark 的最小组成

- **状态**：当前方案。
- **目的**：为 Vieval 建立直觉，不做术语教学。
- **措辞候选**：

> 准备输入，运行目标，检查结果。

或：

> 一组案例 + 一次调用 + 一组断言。

- **页面形式**：可以是一张非常短的桥接页，也可以直接融入第一个 Vieval 代码示例。

#### D3. MCPMark 实践背景

- **状态**：已确认需要，压缩成 1–2 页。
- **目的**：为后续 Benchmark 见解提供事实背书。
- **布局**：直接参考 2024-08-21 KubeCon「Who else have tried」，不要拆成四张低密度履历页。
- **内容**：
  - MCPMark 的任务类型；
  - 多步 MCP 工具调用；
  - 程序化检查最终环境状态；
  - 127 个任务、38 个初始状态、5 类 MCP 环境；
  - 共同第一作者；
  - 维护开发者；
  - ICLR 2026 Poster；
  - Qwen、Seed、DeepSeek 等采用或引用情况。
- **Presenter notes**：

> 所以我自己确实觉得，我应该还算比较懂 Benchmark。

- **页面要求**：页面只放支撑这句话的事实，不直接写自我评价。
- **待查素材**：
  - `https://github.com/eval-sys/mcpmark`；
  - `https://arxiv.org/abs/2509.24002`；
  - Qwen、Seed、DeepSeek 的正式采用或引用位置；
  - ICLR 2026 页面；
  - MCPMark Logo、论文图、任务截图或报告图。
- **待核对**：不能把「采用 Benchmark」写成「共同研究」；不同模型报告使用的运行设置不能直接横向比较。

### E. Vieval：Benchmark 并不难

#### E1. 揭示 Vieval

- **状态**：已确认需要大标题页。
- **布局**：直接参考 `reference.md` 中 Kcover 的 reveal 页面，只替换标题、图标和副标题。
- **Logo**：`/Users/neko/Git/github.com/vieval-dev/vieval/docs/content/public/vieval-logo-with-text-light.svg`。
- **标题**：`Vieval`。
- **副标题候选**：
  - 「像写 TypeScript 测试一样实现 Benchmark」
  - 「Benchmark without the ceremony」
- **动画**：问题或引导语先居中；第一次点击缩小移到顶部；随后显示 Vieval Logo 与一句小字。

#### E2. Benchmark 最小示例：调用函数并检查结果

- **状态**：已确认使用黑盒 Agent，不展示 Provider 或模型初始化。
- **参考代码**：
  - `/Users/neko/Git/github.com/vieval-dev/vieval/examples/basic/evals/emotion-analysis/agent.eval.ts`
- **需要隐藏的内容**：
  - `createOpenAI`；
  - `openrouterFromRunContext`；
  - `createEmotionAnalysisAgent` 的初始化细节。
- **舞台上的 Agent 形态**：

```ts
import { analyzeEmotion } from './agent'
```

- **Magic move 阶段**：

```ts
const result = await analyzeEmotion(
  'I am feeling very happy today!',
)
```

```ts
const result = await analyzeEmotion(
  'I am feeling very happy today!',
)

expect(result).toBeOneOf(['happy', 'sad'])
```

```ts
describeTask('emotion analysis', () => {
  caseOf('happy message', async () => {
    const result = await analyzeEmotion(
      'I am feeling very happy today!',
    )

    expect(result).toBeOneOf(['happy', 'sad'])
  })
})
```

- **页面结论**：

> 调一个函数，检查返回值，再把它放进 Task 和 Case。

- **要求**：使用 Vieval 当前真实、可运行的 API；只在页面上隐藏与 Eval 无关的初始化。

#### E3. 常见案例一：分类或简单返回值

- **状态**：已确认方向。
- **目的**：让第一例足够简单，返回数字、布尔值、枚举或其他直接结果都可以。
- **当前素材**：emotion analysis。
- **不讲的内容**：不展开 LLM Judge、模型 Provider、评测指标或 Matrix。
- **动画**：全部通过一页 magic move 完成。

#### E4. 常见案例二：从文章提取结构化信息

- **状态**：输入与目标已确认，API 待设计。
- **黑盒函数候选**：

```ts
const result = await extractArticleMetadata(article)
```

- **目标结构**：

```ts
{
  title: string
  summary: string
  keywords: string[]
}
```

- **需要检查的层次**：
  1. 返回值能够解析；
  2. `title`、`summary`、`keywords` 存在且类型正确；
  3. 必要字段不是空值；
  4. 标题与关键词能对应原文章；
  5. 摘要覆盖文章核心内容。
- **Magic move 方向**：
  1. 调用黑盒提取函数；
  2. 加入结构检查；
  3. 加入字段内容检查；
  4. 必要时加入 Rubric / Judge 检查摘要质量。
- **页面核心措辞候选**：

> JSON 能解析，只说明格式合法；字段内容仍然需要检查。

- **待查素材**：
  - Vieval 当前 Structured Output matcher；
  - Vieval 是否已有文章提取示例；
  - 可以放入 slide 的短文章与期望结构；
  - 摘要与关键词质量适合使用的 matcher / rubric。

#### E5. 常见案例三：Deep Research

- **状态**：检查目标已确认，具体 API 与素材待查。
- **Agent 形态**：已有 Research Agent 黑盒，不展示搜索或模型实现。
- **调用候选**：

```ts
const result = await research(question)
```

- **结果候选**：

```ts
{
  answer: string
  citations: Array<{
    url: string
    claim: string
  }>
}
```

- **需要检查的层次**：
  1. 最终回答非空；
  2. 关键结论包含引用；
  3. 引用 URL 可以定位到实际来源；
  4. 来源内容支持对应结论；
  5. 不只检查「有没有 citation」，还检查 citation correctness。
- **参考方向**：BrowserCamp、DeepResearchBench 或相近 Deep Research Benchmark。
- **Magic move 方向**：
  1. 检查回答非空；
  2. 检查 citation 数量与结构；
  3. 加入来源可访问性或证据匹配；
  4. 加入对 claim–source 对应关系的判定。
- **页面核心措辞候选**：

> 有引用，不代表引用支持这句话。

- **待查素材**：
  - BrowserCamp 的任务和 citation correctness 定义；
  - DeepResearchBench 的引用与事实性评测方式；
  - Vieval 当前能够复用的 matcher、rubric 或自定义断言；
  - 一个短、可核验、适合台上展示的 research question；
  - 可公开展示的答案与来源片段。

#### E6. 从 Case 扩展到 Project / Workspace / Comparison

- **状态**：保留，但不作为演讲目标。
- **目的**：说明 Benchmark 规模增长后仍然沿用同一套写法。
- **叙事顺序**：
  1. 一个 Task 有多个 Case；
  2. 多个 Task 组成 Project；
  3. 多个 Project 组成 Workspace；
  4. 多套实现进入 Comparison。
- **可视化**：使用同一棵缩进树逐步生长；侧边可以标出 Vitest 对应层级。
- **对应关系**：
  - Project ≈ Vitest project / package；
  - Workspace ≈ monorepo level；
  - Comparison 没有必要强行寻找 Vitest 等价物。
- **动画**：不要拆成四张卡片。每次点击在同一棵树上增加一层。
- **待核对**：从 Vieval 源码和文档确认当前层级语义、配置格式和命名。

#### E7. Matrix：模型、语言、参数、Prompt 与评分条件

- **状态**：保留，作为「规模增长后仍然容易」的第二个证据。
- **引导方式**：先展示需要比较的变量，再给出 Matrix 的名字。
- **变量**：
  - 模型；
  - 语言；
  - 参数；
  - Prompt；
  - Rubric；
  - Judge model。
- **页面形式**：
  - 第一页：参考 GitHub Actions Matrix，从单次运行展开为组合；
  - 第二页：区分 `runMatrix` 与 `evalMatrix`；
  - 或使用用户在 `reference.md` 中给出的 Features 卡片组展示并列变量。
- **动画**：每次点击加入一个新维度并更新组合数量，不只是显示一张新卡片。
- **待核对**：Vieval 当前 Matrix API 与可运行示例。

#### E8. 格式正确不等于任务正确

- **状态**：保留，与结构化提取案例相互呼应。
- **真实对照候选**：
  - `{}` 可以解析，但缺少字段；
  - 工具调用存在，但选择了错误工具；
  - 参数结构正确，但参数值无法完成任务；
  - 输出结构与业务含义都正确。
- **措辞候选**：

> 格式合法，只完成了第一步。

- **引出的能力**：普通 Vitest `expect`、Structured Output matcher、Tool Call matcher、Rubric / LLM Judge。
- **布局**：优先使用输入输出对照，不使用四张只有名称的能力卡片。

#### E9. 实际运行

- **状态**：已确认需要作为 Vieval 段落结尾。
- **素材候选**：
  - CLI 运行截图；
  - Case 通过/失败结果；
  - Matrix 展开数量；
  - JSON artifacts；
  - 报告中的版本比较或回归项。
- **页面目标**：回答「写完 Eval 以后，实际得到了什么」。
- **动画**：优先使用一次完整运行截图配合 `v-mark`，标出 Task 数量、失败 Case、Matrix 和产物位置。
- **待查素材**：Vieval 仓库中最适合公开展示、字段真实且不依赖私有服务的运行结果。

### F. 收束

#### F1. Velin 与 Vieval

- **状态**：需要新增或重写。
- **目的**：回到整场演讲标题，不使用 AIRI 作为贯穿案例。
- **措辞候选**：

```text
Velin：组织和渲染 Context
Vieval：运行和检查 Agent
```

- **进一步解释**：这里的「可控」不是消除模型随机性，而是让 Context 的组织方式可维护，让运行条件可记录，让结果可以重复观察和比较。
- **可视化**：简单的数据流或双栏，不制作复杂架构图。

#### F2. 项目元素周期表

- **状态**：已存在组件，保留为结尾延伸。
- **组件**：`components/MoeruEcosystem.vue`。
- **参考**：
  - `https://github.com/antfu/talks/blob/main/2025-10-25/src/components/DevToolsKit.vue`；
  - `https://github.com/moeru-ai` 下属仓库；
  - AUV Logo：`https://github.com/moeru-ai/auv/blob/main/docs/assets/logo-dark.svg`；
  - Repo description 中的 emoji，可替换为 Twemoji / Iconify 图标。
- **作用**：展示这些工作属于同一组开源项目，不替代演讲结论。

#### F3. 谢谢

- **状态**：保留。
- **内容**：Velin、Vieval、AIRI 二维码与讲者信息。

## 4. 需要继续读取的本地资料

### Velin

- 当前 `slides.md` 中的真实旧代码、magic move、Playground 和生产目录。
- Velin 当前仓库与文档，核对：
  - 组件导入；
  - Props；
  - 条件渲染；
  - REPL；
  - renderer；
  - Skill / Context 片段的准确叫法。

### Vieval

- `/Users/neko/Git/github.com/vieval-dev/vieval/examples/basic/evals/emotion-analysis/agent.eval.ts`
- Vieval docs 与 examples 中：
  - Structured Output；
  - Tool Call；
  - Rubric / LLM Judge；
  - Task / Case；
  - Project / Workspace / Comparison；
  - `runMatrix` / `evalMatrix`；
  - CLI、artifact 和报告。

### 参考 Deck

- `/Users/neko/Git/github.com/nekomeowww/talks/packages/2024-08-21-kubecon-hk/slides.md`
  - `SOTA & Researches`：引用、脚注与 `v-mark`；
  - `Who else have tried`：项目背书、优缺点与论文引用；
  - Features 卡片组；
  - Kcover reveal 页面。
- `/Users/neko/Git/github.com/nekomeowww/talks/packages/2025-06-11-kubecon-hk/slides.md`
  - 一页一个判断但保留代码、报错、YAML、数字和对照；
  - before/after；
  - 卡片、代码和可视化混用；
  - 点击控制阅读顺序。
- 用户在当前对话中提供的 Vite DevTools 双栏时间线页面：实现时直接复制结构，只替换内容。

## 5. 需要继续查找的外部资料

- Wikipedia 的 Monte Carlo 原文与可引用句子；仅在最终决定保留该页时查找。
- MCPMark 论文、项目、ICLR 页面和正式引用。
- Qwen、Seed、DeepSeek 模型卡中使用 MCPMark 的具体位置。
- BrowserCamp 与 DeepResearchBench：
  - Task 设计；
  - citation completeness；
  - citation correctness；
  - claim–source 对应关系；
  - 适合台上解释的公开例子。
- Context Engineering 的原始引用和可以公开使用的图。

## 6. 组件与交互清单

### 现有组件

- `ConceptReel`：封面，保留。
- `AgentSamplingLab.vue`：重复运行分布，保留并减少外围过场页。
- `MoeruEcosystem.vue`：项目元素周期表，保留在总结之后。

### Slidev 内建能力

- `magic-move`：Velin 组件化、Vieval 三个案例。
- Shiki 点击行高亮：旧字符串拼接、配置和 matcher。
- `v-click`：时间线、Context 来源、层级树和 Matrix 渐进展开。
- `v-mark`：引用、运行截图、关键数字和真实错误位置。
- `v-switch` 或 click-based class：before/after 与同一棵树的状态变化。

### 可能新增的组件

- ContextSources：多个来源汇入 Context Window；只有 Markdown 难以表达时再创建。
- EvalHierarchy：Task → Project → Workspace → Comparison 的同一棵生长树。
- EvalMatrix：变量加入时组合数量变化。
- 不为普通卡片页面创建组件。

## 7. 措辞规则

### 使用

- 「Agent Context 从来不只有 Prompt」
- 「这些内容，最后仍然要被组织成消息」
- 「把 Context 写成 Vue 组件」
- 「改 Props，最终 Context 立即更新」
- 「一次成功不能代表下一次」
- 「准备输入，运行目标，检查结果」
- 「调一个函数，检查返回值」
- 「JSON 能解析，只说明格式合法」
- 「有引用，不代表引用支持这句话」
- 「模型、语言和 Prompt 一起进入 Matrix」

### 避免

- 「共同观察」
- 「如何多一点把握？」
- 「我们刚才做的是什么？」
- 「我们可以测量这些」
- 「稳定性可以怎样看」
- 「给能力一个可重复的测量过程」
- 「评测范围怎样扩展」
- 「评分可以有多种证据」
- 「Vieval 把实验留下来」
- 「这项工作后来出现在哪里」
- 「Velin 可以做到！」
- 「模型研发早就在测这些」

中文负责解释，英文只保留产品名、正式术语和 API 标识。先解释用途，再出现 `Task`、`Matrix`、`runMatrix` 等名字。

## 8. 已删除或降级的内容

- `pass@1`、`pass@4`、`pass^4`：删除。
- 独立的「稳定性」指标教学：删除。
- EvalScope 产品介绍：删除。
- MMLU / GSM8K / HumanEval / IFEval 名词课：删除或替换为模型卡截图中的能力维度。
- Live Demo：删除，改用截图。
- Demo 失败兜底文字：从观众页面移到 presenter notes。
- XML renderer：在未实现前不作为现有能力展示。
- 讲者 MCPMark 履历三卡片：替换为高密度事实与来源页面。
- 同一组 Matrix 变量先用代码再用卡片重复一遍：合并。

## 9. 下一轮调研顺序

后续不立即修改 `slides.md`，按下面顺序补充本文件：

1. 读取 Velin 当前代码与文档，确定 B6–B10 的真实代码。
2. 读取 Vieval examples，确定 E2–E9 的真实 API 和可运行示例。
3. 查 MCPMark、模型卡和 ICLR 来源，确定 D3 的页面事实与引用。
4. 查 BrowserCamp / DeepResearchBench，确定 E5 的 citation correctness 表达。
5. 选择 Context Engineering 左图和引用来源。
6. 根据素材重新计算页面数量和每页讲述时间。
7. 再形成最终逐页设计，确认后才修改 `slides.md`。
