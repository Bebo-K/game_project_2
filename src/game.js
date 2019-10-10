
class Game{


    constructor(){        
        this.scene = new Scene();
        this.ui = new UI();
    }

    Update (delta) {
        this.scene.Update(delta);
    }

    Paint(){
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        this.scene.Draw();
        this.ui.Paint();
    }
}