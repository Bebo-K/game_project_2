

class Input{

    constructor(){
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.jump = false;

    }

    OnEvent(action_code,fire){
        switch(action_code){
            case 39: this.right=fire;break;
            case 37: this.left=fire;break;
            case 40: this.down=fire;break;
            case 38: this.up=fire;break;
            case 32: this.jump=fire;break;
            default:break;
        }
    }

}