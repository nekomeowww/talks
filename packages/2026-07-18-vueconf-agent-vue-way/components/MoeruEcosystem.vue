<script setup lang="ts">
interface EcosystemProjectBase {
  name: string
  capability: string
}

interface LogoProject extends EcosystemProjectBase {
  visual: 'logo'
  logo: string
}

interface TextProject extends EcosystemProjectBase {
  visual: 'text'
  content: string
}

interface IconProject extends EcosystemProjectBase {
  visual: 'icon'
  icon: string
}

type EcosystemProject = LogoProject | IconProject | TextProject

function publicAsset(path: `/${string}`) {
  return `${import.meta.env.BASE_URL}${path.slice(1)}`
}

const coreProjects: readonly EcosystemProject[] = [
  {
    name: 'xsAI',
    capability: 'Vercel AI SDK',
    visual: 'text',
    content: 'xsAI',
  },
  {
    name: 'AIRI',
    capability: '虚拟角色',
    visual: 'logo',
    logo: publicAsset('/ecosystem/airi-icon-dark-rounded.png'),
  },
  {
    name: 'Velin',
    capability: '上下文编排',
    visual: 'logo',
    logo: publicAsset('/ecosystem/velin-logo.svg'),
  },
  {
    name: 'Vieval',
    capability: '评测框架',
    visual: 'logo',
    logo: publicAsset('/ecosystem/vieval-logo.svg'),
  },
  {
    name: 'AUV',
    capability: '计算机操作',
    visual: 'logo',
    logo: publicAsset('/ecosystem/auv-logo.svg'),
  },
  {
    name: 'alint',
    capability: '意图检查',
    visual: 'logo',
    logo: publicAsset('/alint-logo.svg'),
  },
] as const

const extendedProjects: readonly IconProject[] = [
  {
    name: 'Eventa',
    capability: 'IPC 事件库',
    visual: 'icon',
    icon: 'i-twemoji:ear',
  },
  {
    name: 'gpuu',
    capability: 'WebGPU 工具',
    visual: 'icon',
    icon: 'i-twemoji:eye',
  },
  {
    name: 'hf-inspector',
    capability: '模型管理',
    visual: 'icon',
    icon: 'i-twemoji:face-with-monocle',
  },
  {
    name: 'hfup',
    capability: 'HF 部署工具',
    visual: 'icon',
    icon: 'i-twemoji:astronaut',
  },
  {
    name: 'injeca',
    capability: '依赖注入',
    visual: 'icon',
    icon: 'i-twemoji:syringe',
  },
  {
    name: 'ortts',
    capability: '本地 TTS 推理',
    visual: 'icon',
    icon: 'i-twemoji:speaker-high-volume',
  },
  {
    name: 'unspeech',
    capability: '语音服务网关',
    visual: 'icon',
    icon: 'i-twemoji:speaking-head',
  },
  {
    name: 'Apeira',
    capability: '流式 Agent 运行时',
    visual: 'icon',
    icon: 'i-twemoji:robot',
  },
] as const

function projectId(project: EcosystemProject) {
  return `moeru-ecosystem-${project.name.toLowerCase()}`
}
</script>

<template>
  <section class="ecosystem" aria-label="Moeru AI 项目生态">
    <div class="ecosystem-grid ecosystem-grid--core">
      <article
        v-for="(project) in coreProjects"
        :id="projectId(project)"
        :key="project.name"
        class="project-tile project-tile--core"
        :aria-describedby="`${projectId(project)}-description`"
      >
        <template v-if="true">
          <div class="project-wash project-wash--core" aria-hidden="true">
            <img v-if="project.visual === 'logo'" :src="project.logo" alt="" class="project-logo project-wash-image">
            <span v-else-if="project.visual === 'icon'" class="project-wash-icon" :class="project.icon" />
            <span v-else-if="project.visual === 'text'" class="bg-white/25 size-100" />
          </div>
        </template>

        <template v-if="project.visual === 'text'">
          <div class="core-mark" aria-hidden="true">
            <span>{{ project.content }}</span>
          </div>
        </template>

        <template v-if="project.visual === 'logo' || project.visual === 'icon'">
          <div class="core-mark" aria-hidden="true">
            <img
              v-if="project.visual === 'logo'"
              :src="project.logo"
              alt=""
              class="project-logo"
            >
            <span v-else class="project-icon project-icon--core" :class="project.icon" />
          </div>
        </template>

        <div class="project-copy">
          <strong class="repo-name repo-name--core">{{ project.name }}</strong>
          <span class="capability">{{ project.capability }}</span>
        </div>

        <span :id="`${projectId(project)}-description`" class="visually-hidden">
          {{ project.name }}，{{ project.capability }}。
        </span>
      </article>
    </div>

    <div class="ecosystem-grid ecosystem-grid--extended">
      <article
        v-for="(project) in extendedProjects"
        :id="projectId(project)"
        :key="project.name"
        class="project-tile project-tile--extended"
        :aria-describedby="`${projectId(project)}-description`"
      >
        <div class="project-wash project-wash--extended" aria-hidden="true">
          <span class="project-wash-icon" :class="project.icon" />
        </div>
        <span class="project-icon" :class="project.icon" aria-hidden="true" />
        <div class="flex flex-col">
          <strong class="repo-name repo-name--extended">{{ project.name }}</strong>
          <span class="capability capability--extended">{{ project.capability }}</span>
          <span :id="`${projectId(project)}-description`" class="visually-hidden">
            {{ project.name }}，{{ project.capability }}。
          </span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.ecosystem {
  container: ecosystem / inline-size;
  display: grid;
  width: min(100%, 62rem);
  gap: 0.55rem;
  margin-inline: auto;
  color: #fff;
}

