"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const electron_1 = require("electron");
electron_1.app.commandLine.appendSwitch('enable-unsafe-webgpu');
electron_1.app.once("ready", function () {
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
    window.loadURL(url_1.default.format({
        pathname: path_1.default.join(__dirname, "../", "views", "index.html"),
        slashes: true,
        protocol: "file:"
    }));
});
