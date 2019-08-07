
function SolidCollisionHandler(){

}

class Floor{

    constructor(){
        this.rooms = [];

        var myRoom = new Room(10,10);

        var tile_tex = texture_manager.AddTextureHandle("randomTile",ATLAS_0,0,32,48,32);

        myRoom.tile_types.push(null);
        myRoom.tile_types.push(new TileType(tile_tex,SolidCollisionHandler) );

        myRoom.tiles.push(  1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1,
                            1,1,1,1,1,1,1,1,1,1
        );


        this.rooms.push(myRoom);

    }

    getPlayerSpawnRoom(){

        return this.rooms[0];

    }


}