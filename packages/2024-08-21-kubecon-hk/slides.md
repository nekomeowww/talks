---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: Sit Back and Relax with Fault Awareness and Robust Instant Recovery for Large Scale AI Workloads
lineNumbers: false
drawings:
  persist: false
mdc: true
preload: false
clicks: 0
# glowSeed: 26
glowSeed: 228
---

# Sit Back and Relax with Fault Awareness and Robust Instant Recovery for Large Scale AI Workloads

DaoCloud Fanshi Zhang, Kebe Liu

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.png" h-10>
    <img src="/CloudNativeCon.png" h="10.1">
    <img src="/OpenSourceSummit.png" h-9>
    <img src="/AI_dev.png" h-4>
  </div>
</div>

<!--
Hi!

And greetings to everyone attended our session here.

In today's session, me, Fanshi Zhang, with another amazing software engineer Kebe Liu here will be presenting our work on some of the works we have done so far on distributed training of AI and workloads.

But, don't worry if you are not familiar with machine learning or distribution training , we will get you covered when introducing the concepts.
-->

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
    :class="$clicks < 1 ? 'translate-x-20' : 'translate-x-0'"
  >
    <div flex items-center gap-6>
      <div i-devicon:kubernetes inline-block text-6xl /> <span text-4xl text="[#5791f7]">Kubernetes</span>
    </div>
  </div>
</div>

<!--
Before we start, let's introduce ourselves.

[click] We are the software engineers come from DaoCloud. We are primarily focusing on field where we will cohere [click] Kubernetes and AI workloads together.
-->

---
layout: intro
class: px-35
glowSeed: 205
---

<div flex>
  <div
    v-click="1" flex flex-col items-start transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"
  >
    <img src="/person/kebe.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Kebe Liu</span>
    <div>
      <div>
        <span class="opacity-70">Senior software engineer</span>
      </div>
      <div text-sm flex items-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>kebe7jun</span>
      </div>
    </div>
  </div>
  <div flex-1 />
  <div
    v-click="2" flex flex-col items-end transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'translate-x-20' : 'translate-x-0'"
  >
    <img src="/person/neko.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Fanshi Zhang</span>
    <div flex-col items-end>
      <div>
        <span class="opacity-70">Senior software engineer</span>
      </div>
      <div text-sm flex items-center justify-end gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>nekomeowww</span>
      </div>
    </div>
  </div>
</div>

<!--
As background, [click] Kebe Liu is one of the member of Istio Steering Committee, while working on AI stuff, he is also focusing on cloud-native and Istio, eBPF and other areas in recent years.

[click] Me, Fanshi Zhang, I am a software engineer at DaoCloud, focusing on AI and Kubernetes. I am also a contributor to the Kubernetes community.
-->

---
class: flex justify-center items-center gap-20 px40 text-xl
---

# Let's jump right into the rabbit hole

<!--
Without further ado, let's jump right into the rabbit hole and see what we have prepared for you today.

The very first one thing to get off is distributed training...
-->

---
class: py-10
clicks: 2
transition: 'none'
---

# Machine Learning 101

<span>Let's start with the basics</span>

<div
  v-if="$clicks <= 2"
  transition duration-500 ease-in-out
  :class="[
    $clicks <= 1 ? '' : 'scale-0 opacity-0 translate-x--100 translate-y--20'
  ]"
>
  <Vectors />
</div>
<div
  v-if="$clicks >= 1"
  absolute top-0 left-0
  transition duration-500 ease-in-out translate-x-14 translate-y-44
  grid grid-cols-3
>
  <div
    i-carbon:hinton-plot
    text-8xl
    transition duration-500 ease-in-out
    :class="[
      $clicks <= 1 ? 'opacity-0 scale-150' : ''
    ]"
  />
  <div
    i-carbon:hinton-plot
    text-8xl delay-250
    transition duration-500 ease-in-out
    :class="[
      $clicks <= 1 ? 'opacity-0 text-zinc-500' : ''
    ]"
  />
  <div
    i-carbon:hinton-plot
    text-8xl delay-500
    transition duration-500 ease-in-out
    :class="[
      $clicks <= 1 ? 'opacity-0 text-zinc-500' : ''
    ]"
  />
  <div
    i-carbon:hinton-plot
    text-8xl delay-250
    transition duration-500 ease-in-out
    :class="[
      $clicks <= 1 ? 'opacity-0 text-zinc-500' : ''
    ]"
  />
  <div
    i-carbon:hinton-plot
    text-8xl delay-500
    transition duration-500 ease-in-out
    :class="[
      $clicks <= 1 ? 'opacity-0 text-zinc-500' : ''
    ]"
  />
  <div
    i-carbon:hinton-plot
    text-8xl delay-750
    transition duration-500 ease-in-out
    :class="[
      $clicks <= 1 ? 'opacity-0 text-zinc-500' : ''
    ]"
  />
  <div
    i-carbon:hinton-plot
    text-8xl delay-500
    transition duration-500 ease-in-out
    :class="[
      $clicks <= 1 ? 'opacity-0 text-zinc-500' : ''
    ]"
  />
  <div
    i-carbon:hinton-plot
    text-8xl delay-750
    transition duration-500 ease-in-out
    :class="[
      $clicks <= 1 ? 'opacity-0 text-zinc-500' : ''
    ]"
  />
  <div
    i-carbon:hinton-plot
    text-8xl delay-1000
    transition duration-500 ease-in-out
    :class="[
      $clicks <= 1 ? 'opacity-0 text-zinc-500' : ''
    ]"
  />
</div>

<!--
To recap for everyone what is distributed training. Let's start with the basics.

[click] In machine learning field, model is basically a set of matrix and vectors, which is used to predict the output based on the input data. Say, we have a set of vectors

[click] That's not the whole picture, so let's zoom out a little bit.
-->

---
class: py-10
---

# Machine Learning 101

<span>Let's start with the basics</span>

<div mt-16 />

