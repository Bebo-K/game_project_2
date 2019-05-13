

class Collision{

    constructor(){}

    Update(game,entity,delta){



        entity.position.x += entity.velocity.x*delta;
    }


    CollideWithTiles(game,entity,delta){
        var x_lo_index = Math.floor((entity.position.x+entity.radius)/TILE_WIDTH);
        var x_hi_index = Math.ceil((entity.position.x+entity.radius)/TILE_WIDTH)
        var y_lo_index = Math.floor(entity.position.y/TILE_HEIGHT);
        var y_hi_index = Math.ceil((entity.position.y+entity.height)/TILE_HEIGHT);

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

    CollideWithTile(tile_x,tile_y,){


    }
}