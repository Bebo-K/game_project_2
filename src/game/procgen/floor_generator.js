


class FloorGenerator{

    constructor(max_room_count, type, difficulty,options){

        this.max_room_count = max_room_count;
        this.type = type;
        this.difficulty = difficulty;
        this.options = options;


    }

    GenerateFloor(){
        var floor = new Floor();

        for(var i=0;i<this.max_room_count;i++){
            var room_type = GetRandomRoomType(this.type);
            if(room_type.isCompatibleWith(floor)){
                floor.rooms.push(room_type.Instantiate())
            }
        }

        return floor;
    }

}