<script setup lang="ts">
import { computed, onMounted, onUnmounted, shallowRef, watch } from 'vue'
import {
  noiseAt,
  stageForClick,
} from './agent-sampling-noise'

interface WebGlField {
  dispose: () => void
  render: (reveal: number) => void
}

const props = defineProps<{
  clicks: number
}>()

const container = shallowRef<HTMLElement | null>(null)
const fieldCanvas = shallowRef<HTMLCanvasElement | null>(null)
const fallbackCanvas = shallowRef<HTMLCanvasElement | null>(null)
const showFallback = shallowRef(false)
const stage = computed(() => stageForClick(props.clicks))
const ariaLabel = computed(
  () => `${stage.value.count} 次 Agent 运行：${stage.value.caption}`,
)
const fieldTextureWidth = 512
const fieldTextureHeight = 256

let field: WebGlField | null = null
let resizeObserver: ResizeObserver | null = null
let motionQuery: MediaQueryList | null = null
let dprQuery: MediaQueryList | null = null
let fieldTexturePixels: Uint8Array | null = null
let fadeFrame = 0
let resizeFrame = 0
let reducedMotion = false

const vertexShaderSource = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const fragmentShaderSource = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_reveal;
uniform sampler2D u_field;

void main() {
  vec2 fragment = gl_FragCoord.xy / max(u_resolution, vec2(1.0));
  vec2 textureCoordinate = vec2(fragment.x, 1.0 - fragment.y);
  vec4 field = texture2D(u_field, textureCoordinate);

  gl_FragColor = vec4(field.rgb, field.a * u_reveal);
}
`

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type)

  if (!shader)
    throw new Error('Unable to create WebGL shader')

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? 'WebGL shader compilation failed'
    gl.deleteShader(shader)
    throw new Error(message)
  }

  return shader
}

function initWebGlField(canvas: HTMLCanvasElement): WebGlField | null {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: false,
  })

  if (!gl)
    return null

  let vertexShader: WebGLShader | null = null
  let fragmentShader: WebGLShader | null = null
  let program: WebGLProgram | null = null
  let buffer: WebGLBuffer | null = null
  let texture: WebGLTexture | null = null

  try {
    vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    program = gl.createProgram()

    if (!program)
      throw new Error('Unable to create WebGL program')

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(program) ?? 'WebGL program link failed')

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const revealLocation = gl.getUniformLocation(program, 'u_reveal')
    const fieldLocation = gl.getUniformLocation(program, 'u_field')

    if (positionLocation < 0 || !resolutionLocation || !revealLocation || !fieldLocation)
      throw new Error('Unable to resolve WebGL shader locations')

    buffer = gl.createBuffer()

    if (!buffer)
      throw new Error('Unable to create WebGL buffer')

    texture = gl.createTexture()

    if (!texture)
      throw new Error('Unable to create WebGL texture')

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    gl.useProgram(program)
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      fieldTextureWidth,
      fieldTextureHeight,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      getFieldTexturePixels(),
    )
    gl.uniform1i(fieldLocation, 0)
    gl.clearColor(0, 0, 0, 0)
    gl.disable(gl.BLEND)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    vertexShader = null
    fragmentShader = null

    const activeProgram = program
    const activeBuffer = buffer
    const activeTexture = texture

    return {
      render(reveal: number) {
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.useProgram(activeProgram)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, activeTexture)
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
        gl.uniform1f(revealLocation, reveal)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      },
      dispose() {
        gl.deleteTexture(activeTexture)
        gl.deleteBuffer(activeBuffer)
        gl.deleteProgram(activeProgram)
      },
    }
  }
  catch {
    if (texture)
      gl.deleteTexture(texture)
    if (buffer)
      gl.deleteBuffer(buffer)
    if (program)
      gl.deleteProgram(program)
    if (vertexShader)
      gl.deleteShader(vertexShader)
    if (fragmentShader)
      gl.deleteShader(fragmentShader)

    return null
  }
}

function syncCanvasSize(canvas: HTMLCanvasElement): { height: number, width: number } {
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.max(1, window.devicePixelRatio || 1)
  const width = Math.max(1, Math.round(rect.width * dpr))
  const height = Math.max(1, Math.round(rect.height * dpr))

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }

  return { width: rect.width, height: rect.height }
}

function fallbackAlpha(noise: number, reveal: number): number {
  const magnitude = Math.abs(noise)
  const criticalProgress = Math.min(1, Math.max(0, (magnitude - 0.025) / 0.145))
  const criticalBand = 1 - criticalProgress * criticalProgress * (3 - 2 * criticalProgress)
  const contourDistance = Math.abs(magnitude * 9 - Math.floor(magnitude * 9) - 0.5)
  const contourProgress = Math.min(1, Math.max(0, (contourDistance - 0.02) / 0.08))
  const contour = 1 - contourProgress * contourProgress * (3 - 2 * contourProgress)

  return Math.min(
    1,
    (0.035 + magnitude * 0.12 + contour * 0.055 + criticalBand * 0.24) * reveal,
  )
}

function getFieldTexturePixels(): Uint8Array {
  if (fieldTexturePixels)
    return fieldTexturePixels

  const pixels = new Uint8Array(fieldTextureWidth * fieldTextureHeight * 4)

  // Keep rows top-first; the shader maps the visual top edge to texture v=0.
  for (let y = 0; y < fieldTextureHeight; y += 1) {
    for (let x = 0; x < fieldTextureWidth; x += 1) {
      const noise = noiseAt(
        (x + 0.5) / fieldTextureWidth * 3.1,
        (y + 0.5) / fieldTextureHeight * 3.1,
      )
      const offset = (y * fieldTextureWidth + x) * 4

      if (noise >= 0) {
        pixels[offset] = 69
        pixels[offset + 1] = 230
        pixels[offset + 2] = 154
      }
      else {
        pixels[offset] = 71
        pixels[offset + 1] = 132
        pixels[offset + 2] = 255
      }

      pixels[offset + 3] = Math.round(fallbackAlpha(noise, 1) * 255)
    }
  }

  fieldTexturePixels = pixels
  return pixels
}

function drawFallbackField(reveal: number) {
  const canvas = fallbackCanvas.value

  if (!canvas)
    return

  const { width, height } = syncCanvasSize(canvas)
  const context = canvas.getContext('2d')

  if (!context)
    return

  const dpr = Math.max(1, window.devicePixelRatio || 1)
  const gridSize = 8
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, width, height)

  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      const noise = noiseAt(
        (x + gridSize / 2) / Math.max(1, width) * 3.1,
        (y + gridSize / 2) / Math.max(1, height) * 3.1,
      )
      const color = noise >= 0 ? '69, 230, 154' : '71, 132, 255'
      context.fillStyle = `rgba(${color}, ${fallbackAlpha(noise, reveal)})`
      context.fillRect(x, y, gridSize + 0.5, gridSize + 0.5)
    }
  }
}

function renderSnapshot() {
  const currentStage = stage.value
  const canvas = fieldCanvas.value

  if (canvas && !showFallback.value)
    syncCanvasSize(canvas)

  if (showFallback.value)
    drawFallbackField(currentStage.reveal)
  else
    field?.render(currentStage.reveal)
}

function setCanvasOpacity(opacity: string) {
  if (fieldCanvas.value)
    fieldCanvas.value.style.opacity = opacity
  if (fallbackCanvas.value)
    fallbackCanvas.value.style.opacity = opacity
}

function setCanvasTransition(enabled: boolean) {
  const transition = enabled ? '' : 'none'

  if (fieldCanvas.value)
    fieldCanvas.value.style.transition = transition
  if (fallbackCanvas.value)
    fallbackCanvas.value.style.transition = transition
}

function rebuildWebGlField() {
  field?.dispose()
  field = null

  if (fieldCanvas.value) {
    syncCanvasSize(fieldCanvas.value)
    field = initWebGlField(fieldCanvas.value)
  }

  showFallback.value = !field
  renderSnapshot()
}

function handleContextLost(event: Event) {
  event.preventDefault()
  field = null
  showFallback.value = true
  renderSnapshot()
}

function handleContextRestored() {
  rebuildWebGlField()
}

function scheduleResizeRender() {
  if (resizeFrame)
    return

  resizeFrame = requestAnimationFrame(() => {
    resizeFrame = 0
    renderSnapshot()
  })
}

function handleWindowResize() {
  scheduleResizeRender()
}

function registerDprQuery() {
  dprQuery?.removeEventListener('change', handleDprChange)
  dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`)
  dprQuery.addEventListener('change', handleDprChange)
}