<div flex items-center>
  <div
    grid grid-cols-3 gap-0 w-fit
  >
    <div i-carbon:hinton-plot text-8xl />
    <div i-carbon:hinton-plot text-8xl />
    <div i-carbon:hinton-plot text-8xl />
    <div i-carbon:hinton-plot text-8xl />
    <div i-carbon:hinton-plot text-8xl />
    <div i-carbon:hinton-plot text-8xl />
    <div i-carbon:hinton-plot text-8xl />
    <div i-carbon:hinton-plot text-8xl />
    <div i-carbon:hinton-plot text-8xl />
  </div>
  <div v-click pl-20 pr-30 transition duration-500 ease-in-out>
    <div i-carbon:arrow-right text-8xl />
  </div>
  <div v-click flex flex-col gap-2 items-center justify-center transition duration-500 ease-in-out>
    <div flex items-center gap-6>
      <div i-bi:gpu-card text-8xl /><span text-2xl>GPU</span>
    </div>
    <div flex items-center gap-6>
      <div i-carbon:chip text-8xl /><span text-2xl>CPU</span>
    </div>
  </div>
</div>

<!--
This is the "visualization" fundamental building block of every machine learning models. (or Hinton diagram if you like). With that, the concept of training is just splitting data into different slices and blocks (which we call batches), what to do? [click] we will then feed them into the [click] CPU or GPU hardware devices to do the computation as well as inference.
-->

---
class: py-10
glowSeed: 120
---

# Distributed Training 101

<span>Why even bother with distributed systems?</span>

<div mt-10 />

<div flex items-center gap-4>

<v-clicks>
  <div
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid violet-800" bg="violet-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:intent-request-scale-out h-20 w-20 />
    </div>
    <div bg="violet-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>LLMs are large</span>
    </div>
  </div>
  <div
    :class="$clicks < 2 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid purple-800" bg="purple-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:intent-request-uninstall h-20 w-20 />
    </div>
    <div bg="purple-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Single GPU doesn't fit in</span>
    </div>
  </div>
  <div
    :class="$clicks < 3 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid fuchsia-800" bg="fuchsia-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:ibm-cloud-bare-metal-servers-vpc h-20 w-20 />
    </div>
    <div bg="fuchsia-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Distribute them to GPU clusters</span>
    </div>
  </div>
  <div
    :class="$clicks < 4 ? 'translate-x--20' : 'translate-x-0'"
    rounded-lg
    border="2 solid pink-800" bg="pink-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:data-error h-20 w-20 />
    </div>
    <div bg="pink-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Failures occur</span>
    </div>
  </div>
</v-clicks>

</div>

<!--
Surely we know what is model and what was doing during training. [click] But in modern days, models are getting larger and larger, [click] they wouldn't be able to fit into a single instance of GPU. Therefore, to deal with the "too large" problem, [click] we will need to distribute them to multiple GPU clusters.

Ok, everything seems fine. More GPUs means faster training, right? Or is it? [click] It turns out the memory and power consumption will not be the only problems we will face, But also the failures.
-->

---
class: py-10
glow: bottom
glowSeed: 368
---

# Why failures occur?

<span>What so criticals are those so irreversibles</span>

<div mt-24 />

<div flex items-center gap-30 justify-center>

<v-clicks>
  <div flex flex-col items-center gap-2>
    <div i-fluent:error-circle-settings-20-regular text-8xl text-violet-500 />
    <span>Hardware issues</span>
  </div>
  <div flex flex-col items-center gap-2>
    <div i-fluent:globe-error-20-regular text-8xl text-rose-500 />
    <span>Network issues</span>
  </div>
  <div flex flex-col items-center gap-2>
    <div i-fluent:calendar-error-20-regular text-8xl text-yellow-500 />
    <span>Framework bugs</span>
  </div>
</v-clicks>

</div>

<!--
So, why do failures occur?

Before we get into the rabbit hole any further, let's take a look at the common [click] hardware failures, [click] network issues, [click] or even software bugs.
-->

---
class: py-10
---

<h1 flex items-center gap-2>
  <div i-fluent:error-circle-settings-20-regular />
  Irreversible hardwares - GPU & PCIe
</h1>

<span>GPU issues, PCIe issues, RDMA issues, so many of them</span>

<div mt-6 />

<div flex flex-col>

<v-clicks>

```txt {|4,6-9}
[ 4254.197816] NVRM: GPU at PCI:0000:5d:00: GPU-f1906b9b-557a-e961-045c-9fe4be3ce012
[ 4254.197854] NVRM: GPU Board Serial Number: 1653923026510
[ 4254.197860] NVRM: Xid (PCI:0000:5d:00): 79, pid='<unknown>', name=<unknown>, GPU has fallen off the bus.
[ 4254.197871] NVRM: GPU 0000:5d:00.0: GPU has fallen off the bus.
[ 4254.197878] NVRM: GPU 0000:5d:00.0: GPU serial number is 1653923026510.
[ 4254.197913] NVRM: A GPU crash dump has been created. If possible, please run
               NVRM: nvidia-bug-report.sh as root to collect this data before
               NVRM: the NVIDIA kernel module is unloaded.
```

```txt {|3,4-5}
[14387.209961] NVRM: The NVIDIA GPU 0000:5d:00.0
               NVRM: (PCI ID: 10de:2330) installed in this system has
               NVRM: fallen off the bus and is not responding to commands.
[14387.210134] nvidia: probe of 0000:5d:00.0 failed with error -1
[14387.274303] NVRM: The NVIDIA probe routine failed for 1 device(s).
[14387.274366] NVRM: loading NVIDIA UNIX x86_64 Kernel Module  525.125.06  Tue May 30 05:11:37 UTC 2023
[14387.511008] nvidia_uvm: module uses symbols from proprietary module nvidia, inheriting taint.
[14387.548839] nvidia-uvm: Loaded the UVM driver, major device number 502.
[14387.573380] nvidia-modeset: Loading NVIDIA Kernel Mode Setting Driver for UNIX platforms  525.125.06  Tue May 30 04:58:48 UTC 2023
```

</v-clicks>

</div>

<!--

-->

---
class: py-10
---

<h1 flex items-center gap-2>
  <div i-fluent:globe-error-20-regular />
  Irreversible networks - NCCL
</h1>

<span>GPU issues, PCIe issues, RDMA issues, so many of them</span>

<div mt-6 />

<div flex flex-col>

<v-clicks>

