const CANVAS_SIZE = 500;
const DISTANCE = 200;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  frameRate(10);

  colorPicker = createColorPicker("#ee00ee");
  colorPicker.position(10, height - 25);

  circleCountSlider = createSlider(12, 20, 12);
  circleCountSlider.position(width - 100, height - 20);
  circleCountSlider.style("width", "100px");

  blurToggle = createButton("Blur");
  blurToggle.position(width - 30, 10);
  blurToggle.mousePressed(() => (blur = !blur));
}

function draw() {
  const CIRCLE_COUNT = circleCountSlider.value();
  const CIRCLE_RADIUS = DISTANCE / (CIRCLE_COUNT / 3);

  if (blur) drawingContext.filter = "blur(20px)";

  background(150);
  noStroke();
  fill(colorPicker.color());

  for (let i = 0; i < CIRCLE_COUNT; i++) {
    if (i === frameCount % CIRCLE_COUNT) continue; // skip one circle

    const angle = (i / CIRCLE_COUNT) * TWO_PI;
    const x = CANVAS_SIZE / 2 + DISTANCE * cos(angle);
    const y = CANVAS_SIZE / 2 + DISTANCE * sin(angle);

    circle(x, y, CIRCLE_RADIUS);
  }

  drawingContext.filter = "none";

  // cross cursor in the middle
  stroke(0);
  translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
  line(-10, 0, 10, 0);
  line(0, -10, 0, 10);
}