function handleDprChange() {
  registerDprQuery()
  scheduleResizeRender()
}

function handleMotionPreferenceChange(event: MediaQueryListEvent) {
  reducedMotion = event.matches

  if (reducedMotion) {
    cancelAnimationFrame(fadeFrame)
    renderSnapshot()
    setCanvasOpacity('1')
  }
}

function renderStageChange() {
  cancelAnimationFrame(fadeFrame)

  if (reducedMotion) {
    renderSnapshot()
    setCanvasOpacity('1')
    return
  }

  setCanvasTransition(false)
  setCanvasOpacity('0')
  renderSnapshot()
  void fieldCanvas.value?.offsetWidth

  fadeFrame = requestAnimationFrame(() => {
    setCanvasTransition(true)
    setCanvasOpacity('1')
  })
}

watch(() => props.clicks, renderStageChange, { flush: 'post' })

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = motionQuery.matches
  motionQuery.addEventListener('change', handleMotionPreferenceChange)
  window.addEventListener('resize', handleWindowResize)
  registerDprQuery()

  if (fieldCanvas.value) {
    fieldCanvas.value.addEventListener('webglcontextlost', handleContextLost)
    fieldCanvas.value.addEventListener('webglcontextrestored', handleContextRestored)
  }

  rebuildWebGlField()

  if (container.value) {
    resizeObserver = new ResizeObserver(() => {
      scheduleResizeRender()
    })
    resizeObserver.observe(container.value)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(fadeFrame)
  cancelAnimationFrame(resizeFrame)
  resizeObserver?.disconnect()
  window.removeEventListener('resize', handleWindowResize)
  motionQuery?.removeEventListener('change', handleMotionPreferenceChange)
  dprQuery?.removeEventListener('change', handleDprChange)

  if (fieldCanvas.value) {
    fieldCanvas.value.removeEventListener('webglcontextlost', handleContextLost)
    fieldCanvas.value.removeEventListener('webglcontextrestored', handleContextRestored)
  }

  field?.dispose()
  resizeObserver = null
  motionQuery = null
  dprQuery = null
  field = null
})
</script>

