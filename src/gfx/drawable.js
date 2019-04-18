
class Sprite{

    constructor(texture_handle,frames,strips){
        this.texture = texture_handle;
        this.vertex_buffer = gl.createBuffer();
        this.texcoord_buffer = gl.createBuffer();

        var sprite_width = texture_handle.width/frames;
        var sprite_height = texture_handle.height/strips;
        this.frame=0;
        this.strip=0;
        this.max_frames=frames;
        this.max_strips=strips;
        this.sprite_width = this.texture.texture_w/this.max_frames;
        this.sprite_height = this.texture.texture_h/this.max_strips;

        var verts = new Float32Array([
			-sprite_width/2.0,	0,				0,
			sprite_width/2.0,	0,				0,
			sprite_width/2.0,	sprite_height,	0,
			sprite_width/2.0,	sprite_height,	0,
			-sprite_width/2.0,	sprite_height,	0,
			-sprite_width/2.0,	0,				0
        ]);
        var texcoords = new Float32Array([
			0.005,0.995,
			0.995,0.995,
			0.995,0.005,
			0.995,0.005,
			0.005,0.005,
			0.005,0.995
        ]);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,verts,gl.STATIC_DRAW);

        
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
            this.texture.texture_x+(this.sprite_width*this.frame),
            this.texture.texture_y+(this.sprite_height*this.strip),
            this.sprite_width,
            this.sprite_height]);
        gl.uniform4fv(shader.TEXTURE_LOCATION,tex_location);

        var color = [1,1,1,1];
        gl.uniform4fv(shader.COLOR,color);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.vertexAttribPointer(shader.VERTICES,3,gl.FLOAT,false,0,0);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
        gl.vertexAttribPointer(shader.TEXCOORDS,2,gl.FLOAT,false,0,0);

        gl.drawArrays(gl.TRIANGLES,0,6);
    }

}