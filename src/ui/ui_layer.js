const overlay_template = {
    "name":"overlay",
    "width":384,
    "height":256,
    "sprites":[
    {"handle_name":"name_plaque","atlas_id":1,"x":0,"y":0,"width":18,"height":22,"frames":1,"strips":1},
    {"handle_name":"player_point_board","atlas_id":1,"x":0,"y":0,"width":2,"height":22,"frames":2,"strips":1},
    {"handle_name":"party_point_board","atlas_id":1,"x":0,"y":0,"width":44,"height":20,"frames":1,"strips":1},
    
    {"handle_name":"hp_number_plate","atlas_id":1,"x":0,"y":0,"width":36,"height":8,"frames":1,"strips":1},
    {"handle_name":"mp_number_plate","atlas_id":1,"x":0,"y":0,"width":41,"height":11,"frames":1,"strips":1}
    
    ],
    "elements":[
        {"name":"player_plaque","sprite_instance":{"texture":"name_plaque","frame":0,"strip":0},"x":2,"y":3,"enabled":true},
        {"name":"player_point_board_start","sprite_instance":{"texture":"player_point_board","frame":0,"strip":0},"x":22,"y":4,"enabled":true},
        {"name":"player_point_board_center","sprite_instance":{"texture":"player_point_board","frame":0,"strip":1},"x":23,"y":4,"enabled":true},
        {"name":"player_point_board_end","sprite_instance":{"texture":"player_point_board","frame":0,"strip":1},"x":24,"y":4,"enabled":true},
        {"name":"player_hp_plate","sprite_instance":{"texture":"hp_number_plate","frame":0,"strip":0},"x":22,"y":25,"enabled":true},
        {"name":"player_mp_plate","sprite_instance":{"texture":"mp_number_plate","frame":0,"strip":0},"x":21,"y":41,"enabled":true},
        
        
        {"name":"party_member_1_plaque","sprite_instance":{"texture":"name_plaque","frame":0,"strip":0},"x":2,"y":70,"enabled":false},
        {"name":"party_member_1_board","sprite_instance":{"texture":"party_point_board","frame":0,"strip":0},"x":22,"y":71,"enabled":false},
        {"name":"party_member_2_plaque","sprite_instance":{"texture":"name_plaque","frame":0,"strip":0},"x":2,"y":100,"enabled":false},
        {"name":"party_member_2_board","sprite_instance":{"texture":"party_point_board","frame":0,"strip":0},"x":22,"y":101,"enabled":false},
        {"name":"party_member_3_plaque","sprite_instance":{"texture":"name_plaque","frame":0,"strip":0},"x":2,"y":130,"enabled":false},
        {"name":"party_member_3_board","sprite_instance":{"texture":"party_point_board","frame":0,"strip":0},"x":22,"y":131,"enabled":false}	
        ],
    "slots":[
        {"name":"player_heart_row_1","x":24,"y":6},
        {"name":"player_heart_row_2","x":24,"y":12},
        {"name":"player_heart_row_3","x":24,"y":18},
        {"name":"player_mana_bar_start","x":21,"y":36},
        
        {"name":"player_hp_text","x":25,"y":25},
        {"name":"player_max_hp_text","x":43,"y":25},
        {"name":"player_mp_text","x":31,"y":44},
        {"name":"player_max_mp_text","x":49,"y":44},
        
        {"name":"party_member_1_hp_text","x":34,"y":73},
        {"name":"party_member_1_max_hp_text","x":52,"y":73},
        {"name":"party_member_1_mp_text","x":34,"y":82},
        {"name":"party_member_1_max_mp_text","x":52,"y":82},
        
        {"name":"party_member_2_hp_text","x":34,"y":108},
        {"name":"party_member_2_max_hp_text","x":52,"y":108},
        {"name":"party_member_2_mp_text","x":34,"y":117},
        {"name":"party_member_2_max_mp_text","x":52,"y":117},
        
        {"name":"party_member_3_hp_text","x":34,"y":142},
        {"name":"party_member_3_max_hp_text","x":52,"y":142},
        {"name":"party_member_3_mp_text","x":34,"y":151},
        {"name":"party_member_3_max_mp_text","x":52,"y":151}
        ],
    "areas":[]
    };

