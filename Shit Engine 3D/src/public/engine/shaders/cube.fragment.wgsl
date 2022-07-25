struct LightData {
	lightPos: vec3<f32>
}

struct FragmentInput {
	@location(0) fragColor: vec3<f32>,
	@location(1) fragNorm: vec3<f32>,
	@location(2) uv: vec2<f32>,
	@location(3) fragPos: vec3<f32>
}


@group(0) @binding(3) var<uniform> lightData: LightData;

const ambientLightFactor: f32 = .6;

@group(0) @binding(4) var mySampler: sampler;
@group(0) @binding(5) var myTexture: texture_2d<f32>;

@fragment fn main(input: FragmentInput) -> @location(0) vec4<f32> {

	let lightDirection: vec3<f32> = normalize(lightData.lightPos - input.fragPos);

	let lambertFactor: f32 = dot(lightDirection, input.fragNorm);

	var lightFactor: f32 = lambertFactor;

	let lightningFactor: f32 = 	max(min(lightFactor, 1.0), ambientLightFactor);

	return vec4<f32>(textureSample(myTexture, mySampler, input.uv).xyz * lightningFactor, 1.0);
}