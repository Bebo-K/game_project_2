DATA_menu = {
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