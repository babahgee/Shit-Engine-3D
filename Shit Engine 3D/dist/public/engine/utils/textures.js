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
exports.Texture = void 0;
var Texture;
(function (Texture) {
    function CreateBitmapTexture(gpuDevice, bitmap) {
        return __awaiter(this, void 0, void 0, function* () {
            const textureDescriptor = {
                size: {
                    width: bitmap.width,
                    height: bitmap.height,
                },
                format: navigator.gpu.getPreferredCanvasFormat(),
                usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST
            };
            const texture = gpuDevice.createTexture(textureDescriptor);
            gpuDevice.queue.copyExternalImageToTexture({ source: bitmap }, { texture }, textureDescriptor.size);
            return texture;
        });
    }
    Texture.CreateBitmapTexture = CreateBitmapTexture;
    function CreateHTMLImageTexture(gpuDevice, imageElement) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                imageElement.addEventListener("load", function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const bitmap = yield createImageBitmap(this);
                        const texture = yield CreateBitmapTexture(gpuDevice, bitmap);
                        resolve(texture);
                    });
                });
            });
        });
    }
    Texture.CreateHTMLImageTexture = CreateHTMLImageTexture;
    function CreateImageBitmapSync(src) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageElement = new Image();
            imageElement.src = src;
            return new Promise(function (resolve, reject) {
                imageElement.addEventListener("load", function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const bitmap = yield createImageBitmap(this);
                        resolve(bitmap);
                    });
                });
            });
        });
    }
    Texture.CreateImageBitmapSync = CreateImageBitmapSync;
})(Texture = exports.Texture || (exports.Texture = {}));
