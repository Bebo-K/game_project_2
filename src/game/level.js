
class Obstacle{

    constructor(renderer,texture,corner_x,corner_y,w,h){
        this.x = corner_x;
        this.y = corner_y;
        this.w = w;
        this.h = h;

        this.sprite = new Sprite(texture,0,0);
        this.sprite.x = this.x+(this.w/2.0);
        this.sprite.y = this.y-(this.h/2.0);
        this.sprite.z = -0.1;

        this.sprite.scale.x = (this.w / this.sprite.texture.width)
        this.sprite.scale.y = (this.h / this.sprite.texture.height)

        renderer.Add(this.sprite);
    }



}





class Level{

    constructor(level_data,renderer){

        var background_texture = texture_manager.AddTextureHandle("background",ATLAS_0,256,256,256,256,1,1);
        this.background = new Sprite(background_texture,0,0);
            this.background.z = -1;
            this.background.scale.x = 5;
            this.background.scale.y = 5;


        renderer.Add(this.background);

        var dirt_patch_texture = texture_manager.AddTextureHandle("dirt_patch",ATLAS_0,0,0,256,186,1,1); 

        this.obstacles = [];

            this.obstacles.push(new Obstacle(renderer,dirt_patch_texture,-100,-128,256,186));


        

    }



    Update(delta,entities){
        for(var i=0; i < entities.length; i++){
            if(entities[i].collision != null){
                for(var j=0;j<entities[i].collision.areas.length;j++){
                    for(var k=0;k<this.obstacles.length;k++){
                        if(entities[i].collision.areas[j].Collides_With(this.obstacles[k])){
                            entities[i].velocity.x *= -1;
                            entities[i].velocity.y *= -1;
                            entities[i].velocity.z *= -1;
                        }
                    }
                }
            }
        }
    }
}