let colorPicker1;
let colorPicker2;

function setup() {
    createCanvas(400, 400);
    color1 = color(55,58,164);
    color2 = color(200,0,255);
    colorPicker1 = createColorPicker(color1);
    colorPicker1.position(10, 10);  
    colorPicker2 = createColorPicker(color2);
    colorPicker2.position(200, 10);
  
    lightSlider = createSlider(0, 255, 255, 1);
    lightSlider.position(130, 180);
}

function draw() {
  
  background(0);
  color1 = colorPicker1.color();
  beginShape();
  fill(color1)
  vertex(30, 20);
  vertex(30, 160);
  vertex(170, 160);
  vertex(170, 20);
  endShape();
  
  
  color2 = colorPicker2.color();
  beginShape();
  fill(color2)
  vertex(220, 20);
  vertex(220, 160);
  vertex(360, 160);
  vertex(360, 20);
  endShape();
  print(color1)
  v1 = createVector(red(color1), green(color1), blue(color1))
  v2 = createVector(red(color2), green(color2), blue(color2))
  v3 = p5.Vector.mult(v1,v2)
  
  
  fill(v3.x/255,v3.y/255,v3.z/255, lightSlider.value())
  beginShape();
  vertex(125, 220);
  vertex(125, 360);
  vertex(265, 360);
  vertex(265, 220);
  endShape();
  
}