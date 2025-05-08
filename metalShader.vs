// metalShader.vs
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

// Some basic vs shader stuff
//Basically the same as the base implementation in Workbook 10
void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}