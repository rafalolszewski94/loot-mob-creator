// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  fetchHTML: (mobName) => ipcRenderer.invoke("fetch-html", mobName),
  closeApp: () => ipcRenderer.invoke("CLOSE-APP"),
  minimizeApp: () => ipcRenderer.invoke("MINIMIZE-APP"),
  maximizeApp: () => ipcRenderer.invoke("MAXIMIZE-APP"),
});
