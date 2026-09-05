import { useEffect, useRef } from 'react'
import styles from './Atmosphere.module.css'

/**
 * Atmosphere — a full-bleed WebGL light-field behind the hero. Two presets,
 * both "color as light, never paint" (DESIGN_KNOWLEDGE §6 DNA #6):
 *
 *   aurora — achromatic domain-warped noise, a slow silk of light drifting on
 *            the dark ground; on the light theme, soft silver smoke with real
 *            presence (the first light pass was tuned so quietly it didn't
 *            register — light mode needs ~2-3× the alpha of dark to read).
 *   halo   — a single soft bloom entering from the top edge, breathing almost
 *            imperceptibly. Light enters from above (§6.8). DARK THEME ONLY —
 *            Simon kept the moonlight version and cut the light-theme one
 *            ("remove the white version"); on light the ground stays flat.
 *
 * (The `dawn` preset was retired 2026-09-05 — superseded by SkyField.jsx.)
 *
 * Craft/perf rules honoured:
 *  - The field is LOW-CONTRAST behind the text (marckuiper dossier) — peaks
 *    stay well under the secondary-text grey so legibility never fights it.
 *  - In-shader ordered dither kills gradient banding (the #1 cheap tell);
 *    the site-wide .grain overlay adds materiality on top.
 *  - Alpha fades to 0 over the canvas' lower third, so the atmosphere melts
 *    into the flat page ground and the sections below stay calm.
 *  - Animation is transform-free and off the DOM: one quad, cheap fragment
 *    shader, DPR capped at 1.5, paused when offscreen or the tab is hidden.
 *  - prefers-reduced-motion → renders a single still frame, no loop.
 *  - Theme is read from <html class="dark"> and observed, so the field
 *    re-grades live on theme toggle.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2 u_res;
uniform float u_dark;   // 1 dark theme, 0 light
uniform int u_preset;   // 0 aurora, 2 halo (1 was dawn — retired)

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;          // y: 0 bottom, 1 top
  float aspect = u_res.x / u_res.y;
  // Melt into the page ground over the lower third of the canvas.
  float fade = smoothstep(0.02, 0.38, uv.y);
  // Ordered-ish dither: breaks gradient banding without visible texture.
  float dither = (hash(gl_FragCoord.xy) - 0.5) / 160.0;

  vec3 rgb = vec3(0.0);
  float alpha = 0.0;

  if (u_preset == 0) {
    // ── Aurora: domain-warped fbm, a slow silk of light ──
    float t = u_time * 0.018;
    vec2 p = vec2(uv.x * aspect * 1.1, uv.y * 1.9);
    vec2 q = vec2(
      fbm(p + t * vec2(0.9, 0.3)),
      fbm(p + vec2(5.2, 1.3) - t * vec2(0.4, 0.6))
    );
    float f = fbm(p + 2.6 * q + vec2(t * 0.7, -t * 0.3));
    float lum = smoothstep(0.38, 1.0, f);
    // Brightest toward the top — the light hangs above the page.
    lum *= 0.45 + 0.55 * smoothstep(0.15, 0.9, uv.y);
    if (u_dark > 0.5) {
      rgb = vec3(1.0);
      alpha = lum * 0.15;
    } else {
      // Silver smoke on white — light mode needs far more presence than the
      // dark tuning to register at all.
      rgb = vec3(0.0);
      alpha = lum * 0.12;
    }
  } else {
    // ── Halo: one soft bloom from the top edge, breathing ──
    float breathe = 0.94 + 0.06 * sin(u_time * 0.42);
    vec2 c = vec2(0.5 * aspect, 1.12);
    float r = distance(vec2(uv.x * aspect, uv.y), c);
    float bloom = exp(-pow(r * 1.55 / breathe, 1.7));
    if (u_dark > 0.5) {
      rgb = vec3(1.0);
      alpha = bloom * 0.15;
    } else {
      // Halo is dark-theme-only (Simon 2026-09-05: "save the halo but
      // remove the white version") — light theme stays the flat ground.
      rgb = vec3(0.0);
      alpha = 0.0;
    }
  }

  alpha = clamp(alpha * fade + dither, 0.0, 1.0);
  // Premultiplied alpha output.
  gl_FragColor = vec4(rgb * alpha, alpha);
}
`

const PRESETS = { aurora: 0, halo: 2 }

function Atmosphere({ preset = 'aurora', contained = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: 'low-power',
    })
    if (!gl) return undefined

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uDark = gl.getUniformLocation(prog, 'u_dark')
    const uPreset = gl.getUniformLocation(prog, 'u_preset')
    gl.uniform1i(uPreset, PRESETS[preset] ?? 0)

    const setTheme = () => {
      gl.uniform1f(uDark, document.documentElement.classList.contains('dark') ? 1 : 0)
    }
    setTheme()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
        gl.uniform2f(uRes, w, h)
      }
    }
    resize()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let raf = 0
    let running = false

    const draw = () => {
      resize()
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const frame = () => {
      draw()
      if (running && !reduced) raf = requestAnimationFrame(frame)
    }
    const play = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const pause = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // First frame synchronously — the field is there the moment the page
    // paints (and in hidden/background tabs where rAF never fires).
    // A reduced-motion visitor keeps exactly this one considered still.
    draw()
    if (!reduced) play()

    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return
      if (entry.isIntersecting) play()
      else pause()
    })
    io.observe(canvas)
    const onVis = () => {
      if (reduced) return
      if (document.hidden) pause()
      else play()
    }
    document.addEventListener('visibilitychange', onVis)

    // Redraw at once on a theme flip — unconditionally. Gating this on
    // `!running` left a paused canvas (tab hidden, or scrolled offscreen)
    // showing the previous theme's frame.
    const mo = new MutationObserver(() => {
      setTheme()
      draw()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced || !running) draw()
    })
    ro.observe(canvas)

    return () => {
      pause()
      io.disconnect()
      mo.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      // NOTE: deliberately NOT calling `WEBGL_lose_context.loseContext()` here.
      // `canvas.getContext('webgl')` returns the SAME context object for a given
      // canvas, and React reuses the DOM node across an effect re-run — so
      // killing the context on cleanup left StrictMode's dev double-mount (and
      // any prop change) re-initialising against a dead context: every shader
      // compile fails with a null info log and the canvas stays blank. The
      // browser frees the context when the canvas is collected.
    }
  }, [preset])

  return (
    // `contained` fills the parent box instead of breaking full-bleed out of
    // it — used by the Design System page's specimen.
    <div className={contained ? styles.contained : styles.atmosphere} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}

export default Atmosphere
