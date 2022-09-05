let xspeed = 2.3;
let yspeed = 2.8;

let xdirection = 1;
let ydirection = 1;

function setup() {
  createCanvas(700, 700);
  x1 = width/2;
  y1 = height/2;
  n = width/10;
  d = 50;
  
  x2 = width/2;
  y2 = height/2;
}

function moire(x,y,d,n){
  for( i = 0;i<n;i++){
    circle(x, y, d*i);
    strokeWeight(10);
    noFill();
  }
}

function txt(){
  textFont('Georgia');
  textSize(150);
  var w = textWidth("MOIRÉ");
  fill(0);
  fill(255);
  text("MOIRÉ", width/7.5, height/1.75);
}

function draw() {
  background(color("rgb(235,0,0)"));
  x2 = x2 + xspeed * xdirection;
  y2 = y2 + yspeed * ydirection;
  txt()
  if (x2 > width || x2 < 0) {
    xdirection *= -1;
  }
  if (y2 > height || y2 < 0) {
    ydirection *= -1;
  }
  
  m1 = moire(x1,y1,d,n);
  m2 = moire(x2,y2,d,n);
}