# Ascii art

{{<details title="CODE" open=false >}}

```js
const WIDTH = 630,
  HEIGHT = 630;

const density = "Ñ@#W$9876543210?!abc;:+=,._ ";

let media;
let photo;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(WIDTH, HEIGHT);
  scaleSlider = createSlider(0.1, 0.2, 0.1, 0.02);
  scaleSlider.position(width - 110, height - 30);
  scaleSlider.style("width", "100px");
  scaleSliderLabel = createDiv("Scale");
  scaleSliderLabel.position(width - 110, height - 50);
  scaleSliderLabel.style("color", "#fff");

  modeSelector = createSelect();
  modeSelector.position(10, height - 40);
  modeSelector.option("original");
  modeSelector.option("pixelated");
  modeSelector.option("colored ascii");
  modeSelector.option("ascii");
  modeSelector.option("BW");
  modeSelector.selected("ascii");

  modeSelector.changed(() => {
    if (modeSelector.value() === "original") {
      scaleSlider.elt.min = 0.1;
      scaleSlider.elt.max = 1;
      scaleSlider.elt.step = 0.1;
      scaleSlider.value(1);
    } else {
      scaleSlider.elt.min = 0.1;
      scaleSlider.elt.max = 0.2;
      scaleSlider.elt.step = 0.02;
      scaleSlider.value(0.1);
    }
  });

  // create dropdown for brightness detection mode
  brightnessMode = createSelect();
  brightnessMode.position(10, height - 80);
  brightnessMode.option("Component average");
  brightnessMode.option("HSV value (V)");
  brightnessMode.option("HSL lightness (L)");
  brightnessMode.option("CIELAB lightness (L*)");
  brightnessMode.option("Rec 601 Luma Y'");
  brightnessMode.selected("average");

  // create dropdown to select image or video
  mediaType = createSelect();
  mediaType.position(10, height - 120);
  mediaType.option("image");
  mediaType.option("video");
  mediaType.selected("video");

  video = createCapture(VIDEO);
  photo = loadImage("/showcase/sketches/mandrill.png");
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  scale = scaleSlider.value();

  if (mediaType.value() === "video") {
    media = video;
    media.size(WIDTH * scale, HEIGHT * scale);
  } else {
    media = photo.get();
    media.resize(WIDTH * scale, HEIGHT * scale);
  }

  let w = WIDTH / media.width;
  let h = HEIGHT / media.height;
  media.loadPixels();

  mode = modeSelector.value();

  if (mode === "original") {
    image(media, 0, 0, WIDTH, HEIGHT);
    return;
  }

  for (let y = 0; y < media.height; y++) {
    for (let x = 0; x < media.width; x++) {
      let index = (x + y * media.width) * 4;
      let r = media.pixels[index];
      let g = media.pixels[index + 1];
      let b = media.pixels[index + 2];

      if (brightnessMode.value() === "Component average") {
        bright = (r + g + b) / 3;
      } else if (brightnessMode.value() === "HSV value (V)") {
        bright = RGBtoHSV(r, g, b)[2];
      } else if (brightnessMode.value() === "HSL lightness (L)") {
        bright = RGBtoHSL(r, g, b)[2];
      } else if (brightnessMode.value() === "CIELAB lightness (L*)") {
        bright = CIELAB(r, g, b)[0];
      } else if (brightnessMode.value() === "Rec 601 Luma Y'") {
        bright = 0.299 * r + 0.587 * g + 0.114 * b;
      }

      let charIndex = Math.floor(map(bright, 0, 255, density.length, 0));
      let char = density.charAt(charIndex);
      noStroke();
      if (mode === "ascii") {
        fill(255);
        textSize(w);
        textAlign(CENTER, CENTER);
        text(char, x * w + w * 0.5, y * h + h * 0.5);
      } else if (mode === "pixelated") {
        fill(r, g, b);
        rect(x * w, y * h, w, h);
      } else if (mode === "colored ascii") {
        fill(r, g, b);
        textSize(w);
        textAlign(CENTER, CENTER);
        text(char, x * w + w * 0.5, y * h + h * 0.5);
      } else if (mode === "BW") {
        fill(bright);
        rect(x * w, y * h, w, h);
      }
    }
  }
}
```

