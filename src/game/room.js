
class Room{

    constructor(width,height){
        
        this.width=width;
        this.height=height;
        this.tiles = [];
        this.tile_types = [];
        
    }

    Draw(camera,modelview_matrix,projection_matrix) {
        for(var i=0;i<this.height;i++){
            for(var j=0;j<this.width;j++){

                Tile_Draw(this.tile_types[this.tiles[i*this.height + j]],
                    j*GLOBAL_TILE_SIZE,0,i*GLOBAL_TILE_SIZE,
                    camera,modelview_matrix,projection_matrix);
            }
        }
    }
}