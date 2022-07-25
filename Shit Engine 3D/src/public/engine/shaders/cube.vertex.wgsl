struct Uniforms {
    transform: mat4x4<f32>,
    rotate: mat4x4<f32>
};

struct Camera {
    matrix: mat4x4<f32>
}

struct Color {
    color: vec3<f32>
}

@group(0) @binding(0) var<uniform> modelTransform: Uniforms;
@group(0) @binding(2) var<uniform> cameraTransform: Camera;
@group(0) @binding(1) var<storage, read> color: Color;

struct VertexOutput {
    @builtin(position) Position: vec4<f32>,
    @location(0) fragColor: vec3<f32>,
    @location(1) fragNorm: vec3<f32>,
    @location(2) uv: vec2<f32>,
    @location(3) fragPos: vec3<f32>
};

struct VertexInput {
    @location(0) position: vec3<f32>,
    @location(1) norm: vec3<f32>,
    @location(2) uv: vec2<f32>
}

@vertex
fn main(input: VertexInput) -> VertexOutput {

    var output: VertexOutput;

    var transformedPosition: vec4<f32> = modelTransform.transform * vec4<f32>(input.position, 1);

    output.Position = cameraTransform.matrix * transformedPosition;
    output.fragColor = color.color;
    output.fragNorm = (modelTransform.rotate * vec4<f32>(input.norm, 1)).xyz;
    output.uv = input.uv;
    output.fragPos = transformedPosition.xyz;

    return output;
}    