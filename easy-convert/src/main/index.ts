// listen for file data from ui
// aks user where to save the converted files
// run lame to convert
// send progress updates to ui

import { BrowserWindow } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  mainWindow.loadURL("http://localhost:5173");
};
