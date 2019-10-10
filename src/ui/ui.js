
class UI{

    constructor(){        
        this.ui_layers = [];
        this.ui_layers.push(new UILayer(overlay_template));

    }

    Update (delta) {
        for(var i=0;i<this.ui_layers.length;i++){
            this.ui_layers[i].Update(delta);
        }
    }

    Paint(){
        for(var i=0;i<this.ui_layers.length;i++){
            this.ui_layers[i].Paint();
        }
    }

    
}