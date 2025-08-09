---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: '不要 Python，让我们用 Rust 实现跨平台高性能的 AI 推理！'
exportFilename: Don't Use Python - Let's Use Rust for Cross-platform High-performance AI Inference
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 233
routerMode: hash
---

<div translate-x--20 translate-y-10>

<h1>
不要 Python，<br />让我们用 Rust 实现跨平台高性能的 AI 推理！
</h1>

Don't Use Python, <br />Let's Use Rust for Cross-platform High-performance AI Inference!

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
layout: intro
class: px-24
glowSeed: 205
---

<div flex items-center justify-center>
  <div
    v-click flex flex-col gap-2 items-center justify-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"
  >
    <div flex items-center gap-6>
      <div i-simple-icons:rust text-8xl text-white />
    </div>
  </div>
  <div
    v-after pl-15 pr-15 transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'scale-80' : 'scale-100'"
  >
    <div i-carbon:add text-8xl />
  </div>
  <div
    v-after flex flex-col gap-2 items-center justify-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x-20' : 'translate-x-0'"
  >
    <div flex items-center gap-6>
      <div i-carbon:machine-learning text-8xl text-blue-400 />
    </div>
  </div>
</div>

<div v-click="2" mt-10 text-center>
  <div text-xl>"高性能、零开销、内存安全的 AI 推理"</div>
  <div text-neutral-400 mt-2 text-sm>- 为什么越来越多团队选择 Rust？</div>
</div>

---
class: py-10
glowSeed: 100
---

# AI 很火！模型层出不穷

<span>每个新模型都带来新的挑战</span>

<!--
讲解要点：
- AI 领域发展迅速，模型创新不断
- 新模型的出现不仅仅是参数量的增加，更重要的是架构创新
- 每次架构创新都给推理引擎带来适配挑战
-->

<div mt-6 />

<div v-click="1" flex items-center justify-center mb-8>
  <div i-carbon:chart-line-data text-6xl text-orange-400 />
  <div ml-4 text-2xl>模型发布速度越来越快</div>
</div>

<div grid grid-cols-2 gap-8>
  <div v-click="2" class="border-2 border-orange-500/30 rounded-lg p-2 bg-orange-900/20">
    <div text-xl font-bold mb-4 text-orange-300 flex items-center>
      <div i-carbon:data-base mr-3 />数据集创新
    </div>
    <div space-y-3>
      <div class="px-4 py-2 bg-orange-800/30 rounded-lg text-sm">
        <div font-bold>Common Crawl</div>
        <div text-xs text-orange-200>网页爬取数据</div>
      </div>
      <div class="px-4 py-2 bg-orange-800/30 rounded-lg text-sm">
        <div font-bold>RedPajama</div>
        <div text-xs text-orange-200>LLaMA 数据集重现</div>
      </div>
      <div class="px-4 py-2 bg-orange-800/30 rounded-lg text-sm">
        <div font-bold>LAION</div>
        <div text-xs text-orange-200>图像文本对数据</div>
      </div>
    </div>
  </div>

  <div v-click="3" class="border-2 border-red-500/30 rounded-lg p-2 bg-red-900/20">
    <div text-xl font-bold mb-4 text-red-300 flex items-center>
      <div i-carbon:neural-network mr-3 />模型架构创新
    </div>
    <div space-y-3>
      <div class="px-4 py-2 bg-red-800/30 rounded-lg text-sm">
        <div font-bold>Transformer</div>
        <div text-xs text-red-200>注意力机制革命</div>
      </div>
      <div class="px-4 py-2 bg-red-800/30 rounded-lg text-sm">
        <div font-bold>MoE (专家混合)</div>
        <div text-xs text-red-200>稀疏激活提效</div>
      </div>
      <div class="px-4 py-2 bg-red-800/30 rounded-lg text-sm">
        <div font-bold>Mamba / SSM</div>
        <div text-xs text-red-200>状态空间模型</div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
---

<!--
讲解要点：
- 模型架构变化时，现有推理引擎需要适配
- 不同架构对计算资源的需求不同
- 推理引擎需要持续更新来支持新架构
-->

<div v-click flex items-center flex-col w-full mt-35>
  <div text-xl font-bold mb-4 text-yellow-300 flex items-center>
    模型架构变化带来的挑战
  </div>
  <div text="[48px]">
    模型结构变化了，<span text-red-300>推理引擎咋办呢？</span>
  </div>
</div>

<!--
- 适配成本
  - 新架构需要重新实现，算子优化需要重新调试，测试验证工作量大，
- 时间窗口
  - 模型发布到支持有延迟，
  - 错过最佳应用时机，
  - 社区分化问题，
- 兼容性
  - 多版本并存复杂，
  - 依赖关系冲突，
  - 部署环境差异，
-->

---
class: py-10
glow: bottom
glowSeed: 350
---

# Python 生态的推理引擎现状

<span>百花齐放，各有特色</span>

<!--
讲解要点：
- Python 生态中有很多优秀的推理框架
- 每个框架都有自己的特点和适用场景
- 选择哪个框架往往取决于具体需求
-->

<div mt-8 />

<div grid grid-cols-2 gap-12>
  <div v-click="1">
    <div text-xl font-bold mb-6 text flex items-center>
      推理框架
    </div>
    <div space-y-7 text-lg>
      <div flex items-center text="[32px]">
        <div i-lobe-icons:vllm-color mr-3 text-yellow-400 />
        <span>vLLM</span>
      </div>
      <div flex items-center text="[32px]">
        <div i-logos:hugging-face-icon mr-3 />
        <span>transformers</span>
      </div>
      <div flex items-center text="[32px]">
        <div i-devicon:pytorch mr-3 />
        <span>PyTorch</span>
      </div>
    </div>
  </div>

  <div v-click="2">
    <div text-xl font-bold mb-6 flex items-center>
      <div i-carbon:chip text-2xl mr-3 />推理运行时
    </div>
    <div space-y-7 text-lg>
      <div flex items-center text="[32px]">
        <div i-simple-icons:nvidia mr-3 text-green-300 />
        <span>Triton</span>
      </div>
      <div flex items-center text="[32px]">
        <div i-simple-icons:onnx mr-3 text-blue-400 />
        <span>ONNX Runtime</span>
      </div>
      <div flex items-center text="[32px]">
        <div i-simple-icons:nvidia mr-3 text-green-300 />
        <span>TensorRT</span>
      </div>
    </div>
  </div>
