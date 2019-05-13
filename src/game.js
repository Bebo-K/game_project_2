
class Game{

    constructor(){
        this.renderer = new Renderer();
        this.textures = new TextureManager();
        this.collision = new Collision();
            this.textures.AddAtlas("/img/atlas_1.png");
        this.input = new Input();
        this.level = null;
        this.entities = [];
        this.timer = 0;
        this.room = new Room();/*data source for each room?*/
        this.room.Load(this);
    }

    Update (delta) {
        this.timer += delta;
        for(var e=0;e<this.entities.length;e++){
            this.entities[e].Update(this,delta);
            this.collision.Update(this,this.entities[e],delta);
        }

    }

    Paint(){
        this.renderer.Paint();
    }

    InputEvent(action_code,down){
        this.input.OnEvent(action_code,down);
    }

}