```txt {|5,10-13}
node-1:185:1027 [7] NCCL INFO [Service thread] Connection closed by localRank 0
node-1:180:1028 [2] NCCL INFO [Service thread] Connection closed by localRank 0
node-1:184:1030 [6] NCCL INFO [Service thread] Connection closed by localRank 0
node-1:178:828 [0] NCCL INFO comm 0x55555da97ba0 rank 16 nranks 32 cudaDev 0 busId 1b000 - Abort COMPLETE
[E ProcessGroupNCCL.cpp:481] Some NCCL operations have failed or timed out. Due to the asynchronous nature of CUDA kernels, subsequent GPU operations might run on corrupted/incomplete data.
[E ProcessGroupNCCL.cpp:487] To avoid data inconsistency, we are taking the entire process down.
[E ProcessGroupNCCL.cpp:852] [Rank 16] NCCL watchdog thread terminated with exception: NCCL error: remote process exited or there was a network error, NCCL version 2.19.3
ncclRemoteError: A call failed possibly due to a network error or a remote process exiting prematurely.
Last error:
NET/IB : Got completion from peer 10.42.0.2<47534> with error 5, opcode 48, len 32764, vendor err 244
terminate called after throwing an instance of 'std::runtime_error'
  what():  [Rank 16] NCCL watchdog thread terminated with exception: NCCL error: remote process exited or there was a network error, NCCL version 2.19.3
ncclRemoteError: A call failed possibly due to a network error or a remote process exiting prematurely.
Last error:
NET/IB : Got completion from peer 10.42.0.2<47534> with error 5, opcode 48, len 32764, vendor err 244
[2024-07-25 06:36:18,293] torch.distributed.elastic.multiprocessing.api: [WARNING] Sending process 179 closing signal SIGTERM
[2024-07-25 06:36:18,294] torch.distributed.elastic.multiprocessing.api: [WARNING] Sending process 180 closing signal SIGTERM
```

</v-clicks>

</div>

<!--

-->

---
class: py-10
---

<h1 flex items-center gap-2>
  <div i-fluent:calendar-error-20-regular />
  Irreversible softwares - PyTorch
</h1>

<span>GPU issues, PCIe issues, RDMA issues, so many of them</span>

<div mt-6 />

<div flex flex-col>

<v-clicks>

```txt {|14-16}
Traceback (most recent call last):
  File "/home/neko/Git/test/test1.py", line 13, in <module>
    out = model(torch.FloatTensor(src), src_key_padding_mask = mask, is_causal = True)
  File "/opt/miniforge/conda/lib/python3.10/site-packages/torch/nn/modules/module.py", line 1518, in _wrapped_call_impl
    return self._call_impl(*args, **kwargs)
  File "/opt/miniforge/conda/lib/python3.10/site-packages/torch/nn/modules/module.py", line 1527, in _call_impl
    return forward_call(*args, **kwargs)
  File "/opt/miniforge/conda/lib/python3.10/site-packages/torch/nn/modules/transformer.py", line 387, in forward
    output = mod(output, src_mask=mask, is_causal=is_causal, src_key_padding_mask=src_key_padding_mask_for_layers)
  File "/opt/miniforge/conda/lib/python3.10/site-packages/torch/nn/modules/module.py", line 1518, in _wrapped_call_impl
    return self._call_impl(*args, **kwargs)
  File "/opt/miniforge/conda/lib/python3.10/site-packages/torch/nn/modules/module.py", line 1527, in _call_impl
    return forward_call(*args, **kwargs)
  File "/opt/miniforge/conda/lib/python3.10/site-packages/torch/nn/modules/transformer.py", line 678, in forward
    return torch._transformer_encoder_layer_fwd(
RuntimeError: expected scalar type BFloat16 but found Float
```

</v-clicks>

</div>

<!--

-->

---
class: py-10
glow: right
---

# Where is the so called "Irreversible" issues?

<span>What is happening?</span>

<div mt-6 />

### For a distributed PyTorch training job...

<br>

<v-clicks depth="2">

- Instead of <span text-cyan-400><div inline-block i-carbon:ibm-cloud-resiliency translate-y-0.8 /> `Deployment`</span> like workloads, they are more like <span text-pink-400 v-mark="{ at: 9, color: 'rgb(255, 144, 235)', type: 'underline' }"><div inline-block i-carbon:ibm-cloud-pak-manta-automated-data-lineage translate-y-0.8 /> `StatefulSet`</span>
- When bootstrapping, the <span text-violet-400>main node</span> (`rank 0`) will be the first to start
- Then negotiate with <span text-blue-400>other nodes</span> (`rank != 0`) to join the training through <span text="[#64b023]"><div inline-block translate-y-0.8 mr-1 i-bi:nvidia />NCCL</span>
  - Calculate topology
  - Calculate connectivity
  - Calculate bandwidth
- Once everyone is ready, minibatch will be calculated and sent to each node
- Every step, or epoch, a <span text-sky-300 v-mark="{ at: 10, color: 'rgb(144, 200, 255)', type: 'underline' }">Ring AllReduce</span> or <span text-sky-300 v-mark="{ at: 11, color: 'rgb(144, 200, 255)', type: 'underline' }">AllReduce</span> operation will be performed across the nodes

</v-clicks>

<!--
[click] Instead of a normal deployment, distributed training jobs are more like a StatefulSet. [click] When bootstrapping, the main node (rank 0) will be the first to start, [click] then negotiate with other nodes (rank != 0) to join the training through NCCL. While both [click] calculate topology, [click] calculate connectivity, [click] calculate bandwidth, etc. [click] Once everyone is ready, minibatch will be calculated and sent to each node. [click] During training, every step, or epoch, a Ring AllReduce or AllReduce operation will be performed across the nodes.
-->

---
class: py-10
glow: bottom
clicks: 3
---

# Simulate the failure

<span>What is happening?</span>

<div mt-6 />

Let's say we have a distributed training job running on a GPU cluster...

<div v-click flex justify-center>
  <div
    v-motion
    v-click="2"
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: '0' } }"
    :leave="{ opacity: 0 }"
    text-8xl
    :class="$clicks < 3 ? 'i-carbon:hexagon-vertical-outline' : 'i-carbon:hexagon-vertical-solid'"
  />
  <div
    v-motion
    v-click="2"
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: '250' } }"
    :leave="{ opacity: 0 }"
    i-carbon:hexagon-vertical-outline text-8xl
  />
  <div
    v-motion
    v-click="2"
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: '500' } }"
    :leave="{ opacity: 0 }"
    i-carbon:hexagon-vertical-outline text-8xl
  />
  <div
    v-motion
    v-click="2"
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: '750' } }"
    :leave="{ opacity: 0 }"
    i-carbon:hexagon-vertical-outline text-8xl
  />
  <div
    v-motion
    v-click="2"
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: '1000' } }"
    :leave="{ opacity: 0 }"
    i-carbon:hexagon-vertical-outline text-8xl
  />
  <div
    v-motion
    v-click="2"
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: '1150' } }"
    :leave="{ opacity: 0 }"
    i-carbon:hexagon-vertical-outline text-8xl
  />
