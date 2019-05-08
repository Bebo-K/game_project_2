class Room{

    constructor(){
        //TODO: get/parse room structure.
    }

    Load(game) {
        game.level = new Level(document.getElementById("dev_level").text);
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