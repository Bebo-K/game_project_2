
class Level{

    constructor(source,tileset_handle,sprite){
        this.tiles=[];
        this.rows =16;
        this.columns = 16;

        var level_str = source;
        for(var i=0;i<level_str.length;i++){
            if(level_str[i] == '0'){
                this.tiles.push(0);
            }
            if(level_str[i] == '1'){
                this.tiles.push(1);
            }
        }
        
        this.texture = tileset_handle;
        this.buildTile(tileset_handle);

        this.sprite = sprite;
    }

    Draw(shader,modelview_matrix,projection_matrix){
        var i,j;
        var current_modelview = modelview_matrix.Copy();
        current_modelview.Translate(0,0,-100);
        for(var i=0;i<this.rows;i++){
            for(var j=0;j<this.rows;j++){
                if(this.tiles[i*16+j]===1){
                    this.DrawTile(shader,current_modelview,projection_matrix);
                }
                current_modelview.Translate(16,0,0);
            }
            current_modelview.Translate(-16*this.rows,-16,0);
        }
    }

    DrawTile(shader,modelview_matrix,projection_matrix){

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

        gl.drawArrays(gl.TRIANGLES,0,6);
    }

    buildTile(texture_handle){

        this.frame=12;
        this.strip=1;
        this.max_frames=14;
        this.max_strips=8;
        var tile_width = this.texture.width/this.max_frames;
        var tile_height = this.texture.height/this.max_strips;

        var verts = new Float32Array([
			-(tile_width/2.0), 0.0,         1.0,
			 (tile_width/2.0), 0.0,         1.0,
			 (tile_width/2.0), tile_height, 1.0,
			 (tile_width/2.0), tile_height, 1.0,
			-(tile_width/2.0), tile_height, 1.0,
			-(tile_width/2.0), 0.0,         1.0
        ]);

        this.texture_tile_width = this.texture.texture_w/this.max_frames;
        this.texture_tile_height = this.texture.texture_h/this.max_strips;

        var texcoords = new Float32Array([
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

}