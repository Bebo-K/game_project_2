

class Input{

    constructor(){
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.jump = false;
        this.debug1 = false;
        this.debug2 = false;
    }

    OnEvent(action_code,fire){
        switch(action_code){
            case 65: this.left=fire;break;
            case 68: this.right=fire;break;
            case 87: this.up=fire;break;
            case 83: this.down=fire;break;
            case 32: this.jump=fire;break;
            case 74: this.debug1=fire;break;
            case 75: this.debug2=fire;break;
            default:break;
        }
    }

}