</div>

---
class: py-10
---

# 推理引擎的底层实现

<span>不同的计算后端，不同的优化策略</span>

<!--
讲解要点：
- 介绍推理引擎底层的计算后端
- 每种后端都有其特点和适用场景
- 跨平台支持的重要性
-->

<div mt-8 />

<div grid grid-cols-2 gap-8>
  <div v-click="1">
    <div text-xl font-bold mb-4 text-purple-300 flex items-center>
      <div i-carbon:hardware-security-module mr-3 />算子和 Shader 实现
    </div>
    <div space-y-4>
      <div class="rounded-lg p-4 bg-purple-900/20">
        <div font-bold text-purple-200 mb-2>NVIDIA CUDA</div>
        <div text-sm text-purple-100>NVCC 编译，.cu 内核文件</div>
      </div>
      <div class="rounded-lg p-4 bg-blue-900/20">
        <div font-bold text-blue-200 mb-2>Apple Metal / CoreML</div>
        <div text-sm text-blue-100>Metal Shading Language</div>
      </div>
      <div class="rounded-lg p-4 bg-green-900/20">
        <div font-bold text-green-200 mb-2>WebGPU</div>
        <div text-sm text-green-100>WGSL Compute Shaders</div>
      </div>
    </div>
  </div>

  <div v-click="2">
    <div text-xl font-bold mb-4 text-orange-300 flex items-center>
      <div i-carbon:cloud-foundry mr-3 />跨平台计算框架
    </div>
    <div space-y-4>
      <div class="rounded-lg p-4 bg-orange-900/20">
        <div font-bold text-orange-200 mb-2>AMD ROCm</div>
        <div text-sm text-orange-100>HIP 编程模型</div>
      </div>
      <div class="rounded-lg p-4 bg-red-900/20">
        <div font-bold text-red-200 mb-2>Vulkan Compute</div>
        <div text-sm text-red-100>跨平台 GPU 计算</div>
      </div>
      <div class="rounded-lg p-4 bg-yellow-900/20">
        <div font-bold text-yellow-200 mb-2>OpenCL</div>
        <div text-sm text-yellow-100>传统跨平台方案</div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
---

# Python 中的典型推理流程

<span>以 HuggingFace transformers 为例</span>

<!--
讲解要点：
- 展示 Python 中最常见的模型推理方式
- 介绍 transformers 的 AutoModel 和 AutoPipeline API
- 说明这种方式的便利性和局限性
-->

<div mt-6 />

<div v-click="1" class="mb-6">
  <div text-lg font-bold mb-3 flex items-center>
    <div i-logos:hugging-face-icon mr-2 />HuggingFace transformers
  </div>
</div>

````md magic-move
```python
# 最简单的使用方式
from transformers import AutoModel, AutoTokenizer

model_name = "openai/gpt-oss-120b"

tokenizer = AutoTokenizer.from_pretrained(model_name)

model = AutoModel.from_pretrained(model_name)
```

```python
# Pipeline 方式 - 更高级的封装
from transformers import pipeline

# 创建对话 pipeline
chatbot = pipeline("conversational", model="openai/gpt-oss-120b")

# 直接使用
response = chatbot("Hello, how are you?")
print(response)
```

```python
# 完整的推理流程
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# 加载模型和分词器
tokenizer = AutoTokenizer.from_pretrained("openai/gpt-oss-120b")
model = AutoModelForCausalLM.from_pretrained("openai/gpt-oss-120b")

# 编码输入
input_text = "Hello, how are you?"
inputs = tokenizer.encode(input_text, return_tensors="pt")

# 推理
with torch.no_grad():
  outputs = model.generate(inputs, max_length=100, do_sample=True)

# 解码输出
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
```
````

<div v-click="4" mt-6 class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
  <div text-sm>
    <span text-blue-300 font-bold>看起来很简单？</span> 背后其实有很多复杂的工作...
  </div>
</div>

---
class: py-10
---

# ONNX Runtime 的使用

<span>跨平台推理的经典选择</span>

<!--
讲解要点：
- 介绍 ONNX Runtime 作为跨平台推理引擎的优势
- 展示 Python 中如何使用 ONNX Runtime
- 对比与 transformers 的区别
-->

<div mt-6 />

````md magic-move
```python
# Python 中使用 ONNX Runtime
import onnxruntime as ort
import numpy as np

# 创建推理会话
session = ort.InferenceSession("model.onnx")

# 准备输入数据
input_data = np.random.random((1, 3, 224, 224)).astype(np.float32)

# 执行推理
outputs = session.run(None, {"input": input_data})
```

```python
# transformers.js 的使用方式 (JavaScript)
import { pipeline } from '@xenova/transformers';

// 创建 pipeline
const classifier = await pipeline('sentiment-analysis',
    'Xenova/distilbert-base-uncased-finetuned-sst-2-english');

// 执行推理
const result = await classifier('I love transformers!');
// Output: [{'label': 'POSITIVE', 'score': 0.999}]
```

```python
# 更复杂的 ONNX Runtime 使用
import onnxruntime as ort

# 指定执行提供者（计算后端）
providers = [
    'CUDAExecutionProvider',    # NVIDIA GPU
    'CoreMLExecutionProvider',  # Apple Silicon
    'CPUExecutionProvider'      # CPU 回退
]

session = ort.InferenceSession("model.onnx", providers=providers)

# 获取输入输出信息
input_names = [i.name for i in session.get_inputs()]
output_names = [o.name for o in session.get_outputs()]
```
````

<div v-click="4" mt-6 class="bg-orange-900/20 rounded-lg p-4">
  <div text-sm>
    <span text-orange-300 font-bold>ONNX Runtime 的优势：</span> 自动后端选择，跨平台兼容性
  </div>
</div>

---
class: py-10
---

# 模型背后的复杂工作流程

<span>看似简单的 API 背后隐藏着什么？</span>

