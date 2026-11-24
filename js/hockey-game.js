//for save celebration animation; sets angles of wing and body tilt; timer element
let weightShift = 0;
let shiftDirection = 1;
let wingAngle = -25;
let frameAfterSave = 0;

// puck; sets puck start position, travel direction, and speed
let puckX = 500;
let puckY = 490;
let directionX = 1;
let directionY = -1;
let speedX = 3.5;
let speedY = 1.6;

//creates stick save motion; sets stick angle at start and end of drop; creates boolean for "collision detection" to determine if he celebrates or not
let stickAngle = -10;
let targetStickAngle = -10;
let stickDropping = false;

function setup() {
  let canvas = createCanvas(550, 600);
  canvas.parent('game-container');
  angleMode(DEGREES);
}

function draw() {
  background("#bbddee");

  // rink wall + ice
  fill("#F0F7EE");
  rect(0, 100, 600, 130);
  stroke("black");
  strokeWeight(0.5);
  fill("#FFD400");
  rect(0, 230, 600, 25);
  fill("#6E0D25");
  rect(0, 100, 600, 10);
  fill("#EEFFFF");
  noStroke();
  rect(0, 255, 600, 455);

  //I added the blue goal line here to draw on the correct layer
  fill("#91C2FF");
  rect(0, 360, 600, 10); //goal line

  //creates puck movement
  puckX += speedX * directionX;
  puckY += speedY * directionY;

  //checks for save
  if (
    directionY === -1 &&
    puckX > 270 &&
    puckX < 350 &&
    puckY > 340 &&
    puckY < 377 &&
    stickAngle > 20
  ) {
    directionY = 1;
    if (frameAfterSave === 0) frameAfterSave = 1;
  }

  //celebration
  if (frameAfterSave > 0) {
    frameAfterSave++;
    weightShift += 0.3 * shiftDirection;
    if (weightShift > 3 || weightShift < -3) shiftDirection *= -1;
    if (wingAngle > -160) wingAngle -= 4;
  }

  //timer to stop the celebration
  const cellyDuration = 180;
  if (frameAfterSave > cellyDuration) {
    frameAfterSave = 0;
    weightShift = 0;
    wingAngle = -25;
  }

  // resets stick target once it reaches the bottom of the save
  if (stickDropping && stickAngle >= 24) {
    targetStickAngle = -10;
  }

  // marks save animation complete only when returning to start
  if (stickDropping && targetStickAngle === -10 && stickAngle <= -9) {
    stickDropping = false;
  }

  //controls stick drop speed
  let stickSpeed = 4;

  //moves stick down
  if (targetStickAngle === 25 && stickAngle < 25) {
    stickAngle += stickSpeed;
  }
  //moves stick back up
  if (targetStickAngle === -10 && stickAngle > -10) {
    stickAngle -= stickSpeed;
  }

  push();
  translate(170, 360);
  rotate(weightShift);
  translate(-170, -360);

  drawJordan();
  drawStick();
  drawWings();

  pop();
  drawPuck();

  //game instructions
  fill("black");
  textSize(14);
  textAlign(CENTER);
  text(
    "1. Press SPACEBAR to launch the puck towards the goalie.",
    width / 2,
    30
  );
  text(
    "2. Press SHIFT to lower the stick and stop the puck from crossing the blue line.",
    width / 2,
    55
  );
}

function keyPressed() {
  if (key === " ") {
    puckX = 50;
    puckY = 490;
    directionX = 1;
    directionY = -1;

    frameAfterSave = 0;
    weightShift = 0;
    wingAngle = -25;
    return false; // Prevents spacebar from scrolling the page
  }

  if ((keyCode === SHIFT || key === "Shift") && !stickDropping) {
    targetStickAngle = 25;
    stickDropping = true;
  }
}

function drawBody() {
  const centerX = 200;
  const centerY = 220;
  const w = 200;
  const h = 304;
  const radiusX = w / 2;
  const radiusY = h / 2;

  const flatStartAngle = 75;
  const flatEndAngle = 105;

  noStroke();
  fill("black");
  beginShape();

  for (let angle = flatEndAngle; angle < 360 + flatStartAngle; angle++) {
    let x = centerX + radiusX * cos(angle);
    let y = centerY + radiusY * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function drawJordan() {
  drawBody();

  fill("white");
  ellipse(165, 155, 63, 95);
  ellipse(235, 155, 63, 95);
  circle(200, 255, 180);
  fill("#FEA82F");
  triangle(190, 170, 210, 170, 200, 190);

  stroke("black");
  strokeWeight(1);
  fill("whiteSmoke");
  ellipse(165, 145, 30, 50);
  fill("black");
  circle(165, 157, 24);
  fill(64, 64, 64);
  circle(159, 152, 6);
  circle(157, 156, 4);
  noFill();
  stroke("whiteSmoke");
  strokeWeight(0.5);
  ellipse(165, 145, 30, 50);

  stroke("black");
  strokeWeight(1);
  fill("whiteSmoke");
  ellipse(235, 145, 30, 50);
  noStroke();
  fill("black");
  circle(235, 157, 24);
  fill(64, 64, 64);
  circle(239, 152, 5);
  circle(242, 156, 3);
  noFill();
  stroke("whiteSmoke");
  strokeWeight(0.5);
  ellipse(235, 145, 30, 50);

  noStroke();
  fill("#FEA82F");
  ellipse(170, 360, 40, 20);
  ellipse(170, 365, 15, 24);
  push();
  translate(155, 364);
  rotate(-60);
  ellipse(0, 0, 20, 15);
  pop();
  push();
  translate(185, 364);
  rotate(60);
  ellipse(0, 0, 20, 15);
  pop();
  ellipse(230, 360, 40, 20);
  push();
  translate(245, 364);
  rotate(60);
  ellipse(0, 0, 20, 15);
  pop();
  ellipse(230, 365, 15, 24);
  push();
  translate(214, 364);
  rotate(-60);
  ellipse(0, 0, 20, 15);
  pop();
}

function drawWings() {
  noStroke();
  fill("black");
  push();
  translate(80, 230);
  rotate(25);
  ellipse(0, 0, 30, 120);
  pop();
  push();
  translate(295, 180);
  rotate(wingAngle);
  ellipse(0, 60, 30, 120);
  pop();
}

function drawStick() {
  push();
  translate(165, 140);
  rotate(stickAngle);

  noStroke();
  fill("#774E24");

  beginShape();
  vertex(115, 225);
  vertex(181, 225);
  vertex(181, 206);
  vertex(115, 206);
  vertex(-120, 26);
  vertex(-130, 36);
  endShape(CLOSE);

  pop();
}

function drawPuck() {
  fill("black");
  ellipse(puckX, puckY, 20, 10);
}