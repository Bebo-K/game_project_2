
function Primitive_Draw(shader,modelview_matrix,projection_matrix){
        var local_space = modelview_matrix.Copy();
        local_space.TransformToSpace(this);

        gl.uniformMatrix4fv(shader.MODELVIEW_MATRIX,false,local_space.Get(true));
        gl.uniformMatrix4fv(shader.PROJECTION_MATRIX,false,projection_matrix.Get(true));

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,this.texture.gl_id);
        gl.uniform1i(shader.TEXTURE_0,0);

        var tex_location = new Float32Array([
            this.texture.texture_x,
            this.texture.texture_y,
            this.texture.texture_w,
            this.texture.texture_h]);
        gl.uniform4fv(shader.TEXTURE_LOCATION,tex_location);

        var color = [1,1,1,1];
        gl.uniform4fv(shader.COLOR,color);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.vertexAttribPointer(shader.VERTICES,3,gl.FLOAT,false,0,0);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
        gl.vertexAttribPointer(shader.TEXCOORDS,2,gl.FLOAT,false,0,0);

        gl.drawArrays(gl.TRIANGLES,0,6);
    }
function Primitive_Unload(){
    gl.deleteBuffer(this.vertex_buffer);
    gl.deleteBuffer(this.texcoord_buffer);
}

class CylinderPrimitive{

    constructor(height,radius,texture_handle){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = new Vec3();
        this.scale = new Vec3();
        
        this.texture = texture_handle;
        this.vertex_buffer = gl.createBuffer();
        this.texcoord_buffer = gl.createBuffer();

        this.radius = radius;
        this.height = height;

        const rings = 8;
        var verts = [];
        var tex_coords = [];
        var theta1,theta2;
        var fraction1,fraction2;

        for(var i=0;i<rings;i++){
            theta1 = (fraction1*Math.PI*2.0);   
            theta2 = (fraction2*Math.PI*2.0);
            fraction1 = i/rings * 1.0; 
            fraction2 = (i+1.0)/rings;
            
            //side quad
            verts.push(radius*Math.cos(theta1),0,radius*Math.sin(theta1));
            tex_coords.push(fraction1,0.25);
            verts.push(radius*Math.cos(theta1),height,radius*Math.sin(theta1));
            tex_coords.push(fraction1,1.0);
            verts.push(radius*Math.cos(theta2),height,radius*Math.sin(theta1));
            tex_coords.push(fraction2,1.0);

            verts.push(radius*Math.cos(theta2),height,radius*Math.sin(theta1));
            tex_coords.push(fraction2,1.0);
            verts.push(radius*Math.cos(theta2),0,radius*Math.sin(theta1));
            tex_coords.push(fraction2,0.25);
            verts.push(radius*Math.cos(theta1),0,radius*Math.sin(theta1));
            tex_coords.push(fraction1,0.25);

            //cap top
            verts.push(radius*Math.cos(theta1),height,radius*Math.cos(theta1));
            tex_coords.push(0.25 + 0.25*Math.cos(theta1),0.25 + 0.25*Math.sin(theta1));
            verts.push(radius*Math.cos(theta2),height,radius*Math.cos(theta2));
            tex_coords.push(0.25 + 0.25*Math.cos(theta2),0.25 + 0.25*Math.sin(theta2));
            verts.push(0,height,0);
            tex_coords.push(0.25,0.25);

            //cap bottom
            verts.push(radius*Math.cos(theta1),0,radius*Math.cos(theta1));
            tex_coords.push(0.75 + 0.25*Math.cos(theta1),0.25 + 0.25*Math.sin(theta1));
            verts.push(radius*Math.cos(theta2),0,radius*Math.cos(theta2));
            tex_coords.push(0.75 + 0.25*Math.cos(theta2),0.25 + 0.25*Math.sin(theta2));
            verts.push(0,0,0);
            tex_coords.push(0.75,0.25);
        }
        
        var vertices = Float32Array.from(verts);
        var texture_coords = Float32Array.from(tex_coords);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,texture_coords,gl.STATIC_DRAW);
    }
}
CylinderPrimitive.prototype.Draw = Primitive_Draw;
CylinderPrimitive.prototype.Unload = Primitive_Unload;