"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
const vertexData = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    -0.5, 0.5,
    -0.5, 0.5,
    0.5, -0.5,
    0.5, 0.5, // vertex c
]);
const usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;
const descriptor = {
    size: vertexData.byteLength,
    usage: usage,
    mappedAtCreation: true
};
var Square;
(function (Square) {
    class Mesh {
        constructor(device) {
            this.buffer = device.createBuffer(descriptor);
            new Float32Array(this.buffer.getMappedRange()).set(vertexData);
            this.buffer.unmap();
        }
    }
    Square.Mesh = Mesh;
})(Square = exports.Square || (exports.Square = {}));