const menu_template = {
    "name":"menu",
    "width":384,
    "height":256,
    "sprites":[
        {"handle_name":"pause_frame","atlas_id":1,"x":0,"y":0,"width":330,"height":196,"frames":1,"strips":1},
        {"handle_name":"item_slot","atlas_id":1,"x":0,"y":0,"width":102,"height":34,"frames":3,"strips":1}
    ],
    "elements":[
        {"name":"pause_frame","sprite_instance":{"texture":"pause_frame","frame":0,"strip":0},"x":27,"y":29,"enabled":true},
        {"name":"L_item_slot","sprite_instance":{"texture":"item_slot","frame":1,"strip":0},"x":27,"y":29,"enabled":true},
        {"name":"R_item_slot","sprite_instance":{"texture":"item_slot","frame":2,"strip":0},"x":27,"y":29,"enabled":true}
    ],
    "slots":[
        {"name":"L_item","x":203,"y":143},
        {"name":"R_item","x":241,"y":143},
    
        {"name":"unit_HP","x":315,"y":35},
        {"name":"unit_MP","x":315,"y":44},
        {"name":"unit_ATK","x":334,"y":53},
        {"name":"unit_DEF","x":334,"y":62},
        {"name":"unit_FOC","x":334,"y":71},
        {"name":"unit_CLA","x":334,"y":80},
        {"name":"unit_SPD","x":334,"y":89},
        {"name":"unit_CRT","x":334,"y":98},
        {"name":"unit_FRS","x":292,"y":117},
        {"name":"unit_WRS","x":292,"y":128},
        {"name":"unit_NRS","x":323,"y":117},
        {"name":"unit_TRS","x":323,"y":128}
        ],
    "areas":[
        {"name":"inventory_window","x":30,"y":50,"w":110,"h":161},
        {"name":"inventory_slider","x":28,"y":30,"w":17,"h":161},
        {"name":"trinket_window","x":202,"y":58,"w":72,"h":80},
        {"name":"trinket_slider","x":195,"y":62,"w":3,"h":73}
        ]
    }


class UILayer{

    constructor(ui_object){
        
        this.renderer = new Renderer();
        
        this.camera = new Camera();
        this.camera.ortho = true;
        this.camera.width = ui_object.width;
        this.camera.height = ui_object.height;
        this.camera.near = 0.1;
        this.camera.far = 100.0;
        this.camera.x = ui_object.width/2;
        this.camera.y = ui_object.height/2;
        this.camera.z = 1;
        this.camera.rotation = new Vec3(0,0,0);
        this.camera.shader = new Shader();

        this.sprites = [];
        this.slots = [];
        this.areas = [];

        for(var i=0;i< ui_object.sprites.length;i++){
            var template_handle = ui_object.sprites[i];
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
        for(var i=0;i< ui_object.elements.length;i++){
            var template_sprite = ui_object.elements[i].sprite_instance;
            var sprite_handle= texture_manager.GetTextureHandle(template_sprite.texture);
            var static_sprite = new Sprite(sprite_handle, template_sprite.frame, template_sprite.strip);
            static_sprite.x = ui_object.elements[i].x;
            static_sprite.y = ui_object.height - ui_object.elements[i].y;
            static_sprite.z = 0;
            static_sprite.hide = !(ui_object.elements[i].enabled);
            this.sprites.push(static_sprite);
            this.renderer.Add(static_sprite);
        }

       // this.Show();
    }

    Show(){

    }

    Hide(){
    }


    Update (delta) {
    }

    Paint(){
        this.renderer.Paint(this.camera);
    }



}