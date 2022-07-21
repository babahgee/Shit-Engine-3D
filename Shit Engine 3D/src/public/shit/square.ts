const vertexData = new Float32Array([
	-0.5, -0.5,  // vertex a
	0.5, -0.5,  // vertex b
	-0.5, 0.5,  // vertex d
	-0.5, 0.5,  // vertex d
	0.5, -0.5,  // vertex b
	0.5, 0.5,  // vertex c
]);

const usage: GPUBufferUsageFlags = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;

const descriptor: GPUBufferDescriptor = {
	size: vertexData.byteLength,
	usage: usage,
	mappedAtCreation: true
}

export namespace Square {

	export class Mesh {

		declare public buffer: GPUBuffer;
		declare public bufferLayout: GPUVertexBufferLayout;

		constructor(device: GPUDevice) {

			this.buffer = device.createBuffer(descriptor);

			new Float32Array(this.buffer.getMappedRange()).set(vertexData);

			this.buffer.unmap();

		}
	}

}