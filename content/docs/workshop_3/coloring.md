# Shaders - Coloring
# CMY and RGB  Color Models

## Explicación



{{< details title="CODE" open=false >}}
```js

  cmy = false
function setup() {
 // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL);
  setColor();
  randomizeTriangle();
}

function draw() {
  background(0);
  beginShape(TRIANGLES);
  fill(r);
  vertex(v1.x*200, v1.y*200);
  fill(g);
  vertex(v2.x*200, v2.y*200);
  fill(b);
  vertex(v3.x*200, v3.y*200);
  endShape();
}


function keyPressed() {
  if (key == 'c') {
    cmy = !cmy;
    setColor();
  console.log(cmy)
  }
  if (key == 'r') {
    randomizeTriangle();
  }
}
function randomizeTriangle(){
  v1 = p5.Vector.random2D();
  v2 = p5.Vector.random2D();
  v3 = p5.Vector.random2D();
}

function setColor(){
    if(cmy){
    r = color(0,255,255);
    g = color(255,0,255);
    b = color(255,255,0);
  }
  else{    
    r = color(255,0,0);
    g = color(0,255,0);
    b = color(0,0,255);
  }
}
```
  
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/colorModel.js" width="400" height="400" >}}


# Color Blending

## Explicación



{{< details title="CODE" open=false >}}
```js

 let colorPicker1;
let colorPicker2;

function setup() {
   // shaders require WEBGL mode to work
    createCanvas(400, 400, WEBGL);
    color1 = color(55,58,164);
    color2 = color(200,0,255);
    colorPicker1 = createColorPicker(color1);
    colorPicker1.position(10, 10);  
    colorPicker2 = createColorPicker(color2);
    colorPicker2.position(200, 10);
  
}

function draw() {
  
  background(0);
  color1 = colorPicker1.color();
  beginShape(QUADS);
  noStroke();
  fill(color1)
  vertex(-170, -180);
  vertex(-170, -40);
  vertex(-30, -40);
  vertex(-30, -180);
  endShape();
  
  
  color2 = colorPicker2.color();
  beginShape(QUADS);
  noStroke();
  fill(color2)
  vertex(20, -180);
  vertex(20, -40);
  vertex(160, -40);
  vertex(160, -180);
  endShape();
  print(color1)
  v1 = createVector(red(color1), green(color1), blue(color1))
  v2 = createVector(red(color2), green(color2), blue(color2))
  v3 = p5.Vector.mult(v1,v2)
  
  
  fill(v3.x/255,v3.y/255,v3.z/255)
  beginShape(QUADS);
  vertex(-75, 20);
  vertex(-75, 160);
  vertex(65, 160);
  vertex(65, 20);
  endShape();
  
}
   ``` 
  
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/colorBlending.js" width="400" height="400" >}}


# Color Blending With brightness

## Explicación



{{< details title="CODE" open=false >}}
```js

 let colorPicker1;
let colorPicker2;

function setup() {
   // shaders require WEBGL mode to work
    createCanvas(400, 400, WEBGL);
    color1 = color(55,58,164);
    color2 = color(200,0,255);
    colorPicker1 = createColorPicker(color1);
    colorPicker1.position(10, 10);  
    colorPicker2 = createColorPicker(color2);
    colorPicker2.position(200, 10);
  
}

function draw() {
  
  background(0);
  color1 = colorPicker1.color();
  beginShape(QUADS);
  noStroke();
  fill(color1)
  vertex(-170, -180);
  vertex(-170, -40);
  vertex(-30, -40);
  vertex(-30, -180);
  endShape();
  
  
  color2 = colorPicker2.color();
  beginShape(QUADS);
  noStroke();
  fill(color2)
  vertex(20, -180);
  vertex(20, -40);
  vertex(160, -40);
  vertex(160, -180);
  endShape();
  print(color1)
  v1 = createVector(red(color1), green(color1), blue(color1))
  v2 = createVector(red(color2), green(color2), blue(color2))
  v3 = p5.Vector.mult(v1,v2)
  
  
  fill(v3.x/255,v3.y/255,v3.z/255)
  beginShape(QUADS);
  vertex(-75, 20);
  vertex(-75, 160);
  vertex(65, 160);
  vertex(65, 20);
  endShape();
  
}
  ```  
  
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/colorBlendinglight.js" width="400" height="400" >}} 