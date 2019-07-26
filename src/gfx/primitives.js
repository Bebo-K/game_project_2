
function Primitive_Draw(shader,modelview_matrix,projection_matrix){
        var local_space = modelview_matrix.Copy();
        local_space.TransformToSpace(this);

        gl.uniformMatrix4fv(shader.MODELVIEW_MATRIX,false,local_space.Get(false));
        gl.uniformMatrix4fv(shader.PROJECTION_MATRIX,false,projection_matrix.Get(false));

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

        //gl.drawArrays(gl.TRIANGLES,0,this.vert_count);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
        gl.drawElements(gl.TRIANGLES, this.index_count, gl.UNSIGNED_SHORT, 0);
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
        this.rotation = new Vec3(0,0,0);
        this.scale = new Vec3(1,1,1);
        
        this.texture = texture_handle;
        this.vertex_buffer = gl.createBuffer();
        this.texcoord_buffer = gl.createBuffer();

        this.radius = radius*1.0;
        this.height = height*1.0;

        const rings = 12;
        var verts = [];
        var tex_coords = [];
        var theta1, theta2;
        var fraction1,fraction2;

        this.vert_count =  rings*12;

        for(var i=0;i< rings;i++){ 
            fraction1 = i/rings; 
            fraction2 = (i+1.0)/rings;
            theta1 = Math.PI *2 * fraction1;//;   
            theta2 = Math.PI *2 * fraction2;//;  
            
            var cos1 = Math.cos(theta1);
            var sin1 = Math.sin(theta1);
            var cos2 = Math.cos(theta2);
            var sin2 = Math.sin(theta2);
            
            //side quad
            verts.push(radius*cos1,0,radius*sin1);
            tex_coords.push(fraction1,0.25);
            verts.push(radius*cos1,height,radius*sin1);
            tex_coords.push(fraction1,1.0);
            verts.push(radius*cos2,height,radius*sin2);
            tex_coords.push(fraction2,1.0);

            verts.push(radius*cos2,height,radius*sin2);
            tex_coords.push(fraction2,1.0);
            verts.push(radius*cos2,0,radius*sin2);
            tex_coords.push(fraction2,0.25);
            verts.push(radius*cos1,0,radius*sin1);
            tex_coords.push(fraction1,0.25);

            //cap top
            verts.push(radius*cos1,height,radius*sin1);
            tex_coords.push(0.25 + 0.25*cos1,0.25 + 0.25*sin1);
            verts.push(radius*cos2,height,radius*sin2);
            tex_coords.push(0.25 + 0.25*cos2,0.25 + 0.25*sin2);
            verts.push(0,height,0);
            tex_coords.push(0.25,0.25);

            //cap bottom
            verts.push(radius*cos1,0,radius*sin1);
            tex_coords.push(0.75 + 0.25*cos1,0.25 + 0.25*sin1);
            verts.push(radius*cos2,0,radius*sin2);
            tex_coords.push(0.75 + 0.25*cos2,0.25 + 0.25*sin2);
            verts.push(0,0,0);
            tex_coords.push(0.75,0.25);
        }
        
        
        this.vertices = Float32Array.from(verts);
        this.texture_coords = Float32Array.from(tex_coords);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.vertices,gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.texture_coords,gl.STATIC_DRAW);
    }
}
CylinderPrimitive.prototype.Draw = Primitive_Draw;
CylinderPrimitive.prototype.Unload = Primitive_Unload;

class CubePrimitive{
    constructor(height,width,depth,texture_handle){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = new Vec3(0,0,0);
        this.scale = new Vec3(1,1,1);
        
        this.texture = texture_handle;
        this.vertex_buffer = gl.createBuffer();
        this.texcoord_buffer = gl.createBuffer();
        this.index_buffer = gl.createBuffer ();

        this.height = height;
        this.width = width;
        this.depth = depth;

        var x = this.width/2;
        var y = this.height/2;
        var z = this.depth/2;

        var verts =[
            -x, -y,  z,   x, -y,  z,   x,  y,  z,  -x,  y,  z,// Front face
            -x, -y, -z,  -x,  y, -z,   x,  y, -z,   x, -y, -z,// Back face
            -x,  y, -z,  -x,  y,  z,   x,  y,  z,   x,  y, -z,// Top face
            -x, -y, -z,   x, -y, -z,   x, -y,  z,  -x, -y,  z,// Bottom face
             x, -y, -z,   x,  y, -z,   x,  y,  z,   x, -y,  z,// Right face
            -x, -y, -z,  -x, -y,  z,  -x,  y,  z,  -x,  y, -z// Left face
          ]
        
        var tex_coords = [
            -1.0, -1.0,   1.0, -1.0,   1.0,  1.0,  -1.0,  1.0,// Front face
            -1.0, -1.0,  -1.0,  1.0,   1.0,  1.0,   1.0, -1.0,// Back face     
            -1.0,  1.0,  -1.0,  1.0,   1.0,  1.0,   1.0,  1.0,// Top face
            -1.0, -1.0,   1.0, -1.0,   1.0, -1.0,  -1.0, -1.0,// Bottom face
             1.0, -1.0,   1.0,  1.0,   1.0,  1.0,   1.0, -1.0,// Right face
            -1.0, -1.0,  -1.0, -1.0,  -1.0,  1.0,  -1.0,  1.0,// Left face
        ];

        var indices = [
            0,1,2,    0,2,3,    4,5,6,    4,6,7,
            8,9,10,   8,10,11,  12,13,14, 12,14,15,
            16,17,18, 16,18,19, 20,21,22, 20,22,23 
        ];

        var vertices = Float32Array.from(verts);
        var texture_coords = Float32Array.from(tex_coords);
        var index_array = new Uint16Array(indices);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,texture_coords,gl.STATIC_DRAW);
        this.index_count = indices.length;

       
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, index_array, gl.STATIC_DRAW);
    }
}
CubePrimitive.prototype.Draw = Primitive_Draw;
CubePrimitive.prototype.Unload = Primitive_Unload;