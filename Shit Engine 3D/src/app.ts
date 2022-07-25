import fs from "fs";
import path from "path";
import url from "url";
import os from "os";

import { app, BrowserWindow } from "electron";

app.commandLine.appendSwitch('enable-unsafe-webgpu');

app.once("ready", async function () {

	const window: BrowserWindow = new BrowserWindow({
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

    window.loadURL(url.format({
        pathname: path.join(__dirname, "../", "views", "index.html"),
        slashes: true,
        protocol: "file:"
    }));

});