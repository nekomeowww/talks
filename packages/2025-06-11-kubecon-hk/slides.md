---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: Taming Dependency Chaos for LLM in K8S
exportFilename: KubeCon HK 2025.06 - Taming Dependency Chaos for LLM in K8S
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 229
routerMode: hash
---

<div translate-x--14>

<h1>
  Taming Dependency Chaos for LLM in K8S
</h1>

DaoCloud Fanshi Zhang, Kebe Liu, Peter Pan

</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.svg" h-20 translate-y-4>
  </div>
</div>

---
layout: intro
class: px-24
glowSeed: 205
---

<div flex items-center justify-center>
  <div
    v-click flex flex-col gap-2 items-center justify-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  >
    <div flex items-center gap-6>
      <img src="/DaoCloud.svg" h-40 />
    </div>
  </div>
  <div
    v-after pl-15 pr-15 transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'scale-80' : 'scale-100'"
  >
    <div i-carbon:close text-8xl />
  </div>
  <div
    v-after flex flex-col gap-2 items-center justify-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x-20 opacity-0' : 'translate-x-0 opacity-100'"
  >
    <div flex items-center gap-6>
      <div i-devicon:kubernetes inline-block text-6xl /> <span text-4xl text="[#5791f7]">Kubernetes</span>
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
    <img src="/person/peter.png" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl >Peter Pan</span>
    <div items-center>
      <div>
        <span class="opacity-70">Software Engineering VP</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>panpan0000</span>
      </div>
    </div>
  </div>
  <div flex-1 />
  <div
    v-click="2" flex flex-col items-center transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
  >
    <img src="/person/kebe.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Kebe Liu</span>
    <div items-center>
      <div>
        <span class="opacity-70">Senior software engineer</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>kebe7jun</span>
      </div>
    </div>
  </div>
  <div flex-1 />
  <div
    v-click="3" flex flex-col items-center transition duration-500 ease-in-out
    :class="$clicks < 3 ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
  >
    <img src="/person/neko.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Fanshi Zhang</span>
    <div flex-col items-center>
      <div>
        <span class="opacity-70">Senior software engineer</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>nekomeowww</span>
      </div>
    </div>
  </div>
</div>

---
class: py-10
glowSeed: 100
---

# Challenges Across LLM Lifecycle

<span>From environment setup to production deployment</span>

<div mt-6 />

<div grid grid-cols-3 gap-3 h-75>

<v-clicks>

<div border="2 solid white/5" rounded-lg overflow-hidden bg="white/5" backdrop-blur-sm h-full>
  <div flex items-center bg="white/10" backdrop-blur px-3 py-2 rounded-md>
    <div i-carbon:warning-alt text-amber-300 text-sm mr-2 />
    <div font-semibold>
      Dependency Hell
    </div>
  </div>
  <div px-4 py-3>
    <div flex flex-col gap-3>
      <div>
        <div text-sm font-medium>Dependency install overhead</div>
        <div text-xs opacity-70>Python/NodeJS install fails frequently with long waiting</div>
      </div>
      <div>
        <div text-sm font-medium>CUDA version drift</div>
        <div text-xs opacity-70>Incompatible versions across environments</div>
      </div>
      <div>
        <div text-sm font-medium>Dependency Lifecycle consistency</div>
        <div text-xs opacity-70>From development to training to inference</div>
      </div>
      <div>
        <div text-sm font-medium>Tool fragmentation</div>
        <div text-xs opacity-70>pip / uv / conda / nix / pixi</div>
      </div>
    </div>
  </div>
</div>

<div border="2 solid white/5" rounded-lg overflow-hidden bg="white/5" backdrop-blur-sm h-full>
  <div flex items-center bg="white/10" backdrop-blur px-3 py-2 rounded-md>
    <div i-carbon:download text-blue-300 text-sm mr-2 />
    <div font-semibold>
      Data Preparation
    </div>
  </div>
  <div px-4 py-3>
    <div flex flex-col gap-3>
      <div>
        <div text-sm font-medium>Unattended dataset/model preparation</div>
        <div text-xs opacity-70>Time-consuming & error-prone processes</div>
      </div>
      <div>
        <div text-sm font-medium>Disparate sources</div>
        <div text-xs opacity-70>HuggingFace / S3 / NFS / Web</div>
      </div>
    </div>
  </div>
</div>

<div border="2 solid white/5" rounded-lg overflow-hidden bg="white/5" backdrop-blur-sm h-full>
  <div flex items-center bg="white/10" backdrop-blur px-3 py-2 rounded-md>
    <div i-carbon:data-check text-green-300 text-sm mr-2 />
    <div font-semibold>
      Data Governance
    </div>
  </div>
  <div px-4 py-3>
    <div flex flex-col gap-3>
      <div>
        <div text-sm font-medium>Sharing artifacts</div>
        <div text-xs opacity-70>Across teams and Kubernetes namespaces</div>
      </div>
      <div>
        <div text-sm font-medium>Version control & Reproducibility</div>
        <div text-xs opacity-70>Tracking model & environment versions</div>
      </div>
    </div>
  </div>
</div>

</v-clicks>

</div>

<div v-click mt-6 flex justify-center>
  <div
    border="2 solid white/5" bg="white/5" backdrop-blur-sm
    rounded-lg px-6 py-3 flex items-center gap-3
  >
    <div i-carbon:idea text-yellow-300 text-2xl />
    <span text-lg>LLM projects face unique infrastructure challenges beyond traditional ML</span>
  </div>
</div>

<!--
Usually , We have facing challenges , across AI dev to production lifecycles.

[click] The Python | NodeJS dev installation not only takes time, & version may shift from diff env &  become inconsistent.
And finally,  fall into a dependency hell .

[click] Also challenges from  data preparation, download things takes time and error-prone, also deal with diff kinds of data sources.
[click] And data governance requirements: we need share things across team and namespaces, and dealing with version control.
-->

---
layout: center
class: text-center
---

# "It Works On My Machine"™

The ML Engineer's Lament

<div class="mt-8 text-xl opacity-80">
  How many times have you seen this?
</div>

<div class="mt-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-1 py-0 text-left">

```bash
$ python train.py
ImportError: libcudart.so.11.0: cannot open shared object file

$ pip install torch --index-url https://download.pytorch.org/whl/cu118
RuntimeError: CUDA error: no kernel image is available for execution

$ ldd $(which python3) | grep 'not found'
        libstdc++.so.6 => not found
```

</div>

<!--
Typically ,  dark moment for :   was working  , but not here"

Look at those |       I believe they  [停顿几秒]

【重复】Sounds familiar. 10年前， Docker was born to address that
你会问 : Why NOT 用docker 管理 all those DEP?
You know,, system Lib -> CUDA->Python -> PyTorch -> Transformers , and so many other libs.
计算 Permutation and combination , 镜像总数  Astronomical huge number
-->

---
class: py-10
glowSeed: 175
---

# Development vs Training: The Environment Gap

<span>Bridging the divide between model development and production training</span>

<div mt-6 grid grid-cols-2 gap-6>
  <div
    v-click
    border="2 solid red-800" bg="red-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="red-800/40" px-4 py-2 flex items-center>
      <div i-carbon:warning-alt text-red-300 text-xl mr-2 />
      <span font-bold>The Common Pattern</span>
    </div>
    <div px-4 py-3 flex flex-col gap-2>
      <div flex items-center gap-2 py-1>
        <div i-carbon:development text-amber-300 text-xl />
        <div>
          <div font-bold>Development</div>
          <div text-sm opacity-80>Preparing new model training datasets</div>
        </div>
      </div>
      <div flex items-center gap-2 py-1>
        <div i-carbon:machine-learning-model text-amber-300 text-xl />
        <div>
          <div font-bold>Training</div>
          <div text-sm opacity-80>Fine-tuning load with transformers lib</div>
        </div>
      </div>
      <div flex items-center gap-2 py-1>
        <div i-carbon:area-custom text-amber-300 text-xl />
        <div>
          <div font-bold>Inference</div>
          <div text-sm opacity-80>Inference from vLLM with transformers </div>
        </div>
      </div>
      <div mt-2 bg="red-900/30" rounded-lg p-3 text-sm>
        <div font-mono text-xs text-zinc-300 bg="black/30" p-2 rounded>
          <div>pip install -r requirements.txt</div>
          <div>python train.py</div>
        </div>
        <div mt-2 grid grid-cols-2 gap-2>
          <div flex items-center gap-1 text-xs>
            <div i-carbon:close text-red-400 />
            <span>Dependency drift</span>
          </div>
          <div flex items-center gap-1 text-xs>
            <div i-carbon:close text-red-400 />
            <span>Repeated downloads</span>
          </div>
          <div flex items-center gap-1 text-xs>
            <div i-carbon:close text-red-400 />
            <span>No lockfile tracking</span>
          </div>
          <div flex items-center gap-1 text-xs>
            <div i-carbon:close text-red-400 />
            <span>Inconsistent versions</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-click
    border="2 solid green-800" bg="green-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="green-800/40" px-4 py-2 flex items-center>
      <div i-carbon:cloud-service-management text-green-300 text-xl mr-2 />
      <span font-bold>The Dataset Solution</span>
    </div>
    <div px-4 py-3 flex flex-col gap-2 h-full>
      <div bg="green-900/30" rounded-lg p-3 flex flex-col gap-2>
        <div font-bold text-sm>Single Environment, Multiple Contexts</div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span text-sm>Define once, use everywhere</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span text-sm>Tracked dependencies with lockfiles</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span text-sm>Automatic dependency resolution</span>
        </div>
      </div>
      <div bg="green-900/30" rounded-lg p-3 mt-1 h-44>
        <div font-bold text-sm mb-2>Automatic Tool Integration</div>
        <div grid grid-cols-2 gap-2 h-24>
          <div flex items-center justify-center gap-2 bg="black/20" rounded p-2>
            <div i-logos:jupyter text-xl min-w-7 />
            <div text-xs>
              <div font-bold>Jupyter</div>
            </div>
          </div>
          <div flex items-center justify-center gap-2 bg="black/20" rounded p-2>
            <div i-logos:visual-studio-code text-xl min-w-7 />
            <div text-xs>
              <div font-bold>VSCode</div>
            </div>
          </div>
        </div>
        <div text-xs text-center mt-2 text-green-300>No configuration needed - just click and use!</div>
      </div>
    </div>
  </div>
