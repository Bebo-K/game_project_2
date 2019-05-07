

class Position{
    constructor(x,y,z){
        this.x = (x)?x:0;
        this.y = (y)?y:0;
        this.z = (z)?z:0;
        this.xr = 0;
        this.yr = 0;
        this.zr = 0;
        this.xs = 1;
        this.ys = 1;
        this.zs = 1;
    }

    SetFrom(p){
        this.x = p.x;
        this.y = p.y;
        this.z = p.z;
        this.xr = p.xr;
        this.yr = p.yr;
        this.zr = p.zr;
        this.xs = p.xs;
        this.ys = p.ys;
        this.zs = p.zs; 
    }

    ApplyToMatrix(m){
        if(this.x != 0 || this.y != 0 || this.z != 0){
            m.Translate(this.x,this.y,this.z);
        }

        if(this.xr != 0){
           m.Rotate_X(this.xr);
        }
        if(this.yr != 0){
            m.Rotate_Y(this.yr);
        }
        if(this.zr != 0){
            m.Rotate_Z(this.zr);
        }

        if(this.xs != 1.0 || this.ys != 1.0 || this.zs != 1.0){
            m.Scale(this.xs,this.ys,this.zs);
         }
    }
    ApplyInvToMatrix(m){
        if(this.xs != 1.0 || this.ys != 1.0 || this.zs != 1.0){
            m.Scale(this.xs,this.ys,this.zs);
         }

        if(this.xr != 0){
           m.Rotate_X(this.xr);
        }
        if(this.yr != 0){
            m.Rotate_Y(this.yr);
        }
        if(this.zr != 0){
            m.Rotate_Z(this.zr);
        }
        
         if(this.x != 0 || this.y != 0 || this.z != 0){
            m.Translate(-this.x,-this.y,this.z);
        }
    }
}