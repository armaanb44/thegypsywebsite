void main()
{
    float d = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - smoothstep(0.0, 0.5, d);
    gl_FragColor = vec4(1.0, 0.85, 0.3, strength);
}