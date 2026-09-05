class Vehicle extends p5.Vector{
  constructor(x, y) {
    super(x,y);
    this.mass = 1;
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.9));
    this.acceleration = createVector(0, 0);

    //appearance ----------------
    this.lifetime = 255;
    this.r = 32;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);

  }

  update() {
    this.velocity.add(this.acceleration);
    this.add(this.velocity);
    this.acceleration.mult(0);
    this.lifetime -= 5;
  }


  finished(){
    return (this.lifetime < 0);
  }

  show() {
    tint(255, this.lifetime);
    imageMode(CENTER);
    image(img, this.x, this.y, this.r, this.r);
    //ellipse(this.x, this.y, this.r);
  }

}