</div>

<!--
After你勤奋工作,  you've tidy the python libs in 开发环境,
[click] But when shift   开发 -> 训练 , then 推理 stage
当切换环境， 不仅 wasting | reinstall  ,
the worst nightmare is dep relationship breaks, from here to there.

[click] So , we DO need a solution : define once ,  consistent from end to end, and reusable, unattended , and well integrated with Jupyter ,vscode.

Ok, Neko, Can you  shed some light  for us?
-->

---
clicks: 3
---

# When Python Meets C++

Dependency Hell Emerges

<div class="mt-8 flex flex-col justify-center items-center">
  <div v-click class="flex items-center gap-6">
    <div class="flex items-center justify-center">
      <div class="text-[96px] i-logos:python" />
    </div>
    <div class="flex items-center justify-center">
      <div class="text-[96px] i-logos:c-plusplus" />
    </div>
  </div>
  <div
    :class="[ $clicks < 2 ? 'scale-50 opacity-0' : 'scale-100 opacity-100' ]"
    class="text-center"
    transition="all duration-500 ease-in-out"
  >
    <div class="text-8xl i-carbon:warning-alt mt-5 ml-5 text-red" />
  </div>
</div>

<div v-click class="mt-10 text-center">
  <h3>The Perfect Storm: When Python Code Meets C++ Underpinnings</h3>
  <p class="mt-4 text-xl opacity-70">ML libraries are just thin Python wrappers around massive C++ and CUDA codebases</p>
</div>

---
class: py-10
glowSeed: 123
---

# The Silent Saboteurs

<span>Hidden issues that break ML pipelines</span>

<div mt-4 />

<div flex items-center gap-4>

<v-clicks>
  <div
    :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid yellow-800" bg="yellow-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:cics-program text-yellow-300 h-20 w-20 />
    </div>
    <div bg="yellow-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>ABI Incompatibility</span>
    </div>
  </div>
  <div
    :class="$clicks < 2 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid lime-800" bg="lime-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-bi:gpu-card text-lime-300 h-20 w-20 />
    </div>
    <div bg="lime-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>CUDA Version Conflicts</span>
    </div>
  </div>
  <div
    :class="$clicks < 3 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid emerald-800" bg="emerald-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:terminal text-emerald-300 h-20 w-20 />
    </div>
    <div bg="emerald-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>System Library Conflicts</span>
    </div>
  </div>
  <div
    :class="$clicks < 4 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid sky-800" bg="sky-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:row-delete text-sky-300 h-20 w-20 />
    </div>
    <div bg="sky-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Package Inconsistencies</span>
    </div>
  </div>
</v-clicks>

</div>

<div v-click flex flex-col mt-4 bg="red-800/20" border="2 solid red-800/50" rounded-lg>
  <div bg="red-800/30" px-4 py-2 text-red-200 flex items-center>
    <div i-carbon:warning-alt mr-2 /> Real World Impact
  </div>
  <div flex justify-between px-6 py-4 text-sm>
    <div flex items-center gap-2>
      <div i-carbon:time text-red-300 text-xl />
      <span>Hours wasted reinstalling CUDA</span>
    </div>
    <div flex items-center gap-2>
      <div i-carbon:chart-evaluation text-red-300 text-xl />
      <span>Inconsistent model results</span>
    </div>
    <div flex items-center gap-2>
      <div i-carbon:cloud-service-management text-red-300 text-xl />
      <span>Broken production deployments</span>
    </div>
  </div>
</div>

---
class: py-10
clicks: 4
glowSeed: 180
---

# The Hidden Iceberg: What pip Can't See

<span>The deceptive simplicity of Python dependencies</span>

<div mt-8 />

<div flex>
  <div
    v-click="1"
    w="1/2 pr-6"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-x--20' : 'opacity-100 translate-x-0'"
  >
    <div relative h-90 w-90>
      <!-- Iceberg water effect -->
      <div
        absolute bottom-0 w-full bg="blue-500/20" h-60 rounded-t-full
        class="animate-name-pulse animate-iteration-count-[infinite] animate-direction-normal animate-duration-8000 animate-ease-in-out"
      ></div>
      <!-- Visible part -->
      <div
        absolute top-0 w-90
        transition duration-500 ease-in-out
        :class="$clicks === 2 ? 'scale-110 z-10' : ''"
      >
        <div border="2 solid sky-800" bg="sky-800/20" backdrop-blur rounded-lg p-3>
          <div flex items-center mb-4>
            <div i-carbon:cloud-ceiling text-sky-300 text-xl mr-2 />
            <span font-bold>Seems installing</span>
          </div>
          <div
            font-mono text-sm px-4 py-3 bg="black/30" rounded-lg
          >
            torch==2.1.0
            transformers==4.36.0
            accelerate==0.25.0
          </div>
        </div>
      </div>
      <!-- Hidden part -->
      <div
        v-click="2"
        absolute bottom-0 w-90
        transition duration-500 ease-in-out
        :class="$clicks < 2 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
      >
        <div border="2 solid blue-800" bg="blue-800/20" backdrop-blur rounded-lg p-3>
          <div flex items-center mb-4>
            <div i-carbon:ibm-cloud-secrets-manager text-blue-300 text-xl mr-2 />
            <span font-bold>But actually...</span>
          </div>
          <div
            font-mono text-xs px-3 py-3 bg="black/30" rounded-lg
            max-h-40 overflow-y-auto
          >
            <div text-blue-300>CUDA 11.8</div>
            <div>gcc 9.4.0</div>
            <div>cmake 3.22.1</div>
            <div>libnccl2</div>
            <div>libcudnn8</div>
            <div>cuda-cupti-dev</div>
            <div>libstdc++.so.6</div>
            <div>libopenblas.so</div>
            <div>libpython3.10.so</div>
            <div>libcublas.so</div>
            <div text-zinc-500>...and dozens more</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div w="1/2">
    <div
      v-click="3"
      border="2 solid violet-800" bg="violet-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 3 ? 'opacity-0 translate-x-20' : 'opacity-100 translate-x-0'"
    >
      <div bg="violet-800/40" px-3 py-2 flex items-center>
        <div i-logos:python text-xl mr-2 />
        <span text-sm font-bold>Python Package Managers</span>
      </div>
      <div px-3 py-3 flex flex-col gap-1 text-sm>
        <div flex items-center gap-2 text-nowrap>
          <div i-carbon:checkmark-outline text-green-400 min-w-5 />
          <span>Handle Python dependencies well</span>
        </div>
        <div flex items-center gap-2 text-nowrap>
          <div i-carbon:close text-red-400 min-w-5 />
          <span>Blind to underlying C++ libraries</span>
        </div>
        <div flex items-center gap-2 text-nowrap>
          <div i-carbon:close text-red-400 min-w-5 />
          <span>Cannot handle compiler compatibility</span>
        </div>
      </div>
    </div>
    <div
      v-click="4"
      mt-4 border="2 solid yellow-800" bg="yellow-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 4 ? 'opacity-0 translate-x-20' : 'opacity-100 translate-x-0'"
    >
      <div bg="yellow-800/40" px-3 py-2 flex items-center text-sm>
        <div i-carbon:warning-alt text-yellow-300 text-xl mr-2 />
        <span font-bold>The Reality</span>
      </div>
      <div px-4 py-3>
        <div text-xs opacity-80>
          Modern ML libraries are just thin Python wrappers around massive C++ and CUDA codebases
        </div>
        <div flex items-center gap-2 mb-2 mt-8>
            <div i-carbon:chart-relationship text-yellow-300 />
            <span font-bold>Dependency Complexity</span>
          </div>
          <div flex justify-between text-xs>
            <div>PyTorch source:</div>
            <div text-yellow-300>1.8M+ lines of C++</div>
          </div>
          <div flex justify-between text-xs>
            <div>Python wrapper:</div>
            <div text-yellow-300>~100K lines of Python</div>
          </div>
          <div flex justify-between text-xs>
            <div>Binary size:</div>
            <div text-yellow-300>1.7GB+ with CUDA</div>
          </div>
      </div>
    </div>
  </div>
