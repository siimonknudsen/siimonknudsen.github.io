import { useEffect, useRef, useState } from 'react'
import { VERT_SRC, FRAG_SRC } from './shader.js'

/**
 * ShaderBackground — self-contained, dependency-free WebGL gradient.
 * Calm + slow by default. Pauses when offscreen / tab hidden, renders a single
 * static frame under prefers-reduced-motion, caps DPR, and falls back to a CSS
 * gradient (.shader-bg-fallback) if WebGL is unavailable. Colours are props so
 * the hero can tint it per theme. See DESIGN_SYSTEM.md §7.
 */

const DEFAULT_COLORS = ['#0a0a0a', '#141414', '#1c1c1c', '#1f6f4a']
const MAX_DPR = 1.5

function hexToLinearRGB(hex) {
  const m = hex.replace('#', '')
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m.padEnd(6, '0')
  const r = parseInt(full.slice(0, 2), 16) / 255
  const g = parseInt(full.slice(2, 4), 16) / 255
  const b = parseInt(full.slice(4, 6), 16) / 255
  const toLin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
  return [toLin(r), toLin(g), toLin(b)]
}

function compileShader(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh)
    gl.deleteShader(sh)
    throw new Error('Shader compile error: ' + log)
  }
  return sh
}

function createProgram(gl) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog)
    gl.deleteProgram(prog)
    throw new Error('Program link error: ' + log)
  }
  return prog
}

export default function ShaderBackground({ colors = DEFAULT_COLORS, speed = 0.06, className = '', style }) {
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)

  const colorsRef = useRef(colors)
  const speedRef = useRef(speed)
  colorsRef.current = colors
  speedRef.current = speed

  // Lets us repaint a single static frame when colours change (e.g. theme flip)
  // while the rAF loop is paused (reduced motion / offscreen).
  const drawRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const container = canvas.parentElement || canvas
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let gl
    try {
      gl =
        canvas.getContext('webgl', { antialias: false, alpha: false, depth: false }) ||
        canvas.getContext('experimental-webgl')
    } catch {
      gl = null
    }
    if (!gl) {
      setFailed(true)
      return
    }

    let program
    try {
      program = createProgram(gl)
    } catch (e) {
      console.warn('[ShaderBackground]', e?.message || e)
      setFailed(true)
      return
    }

    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPosition = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const u = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      speed: gl.getUniformLocation(program, 'u_speed'),
      color0: gl.getUniformLocation(program, 'u_color0'),
      color1: gl.getUniformLocation(program, 'u_color1'),
      color2: gl.getUniformLocation(program, 'u_color2'),
      color3: gl.getUniformLocation(program, 'u_color3'),
      colorCount: gl.getUniformLocation(program, 'u_colorCount'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      mouseStrength: gl.getUniformLocation(program, 'u_mouseStrength'),
    }

    function uploadColors() {
      const list = (colorsRef.current && colorsRef.current.length ? colorsRef.current : DEFAULT_COLORS).slice(0, 4)
      const count = Math.max(2, Math.min(4, list.length))
      const padded = [...list]
      while (padded.length < 4) padded.push(list[list.length - 1])
      const [c0, c1, c2, c3] = padded.map(hexToLinearRGB)
      gl.uniform3fv(u.color0, c0)
      gl.uniform3fv(u.color1, c1)
      gl.uniform3fv(u.color2, c2)
      gl.uniform3fv(u.color3, c3)
      gl.uniform1f(u.colorCount, count)
    }

    let width = 1
    let height = 1
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const rect = container.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width * dpr))
      height = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, width, height)
    }
    resize()

    const start = performance.now()

    // Cursor reaction — smoothed pointer position (uv space, y-up) + strength.
    // Eased each frame so the swirl glides rather than snaps. Disabled under
    // reduced motion (interaction-triggered animation).
    let mouseX = 0.5, mouseY = 0.5
    let mTargetX = 0.5, mTargetY = 0.5
    let strength = 0, strengthTarget = 0

    function renderFrame(nowMs) {
      mouseX += (mTargetX - mouseX) * 0.08
      mouseY += (mTargetY - mouseY) * 0.08
      strength += (strengthTarget - strength) * 0.06
      gl.uniform2f(u.resolution, width, height)
      gl.uniform1f(u.time, (nowMs - start) / 1000)
      gl.uniform1f(u.speed, speedRef.current)
      gl.uniform2f(u.mouse, mouseX, mouseY)
      gl.uniform1f(u.mouseStrength, strength)
      uploadColors()
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    drawRef.current = () => renderFrame(performance.now())

    let rafId = 0
    let running = false
    let visibleOnScreen = true

    function frame(now) {
      renderFrame(now)
      rafId = requestAnimationFrame(frame)
    }
    function startLoop() {
      if (running || reduceMotion) return
      running = true
      rafId = requestAnimationFrame(frame)
    }
    function stopLoop() {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }
    function evaluateRun() {
      if (visibleOnScreen && !document.hidden) startLoop()
      else stopLoop()
    }

    if (reduceMotion) renderFrame(start)
    else evaluateRun()

    const ro = new ResizeObserver(() => {
      resize()
      renderFrame(performance.now())
    })
    ro.observe(container)

    const io = new IntersectionObserver(
      (entries) => {
        visibleOnScreen = entries.some((e) => e.isIntersecting)
        if (!reduceMotion) evaluateRun()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    function onVisibility() {
      if (!reduceMotion) evaluateRun()
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Pointer reaction: track globally, activate only while the cursor is over
    // the canvas region (so it works across the whole hero, even over the text).
    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        mTargetX = x
        mTargetY = 1 - y // flip to uv (y-up) to match the shader
        strengthTarget = 1
      } else {
        strengthTarget = 0
      }
    }
    if (!reduceMotion) window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      drawRef.current = null
      stopLoop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (!reduceMotion) window.removeEventListener('pointermove', onPointerMove)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      const lose = gl.getExtension('WEBGL_lose_context')
      if (lose) lose.loseContext()
    }
  }, [])

  // Repaint a static frame when colours change while paused (theme flip).
  useEffect(() => {
    drawRef.current?.()
  }, [colors])

  if (failed) {
    return <div className={`shader-bg-fallback ${className}`.trim()} style={style} aria-hidden="true" />
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
