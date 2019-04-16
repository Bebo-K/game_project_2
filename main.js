


var gl;
var game_instance;
var game_update_interval = 1000.0/60.0;
var last_timestamp = 0;


function game_loop(timestamp){
    window.requestAnimationFrame(game_loop);

    var delta = timestamp - last_timestamp;
    if(delta > game_update_interval){
       if(delta > 1000){delta = 1000;}
       game_instance.Update(delta); 
       last_timestamp = timestamp;
    }
    game_instance.Paint(gl);
}

function main() {
    var canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl");

    if(gl === null){
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    //Load libraries here
    game_instance = new Game();
    window.requestAnimationFrame(game_loop);
}





main();
