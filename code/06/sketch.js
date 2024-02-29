let myVehicle;
function setup() {
    createCanvas (500, 600);
    myVehicle = new Vehicle(width/2,30);
}


function draw() {
    background(200);
    const gravity = createVector(0,0.02);
    const wind = createVector(0,0.02);
    myVehicle.applyForce(gravity);
    myVehicle.update();
    myVehicle.display();

    if (mouseIsPressed) {
        const xDiff= myVehicle.loc.x-mouseX;
        const wind = createVector(xDiff, 0);
        //wind.mult(0.01);
        wind.normalize(0.01);
        wind.mult(0.6);
        myVehicle.applyForce(wind);
    }
}


