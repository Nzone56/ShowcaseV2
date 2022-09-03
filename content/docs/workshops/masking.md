# Workshop - Masking

## Kernel
In image processing, a kernel, convolution matrix, or mask is a small matrix used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between the kernel and an image.
## Convolution
Convolution is the process of adding each element of the image to its local neighbors, weighted by the kernel. This is related to a form of mathematical convolution. The matrix operation being performed—convolution—is not traditional matrix multiplication, despite being similarly denoted by *.

For each 3x3 block of pixels in the original image , we multiply each pixel by the corresponding entry of the kernel and then take the sum. That sum becomes a new pixel in the result image.

One subtlety of this process is what to do along the edges of the image. For example, the top left corner of the input image only has three neighbors. One way to fix this is to extend the edge values out by one in the original image while keeping our new image the same size.


## Results

JS CODE 
 {{< details title="IMAGE KERNEL CODE " open=false >}}




```js
  let kernel = [[-1, -1, -1 ], [ -1,  9, -1 ], [-1, -1, -1 ]]; 
function preload() {
  img = loadImage("/showcase/sketches/lenna.png"); 
}
function setup() {
  createCanvas(512, 512);
  noLoop();
}
function draw() {
  
  image(img, 0, 0);
  edgeImg = createImage(img.width, img.height);
  
  edgeImg.loadPixels();
  
  for (let x = 1; x < img.width - 1; x++) {
    for (let y = 1; y < img.height - 1; y++) {
      let sum = 0; 
      
      for (kx = -1; kx <= 1; kx++) {
        for (ky = -1; ky <= 1; ky++) {
          
          let xpos = x + kx;
          let ypos = y + ky;
          let pos = (y + ky)*img.width + (x + kx);
          let val = red(img.get(xpos, ypos));
          sum += kernel[ky+1][kx+1] * val;
        }
      }
      edgeImg.set(x, y, color(sum, sum, sum));
    }
  }
  
  edgeImg.updatePixels();
  image(edgeImg, img.width, 0);
}
  
```
{{< /details >}}

Apply image kernel

{{< p5-iframe sketch="/showcase/sketches/imageKernelWK.js" width="735" height="550" >}}




