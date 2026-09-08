let vehicle;
let target;

function setup() {
    createCanvas(400, 400);
    vehicle = new Vehicle(100,100);
}

function draw() {
    background(0);

    fill(255,0,0);
    noStroke;

    target = createVector(mouseX, mouseY);

    if(keyIsDown('f')){
      let fleePath = vehicle.flee(target);
      vehicle.applyForce(fleePath);
      circle(target.x, target.y, 64);
    }else{
        let seekPath = vehicle.seek(target);
        vehicle.applyForce(seekPath);
        circle(target.x, target.y, 32);
    }

    vehicle.update();
    vehicle.show();
}
