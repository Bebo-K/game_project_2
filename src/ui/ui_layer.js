class UILayer{

    constructor(ui_data){
        this.template = ui_data;
        this.renderer = new Renderer();
        this.sprites = [];
        this.slots = [];
        this.areas = [];

        for(var i=0;i< this.template.sprites.length;i++){
            var template_handle = this.template.sprites[i];
            texture_manager.AddTextureHandle(
                template_handle.handle_name,
                ATLAS_0,//template_handle.atlas_id,
                template_handle.x,
                template_handle.y,
                template_handle.width,
                template_handle.height,
                template_handle.frames,
                template_handle.strips);
        }
        for(var i=0;i< this.template.elements.length;i++){
            var template_sprite = this.template.elements[i].sprite_instance;
            var sprite_handle= texture_manager.GetTextureHandle(template_sprite.texture);
            var sprite_offset = new Vec3(-sprite_handle.width/2.0,sprite_handle.height,0);
            var static_sprite = new Sprite(sprite_handle, template_sprite.frame, template_sprite.strip,sprite_offset);
            static_sprite.x = this.template.elements[i].x;
            static_sprite.y = -this.template.elements[i].y;
            static_sprite.z = 0;
            static_sprite.hide = !(this.template.elements[i].enabled);
            this.sprites.push(static_sprite);
            this.renderer.Add(static_sprite);
        }

        this.slots = this.template.slots;
        this.areas = this.template.areas;

    }

    GetSlot(slotname){
        for(var i=0;i< this.slots.length; i++){
            if(this.slots[i].name == slotname)return this.slots[i];
        }
    return null;
    }
    GetArea(slotname){
        for(var i=0;i< this.slots.length; i++){
            if(this.slots[i].name == slotname)return this.slots[i];
        }
    return null;
    }

    Show(){

    }

    Hide(){
    }


    Update (delta) {
    }

    Paint(screen_camera){
        this.renderer.Paint(screen_camera);
    }



}