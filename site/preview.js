// Small independent WebGL host for the collection's actual ring/content GLSL.
// This is a visual study, not an implementation of either compositor renderer.
const WIDTH = 720, HEIGHT = 470;
const vertex = 'attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}';
const host = `precision highp float;
uniform float niri_time;
uniform float niri_scale;
uniform vec2 niri_size;
uniform vec2 ring_size;
uniform vec4 ring_radius;
uniform float ring_width;
uniform float ring_padding;
uniform sampler2D bh_sample;
vec4 tex2D_screen(vec2 uv) { return texture2D(bh_sample, clamp(uv, 0.0, 1.0)); }
float ring_distance(vec2 p) {
    vec2 halfSize = ring_size * 0.5;
    vec2 q = abs(p - halfSize) - halfSize + vec2(ring_radius.x);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - ring_radius.x;
}
`;

function sampleWindow() {
  const c = document.createElement('canvas'); c.width = 480; c.height = 300;
  const x = c.getContext('2d');
  x.fillStyle = '#242a25'; x.fillRect(0, 0, 480, 300);
  x.fillStyle = '#30372f'; x.fillRect(0, 0, 480, 33);
  ['#e2a394', '#dec790', '#a9c48c'].forEach((colour, i) => {
    x.fillStyle = colour; x.beginPath(); x.arc(16 + i * 14, 17, 3.3, 0, Math.PI * 2); x.fill();
  });
  x.font = '10px monospace'; x.fillStyle = '#afb6a7'; x.fillText('a small window into something else', 112, 21);
  x.fillStyle = '#d5f496'; x.font = '13px monospace'; x.fillText('barrulus ~ $ make it yours', 28, 70);
  x.fillStyle = '#e9eee0'; x.font = '28px Georgia'; x.fillText('Room for a little wonder.', 28, 122);
  x.font = '12px monospace'; x.fillStyle = '#a9b29f';
  ['A living edge. A wandering spark.', 'An ordinary window, reimagined.', '', 'Edit the source. Change the mood.', 'There is no single right way.'].forEach((s, i) => x.fillText(s, 28, 156 + i * 22));
  x.fillStyle = '#d5f496'; x.fillRect(28, 276, 8, 2);
  return c;
}

export class ShaderPreview {
  constructor() {
    this.canvas = document.createElement('canvas'); this.canvas.width = WIDTH; this.canvas.height = HEIGHT;
    this.gl = this.canvas.getContext('webgl', { alpha: false, antialias: false, preserveDrawingBuffer: true });
    this.programs = new Map();
    if (!this.gl) return;
    const gl = this.gl;
    this.buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sampleWindow());
  }

  async prepare(spec) {
    if (!this.gl) throw new Error('WebGL is unavailable in this browser.');
    const key = JSON.stringify(spec);
    if (this.programs.has(key)) return this.programs.get(key);
    const pending = this.compile(spec);
    this.programs.set(key, pending);
    return pending;
  }

  async compile(spec) {
    const response = await fetch('shaders/' + spec.source);
    if (!response.ok) throw new Error('Preview source could not be loaded.');
    const source = await response.text();
    const expression = spec.kind === 'ring' ? 'ring_color(p)' : 'global_color(vec3(p / ring_size, 1.0))';
    const inside = spec.kind === 'ring' && !spec.inside ? 'if(d < 0.0) art = vec4(0.0);' : '';
    const body = `void main() {
      vec2 pixel = vec2(gl_FragCoord.x, ${HEIGHT}.0 - gl_FragCoord.y);
      vec2 p = pixel - vec2(120.0, 85.0);
      float d = ring_distance(p);
      float radial = length((pixel - vec2(360.0,235.0)) / vec2(500.0,350.0));
      vec3 background = mix(vec3(0.15,0.19,0.13),vec3(0.095,0.11,0.087),clamp(radial,0.0,1.0));
      background *= 1.0 - 0.3 * exp(-max(d,0.0)/18.0);
      vec4 base = d < 0.0 ? tex2D_screen(p / ring_size) : vec4(background,1.0);
      vec4 art = vec4(0.0);
      if (${spec.kind === 'ring' ? 'd < ring_width + ring_padding + 1.0' : 'd < 0.0'}) art = ${expression};
      ${inside}
      gl_FragColor = vec4(mix(base.rgb, art.rgb, clamp(art.a,0.0,1.0)),1.0);
    }`;
    const gl = this.gl;
    const compile = (type, text) => {
      const shader = gl.createShader(type); gl.shaderSource(shader, text); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader); gl.deleteShader(shader); throw new Error(message);
      }
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, vertex);
    let fs;
    try { fs = compile(gl.FRAGMENT_SHADER, host + source + body); }
    catch (error) { gl.deleteShader(vs); throw error; }
    const program = gl.createProgram(); gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program); gl.deleteProgram(program); throw new Error(message);
    }
    return { program, spec };
  }

  draw(prepared, time, target) {
    const gl = this.gl, {program, spec} = prepared;
    gl.useProgram(program); gl.viewport(0, 0, WIDTH, HEIGHT);
    const pos = gl.getAttribLocation(program, 'position');
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const loc = name => gl.getUniformLocation(program, name);
    gl.uniform1f(loc('niri_time'), time); gl.uniform1f(loc('niri_scale'), 1);
    gl.uniform2f(loc('niri_size'), 480, 300); gl.uniform2f(loc('ring_size'), 480, 300);
    gl.uniform4f(loc('ring_radius'), 8, 8, 8, 8); gl.uniform1f(loc('ring_width'), 6);
    gl.uniform1f(loc('ring_padding'), spec.padding || 0); gl.uniform1i(loc('bh_sample'), 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    if (target) target.getContext('2d').drawImage(this.canvas, 0, 0, target.width, target.height);
    return this.canvas;
  }
}
