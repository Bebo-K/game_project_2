

class MovementComponent{
    constructor(max_speed,acceleration){
        this.max_speed = max_speed;
        this.acceleration = acceleration;
        this.goal = new Vec3(0,0,0);
        this.jump_goal = false;
    }
}

class MovementSystem{

    constructor(){}

    ValidEntity(entity){
        return (entity.movement != null);
    }

    Update(entity,delta){
        if(!ValidEntity(entity))return;
        if(e.movement.can_move){
            if(!e.movement.move_goal.isNone()){
                if(!e.movement.is_jumping){
                    e.velocity.Add(e.movement.move_goal.Scale(e.movement.base_speed*e.movement.ramp_up));
                }
                else{
                    e.velocity.Add(e.movement.move_goal.Scale(e.movement.base_speed*e.movement.ramp_up/2));
                }
                var max_speed = e.movement.base_speed*e.movement.multiplier;
                if(e.loc.velocity.XZLengthSquared() > max_speed*max_speed){
                    var movement_turn = Math.atan2(e.loc.velocity.x,e.loc.velocity.z);
                    e.loc.rotation.y=(float) (movement_turn*180.0/Math.PI);
                }
                if(e.loc.velocity.XZLengthSquared() > max_speed*max_speed){
                    var vertical_component = e.loc.velocity.y;
                    e.loc.velocity.y=0;
                    e.loc.velocity.Normalize();
                    e.loc.velocity.Scale(max_speed);
                    e.loc.velocity.y=vertical_component;
                }
            }
            
            if(e.phys != null){
                e.movement.is_jumping=e.phys.is_midair;
            }
            
            if(e.movement.can_jump && e.movement.jump_goal){
                if(!e.movement.is_jumping){
                    e.loc.velocity.y = e.movement.jump_speed;
                    e.phys.is_midair=true;
                }	
            }
        } 
    }
}
