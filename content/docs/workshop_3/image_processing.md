# Image Processing

{{<hint info>}}

## Exercise

Implement an image / video processing app supporting different masks, including other kernel sizes different than 3x3, and:

- A region-of-interest base tool to selectively apply a given mask.Hint: circular regions around the mouse pointer are handy and quite simple to implement by means of glsl distance.
- A magnifier tool. Requires a bit of research. For instance, look for it in shadertoy.
- Integrate luma and other coloring brightness tools.

What other shader tools would you implement?

{{</hint>}}

## Kernel

In image processing, a kernel, convolution matrix, or mask is a small matrix used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between the kernel and an image.

## Convolution

Convolution is the process of adding each element of the image to its local neighbors, weighted by the kernel. This is related to a form of mathematical convolution. The matrix operation being performed—convolution—is not traditional matrix multiplication, despite being similarly denoted by *.

For each 3x3 block of pixels in the original image , we multiply each pixel by the corresponding entry of the kernel and then take the sum. That sum becomes a new pixel in the result image.

One subtlety of this process is what to do along the edges of the image. For example, the top left corner of the input image only has three neighbors. One way to fix this is to extend the edge values out by one in the original image while keeping our new image the same size.

## Kernels
{{<details title="KERNELS" open=false >}}
__BOX BLUR:__

 {{< katex >}}
    \frac{1}{9} 
    \begin{bmatrix}
    1 & 1 & 1\\
    1 & 1 & 1\\
    1 & 1 & 1
    \end{bmatrix}
    {{< /katex >}}

__SHARPEN KERNEL:__

 {{< katex >}} 
    \begin{bmatrix}
    0 & -1 & 0\\
    -1 & 5 & -1\\
    0 & -1 & 0
    \end{bmatrix}
    {{< /katex >}}

__OUTLINE KERNEL:__

 {{< katex >}} 
    \begin{bmatrix}
    -1 & -1 & -1\\
    -1 & 8 & -1\\
    -1 & -1 & -1
    \end{bmatrix}
    {{< /katex >}}

__EMBOSS KERNEL:__

 {{< katex >}} 
    \begin{bmatrix}
    -2 & -1 & 0\\
    -1 & 1 & 1\\
    0 & 1 & 2
    \end{bmatrix}
    {{< /katex >}}

__EDGE KERNEL:__

 {{< katex >}}
    \begin{bmatrix}
    -1 & -2 & -1\\
    -1 & 8 & -1\\
    -1 & -4 & -1
    \end{bmatrix}
    {{< /katex >}}


{{< /details >}}
## Results

{{<details title="KERNEL" open=false >}}
```js
vec4 applyKernel(){
  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*kernel[i];
  }

  convolution = vec4(convolution.rgb, 1.0);

  return convolution;
}
```
{{< /details >}}

{{<details title="MAGNIFIER - REGION " open=false >}}
```js
if(dist < radius){
    if(magnifier){

      vec2 mouseDist = gl_FragCoord.xy - mouse;
      vec2 newCoords = gl_FragCoord.xy;
      vec2 zoomed = (newCoords - (mouseDist * scale)) / resolution;
      zoomed = vec2(zoomed.x, 1.0 - zoomed.y);
      vec4 zoomedTexel = texture2D(texture, zoomed);
      zoomedTexel = changeBrightness(zoomedTexel);
      gl_FragColor = zoomedTexel;

    }
    else if(region){

      vec2 newCoords = gl_FragCoord.xy;
      vec2 region = newCoords / resolution;
      vec4 regionTexel = texture2D(texture, region);
      regionTexel = applyKernel();
      regionTexel = changeBrightness(regionTexel);
      gl_FragColor = regionTexel;

    }
    else{
      gl_FragColor = texel;
    }
  }
  else{
    gl_FragColor = texel;
  }
```
{{< /details >}}
{{<details title="BRIGHT" open=false >}}
```js
float luma(vec3 texel){
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float hsv(vec3 texel){
  return max(max(texel.r, texel.g), texel.b);
}

float hsl(vec3 texel){
  float maxColor = max(max(texel.r, texel.g), texel.b);
  float minColor = min(min(texel.r, texel.g), texel.b);
  return (maxColor + minColor)/2.0;
}
```
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/imageProcess.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="700" height="700">}}