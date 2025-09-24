class Triangle extends Shape3D{
    constructor(ctx, canvas, vec1, vec2, vec3, fillColor){
        super()
        this.ctx = ctx;
        this.canvas = canvas;
        this.points = [vec1, vec2, vec3]; //the three points associated with a triangle
        this.fillColor = fillColor;
        this.normalVect = {}; //for calculating whether or not to render and lighting
        this.center = null; //for placing normal
        this.normalVect = {x:0, y:0, z:0}
    }
    dist(){
        let maxDist = 0
        let sum = 0

        this.points.forEach(vec => { 
            sum += vec.dist()
        })

        return sum / 3
    }

    calculateNormal(){
        let vec3A = this.points[0]
        let vec3B = this.points[1]
        let vec3C = this.points[2]
        
        //get two vectors used to calculate
        let AB = [vec3B.x - vec3A.x, vec3B.y - vec3A.y, vec3B.z - vec3A.z]
        let AC = [vec3C.x - vec3A.x, vec3C.y - vec3A.y, vec3C.z - vec3A.z]
        
        //now get the cross product
        let crossProduct = [
            AB[1] * AC[2] - AB[2] * AC[1],
            AB[2] * AC[0] - AB[0] * AC[2],
            AB[0] * AC[1] - AB[1] * AC[0]
        ];
        
        this.normalVect = {
        x: crossProduct[0],
        y: crossProduct[1],
        z: crossProduct[2]
        }
        let normal = crossProduct
        
        let center = this.getCenter()
        
        let length = Math.sqrt(
        normal[0] ** 2 + normal[1] ** 2 + normal[2] ** 2 //take the length of the vector
        );
        if (length !== 0) {
            normal = normal.map(n => n / length); //then divide each of the three points of the normal by the length so that you get normalized values 
        }

        // Scale for visibility
        let scale = 4; // or whatever looks good

        let start = center
        let end = new Vec3(
            center.x + normal[0] * scale,
            center.y + normal[1] * scale,
            center.z + normal[2] * scale
        );

        // Visual line of normal for debugging >>
        
        // triangles.push(new Line(start, end));
    }
    getCenter(){
        let avgX = (this.points[0].x + this.points[1].x + this.points[2].x) / 3
        let avgY = (this.points[0].y + this.points[1].y + this.points[2].y) / 3
        let avgZ = (this.points[0].z + this.points[1].z + this.points[2].z) / 3
        
        return new Vec3(avgX, avgY, avgZ)
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
    isFacingCamera(){
        let normal = this.normalVect
        let center = this.getCenter()

        // Vector from triangle center to camera (0,0,0)
        let toCamera = {
            x: -center.x,
            y: -center.y,
            z: -center.z
        }

        // Dot product of normal and direction to camera
        let dotProd = (
            normal.x * toCamera.x +
            normal.y * toCamera.y +
            normal.z * toCamera.z
        )

        // Optional: normalize both vectors before dot product if needed for cosine of angle
        // Not required for just checking sign of dot product

        return dotProd > 0
    }
    calculateIllumination(lightSources){
        let normal = this.normalVect
        let center = this.getCenter()

        lightSources.forEach((ls, i) => {
            
            let lsVect = {
                x: center.x - ls.x,
                y: center.y - ls.y,
                z: center.z - ls.z
            }

        
            let dotProd = lsVect.x * normal.x + lsVect.y * normal.y + lsVect.z * normal.z
            
            
            let normalMag = Math.sqrt(normal.x**2 + normal.y**2 + normal.z**2)
            let lsVectMag = Math.sqrt(lsVect.x**2 + lsVect.y**2 + lsVect.z**2)

            // Check for zero magnitudes
            if (lsVectMag === 0 || normalMag === 0) {
                dotProd = 0
            } else {
                dotProd = dotProd / (lsVectMag * normalMag)
            }
            let intensity = Math.max(0, dotProd) // clamp to avoid negatives
            
         let baseColor = { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255 }; // example base color

        let r = Math.floor(baseColor.r * intensity + 30);
        let g = Math.floor(baseColor.g * intensity + 30);
        let b = Math.floor(baseColor.b * intensity + 30);

        this.fillColor = `rgb(${r}, ${g}, ${b})`;
        })
    }
    render(){
        this.calculateNormal()
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