# Illusions - Lilac chaser

Conocida también como ilusión de Pacman.

Consiste en 12 circulos lilas borrosos alrededor de un punto central, donde
uno de estos circulos disaparece lentamente luego el siguiente y así sucesivamente
en dirección a las agujas del reloj.

## Explicación

Se pueden observar 3 cosas:

- Un circulo faltante que gira alrededor del centro.
- El circulo faltante se torna de color verde.
- Los demás circulos comienzan a desaparecer.

Esto se debe al fenómeno phi el cual es una ilusión que hace percivir movimiento
continuo en una sucesión de imágenes estáticas.
{{< details title="CODE" open=false >}} 
```js 
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
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/lilac.js" width="530" height="530" >}}
