
class Game{

    constructor(){        
        this.scene = new Scene();
        this.ui_renderer = new Renderer();

        this.input = new Input();
    }

    Update (delta) {
        this.scene.Update(delta);
    }

    Paint(){
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        this.scene.Draw();
        //this.ui_renderer.Paint();
    }

    InputEvent(action_code,down){
        this.input.OnKeyEvent(action_code,down);
    }

}