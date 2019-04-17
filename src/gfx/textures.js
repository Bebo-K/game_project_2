
var ATLAS_WIDTH = 1024;
var ATLAS_HEIGHT = 1024;

class TextureHandle{
    constructor(handle_name,gl_id,x,y,width,height){
        this.name = handle_name;
        this.gl_id = gl_id;
        this.x = x;this.y = y;
        this.width = width; this.height = height;
        this.texture_x = this.x/ATLAS_WIDTH;
        this.texture_y = this.y/ATLAS_HEIGHT;
        this.texture_w = this.width/ATLAS_WIDTH;
        this.texture_h = this.height/ATLAS_HEIGHT;
    }
}

class TextureManager{

    constructor(){
        this.texture_atlases = [];
        this.texture_handles = [];
    }

    AddAtlas(image_name){
        var atlas_id = gl.createTexture();
        var atlas_image = new Image();

        
        gl.bindTexture(gl.TEXTURE_2D, atlas_id);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([255, 0, 255, 255]))

        atlas_image.onload = function(){
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, atlas_id);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, atlas_image);
            gl.generateMipmap(gl.TEXTURE_2D);
            
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }
        atlas_image.src = image_name;
        this.texture_atlases.push(atlas_id);
        return atlas_id;
    }

    AddTextureHandle(handle_name,atlas_id,x,y,width,height){
        this.texture_handles.push(new TextureHandle(handle_name,atlas_id,x,y,width,height));
    }
    GetTextureHandle(handle_name){
        var handle = null;
        for(var i=0;i<this.texture_handles.length;i++){
            if(handle_name == this.texture_handles[i].name){
                handle = this.texture_handles[i];
            }
        }
        return handle;
    }
}
