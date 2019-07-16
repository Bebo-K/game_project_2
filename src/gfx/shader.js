
const vert_program_string = `
precision mediump float;

uniform mat4 projection_matrix;
uniform mat4 modelview_matrix;

attribute vec3 a_vertex;
attribute vec2 a_tex_coord;
varying vec2 tex_coord;

void main(void)
{
  vec4 world_pos = modelview_matrix * vec4(a_vertex, 1.0);
  gl_Position = projection_matrix * world_pos;
  tex_coord = a_tex_coord;
}
`

const frag_program_string = `
precision mediump float;

uniform sampler2D texture0;
uniform vec4 texture_location;
uniform vec4 color;

varying vec2 tex_coord;

void main(void) {
  vec2 coord =  tex_coord*texture_location.zw + texture_location.xy;
  gl_FragColor  = color*texture2D(texture0, coord,0.0);
}`

class Shader{

    constructor(){
        var vert_program = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vert_program,vert_program_string);

        var frag_program = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(frag_program,frag_program_string);

        gl.compileShader(vert_program);
        var compiled = gl.getShaderParameter(vert_program, gl.COMPILE_STATUS);
        if (!compiled) {
          var errors = gl.getShaderInfoLog(vert_program);
          console.log('Failed to compile vertex shader with these errors:' + errors);
          gl.deleteShader(vert_program);
          return null;
        }

        gl.compileShader(frag_program);
        compiled = gl.getShaderParameter(frag_program, gl.COMPILE_STATUS);
        if (!compiled) {
          var errors = gl.getShaderInfoLog(frag_program);
          console.log('Failed to compile fragment shader with these errors:' + errors);
          gl.deleteShader(frag_program);
          return null;
        }

        var shader_program = gl.createProgram();
        gl.attachShader(shader_program,vert_program);
        gl.attachShader(shader_program,frag_program);
        gl.linkProgram(shader_program);

        var linked = gl.getProgramParameter(shader_program, gl.LINK_STATUS);
        if (!linked) {
          var errors = gl.getProgramInfoLog(shader_program);
          console.log('Failed to link shader program with these errors:' + errors);
          gl.deleteProgram(shader_program);
          gl.deleteShader(vert_program);
          gl.deleteShader(frag_program);
          return null;
        }

        this.VERTICES = gl.getAttribLocation(shader_program, "a_vertex");
        this.TEXCOORDS = gl.getAttribLocation(shader_program, "a_tex_coord");


        this.MODELVIEW_MATRIX = gl.getUniformLocation(shader_program,"modelview_matrix");
        this.PROJECTION_MATRIX = gl.getUniformLocation(shader_program, "projection_matrix");
        this.TEXTURE0 = gl.getUniformLocation(shader_program, "texture0");
        this.TEXTURE_LOCATION = gl.getUniformLocation(shader_program, "texture_location");
        this.COLOR = gl.getUniformLocation(shader_program, "color");

        this.shader_program = shader_program;
        this.vert_program = vert_program;
        this.frag_program = frag_program;
    }

    Use(){
        gl.useProgram(this.shader_program);
    }

    Delete(){
        gl.deleteProgram(shader_program);
        gl.deleteShader(vert_program);
        gl.deleteShader(frag_program);
    }
}

