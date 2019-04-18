
class Game{

    constructor(){
        this.renderer = new Renderer();
        this.textures = new TextureManager();
            var atlas_id = this.textures.AddAtlas("/img/atlas_1.png");
                this.textures.AddTextureHandle("tileset.png",atlas_id,0,0,224,128);
                this.textures.AddTextureHandle("guy.png",atlas_id,224,0,48,32);
                this.textures.AddTextureHandle("dropshadow.png",atlas_id,272,0,16,16);
            

        this.guy_card = new Sprite(this.textures.GetTextureHandle("guy.png"),2,1);
        this.tile_card = new Sprite(this.textures.GetTextureHandle("tileset.png"),14,8);
        this.level = new Level(
            document.getElementById("dev_level").text,
            this.textures.GetTextureHandle("tileset.png"), this.tile_card);
        
        this.renderer.Register(this.level);
        this.renderer.Register(this.guy_card);
        this.timer = 0;
    }

    Update (delta) {
        this.timer += delta;

    }

    Paint(){
        this.renderer.Paint();
    }



}