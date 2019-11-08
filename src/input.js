

class Input{

    constructor(){
        this.cursor_x = canvas_width/2;
        this.cursor_y = canvas_height/2;
        this.radial_cursor_x = 0.0;
        this.radial_cursor_y = 0.0;
        this.radial_cursor_target = 75.0;
        this.radial_cursor_angle = 0;
        this.joystick_x = 0.0;
        this.joystick_y = 0.0;

        this.jump = false;
        this.action_1 = false;
        this.action_2 = false;
    }

    //TODO: on joystick event

    OnKeyEvent(action_code,fire){
        let left=false,right=false,up=false,down=false;
        switch(action_code){
            case 32: this.jump=fire;break;
            case 81: this.cam_cw=fire;break;
            case 69: this.cam_ccw=fire;break;
            case 74: this.debug1=fire;break;
            case 75: this.debug2=fire;break;
            default:break;
        }
    }

    OnMouseMove(delta_x,delta_y){
        this.cursor_x += delta_x;
            if(this.cursor_x > canvas_width){this.cursor_x = canvas_width}
            if(this.cursor_x < 0){this.cursor_x = 0}
        
        this.cursor_x += delta_y;
            if(this.cursor_x > canvas_height){this.cursor_x = canvas_height}
            if(this.cursor_x < 0){this.cursor_x = 0}

        this.radial_cursor_x += delta_x;//((this.cursor_raw_x*2.0)/canvas_width) - 1.0;
        this.radial_cursor_y += delta_y;//((this.cursor_raw_y*2.0)/canvas_height) - 1.0;
        
        var cursor_radius = Vec2.Length(this.radial_cursor_x,this.radial_cursor_y);
        
        if(cursor_radius > 0.0){

            this.joystick_x = this.radial_cursor_x/cursor_radius;
            this.joystick_y = this.radial_cursor_y/cursor_radius;

            this.radial_cursor_x *= (this.radial_cursor_target/cursor_radius);
            this.radial_cursor_y *= (this.radial_cursor_target/cursor_radius);

        }
    }

    OnMouseScroll(scroll_amount){

        this.radial_cursor_angle += scroll_amount*0.1;
        if(this.radial_cursor_angle < -90){this.radial_cursor_angle=-90;}
        if(this.radial_cursor_angle > 90){this.radial_cursor_angle = 90;};

    }

    ZeroJoystick(){
        this.joystick_x=0;
        this.joystick_y=0;
    }

}