<!--
讲解要点：
- 解释模型推理的完整流程
- 介绍各个步骤的作用和复杂性
- 为后续介绍 Rust 实现做铺垫
-->

<div mt-6 />

<div v-click="1" class="mb-4">
  <div text-xl font-bold text-orange-300 flex items-center>
    <div i-carbon:flow mr-3 />完整的模型推理流程
  </div>
</div>

<div grid grid-cols-5 gap-4>
  <div v-click="2" class="rounded-lg p-12 bg-red-900/20 text-center flex flex-col items-center gap-2">
    <div i-carbon:document text="[50px]" text-red-400 mb-2 />
    <div font-bold text-sm text-nowrap>Load</div>
    <div text-xs text-nowrap text-red-200 mt-1>加载模型文件</div>
  </div>

  <div v-click="3" class="rounded-lg p-12 bg-orange-900/20 text-center flex flex-col items-center gap-2">
    <div i-carbon:settings text="[50px]" text-orange-400 mb-2 />
    <div font-bold text-sm text-nowrap>Config</div>
    <div text-xs text-nowrap text-orange-200 mt-1>解析配置文件</div>
  </div>

  <div v-click="4" class="rounded-lg p-12 bg-amber-900/20 text-center flex flex-col items-center gap-2">
    <div i-carbon:chip text="[50px]" text-amber-400 mb-2 />
    <div font-bold text-sm text-nowrap>Prepare</div>
    <div text-xs text-nowrap text-amber-200 mt-1>预加载权重</div>
  </div>

  <div v-click="5" class="rounded-lg p-12 bg-yellow-900/20 text-center flex flex-col items-center gap-2">
    <div i-carbon:play text="[50px]" text-yellow-400 mb-2 />
    <div font-bold text-sm text-nowrap>Inference</div>
    <div text-xs text-nowrap text-yellow-200 mt-1>执行推理</div>
  </div>

  <div v-click="6" class="rounded-lg p-12 bg-lime-900/20 text-center flex flex-col items-center gap-2">
    <div i-carbon:port-output text="[50px]" text-lime-400 mb-2 />
    <div font-bold text-sm text-nowrap>Decode</div>
    <div text-xs text-nowrap text-lime-200 mt-1>解码输出</div>
  </div>
</div>

<div v-click="7" mt-4 class="bg-white/10 rounded-lg p-4">
  <div text-lg font-bold mb-4 text-neutral-200>模型文件格式多样</div>
  <div flex flex-wrap gap-3>
    <div class="px-3 py-2 bg-blue-800/30 rounded-full text-sm">.pt (PyTorch)</div>
    <div class="px-3 py-2 bg-green-800/30 rounded-full text-sm">.bin (传统二进制)</div>
    <div class="px-3 py-2 bg-purple-800/30 rounded-full text-sm">.safetensors (安全格式)</div>
    <div class="px-3 py-2 bg-orange-800/30 rounded-full text-sm">.onnx (开放标准)</div>
  </div>
</div>

---
class: py-10
---

# 用 Netron 分析模型结构

<span>可视化模型架构的利器</span>

<!--
讲解要点：
- 介绍 Netron 工具的用途
- 展示如何使用 Netron 分析不同格式的模型
- 为理解模型架构打基础
-->

<div mt-4 />

<div v-click="2" class="bg-neutral-900/50 border border-neutral-500/30 rounded-lg overflow-hidden text-center">
  <div class="space-y-6">
    <img src="/netron-screenshot-1.png" />
  </div>
</div>

---
class: py-10
---

# Netron 展示：ONNX 计算图

<span>标准化的算子表示</span>

<!--
讲解要点：
- ONNX 格式显示完整的计算图
- 可以看到数据流和算子连接
- 标准化的算子定义便于跨平台部署
-->

<div v-click="1" class="bg-neutral-900/50 border border-neutral-500/30 rounded-lg overflow-hidden text-center">
  <div class="space-y-6">
    <video muted controls loop>
      <source src="/netron-recording-1-onnx.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>

<div v-click="2" mt-6 class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
  <div text-center text-sm>
    <span text-blue-300 font-bold>关键差异：</span>
    SafeTensors 展示权重结构，ONNX 展示计算流程
  </div>
</div>

---
class: py-10
---

# Netron 展示：Pth 权重信息

<span>权重结构的可视化</span>

<div v-click="1" class="bg-neutral-900/50 border border-neutral-500/30 rounded-lg overflow-hidden text-center">
  <div class="space-y-6">
    <video muted controls loop>
      <source src="/netron-recording-1-onnx.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>

<div v-click="2" mt-6 class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
  <div text-center text-sm>
    <span text-blue-300 font-bold>关键差异：</span>
    SafeTensors 展示权重结构，ONNX 展示计算流程
  </div>
</div>

---
class: py-10
---

# `transformers` 如何 Auto

<div class="mt-10 w-75%" relative>
  <div v-click="2" class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 mb-4"
    transition="all 0.3s ease-in-out"
    :class="[
      $clicks > 2 ? 'opacity-50 blur-sm' : ''
    ]"
  >
    <div font-bold text-orange-300 mb-3 flex items-center>
      <div i-carbon:folder mr-2 />本地存储结构
    </div>

```bash
~/.cache/huggingface/
  hub/
    models--openai--gpt-oss-20b/
      blobs/
        config.json
        tokenizer_config.json
        generation_config.json
        model.safetensors
      snapshots/
        main/  → 符号链接到 blobs
```
  </div>

  <div v-click="3" class="absolute top-0 left-30 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 mb-4"
    transition="all 0.3s ease-in-out"
    :class="[
      $clicks > 3 ? 'opacity-50 blur-sm' : ''
    ]"
  >
    <div font-bold text-blue-300 mb-3 flex items-center>
      <div i-carbon:document-unknown mr-2 />config.json - 模型架构配置
    </div>

```json
{
  "architectures": ["GptOssForCausalLM"],
  "model_type": "gpt_oss",
  "vocab_size": 201088,
  "attention_bias": true,
  "attention_dropout": 0.0,
  "eos_token_id": 200002,
  "experts_per_token": 4,
  "head_dim": 64,
  "hidden_act": "silu",
  "hidden_size": 2880
}
```
  </div>

  <div v-click="4" class="absolute top-0 left-70 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 mb-4"
    transition="all 0.3s ease-in-out"
    :class="[
      $clicks > 4 ? 'opacity-50 blur-sm' : ''
    ]"
  >
    <div font-bold text-green-300 mb-3 flex items-center>
      <div i-carbon:string-text mr-2 />tokenizer_config.json - 分词器配置
    </div>

