
class Room{

    constructor(width,height,depth){
        
        this.width=width;
        this.height=height;
        this.depth=depth;
        this.tiles = [];
        this.tile_types = [];
        
    }

    Draw(camera,modelview_matrix,projection_matrix) {
        var type;
        for(var h=0;h<this.depth;h++){
            for(var i=0;i<this.height;i++){
                for(var j=0;j<this.width;j++){
                    type = this.tile_types[this.tiles[h*this.height*this.width +i*this.height + j]]
                    if(type == null)continue;
                    Tile_Draw(type,j*GLOBAL_TILE_SIZE,h*GLOBAL_TILE_SIZE,i*GLOBAL_TILE_SIZE,
                        camera,modelview_matrix,projection_matrix);
                }
            }
        }
    }
}