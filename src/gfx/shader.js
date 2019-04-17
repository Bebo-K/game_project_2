
class Shader{

    constructor(){
        var vert_program = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vert_program,document.getElementById("dev_vertex_shader").text);

        var frag_program = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(frag_program,document.getElementById("dev_fragment_shader").text);

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

