// GLSL for the hero ShaderBackground — a calm "gradient-grid" mesh: four colour
// points on a 2×2 grid drift slowly and blend (soft, premium, non-disturbing).
// Recreated from scratch (no dependency / watermark). Colours arrive in linear
// space from the JS side; blending in linear space keeps mid-tones clean.

export const VERT_SRC = /* glsl */ `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

export const FRAG_SRC = /* glsl */ `
  precision highp float;

  uniform vec2  u_resolution;
  uniform float u_time;     // seconds
  uniform float u_speed;    // master tempo (kept very low for calm motion)
  uniform vec3  u_color0;   // top-left
  uniform vec3  u_color1;   // top-right
  uniform vec3  u_color2;   // bottom-left
  uniform vec3  u_color3;   // bottom-right

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float a = u_resolution.x / u_resolution.y;
    vec2 p = vec2(uv.x * a, uv.y);
    float t = u_time * u_speed;

    // 2×2 grid of colour points, each drifting on a slow, gentle orbit.
    vec2 p0 = vec2(0.28 * a, 0.28) + 0.10 * vec2(sin(t * 0.70), cos(t * 0.62));
    vec2 p1 = vec2(0.74 * a, 0.32) + 0.10 * vec2(cos(t * 0.54), sin(t * 0.81));
    vec2 p2 = vec2(0.30 * a, 0.76) + 0.10 * vec2(sin(t * 0.61 + 1.0), cos(t * 0.73 + 2.0));
    vec2 p3 = vec2(0.76 * a, 0.74) + 0.10 * vec2(cos(t * 0.83 + 1.5), sin(t * 0.50 + 0.5));

    // Gaussian weights → soft, organic blending between the grid points.
    float k = 4.5;
    float w0 = exp(-dot(p - p0, p - p0) * k);
    float w1 = exp(-dot(p - p1, p - p1) * k);
    float w2 = exp(-dot(p - p2, p - p2) * k);
    float w3 = exp(-dot(p - p3, p - p3) * k);
    float ws = w0 + w1 + w2 + w3 + 0.0001;

    vec3 col = (u_color0 * w0 + u_color1 * w1 + u_color2 * w2 + u_color3 * w3) / ws;

    // Soft vignette + dithering (kills banding on dark gradients).
    float vig = smoothstep(1.3, 0.35, length(uv - 0.5));
    col *= mix(0.92, 1.0, vig);
    col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

    gl_FragColor = vec4(col, 1.0);
  }
`
