"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const gl_matrix_1 = require("gl-matrix");
// Classes
class Camera {
    constructor(position, rotation, fovy, aspect, near, far) {
        if (position !== null) {
            this.position = position;
        }
        else {
            this.position = {
                x: 0,
                y: 0,
                z: 0
            };
        }
        if (rotation !== null) {
            this.rotation = rotation;
        }
        else {
            this.rotation = {
                z: 0,
                y: 0,
                x: 0
            };
        }
        this.fovy = fovy;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
    GetViewMatrix() {
        const viewMatrix = gl_matrix_1.mat4.create();
        const currentPosition = gl_matrix_1.vec3.fromValues(this.position.x, this.position.y, this.position.z);
        gl_matrix_1.mat4.lookAt(viewMatrix, currentPosition, gl_matrix_1.vec3.fromValues(0, 0, 0), gl_matrix_1.vec3.fromValues(0, 1, 0));
        gl_matrix_1.mat4.rotateX(viewMatrix, viewMatrix, this.rotation.x);
        gl_matrix_1.mat4.rotateY(viewMatrix, viewMatrix, this.rotation.y);
        gl_matrix_1.mat4.rotateZ(viewMatrix, viewMatrix, this.rotation.z);
        return viewMatrix;
    }
    GetProjectionMatrix() {
        const matrix = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.perspective(matrix, this.fovy, this.aspect, this.near, this.far);
        return matrix;
    }
    GetCameraProjectionMatrix() {
        const matrix = gl_matrix_1.mat4.create();
        const view = this.GetViewMatrix();
        const projection = this.GetProjectionMatrix();
        gl_matrix_1.mat4.multiply(matrix, projection, view);
        return matrix;
    }
}
exports.Camera = Camera;
