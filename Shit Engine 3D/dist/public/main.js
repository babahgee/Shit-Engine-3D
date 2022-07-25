"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
const keyboard_1 = require("./engine/utils/keyboard");
const renderer = new engine_1.Renderer(document.querySelector(".renderer"), innerWidth, innerHeight);
const camera = new engine_1.Camera(null, null, (2 * Math.PI) / 5, innerWidth / innerHeight, 1, 1000);
const scene = new engine_1.Scene();
const updater = new engine_1.Updater(renderer);
const uiFPSCounter = document.querySelector(".ui-row.framerate span");
const uiDeltaTimeCounter = document.querySelector(".ui-row.deltatime span");
const uiResolutionMeter = document.querySelector(".ui-row.resolution span");
const uiAspectMeter = document.querySelector(".ui-row.aspect span");
const uiPixelRatio = document.querySelector(".ui-row.pixelratio span");
const uiCanvasFormat = document.querySelector(".ui-row.canvasformat span");
const uiCameraPosition = document.querySelector(".ui-row.cameraposition span");
const uiCameraRotation = document.querySelector(".ui-row.camerarotation span");
renderer.clearColor = {
    r: .2,
    g: .2,
    b: .2,
    a: 1
};
updater.On("update", function (deltaTime) {
    if (!renderer.hasInitialized)
        return;
    renderer.Render(camera, scene);
    uiFPSCounter.innerText = `FPS: ${updater.fps} fps`;
    uiDeltaTimeCounter.innerText = `Delta time: ${updater.deltaTime.toFixed(2)} ms`;
    if (keyboard_1.QWERTYControlKeys.w)
        camera.position.z += .1 * deltaTime;
    if (keyboard_1.QWERTYControlKeys.s)
        camera.position.z -= .1 * deltaTime;
    if (keyboard_1.QWERTYControlKeys.d)
        camera.rotation.y += .1 * deltaTime;
    if (keyboard_1.QWERTYControlKeys.a)
        camera.rotation.y -= .1 * deltaTime;
    uiCameraPosition.innerText = `Camera position: ${camera.position.x.toFixed(3)} ${camera.position.y.toFixed(3)} ${camera.position.z.toFixed(3)}`;
    uiCameraRotation.innerText = `Camera rotation: ${camera.rotation.x.toFixed(3)} ${camera.rotation.y.toFixed(3)} ${camera.rotation.z.toFixed(3)}`;
});
renderer.On("ready", function () {
    camera.position.y = 16;
    camera.position.z = 2;
    for (let i = 0; i < 32; i++) {
        const distance = (innerWidth / innerHeight) * i;
        const position = {
            x: 0,
            y: -1,
            z: distance
        };
        const cube = new engine_1.Cube(position, null);
        scene.AddObject(cube);
    }
});
window.addEventListener("load", function () {
    uiResolutionMeter.innerText = `Resolution: ${this.innerWidth} x ${this.innerHeight}`;
    uiAspectMeter.innerText = `Aspect: ${this.innerWidth / this.innerHeight}`;
    uiPixelRatio.innerText = `Pixel ratio: ${this.devicePixelRatio}`;
    uiCanvasFormat.innerText = `Canvas format: ${this.navigator.gpu.getPreferredCanvasFormat()}`;
    updater.Start();
});
