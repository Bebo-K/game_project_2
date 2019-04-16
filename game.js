

class Game{

    constructor(){
        this.red_color = 0.0;

    }

    Update (delta) {
        
        this.red_color += delta/10000.0
        if(this.red_color > 1){this.red_color = 0};


    }

    Paint(gl){
        gl.clearColor(this.red_color, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

    }



}