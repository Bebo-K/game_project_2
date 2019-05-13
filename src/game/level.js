
class Level{

    constructor(game,source){
        var tex_atlas = game.textures.texture_atlases[0];//TODO: search when we have multiple atlases.
        var tileset_texture = game.textures.AddTextureHandle("tileset.png",tex_atlas,0,0,224,128);
        this.tile_manager = new TileManager(tileset_texture,14,8);
        this.tiles=[];
        this.tile_types = [];
            this.tile_types.push(null);
            this.tile_types.push(new TileType("solid ground",0,2,10,1,true));

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
    }

    Draw(shader,modelview_matrix,projection_matrix){
        var i,j;
        var current_modelview = modelview_matrix.Copy();
        current_modelview.Translate(0,16*this.columns,0);
        for(var i=0;i<this.rows;i++){
            for(var j=0;j<this.rows;j++){
                this.tile_manager.DrawTile(this.tile_types[this.tiles[i*16+j]],shader,current_modelview,projection_matrix);
                current_modelview.Translate(16,0,0);
            }
            current_modelview.Translate(-16*this.rows,-16,0);
        }
    }

    Unload(){
        gl.deleteBuffer(this.vertex_buffer);
        gl.deleteBuffer(this.texcoord_buffer);
    }
}