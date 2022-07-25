import { mat4, vec3 } from "gl-matrix";
import { cameraUniformBuffer, device, lightDataBuffer } from "..";
import { Color, PlainColor, RenderObject, RenderObjectPosition, RenderObjectRotation } from "../renderobject";
import { lightDataSize } from "../scene";
import { LoadShader } from "../utils/shaderLoader";

const cubeVertexCount = 36;

export interface CubeVerticesIndex {
	pos: Array<number>;
	norm: Array<number>;
	uv: Array<number>
}

export type CubeVertices = Array<CubeVertices>;

function createVertices(r: number, g: number, b: number, a: number) {

	const vertices = new Float32Array([
	  // float4 position, float4 color, float2 uv,
	  1, -1, 1, 1,   r, g, b, a,  1, 1,
	  -1, -1, 1, 1,  r, g, b, a,  0, 1,
	  -1, -1, -1, 1, r, g, b, a,  0, 0,
	  1, -1, -1, 1,  r, g, b, a,  1, 0,
	  1, -1, 1, 1,   r, g, b, a,  1, 1,
	  -1, -1, -1, 1, r, g, b, a,  0, 0,
							  
	  1, 1, 1, 1,    r, g, b, a,  1, 1,
	  1, -1, 1, 1,   r, g, b, a,  0, 1,
	  1, -1, -1, 1,  r, g, b, a,  0, 0,
	  1, 1, -1, 1,   r, g, b, a,  1, 0,
	  1, 1, 1, 1,    r, g, b, a,  1, 1,
	  1, -1, -1, 1,  r, g, b, a,  0, 0,
							  
	  -1, 1, 1, 1,   r, g, b, a,  1, 1,
	  1, 1, 1, 1,    r, g, b, a,  0, 1,
	  1, 1, -1, 1,   r, g, b, a,  0, 0,
	  -1, 1, -1, 1,  r, g, b, a,  1, 0,
	  -1, 1, 1, 1,   r, g, b, a,  1, 1,
	  1, 1, -1, 1,   r, g, b, a,  0, 0,
							  
	  -1, -1, 1, 1,  r, g, b, a,  1, 1,
	  -1, 1, 1, 1,   r, g, b, a,  0, 1,
	  -1, 1, -1, 1,  r, g, b, a,  0, 0,
	  -1, -1, -1, 1, r, g, b, a,  1, 0,
	  -1, -1, 1, 1,  r, g, b, a,  1, 1,
	  -1, 1, -1, 1,  r, g, b, a,  0, 0,
							  
	  1, 1, 1, 1,    r, g, b, a,  1, 1,
	  -1, 1, 1, 1,   r, g, b, a,  0, 1,
	  -1, -1, 1, 1,  r, g, b, a,  0, 0,
	  -1, -1, 1, 1,  r, g, b, a,  0, 0,
	  1, -1, 1, 1,   r, g, b, a,  1, 0,
	  1, 1, 1, 1,    r, g, b, a,  1, 1,
							  
	  1, -1, -1, 1,  r, g, b, a,  1, 1,
	  -1, -1, -1, 1, r, g, b, a,  0, 1,
	  -1, 1, -1, 1,  r, g, b, a,  0, 0,
	  1, 1, -1, 1,   r, g, b, a,  1, 0,
	  1, -1, -1, 1,  r, g, b, a,  1, 1,
	  -1, 1, -1, 1,  r, g, b, a,  0, 0,
	]);

	return vertices;
}
function createTexturedVertices() {

	const vertices: unknown = [
		{ pos: [-1, -1, 1], norm: [0, 0, 1], uv: [0, 0], },
		{ pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0], },
		{ pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1], },

		{ pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1], },
		{ pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0], },
		{ pos: [1, 1, 1], norm: [0, 0, 1], uv: [1, 1], },
		// right
		{ pos: [1, -1, 1], norm: [1, 0, 0], uv: [0, 0], },
		{ pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0], },
		{ pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1], },

		{ pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1], },
		{ pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0], },
		{ pos: [1, 1, -1], norm: [1, 0, 0], uv: [1, 1], },
		// back
		{ pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 0], },
		{ pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0], },
		{ pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1], },

		{ pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1], },
		{ pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0], },
		{ pos: [-1, 1, -1], norm: [0, 0, -1], uv: [1, 1], },
		// left
		{ pos: [-1, -1, -1], norm: [-1, 0, 0], uv: [0, 0], },
		{ pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0], },
		{ pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1], },

		{ pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1], },
		{ pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0], },
		{ pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [1, 1], },
		// top
		{ pos: [1, 1, -1], norm: [0, 1, 0], uv: [0, 0], },
		{ pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0], },
		{ pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1], },

		{ pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1], },
		{ pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0], },
		{ pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 1], },
		// bottom
		{ pos: [1, -1, 1], norm: [0, -1, 0], uv: [0, 0], },
		{ pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0], },
		{ pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1], },

		{ pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1], },
		{ pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0], },
		{ pos: [-1, -1, -1], norm: [0, -1, 0], uv: [1, 1], },
	];

	return vertices;
}


