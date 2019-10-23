

class CollisionCircle{

    constructor(offset,radius){
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.offset = new Vec3(offset.x,offset.y,offset.z);

        this.radius = radius;
    }
    Collides_With(obstacle){    
        if( this.x-obstacle.x > this.radius &&
            obstacle.x+obstacle.w - this.x > this.radius &&
            this.y-obstacle.y > this.radius &&
            obstacle.y+obstacle.h - this.y > this.radius){
                return true;
            }
        return false;
    }
}

class CollisionComponent{
    constructor(){
        this.areas = []
    }

    Add(collision_bounds){
        this.areas.push(collision_bounds);
    }

}

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

            var rotated_offset = new Vec3(
                entity.collision.areas[i].offset.x,
                entity.collision.areas[i].offset.y,
                entity.collision.areas[i].offset.z)


            entity.collision.areas[i].x = entity.x + rotated_offset.x
            entity.collision.areas[i].y = entity.y + rotated_offset.y
            entity.collision.areas[i].z = entity.z + rotated_offset.z
        }
    }
}