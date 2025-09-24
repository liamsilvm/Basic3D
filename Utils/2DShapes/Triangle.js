class Triangle extends Shape3D{
    constructor(ctx, canvas, vec1, vec2, vec3, fillColor){
        super()
        this.ctx = ctx;
        this.canvas = canvas;
        this.points = [vec1, vec2, vec3]; //the three points associated with a triangle
        this.fillColor = fillColor;
        this.normalVect = {}; //for calculating whether or not to render and lighting
        this.center = null; //for placing normal
    }
    dist(){
        let maxDist = 0
        let sum = 0

        this.points.forEach(vec => { 
            sum += vec.dist()
        })

        return sum / 3
    }
    translate(dx, dy, dz){
        this.points.forEach(vec => { 
            vec.translate(dx, dy, dz);
        })
    }
    rotate(rx, ry, rz){
        this.points.forEach(vec => { 
            vec.rotateX(rx)
            vec.rotateY(ry)
            vec.rotateZ(rz)
        })
    }
    getCenter(){
        
    }
    isFacingCamera(){
        return true //will come back to this
    }
    calculateNormal(){

    }
    render(){
        
        if(this.isFacingCamera()){
            let FOV = 70
            // console.log(this.ctx)
            let near = 1; //near place to cutoff rendering
            let clipped = []; //points passed on to be rendered (must contain more than 3)

            this.ctx.beginPath();
            for(let i = 0; i < 3; i++){
                let vec1 = this.points[i]; let vec2 = this.points[i + 1 % 3]; //mod to loop back to first if at end
                

                if(vec1.z >= near) clipped.push(vec1)
                
                    //here there will need to be some sort of clipped for points that go to close to near.
            }

            if(clipped.length > 3) return;

            this.ctx.beginPath()
            for (let i = 0; i < clipped.length; i++) {
                let curVec = clipped[i];

                let scale = 1 / Math.tan(FOV / 2);
                let aspectRatio = canvas.width / canvas.height;

                let xp = (curVec.x / curVec.z) * scale / aspectRatio;
                let yp = (curVec.y / curVec.z) * scale;

                let xScreenSpace = (xp + 1) * canvas.width / 2;
                let yScreenSpace = (1 - yp) * canvas.height / 2;

                if (i === 0) {
                    ctx.moveTo(xScreenSpace, yScreenSpace);
                } else {
                    ctx.lineTo(xScreenSpace, yScreenSpace);
                }
            }
            ctx.closePath();
            ctx.fillStyle = this.fillColor || "gray";
            ctx.fill();  
            this.ctx.stroke();
        }
    }
}