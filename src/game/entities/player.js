class Player{

    constructor(game,start_position){
        this.position = new Position();
        this.position.y = 10;
        this.position.z = 4;
        if(start_position){this.position.SetFrom(start_position);}

        var dropshadow_offset = new Position();
        dropshadow_offset.y=8;
        dropshadow_offset.x=-1;
        dropshadow_offset.z=-1;
        this.drop_shadow = new Sprite(game.textures.GetTextureHandle("dropshadow.png"),1,1,dropshadow_offset);
        this.drop_shadow.position.xr = 90;

        this.guy_card = new Sprite(game.textures.GetTextureHandle("guy.png"),2,1);
        this.guy_card.position.x = 10; 
        this.guy_card.position.y = 8; 
        this.guy_card.position.z = 0; 

        game.renderer.Register(this.drop_shadow);
        game.renderer.Register(this.guy_card);
    }

    Update(state,delta){
        if(state.input.left===true){
            this.position.x -= 0.08*delta;
            this.position.xs = -1;
            this.guy_card.frame=1;
        }
        else if(state.input.right===true){
            this.position.x += 0.08*delta;
            this.position.xs = 1;
            this.guy_card.frame=1;
        }
        else{
            this.guy_card.frame=0;
        }
        this.guy_card.position.SetFrom(this.position);
        this.drop_shadow.position.SetFrom(this.position);
        this.drop_shadow.position.xr = 90;
        this.drop_shadow.position.xs *= 0.8;
        this.drop_shadow.position.ys *= 0.8;
        this.drop_shadow.position.zs *= 0.8;        
    }

}