```json
{
  "bos_token": "<|startoftext|>",
  "clean_up_tokenization_spaces": false,
  "eos_token": "<|return|>",
  "extra_special_tokens": {},
  "model_input_names": [
    "input_ids",
    "attention_mask"
  ],
  "model_max_length": 1000000000000000019884624838656,
  "pad_token": "<|endoftext|>",
  "tokenizer_class": "PreTrainedTokenizerFast",
  "added_tokens_decoder": {
    "200006": {
      "content": "<|start|>",
      "lstrip": false,
      "normalized": false,
      "rstrip": false,
      "single_word": false,
      "special": true
    },
    "200008": {
      "content": "<|message|>",
      "lstrip": false,
      "normalized": false,
      "rstrip": false,
      "single_word": false,
      "special": true
    }
  }
}
```
  </div>

  <div v-click="5" class="absolute top-0 left-100 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
    transition="all 0.3s ease-in-out"
  >
    <div font-bold text-purple-300 mb-3 flex items-center text-nowrap>
      <div i-carbon:generate mr-2 />generation_config.json - 生成参数配置
    </div>

```json
{
  "bos_token_id": 199998,
  "do_sample": true,
  "eos_token_id": [
    200002,
    199999
  ],
  "pad_token_id": 199999,
  "transformers_version": "4.55.0.dev0"
}
```
  </div>
</div>

---
class: py-10
---

# HuggingFace Inspector

<span>可视化本地模型管理</span>

<!--
讲解要点：
- 这里留给你自己实现 HuggingFace Inspector 的演示
- 展示工具如何自动扫描本地模型
- 显示模型的配置信息和元数据
- 方便开发者了解本地安装的模型情况
-->

<div mt-6 />

<div class="bg-neutral-900/50 border border-neutral-500/30 rounded-lg text-center">
  <img src="/huggingface-inspector.png" />
</div>

---
class: py-10
---

# 动态模型加载机制

<span>当遇到不支持的架构时...</span>

<!--
讲解要点：
- 解释 transformers 如何处理未知架构
- 介绍远程代码执行机制
- 说明安全性考虑
-->

<div mt-6 />

<div v-click="1" class="mb-6">
  <div text-xl font-bold mb-4 text-red-300 flex items-center>
    <div i-carbon:warning-hex mr-3 />未知架构的处理
  </div>
</div>

<div grid grid-cols-2 gap-8>
  <div v-click="2" class="rounded-lg p-6 bg-yellow-900/20">
    <div font-bold text-yellow-300 mb-4 flex items-center>
      <div i-carbon:cloud-download mr-2 />远程代码下载
    </div>
    <div text-sm space-y-3>
      <div>当本地不支持某个架构时：</div>
      <div class="pl-4 space-y-2">
        <div>• 从 HuggingFace Hub 下载</div>
        <div>• <code class="bg-yellow-800/30 px-1 rounded">modeling_${architecture}.py</code></div>
        <div>• <code class="bg-yellow-800/30 px-1 rounded">configuration_${architecture}.py</code></div>
      </div>
      <div class="mt-4 p-3 bg-yellow-800/20 rounded">
        <div text-xs font-mono>
          trust_remote_code=True
        </div>
      </div>
    </div>
  </div>

  <div v-click="3" class="rounded-lg p-6 bg-red-900/20">
    <div font-bold text-red-300 mb-4 flex items-center>
      <div i-carbon:security mr-2 />安全性考虑
    </div>
    <div text-sm space-y-3>
      <div class="text-red-200">潜在风险：</div>
      <div class="pl-4 space-y-2">
        <div>• 执行任意远程代码</div>
        <div>• 可能的安全漏洞</div>
        <div>• 版本兼容性问题</div>
      </div>
      <div class="mt-4 p-3 bg-red-800/20 rounded">
        <div text-xs>
          需要明确信任代码来源
        </div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
---

# Rust 生态：candle 库介绍

<span>Rust 中的 transformers / PyTorch 等价物</span>

<!--
讲解要点：
- 介绍 candle 作为 Rust 的深度学习框架
- 说明 candle-transformers 的作用
- 展示与 Python transformers 的相似性
-->

<div mt-6 />

<div grid grid-cols-2 gap-8>
  <div v-click="2" class="space-y-4">
    <div class="rounded-lg p-4 bg-orange-900/20">
      <div font-bold text-orange-300 mb-3 flex items-center>
        <div i-carbon:chip mr-2 />核心特性
      </div>
      <div text-sm space-y-2>
        <div>• 张量操作</div>
        <div>• Metal/CUDA 加速支持</div>
        <div>• 融合 Rust 生态</div>
        <div>• 静态类型检查</div>
      </div>
    </div>
    <div class="rounded-lg p-4 bg-red-900/20">
      <div font-bold text-red-300 mb-3 flex items-center>
        <div i-carbon:cloud-download mr-2 />hf_hub crate
      </div>
      <div text-sm space-y-2>
        <div>• 等效于 huggingface-cli</div>
        <div>• 模型管理</div>
        <div>• 缓存管理</div>
        <div>• API 互操作</div>
      </div>
    </div>
  </div>

  <div v-click="3" class="rounded-lg p-4 bg-lime-900/20">
    <div font-bold text-lime-300 mb-4 flex items-center>
      <div i-carbon:transform-language mr-2 />candle_transformers
    </div>
    <div text-sm space-y-3>
      <div>包含主流模型实现：</div>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div class="bg-lime-800/30 rounded px-2 py-1">Flux</div>
        <div class="bg-lime-800/30 rounded px-2 py-1">Whisper</div>
        <div class="bg-lime-800/30 rounded px-2 py-1">Kokoro</div>
        <div class="bg-lime-800/30 rounded px-2 py-1">GLM4</div>
        <div class="bg-lime-800/30 rounded px-2 py-1">Voxtral</div>
        <div class="bg-lime-800/30 rounded px-2 py-1">Phi</div>
        <div class="bg-lime-800/30 rounded px-2 py-1">Mistral</div>
        <div class="bg-lime-800/30 rounded px-2 py-1">Qwen</div>
        <div class="bg-lime-800/30 rounded px-2 py-1">...</div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
