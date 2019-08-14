

class MovementComponent{
    constructor(max_speed,acceleration){
        this.can_move = true;
        this.can_jump = true;
        this.max_speed = max_speed;
        this.acceleration = acceleration;
        this.goal = new Vec3(0,0,0);
        this.jump_goal = false;
        this.is_jumping = false;
        this.jump_speed = 10.0;
    }
}

class MovementSystem{

    constructor(){
        this.jump_movement_modifier = 0.5;

    }

    ValidEntity(entity){
        return (entity.movement != null);
    }

    Update(entity,delta){
        if(!this.ValidEntity(entity))return;
        var movement_length = entity.movement.goal.x*entity.movement.goal.x + entity.movement.goal.z*entity.movement.goal.z;
        if(entity.movement.can_move && movement_length > 0.01){
            if(!entity.movement.is_jumping){
                entity.velocity.x += entity.movement.goal.x * entity.movement.acceleration * delta;
                //entity.velocity.y += entity.movement.goal.y * entity.movement.acceleration * delta;
                entity.velocity.z += entity.movement.goal.z * entity.movement.acceleration * delta;
            }
            else{
                entity.velocity.x += entity.movement.goal.x * entity.movement.acceleration * delta * jump_movement_modifier;
                entity.velocity.y += entity.movement.goal.y * entity.movement.acceleration * delta * jump_movement_modifier;
                entity.velocity.z += entity.movement.goal.z * entity.movement.acceleration * delta * jump_movement_modifier;
            }
            var movement_speed_squared = entity.velocity.x*entity.velocity.x + entity.velocity.z*entity.velocity.z;
            if(movement_speed_squared > 0.01){
                var movement_turn = Math.atan2(entity.velocity.x,-entity.velocity.z);
                entity.rotation.y= movement_turn*180.0/Math.PI;
            }
            
            if(movement_speed_squared > entity.movement.max_speed*entity.movement.max_speed){
                var scaledown = entity.movement.max_speed/Math.sqrt(movement_speed_squared);
                entity.velocity.x *= scaledown;
                entity.velocity.z *= scaledown;
            }
        }
        
        if(entity.phys != null){
            entity.movement.is_jumping=entity.phys.is_midair;
        }
        
        if(entity.movement.can_jump && entity.movement.jump_goal){
            if(!entity.movement.is_jumping){
                entity.velocity.y = entity.movement.jump_speed;
                entity.phys.is_midair=true;
            }	
        }
    } 
}