{{</details>}}
{{<p5-iframe sketch="/showcase/sketches/ascii_art.js" width="630" height="630">}}

## GUI

The GUI has 3 dropdowns and a slider.

- The first dropdown is for media type, it can be a video or an image.
- The second dropdown is for the brightness method.
- The render mode, it may be the original or the ascii version.

The slider is for the scaling of the image.

## Characters

```
'Ñ@#W$9876543210?!abc;:+=,._ '
```

This is the order of characters used for the brightness of each pixel.

> It may be interpreted as brightest to darkest, or darkest to brightest, depending on the background vs foreground colors.

> The last character is a space representing an empty pixel in the ascii art.

## Pixelation

The pixelation mode is the simplest one, it just maps the pixels of the image to the pixels of the canvas.
It doesn't have spatial coherence so there is some loss in the contour of the image.

## Brightness

The brightness of each pixel is calculated using the selected method.

The brightness is then mapped to the characters, from the darkest to the brightest.

- Component average

  The brightness is calculated using the average of the RGB components.

  ```js
  bright = (r + g + b) / 3;
  ```

- HSV value (V)

  ```js
  bright = RGBtoHSV(r, g, b)[2];
  ```

  {{<details title="RGBtoHSV" open=false >}}

  ```js
  function RGBtoHSV(r, g, b) {
    let h, s, v;
    let min, max, delta;

    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    v = max;
    delta = max - min;
    if (max != 0) s = delta / max;
    else {
      s = 0;
      h = -1;
      return [h, s, v];
    }
    if (r == max) h = (g - b) / delta;
    else if (g == max) h = 2 + (b - r) / delta;
    else h = 4 + (r - g) / delta;
    h *= 60;
    if (h < 0) h += 360;
    return [h, s, v];
  }
  ```

  {{</details>}}

- HSL lightness (L)

  ```js
  bright = RGBtoHSL(r, g, b)[2];
  ```

  {{<details title="RGBtoHSL" open=false >}}

  ```js
  function RGBtoHSL(r, g, b) {
    let h, s, l;
    let min, max, delta;

    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    l = (min + max) / 2;
    delta = max - min;
    if (max == min) {
      s = 0;
      h = 0;
    } else {
      if (l < 0.5) s = delta / (max + min);
      else s = delta / (2 - max - min);
      if (r == max) h = (g - b) / delta;
      else if (g == max) h = 2 + (b - r) / delta;
      else h = 4 + (r - g) / delta;
      h *= 60;
      if (h < 0) h += 360;
    }
    return [h, s, l];
  }
  ```

  {{</details>}}

- CIELAB lightness (L\*)

  ```js
  bright = CIELAB(r, g, b)[0];
  ```

  {{<details title="CIELAB" open=false >}}

  ```js
  // CIELAB lightness (L*) calculation using RGB values
  function CIELAB(r, g, b) {
    let R = r / 255;
    let G = g / 255;
    let B = b / 255;

    if (R > 0.04045) R = Math.pow((R + 0.055) / 1.055, 2.4);
    else R = R / 12.92;
    if (G > 0.04045) G = Math.pow((G + 0.055) / 1.055, 2.4);
    else G = G / 12.92;
    if (B > 0.04045) B = Math.pow((B + 0.055) / 1.055, 2.4);
    else B = B / 12.92;

    R = R * 100;
    G = G * 100;
    B = B * 100;

    let X = R * 0.4124 + G * 0.3576 + B * 0.1805;
    let Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
    let Z = R * 0.0193 + G * 0.1192 + B * 0.9505;

    X = X / 95.047;
    Y = Y / 100.0;
    Z = Z / 108.883;

    if (X > 0.008856) X = Math.pow(X, 1 / 3);
    else X = 7.787 * X + 16 / 116;
    if (Y > 0.008856) Y = Math.pow(Y, 1 / 3);
    else Y = 7.787 * Y + 16 / 116;
    if (Z > 0.008856) Z = Math.pow(Z, 1 / 3);
    else Z = 7.787 * Z + 16 / 116;

    let L = 116 * Y - 16;
    let A = 500 * (X - Y);
    let B_ = 200 * (Y - Z);

    return [L, A, B_];
  }
  ```

  {{</details>}}
