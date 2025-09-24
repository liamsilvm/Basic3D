class Vec3{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    translate(dx, dy, dz){ //translate vector in 3D space
        this.x += dx; this.y += dy; this.z += dz
    }
  rotateX(angle){
    let y = this.y;
    let z = this.z;
    this.y = y * Math.cos(angle) - z * Math.sin(angle);
    this.z = y * Math.sin(angle) + z * Math.cos(angle);
  }
  rotateY(angle){
    let x = this.x;
    let z = this.z;
    this.x = x * Math.cos(angle) + z * Math.sin(angle);
    this.z = -x * Math.sin(angle) + z * Math.cos(angle);
  }
  rotateZ(angle){
    let x = this.x;
    let y = this.y;
    this.x = x * Math.cos(angle) - y * Math.sin(angle);
    this.y = x * Math.sin(angle) + y * Math.cos(angle);
  } //0, 0, 0 will always be where the player is
    dist(){return Math.sqrt(this.x**2 + this.y**2 + this.z**2)}
}