</div>

---
layout: center
---

# CUDA Conundrum: The Version Wars

<div class="grid grid-cols-3 gap-2 mt-6">
  <div v-click class="flex flex-col items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <div class="text-4xl mb-4">🎯</div>
    <h3>Version 11.6</h3>
    <p class="text-sm opacity-70">Legacy Model</p>
    <p class="text-xs mt-2 text-red-300">Required by older frameworks</p>
  </div>
  <div v-click class="flex flex-col items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <div class="text-4xl mb-4">🎯</div>
    <h3>Version 11.8</h3>
    <p class="text-sm opacity-70">PyTorch's Choice</p>
    <p class="text-xs mt-2 text-green-300">Optimized for current models</p>
  </div>
  <div v-click class="flex flex-col items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <div class="text-4xl mb-4">🎯</div>
    <h3>Version 12.1</h3>
    <p class="text-sm opacity-70">System Default</p>
    <p class="text-xs mt-2 text-yellow-300">Newest features, compatibility issues</p>
  </div>
</div>

<div v-click class="mt-2 grid grid-cols-2 gap-2">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
    <h3 class="mb-2">CUDA Complexity</h3>
    <ul class="space-y-1 text-sm">
      <li>• Driver vs Runtime version mismatch</li>
      <li>• cuDNN compatibility matrix</li>
      <li>• NCCL version requirements</li>
    </ul>
  </div>

  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
    <h3 class="mb-2">The Silent Killer</h3>
    <p class="text-sm text-red-400">Often fails with cryptic errors or worse - <span class="font-bold">silent numerical errors</span> in your models</p>
  </div>
</div>

---
class: py-10
clicks: 6
glow: right
---

# Compiler Chaos: When gcc Versions Wage War

<span>The battlefield of binary compatibility</span>

<div mt-6 />

<div flex>
  <div flex-1 pr-0>
    <div
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
      border="2 solid purple-800" bg="purple-800/20"
      rounded-lg p-4
    >
      <div flex items-center>
        <div i-devicon:gcc text-3xl mr-2 />
        <span font-bold>GCC Version Matrix</span>
      </div>
      <div mt-4 flex justify-around>
        <div
          v-for="(version, idx) in ['2.7.0', '13.1']"
          :key="version"
          :class="[
            'relative px-4 py-3 rounded-lg border-2 transition-all duration-500',
            $clicks >= idx+1 ? 'border-sky-500 scale-110' : 'border-zinc-700 opacity-50'
          ]"
        >
          <span font-mono text-lg>{{version}}</span>
          <div
            v-if="$clicks >= idx+1"
            class="absolute -top-2 -right-2 rounded-full bg-sky-500 px-2 py-0.5 text-xs"
          >
            {{['PyTorch', 'gcc'][idx]}}
          </div>
        </div>
      </div>
    </div>
    <div
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
      mt-4 border="2 solid red-800" bg="red-800/20"
      rounded-lg p-4
    >
      <div flex items-center>
        <div i-carbon:warning-alt text-red-300 text-xl mr-2 />
        <span font-bold>Binary Incompatibility</span>
      </div>
      <div
        mt-3 flex flex-col gap-2
        :class="{ 'animate-pulse': $clicks >= 4 }"
      >
        <div
          bg="red-900/50"
          rounded px-3 py-2 font-mono text-sm
          :class="{ 'text-red-300': $clicks >= 4 }"
        >
          ImportError: /lib64/libstdc++.so.6: version 'GLIBCXX_3.4.29' not found
        </div>
        <div
          bg="red-900/50"
          rounded px-3 py-2 font-mono text-sm
          :class="{ 'text-red-300': $clicks >= 5 }"
        >
          undefined symbol: _ZN3c10...
        </div>
      </div>
    </div>
  </div>

  <div flex-1 pl-4>
    <div
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
      border="2 solid blue-800" bg="blue-800/20"
      rounded-lg p-4 h-full
    >
      <div flex items-center>
        <div i-carbon:code text-blue-300 text-xl mr-2 />
        <span font-bold>C++ ABI Changes</span>
      </div>
      <div mt-4 flex flex-col gap-2>
        <div
          v-click="6"
          flex flex-col border="2 solid blue-900/50" rounded-lg overflow-hidden h-50
        >
          <div bg="blue-800/50" py-1 px-3 text-sm>String Implementation</div>
          <div font-mono text-xs p-2>
            <div class="text-blue-300">// GCC 4.x</div>
            struct string {
              char* _M_p;
              size_t _M_string_length;
            };
            <div class="text-green-300">// GCC 5.x+</div>
            struct string {
              union { ... } _M_dataplus;
              ... _M_string_length;
            };
          </div>
        </div>
        <div flex justify-center items-center text-lg text-red-300 font-bold>
          <div i-carbon:arrow-down animate-bounce text-2xl />
          <span ml-2>Memory Layout Mismatch</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="6"
  flex justify-center mt-4 bg="indigo-800/30"
  rounded-lg py-3 items-center
>
  <div i-carbon:face-dizzy text-2xl mr-2 />
  <span text-xl>The Developer Experience: "It works differently everywhere!"</span>
</div>

---
class: py-10
clicks: 7
glowSeed: 350
---

# Why Reusable Environments Matter

<span>From hours of frustration to seconds of mounting</span>

<div mt-6 />

<div grid grid-cols-2 gap-6>
  <div
    v-click="1"
    border="2 solid red-800" bg="red-800/20"
    rounded-lg overflow-hidden
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  >
    <div bg="red-800/40" px-4 py-2 flex items-center>
      <div i-carbon:warning-alt text-red-300 text-xl mr-2 />
      <span font-bold>Traditional Workflow</span>
    </div>
    <div px-5 py-4 flex flex-col gap-2>
      <div
        v-for="(item, idx) in [
          'Different setups across team',
          'Hours reinstalling CUDA',
          'Notebook vs. production mismatch',
          'Works locally, fails in prod'
        ]"
        :key="item"
        v-click="2 + idx"
        flex items-center gap-2
        :class="$clicks < (2 + idx) ? 'opacity-0 translate-x--10' : 'opacity-100 translate-x-0'"
        transition duration-300 ease-in-out
      >
        <div i-carbon:close-filled text-red-400 />
        <span>{{item}}</span>
      </div>
    </div>
  </div>

  <div
    v-click="6"
    border="2 solid lime-800" bg="lime-800/20"
    rounded-lg overflow-hidden
    transition duration-500 ease-in-out
    :class="$clicks < 6 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  >
    <div bg="lime-800/40" px-4 py-2 flex items-center>
      <div i-carbon:ai-status-in-progress text-lime-300 text-xl mr-2 />
      <span font-bold>Reusable Environments</span>
    </div>
    <div px-5 py-4 flex flex-col gap-2>
      <div
        v-for="item in [
          'One environment definition, everywhere',
          'Install once, mount instantly',
          'Identical experience for all team members',
          'Seamless dev-to-prod workflow'
        ]"carbon:help-filled
        :key="item"
        flex items-center gap-2
      >
        <div i-carbon:help-filled text-lime-400 />
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</div>

<div v-click="7" mt-6>
  <div flex items-center justify-center>
    <div
      transition duration-500 ease-in-out
      relative flex bg="neutral-800/50" border="2 solid neutral-600" rounded-xl p-2 gap-2 max-w-180
    >
      <div w-80 bg="red-900/30" rounded-lg p-3 relative>
        <div absolute top--3 left-3 bg="red-700" text-xs px-2 py-0.5 rounded-full>Without Reusable Environments</div>
        <div flex items-center gap-2 text-xl>
          <div i-carbon:time text-red-300 />
          <span font-bold>4-6 Hours</span>
        </div>
        <div text-sm mt-2 opacity-70>
          Per developer, per environment setup
        </div>
        <div flex flex-col gap-1 mt-4>
          <div flex items-center text-xs gap-1>
            <div i-carbon:close-filled text-red-400 text-sm />
            <span>Manual CUDA installation</span>
          </div>
          <div flex items-center text-xs gap-1>
            <div i-carbon:close-filled text-red-400 text-sm />
            <span>System library conflicts</span>
          </div>
          <div flex items-center text-xs gap-1>
            <div i-carbon:close-filled text-red-400 text-sm />
            <span>Disk space duplication</span>
          </div>
        </div>
      </div>
      <div w-80 bg="white/5" rounded-lg p-3 relative>
        <div absolute top--3 left-3 bg="white/50" text-xs px-2 py-0.5 rounded-full>With Reusable Environments</div>
        <div flex items-center gap-2 text-xl>
          <div i-carbon:time text-white  />
          <span font-bold>30 Seconds</span>
        </div>
        <div text-sm mt-2 opacity-70>
          Just mount the shared environment
        </div>
        <div flex flex-col gap-1 mt-4>
          <div flex items-center text-xs gap-1>
            <div i-carbon:help-filled text-white text-sm />
            <span>Pre-built environments</span>
          </div>
          <div flex items-center text-xs gap-1>
            <div i-carbon:help-filled text-white text-sm />
            <span>Consistent across team</span>
          </div>
          <div flex items-center text-xs gap-1>
            <div i-carbon:help-filled text-white text-sm />
            <span>Efficient storage usage</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
