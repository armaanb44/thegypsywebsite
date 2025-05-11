uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    float scale = 0.5 + aScale * 0.5; // forces it between 0.5 and 1.0
    gl_PointSize = uSize * scale * uPixelRatio;
    gl_PointSize *= (1.0 / -viewPosition.z);
}