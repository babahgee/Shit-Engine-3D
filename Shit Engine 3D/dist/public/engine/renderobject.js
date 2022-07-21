"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderObject = void 0;
const gl_matrix_1 = require("gl-matrix");
const utils_1 = require("./utils/utils");
// Classes and functions. 
class RenderObject {
    constructor() {
        this.id = (0, utils_1.GenerateUniqueID)(18).id;
        this.timestamp = Date.now();
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.matrixSize = 4 * 16;
        this.offset = 256;
        this.uniformBufferSize = this.matrixSize + this.offset;
        this.modelViewProjectionMatrix = gl_matrix_1.mat4.create();
    }
    draw(passEncoder, device, camera) {
    }
}
exports.RenderObject = RenderObject;
