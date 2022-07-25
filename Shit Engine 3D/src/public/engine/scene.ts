import { vec3 } from "gl-matrix";
import { RenderObject } from "./renderobject";

export const lightDataSize: number = 3 * 4;

export class Scene {

	public pointLightPosition: Float32Array = vec3.fromValues(0, 0, 0) as Float32Array;

	public objects: Array<RenderObject> = [];

	public AddObject(object: RenderObject) {

		return this.objects.push(object);
	}

	public GetObjects(): Array<RenderObject> {

		return this.objects;

	}
}