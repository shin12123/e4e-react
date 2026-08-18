import { useEffect, useRef } from "react";

// Adapted from the zero-dependency Electric Aura component by serafimcloud on 21st.dev.
const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + vec2(7.4, 2.8);
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
      / min(u_resolution.x, u_resolution.y);
    float time = u_time * 0.12;
    float field = fbm(p * 2.15 + vec2(time * 0.09, -time * 0.06));
    float contourValue = fract((field + p.y * 0.08) * 7.0);
    float contours = 1.0 - smoothstep(0.46, 0.50, abs(contourValue - 0.5));
    float signal = exp(-11.0 * abs(p.y + 0.12 * sin(p.x * 2.4 + time) - (field - 0.5) * 0.17));
    float halo = exp(-3.8 * length(vec2(p.x * 0.82, p.y + 0.02)));

    vec3 ink = vec3(0.018, 0.024, 0.020);
    vec3 graphite = vec3(0.075, 0.095, 0.082);
    vec3 lime = vec3(0.48, 0.72, 0.27);
    vec3 color = ink + graphite * (0.18 + field * 0.68);
    color += graphite * contours * 0.12;
    color += lime * signal * 0.10;
    color += lime * halo * 0.035;

    float gridX = smoothstep(0.997, 1.0, sin((uv.x + field * 0.006) * 48.0));
    float gridY = smoothstep(0.998, 1.0, sin((uv.y - field * 0.004) * 36.0));
    color += graphite * (gridX + gridY) * 0.055;

    float vignette = smoothstep(0.90, 0.25, length(uv - 0.5));
    color *= 0.52 + vignette * 0.72;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ElectricAura({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return undefined;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return undefined;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.useProgram(program);

    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "u_resolution");
    const time = gl.getUniformLocation(program, "u_time");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    let frame = 0;
    let inView = true;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      const width = Math.max(1, Math.round(bounds.width * dpr));
      const height = Math.max(1, Math.round(bounds.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (now) => {
      frame = 0;
      if (!inView || document.hidden) return;
      resize();
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, reduceMotion ? 0 : (now - startedAt) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const requestDraw = () => {
      if (!frame && inView && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(requestDraw);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView) requestDraw();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", requestDraw);
    requestDraw();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", requestDraw);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
