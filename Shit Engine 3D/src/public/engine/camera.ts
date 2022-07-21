import { mat3, mat4, vec3 } from "gl-matrix";

// Interfaces and types.

export interface CameraPosition {
	x: number;
	y: number;
	z: number;
}

export interface CameraRotation {
	x: number;
	y: number;
	z: number;
}

export type CameraFieldOfViewY = number;
export type CameraAspect = number;
export type CameraNearValue = number;
export type CameraFarValue = number;

// Classes

export class Camera {

	declare public position: CameraPosition;
	declare public rotation: CameraRotation;

	declare public fovy: CameraFieldOfViewY;
	declare public aspect: CameraAspect;
	declare public near: CameraNearValue;
	declare public far: CameraFarValue;

	constructor(position: CameraPosition | null, rotation: CameraRotation | null, fovy: CameraFieldOfViewY, aspect: CameraAspect, near: CameraNearValue, far: CameraFarValue) {

		if (position !== null) {
			this.position = position;
		} else {
			this.position = {
				x: 0,
				y: 0,
				z: 0
			}
		}

		if (rotation !== null) {
			this.rotation = rotation;
		} else {
			this.rotation = {
				z: 0,
				y: 0,
				x: 0
			}
		}

		this.fovy = fovy;
		this.aspect = aspect;
		this.near = near;
		this.far = far;

	}

	public GetViewMatrix(): mat4 {

		const viewMatrix = mat4.create();

		const currentPosition: vec3 = vec3.fromValues(this.position.x, this.position.y, this.position.z);

		mat4.lookAt(viewMatrix, currentPosition, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));

		mat4.rotateX(viewMatrix, viewMatrix, this.rotation.x);
		mat4.rotateY(viewMatrix, viewMatrix, this.rotation.y);
		mat4.rotateZ(viewMatrix, viewMatrix, this.rotation.z);

		return viewMatrix;
	}

	public GetProjectionMatrix(): mat4 {

		const matrix: mat4 = mat4.create();

		mat4.perspective(matrix, this.fovy, this.aspect, this.near, this.far);

		return matrix;
	}

	public GetCameraProjectionMatrix(): mat4 {

		const matrix: mat4 = mat4.create();

		const view: mat4 = this.GetViewMatrix();
		const projection: mat4 = this.GetProjectionMatrix();

		mat4.multiply(matrix, projection, view);

		return matrix;
	}
}