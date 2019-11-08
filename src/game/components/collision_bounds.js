

class CollisionCircle{

    constructor(offset_x,offset_y,radius,flags){
        this.x = 0;
        this.y = 0;

        this.offset_x=offset_x;
        this.offset_y=offset_y;
        this.radius =radius;
        this.flags = flags;
    }
    Collides_With(obstacle){    
        if( this.x - (obstacle.x + obstacle.w) < this.radius &&
            obstacle.x - this.x < this.radius &&
            this.y - (obstacle.y + obstacle.h) < this.radius &&
            obstacle.y - this.y < this.radius){
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

