"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cube = void 0;
const gl_matrix_1 = require("gl-matrix");
const __1 = require("..");
const renderobject_1 = require("../renderobject");
const shaderLoader_1 = require("../utils/shaderLoader");
const cubeVertexCount = 36;
// prettier-ignore
const cubeVertices = new Float32Array([
    // float4 position, float4 color, float2 uv,
    1, -1, 1, 1, 1, 0, 0, 1, 1, 1,
    -1, -1, 1, 1, 1, 0, 0, 1, 0, 1,
    -1, -1, -1, 1, 1, 0, 0, 1, 0, 0,
    1, -1, -1, 1, 1, 0, 0, 1, 1, 0,
    1, -1, 1, 1, 1, 0, 0, 1, 1, 1,
    -1, -1, -1, 1, 1, 0, 0, 1, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, -1, 1, 1, 1, 0, 1, 1, 0, 1,
    1, -1, -1, 1, 1, 0, 0, 1, 0, 0,
    1, 1, -1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, -1, -1, 1, 1, 0, 0, 1, 0, 0,
    -1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 1, -1, 1, 1, 1, 0, 1, 0, 0,
    -1, 1, -1, 1, 0, 1, 0, 1, 1, 0,
    -1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, -1, 1, 1, 1, 0, 1, 0, 0,
    -1, -1, 1, 1, 0, 0, 1, 1, 1, 1,
    -1, 1, 1, 1, 0, 1, 1, 1, 0, 1,
    -1, 1, -1, 1, 0, 1, 0, 1, 0, 0,
    -1, -1, -1, 1, 0, 0, 0, 1, 1, 0,
    -1, -1, 1, 1, 0, 0, 1, 1, 1, 1,
    -1, 1, -1, 1, 0, 1, 0, 1, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, 1, 1, 1, 0, 1, 1, 1, 0, 1,
    -1, -1, 1, 1, 0, 0, 1, 1, 0, 0,
    -1, -1, 1, 1, 0, 0, 1, 1, 0, 0,
    1, -1, 1, 1, 1, 0, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, -1, -1, 1, 1, 0, 0, 1, 1, 1,
    -1, -1, -1, 1, 0, 0, 0, 1, 0, 1,
    -1, 1, -1, 1, 0, 1, 0, 1, 0, 0,
    1, 1, -1, 1, 1, 1, 0, 1, 1, 0,
    1, -1, -1, 1, 1, 0, 0, 1, 1, 1,
    -1, 1, -1, 1, 0, 1, 0, 1, 0, 0,
]);
const vertexShader = (0, shaderLoader_1.LoadShader)("src/public/engine/shaders/cube.vertex.wgsl");
const fragmentShader = (0, shaderLoader_1.LoadShader)("src/public/engine/shaders/cube.fragment.wgsl");
const positionOffset = 0;
const colorOffset = 4 * 4; // Byte offset of object color attribute.
const vertexSize = 4 * 10; // Byte size of one object.
class Cube extends renderobject_1.RenderObject {
    constructor(position, rotation) {
        super();
        if (position !== null)
            this.position = position;
        if (rotation !== null)
            this.rotation = rotation;
        this.vertexCount = cubeVertexCount;
        this.renderPipeline = __1.device.createRenderPipeline({
            vertex: {
                module: __1.device.createShaderModule({
                    code: vertexShader
                }),
                entryPoint: "main",
                buffers: [
                    {
                        arrayStride: vertexSize,
                        attributes: [
                            {
                                // position
                                shaderLocation: 0,
                                offset: positionOffset,
                                format: 'float32x4',
                            },
                            {
                                // color
                                shaderLocation: 1,
                                offset: colorOffset,
                                format: 'float32x4',
                            },
                        ],
                    }
                ]
            },
            fragment: {
                module: __1.device.createShaderModule({
                    code: fragmentShader,
                }),
                entryPoint: 'main',
                targets: [
                    {
                        format: navigator.gpu.getPreferredCanvasFormat(),
                    },
                ],
            },
            layout: "auto",
            primitive: {
                topology: 'triangle-list',
                cullMode: 'back',
            },
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus-stencil8',
            },
        });
        this.uniformBuffer = __1.device.createBuffer({
            size: this.uniformBufferSize,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        this.uniformBindGroup = __1.device.createBindGroup({
            layout: this.renderPipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.uniformBuffer,
                        offset: 0,
                        size: this.matrixSize,
                    },
                },
            ],
        });
        this.verticesBuffer = __1.device.createBuffer({
            size: cubeVertices.byteLength,
            usage: GPUBufferUsage.VERTEX,
            mappedAtCreation: true,
        });
        new Float32Array(this.verticesBuffer.getMappedRange()).set(cubeVertices);
        this.verticesBuffer.unmap();
    }
    draw(passEncoder, device, camera) {
        this.updateMatrix(camera.GetCameraProjectionMatrix());
        passEncoder.setPipeline(this.renderPipeline);
        device.queue.writeBuffer(this.uniformBuffer, 0, this.modelViewProjectionMatrix.buffer, this.modelViewProjectionMatrix.byteOffset, this.modelViewProjectionMatrix.byteLength);
        passEncoder.setVertexBuffer(0, this.verticesBuffer);
        passEncoder.setBindGroup(0, this.uniformBindGroup);
        passEncoder.draw(this.vertexCount, 1, 0, 0);
    }
    updateMatrix(cameraProjectionMatrix) {
        const matrix = gl_matrix_1.mat4.create();
        const x = this.position.x, y = this.position.y, z = this.position.z;
        gl_matrix_1.mat4.translate(matrix, matrix, gl_matrix_1.vec3.fromValues(x, y, z));
        gl_matrix_1.mat4.rotateX(matrix, matrix, this.rotation.x);
        gl_matrix_1.mat4.rotateY(matrix, matrix, this.rotation.y);
        gl_matrix_1.mat4.rotateZ(matrix, matrix, this.rotation.z);
        gl_matrix_1.mat4.multiply(this.modelViewProjectionMatrix, cameraProjectionMatrix, matrix);
    }
}
exports.Cube = Cube;
