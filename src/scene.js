
class Scene{

    constructor(renderer){

        this.renderer = new Renderer();
        this.floor = new Floor();
        this.active_rooms = [];
            this.active_rooms.push(this.floor.getPlayerSpawnRoom());
        this.entities = [];
        
        this.renderer.camera.z = 10;

        var cylinder_tex = texture_manager.AddTextureHandle("barrel",ATLAS_0,0,0,64,64);

        this.cylinder = new CylinderPrimitive(3,1,cylinder_tex);
        this.cube = new CubePrimitive(1,1,1,cylinder_tex);

        this.cylinder.z = 0;
        this.cylinder.y = -1.5;
        this.cube.y = 2;

        this.renderer.Add(this.cylinder);
        this.renderer.Add(this.cube);

    }

    LoadRoom(room){
        this.active_rooms.push(room);

        for(var i=0;i< room.markers;i++){

        }
    }

    UnloadRoom(room){
        var room_id = this.active_rooms.indexOf(room);
        this.active_rooms.splice(room_id,1);


    }

    
    Update(delta){
        this.cylinder.rotation.y += (0.01*delta);
    }

    Draw(){
        this.renderer.Paint();
    }







}