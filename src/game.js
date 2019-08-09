
class Game{

    constructor(){        
        this.scene = new Scene();
    }

    Update (delta) {
        this.scene.Update(delta);
    }

    Paint(){
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        this.scene.Draw();
    }
}