
class Game{

    constructor(){
        this.renderer = new Renderer();
        this.textures = new TextureManager();
        this.input = new Input();
            var atlas_id = this.textures.AddAtlas("/img/atlas_1.png");
                this.textures.AddTextureHandle("tileset.png",atlas_id,0,0,224,128);
                this.textures.AddTextureHandle("guy.png",atlas_id,224,0,48,32);
                this.textures.AddTextureHandle("dropshadow.png",atlas_id,272,0,16,16);
            
        this.level = new Level(
            document.getElementById("dev_level").text,
            this.textures.GetTextureHandle("tileset.png"), this.tile_card);
        
        this.renderer.Register(this.level);

        this.player = new Player(this);
        this.timer = 0;
    }

    Update (delta) {
        this.timer += delta;
        this.player.Update(this,delta);
    }

    Paint(){
        this.renderer.camera.x = this.player.position.x;
        this.renderer.Paint();
    }

    InputEvent(action_code,down){
        this.input.OnEvent(action_code,down);
    }

}