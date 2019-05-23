
var ENFORCE_BOUNDS = true;


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

    RunCollisionStep(entity,step_position,step_velocity){
        step_result = new CollisionResult();
        
        entity.out_of_bounds = true;	
        
        step_result = this.CollideWithTilesInRange(entity,step_position,step_velocity);
        
        HandleCollisionResults(e,level,step,step_result);
        
        if(ENFORCE_BOUNDS && entity.out_of_bounds){//out of bounds, stop horizontal velocity
            e.loc.velocity.x =0;
            e.loc.velocity.z =0;
            step_velocity.x =0;
            step_velocity.z =0;
            e.loc.position.Add(step_velocity); 
        }else{
            step_position.x += step_velocity.x;
            step_position.y += step_velocity.y;
            step_position.z += step_velocity.z;

            e.loc.position.Add(step.shunt);
            e.loc.position.Add(step.movement); 
        }
        return step_result;
    }
    CollideWithTilesInRange(entity,step_position,step_velocity){
        var x_lo_index = Math.floor((step_position.x+entity.radius)/TILE_WIDTH);
        var x_hi_index = Math.ceil((step_position.x+entity.radius)/TILE_WIDTH)
        var y_lo_index = Math.floor(step_position.y/TILE_HEIGHT);
        var y_hi_index = Math.ceil((step_position.y+entity.height)/TILE_HEIGHT);

        if(x_lo_index < 0){x_lo_index=0;}
        if(y_lo_index < 0){y_lo_index=0;}
        if(x_hi_index < 0)return;//well out of bounds, give up.
        if(y_hi_index < 0)return;

        if(x_hi_index >= game.level.rows){x_hi_index=game.level.rows-1;}
        if(y_hi_index >= game.level.columns){y_hi_index=game.level.columns-1;}
        if(x_lo_index  >= game.level.rows)return;
        if(y_lo_index >= game.level.columns)return;

        for(var x=x_lo_index;x <= x_hi_index;x++){
            for(var y=y_lo_index;y <= y_hi_index;y++){


            }
        }
    }
}