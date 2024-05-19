attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float time;

varying vec4 vert;
varying vec2 vTextureCoord;

void main() {

    float windStrength = 0.2; 
    float windFrequency = 0.5;
    float y = aVertexPosition.y;
    float displacement = windStrength * y * y * sin(windFrequency * time);

    if (displacement > 0.0) displacement = -displacement;

    if (aVertexPosition.y == 0.0) displacement = 0.0;

    vec3 displacedPosition = aVertexPosition;
    displacedPosition.z += displacement;

    vec3 position = (uMVMatrix * vec4(displacedPosition, 1.0)).xyz;

    vTextureCoord = aTextureCoord;

    gl_Position = uPMatrix * vec4(position, 1.0);
}