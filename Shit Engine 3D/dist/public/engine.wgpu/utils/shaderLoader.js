"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadShader = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function LoadShader(_path) {
    const rootPath = path_1.default.join(__dirname, "../../../../", _path);
    if (!fs_1.default.existsSync(rootPath))
        throw new Error(`Failed to load shader '${_path}' since it does not exist.`);
    if (fs_1.default.lstatSync(rootPath).isDirectory())
        throw new Error(`The given path has been detected as a directory.`);
    return fs_1.default.readFileSync(rootPath, { encoding: "utf-8" });
}
exports.LoadShader = LoadShader;
