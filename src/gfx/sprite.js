
class Sprite{

    constructor(texture_handle,frame,strip,offset_x,offset_y){

        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = 0.0;
        this.frame=0;
        this.strip=0;

        if(frame != null && strip  != null){
            this.frame=frame;
            this.strip=strip;
        }

        this.scale = new Vec3(1,1,1);
        this.hide=false;
        this.texture = texture_handle;
        this.vertex_buffer = gl.createBuffer();
        this.texcoord_buffer = gl.createBuffer();

        var x = 0.0;
        var y = 0.0;
        var w = this.texture.width/2.0;
        var h = this.texture.height/2.0;
        if(offset_x != null){x=offset_x}
        if(offset_y != null){y=offset_y}
       
        var verts = new Float32Array([
			-w-x,-h-y, 0,
			 w-x,-h-y, 0,
			 w-x, h-y, 0,
			 w-x, h-y, 0,
			-w-x, h-y, 0,
			-w-x,-h-y, 0
        ]);

        //offset texcoords by a half pixel inwards
        var hpx = 0.5/texture_handle.width;
        var hpy = 0.5/texture_handle.height;

        var texcoords = new Float32Array([
			hpx,    1-hpy,
			1-hpx,  1-hpy,
			1-hpx,  hpy,
			1-hpx,  hpy,
			hpx,    hpy,
			hpx,    1-hpy
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

    Unload(){
        gl.deleteArrays(this.vertex_buffer);
        gl.deleteArrays(this.texcoord_buffer);
    }
}