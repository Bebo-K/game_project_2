

class PhysicsComponent{

    constructor(){
        this.enable_gravity = true;
        this.is_midair = false;

    }
}

class PhysicsSystem{

    constructor(){
        this.gravity =  -100.0;
        this.terminal_velocity = -10000;
    }
    
    Update(entity,delta){
        var seconds = delta/1000.0;

        if(entity.phys != null){
            if(entity.phys.enable_gravity && entity.velocity_y > this.terminal_velocity){
                if(entity.player != null && entity.player.spring_velocity > 0){
                    entity.y += seconds;
                }
                else{
                entity.velocity_y += this.gravity*seconds;
                entity.phys.is_midair=true;
                }
            }
        }
        
        //also handle generic movement
        entity.x += seconds*entity.velocity_x;
        entity.y += seconds*entity.velocity_y;
    }

}