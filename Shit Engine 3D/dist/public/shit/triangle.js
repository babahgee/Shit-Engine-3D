"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
var Triangle;
(function (Triangle) {
    class Mesh {
        constructor(device) {
            const vertices = new Float32Array([
                0, 0, 0.5, 1, 0, 1,
                0, -0.5, -0.5, 1, 0, .3,
                0, 0.5, -0.5, 1, 0, 1
            ]);
            const usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;
            const descriptor = {
                size: vertices.byteLength,
                usage: usage,
                mappedAtCreation: true
            };
            this.buffer = device.createBuffer(descriptor);
            new Float32Array(this.buffer.getMappedRange()).set(vertices);
            this.buffer.unmap();
            this.bufferLayout = {
                arrayStride: 24,
                attributes: [
                    {
                        shaderLocation: 0,
                        format: "float32x3",
                        offset: 0
                    },
                    {
                        shaderLocation: 1,
                        format: "float32x3",
                        offset: 12
                    }
                ]
            };
        }
    }
    Triangle.Mesh = Mesh;
})(Triangle = exports.Triangle || (exports.Triangle = {}));
