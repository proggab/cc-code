let engine;
let shapes = [];
let walls;
let staircase;
let mouseConstraint;
let stairOffsetX = 0; 
let prevMouseX = 0; 

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  engine = Matter.Engine.create();
  walls = new Walls(engine.world);
  walls.addSideWalls();


  staircase = createStaircase(engine.world);


  shapes.push(...staircase.steps);

  // first balls
numBalls = 200;
  for (let i = 0; i < numBalls; i++) {
    const options = {
      friction: 1,
      frictionAir: 0,
      restitution: 1,
      inertia: Infinity
    };
    createCircle(random(width * 0.25, width * 0.75), random(-height, -10), options);
  }


  const matterMouse = Matter.Mouse.create(canvas.elt);
  const mcOptions = {
    mouse: matterMouse
  };
  mouseConstraint = Matter.MouseConstraint.create(engine, mcOptions);
  Matter.World.add(engine.world, mouseConstraint);


  Matter.Runner.run(engine);
  prevMouseX = mouseX;
}


function createStaircase(world) {
  let steps = [];
  let numSteps = 6;
  let stepWidth = width / numSteps;
  let stepHeight = 20;

  for (let i = 0; i < numSteps; i++) {
    let pos = createVector((i + 1) * stepWidth, height - (i + 1) * stepHeight);
    let size = createVector(stepWidth * 0.8, stepHeight);
    let options = { isStatic: true };
    let step = new Rect(world, pos, size, options);
    steps.push(step);
  }

  return { steps };
}

function createCircle(x, y, options) {
  let shape = new Circle(engine.world,
    createVector(x, y),
    createVector(10, 25),
    options);

  shapes.push(shape);
}

function draw() {
  background(0);
  walls.display();


  let horizontalMovement = mouseX - prevMouseX;
  prevMouseX = mouseX;
  

  let movementSpeed =80; 
  let targetAngles = [];
  let verticalMovement = 0; 
  if (keyIsDown(LEFT_ARROW)) {
    for (let i = 0; i < staircase.steps.length; i++) {
      targetAngles.push(-PI / 4);
    }
    stairOffsetX += movementSpeed; 
  } else if (keyIsDown(RIGHT_ARROW)) {
    for (let i = 0; i < staircase.steps.length; i++) {
      targetAngles.push(PI / 4);
    }
    stairOffsetX -= movementSpeed; 
  } else {
    for (let i = 0; i < staircase.steps.length; i++) {
      targetAngles.push(0);
    }
  }


  if (keyIsDown(UP_ARROW)) {
    verticalMovement = -movementSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    verticalMovement = movementSpeed;
  }


  for (let i = 0; i < staircase.steps.length; i++) {
    let step = staircase.steps[i];
    let targetAngle = targetAngles[i];
    let currentAngle = step.body.angle;
    let newAngle = lerp(currentAngle, targetAngle, 1); // Smoothly animate angle changes
    Matter.Body.setAngle(step.body, newAngle);


    Matter.Body.setPosition(step.body, {
      x: step.body.position.x + horizontalMovement,
      y: step.body.position.y + verticalMovement
    });
  }


  for (let i = 0; i < staircase.steps.length; i++) {
    let step = staircase.steps[i];
    step.display();
  }


  for (let i = shapes.length - 1; i >= 0; i--) {
    const s = shapes[i];
    s.display();
    if (s.isDead()) {
      shapes.splice(i, 1);
    }
  }


  Matter.Engine.update(engine);

//more ball
  if (keyIsPressed && keyCode === UP_ARROW) {
    numBalls = 200;
  for (let i = 0; i < numBalls; i++) {
    const options = {
      friction: 1,
      frictionAir: 0,
      restitution: 1,
      inertia: Infinity
    };
    createCircle(random(width * 0.25, width * 0.75), random(-height, -10), options);
  }
}

  
  }
