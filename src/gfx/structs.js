class Vec3{
    constructor(x,y,z){
        this.x=x;
        this.y=y;
        this.z=z;
    }

    Rotate_X(theta){
        var rx = -theta*Math.PI/180;
        var cos = Math.cos(rx);
        var sin = Math.sin(rx);
        return new Vec3(this.x,this.y*cos - this.z*sin, this.y*sin + this.z*cos);
    }
    Rotate_Y(theta){
        var ry = theta*Math.PI/180;
        var cos = Math.cos(ry);
        var sin = Math.sin(ry);
        return new Vec3(this.x*cos + this.z*sin,this.y,this.z*cos - this.x*sin);
    }
    Rotate_Z(theta){
        var rz = -theta*Math.PI/180;
        var cos = Math.cos(rz);
        var sin = Math.sin(rz);
        return new Vec3(this.x*cos - this.y*sin, this.x*sin + this.y*cos, this.z);
    }
}

class Matrix{

    constructor(){
        this.m = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
        ];
    }

    Set(new_m){
        for(var i=0;i<this.m.length;i++){this.m[i]=new_m[i];}
    }

    Copy(){
        var m2 = new Matrix();
        for(var i=0;i<this.m.length;i++){ m2.m[i] = this.m[i];}
        return m2;
    }

    MultiplyBy(mat){
        var new_m = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
        var i,j;
        //Column major on the left = Row Major on the right. In other words, this is a column major muliplication of mat*this, so its this*mat row major.
        for(i=0;i<4;i++){
            for(j=0;j<4;j++){
                new_m[i*4 + j]=( 
                    (this.m[i*4]  	*mat.m[j]) +
                    (this.m[i*4+1]	*mat.m[j+4]) +
                    (this.m[i*4+2]	*mat.m[j+8]) +
                    (this.m[i*4+3]	*mat.m[j+12])
                );
            }
        }
        for(var i=0;i<this.m.length;i++){this.m[i]=new_m[i];}
    }

    Translate(x,y,z){
        var translate_matrix = new Matrix();
        translate_matrix.Set([
                            1,0,0,x,
                            0,1,0,y,
                            0,0,1,z,
                            0,0,0,1
        ]);
        this.MultiplyBy(translate_matrix);
    }
    Scale(vec){
        var scale_matrix = new Matrix();
        scale_matrix.Set([
            vec.x,0,0,0,
            0,vec.y,0,0,
            0,0,vec.z,0,
            0,0,0,1
        ]);
        this.MultiplyBy(scale_matrix);
    }
    Rotate_X(theta){
        var rotate_matrix = new Matrix();
        var rx = -theta*Math.PI/180;
        var cos = Math.cos(rx);
        var sin = Math.sin(rx);
        rotate_matrix.Set([
			1,      0,	    0,      0,
			0,      cos,    -sin,   0,
			0,      sin,    cos,    0,
            0,      0,      0,      1]);
        this.MultiplyBy(rotate_matrix);
    }
    Rotate_Y(theta){
        var rotate_matrix = new Matrix();
        var ry = -theta*Math.PI/180;
        var cos = Math.cos(ry);
        var sin = Math.sin(ry);
        rotate_matrix.Set([
			cos,    0,      sin,    0,
			0,      1,      0,      0,
			-sin,   0,      cos,    0,
            0,      0,      0,      1]);
        this.MultiplyBy(rotate_matrix);
    }
    Rotate_Z(theta){
        var rotate_matrix = new Matrix();
        var rz = -theta*Math.PI/180;
        var cos = Math.cos(rz);
        var sin = Math.sin(rz);
        rotate_matrix.Set([
			cos,    -sin,	0,      0,
			sin,    cos,    0,      0,
			0,      0,      1,      0,
            0,      0,      0,      1]);
        this.MultiplyBy(rotate_matrix);
    }
    Rotate(vec){
        if(vec.x != 0){this.Rotate_X(vec.x);}
        if(vec.y != 0){this.Rotate_Y(vec.y);}
        if(vec.z != 0){this.Rotate_Z(vec.z);}
    }

    SetIdentity(){
        this.Set([1,0,0,0,  0,1,0,0, 0,0,1,0,  0,0,0,1]);
    }
    SetOrtho(width,height,near,far){
        var l = (-width/2); var r = width/2;
        var t = height/2; var b = -height/2;
        var n = near; var f = far;
        this.Set([
            2/(r-l)	,0      ,0       	,-(r+l)/(r-l),
            0      ,2/(t-b)	,0       	,-(t+b)/(t-b),
            0      ,0     	,-2/(f-n)	,-(f+n)/(f-n),
            0      ,0     	,0       	,1
        ]);
    }
    SetFrustum(l,r,b,t,n,f){
		// Row Major Frustum Matrix
		//	X	0 	A 	0 	
		//  0 	Y 	B 	0 
		//  0 	0 	C 	D 	
		//  0 	0 	-1 	0
			
		this.m[0] = (2*n)/(r-l);	 //X
		this.m[2] =  (r+l)/(r-l);	//A
		
		this.m[5] = (2*n)/(t-b); 	 //Y
		this.m[6] = (t+b)/(t-b);	//B
		
		this.m[10] = -((f+n)/(f-n));	 //C
		this.m[11] = -((2*f*n)/(f-n));//D
	
		this.m[14] = -1;
		this.m[15] = 0;
    }
    SetPerspective(width,height,near,far,fov){
		var nearsize = Math.tan(Math.PI*(fov/2)/180)*near;
		var aspect = height/width;
		this.SetFrustum(-nearsize,nearsize,-nearsize*aspect,nearsize*aspect,near,far);
    }
    Get(transpose){
        if(transpose==true){
            var m_t = [0,0,0,0, 0,0,0,0, 0,0,0,0];
            var i,j;
            for(i=0;i<4;i++){
                for(j=0;j<4;j++){
                    m_t[j*4+i]=this.m[i*4+j];
                }
            }
            return m_t;
        }
        else{
            return this.m;
        }
    }

    TransformToSpace(object){
        this.Translate(object.x,object.y,object.z);
        this.Rotate(object.rotation);
        this.Scale(object.scale);
    }

    MultiplyVec(vec){
        var newvec = new Vec3(0,0,0);
        newvec.x = this.m[0]*vec.x + this.m[1]*vec.y + this.m[2]* vec.z + this.m[3];
        newvec.y = this.m[4]*vec.x + this.m[5]*vec.y + this.m[6]* vec.z + this.m[7];
        newvec.z = this.m[8]*vec.x + this.m[9]*vec.y + this.m[10]*vec.z + this.m[11];
        return newvec;
    }

}