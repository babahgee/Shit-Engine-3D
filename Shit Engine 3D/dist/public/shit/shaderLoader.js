"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function loadShader(src) {
    if (!fs_1.default.existsSync(src))
        throw new Error(`The given file does not exist. Given path: ${src}`);
    const file = fs_1.default.readFileSync(src, { encoding: "utf-8" });
    return file;
}
exports.default = { loadShader };
