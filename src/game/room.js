class Room{

    constructor(){
        //TODO: get/parse room structure.
    }

    Load(game) {
        var tex_atlas = game.textures.texture_atlases[0];//TODO: search when we have multiple atlases.
        var tileset_texture = game.textures.AddTextureHandle("tileset.png",tex_atlas,0,0,224,128);

        game.level = new Level(document.getElementById("dev_level").text,tileset_texture,);
        game.renderer.Register(game.level);

        game.entities.push(new Player(game));
    }

    Unload(game){
        for(var e=0;e<game.entities.length;e++){
            game.entities[e].Unload(game);
        }
        game.renderer.Unregister(game.level);
        game.level.Unload();
    }

}