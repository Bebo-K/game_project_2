

class Input{

    constructor(){
        this.left=false;
        this.right=false;
        this.up=false;
        this.down=false;
        this.vertical = 0.0;
        this.horizontal = 0.0;
        this.jump = false;
        this.A = false;
        this.B = false;
        this.debug1 = false;
        this.debug2 = false;
    }

    //TODO: on joystick event

    OnKeyEvent(action_code,fire){
        let left=false,right=false,up=false,down=false;
        switch(action_code){
            case 65: this.left=fire;break;
            case 68: this.right=fire;break;
            case 87: this.up=fire;break;
            case 83: this.down=fire;break;
            case 32: this.jump=fire;break;
            case 81: this.cam_cw=fire;break;
            case 69: this.cam_ccw=fire;break;
            case 74: this.debug1=fire;break;
            case 75: this.debug2=fire;break;
            default:break;
        }
        this.setVirtualJoystick();
    }

    setVirtualJoystick(){
        this.horizontal = 0.0;
        this.vertical = 0.0;
        if(this.left){this.horizontal -= 1.0;}
        if(this.right){this.horizontal += 1.0;}
        if(this.up){this.vertical += 1.0}
        if(this.down){this.vertical -= 1.0}

        let length_sqr = this.horizontal*this.horizontal + this.vertical*this.vertical;
        if(length_sqr > 1.0){
            let rescale = 1.0/Math.sqrt(length_sqr);
            this.horizontal *= rescale;
            this.vertical *= rescale;
        }
    }
}