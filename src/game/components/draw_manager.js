

class DrawManagerComponent{

    constructor(renderer){
        this.renderer_instance = renderer;
        this.primitives = [];
        this.offsets = [];
    }

    Add(primitive,offset){
        this.primitives.push(primitive);
        if(offset != null){
            this.offsets.push(offset);
        }
        this.offsets.push({x:0,y:0,r:0});
        this.renderer_instance.Add(primitive);
    }


}


class DrawManagerSystem{

    constructor(){
    }

    ValidEntity(entity){
        return (entity.draw != null);
    }

    Update(entity,delta){
        if(!this.ValidEntity(entity))return;
        for(var i=0;i< entity.draw.primitives.length;i++){

            entity.draw.primitives[i].x = entity.x + entity.draw.offsets[i].x;
            entity.draw.primitives[i].y = entity.y + entity.draw.offsets[i].y;
            entity.draw.primitives[i].rotation = entity.rotation + entity.draw.offsets[i].r;
        }
    }
}