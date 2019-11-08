

class PlayerControlComponent{

    constructor(){
        this.movement_enabled = true;
    }

}

class PlayerControlSystem{

    constructor(){}

    ValidEntity(entity){
        return (entity.player != null) && (entity.movement != null);
    }


    HandleNoPlayerControlCase(entity){
        if(!entity.player.movement_enabled) {
			entity.movement.jump_goal=false;
            entity.movement.goal.x *= 0.1;
            entity.movement.goal.z *= 0.1;
			return true;
        }
        return false;
    }

    Update(entity,delta){
        if(!this.ValidEntity(entity))return;

        if(this.HandleNoPlayerControlCase(entity)){return;}

		//var input_axis = new Vec3(input.horizontal,0,-input.vertical);
        //entity.movement.goal =  game.scene.camera.ToWorldSpace(input_axis);

        var joystick_vector_length = Math.sqrt(input.joystick_x*input.joystick_x + input.joystick_y*input.joystick_y);
        if(joystick_vector_length > 0.0){
            entity.rotation.z =  Math.atan2(input.joystick_y,input.joystick_x)*(180/Math.PI);
        }
        else{
            entity.rotation.z=0;
        }


    }
}