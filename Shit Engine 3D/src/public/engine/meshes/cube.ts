import { mat4, vec3 } from "gl-matrix";
import { decode } from "querystring";
import { device } from "..";
import { Camera } from "../camera";
import { RenderObject, RenderObjectPosition, RenderObjectRotation } from "../renderobject";
import { LoadShader } from "../utils/shaderLoader";

const cubeVertexCount = 36;

// prettier-ignore
const cubeVertices = new Float32Array([
  // float4 position, float4 color, float2 uv,
  1, -1, 1, 1,   1, 0, 0, 1,  1, 1,
  -1, -1, 1, 1,  1, 0, 0, 1,  0, 1,
  -1, -1, -1, 1, 1, 0, 0, 1,  0, 0,
  1, -1, -1, 1,  1, 0, 0, 1,  1, 0,
  1, -1, 1, 1,   1, 0, 0, 1,  1, 1,
  -1, -1, -1, 1, 1, 0, 0, 1,  0, 0,

  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
  1, -1, 1, 1,   1, 0, 1, 1,  0, 1,
  1, -1, -1, 1,  1, 0, 0, 1,  0, 0,
  1, 1, -1, 1,   1, 1, 0, 1,  1, 0,
  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
  1, -1, -1, 1,  1, 0, 0, 1,  0, 0,

  -1, 1, 1, 1,   0, 1, 1, 1,  1, 1,
  1, 1, 1, 1,    1, 1, 1, 1,  0, 1,
  1, 1, -1, 1,   1, 1, 0, 1,  0, 0,
  -1, 1, -1, 1,  0, 1, 0, 1,  1, 0,
  -1, 1, 1, 1,   0, 1, 1, 1,  1, 1,
  1, 1, -1, 1,   1, 1, 0, 1,  0, 0,

  -1, -1, 1, 1,  0, 0, 1, 1,  1, 1,
  -1, 1, 1, 1,   0, 1, 1, 1,  0, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
  -1, -1, -1, 1, 0, 0, 0, 1,  1, 0,
  -1, -1, 1, 1,  0, 0, 1, 1,  1, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,

  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
  -1, 1, 1, 1,   0, 1, 1, 1,  0, 1,
  -1, -1, 1, 1,  0, 0, 1, 1,  0, 0,
  -1, -1, 1, 1,  0, 0, 1, 1,  0, 0,
  1, -1, 1, 1,   1, 0, 1, 1,  1, 0,
  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,

  1, -1, -1, 1,  1, 0, 0, 1,  1, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,  0, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
  1, 1, -1, 1,   1, 1, 0, 1,  1, 0,
  1, -1, -1, 1,  1, 0, 0, 1,  1, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
]);

const vertexShader: string = LoadShader("src/public/engine/shaders/cube.vertex.wgsl");
const fragmentShader: string = LoadShader("src/public/engine/shaders/cube.fragment.wgsl");

const positionOffset = 0;
const colorOffset = 4 * 4; // Byte offset of object color attribute.
const vertexSize = 4 * 10; // Byte size of one object.

export class Cube extends RenderObject {

	constructor(position: RenderObjectPosition | null, rotation: RenderObjectRotation | null) {
		super();

		if (position !== null) this.position = position;
		if (rotation !== null) this.rotation = rotation;

		this.vertexCount = cubeVertexCount;

		this.renderPipeline = device.createRenderPipeline({
			vertex: {
				module: device.createShaderModule({
					code: vertexShader
				}),
				entryPoint: "main",
				buffers: [
					{
						arrayStride: vertexSize,
						attributes: [
							{
								// position
								shaderLocation: 0,
								offset: positionOffset,
								format: 'float32x4',
							},
							{
								// color
								shaderLocation: 1,
								offset: colorOffset,
								format: 'float32x4',
							},
						],
					} as GPUVertexBufferLayout
				]
			},
			fragment: {
				module: device.createShaderModule({
					code: fragmentShader,
				}),
				entryPoint: 'main',
				targets: [
					{
						format: 'bgra8unorm' as GPUTextureFormat,
					},
				],
			},
			layout: "auto",
			primitive: {
				topology: 'triangle-list',
				cullMode: 'back',
			},
			depthStencil: {
				depthWriteEnabled: true,
				depthCompare: 'less',
				format: 'depth24plus-stencil8',
			},
		});

		this.uniformBuffer = device.createBuffer({
			size: this.uniformBufferSize,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		});

		this.uniformBindGroup = device.createBindGroup({
			layout: this.renderPipeline.getBindGroupLayout(0),
			entries: [
				{
					binding: 0,
					resource: {
						buffer: this.uniformBuffer,
						offset: 0,
						size: this.matrixSize,
					},
				},
			],
		});

		this.verticesBuffer = device.createBuffer({
			size: cubeVertices.byteLength,
			usage: GPUBufferUsage.VERTEX,
			mappedAtCreation: true,
		});

		new Float32Array(this.verticesBuffer.getMappedRange()).set(cubeVertices);

		this.verticesBuffer.unmap();
	}

	public override draw(passEncoder: GPURenderPassEncoder, device: GPUDevice, camera: Camera) {

		this.updateMatrix(camera.GetCameraProjectionMatrix());

		passEncoder.setPipeline(this.renderPipeline);

		device.queue.writeBuffer(this.uniformBuffer, 0, this.modelViewProjectionMatrix.buffer, this.modelViewProjectionMatrix.byteOffset, this.modelViewProjectionMatrix.byteLength );

		passEncoder.setVertexBuffer(0, this.verticesBuffer);
		passEncoder.setBindGroup(0, this.uniformBindGroup);
		passEncoder.draw(this.vertexCount, 1, 0, 0);
	}

	private updateMatrix(cameraProjectionMatrix: mat4) {

		const matrix: mat4 = mat4.create();

		const x: number = this.position.x,
			y: number = this.position.y,
			z: number = this.position.z;

		mat4.translate(matrix, matrix, vec3.fromValues(x, y, z));

		mat4.rotateX(matrix, matrix, this.rotation.x);
		mat4.rotateY(matrix, matrix, this.rotation.y);
		mat4.rotateZ(matrix, matrix, this.rotation.z);

		mat4.multiply(this.modelViewProjectionMatrix, cameraProjectionMatrix, matrix);
	}
}