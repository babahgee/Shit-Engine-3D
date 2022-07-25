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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const electron_1 = require("electron");
electron_1.app.commandLine.appendSwitch('enable-unsafe-webgpu');
electron_1.app.once("ready", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const window = new electron_1.BrowserWindow({
            width: 700,
            height: 840,
            minWidth: 700,
            minHeight: 840,
            backgroundColor: "#1d1d1d",
            title: "ShitEngine3D",
            autoHideMenuBar: true,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
                nodeIntegrationInSubFrames: true,
                nodeIntegrationInWorker: true,
            },
            show: false
        });
        window.on("show", function () {
            window.maximize();
            window.webContents.openDevTools();
        });
        window.show();
        // await window.loadURL("https://webkit.org/demos/webgpu/textured-cube.html");
        window.loadURL(url_1.default.format({
            pathname: path_1.default.join(__dirname, "../", "views", "index.html"),
            slashes: true,
            protocol: "file:"
        }));
    });
});
