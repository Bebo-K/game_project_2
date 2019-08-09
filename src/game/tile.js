const GLOBAL_TILE_SIZE = 1.0;

function Tile_Draw(type,x,y,z,camera,modelview_matrix,projection_matrix){
    var local_space = modelview_matrix.Copy();
    local_space.Translate(x,y,z);

    gl.uniformMatrix4fv(camera.shader.MODELVIEW_MATRIX,false,local_space.Get(true));
    gl.uniformMatrix4fv(camera.shader.PROJECTION_MATRIX,false,projection_matrix.Get(true));

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,type.texture.gl_id);
    gl.uniform1i(camera.shader.TEXTURE0,0);

    var tex_location = new Float32Array([
        type.texture.texture_x,
        type.texture.texture_y,
        type.texture.texture_w,
        type.texture.texture_h]);
    gl.uniform4fv(camera.shader.TEXTURE_LOCATION,tex_location);

    gl.bindBuffer(gl.ARRAY_BUFFER,type.vertex_buffer);
    gl.vertexAttribPointer(camera.shader.VERTICES,3,gl.FLOAT,false,0,0);

    gl.bindBuffer(gl.ARRAY_BUFFER,type.texcoord_buffer);
    gl.vertexAttribPointer(camera.shader.TEXCOORDS,2,gl.FLOAT,false,0,0);

    gl.drawArrays(gl.TRIANGLES,0,type.vertex_count);
}

//Basic tile type constructor. Give an image and a collision handler.
//By default, tile textures are laid out like this
// Back Top   Bottom
// Left Front Right
class TileType{

    constructor(texture_handle,collResponseFunction){
        this.collision_response = collResponseFunction;
        this.texture = texture_handle;
        this.vertex_buffer = gl.createBuffer();
        this.texcoord_buffer = gl.createBuffer();

        var x = GLOBAL_TILE_SIZE/2;
        var y = GLOBAL_TILE_SIZE/2;
        var z = GLOBAL_TILE_SIZE/2;

        var verts =[
            -x, -y,  z,   x, -y,  z,   x,  y,  z,    -x, -y,  z,   x,  y,  z,  -x,  y,  z,// Front face
            -x, -y, -z,  -x,  y, -z,   x,  y, -z,    -x, -y, -z,   x,  y, -z,   x, -y, -z,// Back face
            -x,  y, -z,  -x,  y,  z,   x,  y,  z,    -x,  y, -z,   x,  y,  z,   x,  y, -z,// Top face
            -x, -y, -z,   x, -y, -z,   x, -y,  z,    -x, -y, -z,   x, -y,  z,  -x, -y,  z,// Bottom face
             x, -y, -z,   x,  y, -z,   x,  y,  z,     x, -y, -z,   x,  y,  z,   x, -y,  z,// Right face
            -x, -y, -z,  -x, -y,  z,  -x,  y,  z,    -x, -y, -z,  -x,  y,  z,  -x,  y, -z// Left face
          ]
    
        var tex_coords = [
            0.34,0.99, 0.66,0.99, 0.66,0.51,  0.34,0.99, 0.66,0.51, 0.34,0.51, //Front
            0.33,0.50, 0.333,0.0, 0.01,0.01,  0.33,0.50, 0.01,0.01, 0.01,0.50, //Back
            0.34,0.01, 0.34,0.50, 0.66,0.50,  0.34,0.01, 0.66,0.50, 0.66,0.01, //Top
            0.67,0.50, 0.99,0.50, 0.99,0.00,  0.67,0.50, 0.99,0.00, 0.67,0.01, //Bottom
            0.99,0.99, 0.99,0.51, 0.67,0.51,  0.99,0.99, 0.67,0.51, 0.67,0.99, //Right
            0.01,0.99, 0.33,0.99, 0.33,0.51,  0.01,0.99, 0.33,0.51, 0.01,0.51 //Left
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




