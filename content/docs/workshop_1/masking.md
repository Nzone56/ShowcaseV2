# Workshop - Masking

## Kernel
In image processing, a kernel, convolution matrix, or mask is a small matrix used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between the kernel and an image.
## Convolution
Convolution is the process of adding each element of the image to its local neighbors, weighted by the kernel. This is related to a form of mathematical convolution. The matrix operation being performed—convolution—is not traditional matrix multiplication, despite being similarly denoted by *.

For each 3x3 block of pixels in the original image , we multiply each pixel by the corresponding entry of the kernel and then take the sum. That sum becomes a new pixel in the result image.

One subtlety of this process is what to do along the edges of the image. For example, the top left corner of the input image only has three neighbors. One way to fix this is to extend the edge values out by one in the original image while keeping our new image the same size.

## KERNELS

__BOX BLUR:__

 {{< katex >}}
    \frac{1}{9} 
    \begin{bmatrix}
    1 & 1 & 1\\
    1 & 1 & 1\\
    1 & 1 & 1
    \end{bmatrix}
    {{< /katex >}}

__EDGE KERNEL:__

 {{< katex >}} 
    \begin{bmatrix}
    -5 & 4 & 0\\
    0 & 2 & 0\\
    0 & -1 & 0
    \end{bmatrix}
    {{< /katex >}}

__OUTLINE KERNEL:__

 {{< katex >}} 
    \begin{bmatrix}
    -1 & -1 & -1\\
    -1 & 8 & -1\\
    -1 & -1 & -1
    \end{bmatrix}
    {{< /katex >}}

__EMBOSS KERNEL:__

 {{< katex >}} 
    \begin{bmatrix}
    -2 & -1 & 0\\
    -1 & 1 & 1\\
    0 & 1 & 2
    \end{bmatrix}
    {{< /katex >}}

__BOT SOBEL KERNEL:__

 {{< katex >}}
    \begin{bmatrix}
    -1 & -2 & -1\\
    0 & 0 & 0\\
    1 & 2 & 1
    \end{bmatrix}
    {{< /katex >}}

__TOP SOBEL KERNEL:__

 {{< katex >}}
    \begin{bmatrix}
    1 & 2 & 1\\
    0 & 0 & 0\\
    -1 & -2 & -1
    \end{bmatrix}
    {{< /katex >}}

## Results

JS CODE
 {{< details title="IMAGE KERNEL CODE " open=false >}}




```js
A = 0;
B = 0;
C = 0;
D = 0;
E = 1;
F = 0;
G = 0;
H = 0;
I = 0;

kernel = [
  [A, B, C],
  [D, E, -F],
  [G, H, I],
];

function preload() {
  img = loadImage("/showcase/sketches/mandrill.png");
}

function setup() {
  createCanvas(700, 600);
}
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


function draw(kernelType, size) {
  image(img, 0, 0);

  edgeImg = createImage(img.width, img.height);

  edgeImg.loadPixels();

  for (let x = 1; x < img.width - 1; x++) {
    for (let y = 1; y < img.height - 1; y++) {
      let sum = 0;

      for (kx = -1; kx <= 1; kx++) {
        for (ky = -1; ky <= 1; ky++) {
          let xpos = x + kx;
          let ypos = y + ky;
          let pos = (y + ky) * img.width + (x + kx);
          let val = red(img.get(xpos, ypos));
          sum += kernel[ky + 1][kx + 1] * val;
        }
      }
      edgeImg.set(x, y, color(sum, sum, sum));
    }
  }

  edgeImg.updatePixels();
  image(edgeImg, 0, 0);

  let colors = extractColors(edgeImg);
  createImageHistogram(colors[0], colors[1], colors[2]);
}

function extractColors(image) {
    let red   = [];
    let green = [];
    let blue  = [];
    let pixelsNumber = image.width * image.height * 4;
    for(let i = 0; i < pixelsNumber; i += 4) {
      red.push(image.pixels[i]);
      green.push(image.pixels[i + 1]);
      if (image.pixels[i + 2] != 0)
        blue.push(image.pixels[i + 2]);
    }
    return [red, green, blue];
  }


function createImageHistogram(red, green, blue) {

  let red_color = {
    x: red,
    name: 'red',
    type: "histogram",
    opacity: 0.5,
    marker: {
      color: "red"
    },
  };

  let green_color = {
    x: green,
    name: 'green',
    type: "histogram",
    opacity: 0.5,
    marker: {
      color: "green"
    },
  };

  let blue_color = {
    x: blue,
    name: 'blue',
    type: "histogram",
    opacity: 0.5,
    marker: {
      color: "blue"
    },
  };

  let data = [red_color, green_color, blue_color];
  let layout = {barmode: "overlay", };
  Plotly.newPlot('histogram', data, layout, {displayModeBar: false});
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
      draw(boxBlur, 3);
      break;
    case "2":
      draw(edgeKernel, 3);
      break;
    case "3":
      draw(outlineKernel, 3);
      break;
    case "4":
      draw(embossKernel, 3);
      break;
    case "5":
      draw(botSobelKernel, 3);
      break;
    case "6":
      draw(topSobelKernel, 3);
      break;
    case "r":
      resetImage();
      break;
    case "+":
      changeBrigness(true);
      break;
    case "-":
      changeBrigness(false);
      break;
  }
}
```
{{< /details >}}
{{< details title="GENERATE HISTOGRAM IMAGE KERNEL CODE " open=false >}}
```js
function extractColors(image) {
    let red   = [];
    let green = [];
    let blue  = [];
    let pixelsNumber = image.width * image.height * 4;
    for(let i = 0; i < pixelsNumber; i += 4) {
      red.push(image.pixels[i]);
      green.push(image.pixels[i + 1]);
      if (image.pixels[i + 2] != 0)
        blue.push(image.pixels[i + 2]);
    }
    return [red, green, blue];
  }


function createImageHistogram(red, green, blue) {

  let red_color = {
    x: red,
    name: 'red',
    type: "histogram",
    opacity: 0.5,
    marker: {
      color: "red"
    },
  };

  let green_color = {
    x: green,
    name: 'green',
    type: "histogram",
    opacity: 0.5,
    marker: {
      color: "green"
    },
  };

  let blue_color = {
    x: blue,
    name: 'blue',
    type: "histogram",
    opacity: 0.5,
    marker: {
      color: "blue"
    },
  };

  let data = [red_color, green_color, blue_color];
  let layout = {barmode: "overlay", };
  Plotly.newPlot('histogram', data, layout, {displayModeBar: false});
}
```
{{< /details >}}
{{< details title="CHANGE BRIGHTNESS IMAGE KERNEL CODE " open=false >}}
```js
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
```
{{< /details >}}

APLLY KERNEL IMAGES 


{{< details "Shortcuts" >}}
| Shortcut | Description |
| -------- | ----------- |
| 1 | Blox Bur|
| 2 | Edge Kernel |
| 3 | Outline Kernel |
| 4 | Emboss Kernel |
| 5 | Bot Sobel Kernel |
| 6 | Top Sobel Kernel |
| R | Reset Image |
| + | + Brightness |
| - | - Brightness |
{{< /details >}}



{{< p5-iframe sketch="/showcase/sketches/imageKernelWK.js" lib1="https://cdn.plot.ly/plotly-2.14.0.min.js" width="735" height="1400"  >}}
