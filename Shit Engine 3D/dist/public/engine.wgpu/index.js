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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cube = exports.Scene = exports.Camera = exports.RenderObject = exports.Updater = exports.Renderer = exports.getGPUDevice = exports.device = void 0;
const utils_1 = require("./utils/utils");
function getGPUDevice() {
    return __awaiter(this, void 0, void 0, function* () {
        const adapter = yield navigator.gpu.requestAdapter();
        if (adapter === null)
            throw new Error("Failed to initialize GPU device.");
        return yield adapter.requestDevice();
    });
}
exports.getGPUDevice = getGPUDevice;
class Renderer {
    constructor(canvasElement, width, height) {
        this.events = {};
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
    On(event, callback) {
        this.events[event] = callback;
    }
    Update() {
        if (!this.hasInitialized)
            return;
        this.updateRenderPassDescriptor();
    }
    Render(camera, scene) {
        if (!this.hasInitialized)
            return;
        this.renderPassDescriptor.colorAttachments[0].view = this.ctx.getCurrentTexture().createView();
        const commandEncoder = this.device.createCommandEncoder();
        const passEncoder = commandEncoder.beginRenderPass(this.renderPassDescriptor);
        for (let object of scene.objects) {
            object.draw(passEncoder, this.device, camera);
        }
        passEncoder.end();
        this.device.queue.submit([commandEncoder.finish()]);
    }
    // Private methods.
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("%cInitializing GPU device...", "color: yellow;");
            this.device = yield getGPUDevice();
            exports.device = this.device;
            console.log("%cGPU device has been initialized. GPU limits are being showed down below.", "color: lime");
            console.log(exports.device.limits);
            this.format = yield navigator.gpu.getPreferredCanvasFormat();
            this.ctx = this.domElement.getContext("webgpu");
            if (this.ctx !== null)
                console.log("%cRendering context has been set.", "color: gray");
            this.ctx.configure({ device: this.device, format: this.format, alphaMode: "opaque" });
            console.log("%cContext has been configured.", "color: gray;");
            this.renderPassDescriptor = {
                colorAttachments: [
                    {
                        view: undefined,
                        loadOp: 'clear',
                        clearValue: this.clearColor,
                        storeOp: 'store',
                        resolveTarget: undefined
                    }
                ],
                depthStencilAttachment: {
                    view: this.depthTextureView(),
                    depthLoadOp: 'clear',
                    depthClearValue: 1.0,
                    depthStoreOp: 'store',
                    stencilLoadOp: 'load',
                    stencilStoreOp: 'store',
                },
            };
            this.hasInitialized = true;
            if (typeof this.events.ready === "function")
                this.events.ready(this);
            console.log("%cGPU is now ready to render.", "color: lime;");
            return true;
        });
    }
    depthTextureView() {
        return this.device.createTexture({
            size: {
                width: this.width * devicePixelRatio,
                height: this.height * devicePixelRatio
            },
            format: 'depth24plus-stencil8',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        }).createView();
    }
    updateRenderPassDescriptor() {
        this.renderPassDescriptor.depthStencilAttachment.view = this.depthTextureView();
        return this;
    }
}
exports.Renderer = Renderer;
class Updater {
    constructor(renderer) {
        this.id = (0, utils_1.GenerateUniqueID)(18).id;
        this.timestamp = Date.now();
        this.perfectFrameRate = 60;
        this.isLooping = false;
        this.times = [];
        this.events = {};
        this.lastTimestamp = 0;
        this.renderer = renderer;
    }
    // Public methods.
    On(event, callback) {
        this.events[event] = callback;
    }
    Start() {
        if (this.isLooping)
            return false;
        return this.update(performance.now());
    }
    // Private methods.
    update(timestamp) {
        this.animationFrame = window.requestAnimationFrame((d) => this.update(d));
        const now = performance.now();
        this.deltaTime = (now - this.lastTimestamp) / (1000 / this.perfectFrameRate);
        this.lastTimestamp = now;
        this.renderer.Update();
        while (this.times.length > 0 && this.times[0] <= now - 1000)
            this.times.shift();
        this.times.push(now);
        this.fps = this.times.length;
        if (typeof this.events.update === "function")
            this.events.update(this.deltaTime);
    }
}
exports.Updater = Updater;
var renderobject_1 = require("./renderobject");
Object.defineProperty(exports, "RenderObject", { enumerable: true, get: function () { return renderobject_1.RenderObject; } });
var camera_1 = require("./camera");
Object.defineProperty(exports, "Camera", { enumerable: true, get: function () { return camera_1.Camera; } });
var scene_1 = require("./scene");
Object.defineProperty(exports, "Scene", { enumerable: true, get: function () { return scene_1.Scene; } });
var cube_1 = require("./meshes/cube");
Object.defineProperty(exports, "Cube", { enumerable: true, get: function () { return cube_1.Cube; } });
