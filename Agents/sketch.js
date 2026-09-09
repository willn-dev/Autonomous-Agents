let pursuer;
let target;
let score = 0;

function setup() {
    createCanvas(800, 800);
    pursuer = new Vehicle(100,100);
    target = new Target(200,100);
}

function draw() {
    background(0);
    let steering = pursuer.pursue(target);
    pursuer.applyForce(steering);
        
    let d = p5.Vector.dist(pursuer.pos, target.pos);
    if (d < pursuer.r + target.r){
        target = new Target(random(width), random(height));
        score += 1;
    }

    fill(255);
    text(`Prey Killed: ${score}`, 20, height - 20,);

    pursuer.update();
    pursuer.show();

    target.update();
    target.show();
    target.edges();
}
