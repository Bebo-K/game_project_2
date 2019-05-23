
class Game{

    constructor(){
        this.renderer = new Renderer();
        this.textures = new TextureManager();
        this.physics = new Physics();
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
            this.physics.Update(this,this.entities[e],delta);
            this.entities[e].Update(this,delta);
            
        }

    }

    Paint(){
        this.renderer.Paint();
    }

    InputEvent(action_code,down){
        this.input.OnEvent(action_code,down);
    }

}