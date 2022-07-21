"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const path_1 = __importDefault(require("path"));
const gl_matrix_1 = require("gl-matrix");
const shaderLoader_1 = __importDefault(require("./shaderLoader"));
const triangle_1 = require("./triangle");
const shaderPath = path_1.default.join(__dirname, "../../", "shaders", "shader.wgsl");
class Renderer {
    constructor(canvas, width, height) {
        this.transformX = 0;
        this.transformY = 0;
        this.events = {};
        canvas.width = width;
        canvas.height = height;
        this.canvas = canvas;
    }
    On(event, callback) {
        this.events[event] = callback;
        return this;
    }
    InitializeProgram() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("%cInitializing program...", "color: yellow");
            yield this.SetupDevice();
            yield this.CreateAssets();
            yield this.CreatePipeline();
            console.log("%cProgram has been initialized!", "color: lime");
            if (typeof this.events["ready"] === "function")
                this.events["ready"]();
        });
    }
    SetupDevice() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("%cRequesting GPU adapter...", "color: yellow");
            this.adapter = (yield navigator.gpu.requestAdapter());
            console.log(`%cSuccesfully requested GPU adapter with profile '${this.adapter.name}'. Adapter limits: ${JSON.stringify(this.adapter.limits)}`, "color: lime");
            console.log("%cRequesting GPU device...", "color: yellow");
            this.device = (yield this.adapter.requestDevice());
            console.log("%cSuccesfully requested GPU device", "color: lime");
            this.ctx = this.canvas.getContext("webgpu");
            console.log("%cSuccesfully initialized GPU rendering context", "color: lime");
            this.format = navigator.gpu.getPreferredCanvasFormat();
            console.log(`%cDetected preferred canvas format '${this.format}'`, "color: gray;");
            this.ctx.configure({ device: this.device, format: this.format, alphaMode: "opaque" });
            console.log("%cRendering context has been configured", "color: gray;");
            console.log(this.device);
            console.log(this.adapter);
        });
    }
    CreatePipeline() {
        return __awaiter(this, void 0, void 0, function* () {
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
            this.pipeline = yield this.device.createRenderPipelineAsync({
                vertex: {
                    module: this.device.createShaderModule({
                        code: shaderLoader_1.default.loadShader(shaderPath)
                    }),
                    entryPoint: "vertexMain",
                    buffers: [this.mesh.bufferLayout]
                },
                fragment: {
                    module: this.device.createShaderModule({
                        code: shaderLoader_1.default.loadShader(shaderPath)
                    }),
                    entryPoint: "fragmentMain",
                    targets: [{ format: this.format }]
                },
                primitive: { topology: "triangle-list" },
                layout: pipelineLayout
            });
        });
    }
    CreateAssets() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mesh = new triangle_1.Triangle.Mesh(this.device);
        });
    }
    Render() {
        return __awaiter(this, void 0, void 0, function* () {
            const projection = gl_matrix_1.mat4.create();
            gl_matrix_1.mat4.perspective(projection, Math.PI / 4, window.innerWidth / window.innerHeight, .1, 50);
            const view = gl_matrix_1.mat4.create();
            gl_matrix_1.mat4.lookAt(view, [-2, 0, 1], [this.transformY, 0, 0], [0, 0, 1]);
            const model = gl_matrix_1.mat4.create();
            gl_matrix_1.mat4.rotate(model, model, this.transformX, [0, 0, 1]);
            if (typeof this.device === "undefined")
                return;
            this.device.queue.writeBuffer(this.uniformBuffer, 0, model);
            this.device.queue.writeBuffer(this.uniformBuffer, 64, view);
            this.device.queue.writeBuffer(this.uniformBuffer, 128, projection);
            const commandEncoder = this.device.createCommandEncoder();
            const textureView = this.ctx.getCurrentTexture().createView();
            const renderPass = commandEncoder.beginRenderPass({
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
        });
    }
}
exports.Renderer = Renderer;
