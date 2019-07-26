
class Game{

    constructor(){
        this.scene_renderer = new Renderer();
        this.ui_renderer = new Renderer();
        this.textures = new TextureManager();
            var atlas_id = this.textures.AddAtlas("/img/atlas_1.png");
        
        var cylinder_tex = this.textures.AddTextureHandle("barrel",atlas_id,0,100,100,100);
        var sprite_tex = this.textures.AddTextureHandle("sprite",atlas_id,0,0,32,32);

        this.scene_renderer.camera.z = 5;

        this.cylinder = new CubePrimitive(1,1,1,cylinder_tex);
        this.sprite = new Sprite(sprite_tex,1,1);

        this.scene_renderer.Add(this.cylinder);
            
        this.input = new Input();
    }

    Update (delta) {
        this.scene_renderer.camera.rotation.y += (0.01*delta);
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