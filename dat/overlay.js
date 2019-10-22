DATA_overlay = {
    "name":"overlay",
    "width":384,
    "height":256,
    "sprites":[
    {"handle_name":"name_plaque","atlas_id":1,"x":44,"y":232,"width":22,"height":25,"frames":1,"strips":1},
    {"handle_name":"player_point_board","atlas_id":1,"x":96,"y":192,"width":110,"height":22,"frames":1,"strips":1},
    {"handle_name":"party_point_board","atlas_id":1,"x":0,"y":232,"width":44,"height":20,"frames":1,"strips":1},
    
    {"handle_name":"hp_number_plate","atlas_id":1,"x":0,"y":252,"width":35,"height":7,"frames":1,"strips":1},
    {"handle_name":"mp_number_plate","atlas_id":1,"x":0,"y":259,"width":41,"height":11,"frames":1,"strips":1},
    {"handle_name":"use_item_slot","atlas_id":1,"x":0,"y":192,"width":96,"height":40,"frames":2,"strips":1}
    
    
    ],
    "elements":[
        {"name":"player_plaque","sprite_instance":{"texture":"name_plaque","frame":0,"strip":0},"x":3,"y":4,"enabled":true},
        {"name":"player_hp_plate","sprite_instance":{"texture":"hp_number_plate","frame":0,"strip":0},"x":28,"y":25,"enabled":true},
        {"name":"player_mp_plate","sprite_instance":{"texture":"mp_number_plate","frame":0,"strip":0},"x":27,"y":41,"enabled":true},
        
        {"name":"player_point_board","sprite_instance":{"texture":"player_point_board","frame":0,"strip":0},"x":28,"y":4,"enabled":true},

        {"name":"left_use_item","sprite_instance":{"texture":"use_item_slot","frame":0,"strip":0},"x":278,"y":4,"enabled":true},
        {"name":"right_use_item","sprite_instance":{"texture":"use_item_slot","frame":1,"strip":0},"x":334,"y":4,"enabled":true},
        

        {"name":"party_member_1_plaque","sprite_instance":{"texture":"name_plaque","frame":0,"strip":0},"x":4,"y":80,"enabled":false},
        {"name":"party_member_1_board","sprite_instance":{"texture":"party_point_board","frame":0,"strip":0},"x":28,"y":84,"enabled":false},
        {"name":"party_member_2_plaque","sprite_instance":{"texture":"name_plaque","frame":0,"strip":0},"x":4,"y":110,"enabled":false},
        {"name":"party_member_2_board","sprite_instance":{"texture":"party_point_board","frame":0,"strip":0},"x":28,"y":114,"enabled":false},
        {"name":"party_member_3_plaque","sprite_instance":{"texture":"name_plaque","frame":0,"strip":0},"x":4,"y":140,"enabled":false},
        {"name":"party_member_3_board","sprite_instance":{"texture":"party_point_board","frame":0,"strip":0},"x":28,"y":144,"enabled":false}	
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
}