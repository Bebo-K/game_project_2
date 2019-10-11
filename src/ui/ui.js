
class UI{

    constructor(){        
        this.ui_layers = [];
        this.ui_layers.push(new UILayer(overlay_template));        
        this.camera = new Camera();
        this.camera.ortho = true;
        this.camera.width = 300;//250
        this.camera.height = 180;//250
        this.camera.near = 0.1;
        this.camera.far = 100.0;
        this.camera.x = this.camera.width/2;
        this.camera.y = this.camera.height/2;
        this.camera.z = 1;
        this.camera.rotation = new Vec3(0,0,0);
        this.camera.shader = new Shader();

    }

    Update (delta) {
        for(var i=0;i<this.ui_layers.length;i++){
            this.ui_layers[i].Update(delta);
        }
    }

    Paint(){
        for(var i=0;i<this.ui_layers.length;i++){
            this.ui_layers[i].Paint(this.camera);
        }
    }

    
}