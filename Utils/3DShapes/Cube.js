class Cube extends Shape3D{
    constructor(ctx, canvas, w, cx, cy, cz, fillColor){
        super()
        //center coords.
        this.x = cx;
        this.y = cy;
        this.z = cz;

        this.fillColor = fillColor;
        this.rectArr = []

        let cubeFaces = [
            // Front face (z = 1)
            [
                [-1, -1, 1],
                [1, -1, 1],
                [1, 1, 1],
                [-1, 1, 1]
            ],
            // Back face (z = -1)
            [
                [-1, -1, -1],
                [-1, 1, -1],
                [1, 1, -1],
                [1, -1, -1]
            ],
            // Left face (x = -1)
            [
                [-1, -1, -1],
                [-1, -1, 1],
                [-1, 1, 1],
                [-1, 1, -1]
            ],
            // Right face (x = 1)
            [
                [1, -1, -1],
                [1, 1, -1],
                [1, 1, 1],
                [1, -1, 1]
            ],
            // Top face (y = 1)
            [
                [-1, 1, -1],
                [-1, 1, 1],
                [1, 1, 1],
                [1, 1, -1]
            ],
            // Bottom face (y = -1)
            [
                [-1, -1, -1],
                [1, -1, -1],
                [1, -1, 1],
                [-1, -1, 1]
            ]
        ]
        cubeFaces.forEach(face => { 
            let curFaceRect = []
            face.forEach(vect => { 
                curFaceRect.push(new Vec3(vect[0]* w / 2 + cx, vect[1] * w / 2 + cy, vect[2] * w / 2 + cz))
            })
            this.rectArr.push(new Rectangle(ctx, canvas,this.fillColor, curFaceRect))
        })
    }
    render(){
        this.rectArr.forEach(rect => { 
            rect.render()
        })
    }
    getTriangles(){
        let triangles = []

        this.rectArr.forEach(rect => { 
            triangles.push(... rect.getTriangles())
        })
        return triangles;
    }
}