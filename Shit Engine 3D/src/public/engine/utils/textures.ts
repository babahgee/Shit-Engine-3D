export namespace Texture {

	export async function CreateBitmapTexture(gpuDevice: GPUDevice, bitmap: ImageBitmap): Promise<GPUTexture> {

		const textureDescriptor: GPUTextureDescriptor = {
			size: {
				width: bitmap.width,
				height: bitmap.height,
			},
			format: navigator.gpu.getPreferredCanvasFormat(),
			usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST
		}

		const texture: GPUTexture = gpuDevice.createTexture(textureDescriptor);

		gpuDevice.queue.copyExternalImageToTexture({ source: bitmap }, { texture }, textureDescriptor.size);

		return texture;
	}

	export async function CreateHTMLImageTexture(gpuDevice: GPUDevice, imageElement: HTMLImageElement) {

		return new Promise(function (resolve, reject) {

			imageElement.addEventListener("load", async function () {

				const bitmap = await createImageBitmap(this);

				const texture: GPUTexture = await CreateBitmapTexture(gpuDevice, bitmap);

				resolve(texture);

			});
		});
	}

	export async function CreateImageBitmapSync(src: string): Promise<ImageBitmap> {

		const imageElement: HTMLImageElement = new Image();

		imageElement.src = src;

		return new Promise(function (resolve, reject) {

			imageElement.addEventListener("load", async function () {

				const bitmap: ImageBitmap = await createImageBitmap(this);

				resolve(bitmap);
			});

		});

	}

}