<template>
  <section
    ref="container"
    class="sampling-field"
    :aria-label="ariaLabel"
  >
    <canvas
      ref="fieldCanvas"
      class="sampling-field__canvas sampling-field__canvas--field"
      :class="{ 'sampling-field__canvas--hidden': showFallback }"
      aria-hidden="true"
    />
    <canvas
      ref="fallbackCanvas"
      class="sampling-field__canvas sampling-field__canvas--field"
      :class="{ 'sampling-field__canvas--hidden': !showFallback }"
      aria-hidden="true"
    />
    <div class="sampling-field__runs" aria-hidden="true">
      <strong>{{ stage.count }}</strong>
      <span>RUNS</span>
    </div>

    <p class="sampling-field__caption">
      {{ stage.caption }}
    </p>
  </section>
</template>

<style scoped>
.sampling-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: transparent;
  pointer-events: none;
}

.sampling-field__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  pointer-events: none;
  transition: opacity 400ms ease;
}

.sampling-field__canvas--field {
  z-index: 0;
}

.sampling-field__canvas--hidden {
  visibility: hidden;
}

.sampling-field__runs {
  position: absolute;
  z-index: 2;
  top: 18px;
  right: 20px;
  display: flex;
  align-items: baseline;
  gap: 7px;
  color: rgba(242, 248, 245, 0.72);
  font-size: 12px;
  letter-spacing: 0;
  line-height: 1;
}

.sampling-field__runs strong {
  color: rgba(246, 255, 251, 0.96);
  font-size: 30px;
  font-variant-numeric: tabular-nums;
  font-weight: 650;
  letter-spacing: 0;
}

.sampling-field__caption {
  position: absolute;
  z-index: 2;
  bottom: 18px;
  left: 20px;
  max-width: calc(100% - 40px);
  margin: 0;
  color: rgba(244, 250, 247, 0.86);
  font-size: 17px;
  font-weight: 520;
  letter-spacing: 0;
  line-height: 1.35;
}

@media (prefers-reduced-motion: reduce) {
  .sampling-field__canvas {
    transition: none;
  }
}
</style>