clicks: 5
glow: left
---

# The Usual Suspects: Tools We've Tried

<span>What works, what doesn't, and why</span>

<div mt-4 />

<div flex justify-center>
  <div
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    grid grid-cols-3 gap-4 w-full text-sm
  >
    <div
      v-click="1"
      border="2 solid yellow-800" bg="yellow-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="yellow-800/40" px-4 py-3 flex items-center>
        <div i-logos:python text-3xl mr-3 />
        <span font-bold>pip & uv</span>
      </div>
      <div px-4 py-3 flex flex-col gap-2>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Fast for Python packages</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Blind to C++/CUDA deps</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>No system library management</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Version conflicts common</span>
        </div>
      </div>
    </div>
    <div
      v-click="2"
      border="2 solid cyan-800" bg="cyan-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="cyan-800/40" px-4 py-3 flex items-center>
        <div i-devicon:docker text-3xl mr-3 />
        <span font-bold>Docker</span>
      </div>
      <div px-4 py-3 flex flex-col gap-2>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Reproducible environments</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Massive image sizes (5-10GB)</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Slow build times (30+ min)</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Resource intensive</span>
        </div>
      </div>
    </div>
    <div
      v-click="3"
      border="2 solid blue-800" bg="blue-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="blue-800/40" px-4 py-3 flex items-center>
        <div i-devicon:nixos text-3xl mr-3 />
        <span font-bold>Nix</span>
      </div>
      <div px-4 py-3 flex flex-col gap-2>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Complete reproducibility</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>PhD-level learning curve</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Complex configuration</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>K8s integration challenges</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="4"
  mt-4 transition-all duration-500
  :class="$clicks < 4 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'"
>
  <div flex items-center justify-center>
    <div relative>
      <div
        border="2 solid green-800" bg="green-800/20"
        rounded-lg p-4 w-full
      >
        <div text-center font-bold text-xl mb-3>What We Need</div>
        <div grid grid-cols-3 gap-2>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>Python package management</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>C++/CUDA awareness</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>Storage efficiency</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>Fast setup times</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>K8s native</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>Team consistency</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---
glowSeed: 12129
---

# Introducing Datasets

Python + C++ Harmony in K8S

<div class="mt-6 flex justify-center">
  <div class="relative w-120 h-60">
    <div v-click class="absolute inset-0 flex items-center justify-center">
      <div class="text-[150px] i-logos:kubernetes" />
    </div>
    <div v-click class="absolute top-17 left--4">
      <div class="text-7xl i-logos:python" />
    </div>
    <div v-click class="absolute top-18 right--16">
      <div class="text-4xl i-logos:conda" />
    </div>
    <div v-click class="absolute bottom--4 left-8">
      <div class="text-[100px] i-devicon:docker" />
    </div>
    <div v-click class="absolute bottom-4 right--8">
      <div class="text-4xl i-logos:nvidia" />
    </div>
  </div>
</div>

<div v-click class="mt-8 text-center">
  <h3>One solution to rule them all</h3>
  <p class="opacity-70">Python + C++ + CUDA harmony in Kubernetes</p>
</div>

---

# Dataset CRD

One CRD to Rule Them All

<div class="flex relative">

<div class="mt-2 w-75%">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-1 pr-1">

```yaml
apiVersion: dataset.baizeai.io/v1alpha1
kind: Dataset
metadata:
  name: pytorch-env
spec:
  source:
    type: CONDA
    uri: conda://python?version=3.11.9
    options:
      packageManager: CONDA
      pythonVersion: 3.11.9
      condaEnvironmentYml: |-
        channels: ['nvidia', 'conda-forge']
        dependencies: [
          - 'cuda'
          - 'cuda-libraries-dev'
          - 'cuda-nvcc'
          - 'cuda-nvtx'
          - 'cuda-cupti'
      pipRequirementsTxt: |-
        transformers==4.35.0
        torch
        torchaudio
        torchvision
```

  </div>
</div>

<div v-click class="absolute right-0 top-25">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
    <div text-xl text-neutral-300>Key Features</div>
    <ul class="mt-4">
      <li>• Multi-source support (<code>conda</code>, <code>huggingface</code>)</li>
      <li>• Self-contained enterprise model hub</li>
      <li>• Pre-loaded datasets and models</li>
      <li>• Install once, use everywhere</li>
      <li>• Secure credential management</li>
    </ul>
  </div>
</div>

</div>

---
class: py-10
glowSeed: 125
---

# Datasets vs Docker: Flexibility Matters

<span>Why writable persistent environments win for data science</span>

<div mt-6 />

<div flex gap-2>
  <div v-click flex-1>
    <div
      border="2 solid cyan-800" bg="cyan-800/20"
      rounded-lg overflow-hidden
    >
      <div bg="cyan-800/40" px-4 py-2 flex items-center>
        <div i-devicon:docker text-xl mr-2 />
        <span font-bold>Docker Approach</span>
      </div>
      <div px-4 py-3>
        <div font-mono text-xs bg="black/30" rounded-lg p-2>
          <div># Need to add a dependency? Rebuild the entire image</div>
          <div class="text-cyan-400">FROM nvidia/cuda:11.8.0-base-ubuntu22.04</div>
          <div>RUN apt-get update && apt-get install -y python3-pip</div>
          <div>COPY requirements.txt .</div>
          <div>RUN pip install -r requirements.txt</div>
          <div>COPY . .</div>
          <div class="text-red-400"># Immutable after build - can't easily modify</div>
        </div>
        <div mt-3 bg="red-900/30" rounded-lg p-3 flex flex-col gap-2>
          <div flex items-center gap-2>
            <div i-carbon:time text-red-300 />
            <span text-sm>30+ minutes to rebuild for one new package</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:locked text-red-300 />
            <span text-sm>Read-only runtime limits dynamic ML tools</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:airport-location text-red-300 />
            <span text-sm>One container = one environment</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-click flex-1 pl-4>
    <div
      border="2 solid green-800" bg="green-800/20"
      rounded-lg overflow-hidden
    >
      <div bg="green-800/40" px-4 py-2 flex items-center>
        <div i-carbon:data-volume text-green-300 text-xl mr-2 />
        <span font-bold>Dataset CRD Approach</span>
      </div>
      <div px-4 py-3>
        <div font-mono text-xs bg="black/30" rounded-lg p-2>
          <div class="text-green-400"># Mount pre-built environments as needed</div>
          <div>volumes:</div>
          <div>- name: pytorch-env</div>
          <div>  persistentVolumeClaim:</div>
          <div>    claimName: pytorch-2.1-env</div>
          <div class="text-green-400"># Need another env? Just mount another PVC</div>
          <div>- name: pytorch-nightly-env</div>
          <div>  persistentVolumeClaim:</div>
          <div>    claimName: pytorch-nightly-env</div>
        </div>
        <div mt-3 bg="green-900/30" rounded-lg p-3 flex flex-col gap-2>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-sm>Add packages on-the-fly in seconds</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-sm>Writeable PVCs support all ML workflows</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-sm>Switch multiple environments simultaneously</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
glowSeed: 182
clicks: 4
---

# How does it work?

<span>Looking under the hood</span>

<div mt-8 />

<div flex>
  <div
    v-click="1"
    border="2 solid blue-800" bg="blue-800/20"
    rounded-lg overflow-hidden
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
  >
    <div bg="blue-800/40" px-4 py-2 flex items-center>
      <div i-carbon:kubernetes text-blue-300 text-xl mr-2 />
      <span font-bold>Controller Architecture</span>
    </div>
    <div px-5 py-3>
      <div
        v-for="(step, idx) in [
          'Parse Dataset CRD & validate spec',
          'Check source type & credentials',
          'Create/update PVC(Any CSI)',
          'Download/sync data from source to PV',
          'Configure mount options',
          'Update dataset status'
        ]"
        :key="step"
        flex items-center gap-2 py-1
        :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
        :style="{ transitionDelay: `${200 + idx * 100}ms`, transitionProperty: 'all', transitionDuration: '500ms' }"
      >
        <div i-carbon:dot-mark text-blue-300 />
        <span>{{step}}</span>
      </div>
    </div>
  </div>
</div>

<!--
Okay, let's take a look at how the CRD works once it is created.

[click] First, we parse and validate your spec - making sure everything's properly defined. Then we check what type of source and handle any credentials securely.

[click] Here's where it gets interesting - we create a PVC, We are almost compatible with all CSIs.

[click] Then we deploy a job - it will setting up your conda environment, installing all those libraries. Once it's done, your dataset is ready to be mounted by any pod.

[click] The beauty is - this happens once. After that, everyone just mounts the ready-to-use environment. No more waiting!
-->

---
class: py-4
glowSeed: 310
---

<div mt-6 />

<div class="mt-2 w-75%">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-1 pr-1">

