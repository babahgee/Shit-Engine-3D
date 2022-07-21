"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("./renderer");
const canvas = document.querySelector("canvas.renderer");
const renderer = new renderer_1.Renderer(canvas, window.innerWidth, window.innerHeight);
renderer.InitializeProgram();
renderer.On("ready", function () {
    update();
    window.addEventListener("mousemove", function (event) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;
        renderer.transformX = Math.PI / 180 * distanceX;
        renderer.transformY = -(1 / (window.innerHeight / 2) * distanceY);
    });
});
function update() {
    renderer.Render();
    window.requestAnimationFrame(update);
}
