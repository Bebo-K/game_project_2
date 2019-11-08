

class PlayerControlComponent{

    constructor(entity){
        this.movement_enabled = true;
        this.spring_velocity = 0;

        var cursor_tex = texture_manager.AddTextureHandle("radial_cursor",ATLAS_0,304,0,30,30,1,1);
            var cursor_sprite=new Sprite(cursor_tex,0,0,-56,-56);
            cursor_sprite.z = 0.1;

        entity.draw.Add(cursor_sprite,this.renderer,{x:0,y:0,r:45});
        
        this.radial_cursor_offset = entity.draw.offsets[entity.draw.offsets.length-1];
        
    }

}

class PlayerControlSystem{

    constructor(){}

    ValidEntity(entity){
        return (entity.player != null);
    }

    Update(entity,delta){
        if(!this.ValidEntity(entity))return;
        entity.player.radial_cursor_offset.r = 45+input.radial_cursor_angle;
        if(Vec2.NonZero(input.joystick_x,input.joystick_y)){
            entity.rotation = Vec2.Angle(input.joystick_x,input.joystick_y)-input.radial_cursor_angle;
        }

        if(input.jump == true && entity.player.spring_velocity > 0){

            if(entity.draw.primitives[0].scale.y > .75){
                entity.draw.primitives[0].scale.y -= delta*0.0005;
                if(entity.player.spring_velocity < 300){
                    entity.player.spring_velocity += delta;
                }
                else{
                    entity.player.spring_velocity *= Math.pow(1.5,delta/1000.0);
                }
            }
            else{
                entity.player.spring_velocity /= 2;
                entity.draw.primitives[0].scale.y= 1.0
                input.jump = false
            }
        }
        if(input.jump == false){
            if(entity.player.spring_velocity > 0){
                var bounce = Vec2.Rotate(0,entity.player.spring_velocity,entity.rotation);

                entity.velocity_x = bounce.x;
                entity.velocity_y = bounce.y;
    
                entity.player.spring_velocity =0;
            }
            entity.draw.primitives[0].scale.y = 1.0;
        }


        input.ZeroJoystick();
    }
}