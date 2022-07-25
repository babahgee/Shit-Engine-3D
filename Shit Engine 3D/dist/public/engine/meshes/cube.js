"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cube = void 0;
const gl_matrix_1 = require("gl-matrix");
const __1 = require("..");
const renderobject_1 = require("../renderobject");
const scene_1 = require("../scene");
const shaderLoader_1 = require("../utils/shaderLoader");
const cubeVertexCount = 36;
function createVertices(r, g, b, a) {
    const vertices = new Float32Array([
        // float4 position, float4 color, float2 uv,
        1, -1, 1, 1, r, g, b, a, 1, 1,
        -1, -1, 1, 1, r, g, b, a, 0, 1,
        -1, -1, -1, 1, r, g, b, a, 0, 0,
        1, -1, -1, 1, r, g, b, a, 1, 0,
        1, -1, 1, 1, r, g, b, a, 1, 1,
        -1, -1, -1, 1, r, g, b, a, 0, 0,
        1, 1, 1, 1, r, g, b, a, 1, 1,
        1, -1, 1, 1, r, g, b, a, 0, 1,
        1, -1, -1, 1, r, g, b, a, 0, 0,
        1, 1, -1, 1, r, g, b, a, 1, 0,
        1, 1, 1, 1, r, g, b, a, 1, 1,
        1, -1, -1, 1, r, g, b, a, 0, 0,
        -1, 1, 1, 1, r, g, b, a, 1, 1,
        1, 1, 1, 1, r, g, b, a, 0, 1,
        1, 1, -1, 1, r, g, b, a, 0, 0,
        -1, 1, -1, 1, r, g, b, a, 1, 0,
        -1, 1, 1, 1, r, g, b, a, 1, 1,
        1, 1, -1, 1, r, g, b, a, 0, 0,
        -1, -1, 1, 1, r, g, b, a, 1, 1,
        -1, 1, 1, 1, r, g, b, a, 0, 1,
        -1, 1, -1, 1, r, g, b, a, 0, 0,
        -1, -1, -1, 1, r, g, b, a, 1, 0,
        -1, -1, 1, 1, r, g, b, a, 1, 1,
        -1, 1, -1, 1, r, g, b, a, 0, 0,
        1, 1, 1, 1, r, g, b, a, 1, 1,
        -1, 1, 1, 1, r, g, b, a, 0, 1,
        -1, -1, 1, 1, r, g, b, a, 0, 0,
        -1, -1, 1, 1, r, g, b, a, 0, 0,
        1, -1, 1, 1, r, g, b, a, 1, 0,
        1, 1, 1, 1, r, g, b, a, 1, 1,
        1, -1, -1, 1, r, g, b, a, 1, 1,
        -1, -1, -1, 1, r, g, b, a, 0, 1,
        -1, 1, -1, 1, r, g, b, a, 0, 0,
        1, 1, -1, 1, r, g, b, a, 1, 0,
        1, -1, -1, 1, r, g, b, a, 1, 1,
        -1, 1, -1, 1, r, g, b, a, 0, 0,
    ]);
    return vertices;
}
function createTexturedVertices() {
    const vertices = [
        { pos: [-1, -1, 1], norm: [0, 0, 1], uv: [0, 0], },
        { pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0], },
        { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1], },
        { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1], },
        { pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0], },
        { pos: [1, 1, 1], norm: [0, 0, 1], uv: [1, 1], },
        // right
        { pos: [1, -1, 1], norm: [1, 0, 0], uv: [0, 0], },
        { pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0], },
        { pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1], },
        { pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1], },
        { pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0], },
        { pos: [1, 1, -1], norm: [1, 0, 0], uv: [1, 1], },
        // back
        { pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 0], },
        { pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0], },
        { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1], },
        { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1], },
        { pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0], },
        { pos: [-1, 1, -1], norm: [0, 0, -1], uv: [1, 1], },
        // left
        { pos: [-1, -1, -1], norm: [-1, 0, 0], uv: [0, 0], },
        { pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0], },
        { pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1], },
        { pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1], },
        { pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0], },
        { pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [1, 1], },
        // top
        { pos: [1, 1, -1], norm: [0, 1, 0], uv: [0, 0], },
        { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0], },
        { pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1], },
        { pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1], },
        { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0], },
        { pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 1], },
        // bottom
        { pos: [1, -1, 1], norm: [0, -1, 0], uv: [0, 0], },
        { pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0], },
        { pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1], },
        { pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1], },
        { pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0], },
        { pos: [-1, -1, -1], norm: [0, -1, 0], uv: [1, 1], },
    ];
    return vertices;
}
const vertexShader = (0, shaderLoader_1.LoadShader)("src/public/engine/shaders/cube.vertex.wgsl");
const fragmentShader = (0, shaderLoader_1.LoadShader)("src/public/engine/shaders/cube.fragment.wgsl");
const positionOffset = 0;
const colorOffset = 4 * 4; // Byte offset of object color attribute.
const vertexSize = 4 * 10; // Byte size of one object.
function createRenderPipelineDescriptor(stride) {
    const descriptor = {
        vertex: {
            module: __1.device.createShaderModule({ code: vertexShader }),
            entryPoint: "main",
            buffers: [
                {
                    arrayStride: stride,
                    attributes: [
                        {
                            // Position attribute
                            shaderLocation: 0,
                            offset: 0,
                            format: "float32x3"
                        },
                        {
                            // Norm attribute
                            shaderLocation: 1,
                            offset: 3 * 4,
                            format: "float32x3"
                        },
                        {
                            // UV attribute
                            shaderLocation: 2,
                            offset: (3 + 3) * 4,
                            format: "float32x2"
                        }
                    ]
                }
            ]
        },
        fragment: {
            module: __1.device.createShaderModule({ code: fragmentShader }),
            entryPoint: "main",
            targets: [
                {
                    format: navigator.gpu.getPreferredCanvasFormat()
                }
            ]
        },
        primitive: {
            topology: "triangle-list",
            cullMode: "back"
        },
        depthStencil: {
            depthWriteEnabled: true,
            depthCompare: 'less',
            format: 'depth24plus-stencil8',
        },
        layout: "auto"
    };
    return descriptor;
}
class Cube extends renderobject_1.RenderObject {
    constructor(color, imageBitmap) {
        super();
        this.perVertex = (3 + 3 + 2);
        this.stride = this.perVertex * 4;
        this.color = color;
        this.imageBitmap = imageBitmap;
        this.vertices = createTexturedVertices();
        const renderPipelineDescriptor = createRenderPipelineDescriptor(this.stride);
        this.renderPipeline = __1.device.createRenderPipeline(renderPipelineDescriptor);
        this.verticesBuffer = __1.device.createBuffer({
            size: this.vertices.length * this.stride,
            usage: GPUBufferUsage.VERTEX,
            mappedAtCreation: true
        });
        const mapping = new Float32Array(this.verticesBuffer.getMappedRange());
        for (let i = 0; i < this.vertices.length; i++) {
            //@ts-expect-error
            mapping.set([this.vertices[i].pos[0] * this.scale.x, this.vertices[i].pos[1] * this.scale.y, this.vertices[i].pos[2] * this.scale.z], this.perVertex * i + 0);
            //@ts-expect-error
            mapping.set(this.vertices[i].norm, this.perVertex * i + 3);
            //@ts-expect-error
            mapping.set(this.vertices[i].uv, this.perVertex * i + 6);
        }
        this.verticesBuffer.unmap();
        this.transformationBuffer = __1.device.createBuffer({
            size: this.uniformBufferSize,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        this.colorBuffer = __1.device.createBuffer({
            mappedAtCreation: true,
            size: Float32Array.BYTES_PER_ELEMENT * 3,
            usage: GPUBufferUsage.STORAGE
        });
        const colorMapping = new Float32Array(this.colorBuffer.getMappedRange());
        colorMapping.set([this.color.r, this.color.g, this.color.b]);
        this.colorBuffer.unmap();
        const entries = [
            {
                binding: 0,
                resource: {
                    buffer: this.transformationBuffer,
                    offset: 0,
                    size: this.matrixSize * 2
                }
            },
            {
                binding: 1,
                resource: {
                    buffer: this.colorBuffer,
                    offset: 0,
                    size: Float32Array.BYTES_PER_ELEMENT * 3
                }
            },
            {
                binding: 2,
                resource: {
                    buffer: __1.cameraUniformBuffer,
                    offset: 0,
                    size: this.matrixSize
                },
            },
            {
                binding: 3,
                resource: {
                    buffer: __1.lightDataBuffer,
                    offset: 0,
                    size: scene_1.lightDataSize
                }
            }
        ];
        const cubeTexture = __1.device.createTexture({
            size: [imageBitmap.width, imageBitmap.height, 1],
            format: navigator.gpu.getPreferredCanvasFormat(),
            usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
        });
        __1.device.queue.copyExternalImageToTexture({ source: imageBitmap }, { texture: cubeTexture }, [imageBitmap.width, imageBitmap.height, 1]);
        const sampler = __1.device.createSampler({
            minFilter: "linear",
            magFilter: "linear"
        });
        entries.push({
            binding: 4,
            resource: sampler
        });
        entries.push({
            binding: 5,
            resource: cubeTexture.createView()
        });
        this.transformationBindGroup = __1.device.createBindGroup({
            layout: this.renderPipeline.getBindGroupLayout(0),
            entries: entries
        });
    }
    draw(encoder, device) {
        this.updateTransformationMatrix();
        encoder.setPipeline(this.renderPipeline);
        device.queue.writeBuffer(this.transformationBuffer, 0, this.transformMatrix.buffer, this.transformMatrix.byteOffset, this.transformMatrix.byteLength);
        device.queue.writeBuffer(this.transformationBuffer, 64, this.rotateMatrix.buffer, this.rotateMatrix.byteOffset, this.rotateMatrix.byteLength);
        encoder.setVertexBuffer(0, this.verticesBuffer);
        encoder.setBindGroup(0, this.transformationBindGroup);
        encoder.draw(this.vertices.length, 1, 0, 0);
    }
    // Private methods
    updateTransformationMatrix() {
        const transform = gl_matrix_1.mat4.create();
        const rotation = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.translate(transform, transform, gl_matrix_1.vec3.fromValues(this.position.x, this.position.y, this.position.z));
        gl_matrix_1.mat4.rotateX(transform, transform, this.rotation.x);
        gl_matrix_1.mat4.rotateY(transform, transform, this.rotation.y);
        gl_matrix_1.mat4.rotateZ(transform, transform, this.rotation.z);
        gl_matrix_1.mat4.rotateX(rotation, rotation, this.rotation.x);
        gl_matrix_1.mat4.rotateY(rotation, rotation, this.rotation.y);
        gl_matrix_1.mat4.rotateZ(rotation, rotation, this.rotation.z);
        gl_matrix_1.mat4.copy(this.transformMatrix, transform);
        gl_matrix_1.mat4.copy(this.rotateMatrix, rotation);
    }
}
exports.Cube = Cube;
