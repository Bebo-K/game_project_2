

class Camera{
    constructor(){
        this.ortho = true;
        this.width = canvas_height;
        this.height = canvas_width;
        this.near = 1.0;
        this.far = 100.0;
        this.x = 0;
        this.y = 0;
        this.z = 1;
        this.shader = new Shader();
    }
    SetToCameraSpace(mat){
       mat.Translate(-this.x,-this.y,-this.z);
    }
}

class Renderer{

    constructor(){
        this.draw_objects = [];
        this.modelview_matrix = new Matrix();
        this.projection_matrix = new Matrix();

        gl.clearColor(0.1, 0.1, 0.1, 1.0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.DEPTH_TEST);
    }

    Add(drawable){
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

    Remove(drawable){
        for(var i=0;i<this.draw_objects.length;i++){
            if(drawable === this.draw_objects[i]){
                this.draw_objects[i] = null;
            }
        }
    }

    Paint(camera){
        camera.shader.Use();
        this.modelview_matrix.SetIdentity();
        if(camera.ortho == true){
            this.projection_matrix.SetOrtho(camera.width,camera.height,camera.near,camera.far);
        }
        else{
            this.projection_matrix.SetPerspective(camera.width,camera.height,camera.near,camera.far,camera.fov);
        }
        
        gl.enableVertexAttribArray(camera.shader.VERTICES);
        gl.enableVertexAttribArray(camera.shader.TEXCOORDS);

        camera.SetToCameraSpace(this.modelview_matrix);

        for(var i=0;i<this.draw_objects.length;i++){
            if(this.draw_objects[i] != null){
                this.draw_objects[i].Draw(camera,this.modelview_matrix,this.projection_matrix);
            }
        }
    }
}