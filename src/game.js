
class Game{

    constructor(){
        this.scene_renderer = new Renderer();
        this.ui_renderer = new Renderer
        this.textures = new TextureManager();
            var atlas_id = this.textures.AddAtlas("/img/atlas_1.png");
        
        var cylinder_tex = this.textures.AddTextureHandle("barrel",atlas_id,0,100,100,100);

        console.log(atlas_id);

        this.cylinder = new CylinderPrimitive(5,1,cylinder_tex);

        this.cylinder.z = 5;

        this.scene_renderer.Add(this.cylinder);
            
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