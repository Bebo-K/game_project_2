

const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;

class TileType{

    constructor(name,side_frame,side_strip,cap_frame,cap_strip,solid){
        this.name=name;
        this.side_frame = side_frame;
        this.side_strip = side_strip;
        this.cap_frame = cap_frame;
        this.cap_strip = cap_strip;
        this.solid = solid;
    }

}

class TileManager{

    constructor(texture, max_frames,max_strips){
        this.texture = texture;
        this.max_frames=max_frames;
        this.max_strips=max_strips;
        var w = TILE_WIDTH/2;
        var h = TILE_HEIGHT/2;
        this.frame_w = this.texture.texture_w/this.max_frames;
        this.frame_h = this.texture.texture_h/this.max_strips;
    
        var cap_verts = new Float32Array([
            -w,  h, -w,   w,  h, -w,   w,  h,  w,    w,  h,  w,  -w,  h,  w,  -w,  h, -w,//Top
            -w, -h, -w,   w, -h, -w,   w, -h,  w,    w, -h,  w,  -w, -h,  w,  -w, -h, -w//Bottom
        ]);
        var side_verts = new Float32Array([
            -w, -h,  w,   w, -h,  w,   w,  h,  w,    w,  h,  w,  -w,  h,  w,  -w, -h,  w,//Front
            -w, -h, -w,   w, -h, -w,   w,  h, -w,    w,  h, -w,  -w,  h, -w,  -w, -h, -w,//Back
            -w, -h, -w,  -w, -h,  w,  -w,  h,  w,   -w,  h,  w,  -w,  h, -w,  -w, -h, -w,//Left
             w, -h, -w,   w, -h,  w,   w,  h,  w,    w,  h,  w,   w,  h, -w,   w, -h, -w //Right
        ]);

        var cap_texcoords = new Float32Array([
            0.005,0.995, 0.995,0.995, 0.995,0.005,  0.995,0.005, 0.005,0.005, 0.005,0.995,
            0.005,0.995, 0.995,0.995, 0.995,0.005,  0.995,0.005, 0.005,0.005, 0.005,0.995,
        ]);
        var side_texcoords = new Float32Array([
            0.005,0.995, 0.995,0.995, 0.995,0.005,  0.995,0.005, 0.005,0.005, 0.005,0.995,
            0.005,0.995, 0.995,0.995, 0.995,0.005,  0.995,0.005, 0.005,0.005, 0.005,0.995,
            0.005,0.995, 0.995,0.995, 0.995,0.005,  0.995,0.005, 0.005,0.005, 0.005,0.995,
            0.005,0.995, 0.995,0.995, 0.995,0.005,  0.995,0.005, 0.005,0.005, 0.005,0.995,
        ]);
    
        this.cap_vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,this.cap_vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,cap_verts,gl.STATIC_DRAW);
    
        this.cap_texcoord_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,this.cap_texcoord_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,cap_texcoords,gl.STATIC_DRAW);

        this.side_vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,this.side_vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,side_verts,gl.STATIC_DRAW);
    
        this.side_texcoord_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,this.side_texcoord_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,side_texcoords,gl.STATIC_DRAW);
    }
    
    DrawTile(type,shader,modelview_matrix,projection_matrix){
        if(type === null)return;
        gl.uniformMatrix4fv(shader.MODELVIEW_MATRIX,false,modelview_matrix.Get(true));
        gl.uniformMatrix4fv(shader.PROJECTION_MATRIX,false,projection_matrix.Get(true));
    
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,this.texture.gl_id);
        gl.uniform1i(shader.TEXTURE_0,0);
    
        var color = [1,1,1,1];
        gl.uniform4fv(shader.COLOR,color);
    
        var tex_location = new Float32Array([
            this.texture.texture_x+(this.frame_w*type.side_frame),
            this.texture.texture_y+(this.frame_h*type.side_strip),
            this.frame_w,
            this.frame_h]);
        gl.uniform4fv(shader.TEXTURE_LOCATION,tex_location);
    
        gl.bindBuffer(gl.ARRAY_BUFFER,this.side_vertex_buffer);
        gl.vertexAttribPointer(shader.VERTICES,3,gl.FLOAT,false,0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER,this.side_texcoord_buffer);
        gl.vertexAttribPointer(shader.TEXCOORDS,2,gl.FLOAT,false,0,0);
        gl.drawArrays(gl.TRIANGLES,0,24);
        
    
        tex_location[0] = this.texture.texture_x+(this.frame_w*type.cap_frame);
        tex_location[1] = this.texture.texture_y+(this.frame_h*type.cap_strip);
        gl.uniform4fv(shader.TEXTURE_LOCATION,tex_location);
    
        gl.bindBuffer(gl.ARRAY_BUFFER,this.cap_vertex_buffer);
        gl.vertexAttribPointer(shader.VERTICES,3,gl.FLOAT,false,0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER,this.cap_texcoord_buffer);
        gl.vertexAttribPointer(shader.TEXCOORDS,2,gl.FLOAT,false,0,0);
        gl.drawArrays(gl.TRIANGLES,0,12);
    }
}




