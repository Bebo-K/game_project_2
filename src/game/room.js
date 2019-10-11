
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

        const VIEW_DISTANCE = 28;
        const NEG_VIEW_DISTANCE = 3;
        
        var xmin = Math.floor(camera.x/GLOBAL_TILE_SIZE)-NEG_VIEW_DISTANCE;
        var xmax = Math.ceil(camera.x/GLOBAL_TILE_SIZE)+NEG_VIEW_DISTANCE;
        var zmin = Math.floor(camera.z/GLOBAL_TILE_SIZE)-NEG_VIEW_DISTANCE;
        var zmax = Math.ceil(camera.z/GLOBAL_TILE_SIZE)+NEG_VIEW_DISTANCE;

        

        var cam_turn = camera.rotation.y;
        while(cam_turn < 0){cam_turn += 360;}
        while(cam_turn > 360){cam_turn -= 360;}

        var fov_max = cam_turn +(camera.fov/2);
        
        var fov_min = cam_turn -(camera.fov/2);
        //simple cull
        if(fov_max >= 270 || fov_min <= 90){zmin -= VIEW_DISTANCE;}
        if(fov_min <= 270 && fov_max >= 90){zmax += VIEW_DISTANCE;}

        if(fov_min <= 180 || fov_max >= 360){xmin -= VIEW_DISTANCE;}
        if(fov_min <= 0 || fov_max >= 180){xmax += VIEW_DISTANCE;}

        if(xmin < 0){xmin=0;}   if(xmax >= this.width){xmax = this.width-1;}
        if(zmin < 0){zmin=0;}   if(zmax >= this.height){zmax = this.height-1;}

        

        for(var h=0;h<this.depth;h++){
            for(var i=zmin;i<zmax;i++){
                for(var j=xmin;j<xmax;j++){
                    type = this.tile_types[this.tiles[h*this.height*this.width +i*this.height + j]]
                    if(type == null)continue;
                    Tile_Draw(type,j*GLOBAL_TILE_SIZE,h*GLOBAL_TILE_SIZE,i*GLOBAL_TILE_SIZE,
                        camera,modelview_matrix,projection_matrix);
                }
            }
        }
    }
}