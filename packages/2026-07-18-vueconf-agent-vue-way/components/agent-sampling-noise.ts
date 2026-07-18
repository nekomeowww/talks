import seedrandom from 'seedrandom'

export type SampleOutcome = 'fail' | 'pass'

export interface SamplingStage {
  count: 2 | 10 | 50 | 200
  caption: string
  reveal: number
}

export interface FlowSample {
  angle: number
  length: number
  outcome: SampleOutcome
  x: number
  y: number
}

export const SAMPLE_STAGES: readonly SamplingStage[] = [
  { count: 2, caption: '两次运行，只能得到两个样本', reveal: 0.08 },
  { count: 10, caption: '不同结果开始出现', reveal: 0.22 },
  { count: 50, caption: '常见结果逐渐显现', reveal: 0.52 },
  { count: 200, caption: '整体分布开始稳定', reveal: 1 },
]

export function stageForClick(clicks: number): SamplingStage {
  const floored = Number.isNaN(clicks) ? 0 : Math.floor(clicks)
  const index = Math.min(SAMPLE_STAGES.length - 1, Math.max(0, floored))

  return SAMPLE_STAGES[index]!
}

function hashValue(x: number, y: number): number {
  const sine = Math.sin(x * 127.1 + y * 311.7) * 43_758.5453123
  const fractional = sine - Math.floor(sine)

  return fractional * 2 - 1
}

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value)
}

function valueNoise(x: number, y: number): number {
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const tx = smoothstep(x - x0)
  const ty = smoothstep(y - y0)
  const top = hashValue(x0, y0) * (1 - tx) + hashValue(x0 + 1, y0) * tx
  const bottom = hashValue(x0, y0 + 1) * (1 - tx) + hashValue(x0 + 1, y0 + 1) * tx

  return top * (1 - ty) + bottom * ty
}

export function noiseAt(x: number, y: number): number {
  let amplitude = 1
  let frequency = 2
  let amplitudeTotal = 0
  let value = 0

  for (let octave = 0; octave < 4; octave += 1) {
    value += valueNoise(x * frequency, y * frequency) * amplitude
    amplitudeTotal += amplitude
    amplitude *= 0.5
    frequency *= 2
  }

  return value / amplitudeTotal
}

export function createFlowSamples(seed: string, count: number): FlowSample[] {
  const random = seedrandom(seed)

  return Array.from({ length: count }, () => {
    const x = random()
    const y = random()
    const localNoise = noiseAt(x * 3.1, y * 3.1)

    return {
      angle: localNoise * Math.PI * 2,
      length: 0.025 + random() * 0.05,
      outcome: localNoise >= 0 ? 'pass' : 'fail',
      x,
      y,
    }
  })
}
