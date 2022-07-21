import { RenderObject } from "./renderobject";

export class Scene {

	public objects: Array<RenderObject> = [];

	public AddObject(object: RenderObject) {

		return this.objects.push(object);
	}

	public GetObjects(): Array<RenderObject> {

		return this.objects;

	}
}