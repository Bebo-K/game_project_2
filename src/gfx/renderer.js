
class Renderer{

    constructor(){
        this.draw_objects = [];
        this.width = 800;
        this.height = 640;
        this.modelview_matrix = new Matrix();
        this.projection_matrix = new Matrix();
        this.projection_matrix.SetPerspective(this.width,this.height,5,1000,60);
        //this.projection_matrix.SetOrtho(this.width,this.height,5,1000);
        
        gl.clearColor(0.1, 0.1, 0.1, 1.0);
        gl.enable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);

        gl.viewport(0,0,this.width,this.height);
        this.shader = new Shader();
    }

    Register(drawable){
        var first_empty_slot = -1;
        for(var i=0;i<this.draw_objects.length;i++){
            if(drawable === this.draw_objects[i])return;
            if(this.draw_objects[i]===null && first_empty_slot< 0){
                first_empty_slot = i;
            }
        }
        if(first_empty_slot > 0){
            this.draw_objects[first_empty_slot] = drawable;
        }
        else{
            this.draw_objects.push(drawable);
        }
    }

    Unregister(drawable){
        for(var i=0;i<this.draw_objects.length;i++){
            if(drawable === this.draw_objects[i]){
                this.draw_objects[i] = null;
            }
        }
    }

    Paint(){
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        this.shader.Use();
        
        gl.enableVertexAttribArray(this.shader.VERTICES);
        gl.enableVertexAttribArray(this.shader.TEXCOORDS);

        this.modelview_matrix.SetIdentity();
        this.modelview_matrix.Translate(0,0,-100);

        for(var i=0;i<this.draw_objects.length;i++){
            this.draw_objects[i].Draw(this.shader,this.modelview_matrix,this.projection_matrix);
        }
    }
}