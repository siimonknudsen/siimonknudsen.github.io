import { useEffect, useRef } from 'react'
import styles from './Atmosphere.module.css'

/**
 * SkyField — the "sky simulator" hero background, v2: physically based.
 *
 * The sky colour is no longer hand-picked keyframes; it is computed from
 * single-scattering atmospheric physics (Rayleigh + Mie, the GPU Gems 2 /
 * glsl-atmosphere lineage) for a camera standing on a hill (~1 km up),
 * looking north, slightly upward. The sun runs its real arc — east at
 * sunrise, south (BEHIND the viewer) at noon, west at sunset — so it is never
 * in frame; you only ever see its light. Because the colour falls out of the
 * physics, EVERY hour is distinct and mornings differ from evenings.
 *
 * Layered on the physics, an hourly "character" curve (turbidity/haze, cloud
 * coverage, star intensity, wind) makes the day breathe like a real one:
 * clear cool mornings, hazier warmer afternoons, long banded evenings, thin
 * veils at night with the stars peaking around midnight. Night adds a
 * starlight/airglow ambient and a soft moon glow (opposite the sun — never a
 * disc, only its light on the sky and the cloud edges).
 *
 * Theme is the day/night switch: light rides sunrise→day→sunset (sun ≥ +5°,
 * with a high-key haze lift so black ink keeps contrast), dark rides
 * dusk→night→dawn (sun ≤ −3°: blue hour, then night). mode="clock" follows
 * the local time (or the scrubber's `hour`); mode="fixed" pins 13:00 / 01:30.
 *
 * Perf: one full-screen quad; ~6×3 scattering samples + 7 fbm per pixel;
 * DPR ≤ 2, half-rate rAF (~30fps — the motion is glacial), adaptive: if the
 * device can't hold ~40fps the DPR cap drops to 1.25 automatically. First
 * frame synchronous, paused offscreen/hidden, still frame under reduced
 * motion, in-shader dither against banding.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec3 u_sun;     // unit direction to the sun (y up, +z forward)
uniform vec3 u_moon;    // unit direction to the moon
uniform float u_turb;   // aerosol turbidity multiplier (haze)
uniform float u_cover;  // cloud coverage threshold (higher = fewer clouds)
uniform float u_stars;  // star intensity by hour
uniform float u_wind;   // wind speed multiplier
uniform float u_dark;   // 1 dark theme, 0 light

const float PI = 3.14159265;

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
    p = p * 2.07 + vec2(19.7, 7.3);
    a *= 0.5;
  }
  return v;
}

// ── Atmosphere: single scattering, Rayleigh + Mie ─────────────────────────
vec2 rsi(vec3 r0, vec3 rd, float sr) {
  float a = dot(rd, rd);
  float b = 2.0 * dot(rd, r0);
  float c = dot(r0, r0) - sr * sr;
  float d = b * b - 4.0 * a * c;
  if (d < 0.0) return vec2(1e5, -1e5);
  return vec2((-b - sqrt(d)) / (2.0 * a), (-b + sqrt(d)) / (2.0 * a));
}

vec3 atmosphere(vec3 r, vec3 sun, float turb) {
  const float rPlanet = 6371e3;
  const float rAtmos = 6471e3;
  const vec3 kRlh = vec3(5.5e-6, 13.0e-6, 22.4e-6);
  const float shRlh = 8e3;
  const float shMie = 1.2e3;
  const float g = 0.76;
  const float iSun = 22.0;
  float kMie = 21e-6 * turb;
  vec3 r0 = vec3(0.0, rPlanet + 1000.0, 0.0); // standing on a tall hill

  vec2 p = rsi(r0, r, rAtmos);
  if (p.x > p.y) return vec3(0.0);
  p.y = min(p.y, rsi(r0, r, rPlanet).x);
  float iStep = (p.y - p.x) / 6.0;
  float iTime = 0.0;
  vec3 totalRlh = vec3(0.0);
  vec3 totalMie = vec3(0.0);
  float iOdRlh = 0.0;
  float iOdMie = 0.0;
  float mu = dot(r, sun);
  float mumu = mu * mu;
  float gg = g * g;
  float pRlh = 3.0 / (16.0 * PI) * (1.0 + mumu);
  float pMie = 3.0 / (8.0 * PI) * ((1.0 - gg) * (mumu + 1.0)) / (pow(1.0 + gg - 2.0 * mu * g, 1.5) * (2.0 + gg));

  for (int i = 0; i < 6; i++) {
    vec3 iPos = r0 + r * (iTime + iStep * 0.5);
    float iHeight = length(iPos) - rPlanet;
    float odStepRlh = exp(-iHeight / shRlh) * iStep;
    float odStepMie = exp(-iHeight / shMie) * iStep;
    iOdRlh += odStepRlh;
    iOdMie += odStepMie;
    float jStep = rsi(iPos, sun, rAtmos).y / 3.0;
    float jTime = 0.0;
    float jOdRlh = 0.0;
    float jOdMie = 0.0;
    for (int j = 0; j < 3; j++) {
      vec3 jPos = iPos + sun * (jTime + jStep * 0.5);
      float jHeight = length(jPos) - rPlanet;
      jOdRlh += exp(-jHeight / shRlh) * jStep;
      jOdMie += exp(-jHeight / shMie) * jStep;
      jTime += jStep;
    }
    vec3 attn = exp(-(kMie * (iOdMie + jOdMie) + kRlh * (iOdRlh + jOdRlh)));
    totalRlh += odStepRlh * attn;
    totalMie += odStepMie * attn;
    iTime += iStep;
  }
  return iSun * (pRlh * kRlh * totalRlh + pMie * kMie * totalMie);
}

// Cloud density on the projected plane; the detail field evolves in time.
float cloudDensity(vec2 wp, float cover, float detScale) {
  float coverage = fbm(wp * 0.35 + vec2(31.7, 11.3));
  float detail = fbm(wp * detScale + u_time * vec2(0.0045, -0.0018));
  float d = coverage * 0.72 + detail * 0.48;
  return smoothstep(cover, cover + 0.30, d);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;          // y: 0 bottom, 1 top
  float aspect = u_res.x / u_res.y;
  float fade = smoothstep(0.02, 0.36, uv.y);  // melt into the page ground
  float dither = (hash(gl_FragCoord.xy + u_time) - 0.5) / 160.0;

  // ── Camera: eye level, pitched 22° up, 52° vertical field. The bottom edge
  // sits a hair below the horizon (hidden by the fade), the top at ~48°.
  float pitch = radians(22.0);
  float f = 2.0 * tan(radians(26.0));
  vec2 ndc = (uv - 0.5) * vec2(aspect, 1.0);
  vec3 fwd = vec3(0.0, sin(pitch), cos(pitch));
  vec3 up = vec3(0.0, cos(pitch), -sin(pitch));
  vec3 dir = normalize(fwd + vec3(ndc.x * f, 0.0, 0.0) + up * (ndc.y * f));

  // ── Sky radiance (HDR) from the physics.
  vec3 sky = atmosphere(dir, u_sun, u_turb);

  // ── Twilight afterglow: with the sun just below the horizon the physics
  // (at 6 samples) under-delivers the rose/amber band that makes blue hour
  // blue hour. Add it explicitly, low on the horizon toward the sun's side.
  vec2 dxz = dir.xz / max(length(dir.xz), 1e-3);
  vec2 sxz = u_sun.xz / max(length(u_sun.xz), 1e-3);
  float toward = pow(max(dot(dxz, sxz), 0.0), 2.5);
  float twil = smoothstep(-0.30, -0.04, u_sun.y) * (1.0 - smoothstep(-0.04, 0.06, u_sun.y));
  sky += vec3(1.0, 0.42, 0.28) * 0.28 * twil * toward * exp(-max(dir.y, 0.0) * 7.0);

  // ── Night: airglow ambient + a soft moon glow (no disc).
  float nightW = 1.0 - smoothstep(-0.12, 0.02, u_sun.y);
  vec3 airglow = mix(vec3(0.050, 0.064, 0.105), vec3(0.010, 0.014, 0.030), smoothstep(0.0, 0.6, dir.y));
  float mdot = max(dot(dir, u_moon), 0.0);
  float moonGlow = pow(mdot, 48.0) * 0.55 + pow(mdot, 4.0) * 0.12;
  vec3 moonCol = vec3(0.72, 0.80, 1.0);
  sky += nightW * (airglow + moonGlow * moonCol);

  // ── Stars: sparse, tiny, warm/cool tinted, twinkling; only when the sun
  // is well down, only above the horizon haze, brightest around midnight.
  vec3 stars = vec3(0.0);
  float starW = nightW * u_stars * smoothstep(0.02, 0.25, dir.y);
  if (starW > 0.001) {
    for (int i = 0; i < 2; i++) {
      float scale = i == 0 ? 130.0 : 60.0;
      vec2 sc = uv * vec2(aspect, 1.0) * scale;
      vec2 cell = floor(sc);
      float h = hash(cell + float(i) * 91.7);
      vec2 sp = vec2(hash(cell + 17.1), hash(cell + 43.7));
      float d = length(fract(sc) - sp);
      float b = pow(h, 30.0) * smoothstep(0.09, 0.0, d);
      float tw = 0.72 + 0.28 * sin(u_time * (0.6 + h * 2.4) + h * 40.0);
      vec3 tint = mix(vec3(1.0, 0.88, 0.78), vec3(0.78, 0.88, 1.0), hash(cell + 7.7));
      stars += tint * (b * tw);
    }
    stars *= starW;
  }

  // ── Clouds: rays hit a layer above the camera; true perspective (near the
  // horizon the plane is far, the texture compresses). Two layers — far
  // bands and near wisps — for parallax depth.
  float dy = max(dir.y, 0.015);
  float tPlane = 1.0 / dy;
  vec2 wp = dir.xz * tPlane * 0.62;
  vec2 wind = vec2(u_time * 0.006, u_time * 0.0022) * u_wind;
  float lowW = 1.0 - smoothstep(0.06, 0.35, abs(u_sun.y));
  vec2 stretch = vec2(mix(1.0, 0.48, lowW), 1.0);   // low sun → long bands
  float horFade = smoothstep(0.0, 0.10, dir.y) * exp(-tPlane * 0.045);
  float dFar = cloudDensity((wp + wind) * stretch, u_cover, 1.35) * horFade;
  float dNear = cloudDensity(wp * 2.3 * stretch + wind * 2.4 + vec2(53.1, 7.9), u_cover + 0.16, 1.6)
              * horFade;

  // Light on the clouds: the sun while it is up (and just after — high
  // clouds catch it past sunset), the moon at night. Low light lights the
  // UNDERSIDES from the horizon side; high light lights the tops.
  vec3 light = u_sun.y > -0.10 ? u_sun : u_moon;
  vec2 lxz = light.xz / max(length(light.xz), 1e-3);
  vec2 offs = mix(vec2(0.0, -0.30), lxz * 0.55, lowW);
  float dFar2 = cloudDensity((wp + wind) * stretch + offs, u_cover, 1.35);
  float rim = clamp(dFar - dFar2, 0.0, 1.0);

  float se = u_sun.y;
  vec3 sunCol = mix(vec3(1.0, 0.42, 0.22), vec3(1.0, 0.96, 0.90), smoothstep(-0.02, 0.30, se));
  float sunI = smoothstep(-0.10, 0.06, se);
  vec3 moonLit = vec3(0.55, 0.62, 0.80) * 0.28 * nightW;
  vec3 litCol = sunCol * sunI * 1.5 + moonLit;
  // Fair-weather clouds are bright bodies with soft blue-grey undersides:
  // the sky fills their shadow side, and by day the sun's skylight adds more.
  float dayness = smoothstep(0.0, 0.25, se);
  vec3 ambient = sky * 0.7 + 0.02;
  vec3 shadowCol = ambient * 0.85 + litCol * 0.28 * dayness;
  vec3 cloud = mix(litCol, shadowCol, clamp(dFar * 0.95 - rim * 0.9, 0.0, 1.0));
  cloud = mix(cloud, litCol, rim * 0.85);

  vec3 col = sky;
  col = mix(col, cloud, clamp(dFar, 0.0, 1.0) * 0.86);
  col = mix(col, mix(cloud, litCol, 0.35), dNear * 0.45);
  col += litCol * rim * 0.35 * lowW;
  col += stars * (1.0 - dFar) * (1.0 - dNear);

  // ── Tone map (HDR → display) and theme grading.
  col = 1.0 - exp(-col * 1.7);
  col = pow(col, vec3(0.88));
  if (u_dark < 0.5) {
    // High-key haze lift so the black ink keeps contrast — stronger toward
    // the horizon, as real haze is. (Photographers put type on the pale sky.)
    float lift = 0.07 + 0.11 * (1.0 - smoothstep(0.0, 0.7, dir.y));
    col = mix(col, vec3(0.97, 0.98, 1.0), lift);
  }

  float alpha = clamp(fade + dither, 0.0, 1.0);
  gl_FragColor = vec4((col + dither) * alpha, alpha);
}
`

// ── The day's character curves (index = hour 0..24, linearly interpolated).
// Turbidity: clear cool mornings, hazier warmer afternoons. Cover threshold:
// higher = fewer clouds (thin veils at night, cumulus by afternoon, bands at
// dusk). Stars peak around midnight. Wind picks up through the afternoon.
const TURB = [0.55, 0.53, 0.50, 0.48, 0.46, 0.46, 0.48, 0.50, 0.54, 0.58, 0.62, 0.66, 0.70, 0.76, 0.84, 0.92, 0.95, 0.92, 0.86, 0.76, 0.68, 0.62, 0.58, 0.56, 0.55]
const COVER = [0.60, 0.61, 0.62, 0.62, 0.60, 0.57, 0.55, 0.56, 0.55, 0.54, 0.53, 0.52, 0.52, 0.51, 0.50, 0.50, 0.51, 0.51, 0.51, 0.52, 0.54, 0.56, 0.58, 0.60, 0.60]
const STARS = [1.00, 1.00, 1.00, 0.95, 0.80, 0.50, 0.20, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.15, 0.40, 0.70, 0.88, 0.95, 1.00, 1.00]
const WIND = [0.80, 0.78, 0.76, 0.76, 0.78, 0.82, 0.86, 0.92, 0.98, 1.05, 1.12, 1.18, 1.22, 1.26, 1.28, 1.26, 1.22, 1.15, 1.06, 0.98, 0.92, 0.88, 0.84, 0.82, 0.80]

function curve(table, hour) {
  const h = ((hour % 24) + 24) % 24
  const i = Math.floor(h)
  const t = h - i
  return table[i] * (1 - t) + table[i + 1] * t
}

// The sun's arc: elevation follows a solar day (up 06:00→18:00, 58° at
// noon). The viewer faces north with the sun behind them at noon; at
// sunrise/sunset it stands 60° off to the side — just OUTSIDE the camera's
// ±41° frame, so the disc is never seen but its forward-scatter glow floods
// the frame edge (the golden-hour drama). Azimuth span is ±120° rather than
// the true ±90°+ — a small cheat for that.
function sunDirection(hour) {
  const el = Math.sin(((hour - 6) / 12) * Math.PI) * (58 * Math.PI) / 180
  const az = Math.PI + ((hour - 12) / 12) * (120 * Math.PI) / 180 // from +z; +x = east
  const ce = Math.cos(el)
  return [Math.sin(az) * ce, Math.sin(el), Math.cos(az) * ce]
}

// Each theme rides its half of the day so the ink never lands on an
// illegible sky: light = sun ≥ +3° (06:12–17:48), dark = sun ≤ −3°
// (18:12–05:48). Outside its half a theme holds at the nearest edge — light
// mode at night shows the sunset/sunrise hold, dark mode by day the dusk/dawn.
function clampHourForTheme(hour, dark) {
  const h = ((hour % 24) + 24) % 24
  if (dark) {
    if (h > 5.8 && h < 18.2) return h < 12 ? 5.8 : 18.2
    return h
  }
  if (h < 6.2 || h > 17.8) return h < 12 ? 6.2 : 17.8
  return h
}

function SkyField({ mode = 'fixed', hour = null }) {
  const canvasRef = useRef(null)
  const glRef = useRef(null)
  const hourRef = useRef(hour)
  hourRef.current = hour

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
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('SkyField shader:', gl.getShaderInfoLog(s))
      }
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('SkyField link:', gl.getProgramInfoLog(prog))
      return undefined
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (name) => gl.getUniformLocation(prog, name)
    const uTime = u('u_time')
    const uRes = u('u_res')
    const uSun = u('u_sun')
    const uMoon = u('u_moon')
    const uTurb = u('u_turb')
    const uCover = u('u_cover')
    const uStars = u('u_stars')
    const uWind = u('u_wind')
    const uDark = u('u_dark')

    const isDark = () => document.documentElement.classList.contains('dark')

    const currentHour = () => {
      const dark = isDark()
      if (mode !== 'clock') return dark ? 1.5 : 13
      const now = new Date()
      const h = hourRef.current ?? now.getHours() + now.getMinutes() / 60
      return clampHourForTheme(h, dark)
    }

    const setDay = () => {
      const dark = isDark()
      const h = currentHour()
      const sun = sunDirection(h)
      // The moon rides opposite the sun (a full moon's geometry).
      gl.uniform3f(uSun, sun[0], sun[1], sun[2])
      gl.uniform3f(uMoon, -sun[0], -sun[1], -sun[2])
      gl.uniform1f(uTurb, curve(TURB, h))
      gl.uniform1f(uCover, curve(COVER, h))
      gl.uniform1f(uStars, curve(STARS, h))
      gl.uniform1f(uWind, curve(WIND, h))
      gl.uniform1f(uDark, dark ? 1 : 0)
    }

    let dprCap = 2
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap)
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
    let tick = 0
    let lastT = 0
    let slowFrames = 0
    let checked = 0

    const draw = () => {
      resize()
      setDay()
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    glRef.current = { draw }

    const frame = (t) => {
      // Half rAF rate: the drift is glacial, 30fps is indistinguishable.
      tick += 1
      if (tick % 2 === 0) draw()
      // Adaptive quality: if the device can't hold ~40fps for the first few
      // seconds, drop the DPR cap once (2 → 1.25 ≈ 2.5× fewer pixels).
      if (lastT && checked < 120) {
        checked += 1
        if (t - lastT > 25) slowFrames += 1
        if (checked === 120 && slowFrames > 40 && dprCap > 1.25) {
          dprCap = 1.25
          resize()
        }
      }
      lastT = t
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

    // Theme flips the sky between its day and night half, so redraw at once —
    // unconditionally. Gating this on `!running` left a paused canvas (tab
    // hidden, or scrolled offscreen) showing the previous theme's frame.
    const mo = new MutationObserver(() => {
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
      glRef.current = null
      // NOTE: deliberately NOT calling `WEBGL_lose_context.loseContext()` —
      // see the same note in Atmosphere.jsx. `getContext` hands back the SAME
      // context for a canvas React reuses, so losing it on cleanup made
      // StrictMode's dev double-mount re-init against a dead context (shader
      // compiles fail, info log null, canvas blank). This was exactly the
      // "sky doesn't render in dev" bug.
    }
  }, [mode])

  // Scrubber moves → redraw immediately (also covers the paused/reduced case).
  useEffect(() => {
    glRef.current?.draw()
  }, [hour])

  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}

export default SkyField
