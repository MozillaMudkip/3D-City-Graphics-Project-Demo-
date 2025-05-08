// metalShader.fs
uniform vec3 baseColor;
uniform vec3 panelColor;
uniform vec3 borderColor;
uniform float panelSize;
uniform float borderWidth;
uniform float time;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

//Set a radom value for panel placements
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

//This is probably used Deepseek the most durring the project, I really struggled to wrap my mind
//around shaders in Workbook 10 and here was no different. In the end, I basically parted through
//it with Deepseek to get all my pieces where they need to go then worked with it to do a lot 
//of Debugging to dial it in to exactly the look I was going for. I feel like I learned quite a bit
//working though it like this and I feel a lot more comfortable now. Shaders are kinda tough!
vec3 panelEffect(vec2 uv, float size) {
    //Creates the metal panel look
    //We pass in UVs to make a grid
    vec2 panelUV = (uv * size);
    vec2 panelID = floor(panelUV);
    vec2 panelPos = fract(panelUV) - 0.5;
    
    //I use smooth step to make the board of the panels at edges nice a smooth
    float edges = smoothstep(0.5-borderWidth, 0.5, abs(panelPos.x)) + 
                 smoothstep(0.5-borderWidth, 0.5, abs(panelPos.y));
    edges = clamp(edges, 0.0, 1.0);
    
    float panelPlacement = random(panelID);
    vec3 color = mix(baseColor, panelColor, panelPlacement * 0.3); // Reduced mix strength
    color = (color * 0.9); 
    
    return mix(color, borderColor, edges);
}

//Creates a reflection on the metal as we move around the scene
vec3 fakeEnvReflection(vec3 normal, vec3 viewingDirection) {
    //We use the directionl vextors to simulate the way light would reflect off the surface
    vec3 reflection = reflect(-viewingDirection, normal);
    float fresnel = pow(1.0 - max(dot(normal, viewingDirection), 0.0), 3.0);
    //Set the vector to create a gray looking reflection 
    //accurate to the metal walls this shader will go on
    return vec3(0.3 + fresnel * 0.4); 
}

void main() {
    //Finds the vector for the camera view (used for reflections)
    vec3 viewingDirection = normalize(cameraPosition - vWorldPosition);
    //Creates a vector for the metal color
    vec3 color = panelEffect(vUv, panelSize);
    
    // Darker reflections
    vec3 reflections = fakeEnvReflection(vNormal, viewingDirection);
    //Sets the reflection amount (change the decimal to make the metal more or less reflective, 0.8 seem to look pretty good)
    color = (color * reflections * 0.8); 
    
    //Set a kind of glow to the edges to make it look brighter and more shiny
    float glow = pow(1.0 - max(dot(vNormal, viewingDirection), 0.0), 3.0);
    color = (color + glow * 0.05); 
    
    //Add a darkened look to the final color to make it look like a very dark metal
    //accurate to the city in the game
    color = mix(color, vec3(0.3), 0.3); 
    //Set FragColor to our final made color
    gl_FragColor = vec4(color, 1.0);
}