let boxBlur = [
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
];

let edgeKernel = [
  [-1, -1, -1],
  [-1, 8, -1],
  [-1, -1, -1],
];
let sobelKernel = [
  [1, 2, 1],
  [0, 0, 0],
  [-1, -2, -1],
];
let outlineKernel = [
  [-5, 4, 0],
  [0, 2, 0],
  [0, -1, 0],
];
let embossKernel = [
  [-2, -1, 0],
  [-1, 1, 1],
  [0, 1, 2],
];
let botSobelKernel = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1],
];
let topSobelKernel = [
  [1, 2, 1],
  [0, 0, 0],
  [-1, -2, -1],
];

let file;
let img;
let histogram;

function preload() {
  file = loadImage("/showcase/sketches/mandrill.png");
  img = loadImage("/showcase/sketches/mandrill.png");
}

function setup() {
  createCanvas(700, 900);
  background(255);
  pixelDensity(1);
    
}

function draw() {
  img.resize(0, 600);
  file.resize(0, 600);
  image(img, 0, 0, img.width, img.height);
}

function calculateConvolution(x, y, kernel, kernelSize) {
  let r = 0.0;
  let g = 0.0;
  let b = 0.0;

  for (let i = 0; i < kernelSize; i++) {
    for (let j = 0; j < kernelSize; j++) {
      let location = (x + i + img.width * (y + j)) * 4;

      location = constrain(location, 0, img.pixels.length - 1);

      r += img.pixels[location] * kernel[i][j];
      g += img.pixels[location + 1] * kernel[i][j];
      b += img.pixels[location + 2] * kernel[i][j];
    }
  }

  return {
    r: constrain(r, 0, 255),
    g: constrain(g, 0, 255),
    b: constrain(b, 0, 255),
  };
}

function extractColors(image) {
  let red = [];
  let green = [];
  let blue = [];
  let pixelsNumber = image.width * image.height * 4;
  for (let i = 0; i < pixelsNumber; i += 4) {
    red.push(image.pixels[i]);
    green.push(image.pixels[i + 1]);
    if (image.pixels[i + 2] != 0) blue.push(image.pixels[i + 2]);
  }
  return [red, green, blue];
}

function createImageHistogram(red, green, blue) {
  let red_color = {
    x: red,
    name: "red",
    type: "histogram",
    opacity: 0.5,
    marker: {
      color: "red",
    },
  };

  let green_color = {
    x: green,
    name: "green",
    type: "histogram",
    opacity: 0.5,
    marker: {
      color: "green",
    },
  };

  let blue_color = {
    x: blue,
    name: "blue",
    type: "histogram",
    opacity: 0.5,
    marker: {
      color: "blue",
    },
  };

  let data = [red_color, green_color, blue_color];
  let layout = { barmode: "overlay" };
  Plotly.newPlot("histogram", data, layout, { displayModeBar: false });
}

function convolveImage(kernel, kernelSize) {
  img.copy(file, 0, 0, file.width, file.height, 0, 0, file.width, file.height);

  img.loadPixels();

  for (let x = 1; x < img.width - 1; x++) {
    for (let y = 1; y < img.height - 1; y++) {
      let newPixel = calculateConvolution(x, y, kernel, kernelSize);
      let loc = (x + y * img.width) * 4;

      img.pixels[loc] = newPixel.r;
      img.pixels[loc + 1] = newPixel.g;
      img.pixels[loc + 2] = newPixel.b;
      img.pixels[loc + 3] = alpha(color(newPixel.r, newPixel.g, newPixel.b));
    }
  }

  stroke(300, 100, 80);
  img.updatePixels();
  let colors = extractColors(img);
  createImageHistogram(colors[0], colors[1], colors[2]);
}

function changeBrigness(changeFlag) {
  img.loadPixels();

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let loc = (x + y * img.width) * 4;
      if (changeFlag) {
        img.pixels[loc] = constrain(img.pixels[loc] / 1.1, 0, 255);
        img.pixels[loc + 1] = constrain(img.pixels[loc + 1] / 1.1, 0, 255);
        img.pixels[loc + 2] = constrain(img.pixels[loc + 2] / 1.1, 0, 255);
      } else {
        img.pixels[loc] = constrain(img.pixels[loc] * 1.1, 0, 255);
        img.pixels[loc + 1] = constrain(img.pixels[loc + 1] * 1.1, 0, 255);
        img.pixels[loc + 2] = constrain(img.pixels[loc + 2] * 1.1, 0, 255);
      }
    }
  }

  img.updatePixels();
  let colors = extractColors(img);
  createImageHistogram(colors[0], colors[1], colors[2]);
}

function resetImage() {
   img.copy(file, 0, 0, file.width, file.height, 0, 0, file.width, file.height);
   let colors = extractColors(img);
   createImageHistogram(colors[0], colors[1], colors[2]);
}

function keyPressed() {
  switch (key) {
    case "1":
      convolveImage(boxBlur, 3);
      break;
    case "2":
      convolveImage(outlineKernel, 3);
      break;
    case "3":
      convolveImage(edgeKernel, 3);
      break;
    case "4":
      convolveImage(embossKernel, 3);
      break;
    case "5":
      convolveImage(botSobelKernel, 3);
      break;
    case "6":
      convolveImage(topSobelKernel, 3);
      break;
    case "r":
      resetImage();
      break;
    case "-":
      changeBrigness(true);
      break;
    case "+":
      changeBrigness(false);
      break;
  }
}
