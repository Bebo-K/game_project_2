

const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;

class TileType{

    constructor(build_tile_func,draw_tile_func,collide_tile_func){
        this.Build = build_tile_func;
        this.Draw = draw_tile_func;
        this.Collide = collide_tile_func;
    }

}


buildTile(){
    this.frame=12;
    this.strip=1;
    this.max_frames=14;
    this.max_strips=8;
    var w = this.texture.width/(2*this.max_frames);
    var h = this.texture.height/(2*this.max_strips);

    var verts = new Float32Array([
        -w, -h, w,    //Front
         w, -h, w,
         w,  h, w,
         w,  h, w,
        -w,  h, w,
        -w, -h, w,

        -w, -h, -w,    //Back
         w, -h, -w,
         w,  h, -w,
         w,  h, -w,
        -w,  h, -w,
        -w, -h, -w,

        -w,  h, -w,    //Top
         w,  h, -w,
         w,  h,  w,
         w,  h,  w,
        -w,  h,  w,
        -w,  h, -w,

        -w, -h, -w,    //Bottom
         w, -h, -w,
         w, -h,  w,
         w, -h,  w,
        -w, -h,  w,
        -w, -h, -w,

        -w, -h, -w,    //Left
        -w,  h, -w,
        -w,  h,  w,
        -w,  h,  w,
        -w, -h,  w,
        -w, -h, -w,

         w, -h, -w,    //Right
         w,  h, -w,
         w,  h,  w,
         w,  h,  w,
         w, -h,  w,
         w, -h, -w,
    ]);

    this.texture_tile_width = this.texture.texture_w/this.max_frames;
    this.texture_tile_height = this.texture.texture_h/this.max_strips;

    var texcoords = new Float32Array([
        0.005,0.995,
        0.995,0.995,
        0.995,0.005,
        0.995,0.005,
        0.005,0.005,
        0.005,0.995,
        
        0.005,0.995,
        0.995,0.995,
        0.995,0.005,
        0.995,0.005,
        0.005,0.005,
        0.005,0.995,
        
        0.005,0.995,
        0.995,0.995,
        0.995,0.005,
        0.995,0.005,
        0.005,0.005,
        0.005,0.995,
        
        0.005,0.995,
        0.995,0.995,
        0.995,0.005,
        0.995,0.005,
        0.005,0.005,
        0.005,0.995,
        
        0.005,0.995,
        0.995,0.995,
        0.995,0.005,
        0.995,0.005,
        0.005,0.005,
        0.005,0.995,
        
        0.005,0.995,
        0.995,0.995,
        0.995,0.005,
        0.995,0.005,
        0.005,0.005,
        0.005,0.995
    ]);

    this.vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER,verts,gl.STATIC_DRAW);

    this.texcoord_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
    gl.bufferData(gl.ARRAY_BUFFER,texcoords,gl.STATIC_DRAW);
}

    Draw(shader,modelview_matrix,projection_matrix){

        gl.uniformMatrix4fv(shader.MODELVIEW_MATRIX,false,modelview_matrix.Get(true));
        gl.uniformMatrix4fv(shader.PROJECTION_MATRIX,false,projection_matrix.Get(true));

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,this.texture.gl_id);
        gl.uniform1i(shader.TEXTURE_0,0);

        var tex_location = new Float32Array([
            this.texture.texture_x+(this.texture_tile_width*this.frame),
            this.texture.texture_y+(this.texture_tile_height*this.strip),
            this.texture_tile_width,
            this.texture_tile_height]);
        gl.uniform4fv(shader.TEXTURE_LOCATION,tex_location);

        var color = [1,1,1,1];
        gl.uniform4fv(shader.COLOR,color);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.vertexAttribPointer(shader.VERTICES,3,gl.FLOAT,false,0,0);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
        gl.vertexAttribPointer(shader.TEXCOORDS,2,gl.FLOAT,false,0,0);

        gl.drawArrays(gl.TRIANGLES,0,36);
    }

