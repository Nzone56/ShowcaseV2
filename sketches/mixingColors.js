function setup() {
    createCanvas(640, 340);
    redVal = 0;
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
  }
  
  function draw() {
    background(220);
    noStroke();
   if(redUp){
     redVal = redVal + 1;
     fill(redVal, 0,0)
     redUp = redVal > 255 ? false : true;
   }else{   
     redVal = redVal - 1;
     fill(redVal, 0,0)
     redUp = redVal < 0 ? true : false;
   }
    circle(140,100,160)
    
    if(greenUp){ 
      greenVal = greenVal +1.5;
     fill(0, greenVal,0)
     greenUp = greenVal > 255 ? false : true;
   }else{
     greenVal = greenVal - 1.5;
     fill(0,greenVal,0)
     greenUp = greenVal < 0 ? true : false;
   }
    circle(170,160,160)
    
     if(blueUp){
     blueVal = blueVal+2;
     fill(0, 0, blueVal)
     blueUp = blueVal > 255 ? false : true;
   }else{
     blueVal = blueVal-2;
     fill(0,0, blueVal)
     blueUp = blueVal < 0 ? true : false;
   }  
    circle(100,160, 160);
    
    fill(redVal, 0,blueVal);
    arc(140,100, 160, 160, 2.07,3.33);  
    arc(100,160, 160, 160, 4.2, 5.39);
    
   fill(redVal, greenVal,0);
    arc(140,100, 160, 160, 6.25, 1.07);
    arc(170,160, 160, 160, 4.2, 5.39);  
    
    fill( 0, greenVal, blueVal);  
    arc(170,160, 160, 160, 2.02, PI);  
    arc(100,160, 160, 160, 0, 1.12);
  
    fill( redVal, greenVal, blueVal);  
    arc(170,160, 160, 160, 3.11, 4.25); 
    arc(140,100, 160, 160, 1.07, 2.24);
    arc(100,160, 160, 160, 5.16, 0.125);
    
    beginShape();
    vertex(260, 120);
    vertex(290, 120);
    vertex(290, 150);
    vertex(260, 150);
    endShape(CLOSE);  
   
    beginShape();
    vertex(290, 160);
    vertex(320, 130);
    vertex(290, 110);
    endShape(CLOSE);
    
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
    
    fill( redVal-cyanVal, greenVal-magentaVal, blueVal-yellowVal);  
    circle(520,150,120);  
    
  }