

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
        this.midair_velocity_damper = 0.75;
        this.ground_velocity_damper = 0.9999;
    }
    
    ApplyMidairVelocityDampening(entity,seconds){
		var damper_amount = Math.pow(1-this.midair_velocity_damper,seconds);
		entity.velocity.x *= damper_amount;
		entity.velocity.z *= damper_amount;
	}
	
	ApplySlidingVelocityDampening(entity,seconds){
		var damper_amount = Math.pow(1-this.ground_velocity_damper,seconds);
		entity.velocity.x *= damper_amount;
		entity.velocity.z *= damper_amount;
	}

    Update(entity,delta){
        var seconds = delta/1000.0

        if(entity.phys != null){
            if(entity.phys.enable_gravity && entity.velocity.y > this.terminal_velocity){
                entity.velocity.y += this.gravity*seconds;
            }
        }
        
        //also handle generic movement
        entity.x += seconds*entity.velocity.x;
        entity.y += seconds*entity.velocity.y;
        entity.z += seconds*entity.velocity.z;

        if(entity.phys != null){
            if(entity.phys.is_midair){
                this.ApplyMidairVelocityDampening(entity,seconds);
            }
            else {
                this.ApplySlidingVelocityDampening(entity,seconds);
            }
        }
    }

}