let myShader;
let brightnessRadio;
let kernelRadio;
let areaRadio;
let magnifierSlider;
let areaSlider;
let sourceRadio;

let img;
let video;

let kernels = {
  none: [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],

  sharpen: [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ],

  emboss: [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2],
  ],

  outlineKernel : [
  [-5, 4, 0],
  [0, 2, 0],
  [0, -1, 0],
  ],

  blur: [
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
  ],

  edge: [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ],
};

function preload() {
  video = createVideo(["/showcase/sketches/dog.mp4"]);
  video.hide();

  myShader = readShader("/showcase/sketches/color.frag", {
    varyings: Tree.texcoords2,
  });

  img = loadImage("/showcase/sketches/cat.jpg");
}

function setup() {
  createCanvas(700, 700, WEBGL);
  noStroke();

  textureMode(NORMAL);
  shader(myShader);

  setupUI();

  myShader.setUniform("texture", img);
  myShader.setUniform("brightnessTool", 0);
  myShader.setUniform("kernel", kernels["none"].flat());
  myShader.setUniform("scale", 0.5);
  myShader.setUniform("radius", 100.0);
  myShader.setUniform("region", false);
  myShader.setUniform("magnifier", false);
  emitTexOffset(myShader, img, "texOffset");
  emitResolution(myShader, "resolution");
}

function draw() {
  background(0);

  quad(
    -width / 2,
    -height / 2,
    width / 2,
    -height / 2,
    width / 2,
    height / 2,
    -width / 2,
    height / 2
  );

  emitMousePosition(myShader, "mouse");
}

function setupUI() {
  let sourceTitle = createP("TYPE:");
  sourceTitle.style("font-weight", "bold");
  sourceRadio = createSelect();
  sourceRadio.position(15,15); 
  sourceRadio.option("Image", "img");
  sourceRadio.option("Video", "video");
  sourceRadio.changed(() => {
    let val = sourceRadio.value();
    if (val === "img") {
      myShader.setUniform("texture", img);
      emitTexOffset(myShader, img, "texOffset");
      video.pause();
    } else if (val === "video") {
      myShader.setUniform("texture", video);
      emitTexOffset(myShader, video, "texOffset");
      video.loop();
    }
  });

  let brightnessTitle = createP("🌞");
  brightnessTitle.position(10, 627)
  brightnessTitle.style("font-weight", "bolder");
  brightnessTitle.style("font-color", "white"); 
  brightnessRadio = createSelect();
  brightnessRadio.position(35, 645); 
  brightnessRadio.option("Original", 0);
  brightnessRadio.option("Luma", 1);
  brightnessRadio.option("HSV", 3);
  brightnessRadio.option("HSL", 4);
  brightnessRadio.selected(0);

  brightnessRadio.changed(() => {
    let mode = brightnessRadio.value();
    myShader.setUniform("brightnessTool", mode);
  });

  let kernelTitle = createP("🎨");
  kernelTitle.style("font-weight", "bold");
  kernelTitle.position(10,650)
  kernelRadio = createSelect();
  kernelRadio.position(35,670);
  kernelRadio.option("Original", "none");
  kernelRadio.option("Sharpen", "sharpen");
  kernelRadio.option("Outline", "outlineKernel");
  kernelRadio.option("Emboss","emboss" );
  kernelRadio.option("Blur", "blur");
  kernelRadio.option("Edge detection", "edge");
  kernelRadio.selected("none");

  kernelRadio.changed(() => {
    let selection = kernelRadio.value();
    myShader.setUniform("kernel", kernels[selection].flat());
  });

  let areaTitle = createP("🔘");
  areaTitle.style("font-weight", "bold");
  areaTitle.position(530,607)
  areaRadio = createSelect();
  areaRadio.position(560, 625)
  areaRadio.option("None", "none");
  areaRadio.option("Magnifier", "magnifier");
  areaRadio.option("Region", "region");
  areaRadio.selected("none");

  areaRadio.changed(() => {
    let selection = areaRadio.value();
    if (selection === "none") {
      myShader.setUniform("region", false);
      myShader.setUniform("magnifier", false);
    } else if (selection === "magnifier") {
      myShader.setUniform("region", false);
      myShader.setUniform("magnifier", true);
    } else if (selection === "region") {
      myShader.setUniform("region", true);
      myShader.setUniform("magnifier", false);
    }
    myShader.setUniform("brightnessTool", 0);
    myShader.setUniform("kernel", kernels["none"].flat());
  });

  let areaSliderTitle = createP("📏");
  areaSliderTitle.position(530,627); 
  areaSlider = createSlider(25.0, 250.0, 100.0, 50.0);
  areaSlider.position(560, 650);
  areaSlider.changed(() => {
    myShader.setUniform("radius", areaSlider.value());
  });

  let zoomSliderTitle = createP("🔍");
  zoomSliderTitle.position(530, 650); 
  magnifierSlider = createSlider(0.0, 1.0, 0.5, 0.1);
  magnifierSlider.position(560, 670);
  magnifierSlider.changed(() => {
    myShader.setUniform("scale", magnifierSlider.value());
  });
}

