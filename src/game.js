
class Game{

    constructor(){
        this.scene_renderer = new Renderer();
        this.ui_renderer = new Renderer();
        this.textures = new TextureManager();
            var atlas_id = this.textures.AddAtlas("/img/atlas_1.png");
        
        var cylinder_tex = this.textures.AddTextureHandle("barrel",atlas_id,0,0,64,64);

        this.scene_renderer.camera.z = 10;

        this.cylinder = new CylinderPrimitive(3,1,cylinder_tex);
        this.cube = new CubePrimitive(1,1,1,cylinder_tex);

        this.cylinder.z = 0;
        this.cylinder.y = -1.5;
        this.cube.y = 2;

        this.scene_renderer.Add(this.cylinder);
        this.scene_renderer.Add(this.cube);
            
        this.input = new Input();
    }

    Update (delta) {
        //this.scene_renderer.camera.rotation.z += (0.01*delta);
        this.cylinder.rotation.y += (0.01*delta);
    }

    Paint(){
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        
        this.scene_renderer.Paint();
        //this.ui_renderer.Paint();
    }

    InputEvent(action_code,down){
        this.input.OnKeyEvent(action_code,down);
    }

}