

class Entity{

    constructor(){
        this.x=0;
        this.y=0;
        this.z=0;
        this.rotation = new Vec3(0,0,0);
        this.scale = new Vec3(1,1,1);
        this.velocity = new Vec3(0,0,0);

        this.draw = null;
        this.movement = null;
        this.player = null;
        this.camera_target = null;
        this.phys=null;

        this.models =[];
        this.sprites =[];
    }

}