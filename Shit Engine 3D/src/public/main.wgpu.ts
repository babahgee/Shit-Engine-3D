import { vec3 } from "gl-matrix";
import { Camera, Cube, Renderer, Scene, Updater, Texture } from "./engine";
import { Color  } from "./engine/renderobject";
import { Keyboard, QWERTYControlKeys } from "./engine/utils/keyboard";
import { RandomBetween } from "./engine/utils/utils";

declare global {
	interface Window {
		camera: Camera;
		renderer: Renderer;
		scene: Scene;
		setCameraZPosition: (zPos: number) => void;
	}
}

const renderer = new Renderer(document.querySelector(".renderer") as HTMLCanvasElement, innerWidth, innerHeight);

const camera = new Camera(null, null, (2 * Math.PI) / 5, innerWidth / innerHeight, 1, 1000);
const scene = new Scene();
const updater = new Updater(renderer);

renderer.clearColor = { r: .8, g: .8, b: .8, a: 1 };

window.camera = camera;
window.renderer = renderer;
window.scene = scene;

const uiFPSCounter: HTMLSpanElement = document.querySelector(".ui-row.framerate span") as HTMLSpanElement;
const uiDeltaTimeCounter: HTMLSpanElement = document.querySelector(".ui-row.deltatime span") as HTMLSpanElement;
const uiResolutionMeter: HTMLSpanElement = document.querySelector(".ui-row.resolution span") as HTMLSpanElement;
const uiAspectMeter: HTMLSpanElement = document.querySelector(".ui-row.aspect span") as HTMLSpanElement;
const uiPixelRatio: HTMLSpanElement = document.querySelector(".ui-row.pixelratio span") as HTMLSpanElement;
const uiCanvasFormat: HTMLSpanElement = document.querySelector(".ui-row.canvasformat span") as HTMLSpanElement;
const uiCameraPosition: HTMLSpanElement = document.querySelector(".ui-row.cameraposition span") as HTMLSpanElement;
const uiCameraRotation: HTMLSpanElement = document.querySelector(".ui-row.camerarotation span") as HTMLSpanElement;

let smoothness: number = 20;

let positionZ: number = 200;
let lastZPosition: number = 0; 

window.setCameraZPosition = function (zPos: number) {
	positionZ = zPos;
}

updater.On("update", function (deltaTime: number) {

	if (!renderer.hasInitialized) return;

	renderer.Render(camera, scene);

	uiFPSCounter.innerText = `FPS: ${updater.fps} fps`;
	uiDeltaTimeCounter.innerText = `Delta time: ${updater.deltaTime.toFixed(2)} ms`;

	if (QWERTYControlKeys.w) positionZ -= .3 * deltaTime;
	if (QWERTYControlKeys.s) positionZ += .3 * deltaTime;

	lastZPosition += ((positionZ - lastZPosition) / smoothness) * deltaTime;

	camera.position.z = lastZPosition;

	scene.pointLightPosition = vec3.fromValues(camera.position.x, camera.position.y + 2, camera.position.z) as Float32Array;

	

	uiCameraPosition.innerText = `Camera position: ${camera.position.x.toFixed(3)} ${camera.position.y.toFixed(3)} ${camera.position.z.toFixed(3) }`;
	uiCameraRotation.innerText = `Camera rotation: ${camera.rotation.x.toFixed(3) } ${camera.rotation.y.toFixed(3) } ${camera.rotation.z.toFixed(3)}`;
});

const amount: number = 500;

function generateCubes(texture: ImageBitmap) {


	const color: Color = {
		r: .3,
		g: 1,
		b: 1
	}

	const cube: Cube = new Cube(color, texture);

	cube.position.x = RandomBetween(-26, 26);
	cube.position.y = RandomBetween(-26, 26)
	cube.position.z = RandomBetween(0, amount / 2);

	cube.rotation.x = RandomBetween(0, 360) / Math.PI * 180;
	cube.rotation.y = RandomBetween(0, 360) / Math.PI * 180;
	cube.rotation.z = RandomBetween(0, 360) / Math.PI * 180;

	scene.AddObject(cube);

}


renderer.On("ready", async function () {


	const textures: Array<ImageBitmap> = [
		await Texture.CreateImageBitmapSync("https://www.pngitem.com/pimgs/m/345-3458559_barack-obama-meme-barack-obama-mem-hd-png.png"),
		await Texture.CreateImageBitmapSync("https://cdn.discordapp.com/attachments/883971111753244682/958401081568792646/277517229_1304850536702999_2025974004791313734_n.jpg"),
		await Texture.CreateImageBitmapSync("https://cdn.discordapp.com/attachments/883971111753244682/917837847216660521/image0-15.png"),
		await Texture.CreateImageBitmapSync("https://cdn.discordapp.com/attachments/883971111753244682/917837847497691236/hqdefault.jpg"),
	];

	for (let i = 0; i < amount; i++) {

		const texture: ImageBitmap = textures[Math.floor(Math.random() * textures.length)];

		generateCubes(texture);
	}

	positionZ = 10;
});


window.addEventListener("load", function () {

	uiResolutionMeter.innerText = `Resolution: ${this.innerWidth} x ${this.innerHeight}`;
	uiAspectMeter.innerText = `Aspect: ${this.innerWidth / this.innerHeight}`;
	uiPixelRatio.innerText = `Pixel ratio: ${this.devicePixelRatio}`;
	uiCanvasFormat.innerText = `Canvas format: bgra8unorm`

	updater.Start();

});