
class Scene{

    constructor(){

        this.renderer = new Renderer();
        this.camera = new Camera();
            this.camera.x = 4.5;
            this.camera.y = 3;
            this.camera.z = 12;

        this.floor = new Floor();
        this.active_rooms = [];

        this.LoadRoom(this.floor.getPlayerSpawnRoom());
        this.entities = [];
        
        var box_entity = new Entity();
            box_entity.player = new PlayerControlComponent();
            box_entity.movement = new MovementComponent(8,1);



        var cylinder_tex = texture_manager.AddTextureHandle("enemy",ATLAS_0,0,0,32,32);

        this.cylinder = new CylinderPrimitive(2,1,cylinder_tex);
        this.cylinder.y = 0.5;

        this.cube = new CubePrimitive(1,1,1,cylinder_tex);
        this.cube.x = 8;
        this.cube.y = 4;
        this.cube.z = 4;
        this.cube.rotation.x = 45;
        this.cube.rotation.z = 45;


        this.renderer.Add(this.cylinder);
        this.renderer.Add(this.cube);

    }

    LoadRoom(room){
        this.active_rooms.push(room);

        this.renderer.Add(room);

        for(var i=0;i< room.markers;i++){

        }
    }

    UnloadRoom(room){
        var room_id = this.active_rooms.indexOf(room);
        this.active_rooms.splice(room_id,1);
    }

    Update(delta){
        this.cube.rotation.y += (0.1*delta);
    }

    Draw(){
        this.renderer.Paint(this.camera);
    }

}