```yaml
apiVersion: dataset.baizeai.io/v1alpha1
kind: Dataset
metadata:
  name: pytorch-env
spec:
  source:
    type: CONDA
    uri: conda://python?version=3.11.9
    options:
      packageManager: CONDA
      pythonVersion: 3.11.9
      condaEnvironmentYml: |-
        channels: ['nvidia', 'conda-forge']
        dependencies: [
          - 'cuda'
          - 'cuda-libraries-dev'
          - 'cuda-nvcc'
          - 'cuda-nvtx'
          - 'cuda-cupti'
      pipRequirementsTxt: |-
        transformers==4.35.0
        torch
        torchaudio
        torchvision
```

  </div>
</div>

<div v-click class="absolute right-18 top-25">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2">
    <div text-lg>Python Environment Management</div>
    <span class="text–neutral-500 text-xs">From dependency chaos to environment harmony</span>
    <div>
      <div px-0 py-2 flex flex-col gap-2>
        <div grid grid-cols-2 gap-2>
          <div
            flex flex-col gap-2 rounded-lg bg="neutral-900/30"
            p-3 border="1 solid neutral-700"
          >
            <div flex items-center gap-2>
              <div i-logos:conda text-xl />
              <span font-bold></span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Full environment control</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>CUDA integration</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>C++ binary packages</span>
            </div>
          </div>
          <div
            flex flex-col gap-2 rounded-lg bg="neutral-900/30"
            p-3 border="1 solid neutral-700"
          >
            <div flex items-center gap-2>
              <div i-logos:python text-xl />
              <span font-bold>pip</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Familiar requirements.txt</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>PyPI packages</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Private indexes</span>
            </div>
          </div>
        </div>
        <div grid grid-cols-2 gap-2>
          <div
            flex flex-col gap-2 rounded-lg bg="neutral-900/30"
            p-3 border="1 solid neutral-700"
          >
            <div flex items-center gap-2>
              <img src="/pixi.png" w-6 />
              <span font-bold>Pixi</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Fast parallel installs</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Rust-powered speed</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Lockfile support</span>
            </div>
          </div>
          <div
            flex flex-col gap-2 rounded-lg bg="neutral-900/30"
            p-3 border="1 solid neutral-700"
          >
            <div flex items-center gap-2>
              <span font-bold>Mamba</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>10x faster than conda</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Parallel downloads</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Conda-compatible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
Here's the Dataset spec, it's very simple and easy to unstandard, the env config stored in options, like conda's environment.yaml and pip's requirements.txt. This is a very typical declarative approach to environment definition.
but now I want to highlight something really important - we support multiple package managers!

[click] Besides conda, we can also integrate well with pixi and pip only. Or if you prefer, use Mamba which is 10x faster than traditional conda.

The key is flexibility - use whatever works best for your workflow. We handle all the complexity behind the scenes, making sure everything plays nicely together.
-->

---
class: py-10
glowSeed: 150
---

# Intelligent Dependency Approach

<div flex justify-between items-center>
  <span w="1/2">Optimizing the unbearable heaviness of builds</span>
  <div i-carbon:cache text-7xl />
</div>

<div mt-6 grid grid-cols-3 gap-4>
  <div
    v-click
    border="2 solid indigo-800" bg="indigo-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="indigo-800/40" px-4 py-2 flex items-center justify-center>
      <div i-carbon:archive text-indigo-300 text-xl mr-2 />
      <span font-bold>1: Fetching</span>
    </div>
    <div px-3 py-3 flex flex-col gap-1>
      <div text-sm opacity-80>Source packages & archives</div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>Mirror for Conda & pip</span>
      </div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>Auto merge config & requirements.txt</span>
      </div>
    </div>
  </div>

  <div
    v-click
    border="2 solid purple-800" bg="purple-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="purple-800/40" px-4 py-2 flex items-center justify-center>
      <div i-carbon:assembly-cluster text-purple-300 text-xl mr-2 />
      <span font-bold>2: Install & Build</span>
    </div>
    <div px-3 py-3 flex flex-col gap-1>
      <div text-sm opacity-80>Compiled binaries & wheels</div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>Existing cache used</span>
      </div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>No duplicated installation</span>
      </div>
    </div>
  </div>

  <div
    v-click
    border="2 solid pink-800" bg="pink-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="pink-800/40" px-4 py-2 flex items-center justify-center>
      <div i-carbon:data-class text-pink-300 text-xl mr-2 />
      <span font-bold>3: Persist & Activate</span>
    </div>
    <div px-3 py-3 flex flex-col gap-1>
      <div text-sm opacity-80>Environment configs</div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>Auto discovery for Notebooks</span>
      </div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>Auto activate</span>
      </div>
    </div>
  </div>
</div>

<div v-click mt-4 grid grid-cols-2 gap-4>
  <div bg="red-800/20" rounded-lg overflow-hidden>
    <div bg="red-800/40" px-4 py-2 flex items-center>
      <div i-carbon:time text-red-300 text-xl mr-2 />
      <span font-bold>Traditional Approach</span>
    </div>
    <div px-4 py-3 flex flex-col gap-1>
      <div flex items-center justify-between>
        <div>CUDA setup:</div>
        <div text-red-400 font-bold>45-60 min</div>
      </div>
      <div flex items-center justify-between>
        <div>PyTorch install:</div>
        <div text-red-400 font-bold>20-30 min</div>
      </div>
    </div>
  </div>

  <div bg="green-800/20" rounded-lg overflow-hidden>
    <div bg="green-800/40" px-4 py-2 flex items-center>
      <div i-carbon:time text-green-300 text-xl mr-2 />
      <span font-bold>With Datasets</span>
    </div>
    <div px-4 py-3 flex flex-col gap-1>
      <div flex items-center justify-between>
        <div>First setup:</div>
        <div text-green-400 font-bold>10-15 min</div>
      </div>
      <div flex items-center justify-between>
        <div>Subsequent use:</div>
        <div text-green-400 font-bold flex items-center>
          <span>seconds</span>
          <div i-carbon:flash animate-pulse ml-1 />
        </div>
      </div>
    </div>
  </div>
</div>

<!--
Now let's talk about our intelligent dependency approach. Building these environments can be heavy - I mean, compiling PyTorch with CUDA? That's not trivial!

We use a three-layer caching approach.
[click] First, we downloads all those source packages, with SHA verification and mirror fallback for reliability.

[click] Second, we build and compiled binaries and wheels. This is huge because compilation is where most time is spent. We deduplicate at the file level, so if two environments share libraries, we only store them once.

[click] Third, we can auto create metadata - environment configs, dependency resolution results. This allows you to use the environment we created in Dataset directly when you open your Notebook, without having to execute specified commands to activate it. It was a wonderful experience!

[click] Look at the time difference! Traditional CUDA setup takes 45-60 minutes. PyTorch another 20-30. With our solution? First setup is 10-15 minutes, and after that? Seconds! Just seconds to spin up a complete ML environment. That's the power of intelligent dependency approach!
-->

---
class: py-4
glowSeed: 275
---

<div mt-6 />

<div class="mt-2 w-75%">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-1 pr-1">

```yaml
apiVersion: dataset.baizeai.io/v1alpha1
kind: Dataset
metadata:
  name: qwen3-32b
spec:
  dataSyncRound: 1
  secretRef: dataset-hf-qwen3-32b-secret
  source:
    options:
      endpoint: https://hf-mirror.com
      repoType: MODEL
    type: HUGGING_FACE
    uri: huggingface://Qwen/Qwen3-32B
  volumeClaimTemplate:
    metadata: {}
    spec:
      accessModes:
        - ReadWriteMany
      resources:
        requests:
          storage: '0'
      storageClassName: juicefs-no-share-sc
    status: {}
```

</div>
</div>

<div v-click class="absolute right-18 top-25">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2">
    <div text-lg>HuggingFace & ModelScope</div>
    <span class="text–neutral-500 text-xs">Models, datasets, all in one</span>
    <div
      mt-4
      border="2 solid cyan-800" bg="cyan-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
    >
      <div bg="cyan-800/40" px-2 py-2 flex items-center>
        <div i-carbon:filter text-cyan-300 text-xl mr-2 />
        <span font-bold text-sm>Smart Filtering</span>
      </div>
      <div p-2 flex items-center gap-6>
        <div flex flex-col gap-2 flex-1>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-xs text-nowrap>Include/exclude patterns</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-xs text-nowrap>Skip redundant files</span>
          </div>
        </div>
        <div flex-1 font-mono text-xs bg="black/30" rounded-lg px-3 py-2 text="[10px]">
          <div>options:</div>
          <!-- <div>  <span text-green-300>include: "*.safetensors"</span></div> -->
          <div>  <span text-green-300>&nbsp;&nbsp;exclude: "*.bin"</span></div>
        </div>
      </div>
    </div>
    <div
      mt-4
      border="2 solid indigo-800" bg="indigo-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
    >
      <div bg="indigo-800/40" px-2 py-2 flex items-center>
        <div i-carbon:delivery text-indigo-300 text-xl mr-2 />
        <span font-bold text-sm>Advanced Features</span>
      </div>
      <div p-2 flex flex-col gap-2>
        <div grid grid-cols-2 gap-4>
          <div flex flex-col gap-2 bg="indigo-900/30" rounded-lg p-3>
            <div font-bold text-sm>Mirroring Support</div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Configurable endpoints</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Regional mirrors</span>
            </div>
            <div text-xs font-mono bg="black/30" rounded px-2 py-1 mt-1 border="1 solid indigo-700">
              <div>endpoint: https://hf-mirror.com</div>
            </div>
          </div>
          <div flex flex-col gap-2 bg="indigo-900/30" rounded-lg p-3>
            <div font-bold text-sm>Token Authentication</div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Secure token management</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Private repo access</span>
            </div>
            <div text-xs font-mono bg="black/30" rounded px-2 py-1 mt-1 border="1 solid indigo-700">
              <div>secretRef: hf-token-secret</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