---

# Rust 中的模型推理代码

<span>看看 candle 的实际使用</span>

<!--
讲解要点：
- 展示 Rust 中使用 candle 的代码示例
- 对比与 Python transformers 的异同
- 说明类型安全的优势
-->

<div mt-6 />

````md magic-move
```rust
// Cargo.toml 依赖
[dependencies]
candle-core = { version = "0.9.1" }
candle-nn = { version = "0.9.1" }
candle-transformers = { version = "0.9.1" }
hf-hub = "0.4.2"
tokenizers = "0.21.1"

[features]
default = []
metal = [
    "candle-core/metal",
    "candle-nn/metal",
    "candle-transformers/metal"
]
cuda = [
    "candle-core/cuda",
    "candle-nn/cuda",
    "candle-transformers/cuda"
]

```

```rust
use candle_core::{Device, Tensor};
use candle_transformers::models::whisper::{self, Config};
use hf_hub::api::tokio::Api;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 设备选择
    let device = Device::new_cuda(0)?;

    // 下载模型
    let api = Api::new()?;
    let repo = api.repo(Repo::with_revision("openai/whisper-medium", RepoType::Model, revision));

    Ok(())
}
```

```rust
use candle_core::{Device, Tensor};
use candle_transformers::models::whisper::{self, Config};
use hf_hub::api::tokio::Api;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let device = Device::new_cuda(0)?;

    let api = Api::new()?;
    let repo = api.repo(Repo::with_revision("openai/whisper-medium", RepoType::Model, revision));

    let config = repo.get("config.json")?;
    let tokenizer = repo.get("tokenizer.json")?;
    let model = repo.get("model.safetensors")?;

    Ok(())
}
```

```rust
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let device = Device::new_cuda(0)?;

    let api = Api::new()?;
    let repo = api.repo(Repo::with_revision("openai/whisper-medium", RepoType::Model, revision));

    let config = repo.get("config.json")?;
    let tokenizer = repo.get("tokenizer.json")?;
    let model = repo.get("model.safetensors")?;

    let config: Config = serde_json::from_str(&std::fs::read_to_string(config_filename)?)?;
    let tokenizer = Tokenizer::from_file(tokenizer_filename).map_err(Error::msg)?;

    let vb = unsafe { VarBuilder::from_mmaped_safetensors(&[weights_filename], whisper_model::DTYPE, &device)? };
    let model = WhisperModel::Normal(whisper_model::model::Whisper::load(&vb, config.clone())?)

    let mut decoder = Decoder::new(model, tokenizer.clone(), args.seed, &device, /* language_token */ None, args.task, args.timestamps, args.verbose)?;

    decoder.run(&mel, None)?;

    Ok(())
}
```

```rust
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let device = Device::new_cuda(0)?;

    let api = Api::new()?;
    let repo = api.repo(Repo::with_revision("openai/whisper-medium", RepoType::Model, revision));

    let config = repo.get("config.json")?;
    let tokenizer = repo.get("tokenizer.json")?;
    let model = repo.get("model.safetensors")?;

    let config: Config = serde_json::from_str(&std::fs::read_to_string(config_filename)?)?;
    let tokenizer = Tokenizer::from_file(tokenizer_filename).map_err(Error::msg)?;

    let vb = unsafe { VarBuilder::from_mmaped_safetensors(&[weights_filename], whisper_model::DTYPE, &device)? };
    let model = WhisperModel::Normal(whisper_model::model::Whisper::load(&vb, config.clone())?)

    let mut decoder = Decoder::new(model, tokenizer.clone(), args.seed, &device, /* language_token */ None, args.task, args.timestamps, args.verbose)?;

    decoder.run(&mel, None)?;

    Ok(())
}
```
````

---
class: py-10
---

# candle 的优势

<span>为什么选择 Rust + candle？</span>

<!--
讲解要点：
- 总结 candle 相比 Python 方案的优势
- 强调类型安全、性能、部署等方面
- 为后续介绍更多 Rust 方案做铺垫
-->

<div mt-6 />

<div grid grid-cols-5 gap-4>
  <div v-click="2" class="rounded-lg p-12 bg-red-900/20 text-center flex flex-col items-center gap-2">
    <div i-carbon:array-numbers text="[50px]" text-red-400 mb-6 />
    <div text-xs text-nowrap text-red-200 mt-1>单一可执行文件</div>
  </div>

  <div v-click="3" class="rounded-lg p-12 bg-orange-900/20 text-center flex flex-col items-center gap-2">
    <div i-carbon:certificate-check text="[50px]" text-orange-400 mb-6 />
    <div text-xs text-nowrap text-orange-200 mt-1>无运行时依赖</div>
  </div>

  <div v-click="4" class="rounded-lg p-12 bg-amber-900/20 text-center flex flex-col items-center gap-2">
    <div i-carbon:cicsplex text="[50px]" text-amber-400 mb-6 />
    <div text-xs text-nowrap text-amber-200 mt-1>跨平台编译</div>
  </div>

  <div v-click="5" class="rounded-lg p-12 bg-yellow-900/20 text-center flex flex-col items-center gap-2">
    <div i-carbon:fade text="[50px]" text-yellow-400 mb-6 />
    <div text-xs text-nowrap text-yellow-200 mt-1>更小镜像</div>
  </div>

  <div v-click="6" class="rounded-lg p-12 bg-lime-900/20 text-center flex flex-col items-center gap-2">
    <div i-carbon:intent-request-scale-in text="[50px]" text-lime-400 mb-6 />
    <div text-xs text-nowrap text-lime-200 mt-1>生态兼容</div>
  </div>
</div>

<div v-click="7" mt-8 class="bg-yellow-900/20 rounded-lg p-4">
  <div text-lg font-bold text-yellow-300 mb-2 flex items-center>
    <div i-carbon:warning mr-2 />但是...
  </div>
  <div text-center>
    candle 使用 CUDA 时需要 nvcc 编译器，Metal 需要 macOS 环境
  </div>
