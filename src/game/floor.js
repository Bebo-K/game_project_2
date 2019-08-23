
function SolidCollisionHandler(){

}

class Floor{

    constructor(){
        this.rooms = [];

        var myRoom = new Room(256,256,1);


        var tile_tex = texture_manager.AddTextureHandle("randomTile",ATLAS_0,0,32,48,32);

        myRoom.tile_types.push(null);
        myRoom.tile_types.push(new TileType(tile_tex,SolidCollisionHandler) );

        for(var y=0; y< 1;y++){
            for(var z=0;z<256;z++){
                for(var x=0;x<256;x++){
                    myRoom.tiles.push(1);
                }
            }
        }
/*
        myRoom.tiles.push(  1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,

                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,0,0,0,0,0,0,1,1,
                            1,1,0,0,0,0,0,0,1,1,
                            1,1,0,0,0,0,0,0,1,1,
                            1,1,0,0,0,0,0,0,1,1,
                            1,1,0,0,0,0,0,0,1,1,
                            1,1,0,0,0,0,0,0,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1
        );*/

        this.rooms.push(myRoom);

    }

    getPlayerSpawnRoom(){

        return this.rooms[0];

    }


}