class Shape3D{
    constructor(fillColor, canvas, ctx){
        this.canvas = canvas; this.ctx = ctx
        this.fillColor = fillColor; 
        this.triangles = [];
    }
    translate(dx, dy, dz){}
    rotate(rx, ry, rz){}
    getTriangles(){}
    calculateIllumination(){}
}