But Datasets isn't just about Python environments - it's also about models and data! Here's an example of loading a model from HuggingFace.

[click] Look at this - we're pulling the Qwen 32B model directly from HuggingFace. But here's where it gets smart - see those filtering options? You can exclude the files you need.

And check out those advanced features - need to use a regional mirror because HuggingFace is slow in your region? Just change the endpoint. Got private models? We handle token authentication securely through Kubernetes secrets.

This means you can have your models ready and waiting, right alongside your environments. No more downloading gigabytes every time you start an inference or job!
-->

---
class: py-10
glowSeed: 215
---

# How many?

<span>Flexible multi-source data integration</span>

<div mt-8 />

<div flex flex-col items-center>
  <div
    grid grid-cols-3 gap-6
    w-full max-w-200
  >
    <!-- Card 1: ML Model Repositories -->
    <div
      v-click="1"
      border="2 solid sky-800" bg="sky-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 1? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
    >
      <div bg="sky-800/40" px-4 py-2 flex items-center justify-center text-sm>
        <span font-bold>ML Model Repositories</span>
      </div>
      <div px-4 py-4 flex flex-col gap-3>
        <div flex items-center gap-3>
          <div i-logos:hugging-face-icon text-3xl w-10 />
          <div>
            <div font-semibold>HuggingFace</div>
            <div text-xs text-zinc-400>Models, datasets, spaces</div>
          </div>
        </div>
        <div flex items-center gap-3>
          <img src="/modelscope-color.svg" w-10 />
          <div>
            <div font-semibold>ModelScope</div>
            <div text-xs text-zinc-400>Alibaba AI models</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Card 2: Environment & Package Sources -->
    <div
      v-click="2"
      border="2 solid purple-800" bg="purple-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 2 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
    >
      <div bg="purple-800/40" px-4 py-2 flex items-center justify-center text-sm>
        <span font-bold>Environment & Packages</span>
      </div>
      <div px-4 py-4 flex flex-col gap-3>
        <div flex items-center gap-3>
          <div i-logos:conda w-10 />
          <div>
            <div font-semibold text-base>Conda</div>
            <div text-xs text-zinc-400>Environment management</div>
          </div>
        </div>
        <div flex items-center gap-3>
          <img src="/pixi.png" w-10 />
          <div>
            <div font-semibold text-base>Pixi</div>
            <div text-xs text-zinc-400>Environment management</div>
          </div>
        </div>
        <div flex items-center gap-3>
          <div i-logos:python w-10 />
          <div>
            <div font-semibold text-base>PyPI / pip</div>
            <div text-xs text-zinc-400>Python packages</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Card 3: Storage & Version Control -->
    <div
      v-click="3"
      border="2 solid indigo-800" bg="indigo-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 3 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
    >
      <div bg="indigo-800/40" px-4 py-2 flex items-center justify-center text-sm>
        <span font-bold>Storage & Version Control</span>
      </div>
      <div px-4 py-4 flex flex-col gap-3>
        <div flex items-center gap-3>
          <div i-simple-icons:github text-3xl text="white" w-10 />
          <div>
            <div font-semibold text-base>Git Repositories</div>
            <div text-xs text-zinc-400>Code and configurations</div>
          </div>
        </div>
        <div flex items-center gap-3>
          <div i-logos:aws-s3 text-3xl w-10 />
          <div>
            <div font-semibold text-base>S3-compatible</div>
            <div text-xs text-zinc-400>Cloud storage</div>
          </div>
        </div>
        <div flex items-center gap-3>
          <div i-carbon:data-volume text-3xl text-blue-300 w-10 />
          <div>
            <div font-semibold text-base>Local Volumes</div>
            <div text-xs text-zinc-400>On-prem storage</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-click="4"
    mt-6 flex justify-center
    transition duration-500 ease-in-out
    :class="$clicks < 4 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  >
    <div
      bg="sky-900/30"
      rounded-lg py-3 px-6 text-center flex items-center gap-3
    >
      <div i-carbon:connection text-green-300 text-2xl />
      <div>
        <div text-xl font-bold>Unified Data Access Layer</div>
        <div text-sm mt-1>One consistent API to access all your AI assets</div>
      </div>
    </div>
  </div>
</div>

<!--
So how many sources do we support? Well, let me show you!

[click] First, we've got all the ML model repositories - HuggingFace, ModelScope for our friends in China. Whatever your team is using, we've got you covered.

[click] Then there's environment and package sources - Conda, Pixi, PyPI. Mix and match as needed.

[click] And for storage - Git repos for your code, S3-compatible storage for your data, local volumes for on-prem deployments.

[click] But here's the real beauty - it's all through one unified API. You don't need to learn different tools for different sources. Just define your Dataset, and we handle the rest. It's like having a universal translator for all your AI assets!
-->

---
class: py-10
glowSeed: 185
---

# The Real Problem: Collaboration at Scale

<span>When every team becomes an island</span>

<div mt-6 />

<div flex items-center justify-center gap-8>
  <div
    v-click="1"
    flex flex-col items-center
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  >
    <div
      border="2 solid red-800" bg="red-800/20"
      rounded-lg p-6 w-100
    >
      <div flex items-center mb-4>
        <div i-carbon:warning-alt text-red-300 text-2xl mr-2 />
        <span font-bold text-xl>The Isolation Problem</span>
      </div>
      <div grid grid-cols-2 gap-4>
        <!-- Team 1 -->
        <div bg="red-900/30" rounded-lg p-3>
          <div flex items-center gap-2 mb-2>
            <div i-carbon:group text-amber-300 />
            <span font-semibold>Team A</span>
          </div>
          <div text-sm space-y-1>
            <div flex items-center gap-1>
              <div i-carbon:document text-xs />
              <span text-xs>llama-3-70b-instruct</span>
            </div>
            <div flex items-center gap-1>
              <div i-carbon:cube text-xs />
              <span text-xs>PyTorch 2.1 + CUDA 11.8</span>
            </div>
            <div text-xs text-red-300 mt-2>Storage: 160GB</div>
          </div>
        </div>
        <!-- Team 2 -->
        <div bg="red-900/30" rounded-lg p-3>
          <div flex items-center gap-2 mb-2>
            <div i-carbon:group text-blue-300 />
            <span font-semibold>Team B</span>
          </div>
          <div text-sm space-y-1>
            <div flex items-center gap-1>
              <div i-carbon:document text-xs />
              <span text-xs>llama-3-70b-instruct</span>
            </div>
            <div flex items-center gap-1>
              <div i-carbon:cube text-xs />
              <span text-xs>PyTorch 2.1 + CUDA 11.8</span>
            </div>
            <div text-xs text-red-300 mt-2>Storage: 160GB</div>
          </div>
        </div>
      </div>
      <div mt-3 text-center>
        <span text-xl text-red-400 font-bold>Same model, same env</span>
        <div text-sm text-red-300>Downloaded twice, stored twice!</div>
      </div>
    </div>
  </div>

  <div
    v-click="2"
    flex items-center
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
  >
    <div i-carbon:arrow-right text-4xl text-green-400 animate-pulse />
  </div>

  <div
    v-click="3"
    flex flex-col items-center
    transition duration-500 ease-in-out
    :class="$clicks < 3 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  >
    <div
      border="2 solid green-800" bg="green-800/20"
      rounded-lg p-6 w-100
    >
      <div flex items-center mb-4>
        <div i-carbon:share-knowledge text-green-300 text-2xl mr-2 />
        <span font-bold text-xl>The Sharing Solution</span>
      </div>
      <div bg="green-900/30" rounded-lg p-3 mb-3>
        <div flex items-center gap-2 mb-2>
          <div i-carbon:data-share text-green-300 />
          <span font-semibold>Shared Dataset</span>
        </div>
        <div text-sm space-y-1>
          <div flex items-center gap-1>
            <div i-carbon:document text-xs />
            <span text-xs>llama-3-70b-instruct</span>
          </div>
          <div flex items-center gap-1>
            <div i-carbon:cube text-xs />
            <span text-xs>PyTorch 2.1 + CUDA 11.8</span>
          </div>
          <div text-xs text-green-300 mt-2>Storage: 160GB (once!)</div>
        </div>
      </div>
      <div grid grid-cols-2 gap-2>
        <div flex items-center gap-1 text-sm>
          <div i-carbon:link text-green-400 />
          <span>Team A → uses reference</span>
        </div>
        <div flex items-center gap-1 text-sm>
          <div i-carbon:link text-green-400 />
          <span>Team B → uses reference</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="3"
  mt-6 flex justify-center
  transition duration-500 ease-in-out
  :class="$clicks < 3 ? 'opacity-0' : 'opacity-100'"