</div>

<div mt-6 />

<div flex items-center justify-center gap-4>
  <div flex items-center v-click="3" text-zinc-300><div i-carbon:hexagon-vertical-solid mr-1 /><span>Main node</span></div>
  <div flex items-center v-click="3" text-zinc-300><div i-carbon:hexagon-vertical-outline mr-1 /><span>Worker node</span></div>
</div>

<!--

-->

---
class: py-10
glowSeed: 100
---

# Why are they hard to deal with?

<span>Causes, reason, and potential solutions</span>

<div mt-6 />

<div flex flex-col gap-4>

<v-clicks>

<div border="2 solid violet-800/50" rounded-lg>
  <div flex items-center bg="violet-800/30" px-3 py-2 text-violet-300>
    <div i-carbon:web-services-container text-sm mr-1 />
    <div text-xs>
      <em>Blackbox with in another blackbox</em>
    </div>
  </div>
  <div bg="violet-800/10" px-4 py-3>
    <div>
      <span>
        Distribution algorithm is purely implemented by <span text="[#f6432f]"><div inline-block mr-1 translate-y-0.8 i-devicon:pytorch />PyTorch</span>, <span text="[#64b023]"><div inline-block translate-y-0.8 mr-1 i-bi:nvidia />NCCL</span> itself.
      </span>
    </div>
    <div text-xs flex gap-2 mt-1 text-zinc-400>
      <div>Hard to debug</div>
      <div>Hard to trace</div>
      <div>Hard to make it managed</div>
      <div>Hard to make it controlled</div>
    </div>
  </div>
</div>

<div border="2 solid blue-800/50" rounded-lg>
  <div flex items-center bg="blue-800/30" px-3 py-2 text-blue-300>
    <div i-carbon:sysplex-distributor text-sm mr-1 />
    <div text-xs>
      <em>Unreachable</em>
    </div>
  </div>
  <div bg="blue-800/10" px-4 py-3>
    <div>
      <span>
        Unlike nowadays <div i-devicon:kubernetes inline-block translate-y-0.5 /> <span text="[#5791f7]">Kubernetes Operators</span>, healing, orchestrating still hard to achieve.
      </span>
    </div>
    <div text-xs flex gap-2 mt-1 text-zinc-400>
      <div>Hard to auto-heal</div>
      <div>Hard to auto-recover</div>
      <div>Hard to auto-mitigate</div>
    </div>
  </div>
</div>

<div border="2 solid cyan-800/50" rounded-lg>
  <div flex items-center bg="cyan-800/30" px-3 py-2 text-cyan-300>
    <div i-carbon:name-space text-sm mr-1 />
    <div text-xs>
      <em>Missing block of jigsaw</em>
    </div>
  </div>
  <div bg="cyan-800/10" px-4 py-3>
    <div>
      <span>
        Detecting failures of drivers, hardwares, GPUs, or even network is still a challenge.
      </span>
    </div>
    <div text-xs flex gap-2 mt-1 text-zinc-400>
      <div>Hard to know root cause</div>
      <div>Hard to collect needed NPD events & logs</div>
      <div>Lack of observability</div>
    </div>
  </div>
</div>

</v-clicks>

</div>

---
class: py-10
clicks: 5
---

# Beyond all of these issues

<span>Checkpoints, weights are more even critical</span>

<div mt-8 />

<div flex items-center justify-center>
  <div
    v-click flex flex-col gap-2 items-center justify-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"
  >
    <div flex items-center gap-6>
      <div i-carbon:hinton-plot text-8xl /><span text-2xl>Checkpoint</span>
    </div>
  </div>
  <div
    v-after pl-20 pr-20 transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"  delay-500
  >
    <div i-carbon:arrow-right text-8xl />
  </div>
  <div
    v-after flex flex-col gap-2 items-center justify-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'" delay-1000
  >
    <div flex items-center gap-6>
      <div i-carbon:vmdk-disk text-8xl /><span text-2xl>Storage</span>
    </div>
  </div>
</div>

<div flex flex-col gap-3 mt-6>

<v-clicks>

<div bg="indigo-800/20" border="2 solid indigo-600" rounded-lg flex-1 px-3 py-2>
  <div><span>Checkpoints are large</span></div>
  <div text-zinc-400 text-sm><span>LLAMA 2 has roughly 83GB of checkpoint files</span></div>
</div>

<div bg="indigo-800/20" border="2 solid indigo-600" rounded-lg flex-1 px-3 py-2>
  <div><span>Limited bandwidth of NFS, shared Volumes, RDMA</span></div>
  <div text-zinc-400 text-sm><span>Saving 80G and above levels checkpoint files require high speed of IO to reduce the downtime</span></div>
</div>

<div bg="indigo-800/20" border="2 solid indigo-600" rounded-lg flex-1 px-3 py-2>
  <div><span>Mitigation requires transferring across nodes</span></div>
  <div text-zinc-400 text-sm><span>If one of the GPU node went down, hundreds GB of files must be transferred to another node</span></div>
</div>

</v-clicks>

</div>

---
class: py-10
clicks: 2
---

# Tune the factors

<span>Checkpoints, weights are more even critical</span>

<div mt-12 v-click="2">

$$
\begin{aligned}
T = & \, T_{\text{train}} + (T_{\text{save}} \times G) \\
& + (T_{\text{diagnostic}} \times N \times P) \\
& + (T_{\text{reconcile}} \times N \times P) \\
& + (T_{\text{transfer}} \times C) \\
& + (T_{\text{load}} \times G)
\end{aligned}
$$

</div>

<div v-click="1" flex scale-60 gap-8 translate-y--8>

$$
\begin{aligned}
T_{\text{train}} & = \text{Training Epoch Elapsed} \\
T_{\text{save}} & = \text{Checkpoint Saving} \\
T_{\text{diagnostic}} & = \text{Diagnostic Time per Node/Pod} \\
T_{\text{reconcile}} & = \text{Reorchestrating Time per Node/Pod} \\
T_{\text{transfer}} & = \text{Checkpoint Transferring Time per File} \\
T_{\text{load}} & = \text{Checkpoint Loading Time per GPU} \\
\end{aligned}
$$

