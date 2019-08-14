
class Scene{

    constructor(){

        this.renderer = new Renderer();


        this.draw_manager = new DrawManagerSystem();
        this.camera_target = new CameraTargetSystem();
        this.movement = new MovementSystem();
        this.physics = new PhysicsSystem();
        this.player_controller = new PlayerControlSystem();
        

        this.camera = new Camera();
            this.camera.x = 4.5;
            this.camera.y = 3;
            this.camera.z = 12;

        this.floor = new Floor();
        this.active_rooms = [];

        this.LoadRoom(this.floor.getPlayerSpawnRoom());
        this.entities = [];
        
        var cylinder_tex = texture_manager.AddTextureHandle("enemy",ATLAS_0,0,0,32,32);

        var box_entity = new Entity();
            box_entity.draw = new DrawManagerComponent();
            box_entity.draw.Add(new CylinderPrimitive(2,1,cylinder_tex),this.renderer);
            box_entity.draw.Add(new CylinderPrimitive(0.2,1.5,cylinder_tex,new Vec3(0,1.5,0)),this.renderer);

            box_entity.player = new PlayerControlComponent();
            box_entity.movement = new MovementComponent(8,0.01);
            box_entity.camera_target = new CameraTargetComponent();
            box_entity.phys = new PhysicsComponent();

        box_entity.y = 0.5;
        this.entities.push(box_entity);

        this.cube = new CubePrimitive(1,1,1,cylinder_tex);
        this.cube.x = 8;
        this.cube.y = 4;
        this.cube.z = 4;
        this.cube.rotation.x = 45;
        this.cube.rotation.z = 45;

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
        var current_entity;

        for(var i=0; i< this.entities.length; i++){
            current_entity = this.entities[i];

            this.movement.Update(current_entity,delta);
            this.physics.Update(current_entity,delta);
            this.player_controller.Update(current_entity,delta);
            this.draw_manager.Update(current_entity,delta);
            this.camera_target.Update(current_entity,delta);
        }

    }

    Draw(){
        this.renderer.Paint(this.camera);
    }

}