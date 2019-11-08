

class CameraTargetComponent{
    constructor(){
        this.offset_x=0.0;
        this.offset_y=0.0;
    }
}

class CameraTargetSystem{

    constructor(){}

    ValidEntity(entity){
        return (entity.camera_target != null);
    }


    Update(entity,delta){
        if(!this.ValidEntity(entity))return;
        game.scene.camera.x = entity.x+ entity.camera_target.offset_x;
        game.scene.camera.y = entity.y+ entity.camera_target.offset_y;
    }
}
