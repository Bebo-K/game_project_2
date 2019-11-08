
class Scene{

    constructor(){

        this.renderer = new Renderer();


        this.draw_manager = new DrawManagerSystem();
        this.camera_target = new CameraTargetSystem();
        this.movement = new MovementSystem();
        this.physics = new PhysicsSystem();
        this.player_controller = new PlayerControlSystem();
        this.collision_bounds = new CollisionSystem();
        

        this.camera = new Camera();
            this.camera.x = 0;
            this.camera.y = 0;
            this.camera.z = 2;

        this.level = new Level(0,this.renderer);
        this.entities = [];
        
        var knight_tex = texture_manager.AddTextureHandle("knight_torso",ATLAS_0,256,0,48,128,1,1);

        var knight_entity = new Entity();
            knight_entity.y = 512;
            knight_entity.draw = new DrawManagerComponent();
            
            var knight_sprite=new Sprite(knight_tex,0,0)

            knight_entity.draw.Add(knight_sprite,this.renderer);
            knight_entity.player = new PlayerControlComponent();
            knight_entity.movement = new MovementComponent(10,0.1);
            knight_entity.camera_target = new CameraTargetComponent();
            knight_entity.collision = new CollisionComponent();
                knight_entity.collision.Add(new CollisionCircle(new Vec3(0,0,0),32))
            knight_entity.phys = new PhysicsComponent();

        this.entities.push(knight_entity);
    }

    Update(delta){
        var current_entity;

        for(var i=0; i< this.entities.length; i++){
            current_entity = this.entities[i];

            this.movement.Update(current_entity,delta);
            this.physics.Update(current_entity,delta);
            this.player_controller.Update(current_entity,delta);
            this.draw_manager.Update(current_entity,delta);
            this.camera_target.Update(current_entity,delta);
            this.collision_bounds.Update(current_entity,delta);
        }

        this.level.Update(delta,this.entities);

    }

    Draw(){
        this.renderer.Paint(this.camera);
    }

}