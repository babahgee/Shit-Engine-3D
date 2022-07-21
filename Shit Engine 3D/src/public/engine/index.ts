import { Camera } from "./camera";
import { RenderObject } from "./renderobject";
import { Scene } from "./scene";
import { GenerateUniqueID } from "./utils/utils";

// Global interfaces and types
export interface RendererStandardClearColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

export type RendererEventNames = "ready" | "error";
export type UpdaterEventNames = "update";


// Global Variables, classes and functions.

export let device: GPUDevice;

export async function getGPUDevice(): Promise<GPUDevice> {

	const adapter = await navigator.gpu.requestAdapter();

	if (adapter === null) throw new Error("Failed to initialize GPU device.");

	return await adapter.requestDevice();
}


export class Renderer {

	declare public domElement: HTMLCanvasElement;

	declare public width: number;
	declare public height: number;

	declare public device: GPUDevice;
	declare public ctx: GPUCanvasContext;	
	declare public format: GPUTextureFormat;

	declare public clearColor: RendererStandardClearColor;

	declare public hasInitialized: boolean;
	
	declare private renderPassDescriptor: GPURenderPassDescriptor;

	private events: {[key: string]: Function} = {};

	public constructor(canvasElement: HTMLCanvasElement, width: number, height: number) {

		this.width = width;
		this.height = height;

		this.domElement = canvasElement;

		this.clearColor = { r: 0, g: 0, b: 0, a: 1 };

		canvasElement.width = width * devicePixelRatio;
		canvasElement.height = height * devicePixelRatio;

		console.log(`%cResolution has been set to canvas element`, "color: lime;");

		this.hasInitialized = false;

		this.init();
	}

	// Public methods.

	public On(event: RendererEventNames, callback: () => void) {

		this.events[event] = callback;

	}

	public Update() {

		if (!this.hasInitialized) return;

		this.updateRenderPassDescriptor();
	}

	public Render(camera: Camera, scene: Scene) {

		if (!this.hasInitialized) return;

		(this.renderPassDescriptor.colorAttachments as [GPURenderPassColorAttachment])[0].view = this.ctx.getCurrentTexture().createView();

		const commandEncoder = this.device.createCommandEncoder();
		const passEncoder: GPURenderPassEncoder = commandEncoder.beginRenderPass(this.renderPassDescriptor);


		for (let object of scene.objects) {

			object.draw(passEncoder, this.device, camera);
		}

		passEncoder.end();
		this.device.queue.submit([commandEncoder.finish()]);
	}


	// Private methods.

	private async init(): Promise<boolean> {

		console.log("%cInitializing GPU device...", "color: yellow;");

		this.device = await getGPUDevice();

		device = this.device;

		console.log("%cGPU device has been initialized. GPU limits are being showed down below.", "color: lime");
		console.log(device.limits);
		
		this.format = await navigator.gpu.getPreferredCanvasFormat();

		this.ctx = this.domElement.getContext("webgpu") as GPUCanvasContext;

		if (this.ctx !== null) console.log("%cRendering context has been set.", "color: gray");

		this.ctx.configure({ device: this.device, format: this.format, alphaMode: "opaque" });
		console.log("%cContext has been configured.", "color: gray;");

		this.renderPassDescriptor = {
			colorAttachments:[
				<unknown> {
					view: undefined,
					loadOp: 'clear',
					clearValue: this.clearColor,
					storeOp: 'store',
					resolveTarget: undefined
				} as GPURenderPassColorAttachment
			],
			depthStencilAttachment: {
				view: this.depthTextureView(),
				depthLoadOp: 'clear',
				depthClearValue: 1.0,
				depthStoreOp: 'store',
				stencilLoadOp: 'load',
				stencilStoreOp: 'store',
			},
		}

		this.hasInitialized = true;

		if (typeof this.events.ready === "function") this.events.ready(this);

		console.log("%cGPU is now ready to render.", "color: lime;");

		return true;
	}

	private depthTextureView(): GPUTextureView {

		return this.device.createTexture({
			size: {
				width: this.width * devicePixelRatio,
				height: this.height * devicePixelRatio
			},
			format: 'depth24plus-stencil8',
			usage: GPUTextureUsage.RENDER_ATTACHMENT,
		}).createView();

	}

	private updateRenderPassDescriptor(): Renderer {

		(this.renderPassDescriptor.depthStencilAttachment as GPURenderPassDepthStencilAttachment).view = this.depthTextureView();

		return this;
	}
}


export class Updater {

	declare private renderer: Renderer;

	public id: string = GenerateUniqueID(18).id;
	public timestamp: number = Date.now();

	public perfectFrameRate: number = 60;

	public isLooping: boolean = false;

	declare public fps: number;
	declare public deltaTime: number;

	private times: Array<number> = [];
	private events: { [key: string]: Function } = {};
	private lastTimestamp: number = 0;

	declare private animationFrame: number;

	constructor(renderer: Renderer) {

		this.renderer = renderer;

	}

	// Public methods.

	public On(event: UpdaterEventNames, callback: (deltaTime: number) => void) {

		this.events[event] = callback;

	}

	public Start() {

		if (this.isLooping) return false;

		return this.update(performance.now());
	}

	// Private methods.

	private update(timestamp: number) {

		this.animationFrame = window.requestAnimationFrame((d: number) => this.update(d));

		const now: number = performance.now();

		this.deltaTime = (now - this.lastTimestamp) / (1000 / this.perfectFrameRate);

		this.lastTimestamp = now;

		this.renderer.Update();

		while (this.times.length > 0 && this.times[0] <= now - 1000) this.times.shift();

		this.times.push(now);
		this.fps = this.times.length;

		if (typeof this.events.update === "function") this.events.update(this.deltaTime);
	}
}

export { RenderObject } from "./renderobject";
export { Camera, CameraNearValue, CameraRotation, CameraPosition, CameraAspect, CameraFarValue, CameraFieldOfViewY } from "./camera";
export { Scene } from "./scene";
export { Cube } from "./meshes/cube";