
class Camera{
    constructor(){
        this.ortho = false;
        this.width = 800;
        this.height = 640;
        this.fov = 60;
        this.near = 1.0;
        this.far = 100.0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = new Vec3(0,0,0);
        this.shader = new Shader();
        gl.viewport(0,0,this.width,this.height);
    }
    SetToCameraSpace(mat){
        if(this.rotation.x != 0){mat.Rotate_X(this.rotation.x);}
        if(this.rotation.y != 0){mat.Rotate_Y(this.rotation.y);}
        if(this.rotation.z != 0){mat.Rotate_Z(this.rotation.z);}
        mat.Translate(-this.x,-this.y,-this.z);
    }
    ToWorldSpace(vector){
        return vector.Rotate_Y(this.rotation.y);
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
            var aspect_ratio = camera.width/camera.height;
            this.projection_matrix.SetOrtho(aspect_ratio*10,10,camera.near,camera.far);
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