const vertexShader: string = LoadShader("src/public/engine/shaders/cube.vertex.wgsl");
const fragmentShader: string = LoadShader("src/public/engine/shaders/cube.fragment.wgsl");

const positionOffset = 0;
const colorOffset = 4 * 4; // Byte offset of object color attribute.
const vertexSize = 4 * 10; // Byte size of one object.

function createRenderPipelineDescriptor(stride: number): GPURenderPipelineDescriptor {

	const descriptor: GPURenderPipelineDescriptor = {
		vertex: {
			module: device.createShaderModule({ code: vertexShader }),
			entryPoint: "main",
			buffers: [
				{
					arrayStride: stride,
					attributes: [
						{
							// Position attribute
							shaderLocation: 0,
							offset: 0,
							format: "float32x3"
						},
						{
							// Norm attribute
							shaderLocation: 1,
							offset: 3 * 4,
							format: "float32x3"
						},
						{
							// UV attribute
							shaderLocation: 2,
							offset: (3 + 3) * 4,
							format: "float32x2"
						}
					]
				} as GPUVertexBufferLayout
			]
		},
		fragment: {
			module: device.createShaderModule({ code: fragmentShader }),
			entryPoint: "main",
			targets: [
				{
					format: navigator.gpu.getPreferredCanvasFormat() as GPUTextureFormat
				}
			]
		},
		primitive: {
			topology: "triangle-list",
			cullMode: "back"
		},
		depthStencil: {
			depthWriteEnabled: true,
			depthCompare: 'less',
			format: 'depth24plus-stencil8',
		},
		layout: "auto"
	};

	return descriptor;
}


export class Cube extends RenderObject {

	declare public vertices: Float32Array;
	declare public color: Color;
	declare public imageBitmap: ImageBitmap;

	private perVertex = (3 + 3 + 2);
	private stride = this.perVertex * 4;

