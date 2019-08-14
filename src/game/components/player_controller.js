

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

		var input_axis = new Vec3(input.horizontal,0,-input.vertical);
        entity.movement.goal =  game.scene.camera.ToWorldSpace(input_axis);
    }
}