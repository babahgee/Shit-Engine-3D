import { mat4 } from "gl-matrix";
import { Camera } from "./camera";
import { GenerateUniqueID } from "./utils/utils";

// Interfaces and types.

export interface RenderObjectPosition {
	x: number;
	y: number;
	z: number;
}

export interface RenderObjectRotation {
	x: number;
	y: number;
	z: number;
}




// Classes and functions. 

export class RenderObject {

	public readonly id = GenerateUniqueID(18).id;
	public readonly timestamp = Date.now();

	public position: RenderObjectPosition = { x: 0, y: 0, z: 0 };
	public rotation: RenderObjectRotation = { x: 0, y: 0, z: 0 };

	public matrixSize = 4 * 16;
	public offset = 256;
	public uniformBufferSize = this.matrixSize + this.offset;

	public modelViewProjectionMatrix: Float32Array = mat4.create() as Float32Array;

	declare public renderPipeline: GPURenderPipeline;
	declare public uniformBuffer: GPUBuffer;
	declare public uniformBindGroup: GPUBindGroup;
	declare public verticesBuffer: GPUBuffer;
	declare public vertexCount: number;

	public draw(passEncoder: GPURenderPassEncoder, device: GPUDevice, camera: Camera): void {

	}
}