
function Primitive_Draw(camera,modelview_matrix,projection_matrix){
        var local_space = modelview_matrix.Copy();
        local_space.TransformToSpace(this);

        gl.uniformMatrix4fv(camera.shader.MODELVIEW_MATRIX,false,local_space.Get(true));
        gl.uniformMatrix4fv(camera.shader.PROJECTION_MATRIX,false,projection_matrix.Get(true));

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,this.texture.gl_id);
        gl.uniform1i(camera.shader.TEXTURE0,0);

        var tex_location = new Float32Array([
            this.texture.texture_x,
            this.texture.texture_y,
            this.texture.texture_w,
            this.texture.texture_h]);
        gl.uniform4fv(camera.shader.TEXTURE_LOCATION,tex_location);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.vertexAttribPointer(camera.shader.VERTICES,3,gl.FLOAT,false,0,0);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
        gl.vertexAttribPointer(camera.shader.TEXCOORDS,2,gl.FLOAT,false,0,0);

        gl.drawArrays(gl.TRIANGLES,0,this.vertex_count);
    }
    
function Primitive_Unload(){
    gl.deleteBuffer(this.vertex_buffer);
    gl.deleteBuffer(this.texcoord_buffer);
}

class CylinderPrimitive{

    constructor(height,diameter,texture_handle){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = new Vec3(0,0,0);
        this.scale = new Vec3(1,1,1);
        
        this.texture = texture_handle;
        this.vertex_buffer = gl.createBuffer();
        this.texcoord_buffer = gl.createBuffer();

        var radius = diameter*0.5;
        this.radius = radius;
        this.height = height;

        const rings = 12;
        const lo = 0.01;
        const hi = 0.98;
        var verts = [];
        var tex_coords = [];
        var theta1, theta2;
        var fraction1,fraction2;
        var cos1,sin1,cos2,sin2;
        var tc1,tc2;

        for(var i=0;i< rings;i++){ 
            fraction1 = i/rings; 
            fraction2 = (i+1.0)/rings;
            theta1 = Math.PI *2 * fraction1;//;   
            theta2 = Math.PI *2 * fraction2;//;  
            
            cos1 = Math.cos(theta1);
            sin1 = Math.sin(theta1);
            cos2 = Math.cos(theta2);
            sin2 = Math.sin(theta2);

            tc1 = (fraction1+ lo) * hi ;
            tc2 = (fraction2+ lo) * hi;
            
            //side quad
            verts.push(radius*cos1,0,radius*sin1);
            tex_coords.push(tc1,hi);
            verts.push(radius*cos1,height,radius*sin1);
            tex_coords.push(tc1,0.5+ lo);
            verts.push(radius*cos2,height,radius*sin2);
            tex_coords.push(tc2,0.5+ lo);

            verts.push(radius*cos2,height,radius*sin2);
            tex_coords.push(tc2,0.5+ lo);
            verts.push(radius*cos2,0,radius*sin2);
            tex_coords.push(tc2,hi);
            verts.push(radius*cos1,0,radius*sin1);
            tex_coords.push(tc1,hi);

            //cap top
            verts.push(radius*cos1,height,radius*sin1);
            tex_coords.push(0.25 + 0.25*cos1,0.25 + 0.25*sin1);
            verts.push(radius*cos2,height,radius*sin2);
            tex_coords.push(0.25 + 0.25*cos2,0.25 + 0.25*sin2);
            verts.push(0,height,0);
            tex_coords.push(0.25,0.25);

            //cap bottom
            verts.push(radius*cos1,0,radius*sin1);
            tex_coords.push(0.75 + 0.2*cos1,0.2 + 0.2*sin1);
            verts.push(radius*cos2,0,radius*sin2);
            tex_coords.push(0.75 + 0.2*cos2,0.2 + 0.2*sin2);
            verts.push(0,0,0);
            tex_coords.push(0.75,0.25);
        }
    
        this.vertex_count = verts.length/3;
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

        this.height = height;
        this.width = width;
        this.depth = depth;

        var x = this.width/2;
        var y = this.height/2;
        var z = this.depth/2;

        var verts =[
            -x, -y,  z,   x, -y,  z,   x,  y,  z,    -x, -y,  z,   x,  y,  z,  -x,  y,  z,// Front face
            -x, -y, -z,  -x,  y, -z,   x,  y, -z,    -x, -y, -z,   x,  y, -z,   x, -y, -z,// Back face
            -x,  y, -z,  -x,  y,  z,   x,  y,  z,    -x,  y, -z,   x,  y,  z,   x,  y, -z,// Top face
            -x, -y, -z,   x, -y, -z,   x, -y,  z,    -x, -y, -z,   x, -y,  z,  -x, -y,  z,// Bottom face
             x, -y, -z,   x,  y, -z,   x,  y,  z,     x, -y, -z,   x,  y,  z,   x, -y,  z,// Right face
            -x, -y, -z,  -x, -y,  z,  -x,  y,  z,    -x, -y, -z,  -x,  y,  z,  -x,  y, -z// Left face
          ]
        
        const lo = 0.000001;
        const hi = 0.99999;
        var tex_coords = [
            lo,hi, hi,hi, hi,lo,  lo,hi, hi,lo, lo,lo, //Front
            hi,hi, hi,lo, lo,lo,  hi,hi, lo,lo, lo,hi, //Back
            lo,lo, lo,hi, hi,hi,  lo,lo, hi,hi, hi,lo, //Top
            lo,hi, hi,hi, hi,lo,  lo,hi, hi,lo, lo,lo, //Bottom
            hi,hi, hi,lo, lo,lo,  hi,hi, lo,lo, lo,hi, //Right
            lo,hi, hi,hi, hi,lo,  lo,hi, hi,lo, lo,lo //Left
        ];

        this.vertex_count = verts.length/3;
        var vertices = Float32Array.from(verts);
        var texture_coords = Float32Array.from(tex_coords);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.texcoord_buffer);
        gl.bufferData(gl.ARRAY_BUFFER,texture_coords,gl.STATIC_DRAW);
    }
}
CubePrimitive.prototype.Draw = Primitive_Draw;
CubePrimitive.prototype.Unload = Primitive_Unload;