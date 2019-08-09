

class PhysicsComponent{

    constructor(){}



}

class PhysicsSystem{

    constructor(){
        this.gravity =  -15.0;
        this.terminal_velocity = -64;

    }

    ValidEntity(entity){
        return (entity.phys != null);
    }


    Update(entity,delta){
        if(!ValidEntity(entity))return;

        if(HandleNoPlayerControlCase(entity)){return;}

		var input_axis = new Vec3(input.horizontal,input.vertical,0);
        e.movement.goal =  game.scene.camera.ToWorldSpace(input_axis);
    }

}