>
  <div bg="blue-900/30" border="2 solid blue-800" rounded-lg px-5 py-3>
    <div flex items-center gap-3>
      <div i-carbon:analytics text-blue-300 text-2xl />
      <div>
        <div text-lg font-bold>Enterprise Impact</div>
        <div text-sm>10 teams × 160GB model = <span text-red-400 line-through>1.6TB</span> → <span text-green-400>160GB</span></div>
      </div>
    </div>
  </div>
</div>

<!--
Now, let me show you why sharing is so important. This is a real scenario we see all the time.

[click] Team A downloads Llama 3, sets up their PyTorch environment with CUDA - 160GB of storage. Team B needs the same model, same environment - boom, another 160GB. Same model, same environment, but stored twice!

Now imagine you have 10 teams doing this. That's 1.6 terabytes for the same model! It's insane!

[click] [click]

But with Dataset sharing, we store it once, and everyone just references it. One model, one storage footprint, everyone benefits. This is how we turn chaos into collaboration!
-->

---

# Cross-Namespace Dataset Sharing

<div class="flex relative">

<div class="mt-2 w-75%" v-click>
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-1 pr-1">

```yaml {7-9}
apiVersion: dataset.baizeai.io/v1alpha1
kind: Dataset
metadata:
  name: llama3-foundation-ref
  namespace: nlp-team
spec:
  source:
    type: REFERENCE
    uri: dataset://ml-platform/llama3-70b-foundation
```
```yaml {10-11}
---
apiVersion: v1
kind: Pod
metadata:
  name: fine-tuning-job
spec:
  ...
  volumes:
  - name: model
    persistentVolumeClaim:
      claimName: llama3-foundation-ref  # Auto-created PVC
```
  </div>
</div>

<div v-click class="absolute right-0 top-25">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
    <div text-xl text-neutral-300>How It Works</div>
    <ul class="mt-4 space-y-2 text-sm">
      <li>• Reference points to shared dataset</li>
      <li>• Controller auto-creates local PVC & PV</li>
      <li>• No data duplication</li>
      <li>• Instant access to models</li>
    </ul>
  </div>
</div>

</div>

<!--
Here's how teams actually use shared datasets. It's beautifully simple!

[click] The NLP team just creates a reference - see that REFERENCE type? They're pointing to the dataset in the ml-platform namespace. Our controller automatically creates a PVC for them, backed by the same JuiceFS data. No copying, no downloading, just instant access!

And look how naturally it fits into your existing workflow - you just mount it like any other PVC. Your training pods don't even know they're using a shared dataset. It's completely transparent!

[click] The benefits are huge - zero download time because the data is already there, 90% storage reduction across your org, and you still maintain namespace isolation for security. It's the best of both worlds!
-->

---
class: py-10
clicks: 3
glow: bottom
---

# Enterprise Model Hub in Minutes

<span>From fragmented assets to unified ecosystem</span>

<div mt-6 />

<div flex>
  <div
    v-click="1"
    w="1/2" pr-4
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
  >
    <div
      border="2 solid violet-800" bg="violet-800/20"
      rounded-lg overflow-hidden relative h-70
    >
      <div bg="violet-800/40" px-4 py-2 flex items-center>
        <div i-carbon:machine-learning-model text-violet-300 text-xl mr-2 />
        <span font-bold>Model Management</span>
      </div>
      <div
        absolute left-0 right-0 top-12 bottom-0
        class="bg-[url('/bg-grid.svg')] bg-center"
      >
        <div
          v-for="(item, idx) in [
            { x: 20, y: 25, r: 50, color: 'rgba(139, 92, 246, 0.5)', label: 'DeepSeek-R1' },
            { x: 125, y: 55, r: 40, color: 'rgba(139, 92, 246, 0.5)', label: 'Qwen' },
            { x: 80, y: 120, r: 30, color: 'rgba(139, 92, 246, 0.5)', label: 'FLUX' },
            { x: 210, y: 80, r: 25, color: 'rgba(139, 92, 246, 0.5)', label: 'SD-3' },
            { x: 250, y: 5, r: 50, color: 'rgba(139, 92, 246, 0.5)', label: 'DeepSeek-V3' },
            { x: 340, y: 70, r: 30, color: 'rgba(139, 92, 246, 0.5)', label: 'Gemma' }
          ]"
          :key="idx"
          absolute
          class="rounded-full flex items-center justify-center"
          :style="{
            left: `${item.x}px`,
            top: `${item.y}px`,
            width: `${item.r*2}px`,
            height: `${item.r*2}px`,
            backgroundColor: item.color,
            border: '2px solid rgba(139, 92, 246, 0.8)',
            transitionDelay: `${300 + idx * 200}ms`,
            transitionProperty: 'all',
            transitionDuration: '800ms'
          }"
        >
          <span font-bold text-sm>{{item.label}}</span>
        </div>
        <div absolute right-4 bottom-4 flex flex-col gap-3>
          <div flex items-center gap-2 bg="violet-900/60" px-3 py-1.5 rounded-lg text-sm>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>Version control</span>
          </div>
          <div flex items-center gap-2 bg="violet-900/60" px-3 py-1.5 rounded-lg text-sm>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>Metadata extraction</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-click="2"
    w="1/2" pl-4
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
  >
    <div
      border="2 solid blue-800" bg="blue-800/20"
      rounded-lg overflow-hidden relative h-70
    >
      <div bg="blue-800/40" px-4 py-2 flex items-center>
        <div i-carbon:time text-blue-300 text-xl mr-2 />
        <span font-bold>Ready Before You Are</span>
      </div>
      <div px-3 py-4>
        <div flex justify-between items-center>
          <div text-sm text-zinc-400>Deployment Timeline</div>
          <div text-sm text-zinc-400>Time Savings</div>
        </div>
        <div mt-4 relative h-40>
          <!-- Traditional timeline -->
          <div absolute top-0 left-0 right-0 flex flex-col gap-1>
            <div flex items-center>
              <div w-24 text-xs pr-2 text-right text-red-400>Traditional</div>
              <div h-6 rounded-l bg="red-900/50" w-14 flex items-center justify-center text-xs>30m</div>
              <div h-6 bg="red-800/50" w-40 flex items-center justify-center text-xs>6h</div>
              <div h-6 rounded-r bg="red-700/50" w-14 flex items-center justify-center text-xs>30m</div>
            </div>
            <div flex items-center text="[10px]" text-zinc-400 pl-24>
              <div w-14 text-center text-nowrap>Setup</div>
              <div w-40 text-center text-nowrap>Download Weights</div>
              <div w-14 text-center text-nowrap>Test running</div>
            </div>
          </div>
          <!-- Dataset timeline -->
          <div absolute bottom-0 left-0 right-0 flex flex-col gap-1>
            <div flex items-center>
              <div w-24 text-xs pr-2 text-right text-green-400>With Datasets</div>
              <div h-6 rounded bg="green-900/50" w-4 flex items-center justify-center text-xs>30s</div>
              <div w-10 />
              <div h-6 w-8 flex items-center justify-center text-lg text-green-400 animate-pulse>⚡️</div>
            </div>
            <div flex items-center text="[10px]" text-zinc-400 pl-24>
              <div w-10 text-center>Mount</div>
            </div>
          </div>
          <!-- Time saved indicator -->
          <div absolute right-8 top="1/2" transform translate-y="-1/2" flex flex-col items-center>
            <div text-green-400 text-3xl font-bold>95%</div>
            <div text-sm text-zinc-400>Time Saved</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="3"
  mt-6 flex justify-center
  transition duration-500 ease-in-out
  :class="$clicks < 3 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <div
    flex items-center bg="green-900/30"
    rounded-lg py-3 px-6 gap-4
  >
    <div i-carbon:transform-moving text-green-300 text-3xl />
    <div>
      <div text-xl font-bold>From <span text-red-400>isolated silos</span> to <span text-green-400>unified model ecosystem</span></div>
      <div text-sm text-zinc-300 mt-1>Enabling seamless collaboration across data science teams</div>
    </div>
  </div>
</div>

<!--
So what does all this sharing and caching give us? An enterprise model hub in minutes!

[click] Look at this - you've got all your models organized, version controlled, with metadata automatically extracted. No more "which version of Llama are we using?" conversations.

[click] And the time savings? Incredible! What used to take hours - setting up environments, downloading models, configuring CUDA - now takes 30 seconds. Just mount and go! That's a 95% time reduction!

[click] This transforms how teams work. Instead of isolated silos where every team maintains their own model zoo, you get a unified ecosystem where teams can discover, share, and build on each other's work. This is how you accelerate AI development across your entire organization!
-->

---
class: py-10
clicks: 3
glowSeed: 338
---

# Pixi Integration: The Next Evolution

Supercharging environment creation

<div mt-6 />

