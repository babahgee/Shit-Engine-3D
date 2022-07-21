import fs from "fs";
import url from "url";
import path from "path";

import loader from "./shaderLoader";

import { Triangle } from "./triangle";
import { Renderer } from "./renderer";

const canvas: HTMLCanvasElement = document.querySelector("canvas.renderer") as HTMLCanvasElement;

const renderer: Renderer = new Renderer(canvas, window.innerWidth, window.innerHeight);

renderer.InitializeProgram();

renderer.On("ready", function () {

	update();

	window.addEventListener("mousemove", function (event: MouseEvent) {

		const centerX: number = window.innerWidth / 2;
		const centerY: number = window.innerHeight / 2;

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
