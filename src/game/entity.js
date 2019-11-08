

class Entity{

    constructor(){
        this.x=0.0;
        this.y=0.0;
        this.rotation = 0.0;
        this.velocity_x = 0.0;
        this.velocity_y = 0.0;
        this.scale = new Vec3(1,1,1);

        this.draw = null;
        this.movement = null;
        this.player = null;
        this.camera_target = null;
        this.phys=null;
        this.collision=null;

        this.models =[];
        this.sprites =[];
    }

}