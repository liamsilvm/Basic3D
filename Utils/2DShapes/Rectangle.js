class Rectangle extends Shape3D{
    constructor(ctx, canvas, fillColor = "blue", vec3Arr){
        super()
        this.ctx = ctx
        this.canvas = canvas
        
        this.triangles = [];
        this.fillColor = this.fillColor;

        this.triangles.push(
            new Triangle(
                ctx,
                canvas,
                new Vec3(vec3Arr[0].x, vec3Arr[0].y, vec3Arr[0].z),
                new Vec3(vec3Arr[1].x, vec3Arr[1].y, vec3Arr[1].z),
                new Vec3(vec3Arr[2].x, vec3Arr[2].y, vec3Arr[2].z),
                fillColor
            )
        )
        this.triangles.push(
            new Triangle(
                ctx,
                canvas,
                new Vec3(vec3Arr[2].x, vec3Arr[2].y, vec3Arr[2].z),
                new Vec3(vec3Arr[3].x, vec3Arr[3].y, vec3Arr[3].z),
                new Vec3(vec3Arr[0].x, vec3Arr[0].y, vec3Arr[0].z),
                fillColor
            )
        )
    }
    isFacingCamera(){
        return true //will come back to this
    }
    calculateNormal(){

    }
    translate(tx, ty, tz){ 
        this.triangles.forEach(triangle => { 
            triangle.translate(tx, ty, tz)
        })
    }
    rotate(dx, dy, dz){
        this.triangle.forEach(triangle => { 
            triangle.rotate(dx, dy, dz)
        })
    }
    getTriangles(){
        return this.triangles
    }
}