</div>

---
class: py-10
---

# 实际项目演示

<span>用 candle 构建的基于 Silero VAD + Whisper 的实时转录系统</span>

<!--
讲解要点：
- 展示你的实际项目代码
- 说明项目的功能和架构
- 演示 candle 在实际项目中的应用
-->

<img src="/candle-examples-demo-1.svg" />

<div v-click="4" mt-6 class="bg-neutral-900/50 border border-neutral-500/30 rounded-lg p-4">
  <div text-center text-sm>
    <span text-cyan-300 font-bold>项目地址：</span>
    <code>https://github.com/proj-airi/candle-examples/apps/silero-vad-whisper-realtime</code>
  </div>
</div>

---
class: py-10
---

# 更现代的选择：burn.dev

<span>ML / DL + Inference 框架</span>

<div mt-6 />

<div grid grid-cols-2 gap-8>
  <div v-click="2" class="space-y-4">
    <div class="rounded-lg p-4 bg-red-900/20">
      <div font-bold text-red-300 mb-3 flex items-center>
        <div i-carbon:chip mr-2 />核心优势
      </div>
      <div text-sm space-y-2>
        <div>• 预编译跨平台 Shader</div>
        <div>• 自动算子优化</div>
        <div>• 多后端支持</div>
        <div>• 类型安全的张量</div>
      </div>
    </div>
    <div class="rounded-lg p-4 bg-orange-900/20">
      <div font-bold text-orange-300 mb-3 flex items-center>
        <div i-carbon:layers mr-2 />后端生态
      </div>
      <div text-sm space-y-2>
        <div>• <span text-orange-200>candle Backend</span></div>
        <div>• <span text-orange-200>wgpu Backend</span></div>
        <div>• <span text-orange-200>Metal Backend</span></div>
        <div>• <span text-orange-200>CUDA Backend</span></div>
      </div>
    </div>
  </div>

  <div v-click="3" class="rounded-lg p-4 bg-lime-900/20">
    <div font-bold text-lime-300 mb-4 flex items-center>
      <div i-carbon:globe mr-2 />跨平台能力
    </div>
    <div text-sm space-y-3>
      <div class="bg-lime-800/30 rounded p-3">
        <div font-bold mb-1>预编译优势</div>
        <div text-xs>无需运行时编译器依赖</div>
      </div>
      <div class="bg-lime-800/30 rounded p-3">
        <div font-bold mb-1>自动 Fallback</div>
        <div text-xs>智能选择最佳计算后端</div>
      </div>
      <div class="bg-lime-800/30 rounded p-3">
        <div font-bold mb-1>PyTorch / SafeTensors / ONNX 支持</div>
        <div text-xs>直接加载模型权重</div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
---

# burn.dev 代码示例

<span>更简洁的模型定义和使用</span>

<!--
讲解要点：
- 展示 burn.dev 的代码使用方式
- 说明其设计理念和 API 风格
- 对比与其他框架的区别
-->

<div mt-6 />

````md magic-move
```rust
// burn.dev 的模型定义
use burn::{
    module::Module,
    tensor::{backend::Backend, Tensor},
};

#[derive(Module, Debug)]
pub struct Model<B: Backend> {
    linear1: Linear<B>,
    linear2: Linear<B>,
}
```

```rust
impl<B: Backend> Model<B> {
    pub fn new(device: &B::Device) -> Self {
        Self {
            linear1: LinearConfig::new(784, 512).init(device),
            linear2: LinearConfig::new(512, 10).init(device),
        }
    }

    pub fn forward(&self, input: Tensor<B, 2>) -> Tensor<B, 2> {
        let x = self.linear1.forward(input);
        let x = activation::relu(x);
        self.linear2.forward(x)
    }
}
```

```rust
// 多后端支持 - 可以选择不同的计算后端
use burn::backend::{Autodiff, Wgpu};
use burn_candle::CandleBackend;

// 使用 WGPU 后端（WebGPU）
type Backend = Wgpu<f32, i32>;

// 或者使用 Candle 后端
// type Backend = Autodiff<CandleBackend>;

fn main() {
    let device = Default::default();
    let model: Model<Backend> = Model::new(&device);

    // 模型推理
    let input = Tensor::random([1, 784], Distribution::Normal(0.0, 1.0), &device);
    let output = model.forward(input);
}
```

```rust
// 直接加载 SafeTensors 格式模型
use burn::record::{FullPrecisionSettings, Recorder};

// 加载预训练权重
let model = Model::new(&device);
let recorder = burn::record::SafetensorsRecorder::<FullPrecisionSettings>::new();

// 从文件加载
let model = model.load_file("model.safetensors", &recorder, &device)?;

// 现在可以直接使用模型进行推理
let output = model.forward(input);
```
````

---
class: py-10
---

# 想要更轻量？`ort`！

<span>ONNX Runtime</span>

<div mt-6 />

<div v-click="1" class="mb-6">
  <div text-xl font-bold mb-4 text-lime-300 flex items-center>
    <div i-carbon:ibm-watson-machine-learning mr-3 />ort：ONNX Runtime 的 Rust 绑定
  </div>
</div>

