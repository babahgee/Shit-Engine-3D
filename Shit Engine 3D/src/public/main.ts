import { Camera, Cube, Renderer, Scene, Updater } from "./engine";
import { RenderObject, RenderObjectPosition, RenderObjectRotation } from "./engine/renderobject";
import { Keyboard, QWERTYControlKeys } from "./engine/utils/keyboard";
import { RandomBetween } from "./engine/utils/utils";


const renderer = new Renderer(document.querySelector(".renderer") as HTMLCanvasElement, innerWidth, innerHeight);

const camera = new Camera(null, null, (2 * Math.PI) / 5, innerWidth / innerHeight, 1, 1000);
const scene = new Scene();
const updater = new Updater(renderer);

const uiFPSCounter: HTMLSpanElement = document.querySelector(".ui-row.framerate span") as HTMLSpanElement;
const uiDeltaTimeCounter: HTMLSpanElement = document.querySelector(".ui-row.deltatime span") as HTMLSpanElement;
const uiResolutionMeter: HTMLSpanElement = document.querySelector(".ui-row.resolution span") as HTMLSpanElement;
const uiAspectMeter: HTMLSpanElement = document.querySelector(".ui-row.aspect span") as HTMLSpanElement;
const uiPixelRatio: HTMLSpanElement = document.querySelector(".ui-row.pixelratio span") as HTMLSpanElement;
const uiCanvasFormat: HTMLSpanElement = document.querySelector(".ui-row.canvasformat span") as HTMLSpanElement;
const uiCameraPosition: HTMLSpanElement = document.querySelector(".ui-row.cameraposition span") as HTMLSpanElement;
const uiCameraRotation: HTMLSpanElement = document.querySelector(".ui-row.camerarotation span") as HTMLSpanElement;

renderer.clearColor = {
	r: .2,
	g: .2,
	b: .2,
	a: 1
}

updater.On("update", function (deltaTime: number) {

	if (!renderer.hasInitialized) return;

	renderer.Render(camera, scene);

	uiFPSCounter.innerText = `FPS: ${updater.fps} fps`;
	uiDeltaTimeCounter.innerText = `Delta time: ${updater.deltaTime.toFixed(2)} ms`;

	if (QWERTYControlKeys.w) camera.position.z += .1 * deltaTime;
	if (QWERTYControlKeys.s) camera.position.z -= .1 * deltaTime;

	if (QWERTYControlKeys.d) camera.rotation.y += .1 * deltaTime;
	if (QWERTYControlKeys.a) camera.rotation.y -= .1 * deltaTime;

	uiCameraPosition.innerText = `Camera position: ${camera.position.x.toFixed(3)} ${camera.position.y.toFixed(3)} ${camera.position.z.toFixed(3) }`;
	uiCameraRotation.innerText = `Camera rotation: ${camera.rotation.x.toFixed(3) } ${camera.rotation.y.toFixed(3) } ${camera.rotation.z.toFixed(3)}`;
});


renderer.On("ready", function () {


	for (let i = 0; i < 224; i++) {

		const position: RenderObjectPosition = {
			x: RandomBetween(-60, 60),
			y: RandomBetween(-60, 60),
			z: RandomBetween(50, -50)
		};

		const rotation: RenderObjectRotation = {
			x: RandomBetween(-5, 5),
			y: RandomBetween(-5, 5),
			z: RandomBetween(-5, -5)
		}

		const cube: Cube = new Cube(position, rotation);

		scene.AddObject(cube);
	}

});


window.addEventListener("load", function () {

	uiResolutionMeter.innerText = `Resolution: ${this.innerWidth} x ${this.innerHeight}`;
	uiAspectMeter.innerText = `Aspect: ${this.innerWidth / this.innerHeight}`;
	uiPixelRatio.innerText = `Pixel ratio: ${this.devicePixelRatio}`;
	uiCanvasFormat.innerText = `Canvas format: ${this.navigator.gpu.getPreferredCanvasFormat()}`

	updater.Start();

});