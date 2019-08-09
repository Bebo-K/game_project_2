

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
        if(!entity.movement_enabled) {
			entity.movement.jump_goal=false;
			entity.movement.move_goal.Scale(0.1);
			return true;
        }
        return false;
    }

    Update(entity,delta){
        if(!ValidEntity(entity))return;

        if(HandleNoPlayerControlCase(entity)){return;}

		var input_axis = new Vec3(input.horizontal,input.vertical,0);
        entity.movement.goal =  game.scene.camera.ToWorldSpace(input_axis);
    }
}