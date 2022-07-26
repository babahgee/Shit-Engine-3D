"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = exports.lightDataSize = void 0;
const gl_matrix_1 = require("gl-matrix");
exports.lightDataSize = 3 * 4;
class Scene {
    constructor() {
        this.pointLightPosition = gl_matrix_1.vec3.fromValues(0, 0, 0);
        this.objects = [];
    }
    AddObject(object) {
        return this.objects.push(object);
    }
    GetObjects() {
        return this.objects;
    }
}
exports.Scene = Scene;
