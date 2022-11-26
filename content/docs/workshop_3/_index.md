---
bookCollapseSection: true
---

# Workshop 3

{{<hint info>}}

## Exercises

1. Figure it out the js code of the above sketches.
1. Implement other blending modes. Take this reference as starting point.

{{</hint>}}

{{<hint info>}}

## Exercise

Redefine the shape texture coordinates to turn the above image upside down.

{{</hint>}}

{{<hint info>}}

## Exercises

1. Include the blue channel in the uv visualization (e.g., use blue with red or green channels).
1. Use other shapes different than the quad as screen filters.

{{</hint>}}

{{<hint info>}}

## Exercises

1. Implement other coloring brightness tools such as HSV value V, HSL lightness L or Component average.
1. Implement texture tinting by mixing color and texel interpolated data.

{{</hint>}}

{{<hint info>}}

## Exercise

Implement an image / video processing app supporting different masks, including other kernel sizes different than 3x3, and:

- A region-of-interest base tool to selectively apply a given mask.Hint: circular regions around the mouse pointer are handy and quite simple to implement by means of glsl distance.
- A magnifier tool. Requires a bit of research. For instance, look for it in shadertoy.
- Integrate luma and other coloring brightness tools.

What other shader tools would you implement?

{{</hint>}}

{{<hint info>}}

## Exercise

Adapt other patterns from the book of shaders (refer also to the shadertoy collection) and map them as textures onto other 3D shapes.

{{</hint>}}

{{<hint info>}}

## Exercises

1. Figure out the fragment shader code. Hint: the key to properly sample the texture is to observe that the tepotTex, the near plane and screen space are all isomorphic, i.e., they simply differ by a scaling factor:

1. Complete the other cube faces.

1. Use other platonic solids.

What other non-euclidean geometries applications would you like to implement?

{{</hint>}}

{{<hint info>}}

## Exercises

1. Implement your own source dataset and a mechanism to select different images from it.
1. Implement a pixelator in software that doesn’t use spatial coherence and compare the results with those obtained here.

{{</hint>}}

{{<hint info>}}

## Exercise

Implement a mosaic (or/and ascii art) visual application.

{{</hint>}}

{{<hint info>}}

## Exercise

Implement a scene having the following lighting equation: a=ambient ambient4a=ambientambient4, where ambient4ambient4 is the ambient light color. It should produce something like the sketch below:

{{</hint>}}

{{<hint info>}}

## Exercise

Tweak the above diffuse shader to implement a toon shading scene. It should produce something like the sketch below:

{{</hint>}}

{{<hint info>}}

## Exercise

Implement a specular reflection scene producing a result like the sketch below:

{{</hint>}}

{{<hint info>}}

## Exercises

1. Implement a scene combining ambient, diffuse and specular lights (see the local lighting equation). Consider supporting several point light sources, with attenuation factors and Phong exponents which controls the apparent smoothness of the surface.
1. Study and implement bump mapping. See also normal mapping and parallax mapping.
1. Study and implement reflection mapping.

{{</hint>}}
