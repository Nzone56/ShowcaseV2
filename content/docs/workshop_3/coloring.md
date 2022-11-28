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
    
  
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/colorModel.js" width="640" height="340" >}}
