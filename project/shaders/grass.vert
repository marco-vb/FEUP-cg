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

    float windStrength = 0.1; 
    float windFrequency = 3.0;
    float displacement = windStrength * sin(aVertexPosition.y * windFrequency + time);

    vec3 displacedPosition = aVertexPosition;
    displacedPosition.z += displacement;

    vec3 position = (uMVMatrix * vec4(displacedPosition, 1.0)).xyz;

    vTextureCoord = aTextureCoord;

    gl_Position = uPMatrix * vec4(position, 1.0);
}