<div grid grid-cols-2 gap-8>
  <div v-click="2" class="space-y-4">
    <div class="rounded-lg p-4 bg-lime-900/20">
      <div font-bold text-lime-300 mb-3 flex items-center>
        <div i-carbon:layers mr-2 />Executor 架构
      </div>
      <div text-sm space-y-2>
        <div>• 统一的推理接口</div>
        <div>• 多种 Execution Provider</div>
        <div>• 自动后端选择</div>
        <div>• 运行时优化</div>
      </div>
    </div>
    <div class="rounded-lg p-4 bg-orange-900/20">
      <div font-bold text-orange-300 mb-3 flex items-center>
        <div i-carbon:auto mr-2 />Auto Fallback
      </div>
      <div text-sm space-y-2>
        <div>• GPU → CPU 自动降级</div>
        <div>• 算子级别的回退</div>
        <div>• 性能自适应</div>
        <div>• 错误恢复机制</div>
      </div>
    </div>
  </div>

  <div v-click="3" class="rounded-lg p-4 bg-red-900/20">
    <div font-bold text-red-300 mb-4 flex items-center>
      <div i-carbon:globe mr-2 />支持的 Execution Providers
    </div>
    <div text-sm space-y-2>
      <div class="grid grid-cols-1 gap-2">
        <div class="bg-red-800/30 rounded px-3 py-2">
          <div font-bold>CUDA EP</div>
          <div text-xs text-red-200>NVIDIA GPU 加速</div>
        </div>
        <div class="bg-red-800/30 rounded px-3 py-2">
          <div font-bold>CoreML EP</div>
          <div text-xs text-red-200>Apple NPU 引擎</div>
        </div>
        <div class="bg-red-800/30 rounded px-3 py-2">
          <div font-bold>DirectML EP</div>
          <div text-xs text-red-200>Windows DirectX</div>
        </div>
        <div class="bg-red-800/30 rounded px-3 py-2">
          <div font-bold>CPU EP</div>
          <div text-xs text-red-200>跨平台 CPU 后备</div>
        </div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
glowSeed: 293
---

# Python vs Rust：相同的 ONNX Runtime

<span>同样的底层引擎，相似的 API 设计</span>

<!--
讲解要点：
- 展示两种语言中使用 ONNX Runtime 的相似性
- 说明 API 设计理念的一致性
- 强调底层是同一个推理引擎
-->

<div mt-6 />

<div grid grid-cols-2 gap-6>
  <div v-click="1" class="bg-lime-900/20 rounded-lg p-4">
    <div font-bold text-lime-300 mb-3 flex items-center>
      <div i-logos:python mr-2 />Python 实现
    </div>

````python
# 加载 ONNX 模型
import onnxruntime as ort

providers = ["CoreMLExecutionProvider"]
encoder_session = ort.InferenceSession(
    encoder_path,
    providers=providers
)

# 执行推理
encoder_inputs = {"input_features": input_features}
encoder_outputs = encoder_session.run(None, encoder_inputs)
encoder_hidden_states = encoder_outputs[0]
````
  </div>

  <div v-click="2" class="bg-orange-900/20 rounded-lg p-4">
    <div font-bold text-orange-300 mb-3 flex items-center>
      <div i-simple-icons:rust mr-2 />Rust 实现
    </div>

````rust
// 加载 ONNX 模型
use ort::{Session, execution_providers::*};

let session = Session::builder()?
    .with_execution_providers([
        CoreMLExecutionProvider::default().build()
    ])?
    .commit_from_file(encoder_path)?;

// 执行推理
let inputs = vec![("input_features", Value::from_array(input)?)];
let encoder_outputs = session.run(inputs)?;
let encoder_hidden_states = encoder_outputs.get("last_hidden_state");
````
  </div>
</div>

<div v-click="3" mt-6 class="bg-orange-900/20 rounded-lg p-4">
  <div text-center text-sm>
    <span text-orange-300 font-bold>关键相似性：</span>
    相同的 Session 概念、ExecutionProvider 选择、输入输出处理方式
  </div>
</div>

---
class: py-10
---

# ONNX 模型的计算图结构

<span>理解 ONNX Runtime 的工作原理</span>

<!--
讲解要点：
- 解释 ONNX 的计算图表示方式
- 说明标准化算子的优势
- 为理解跨平台能力打基础
- 这里可以插入 Netron 显示 ONNX 模型的截图
-->

<div mt-6 />

<div grid grid-cols-2 gap-8>
  <div v-click="2" class="space-y-4">
    <div class="rounded-lg p-4 bg-lime-900/20">
      <div font-bold text-lime-300 mb-3 flex items-center>
        <div i-carbon:grid mr-2 />标准化算子
      </div>
      <div text-sm space-y-2>
        <div>• 统一的算子定义</div>
        <div>• 跨框架兼容性</div>
        <div>• 版本化的规范</div>
        <div>• 优化友好的表示</div>
      </div>
    </div>
    <div class="rounded-lg p-4 bg-red-900/20">
      <div font-bold text-red-300 mb-3 flex items-center>
        <div i-carbon:chart-network mr-2 />图优化
      </div>
      <div text-sm space-y-2>
        <div>• 常量折叠</div>
        <div>• 算子融合</div>
        <div>• 内存优化</div>
        <div>• 并行化分析</div>
      </div>
    </div>
  </div>

  <div v-click="3" class="rounded-lg p-4 bg-yellow-900/20">
    <div font-bold text-yellow-300 mb-4 flex items-center>
      <div i-carbon:view mr-2 />Netron 中的 ONNX 视图
    </div>
    <div text-sm space-y-3>
      <div>与 SafeTensors 的区别：</div>
      <div class="space-y-2">
        <div class="bg-yellow-800/30 rounded p-2">
          <div text-xs font-bold>计算图可视化</div>
          <div text-xs text-yellow-200>显示数据流和操作</div>
        </div>
        <div class="bg-yellow-800/30 rounded p-2">
          <div text-xs font-bold>算子参数详情</div>
          <div text-xs text-yellow-200>可查看每个操作的配置</div>
        </div>
        <div class="bg-yellow-800/30 rounded p-2">
          <div text-xs font-bold>性能分析信息</div>
          <div text-xs text-yellow-200>优化前后的对比</div>
        </div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
---

# Rust + AI 生态

<span>实际应用中的 Rust</span>

<!--
讲解要点：
- 展示具体的开源项目和实际应用
- 说明 Rust 在 AI 基础设施中的重要作用
- 这些不是玩具项目，而是生产级的实现
-->

