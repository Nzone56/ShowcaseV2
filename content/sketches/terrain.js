const CANVAS_SIZE = 600;
const SCL = 20;
const W = 1200;
const H = 1400;
const COLS = W / SCL;
const ROWS = H / SCL;

// terrain matrix of cols and rows

function setup() {
  // p5 3d canvas
  createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL);
  noStroke();

  terrain = new Array(COLS).fill(0).map(() => new Array(ROWS).fill(0));
  flying = 0;

  // create sliders for

  // speed Slider
  speedSlider = createSlider(0, 0.5, 0.1, 0.01);
  speedSlider.position(20, 35);
  speedSlider.style("width", "80px");
  speedLabel = createP("Speed");
  speedLabel.position(20, 0);
  speedLabel.style("color", "white");

  // peaks Slider
  peaksSlider = createSlider(0, 200, 60);
  peaksSlider.position(110, 35);
  peaksSlider.style("width", "80px");
  peaksLabel = createP("Peaks");
  peaksLabel.position(110, 0);
  peaksLabel.style("color", "white");

  // rotation Slider
  rotationSlider = createSlider(0, 1.5, 1.3, 0.01);
  rotationSlider.position(200, 35);
  rotationSlider.style("width", "80px");
  rotationLabel = createP("Rotation");
  rotationLabel.position(200, 0);
  rotationLabel.style("color", "white");

  // create a toggle checkbox for wireframe
  wireframeCheckbox = createCheckbox("Wireframe", false);
  wireframeCheckbox.position(290, 35);
  wireframeCheckbox.changed(() =>
    wireframeCheckbox.checked() ? stroke(255) : noStroke()
  );
}

function draw() {
  flying -= speedSlider.value();

  let yoff = flying;
  for (let y = 0; y < ROWS; y++) {
    let xoff = 0;
    for (let x = 0; x < COLS; x++) {
      let peak = peaksSlider.value();
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -peak, peak);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);

  rotateX(rotationSlider.value());

  translate(-W / 2, -H / 2 + CANVAS_SIZE / 2);

  for (let y = 0; y < ROWS - 1; y++) {
    // color depends on y the further down the terrain the darker
    fill(map(y, 0, ROWS * 0.58, 255, 0));
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < COLS; x++) {
      vertex(x * SCL, y * SCL, terrain[x][y]);
      vertex(x * SCL, (y + 1) * SCL, terrain[x][y + 1]);
    }
    endShape();
  }
}
