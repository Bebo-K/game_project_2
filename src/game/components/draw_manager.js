

class DrawManagerComponent{

    constructor(){
        this.primitives = [];
        this.offsets = [];
    }

    Add(primitive,renderer){
        this.primitives.push(primitive);
        this.offsets.push(new Vec3(primitive.x,primitive.y,primitive.z));
        renderer.Add(primitive);
    }


}


class DrawManagerSystem{

    constructor(renderer){
        this.renderer = renderer;

    }

    ValidEntity(entity){
        return (entity.draw != null);
    }

    Update(entity,delta){
        if(!this.ValidEntity(entity))return;
        for(var i=0;i< entity.draw.primitives.length;i++){

            entity.draw.primitives[i].x = entity.x + entity.draw.offsets[i].x;
            entity.draw.primitives[i].y = entity.y + entity.draw.offsets[i].y;
            entity.draw.primitives[i].z = entity.z + entity.draw.offsets[i].z;
            //entity.draw.primitives[i].rotation.y = entity.rotation.y;
            entity.draw.primitives[i].rotation.z = entity.rotation.z;
        }
    }
}