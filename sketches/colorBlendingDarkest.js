let colorPicker1;
let colorPicker2;

function setup() {
    createCanvas(400, 400);
    color1 = color(80,150,255);
    color2 = color(255,50,50);
    colorPicker1 = createColorPicker(color1);
    colorPicker1.position(10, 10);  
    colorPicker2 = createColorPicker(color2);
    colorPicker2.position(200, 10);
  
}

function draw() {
  
  background(255);
  noStroke();
  
  blendMode(DARKEST)
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
  
  
  fill(color1)
  beginShape();
  vertex(125, 220);
  vertex(125, 360);
  vertex(265, 360);
  vertex(265, 220);
  endShape();
  
   fill(color2)
  beginShape();
  vertex(125, 220);
  vertex(125, 360);
  vertex(265, 360);
  vertex(265, 220);
  endShape(); 
  
}