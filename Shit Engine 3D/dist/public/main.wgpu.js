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
const gl_matrix_1 = require("gl-matrix");
const engine_1 = require("./engine");
const keyboard_1 = require("./engine/utils/keyboard");
const utils_1 = require("./engine/utils/utils");
const renderer = new engine_1.Renderer(document.querySelector(".renderer"), innerWidth, innerHeight);
const camera = new engine_1.Camera(null, null, (2 * Math.PI) / 5, innerWidth / innerHeight, 1, 1000);
const scene = new engine_1.Scene();
const updater = new engine_1.Updater(renderer);
renderer.clearColor = { r: .8, g: .8, b: .8, a: 1 };
window.camera = camera;
window.renderer = renderer;
window.scene = scene;
const uiFPSCounter = document.querySelector(".ui-row.framerate span");
const uiDeltaTimeCounter = document.querySelector(".ui-row.deltatime span");
const uiResolutionMeter = document.querySelector(".ui-row.resolution span");
const uiAspectMeter = document.querySelector(".ui-row.aspect span");
const uiPixelRatio = document.querySelector(".ui-row.pixelratio span");
const uiCanvasFormat = document.querySelector(".ui-row.canvasformat span");
const uiCameraPosition = document.querySelector(".ui-row.cameraposition span");
const uiCameraRotation = document.querySelector(".ui-row.camerarotation span");
let smoothness = 20;
let positionZ = 200;
let lastZPosition = 0;
window.setCameraZPosition = function (zPos) {
    positionZ = zPos;
};
updater.On("update", function (deltaTime) {
    if (!renderer.hasInitialized)
        return;
    renderer.Render(camera, scene);
    uiFPSCounter.innerText = `FPS: ${updater.fps} fps`;
    uiDeltaTimeCounter.innerText = `Delta time: ${updater.deltaTime.toFixed(2)} ms`;
    if (keyboard_1.QWERTYControlKeys.w)
        positionZ -= .3 * deltaTime;
    if (keyboard_1.QWERTYControlKeys.s)
        positionZ += .3 * deltaTime;
    lastZPosition += ((positionZ - lastZPosition) / smoothness) * deltaTime;
    camera.position.z = lastZPosition;
    scene.pointLightPosition = gl_matrix_1.vec3.fromValues(camera.position.x, camera.position.y + 2, camera.position.z);
    uiCameraPosition.innerText = `Camera position: ${camera.position.x.toFixed(3)} ${camera.position.y.toFixed(3)} ${camera.position.z.toFixed(3)}`;
    uiCameraRotation.innerText = `Camera rotation: ${camera.rotation.x.toFixed(3)} ${camera.rotation.y.toFixed(3)} ${camera.rotation.z.toFixed(3)}`;
});
const amount = 500;
function generateCubes(texture) {
    const color = {
        r: .3,
        g: 1,
        b: 1
    };
    const cube = new engine_1.Cube(color, texture);
    cube.position.x = (0, utils_1.RandomBetween)(-26, 26);
    cube.position.y = (0, utils_1.RandomBetween)(-26, 26);
    cube.position.z = (0, utils_1.RandomBetween)(0, amount / 2);
    cube.rotation.x = (0, utils_1.RandomBetween)(0, 360) / Math.PI * 180;
    cube.rotation.y = (0, utils_1.RandomBetween)(0, 360) / Math.PI * 180;
    cube.rotation.z = (0, utils_1.RandomBetween)(0, 360) / Math.PI * 180;
    scene.AddObject(cube);
}
renderer.On("ready", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const textures = [
            yield engine_1.Texture.CreateImageBitmapSync("https://www.pngitem.com/pimgs/m/345-3458559_barack-obama-meme-barack-obama-mem-hd-png.png"),
            yield engine_1.Texture.CreateImageBitmapSync("https://cdn.discordapp.com/attachments/883971111753244682/958401081568792646/277517229_1304850536702999_2025974004791313734_n.jpg"),
            yield engine_1.Texture.CreateImageBitmapSync("https://cdn.discordapp.com/attachments/883971111753244682/917837847216660521/image0-15.png"),
            yield engine_1.Texture.CreateImageBitmapSync("https://cdn.discordapp.com/attachments/883971111753244682/917837847497691236/hqdefault.jpg"),
        ];
        for (let i = 0; i < amount; i++) {
            const texture = textures[Math.floor(Math.random() * textures.length)];
            generateCubes(texture);
        }
        positionZ = 10;
    });
});
window.addEventListener("load", function () {
    uiResolutionMeter.innerText = `Resolution: ${this.innerWidth} x ${this.innerHeight}`;
    uiAspectMeter.innerText = `Aspect: ${this.innerWidth / this.innerHeight}`;
    uiPixelRatio.innerText = `Pixel ratio: ${this.devicePixelRatio}`;
    uiCanvasFormat.innerText = `Canvas format: bgra8unorm`;
    updater.Start();
});
