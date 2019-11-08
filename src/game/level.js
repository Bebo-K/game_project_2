
class Obstacle{

    constructor(renderer,texture,center_x,center_y,w,h){
        this.x = center_x-(w/2);
        this.y = center_y-(h/2);
        this.w = w;
        this.h = h;

        this.sprite = new Sprite(texture,0,0);
        this.sprite.x = center_x;
        this.sprite.y = center_y;

        this.sprite.scale.x = (this.w / this.sprite.texture.width)
        this.sprite.scale.y = (this.h / this.sprite.texture.height)

        renderer.Add(this.sprite);
    }
}

class Level{

    constructor(level_data,renderer){
        var background_texture = texture_manager.AddTextureHandle("background",ATLAS_0,256,256,256,256,1,1);
        this.background = new Sprite(background_texture,0,0);
            this.background.z = -50;
            this.background.scale.x = 5;
            this.background.scale.y = 5;

        renderer.Add(this.background);

        var dirt_patch_texture = texture_manager.AddTextureHandle("dirt_patch",ATLAS_0,0,0,256,186,1,1); 

        this.obstacles = [];

        this.obstacles.push(new Obstacle(renderer,dirt_patch_texture,0,0,256,186));
        this.obstacles.push(new Obstacle(renderer,dirt_patch_texture,-256,0,256,186));
        this.obstacles.push(new Obstacle(renderer,dirt_patch_texture,256,0,256,186));

        this.obstacles.push(new Obstacle(renderer,dirt_patch_texture,256,512,256,186));
        this.obstacles.push(new Obstacle(renderer,dirt_patch_texture,-256,512,256,186));

    }

    Update(delta,entities){
        for(var i=0; i < entities.length; i++){
            if(entities[i].collision != null){
                for(var j=0;j<entities[i].collision.areas.length;j++){
                    for(var k=0;k<this.obstacles.length;k++){
                        if(entities[i].collision.areas[j].Collides_With(this.obstacles[k])){
                            if(entities[i].player.spring_velocity > 0){
                                continue;
                            }
                            var speed = Vec2.Length(entities[i].velocity_x,entities[i].velocity_y);
                            var bounce = Vec2.Rotate(0,speed,entities[i].rotation);

                            if(input.jump == true){
                                entities[i].velocity_x = 0;
                                entities[i].velocity_y = 0;
                                entities[i].player.spring_velocity = speed;
                            }
                            else{
                                entities[i].velocity_x = bounce.x;
                                entities[i].velocity_y = bounce.y;
                            }

                        }
                    }
                }
            }
        }
    }
}