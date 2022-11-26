# Illusions - Stepping

## Explicación

Las diferencias de contraste entre el amarillo y el blanco y el negro y el azul permiten que se genere la ilusión optica en la que los bloques van dando pasos. Este efecto se ve reforzado cuando el experimento se hace a blanco y negro.

* Oprima el mouse para quitar el fondo.

* Oprima una tecla para pasar a blanco y negro.
{{< details title="CODE" open=false >}} 
```js 
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
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/steppingIllusion.js" width="800" height="400" >}}
