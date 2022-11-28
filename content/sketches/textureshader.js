let pg;
let truchetShader;
let isShader = false;


function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  myshader = loadShader('/showcase/sketches/shader.vert','/showcase/sketches/shader.frag');
  randomAdd = [random(),random(),random(),random(),random()];
}

function setup() {
  createCanvas(400, 400, WEBGL);
  
  // initialize the createGraphics layers
  shaderTexture = createGraphics(400, 400, WEBGL);

  // turn off the createGraphics layers stroke
  shaderTexture.noStroke();
  
  textureMode(NORMAL);
  noStroke();
  
  

}

function draw() {
  background(33);
  orbitControl();
  
  if(fract(millis() / 1000.0)>0.9){
    randomAdd = [random(),random(),random(),random(),random()];
  }
  shaderTexture.shader(myshader)
  shaderTexture.rect(-200,-200,400,400);
  myshader.setUniform("u_resolution", [width, height]);
  myshader.setUniform("u_pixel_size", 10);
  myshader.setUniform("u_random", randomAdd);
  myshader.setUniform("u_time", fract(millis() / 1000.0));
  isShader = true;
  texture(shaderTexture);
  plane(200, 200);
}
