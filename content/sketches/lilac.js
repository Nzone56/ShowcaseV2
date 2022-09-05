const CANVAS_SIZE = 500;
const CIRCLE_COUNT = 12;
const CIRCLE_RADIUS = 50;
const DISTANCE = 200;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  frameRate(10);
  
  colorPicker = createColorPicker('#ee00ee');
  colorPicker.position(0, height + 5);
}

function draw() {
  drawingContext.filter = "blur(20px)";

  background(200);
  noStroke();
  fill(colorPicker.color());

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
