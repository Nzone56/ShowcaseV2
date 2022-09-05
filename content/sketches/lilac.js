const CANVAS_SIZE = 500;
const CIRCLE_COUNT = 12;
const CIRCLE_RADIUS = 50;
const DISTANCE = 200;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  frameRate(8);
}

function draw() {
  drawingContext.filter = "blur(15px)";

  background(210);
  noStroke();
  fill(255, 0, 255);

  for (let i = 0; i < CIRCLE_COUNT; i++) {
    const angle = (i / CIRCLE_COUNT) * TWO_PI;
    let x = CANVAS_SIZE / 2 + DISTANCE * cos(angle);
    let y = CANVAS_SIZE / 2 + DISTANCE * sin(angle);

    if (i === frameCount % CIRCLE_COUNT) continue;
    circle(x, y, CIRCLE_RADIUS);
  }

  drawingContext.filter = "none";

  stroke(0);
  line(
    CANVAS_SIZE / 2 - 10,
    CANVAS_SIZE / 2,
    CANVAS_SIZE / 2 + 10,
    CANVAS_SIZE / 2
  );
  line(
    CANVAS_SIZE / 2,
    CANVAS_SIZE / 2 - 10,
    CANVAS_SIZE / 2,
    CANVAS_SIZE / 2 + 10
  );
}