$$
\begin{aligned}
N & = \text{Number of Nodes} \\
P & = \text{Number of Pods} \\
C & = \text{Number of Checkpoint Files} \\
G & = \text{Number of GPUs} \\
\end{aligned}
$$

</div>

---
class: py-10
---

# Tune the factors

<span>What are the things we can improve</span>

<div mt-10 />

<div flex items-center gap-4>

<v-clicks>
  <div
    :class="$clicks < 1 ? 'translate-y--20' : 'translate-y-0'"
    rounded-lg
    border="2 solid violet-800" bg="violet-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:chevron-down h-20 w-20 />
    </div>
    <div bg="violet-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Reduce diagnostic time</span>
    </div>
  </div>
  <div
    :class="$clicks < 2 ? 'translate-y--20' : 'translate-y-0'"
    rounded-lg
    border="2 solid violet-800" bg="violet-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:chevron-down h-20 w-20 />
    </div>
    <div bg="violet-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Reduce reconcile time</span>
    </div>
  </div>
  <div
    :class="$clicks < 3 ? 'translate-y-20' : 'translate-y-0'"
    rounded-lg
    border="2 solid sky-800" bg="sky-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-5 py-16 flex items-center justify-center>
      <div i-carbon:chevron-up h-20 w-20 />
    </div>
    <div bg="sky-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Speed up checkpoints</span>
    </div>
  </div>
</v-clicks>

</div>

---
class: py-10
---

<div flex>
  <div flex-1>
    <h1 mb="0!">SOTA & Researches</h1>
    <span text="sm white/50 nowrap">Some of the state of the art blogs, tryouts, and researches</span>
  </div>
  <div>
    <img src="/BigScience.png" w-50 />
  </div>
</div>

<v-click>

Hardware issues:

> The main type of issue encountered during training were <span v-mark="{ at: 2, color: 'rgb(144, 200, 255)', type: 'underline' }">hardware failures</span>. As this was a new cluster with about 400 GPUs, on average we were getting <span v-mark="{ at: 3, color: 'rgb(144, 200, 255)', type: 'underline' }">1-2 GPU failures a week</span>. We were saving a checkpoint every 3h (100 iterations) so on average we would <span v-mark="{ at: 4, color: 'rgb(144, 200, 255)', type: 'underline' }">lose 1.5h of training on hardware crash.</span>[^1]

</v-click>

<div v-click="5">

Stuck:

> Sometimes the training <span v-mark="{ at: 6, color: 'rgb(144, 200, 255)', type: 'underline' }">gets stuck despite a crashing process and it won't quit</span>, which seems to be related to some torch.launch and possibly NCCL.[^2]

</div>

<div v-click="7">

They managed to automate most things...

> We automated most things, including recovery from hardware crashes, but <span v-mark="{ at: 8, color: 'rgb(144, 200, 255)', type: 'underline' }">sometimes a human intervention was needed</span> as well.[^1]

</div>

