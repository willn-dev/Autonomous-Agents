let pursuer;
let target;

function setup() {
    createCanvas(800, 800);
    pursuer = new Vehicle(100,100);
    target = new Target(mouseX,mouseY);
}

function draw() {
    background(0);
    let steering = pursuer.arrive(target);
    pursuer.applyForce(steering);
        
    fill(255);

    pursuer.update();
    pursuer.show();
    target.update();
    target.show();
    target.edges();
}
