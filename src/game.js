
class Game{

    constructor(){
        this.scene_renderer = new Renderer();
        this.ui_renderer = new Renderer
        this.textures = new TextureManager();
<<<<<<< HEAD
=======
        this.physics = new Physics();
>>>>>>> cb3ecdd8c61c01e6fb2249fa16f8976551ed5cc9
            this.textures.AddAtlas("/img/atlas_1.png");
            
        this.input = new Input();
    }

    Update (delta) {
<<<<<<< HEAD
        
=======
        this.timer += delta;
        for(var e=0;e<this.entities.length;e++){
            this.physics.Update(this,this.entities[e],delta);
            this.entities[e].Update(this,delta);
            
        }

>>>>>>> cb3ecdd8c61c01e6fb2249fa16f8976551ed5cc9
    }

    Paint(){
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        this.scene_renderer.Paint();
        this.ui_renderer.Paint();
    }

    InputEvent(action_code,down){
        this.input.OnEvent(action_code,down);
    }

}