<div grid grid-cols-2 gap-8>
  <div v-click="2" class="space-y-4">
    <div class="bg-blue-900/20 rounded-lg p-4">
      <div font-bold text-blue-300 mb-2 flex items-center>
        <div i-simple-icons:openai mr-2 />OpenAI harmony
      </div>
      <div text-sm text-blue-200 mb-2>新的对话格式实现</div>
      <div class="text-xs bg-blue-800/30 rounded p-2 font-mono">
        替代 ChatML 的 gpt-oss 模型格式
      </div>
    </div>
    <div class="bg-orange-900/20 rounded-lg p-4">
      <div font-bold text-orange-300 mb-2 flex items-center>
        <div i-logos:hugging-face-icon mr-2 />HuggingFace tokenizers
      </div>
      <div text-sm text-orange-200 mb-2>分词器核心库</div>
      <div class="text-xs bg-orange-800/30 rounded p-2 font-mono">
        Rust 实现 + Python 绑定
      </div>
    </div>
    <div class="bg-purple-900/20 rounded-lg p-4">
      <div font-bold text-purple-300 mb-2 flex items-center>
        <div i-simple-icons:nvidia mr-2 />NVIDIA Dynamo
      </div>
      <div text-sm text-purple-200 mb-2>图优化编译器</div>
      <div class="text-xs bg-purple-800/30 rounded p-2 font-mono">
        PyTorch 2.0 编译后端
      </div>
    </div>
  </div>

  <div v-click="3" class="space-y-4">
    <div class="bg-green-900/20 rounded-lg p-4">
      <div font-bold text-green-300 mb-2 flex items-center>
        <div i-carbon:data-base mr-2 />Qdrant 向量数据库
      </div>
      <div text-sm text-green-200 mb-2>向量相似度搜索</div>
      <div class="text-xs bg-green-800/30 rounded p-2 font-mono">
        高性能向量存储和检索
      </div>
    </div>
    <div class="bg-teal-900/20 rounded-lg p-4">
      <div font-bold text-teal-300 mb-2 flex items-center>
        <div i-carbon:matrix mr-2 />rust-ndarray
      </div>
      <div text-sm text-teal-200 mb-2>N 维数组处理</div>
      <div class="text-xs bg-teal-800/30 rounded p-2 font-mono">
        NumPy 风格的数组操作
      </div>
    </div>
    <div class="bg-cyan-900/20 rounded-lg p-4">
      <div font-bold text-cyan-300 mb-2 flex items-center>
        <div i-carbon:visual-recognition mr-2 />rust-cv
      </div>
      <div text-sm text-cyan-200 mb-2>计算机视觉库</div>
      <div class="text-xs bg-cyan-800/30 rounded p-2 font-mono">
        图像处理和特征提取
      </div>
    </div>
  </div>
</div>

---
class: py-10
---

# Rust 在 AI 领域的趋势

<span>Rust 正在成为 AI 基础设施的重要选择</span>

<div mt-6 />

<div grid grid-cols-2 gap-8>
  <div v-click="2" class="space-y-4">
    <div class="rounded-lg p-4 bg-blue-900/20">
      <div font-bold text-blue-300 mb-3 flex items-center>
        <div i-simple-icons:openai mr-2 />OpenAI
      </div>
      <div text-sm space-y-2>
        <div>• gpt-oss 模型的 harmony 格式</div>
        <div>• 用 Rust 实现新的对话格式</div>
        <div>• 替代传统的 ChatML</div>
      </div>
    </div>
    <div class="rounded-lg p-4 bg-orange-900/20">
      <div font-bold text-orange-300 mb-3 flex items-center>
        <div i-logos:hugging-face-icon mr-2 />HuggingFace
      </div>
      <div text-sm space-y-2>
        <div>• tokenizers 库完全用 Rust 重写</div>
        <div>• 提供 Python 绑定</div>
        <div>• 服务端基础设施优化</div>
      </div>
    </div>
  </div>

  <div v-click="3" class="space-y-4">
    <div class="rounded-lg p-4 bg-purple-900/20">
      <div font-bold text-purple-300 mb-3 flex items-center>
        <div i-carbon:cloud-download mr-2 />模型下载服务
      </div>
      <div text-sm space-y-2>
        <div>• hf-hub 用 Rust 重写部分逻辑</div>
        <div>• 高并发模型下载</div>
        <div>• 多 peer 共享机制</div>
      </div>
    </div>
    <div class="rounded-lg p-4 bg-green-900/20">
      <div font-bold text-green-300 mb-3 flex items-center>
        <div i-carbon:chip mr-2 />性能关键路径
      </div>
      <div text-sm space-y-2>
        <div>• 推理服务的热点优化</div>
        <div>• 数据预处理加速</div>
        <div>• 网络 I/O 性能提升</div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
---

# 开源项目和资源

<span>一起构建 Rust AI 生态</span>

<div flex>
  <div
    v-click="1" flex flex-col items-start transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  >
    <div mt-10 flex gap-16>
      <img src="/slide_qr.png" w-60 />
      <div space-y-4>
        <div text-xl flex items-center gap-2 mt-4>
          <div i-ri:github-fill />
          <span underline decoration-dashed font-mono decoration-zinc-300>proj-airi/candle-examples</span>
        </div>
        <div text-sm text-neutral-400 space-y-2>
          <div>• Rust AI 推理示例项目</div>
          <div>• 多种框架使用演示</div>
          <div>• 跨平台部署方案</div>
          <div>• 持续更新和完善</div>
        </div>
      </div>
    </div>
  </div>
</div>

---
title: Thank you
class: py-10
glowSeed: 230
poweredBy: true
---

<div flex>
  <div flex-1 font-mono mt="40">

    use nekw::{Slidev::shout_out};

    #[tokio::main]
    pub async fn main() {
      shout_out!("谢谢！")
      shout_out!("Thank you!")
    }

  </div>
  <div text-sm text="zinc-300" text-right flex flex-col gap-3 mt-3>
    <div text-nowrap>
      演示文稿使用 <a href="https://sli.dev"><div inline-block mr-1 translate-y-0.8 i-logos:slidev />sli.dev</a> 构建
    </div>
    <div text-nowrap>
      演示文稿开源在 <a href="https://github.com/nekomeowww/talks"><div inline-block mr-1 translate-y-0.8 i-ri:github-fill />github.com/nekomeowww/talks</a>
    </div>
    <div text-nowrap>
      candle-examples: <a href="https://github.com/proj-airi/candle-examples"><div inline-block mr-1 translate-y-0.8 i-ri:github-fill />proj-airi/candle-examples</a>
    </div>
    <div self-end mt-16 translate-x-6>
      <img src="/slide_qr.png" w-50 />
    </div>
  </div>
</div>
