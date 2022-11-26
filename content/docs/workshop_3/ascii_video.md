# Ascii Video

This exercise is about the recreation of video using ascii art.

It uses the brightness of each pixel to determine the character to use.

## Brightness

For the brightness of a pixel we use different methods using the RGB values.

Average brightness:

```js
const brigthness = (r + g + b) / 3;
```

Photometric/digital ITU-R BT.709:

```js
const brigthness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
```

Digital ITU-R BT.601:

```js
const brigthness = 0.299 * r + 0.587 * g + 0.114 * b;
```

Perceived brightness

```js
const brigthness = sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
```

## Characters

Ñ@#W$9876543210?!abc;:+=,.\_

This is the order of characters used for the brightness of each pixel.

> It may be interpreted as brightest to darkest, or darkest to brightest, depending on the background vs foreground colors.

> The last character is a space

## GUI

The GUI has 3 dropdowns and a slider.

- The first dropdown is for media type, it can be a video or an image.
- The second dropdown is for the brightness method.
- The render mode, it may be the original or the ascii version.

The slider is for the scaling of the image.

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
  brightnessMode.option("average");
  brightnessMode.option("luminance standard");
  brightnessMode.option("luminance percieved 1");
  brightnessMode.option("luminance percieved 2");
  brightnessMode.option("p5 native");
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

      if (brightnessMode.value() === "average") {
        bright = (r + g + b) / 3;
      } else if (brightnessMode.value() === "luminance standard") {
        bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      } else if (brightnessMode.value() === "luminance percieved 1") {
        bright = 0.299 * r + 0.587 * g + 0.114 * b;
      } else if (brightnessMode.value() === "luminance percieved 2") {
        bright = sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
      } else if (brightnessMode.value() === "p5 native") {
        c = color(r, g, b);
        bright = brightness(c);
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
      }
    }
  }
}
```

{{</details>}}
{{<p5-iframe sketch="/showcase/sketches/ascii_video.js" width="630" height="630">}}
