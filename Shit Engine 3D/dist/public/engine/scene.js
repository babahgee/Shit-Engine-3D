"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
class Scene {
    constructor() {
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
