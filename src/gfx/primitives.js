

class CylinderPrimitive{

    constructor(height,radius){

        this.radius = radius;
        this.height = height;
        const rings = 8;

        var verts = [];
        var tex_coords = [];
        var theta1,theta2;
        var fraction1,fraction2;

        for(var i=0;i<rings;i++){
            theta1 = (fraction1*Math.PI*2.0);   
            theta2 = (fraction2*Math.PI*2.0);
            fraction1 = i/rings * 1.0; 
            fraction2 = (i+1.0)/rings;
            
            verts.push(radius*Math.cos(theta1),0,radius*Math.sin(theta1));
            tex_coords.push(fraction1,0.25);
            verts.push(radius*Math.cos(theta1),height,radius*Math.sin(theta1));
            tex_coords.push(fraction1,1.0);
            verts.push(radius*Math.cos(theta2),height,radius*Math.sin(theta1));
            tex_coords.push(fraction2,1.0);

            verts.push(radius*Math.cos(theta2),height,radius*Math.sin(theta1));
            tex_coords.push(fraction2,1.0);
            verts.push(radius*Math.cos(theta2),0,radius*Math.sin(theta1));
            tex_coords.push(fraction2,0.25);
            verts.push(radius*Math.cos(theta1),0,radius*Math.sin(theta1));
            tex_coords.push(fraction1,0.25);

            //cap top
            verts.push(radius*Math.cos(theta1),height,radius*Math.cos(theta1));
            tex_coords.push(0.25 + 0.25*Math.cos(theta1),0.25 + 0.25*Math.sin(theta1));
            verts.push(radius*Math.cos(theta2),height,radius*Math.cos(theta2));
            tex_coords.push(0.25 + 0.25*Math.cos(theta2),0.25 + 0.25*Math.sin(theta2));
            verts.push(0,height,0);
            tex_coords.push(0.25,0.25);

            //cap bottom
            verts.push(radius*Math.cos(theta1),0,radius*Math.cos(theta1));
            tex_coords.push(0.75 + 0.25*Math.cos(theta1),0.25 + 0.25*Math.sin(theta1));
            verts.push(radius*Math.cos(theta2),0,radius*Math.cos(theta2));
            tex_coords.push(0.75 + 0.25*Math.cos(theta2),0.25 + 0.25*Math.sin(theta2));
            verts.push(0,0,0);
            tex_coords.push(0.75,0.25);
        }
        



    }






}