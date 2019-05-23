class Player{

    constructor(game,start_position){
        this.position = new Position();
        this.position.x = 16;
        this.position.y = 80;
        this.position.z = 4;
        this.velocity = new Vec3();
        this.height = 32;
        this.radius = 6;
       
        if(start_position){this.position.SetFrom(start_position);}

        var tex_atlas = game.textures.texture_atlases[0];
        this.guy_card = new Sprite(game.textures.AddTextureHandle("guy.png",tex_atlas,224,0,48,32),2,1);

        var dropshadow_offset = new Position();
        dropshadow_offset.y=8;
        dropshadow_offset.x=-1;
        dropshadow_offset.z=-1;
        this.drop_shadow = new Sprite(game.textures.AddTextureHandle("dropshadow.png",tex_atlas,272,0,16,16),1,1,dropshadow_offset);
            this.drop_shadow.position.xr = 90;
        game.renderer.Register(this.drop_shadow);
        game.renderer.Register(this.guy_card);
    }

    Update(state,delta){
        if(state.input.left===true){
            this.velocity.x = -0.08;
            this.position.xs = -1;
            this.guy_card.frame=1;
        }
        else if(state.input.right===true){
            this.velocity.x = 0.08;
            this.position.xs = 1;
            this.guy_card.frame=1;
        }
        else{
            //this.velocity.x = 0.0;
            this.guy_card.frame=0;
        }
        this.guy_card.position.SetFrom(this.position);
        this.drop_shadow.position.SetFrom(this.position);//TODO: project drop shadow to floor.
        this.drop_shadow.position.xr = 90;
        this.drop_shadow.position.xs *= 0.8;
        this.drop_shadow.position.ys *= 0.8;
        this.drop_shadow.position.zs *= 0.8;       

        
        state.renderer.camera.x = this.position.x;
        state.renderer.camera.y = this.position.y+64;
    }

    Unload(game){
        game.renderer.Unregister(this.drop_shadow);
        game.renderer.Unregister(this.guy_card);
        this.guy_card.Unload();
        this.drop_shadow.Unload();
    }

}