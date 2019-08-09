
var game;
var input;
var game_update_interval = 1000.0/60.0;
var last_timestamp = 0;

function game_loop(timestamp){
    window.requestAnimationFrame(game_loop);

    var delta = timestamp - last_timestamp;
    if(delta > game_update_interval){
       if(delta > 1000){delta = 1000;}
       game.Update(delta); 
       last_timestamp = timestamp;
    }
    game.Paint();
}

function main() {
    if(gl === null){
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    game = new Game();
    input = new Input();
    document.addEventListener('keydown', input_keydown, false);
    document.addEventListener('keyup', input_keyup, false);
    window.requestAnimationFrame(game_loop);

}

function input_keydown(event){
    input.OnKeyEvent(event.keyCode,true);
}
function input_keyup(){
    input.OnKeyEvent(event.keyCode,false);
}


main();
