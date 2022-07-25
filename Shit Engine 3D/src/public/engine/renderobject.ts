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

export interface RenderObjectScaling {
	x: number;
	y: number;
	z: number;
}

export interface PlainColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

export interface Color {
	r: number;
	g: number;
	b: number;
}


// Classes and functions. 

export class RenderObject {

	public readonly id = GenerateUniqueID(18).id;
	public readonly timestamp = Date.now();

	public position: RenderObjectPosition = { x: 0, y: 0, z: 0 };
	public rotation: RenderObjectRotation = { x: 0, y: 0, z: 0 };
	public scale: RenderObjectScaling = { x: 1, y: 1, z: 1 };

	public matrixSize = 4 * 16;
	public offset = 256;
	public uniformBufferSize = this.offset;

	public transformMatrix = mat4.create() as Float32Array;
	public rotateMatrix = mat4.create() as Float32Array;

	declare public renderPipeline: GPURenderPipeline;
	declare public transformationBuffer: GPUBuffer;
	declare public transformationBindGroup: GPUBindGroup;

	declare public verticesBuffer: GPUBuffer;
	declare public colorBuffer: GPUBuffer;

	public draw(passEncoder: GPURenderPassEncoder, device: GPUDevice): void {

	}
}