<div grid grid-cols-2 gap-6>
  <div
    v-click="1"
    border="2 solid lime-800" bg="lime-800/20"
    rounded-lg overflow-hidden
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
  >
    <div bg="lime-800/40" px-4 py-4 flex items-center>
      <div i-logos:conda text-xl />
    </div>
    <div px-4 py-4 flex flex-col gap-2>
      <div flex items-center gap-2 text-yellow-400>
        <div i-carbon:time />
        <span>Minutes to hours for environment setup</span>
      </div>
      <div flex items-center gap-2 text-yellow-400>
        <div i-carbon:warning />
        <span>Sequential dependency resolution</span>
      </div>
      <div flex items-center gap-2 text-yellow-400>
        <div i-carbon:warning />
        <span>Incompatible ABI issues</span>
      </div>
      <div mt-2 bg="black/30" font-mono text-sm px-3 py-2 rounded>
        <div>$ conda create -n myenv python=3.12</div>
        <div>$ conda install cuda -c nvidia</div>
        <div>$ conda activate myenv</div>
        <div>$ pip install torch</div>
        <div class="text-zinc-500 mt-1"># Waiting... a long time... up to hours</div>
      </div>
      <div
        v-if="$clicks >= 3"
        mt-2 flex items-center justify-between bg="lime-900/20" rounded-lg p-2
      >
        <span text-sm>Average setup time:</span>
        <span text-lime-300 font-bold>60+ minutes</span>
      </div>
    </div>
  </div>

  <div
    v-click="2"
    border="2 solid green-800" bg="green-800/20"
    rounded-lg overflow-hidden
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
  >
    <div bg="green-800/40" px-4 py-3 flex items-center>
      Pixi.sh
    </div>
    <div px-4 py-4 flex flex-col gap-2>
      <div flex items-center gap-2 text-green-400>
        <div i-carbon:rocket />
        <span>Seconds to minutes for complete setup</span>
      </div>
      <div flex items-center gap-2 text-green-400>
        <div i-carbon:checkmark-outline />
        <span>Parallel processing of dependencies</span>
      </div>
      <div flex items-center gap-2 text-green-400>
        <div i-carbon:checkmark-outline />
        <span>Precompiled binaries with correct ABI</span>
      </div>
      <div mt-2 bg="black/30" font-mono text-sm px-3 py-2 rounded>
        <div>$ pixi init</div>
        <div>$ pixi project channel add nvidia</div>
        <div>$ pixi add cuda python=3.12</div>
        <div>$ pixi add --pypi torch</div>
        <div class="text-green-400 mt-1"># Ready in seconds</div>
      </div>
      <div
        v-if="$clicks >= 3"
        mt-2 flex items-center justify-between bg="green-900/20" rounded-lg p-2
      >
        <span text-sm>Average setup time:</span>
        <span text-green-300 font-bold>4-5 minutes</span>
      </div>
    </div>
  </div>
</div>

---
class: py-10
clicks: 2
glowSeed: 338
---

# Pixi Integration: How Fast?

100x difference in environment setup times!

<div mt-4 />

<div
  v-click
  transition duration-500 ease-in-out
  :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <!-- Chart container with proper dimensions -->
  <div relative h-100 w-full>
    <!-- Chart header -->
    <div
      border="2 solid neutral-700" bg="neutral-800/50"
      rounded-t-lg px-3 py-2
    >
      <div flex items-center justify-between>
        <div flex items-center gap-2>
          <div i-carbon:chart-column text-xl text-sky-300 />
          <div font-bold text-xs>Setup Time Comparison</div>
        </div>
        <div text-sm text-zinc-400>Smaller is better</div>
      </div>
    </div>
    <!-- Chart bars -->
    <div
      border-x="2 solid neutral-700" border-b="2 solid neutral-700"
      bg="neutral-900/50" rounded-b-lg px-3 pb-3 h-90 pt-6
    >
      <div flex items-end justify-center gap-20 h-full>
        <!-- Conda bar -->
        <div flex flex-col items-center justify-end h-full>
          <div h="75%" w-30 bg="red-800/40" rounded-t-lg flex items-center justify-center relative>
            <span text-2xl font-bold text-red-300>45+</span>
            <span text-sm text-red-300 absolute top-2 right-2>min</span>
            <div absolute top="-10" w-full flex justify-center>
              <div bg="red-900/60" border="2 solid red-700" rounded-full px-2 py-1 text-xs flex items-center text-nowrap w-fit>
                ~100× slower
              </div>
            </div>
          </div>
          <div py-2 font-semibold>Conda</div>
          <div text-xs text-zinc-400 flex items-center gap-1>
            <div i-carbon:warning-alt text-red-300 />
            <span>Sequential installation</span>
          </div>
        </div>
        <!-- Datasets + Pixi bar -->
        <div flex flex-col items-center>
          <div
            h-10 w-30 bg="green-800/40"
            rounded-t-lg flex items-center justify-center relative
            class="animate-name-pulse animate-iteration-count-[infinite] animate-direction-normal animate-duration-3000 animate-ease-in-out"
          >
            <span text-2xl font-bold text-green-300>~30</span>
            <span text-sm text-green-300 absolute top-2 right-2>sec</span>
            <div absolute top="-10" left="0" w-full flex justify-center>
              <div bg="green-900/60" border="2 solid green-700" rounded-full px-3 py-1 text-xs flex items-center text-nowrap w-fit>
                <div i-carbon:flash text-yellow-300 inline-block />
                Fastest
              </div>
            </div>
          </div>
          <div py-2 font-semibold>Pixi</div>
          <div text-xs text-green-400 flex items-center gap-1>
            <div i-carbon:checkmark-outline />
            <span>Parallel processing</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
glowSeed: 250
---

# Metrics in summary

<span>The measurable benefits of Datasets</span>

<div mt-4 />

<div
  grid grid-cols-3 gap-4
  transition duration-500 ease-in-out h-90
  :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <v-clicks>
  <div
    border="2 solid lime-800" bg="lime-800/20"
    rounded-lg p-5 flex flex-col items-center
    transition-all duration-500 h-full
  >
    <div mb-4 flex-1 flex items-center justify-center>
      <div i-carbon:lightning text-yellow-500 text="[100px]" />
    </div>
    <div font-bold text-xl>Setup time cost</div>
    <div
      text-lime-300 text-2xl font-bold mt-2
      flex items-center gap-1
    >
      <span>5-10x</span>
      <div i-carbon:arrow-up text-green-400 />
    </div>
    <div text-sm opacity-70 mt-1>With shared environments</div>
    <div text-xs mt-3 bg="lime-900/30" rounded-lg px-3 py-1>
      From hours to minutes
    </div>
  </div>

  <div
    border="2 solid cyan-800" bg="cyan-800/20"
    rounded-lg p-5 flex flex-col items-center
    transition-all duration-500 h-full
  >
    <div mb-4 flex-1 flex items-center justify-center>
      <div i-carbon:vmdk-disk text-indigo-500 text="[100px]" />
    </div>
    <div font-bold text-xl>Save storage</div>
    <div
      text-cyan-300 text-2xl font-bold mt-2
      flex items-center gap-1
    >
      <span>90%</span>
      <div i-carbon:arrow-down text-green-400 />
    </div>
    <div text-sm opacity-70 mt-1>Using JuiceFS dedup</div>
    <div text-xs mt-3 bg="cyan-900/30" rounded-lg px-3 py-1>
      10GB → 1GB typical savings
    </div>
  </div>

  <div
    border="2 solid purple-800" bg="purple-800/20"
    rounded-lg p-5 flex flex-col items-center
    transition-all duration-500 h-full
  >
    <div mb-4 flex-1 flex items-center justify-center>
      <div i-carbon:badge text-violet-500 text="[100px]" />
    </div>
    <div font-bold text-xl>Time cost</div>
    <div
      text-purple-300 text-2xl font-bold mt-2
      flex items-center gap-1
    >
      <span>75%</span>
      <div i-carbon:arrow-down text-green-400 />
    </div>
    <div text-sm opacity-70 mt-1>No more environment setup</div>
    <div text-xs mt-3 bg="purple-900/30" rounded-lg px-3 py-1>
      Instant environment activation
    </div>
  </div>
  </v-clicks>
</div>

---
class: py-10
---

# Let's build it together

<span>Open sourced, already</span>

<div flex>
  <div
    v-click="1" flex flex-col items-start transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  >
    <div mt-10 flex gap-16>
      <img src="/datasets-repository-qr.png" w-60 />
      <div text-2xl flex items-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>BaizeAI/dataset</span>
      </div>
    </div>
  </div>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.svg" h-20 translate-y-4>
  </div>
</div>

---
class: py-10
---

<div flex>
  <div flex-1>
    <div mt-50 />
    <div text="[48px]">
      Thank you
    </div>
  </div>
  <div text-sm text="zinc-300" text-right flex flex-col gap-3 mt-3>
    <div>
      Slides open sourced at <a href="https://github.com/BaizeAI/talks"><div inline-block mr-1 translate-y-0.8 i-ri:github-fill />github.com/BaizeAI/talks</a>
    </div>
    <div>
      Slides built on top of <a href="https://sli.dev"><div inline-block mr-1 translate-y-0.8 i-logos:slidev />sli.dev</a>
    </div>
    <div self-end mt-16 translate-x-6>
      <img src="/slide_qr.png" w-50 />
    </div>
  </div>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.svg" h-20 translate-y-4>
  </div>
</div>
