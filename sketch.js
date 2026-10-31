let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';

let ghostSpeed = 3;
let ghostSize = 60;

function setup() {
  createCanvas(480, 360);
  spawnGhost();
}

function draw() {
  background("#1d1c22");

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Click to start', width / 2, height / 2);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill("#a71111");
    textSize(22);
    text('Game over\nScore: ' + score + '\nClick to retry',
         width / 2, height / 2);
    return;
  }

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);

  if (timeLeft <= 0) {
    state = 'over';
    return;
  }

  
  ghost.y += ghostSpeed;

  
  if (ghost.y > height + ghostSize / 2) {
    spawnGhost();
  }

  
  drawGhost(ghost.x, ghost.y);

 
  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);


  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }

  
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < ghostSize / 2) {
    score++;
    spawnGhost();
  }
}

function spawnGhost() {
  ghost = {
    x: random(ghostSize / 2, width - ghostSize / 2),
    y: -ghostSize / 2
  };
}

function drawGhost(x, y) {
  noStroke();

  fill("#ff0019");
  ellipse(x, y, ghostSize, ghostSize);

  fill("#f1e909");
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
}
