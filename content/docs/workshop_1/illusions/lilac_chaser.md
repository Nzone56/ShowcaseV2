# Illusions - Lilac chaser

Consiste en unos discos de color borrosos alrededor de un punto central, donde
en cada frame uno de estos discos desaparece y aparece luego el siguiente hace
lo mismo en sentido de las agujas del reloj.

{{<details title="CODE" open=false >}}

```js
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
```

{{</details>}}

{{<p5-iframe sketch="/showcase/sketches/lilac.js" width="530" height="530">}}

# Explicación

En esta ilusión se pueden observar 3 cosas:

- La sucesión de la desaparición de los discos aparenta crear un movimiento.
  > Esto es debido a que el ojo humano es capaz de interpretar una sucesión de
  > imágenes y reconocerlas como un movimiento fluido llenando los huecos entre
  > estas.
- El disco que desaparece toma un color.
  > Esto se debe al efecto de la persistencia de la visión, que es la capacidad
  > del ojo humano de mantener una imagen en la retina durante un tiempo, en este
  > caso la imagen esta en alto contraste con el fondo, por lo que el ojo genera
  > una imagen remanente negativa con el color complementario a los discos.
- Los demás discos comienzan a desaparecer.
  > El desvanecimiento de los discos se debe a que al estar enfocados en un punto
  > por mucho tiempo el cerebro comienza a ignorar aquella información que no
  > sea necesaria, en este caso los discos están borrosos y fuera del punto de
  > enfoque, por lo que el cerebro los ignora.

{{<hint info>}}

Al usar el metodo `filter()` de p5 para aplicar el efecto de desenfoque en cada
uno de los frames, se puede notar que el `frameRate` baja considerablemente,
por este motivo se optó por usar el `drawingContext` para aplicar el filtro,
este provee un filtro que usa directamente el canvas de html5 y por ende no
afecta el `frameRate` tanto.

{{</hint>}}
