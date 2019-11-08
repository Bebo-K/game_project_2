
var game;
var input;
var loader;
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

function start(){
    game = new Game();
    input = new Input();
    document.addEventListener('keydown', input_keydown, false);
    document.addEventListener('keyup', input_keyup, false);
    document.addEventListener('pointerlockchange', lock_cursor_event, false);
    document.addEventListener('mozpointerlockchange', lock_cursor_event, false);
    document.addEventListener('wheel',scroll_wheel_event, false);
    
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    
    
    canvas.onclick = function() {canvas.requestPointerLock();}
    


    window.requestAnimationFrame(game_loop);
}



function input_keydown(event){
    input.OnKeyEvent(event.keyCode,true);
}
function input_keyup(event){
    input.OnKeyEvent(event.keyCode,false);
}

function scroll_wheel_event(event){
    input.OnMouseScroll(event.deltaY);
}

function input_mouseMove(event) {
    input.OnMouseMove(event.movementX,event.movementY);
}

function lock_cursor_event() {
    if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
      document.addEventListener("mousemove", input_mouseMove, false);
    } else {
      document.removeEventListener("mousemove", input_mouseMove, false);
    }
}

function main() {
    if(gl === null){
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    start();
}

main();
