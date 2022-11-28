// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_pixel_size;
uniform vec4 u_random;


void main() {
    float tiles = 20.0;
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(0,0,0,0);
    float blue = st.x;
    
    blue = (floor((st.x)*10.0)/10.0);
    if(st.y<0.1){
      blue = blue + +((floor((st.y)*10.0))*(u_random.x-0.5)/10.0);
    }
    else if (st.y<0.2){
      blue = blue + +((floor((st.y)*10.0))*(u_random.x-0.5)/10.0);
    }
  else if (st.y<0.3){
      blue = blue + +((floor((st.y)*10.0))*(u_random.z-0.5)/10.0);
    }
  else if (st.y<0.4){
      blue = blue + +((floor((st.y)*10.0))*(u_random.w-0.5)/10.0);
    }
  else if (st.y<0.5){
      blue = blue + +((floor((st.y)*10.0))*(u_random.y-0.5)/10.0);
    }
  else if (st.y<0.6){
      blue = blue + +((floor((st.y)*10.0))*(u_random.x-0.5)/10.0);
    }
  else if (st.y<0.7){
      blue = blue + +((floor((st.y)*10.0))*(u_random.z-0.5)/10.0);
    }
  else if (st.y<0.8){
      blue = blue + +((floor((st.y)*10.0))*(u_random.y-0.5)/10.0);
    }
  else if (st.y<0.9){
      blue = blue + +((floor((st.y)*10.0))*(u_random.w-0.5)/10.0);
    }
  
    
    color = vec4(0,0,blue+(floor(u_time*5.0)/5.0),0);
    gl_FragColor = color;
}

