
class Sprite{

    constructor(texture_handle,frame,strip,offset){

        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.frame=0;
        this.strip=0;
        if(frame != null && strip  != null){
            this.frame=frame;
            this.strip=strip;
        }
        this.rotation = new Vec3(0,0,0);
        this.scale = new Vec3(1,1,1);
        this.hide=false;

        this.texture = texture_handle;
        this.vertex_buffer = gl.createBuffer();
        this.texcoord_buffer = gl.createBuffer();

        var sprite_width = texture_handle.width/this.frames;
        var sprite_height = texture_handle.height/this.strips;



        var offset_x = 0;
        var offset_y = 0;
        var offset_z = 0;
        if(offset != null){
            offset_x = offset.x;
            offset_y = offset.y;
            offset_z = offset.z;
        }

        var sprite_width = this.texture.width;
        var sprite_height = this.texture.height;


        var verts = new Float32Array([
			-sprite_width/2.0-offset_x,	-sprite_height/2.0-offset_y,    -offset_z,
			 sprite_width/2.0-offset_x,	-sprite_height/2.0-offset_y,    -offset_z,
			 sprite_width/2.0-offset_x,	sprite_height/2.0-offset_y,     -offset_z,
			 sprite_width/2.0-offset_x,	sprite_height/2.0-offset_y,     -offset_z,
			-sprite_width/2.0-offset_x,	sprite_height/2.0-offset_y,     -offset_z,
			-sprite_width/2.0-offset_x,	-sprite_height/2.0-offset_y,    -offset_z
        ]);

        var half_px_x = 0.2/texture_handle.width;
        var half_px_y = 0.2/texture_handle.height;

        var texcoords = new Float32Array([
			half_px_x,1-half_px_y,
			1-half_px_x,1-half_px_y,
			1-half_px_x ,half_px_y,
			1-half_px_x,half_px_y,
			half_px_x,half_px_y,
			half_px_x,1-half_px_y
        ]);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,verts,gl.STATIC_DRAW);
    
        gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,texcoords,gl.STATIC_DRAW);
    }

    Draw(camera,modelview_matrix,projection_matrix){
        var local_space = modelview_matrix.Copy();
        local_space.TransformToSpace(this);

        gl.uniformMatrix4fv(camera.shader.MODELVIEW_MATRIX,false,local_space.Get(true));
        gl.uniformMatrix4fv(camera.shader.PROJECTION_MATRIX,false,projection_matrix.Get(true));

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,this.texture.gl_id);
        gl.uniform1i(camera.shader.TEXTURE_0,0);

        var tex_location = new Float32Array([
            this.texture.texture_x+(this.texture.texture_w*this.frame),
            this.texture.texture_y+(this.texture.texture_h*this.strip),
            this.texture.texture_w,
            this.texture.texture_h]);
        gl.uniform4fv(camera.shader.TEXTURE_LOCATION,tex_location);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.vertexAttribPointer(camera.shader.VERTICES,3,gl.FLOAT,false,0,0);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
        gl.vertexAttribPointer(camera.shader.TEXCOORDS,2,gl.FLOAT,false,0,0);

        gl.drawArrays(gl.TRIANGLES,0,6);
    }
}
Sprite.prototype.Unload = Primitive_Unload;