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
const shaderLoader_1 = require("./engine_gl/utils/shaderLoader");
const canvas = document.querySelector("canvas.renderer");
const gl = canvas.getContext("webgl", { antialias: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function compileShader(src, type, typeString) {
    var _a;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error((_a = gl.getShaderInfoLog(shader)) === null || _a === void 0 ? void 0 : _a.toString());
    return shader;
}
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        const vertexShaderSource = yield (0, shaderLoader_1.LoadShader)("shaders/shader.vert.glsl");
        const fragmentShaderSource = yield (0, shaderLoader_1.LoadShader)("shaders/shader.frag.glsl");
        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER, "VERTEX");
        const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "FRAGMENT");
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const pMatrix = gl.getUniformLocation(program, "p_matrix");
        const vMatrix = gl.getUniformLocation(program, "v_matrix");
        const mMatrix = gl.getUniformLocation(program, "m_matrix");
        const color = gl.getAttribLocation(program, "color");
        const position = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(color);
        gl.enableVertexAttribArray(position);
        gl.useProgram(program);
        // Cube
        const vertices = [
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
        const faces = [
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
        const cubeVertex = gl.createBuffer();
        const cubeFaces = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertex);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeFaces);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);
        // Matrix
        const projection = gl_matrix_1.mat4.create();
        const move = gl_matrix_1.mat4.create();
        const view = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.perspective(projection, 1, innerWidth / innerHeight, 1, 1000);
        gl_matrix_1.mat4.identity(move);
        gl_matrix_1.mat4.identity(view);
        gl_matrix_1.mat4.translate(view, view, gl_matrix_1.vec3.fromValues(0, 0, -6));
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
    });
}
window.addEventListener("load", initialize);
