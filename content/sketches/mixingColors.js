function setup() {
  createCanvas(640, 340);
  redUp = true;
  blueVal = 0;
  blueUp = true;
  greenVal = 0;
  greenUp = true;
  cyanVal = 0;
  cyanUp = true;
  magentaVal = 0;
  magentaUp = true
  yellowVal = 0;
  yellowUp = true;

  redSlider = createSlider(0, 255, 60, 0);
  redSlider.position(10, 10);
  redSlider.style('width', '80px');
  redSlider.style('color', 'red');
  redSlider.changed(() => {autoRun =false});


  blueSlider = createSlider(0, 255, 60, 0);
  blueSlider.position(50, 270);
  blueSlider.style('width', '80px');
  blueSlider.changed(() => {autoRun =false});

  greenSlider = createSlider(0, 255, 60, 0);
  greenSlider.position(180, 270);
  greenSlider.style('width', '80px');  
  greenSlider.changed(() => {autoRun =false});

  cyanSlider = createSlider(0, 255, 60, 0);
  cyanSlider.position(300, 270);
  cyanSlider.style('width', '80px');  
  cyanSlider.style('transform', 'rotate(270deg)');
  cyanSlider.style('-moz-transform', 'rotate(270deg)');
  cyanSlider.changed(() => {autoRun =false});

  magentaSlider = createSlider(0, 255, 60, 0);
  magentaSlider.position(340, 270);
  magentaSlider.style('width', '80px');  
  magentaSlider.style('transform', 'rotate(270deg)');
  magentaSlider.style('-moz-transform', 'rotate(270deg)');
magentaSlider.changed(() => {autoRun =false});

  yellowSlider = createSlider(0, 255, 60, 0);
  yellowSlider.position(380, 270);
  yellowSlider.style('width', '80px');  
  yellowSlider.style('transform', 'rotate(270deg)');
  yellowSlider.style('-moz-transform', 'rotate(270deg)');
  yellowSlider.changed(() => {autoRun =false});

  autoRun = true;


button = createButton('Auto run');
button.position(500, 300);
button.mousePressed(AutoRun);

}

function draw() {
  background(220);
  stroke(1);
 
  fill(255, 0, 0);
  textSize(25);
  text('Red', 20, 60);
  if(autoRun){      
   if(redUp){
     redSlider.value(redSlider.value() + 1) ;
     redUp = redSlider.value() >= 255 ? false : true;
   }else{   
     redSlider.value(redSlider.value()-1);
     redUp = redSlider.value() <= 0 ? true : false;
   }
  }
  fill(redSlider.value(), 0,0)
  circle(140,100,160)
  fill(0, 255, 0);
 textSize(25);
 text('Green', 160, 270);
  
 if(autoRun){      
   if(greenUp){ 
     greenSlider.value(greenSlider.value()+1);
     greenUp = greenSlider.value() >= 255 ? false : true;
     }else{
     greenSlider.value(greenSlider.value()-1.5);
     greenUp = greenSlider.value() <= 0 ? true : false;
   }
  }   
  fill(0, greenSlider.value(),0)
  circle(170,160,160)
  
  fill(0, 0, 255);
  textSize(25);
  text('Blue', 70, 270);
  if(autoRun){      
    if(blueUp){ 
     blueSlider.value(blueSlider.value()+2);
     blueUp = blueSlider.value() >= 255 ? false : true;
     }else{
     blueSlider.value(blueSlider.value()-2);
     blueUp = blueSlider.value() <= 0 ? true : false;
    }
  } 
  
  fill(0,0, blueSlider.value())
  circle(100,160, 160);
  
  fill(redSlider.value(), 0,blueSlider.value());
  arc(140,100, 160, 160, 2.07,3.28);  
  arc(100,160, 160, 160, 4.2, 5.39);
  
 fill(redSlider.value(), greenSlider.value(),0);
  arc(140,100, 160, 160, 6.25, 1.07);
  arc(170,160, 160, 160, 4.2, 5.39);  
  
  fill( 0, greenSlider.value(), blueSlider.value());  
  arc(170,160, 160, 160, 2.02, PI);  
  arc(100,160, 160, 160, 0, 1.12);

  fill( redSlider.value(), greenSlider.value(), blueSlider.value());  
  arc(170,160, 160, 160, 3.11, 4.25); 
  arc(140,100, 160, 160, 1.07, 2.24);
  arc(100,160, 160, 160, 5.16, 0.125);
  
  beginShape();
  vertex(260, 115);
  vertex(290, 115);
  vertex(290, 100);
  vertex(320, 135);
  vertex(290, 170);
  vertex(290, 155);
  vertex(260, 155);   
  endShape(CLOSE);  
  
  
  fill(0, 255, 255);
  textSize(15);
  text('Cyan', 320, 70);
  
  fill(255, 0, 255);
  textSize(15);
  text('Magenta', 360, 210);
  
  fill(255, 255, 0);
  textSize(15);
  text('Yellow', 410, 70);
 
  
  if(cyanUp){
   cyanVal = cyanVal+0.5;
   cyanUp = cyanVal > 255 ? false : true;
 }else{
   cyanVal = cyanVal-0.5;
   cyanUp = cyanVal < 0 ? true : false;
 }    
  stroke(0,0,0)
  fill(0,255,255, cyanVal);
  beginShape();
  vertex(340, 100);
  vertex(350, 100);
  vertex(350, 180);
  vertex(340, 180);
  endShape(CLOSE); 
  
   if(magentaUp){
   magentaVal = magentaVal+2;
   magentaUp = magentaVal > 255 ? false : true;
 }else{
   magentaVal = magentaVal-2;
   magentaUp = magentaVal < 0 ? true : false;
 }   
  fill(255,0,255, magentaVal);
  beginShape();
  vertex(380, 100);
  vertex(390, 100);
  vertex(390, 180);
  vertex(380, 180);
  endShape(CLOSE);
  
    
  if(yellowUp){
   yellowVal = yellowVal+1;
   yellowUp = yellowVal > 255 ? false : true;
 }else{
   yellowVal = yellowVal-1;
   yellowUp = yellowVal < 0 ? true : false;
 } 
  fill(255,255,0, yellowVal);
  beginShape();
  vertex(420, 100);
  vertex(430, 100);
  vertex(430, 180);
  vertex(420, 180);
  endShape(CLOSE);
  
  fill( redSlider.value()-cyanVal, greenSlider.value()-magentaVal, blueSlider.value()-yellowVal);  
  circle(520,150,120);  
  
}

function AutoRun(){
if(autoRun){
  autoRun = false;
}
else{
  autoRun = true;
}
}