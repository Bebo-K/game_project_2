

class CameraTargetComponent{
    constructor(){
        this.turn=0;
		this.zoom=0;
		this.pitch=0;
		this.offset=new Vec3(0,0,0);
        this.zoom_min=5;
        this.zoom_max=100;
        this.zoom_min_tilt=10;
        this.zoom_max_tilt=80;
    }
}

class CameraTargetSystem{

    constructor(){
        this.turn_sensitivity = 100.0;
    }

    ValidEntity(entity){
        return (entity.camera_target != null);
    }

    ClampZoom(entity){

        //*TODO*//

    }

    CalculatePitch(entity){

        //*TODO*//
        
    }

    Update(entity,delta){
        if(!ValidEntity(entity))return;
        if(input.cam_wc){e.cam_target.turn -= delta*turn_sensitivity;}
		if(input.cam_ccw){e.cam_target.turn += delta*turn_sensitivity;}
		
        var cam_offset = new Vec3(0,0,1);

        cam_offset = cam_offset.Rotate_Y(entity.camera_target.turn);
        cam_offset.x *= entity.camera_target.zoom;
        cam_offset.y *= entity.camera_target.zoom;
        cam_offset.z *= entity.camera_target.zoom;

        ClampZoom(entity);

        game.scene.camera.x = entity.x+ cam_offset.x;
        game.scene.camera.y = entity.y+ cam_offset.y;
        game.scene.camera.z = entity.z+ cam_offset.z;
        game.scene.camera.rotation.y = entity.camera_target.turn;
        game.scene.camera.rotation.x = CalculatePitch(entity);
    }
}
