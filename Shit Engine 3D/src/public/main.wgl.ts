import { mat4, vec3 } from "gl-matrix";
import { LoadShader } from "./engine_gl/utils/shaderLoader";

const canvas: HTMLCanvasElement = document.querySelector("canvas.renderer") as HTMLCanvasElement;
const gl: WebGLRenderingContext = canvas.getContext("webgl", { antialias: true }) as WebGLRenderingContext;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function compileShader(src: string, type: number, typeString: string) {

	const shader: WebGLShader = gl.createShader(type) as WebGLShader;

	gl.shaderSource(shader as WebGLShader, src);
	gl.compileShader(shader as WebGLShader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader)?.toString());

	return shader;
}


async function initialize() {

	const vertexShaderSource: string = await LoadShader("shaders/shader.vert.glsl");
	const fragmentShaderSource: string = await LoadShader("shaders/shader.frag.glsl");

	const vertexShader: WebGLShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER, "VERTEX");
	const fragmentShader: WebGLShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "FRAGMENT");

	const program: WebGLProgram = gl.createProgram() as WebGLProgram;

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);

	const pMatrix = <WebGLUniformLocation>gl.getUniformLocation(program, "p_matrix");
	const vMatrix = <WebGLUniformLocation>gl.getUniformLocation(program, "v_matrix");
	const mMatrix = <WebGLUniformLocation>gl.getUniformLocation(program, "m_matrix");

	const color: number = gl.getAttribLocation(program, "color");
	const position: number = gl.getAttribLocation(program, "position");

	gl.enableVertexAttribArray(color);
	gl.enableVertexAttribArray(position);

	gl.useProgram(program);

	// Cube

	const vertices: Array<number> = [
		-1, -1, -1, 1, 1, 0,
		1, -1, -1, 1, 1, 0,
		1, 1, -1, 1, 1, 0,
		-1, 1, -1, 1, 1, 0,

		-1, -1, 1, 0, 0, 1,
		1, -1, 1, 0, 0, 1,
		1, 1, 1, 0, 0, 1,
		-1, 1, 1, 0, 0, 1,

		-1, -1, -1, 0, 1, 1,
		-1, 1, -1, 0, 1, 1,
		-1, 1, 1, 0, 1, 1,
		-1, -1, 1, 0, 1, 1,

		1, -1, -1, 1, 0, 0,
		1, 1, -1, 1, 0, 0,
		1, 1, 1, 1, 0, 0,
		1, -1, 1, 1, 0, 0,

		-1, -1, -1, 1, 0, 1,
		-1, -1, 1, 1, 0, 1,
		1, -1, 1, 1, 0, 1,
		1, -1, -1, 1, 0, 1,

		-1, 1, -1, 0, 1, 0,
		-1, 1, 1, 0, 1, 0,
		1, 1, 1, 0, 1, 0,
		1, 1, -1, 0, 1, 0
	];
	const faces: Array<number> = [
		0, 1, 2,
		0, 2, 3,

		4, 5, 6,
		4, 6, 7,

		8, 9, 10,
		8, 10, 11,

		12, 13, 14,
		12, 14, 15,

		16, 17, 18,
		16, 18, 19,

		20, 21, 22,
		20, 22, 23

	];

	const cubeVertex = <WebGLBuffer>gl.createBuffer();
	const cubeFaces = <WebGLBuffer>gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertex);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeFaces);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);

	// Matrix


	const projection: mat4 = mat4.create();
	const move: mat4 = mat4.create();
	const view: mat4 = mat4.create();
	

	mat4.perspective(projection, 1, innerWidth / innerHeight, 1, 1000);
	mat4.identity(move);
	mat4.identity(view);

	mat4.translate(view, view, vec3.fromValues(0, 0, -6));

	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clearColor(0, 0, 0, 0);
	gl.clearDepth(1);


	function update() {

		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.uniformMatrix4fv(pMatrix, false, projection);
		gl.uniformMatrix4fv(vMatrix, false, move);
		gl.uniformMatrix4fv(pMatrix, false, view);

		gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertex);

		gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 4 * (3 + 3), 0);
		gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 4 * (3 + 3), 3 * 4);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeFaces);
		gl.drawElements(gl.TRIANGLES, 6 * 2 * 3, gl.UNSIGNED_SHORT, 0);
		
		gl.flush();
		window.requestAnimationFrame(update);
	}

	update();
}

window.addEventListener("load", initialize);