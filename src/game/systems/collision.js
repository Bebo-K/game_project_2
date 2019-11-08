class CollisionSystem{

    constructor(renderer){
        this.renderer = renderer;

    }

    ValidEntity(entity){
        return (entity.collision != null);
    }

    Update(entity,delta){
        if(!this.ValidEntity(entity))return;
        for(var i=0;i< entity.collision.areas.length;i++){
            var hitbox = entity.collision.areas[i];

            var rotated_offset = Vec2.Rotate(hitbox.offset_x,hitbox.offset_y,entity.rotation);

            hitbox.x = entity.x + rotated_offset.x
            hitbox.y = entity.y + rotated_offset.y
        }
    }
}