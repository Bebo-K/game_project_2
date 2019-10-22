

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

        var mouse_angle_vector =  [input.cursor_x,input.cursor_y];
        var mouse_vector_length = Math.sqrt(input.cursor_x*input.cursor_x + input.cursor_y*input.cursor_y);
        if(mouse_vector_length > 0.0){
            mouse_angle_vector[0] /= mouse_vector_length;
            mouse_angle_vector[1] /= mouse_vector_length;
            entity.rotation.z =  Math.atan2(mouse_angle_vector[1],mouse_angle_vector[0])*(180/Math.PI);
        }
        else{
            entity.rotation.z=0;
        }


    }
}