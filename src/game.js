
class Game{

    constructor(){
        this.scene_renderer = new Renderer();
        this.ui_renderer = new Renderer
        this.textures = new TextureManager();
            this.textures.AddAtlas("/img/atlas_1.png");
            
        this.input = new Input();
    }

    Update (delta) {
        
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