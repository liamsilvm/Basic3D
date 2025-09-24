class Scene{
    constructor(canvas, ctx, fps){
        this.fps = fps
        this.ctx = ctx //to draw on screen
        this.canvas = canvas //to draw on screen
        this.sceneObjects = []; //this will store the triangles to be rendered
        this.triangles = [];
        

        //camera settings
        this.forwardSpeed = 1
        this.backwardSpeed = -1

        this.rightSpeed = 1
        this.leftSpeed = -1

        this.upSpeed = 1
        this.downSpeed = -1

        this.xSpeed = 0
        this.ySpeed = 0
        this.zSpeed = 0

        this.xRotate = 0
        this.yRotate = 0
        this.zRotate = 0
    }
    generateBlockWorld(gridSize = 20, blockSize = 20, y = -100){
        let blocks = []
        for(let x = -gridSize / 2; x < gridSize / 2; x++){
            for(let z = -gridSize / 2; z < gridSize / 2; z++){
            let cx = x * blockSize
            let cy = -blockSize * Math.ceil(Math.random() * 100)
            let cz = z * blockSize
            let w = blockSize
            
            let cube = new Cube(this.ctx, this.canvas, w, cx, cy, cz, "blue")
            this.triangles.push(... cube.getTriangles())
            }
        }
        return blocks
    }
    translateScene(dx, dy, dz){

    }
    rotateScene(rx, ry, rz){

    }
    userInput(){ 
        document.addEventListener("keydown", (event) => { 
            switch(event.code){
                case "KeyW":
                    this.zSpeed = -1
                    break;
                case "KeyS":
                    this.zSpeed = 1
                    break;
                case "KeyA":
                    this.xSpeed = 1
                    break;
                case "KeyD":
                    this.xSpeed = -1
                    break;
                case "ShiftLeft":
                    this.ySpeed = 1
                    break;
                case "Space":
                    this.ySpeed = -1
                    break;
                case "ArrowLeft":
                    this.yRotate = .01
                    break;
                case "ArrowRight":
                    this.yRotate = -.01
                    break;
            }
        })
        document.addEventListener("keyup", (event) => { 
            switch(event.code){
                case "KeyW":
                    this.zSpeed = 0
                    break;
                case "KeyS":
                    this.zSpeed = 0
                    break;
                case "KeyA":
                    this.xSpeed = 0
                    break;
                case "KeyD":
                    this.xSpeed = 0
                    break;
                case "ShiftLeft":
                    this.ySpeed = 0
                    break;
                case "Space":
                    this.ySpeed = 0
                    break;
                case "ArrowLeft":
                    this.yRotate = 0
                    break;
                case "ArrowRight":
                    this.yRotate = 0
                    break;
            }
        })
    }
    start(){
        this.userInput()
        this.generateBlockWorld()
        this.triangles.sort((a, b) => b.dist() - a.dist())
        this.draw(this.ctx, this.canvas)
    }

    draw(ctx, canvas){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.triangles.sort((a, b) => b.dist() - a.dist()) //sort the triangles from back to front
        this.triangles.forEach(triangle => {
            triangle.rotate(this.xRotate, this.yRotate, this.zRotate);
            triangle.translate(this.xSpeed, this.ySpeed, this.zSpeed);
            triangle.render();
        })
        window.requestAnimationFrame(() => this.draw(ctx, canvas));
    }
}