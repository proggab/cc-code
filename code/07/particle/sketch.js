let ps;

function setup() {
    createCanvas (600, 600);
    ps = new ParticleSystem();
}

function draw() {
background(200);
ps.update();
ps.display();
}

function mousePressed () {
   ps.addParticles(10, createVector(mouseX, mouseY));
    
}