.ecosystem-grid {
  display: grid;
  min-width: 0;
  gap: 0.55rem;
}

.ecosystem-grid--core {
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-auto-rows: 12.8rem;
}

.ecosystem-grid--extended {
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-auto-rows: 8.4rem;
}

.project-tile {
  position: relative;
  isolation: isolate;
  min-width: 0;
  overflow: hidden;
  border-radius: 0.5rem;
  height: 100%;
  padding: 0.5rem 0.5rem;
}

.project-tile::after {
  position: absolute;
  z-index: -1;
  content: '';
  inset: 0;
}

.project-wash {
  position: absolute;
  z-index: -2;
  display: grid;
  opacity: 0.5;
  filter: blur(500px) saturate(0.72) contrast(0.9);
  inset: -60%;
  place-items: center;
  transform: scale(1.6);
}

.project-wash--extended {
  filter: blur(clamp(2rem, 5cqi, 3rem)) saturate(0.72) contrast(0.9);
}

.project-tile--core {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  padding: 1rem;
}

.project-tile--extended {
  display: flex;
  flex-direction: column;
}

.core-mark {
  display: grid;
  min-height: 0;
  place-items: center;
  padding: 0.25rem 0.2rem 0.7rem;
}

.project-logo {
  display: block;
  width: 4.8rem;
  height: 4.8rem;
  max-width: 100%;
  object-fit: contain;
}

.project-tile span.project-icon {
  justify-self: flex-start;
}

.project-icon {
  display: flex;
  width: 2.35rem;
  height: 2.35rem;
  flex: 1;
}

.project-icon--core {
  width: 4.5rem;
  height: 4.5rem;
}

.project-wash-image,
.project-wash-icon {
  width: 65%;
  height: 65%;
}

.project-copy {
  display: grid;
  min-width: 0;
  gap: 0.2rem;
}

.repo-name {
  min-width: 0;
  color: #fff;
  font-weight: 750;
  letter-spacing: 0;
}

.repo-name--core {
  font-size: 1.16rem;
  line-height: 1.12;
}

.repo-name--extended {
  display: flex;
  align-items: center;
  overflow-wrap: anywhere;
  font-size: 0.8rem;
}

.capability {
  color: rgb(255 255 255 / 82%);
  font-size: 0.72rem;
  letter-spacing: 0;
  white-space: nowrap;
}

.capability--extended {
  font-size: 0.5rem;
}

.project-tile:hover {
  border-color: rgb(255 255 255 / 18%);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

@container ecosystem (max-width: 52rem) {
  .ecosystem-grid,
  .ecosystem {
    gap: 0.4rem;
  }

  .ecosystem-grid--core {
    grid-auto-rows: 11.5rem;
  }

  .ecosystem-grid--extended {
    grid-auto-rows: 7.8rem;
  }

  .project-tile--core {
    padding: 0.8rem;
  }

  .project-tile--extended {
    padding-inline: 0.42rem;
  }

  .repo-name--core {
    font-size: 1rem;
  }

  .repo-name--extended {
    font-size: 0.65rem;
  }

  .capability--extended {
    font-size: 0.65rem;
  }
}
</style>
