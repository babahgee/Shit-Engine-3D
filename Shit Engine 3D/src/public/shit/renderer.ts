import fs from "fs";
import url from "url";
import path from "path";
import { mat4 } from "gl-matrix";

import shaderLoader from "./shaderLoader";
import { Triangle } from "./triangle";

type RendererInstanceEvents = "ready";

const shaderPath = path.join(__dirname, "../../", "shaders", "shader.wgsl");


export class Renderer {
	declare public canvas: HTMLCanvasElement;

	declare public adapter: GPUAdapter;
	declare public device: GPUDevice;
	declare public ctx: GPUCanvasContext;
	declare public format: GPUTextureFormat;

	declare public uniformBuffer: GPUBuffer;
	declare public bindGroup: GPUBindGroup;
	declare public pipeline: GPURenderPipeline;

	declare public mesh: Triangle.Mesh;

	public transformX: number = 0;
	public transformY: number = 0;

	public events: {[key: string]: Function} = {};

	public constructor(canvas: HTMLCanvasElement, width: number, height: number) {

		canvas.width = width;
		canvas.height = height;

		this.canvas = canvas;
	}

	public On(event: RendererInstanceEvents, callback: () => void): Renderer {

		this.events[event] = callback;

		return this;
	}

	async InitializeProgram() {

		console.log("%cInitializing program...", "color: yellow");

		await this.SetupDevice();
		await this.CreateAssets();
		await this.CreatePipeline();

		console.log("%cProgram has been initialized!", "color: lime");

		if (typeof this.events["ready"] === "function") this.events["ready"]();
	}

	async SetupDevice() {

		console.log("%cRequesting GPU adapter...", "color: yellow")
		this.adapter = <GPUAdapter>await navigator.gpu.requestAdapter();
		console.log(`%cSuccesfully requested GPU adapter with profile '${this.adapter.name}'. Adapter limits: ${JSON.stringify(this.adapter.limits)}`, "color: lime");

		console.log("%cRequesting GPU device...", "color: yellow")
		this.device = <GPUDevice>await this.adapter.requestDevice();
		console.log("%cSuccesfully requested GPU device", "color: lime");

		this.ctx = <GPUCanvasContext>this.canvas.getContext("webgpu");
		console.log("%cSuccesfully initialized GPU rendering context", "color: lime");

		this.format = <GPUTextureFormat>navigator.gpu.getPreferredCanvasFormat();
		console.log(`%cDetected preferred canvas format '${this.format}'`, "color: gray;");

		this.ctx.configure({ device: this.device, format: this.format, alphaMode: "opaque" });
		console.log("%cRendering context has been configured", "color: gray;");


		console.log(this.device);
		console.log(this.adapter);
	}

	async CreatePipeline() {

		this.uniformBuffer = this.device.createBuffer({
			size: 64 * 3,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
		});

		const bindGroupLayout = this.device.createBindGroupLayout({
			entries: [{
				binding: 0,
				visibility: GPUShaderStage.VERTEX,
				buffer: {}
			}]
		});

		this.bindGroup = this.device.createBindGroup({
			layout: bindGroupLayout,
			entries: [{
				binding: 0,
				resource: {
					buffer: this.uniformBuffer
				}
			}]
		});

		const pipelineLayout = this.device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] });

		this.pipeline = await this.device.createRenderPipelineAsync({
			vertex: {
				module: this.device.createShaderModule({
					code: shaderLoader.loadShader(shaderPath)
				}),
				entryPoint: "vertexMain",
				buffers: [this.mesh.bufferLayout]
			},
			fragment: {
				module: this.device.createShaderModule({
					code: shaderLoader.loadShader(shaderPath)
				}),
				entryPoint: "fragmentMain",
				targets: [{format: this.format}]
			},
			primitive: {topology: "triangle-list"},
			layout: pipelineLayout
		});

	}

	async CreateAssets() {

		this.mesh = new Triangle.Mesh(this.device);

	}

	async Render() {


		const projection = mat4.create();
		mat4.perspective(projection, Math.PI / 4, window.innerWidth / window.innerHeight, .1, 50);

		const view = mat4.create();
		mat4.lookAt(view, [-2, 0, 1], [this.transformY, 0, 0], [0, 0, 1]);

		const model = mat4.create();
		mat4.rotate(model, model, this.transformX, [0, 0, 1]);

		if (typeof this.device === "undefined") return;

		this.device.queue.writeBuffer(this.uniformBuffer, 0, model as ArrayBuffer);
		this.device.queue.writeBuffer(this.uniformBuffer, 64, view as ArrayBuffer);
		this.device.queue.writeBuffer(this.uniformBuffer, 128, projection as ArrayBuffer);

		const commandEncoder: GPUCommandEncoder = this.device.createCommandEncoder();
		const textureView: GPUTextureView = this.ctx.getCurrentTexture().createView();

		const renderPass: GPURenderPassEncoder = commandEncoder.beginRenderPass({
			colorAttachments: [{
				view: textureView,
				clearValue: { r: 0, g: 0, b: 0, a: 1.0 },
				loadOp: "clear",
				storeOp: "store"
			}]
		});

		renderPass.setPipeline(this.pipeline);
		renderPass.setVertexBuffer(0, this.mesh.buffer);
		renderPass.setBindGroup(0, this.bindGroup);
		renderPass.draw(3, 1, 0, 0);
		renderPass.end();

		this.device.queue.submit([commandEncoder.finish()]);
	}
}