	constructor(color: Color, imageBitmap: ImageBitmap) {
		super();

		this.color = color;
		this.imageBitmap = imageBitmap;

		this.vertices = createTexturedVertices() as Float32Array;

		const renderPipelineDescriptor: GPURenderPipelineDescriptor = createRenderPipelineDescriptor(this.stride);

		this.renderPipeline = device.createRenderPipeline(renderPipelineDescriptor);

		this.verticesBuffer = device.createBuffer({
			size: (this.vertices as Float32Array).length * this.stride,
			usage: GPUBufferUsage.VERTEX,
			mappedAtCreation: true
		});

		const mapping = new Float32Array(this.verticesBuffer.getMappedRange());

		for (let i = 0; i < (this.vertices as Float32Array).length; i++) {

			//@ts-expect-error
			mapping.set([this.vertices[i].pos[0] * this.scale.x, this.vertices[i].pos[1] * this.scale.y, this.vertices[i].pos[2] * this.scale.z], this.perVertex * i + 0);

			//@ts-expect-error
			mapping.set(this.vertices[i].norm, this.perVertex * i + 3);

			//@ts-expect-error
			mapping.set(this.vertices[i].uv, this.perVertex * i + 6);
		}

		this.verticesBuffer.unmap();

		this.transformationBuffer = device.createBuffer({
			size: this.uniformBufferSize,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
		});

		this.colorBuffer = device.createBuffer({
			mappedAtCreation: true,
			size: Float32Array.BYTES_PER_ELEMENT * 3,
			usage: GPUBufferUsage.STORAGE
		});

		const colorMapping = new Float32Array(this.colorBuffer.getMappedRange());

		colorMapping.set([this.color.r, this.color.g, this.color.b]);
		this.colorBuffer.unmap();

		const entries: Iterable<GPUBindGroupEntry> = [
			{
				binding: 0,
				resource: {
					buffer: this.transformationBuffer,
					offset: 0,
					size: this.matrixSize * 2
				}
			},
			{
				binding: 1,
				resource: {
					buffer: this.colorBuffer,
					offset: 0,
					size: Float32Array.BYTES_PER_ELEMENT * 3
				}
			},
			{
				binding: 2,
				resource: {
					buffer: cameraUniformBuffer,
					offset: 0,
					size: this.matrixSize
				},
			},
			{
				binding: 3,
				resource: {
					buffer: lightDataBuffer,
					offset: 0,
					size: lightDataSize
				}
			}
		];

		const cubeTexture = device.createTexture({
			size: [imageBitmap.width, imageBitmap.height, 1],
			format: navigator.gpu.getPreferredCanvasFormat(),
			usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
		}); 

		device.queue.copyExternalImageToTexture({ source: imageBitmap }, { texture: cubeTexture }, [imageBitmap.width, imageBitmap.height, 1]);

		const sampler = device.createSampler({
			minFilter: "linear",
			magFilter: "linear"
		});

		(entries as Array<GPUBindGroupEntry>).push({
			binding: 4,
			resource: sampler
		} as GPUBindGroupEntry);

		(entries as Array<GPUBindGroupEntry>).push({
			binding: 5,
			resource: cubeTexture.createView()
		} as GPUBindGroupEntry);

		this.transformationBindGroup = device.createBindGroup({
			layout: this.renderPipeline.getBindGroupLayout(0),
			entries: entries as Iterable<GPUBindGroupEntry>
		});
	}

	public draw(encoder: GPURenderPassEncoder, device: GPUDevice) {

		this.updateTransformationMatrix();

		encoder.setPipeline(this.renderPipeline);

		device.queue.writeBuffer(this.transformationBuffer, 0, this.transformMatrix.buffer, this.transformMatrix.byteOffset, this.transformMatrix.byteLength);
		device.queue.writeBuffer(this.transformationBuffer, 64, this.rotateMatrix.buffer, this.rotateMatrix.byteOffset, this.rotateMatrix.byteLength);

		encoder.setVertexBuffer(0, this.verticesBuffer);
		encoder.setBindGroup(0, this.transformationBindGroup);
		encoder.draw(this.vertices.length, 1, 0, 0);
	}

	// Private methods
	private updateTransformationMatrix() {

		const transform: mat4 = mat4.create();
		const rotation: mat4 = mat4.create();

		mat4.translate(transform, transform, vec3.fromValues(this.position.x, this.position.y, this.position.z));

		mat4.rotateX(transform, transform, this.rotation.x);
		mat4.rotateY(transform, transform, this.rotation.y);
		mat4.rotateZ(transform, transform, this.rotation.z);

		mat4.rotateX(rotation, rotation, this.rotation.x);
		mat4.rotateY(rotation, rotation, this.rotation.y);
		mat4.rotateZ(rotation, rotation, this.rotation.z);

		mat4.copy(this.transformMatrix, transform);
		mat4.copy(this.rotateMatrix, rotation);
	}
}