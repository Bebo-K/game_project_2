
var GRAVITY_TERMINAL	= -64.0;
var GRAVITY_ACCEL		= -20.0;
var SLIDING_DAMPENING   = 0.05;
var MIDAIR_DAMPENING    = 0.01;
var VELOCITY_STEPS      = 2;

class Physics{

    constructor(){}

    Update(game,entity,delta){
		if(entity.apply_gravity){
			this.ApplyGravity(e,delta);
		}
		if(entity.world_collision_enabled) {
            this.RunLevelCollision(entity,game,delta);
		}
		else{
            entity.position.x += entity.velocity.x*delta;
            entity.position.y += entity.velocity.y*delta;
            entity.position.z += entity.velocity.z*delta;
		} 
        this.ApplyVelocityDampening(entity, 
            (entity.is_midair)? MIDAIR_DAMPENING:SLIDING_DAMPENING,
             delta);
    }

    RunLevelCollision(entity,game,delta){
        var collided_this_frame= false;
        var step_position = new Vec3(entity.position.x,entity.position.y,entity.position.z);
        var step_velocity = new Vec3( entity.position.x/delta,
                                      entity.position.y/delta,
                                      entity.position.z/delta);
		for(var i=0;i < VELOCITY_STEPS;i++){


			step_result = game.level.RunCollisionStep(entity,step_position,step_velocity);
			if(step_result){
				collided_this_frame= true;	
			}
		}
		if(!collided_this_frame){
			entity.is_midair=true;
		}
    }


    ApplyGravity(entity, delta){
		if(entity.velocity.y > GRAVITY_TERMINAL){
			entity.velocity.y += delta*GRAVITY_ACCEL;
		}
	}
	
	ApplyVelocityDampening(entity, amount, delta){
        var damper_amount = Math.pow(1.0-amount,delta);
		entity.velocity.x *= damper_amount;
		entity.velocity.z *= damper_amount;
	}


}