[^1]: [The Technology Behind BLOOM Training](https://huggingface.co/blog/bloom-megatron-deepspeed)
[^2]: [Training chronicles](https://github.com/bigscience-workshop/bigscience/blob/master/train/tr11-176B-ml/chronicles.md)

---
class: py-10
---

<div flex>
  <div flex-1>
    <h1 mb="0!">SOTA & Researches</h1>
    <span text="sm white/50 nowrap">Some of the state of the art blogs, tryouts, and researches</span>
  </div>
  <div flex items-center text-4xl>
    <div i-logos:meta-icon mr-2 />
    <span font-600>Meta</span>
  </div>
</div>

<div v-click="1">

They got a massive <span text-indigo-300>24,000 GPU Cluster</span>...

> We performed training runs on two custom-built 24K GPU clusters. To maximize GPU uptime, we developed an advanced new training stack that automates <span v-mark="{ at: 2, color: 'rgb(18, 104, 189)', type: 'underline' }">error detection</span>, <span v-mark="{ at: 3, color: 'rgb(18, 104, 189)', type: 'underline' }">handling</span>, and <span v-mark="{ at: 4, color: 'rgb(18, 104, 189)', type: 'underline' }">maintenance</span>.[^1]

</div>

<div v-click="5">

To solve the problems that we introduced...

> We also greatly improved our hardware reliability and detection mechanisms for <span v-mark="{ at: 6, color: 'rgb(18, 104, 189)', type: 'underline' }">silent data corruption</span>, and we developed new scalable storage systems that <span v-mark="{ at: 7, color: 'rgb(18, 104, 189)', type: 'underline' }">reduce overheads of checkpointing and rollback</span>.[^1]

</div>

<div v-click="8">

After improvements...

> Those improvements resulted in an overall effective training time of <span v-mark="{ at: 9, color: 'rgb(18, 104, 189)', type: 'underline' }">more than 95%</span>. Combined, these improvements increased the efficiency of Llama 3 training <span v-mark="{ at: 10, color: 'rgb(18, 104, 189)', type: 'underline' }">by ~three times compared to Llama 2</span>.[^1]

</div>

[^1]: [Introducing Meta Llama 3: The most capable openly available LLM to date](https://ai.meta.com/blog/meta-llama-3/)

---
class: py-10
---

# Who else have tried

<span>Some of the state of the art blogs, tryouts, and researches</span>

<div mt-4 />

<div flex flex-col gap-4 items-center>

<div flex gap-3 flex-col>
  <div v-click rounded-lg border="2 solid [#ff7979]" flex>
    <div bg="[#b31b1b]" rounded-l-lg>
      <img src="/Arxiv.svg" h-12 px-3 py-3 />
    </div>
    <div text="[#fefefe]" rounded-lg px-4 py-3 text-center>
      <span>FastPersist: Accelerating Model Checkpointing in Deep Learning</span>
    </div>
  </div>
  <div v-click rounded-lg border="2 solid [#ff7979]" flex>
    <div bg="[#b31b1b]" rounded-l-lg>
      <img src="/Arxiv.svg" h-12 px-3 py-3 />
    </div>
    <div text="[#fefefe]" rounded-lg px-4 py-3 text-center>
      <span>DLRover-RM: Resource Optimization for Deep Recommendation Models Training in the Cloud</span>
    </div>
  </div>
</div>

<div flex>
  <div v-click bg="[#f7f7f7]" rounded-lg border="2 solid [#1577fc]">
    <div text="[#1577fc]" bg="blue-100" rounded-lg px-4 py-3 text-center>
      <span>DLRover</span>
    </div>
    <img src="/dlrover_logo.png" w-50 rounded-lg px-2 py-6 />
    <div flex justify-center>
      <img src="/Ant_Group_logo.png" h-16 px-2 py-3 />
    </div>
  </div>
</div>

</div>

---
class: flex justify-center items-center gap-20 px40 text-xl
---

<div text-4xl absolute :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'" transition duration-500 ease-in-out>
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
  <span>One simple intall-to-go plugin solution combines both NPD (Node Problem Detector) and operator</span>
</div>

</v-clicks>

</div>

<!--
Since we have spent our time on layering concepts and knowledges, let's see what we have done so far.

[click] Introducing Kcover.

[click] This is our one simple intall-to-go plugin solution combines both NPD (Node Problem Detector) and operator.
-->

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
    <div bg="purple-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
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
    <div bg="violet-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
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
    <div bg="blue-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center text-base>
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

---
class: py-10
---

# Architecture

<span>Overview of the internals</span>

<div scale-85 translate-y--7 translate-x--7>

<svg width="914" height="437" viewBox="0 0 914 437" fill="none" xmlns="http://www.w3.org/2000/svg">
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="608.281" y="181.273">Analyze Event</tspan></text>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="785.234" y="181.273">Restart Job</tspan></text>
<path d="M496 100.5C496 101.052 496.448 101.5 497 101.5C497.552 101.5 498 101.052 498 100.5H496ZM497 68V67C496.448 67 496 67.4477 496 68H497ZM584.707 68.7071C585.098 68.3166 585.098 67.6834 584.707 67.2929L578.343 60.9289C577.953 60.5384 577.319 60.5384 576.929 60.9289C576.538 61.3195 576.538 61.9526 576.929 62.3431L582.586 68L576.929 73.6569C576.538 74.0474 576.538 74.6805 576.929 75.0711C577.319 75.4616 577.953 75.4616 578.343 75.0711L584.707 68.7071ZM498 100.5V68H496V100.5H498ZM497 69H584V67H497V69Z" fill="white"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="470.35" y="121.273">Event</tspan></text>
<rect x="127" y="1" width="280" height="303" rx="7" fill="#1E3A8A" fill-opacity="0.4"/>
<rect x="127" y="1" width="280" height="303" rx="7" stroke="#3B82F6" stroke-width="2"/>
<rect x="227.5" y="72" width="79" height="39" rx="19.5" fill="#581C87" fill-opacity="0.4"/>
<rect x="227.5" y="72" width="79" height="39" rx="19.5" stroke="#A855F7" stroke-width="2"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="3.5" letter-spacing="0em"><tspan x="246.731" y="96.5909">dcgmi</tspan></text>
<rect x="202" y="127" width="130" height="39" rx="19.5" fill="#581C87" fill-opacity="0.4"/>
<rect x="202" y="127" width="130" height="39" rx="19.5" stroke="#A855F7" stroke-width="2"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="3.5" letter-spacing="0em"><tspan x="221.097" y="151.591">Logs analyzer</tspan></text>
<rect x="228.5" y="182" width="77" height="37" rx="18.5" fill="#581C87" fill-opacity="0.4"/>
<rect x="228.5" y="182" width="77" height="37" rx="18.5" stroke="#A855F7" stroke-width="2"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="3" letter-spacing="0em"><tspan x="247.934" y="204.864">Events</tspan></text>
<rect x="212.5" y="235" width="109" height="37" rx="18.5" fill="#581C87" fill-opacity="0.4"/>
<rect x="212.5" y="235" width="109" height="37" rx="18.5" stroke="#A855F7" stroke-width="2"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="3" letter-spacing="0em"><tspan x="262.043" y="257.864">...</tspan></text>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="6" letter-spacing="0em"><tspan x="149" y="45.2273">Collector</tspan></text>
<rect x="586" y="17" width="327" height="102" rx="51" fill="#581C87" fill-opacity="0.4"/>
<rect x="586" y="17" width="327" height="102" rx="51" stroke="#A855F7" stroke-width="2"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="645.906" y="75.2727">Kubernetes APIServer</tspan></text>
<rect x="586" y="228" width="327" height="102" rx="51" fill="#581C87" fill-opacity="0.4"/>
<rect x="586" y="228" width="327" height="102" rx="51" stroke="#A855F7" stroke-width="2"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="5" letter-spacing="0em"><tspan x="660.877" y="286.273">Recovery Manager</tspan></text>
<rect x="195" y="361.148" width="144" height="74" rx="7" fill="#14532D" fill-opacity="0.4"/>
<rect x="195" y="361.148" width="144" height="74" rx="7" stroke="#22C55E" stroke-width="2"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="4.5" letter-spacing="0em"><tspan x="225.489" y="393.694">Container </tspan><tspan x="239.719" y="415.694">Status</tspan></text>
<rect x="1" y="361.148" width="144" height="74" rx="7" fill="#14532D" fill-opacity="0.4"/>
<rect x="1" y="361.148" width="144" height="74" rx="7" stroke="#22C55E" stroke-width="2"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="4.5" letter-spacing="0em"><tspan x="38.4766" y="404.694">Syscalls</tspan></text>
<rect x="390" y="361.148" width="144" height="74" rx="7" fill="#14532D" fill-opacity="0.4"/>
<rect x="390" y="361.148" width="144" height="74" rx="7" stroke="#22C55E" stroke-width="2"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-size="4.5" letter-spacing="0em"><tspan x="441.381" y="404.694">Logs</tspan></text>
<path d="M73 360.148C73 360.701 73.4477 361.148 74 361.148C74.5523 361.148 75 360.701 75 360.148L73 360.148ZM73.9999 331.148L73.9999 330.148C73.7347 330.148 73.4803 330.253 73.2928 330.441C73.1053 330.629 72.9999 330.883 72.9999 331.148L73.9999 331.148ZM267 331.148L267 332.148C267.552 332.148 268 331.7 268 331.148L267 331.148ZM267.707 305.441C267.316 305.05 266.683 305.05 266.293 305.441L259.929 311.804C259.538 312.195 259.538 312.828 259.929 313.219C260.319 313.609 260.953 313.609 261.343 313.219L267 307.562L272.657 313.219C273.047 313.609 273.68 313.609 274.071 313.219C274.462 312.828 274.462 312.195 274.071 311.804L267.707 305.441ZM75 360.148L74.9999 331.148L72.9999 331.148L73 360.148L75 360.148ZM73.9999 332.148L267 332.148L267 330.148L73.9999 330.148L73.9999 332.148ZM268 331.148L268 306.148L266 306.148L266 331.148L268 331.148Z" fill="white"/>
<path d="M266 360.148C266 360.701 266.448 361.148 267 361.148C267.552 361.148 268 360.701 268 360.148H266ZM267.707 305.442C267.317 305.052 266.683 305.052 266.293 305.442L259.929 311.806C259.538 312.197 259.538 312.83 259.929 313.22C260.319 313.611 260.953 313.611 261.343 313.22L267 307.563L272.657 313.22C273.047 313.611 273.681 313.611 274.071 313.22C274.462 312.83 274.462 312.197 274.071 311.806L267.707 305.442ZM268 360.148V306.149H266V360.148H268Z" fill="white"/>
<path d="M459 360.148C459 360.701 459.448 361.148 460 361.148C460.552 361.148 461 360.701 461 360.148L459 360.148ZM460 331.148L461 331.148C461 330.596 460.552 330.148 460 330.148L460 331.148ZM267 331.148L266 331.148C266 331.414 266.105 331.668 266.293 331.856C266.48 332.043 266.735 332.148 267 332.148L267 331.148ZM267.707 305.44C267.317 305.05 266.683 305.05 266.293 305.44L259.929 311.804C259.538 312.195 259.538 312.828 259.929 313.218C260.319 313.609 260.953 313.609 261.343 313.218L267 307.562L272.657 313.218C273.047 313.609 273.681 313.609 274.071 313.218C274.462 312.828 274.462 312.195 274.071 311.804L267.707 305.44ZM461 360.148L461 331.148L459 331.148L459 360.148L461 360.148ZM460 330.148L267 330.148L267 332.148L460 332.148L460 330.148ZM268 331.148L268 306.147L266 306.147L266 331.148L268 331.148Z" fill="white"/>
<path d="M407.43 152.643C406.878 152.643 406.43 153.09 406.43 153.643C406.43 154.195 406.878 154.643 407.43 154.643L407.43 152.643ZM497 153.643L497 154.643C497.265 154.643 497.52 154.537 497.707 154.35C497.895 154.162 498 153.908 498 153.643L497 153.643ZM407.43 154.643L497 154.643L497 152.643L407.43 152.643L407.43 154.643ZM498 153.643L498 130L496 130L496 153.643L498 153.643Z" fill="white"/>
<path d="M675 120V158" stroke="white" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4"/>
<path d="M676 193C676 192.448 675.552 192 675 192C674.448 192 674 192.448 674 193L676 193ZM674.293 226.707C674.683 227.098 675.317 227.098 675.707 226.707L682.071 220.343C682.462 219.953 682.462 219.319 682.071 218.929C681.681 218.538 681.047 218.538 680.657 218.929L675 224.586L669.343 218.929C668.953 218.538 668.319 218.538 667.929 218.929C667.538 219.319 667.538 219.953 667.929 220.343L674.293 226.707ZM674 195.062C674 195.615 674.448 196.062 675 196.062C675.552 196.063 676 195.615 676 195.063L674 195.062ZM676 199.188C676 198.635 675.552 198.188 675 198.188C674.448 198.187 674 198.635 674 199.187L676 199.188ZM674 203.312C674 203.865 674.448 204.312 675 204.312C675.552 204.313 676 203.865 676 203.313L674 203.312ZM676 207.438C676 206.885 675.552 206.438 675 206.438C674.448 206.437 674 206.885 674 207.437L676 207.438ZM674 211.562C674 212.115 674.448 212.562 675 212.562C675.552 212.563 676 212.115 676 211.563L674 211.562ZM676 215.688C676 215.135 675.552 214.688 675 214.688C674.448 214.687 674 215.135 674 215.687L676 215.688ZM674 219.812C674 220.365 674.448 220.812 675 220.812C675.552 220.813 676 220.365 676 219.813L674 219.812ZM676 223.938C676 223.385 675.552 222.938 675 222.938C674.448 222.937 674 223.385 674 223.937L676 223.938ZM674 193L674 195.062L676 195.063L676 193L674 193ZM674 199.187L674 203.312L676 203.313L676 199.188L674 199.187ZM674 207.437L674 211.562L676 211.563L676 207.438L674 207.437ZM674 215.687L674 219.812L676 219.813L676 215.688L674 215.687ZM674 223.937L674 226L676 226L676 223.938L674 223.937ZM676 193C676 192.448 675.552 192 675 192C674.448 192 674 192.448 674 193L676 193ZM674.293 226.707C674.683 227.098 675.317 227.098 675.707 226.707L682.071 220.343C682.462 219.953 682.462 219.319 682.071 218.929C681.681 218.538 681.047 218.538 680.657 218.929L675 224.586L669.343 218.929C668.953 218.538 668.319 218.538 667.929 218.929C667.538 219.319 667.538 219.953 667.929 220.343L674.293 226.707ZM674 195.062C674 195.615 674.448 196.062 675 196.062C675.552 196.063 676 195.615 676 195.063L674 195.062ZM676 199.188C676 198.635 675.552 198.188 675 198.188C674.448 198.187 674 198.635 674 199.187L676 199.188ZM674 203.312C674 203.865 674.448 204.312 675 204.312C675.552 204.313 676 203.865 676 203.313L674 203.312ZM676 207.438C676 206.885 675.552 206.438 675 206.438C674.448 206.437 674 206.885 674 207.437L676 207.438ZM674 211.562C674 212.115 674.448 212.562 675 212.562C675.552 212.563 676 212.115 676 211.563L674 211.562ZM676 215.688C676 215.135 675.552 214.688 675 214.688C674.448 214.687 674 215.135 674 215.687L676 215.688ZM674 219.812C674 220.365 674.448 220.812 675 220.812C675.552 220.813 676 220.365 676 219.813L674 219.812ZM676 223.938C676 223.385 675.552 222.938 675 222.938C674.448 222.937 674 223.385 674 223.937L676 223.938ZM674 193L674 195.062L676 195.063L676 193L674 193ZM674 199.187L674 203.312L676 203.313L676 199.188L674 199.187ZM674 207.437L674 211.562L676 211.563L676 207.438L674 207.437ZM674 215.687L674 219.812L676 219.813L676 215.688L674 215.687ZM674 223.937L674 226L676 226L676 223.938L674 223.937Z" fill="white"/>
<path d="M834 226V193" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M833 158C833 158.552 833.448 159 834 159C834.552 159 835 158.552 835 158L833 158ZM834.707 120.293C834.317 119.902 833.683 119.902 833.293 120.293L826.929 126.657C826.538 127.047 826.538 127.681 826.929 128.071C827.319 128.462 827.953 128.462 828.343 128.071L834 122.414L839.657 128.071C840.047 128.462 840.681 128.462 841.071 128.071C841.462 127.681 841.462 127.047 841.071 126.657L834.707 120.293ZM835 158L835 121L833 121L833 158L835 158Z" fill="white"/>
</svg>

</div>

---
class: py-10
---

# Why can it?

<span>How it was implemented</span>

---
class: py-10
---

# How to use it?

<span>Easy. simple, two commands</span>

#### Install

```shell
helm install kcover kcover/kcover --namespace kcover-system
```

<div mt-6 />

<div v-click>

#### Label the should watched resources - With `kubectl`

```shell
kubectl label pod pytorchjob-example-0 kcover.io/cascading-recovery=true
```

</div>

<div mt-6 />

<div v-click>

#### Label the should watched resources - With `yaml`

```yaml {6}
apiVersion: v1
kind: Pod
metadata:
  name: pytorchjob-example-0
  labels:
    kcover.io/cascading-recovery: "true"
  # ...
```

</div>

---
class: py-10
---

# Let's build it together

<span>Open sourced, already</span>

<div flex>
  <div
    v-click="1" flex flex-col items-start transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"
  >
    <div mt-10 flex gap-16>
      <img src="/kcover-repository-qr.png" w-60 />
      <div text-2xl flex items-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>BaizeAI/kcover</span>
      </div>
    </div>
  </div>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.png" h-10>
    <img src="/CloudNativeCon.png" h="10.1">
    <img src="/OpenSourceSummit.png" h-9>
    <img src="/AI_dev.png" h-4>
  </div>
</div>

---
class: py-10
---

# Futures

<span>Foresight from our perspective</span>

<div flex gap-4>

<div border="2 solid blue-600" bg="blue-800/40" rounded-lg min-h-70 w="[33%]">

<div rounded-t-lg bg="blue-800" px-4 py-3>More advanced event analysis</div>

<div px-4 py-3 text-sm>

- <span text="[#64b023]"><div inline-block translate-y-0.8 mr-1 i-bi:nvidia />`dcgmi`</span> integrations
- <span text="[#64b023]"><div inline-block translate-y-0.8 mr-1 i-bi:nvidia />`nvidia-smi`</span> integrations
- <span text="[#64b023]"><div inline-block translate-y-0.8 mr-1 i-bi:nvidia />`nccl-test`</span> integrations
- <span text="[#64b023]"><div inline-block translate-y-0.8 mr-1 i-bi:nvidia />cuDNN</span> error analysis
- <span text="[#ff6f00]"><div inline-block mr-1 translate-y-0.8 i-devicon:tensorflow />TensorFlow</span> error analysis
- <span text="[#5e98f6]"><img inline-block mr-1 src="/jax.png" h-3.5 />Jax</span> error analysis

</div>

</div>

<div border="2 solid indigo-600" bg="indigo-800/40" rounded-lg min-h-70 w="[33%]">

<div rounded-t-lg bg="indigo-800" px-4 py-3>More types of analysis</div>

<div px-4 py-3 text-sm>

- IO
- <div i-devicon:kubernetes inline-block translate-y-0.5 /> <span text="[#5791f7]">Node Problem Detector</span> integrations
- <span text="[#64b023]"><div inline-block translate-y-0.8 mr-1 i-bi:nvidia />NCCL</span> integrations

</div>

</div>

<div border="2 solid purple-600" bg="purple-800/40" rounded-lg min-h-70 w="[33%]">

<div rounded-t-lg bg="purple-800" px-4 py-3>More integrated solutions</div>

<div px-4 py-3 text-sm>

- <div i-devicon:kubernetes inline-block translate-y-0.5 /> <span text="[#5791f7]">Operator</span>
- Dedicated <div i-devicon:kubernetes inline-block translate-y-0.5 /> <span text="[#5791f7]">CRD</span> for configuring informer
- Dedicated <div i-devicon:kubernetes inline-block translate-y-0.5 /> <span text="[#5791f7]">CRD</span> for configuring mitigator
- Automatically watch for <div i-devicon:kubernetes inline-block translate-y-0.5 /> <span text="[#5791f7]">CRD</span> with selectors
- Better cascading mitigation

</div>

</div>

</div>

---
class: py-10
---

# To community

<span>Let's improve it together</span>

- Propose universal trainer health check implementation for <span text="[#f6432f]"><div inline-block mr-1 translate-y-0.8 i-devicon:pytorch />PyTorch</span>
- Together to build better analysis and root cause debugging on top of <div i-devicon:kubernetes inline-block translate-y-0.5 /> <span text="[#5791f7]">Kubernetes</span>
  - Perhaps we can corporate with <span text="[#64b023]"><div inline-block translate-y-0.8 mr-1 i-bi:nvidia />NVIDIA</span>
- Try to expose more observability metrics for tracing, logging, and monitoring
  - Proper implementation of health check endpoint from distributed trainers for analysis
  - <span text="[#f97248]"><div inline-block mr-1 translate-y-0.8 i-devicon:prometheus />Prometheus</span> & <span text="[#667fe3]"><div inline-block mr-1 translate-y-0.8 i-logos:opentelemetry-icon />OpenTelemetry</span> integrations
- How about implement a stateless negotiator layer on top of <span text="[#ff6f00]"><div inline-block mr-1 translate-y-0.8 i-devicon:tensorflow />TensorFlow</span>, <span text="[#f6432f]"><div inline-block mr-1 translate-y-0.8 i-devicon:pytorch />PyTorch</span> and <span text="[#5e98f6]"><img inline-block mr-1 src="/jax.png" h-3.5 />Jax</span>?

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.png" h-10>
    <img src="/CloudNativeCon.png" h="10.1">
    <img src="/OpenSourceSummit.png" h-9>
    <img src="/AI_dev.png" h-4>
  </div>
</div>

---
class: py-10
---

<div mt-50 />

<div text="[48px]">
  Thank you
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.png" h-10>
    <img src="/CloudNativeCon.png" h="10.1">
    <img src="/OpenSourceSummit.png" h-9>
    <img src="/AI_dev.png" h-4>
  </div>
</div>