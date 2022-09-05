function setup() {
    createCanvas(800, 400);
    frameRate(45)
    posX=0
    colorA=color(255,255,0)
    colorB=color(25,25,112)
    bars=true
    blackWhite=false
  }
  
  function draw() {
    background(255);
    
    
    if(bars){
    for (i =0;i<800;i=i+40){
      fill(color(0))
      rect(i, 0, 20, 400);
    }
    }
    noStroke()
    fill(colorA)
    rect(posX,140,120,40)
    
    fill(colorB)
    rect(posX,260,120,40)
    posX=posX+1
    
    if(posX==680){
      posX=0
    }
  
  }
  function mousePressed() {
    
    if(bars==true){
      bars=false
    }else{
      bars=true
    } 
  }
  function keyPressed(){
    if(blackWhite==false){
      colorA=color(255)
      colorB=color(0)
      blackWhite=true
    }else{
      colorA=color(255,255,0)
      colorB=color(25,25,112)
      blackWhite=false
    }
    
  }