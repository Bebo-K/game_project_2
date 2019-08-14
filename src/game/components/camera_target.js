

class CameraTargetComponent{
    constructor(){
        this.turn=0;
		this.zoom=1;
		this.pitch=0;
		this.offset=new Vec3(0,2.5,8);
        this.zoom_min=1;
        this.zoom_max=10;
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
        if(entity.camera_target.zoom < this.zoom_min){entity.camera_target.zoom = this.zoom_min;}
        if(entity.camera_target.zoom > this.zoom_max){entity.camera_target.zoom = this.zoom_max;}
    }

    CalculatePitch(entity){
        var zoom_pct = (entity.camera_target.zoom-this.zoom_min)/(this.zoom_max-this.zoom_min);
        return (zoom_pct *(1/(this.zoom_max_tilt-this.zoom_min_tilt))) + this.zoom_min_tilt;
    }

    Update(entity,delta){
        if(!this.ValidEntity(entity))return;
        var seconds= delta/1000.0;
        if(input.cam_cw){entity.camera_target.turn -= seconds*this.turn_sensitivity;}
		if(input.cam_ccw){entity.camera_target.turn += seconds*this.turn_sensitivity;}
		
        var cam_offset = entity.camera_target.offset.Rotate_Y(entity.camera_target.turn);
        cam_offset.x *= entity.camera_target.zoom;
        cam_offset.y *= entity.camera_target.zoom;
        cam_offset.z *= entity.camera_target.zoom;

        //this.ClampZoom(entity);

        game.scene.camera.x = entity.x+ cam_offset.x;
        game.scene.camera.y = entity.y+ cam_offset.y;
        game.scene.camera.z = entity.z+ cam_offset.z;
        game.scene.camera.rotation.y = entity.camera_target.turn;
      //  game.scene.camera.rotation.x = this.CalculatePitch(entity);
    }
}
