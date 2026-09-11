class Vehicle{
  constructor(x, y) {
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0, 0);

    this.r = 16;
    this.mass = 1;
    this.maxSpeed = 6;
    this.maxForce = 0.4;
  }


  seek(target){

    let targetV = target.pos.copy();
    let force = p5.Vector.sub(targetV, this.pos); //desired path
    force.setMag(this.maxSpeed); 
    force.setMag(this.maxSpeed); 
    force.sub(this.vel);    //subtract current velocity and limit the acting force to "maxForce"
    force.limit(this.maxForce);
    return(force);


  }



    arrive(target){
    let targetV = target.pos.copy();
    let force = p5.Vector.sub(targetV, this.pos); //desired path

    let slowRadius = 100;
    let dist = force.mag();

    if(dist < slowRadius){
      let desiredSpeed = map(dist, 0, slowRadius, 0, this.maxSpeed);
      force.setMag(desiredSpeed);
    } else {
        force.setMag(this.maxSpeed); 
    } 
    force.sub(this.vel);    //subtract current velocity and limit the acting force to "maxForce"
    force.limit(this.maxForce);
    return(force);
  }


  pursue(vehicle){
    let target = vehicle.pos.copy();
    let prediction = vehicle.vel.copy();
    prediction.mult(10);
    target.add(prediction);
    return this.seek({pos: target});
  }

  flee(predator){
    return this.seek(predator).mult(-1);
  }

  evade(vehicle){
    let pursuit = this.pursue(vehicle);
    pursuit.mult(-1);
    return pursuit;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);

  }

    edges() {
      let edgeWrap = false;

      if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
        edgeWrap = true;

      } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
        edgeWrap = true;
      }
      if (this.pos.y > height + this.r) {
        this.pos.y = -this.r;
        edgeWrap = true;
      } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
        edgeWrap = true;
      }

      if (edgeWrap){
        this.onEdgeWrap();
      }
  }

  onEdgeWrap(){
    
  }


  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(225);
    strokeWeight(2);
    fill(220);
    push();
      translate(this.pos.x, this.pos.y,);
      rotate(this.vel.heading());
      triangle(-this.r, -this.r/4, -this.r, this.r/4, 0,0);
    pop();
    /* ellipse(this.pos.x, this.pos.y, this.r * 2); */
  }
}



class Target extends Vehicle{
  constructor(x,y){
    super(x,y);
/*     this.vel = p5.Vector.random2D();
    this.vel.mult(5); */
  }
  
  update(){
    this.pos.set(mouseX,mouseY);
  }

  show(){

    noStroke();
    fill(255,0,0);

    ellipse(this.pos.x, this.pos.y, 16);
/*     push();
      translate(this.pos.x, this.pos.y,);
      rotate(this.vel.heading());
      triangle(-this.r - 2, -this.r/4, -this.r - 2, this.r/4, 0,0);
    pop(); */

  }


/*   onEdgeWrap(){
    this.vel = createVector(random(-3, 3),random(-3,3));
  } */

}

class WrapperPos{
  constructor(x,y){
    this.pos(x,y);
  }
}