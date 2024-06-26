import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "path";
import axios from "axios";
import { updateElectronApp } from "update-electron-app";
import Store from "./store";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

updateElectronApp();

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1040,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
  });

  mainWindow.removeMenu();

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url); // Open URL in user's browser.
    return { action: "deny" }; // Prevent the app from opening the URL.
  });

  ipcMain.handle("CLOSE-APP", (event) => {
    mainWindow.close();
  });
  ipcMain.handle("MINIMIZE-APP", (event) => {
    mainWindow.minimize();
  });
  ipcMain.handle("MAXIMIZE-APP", (event) => {
    mainWindow.maximize();
  });

  // Open the DevTools.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("fetch-html", async (event, mobName) => {
  try {
    const response = await axios.get(
      `https://tibia.fandom.com/wiki/Loot_Statistics:${mobName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching the HTML:", error);
    throw error;
  }
});

const store = new Store();

ipcMain.handle("getStore", async (event, storeKey) => {
  try {
    return await store.get(storeKey);
  } catch (error) {
    console.error("Error getting store:", error);
    throw error;
  }
});

ipcMain.handle("setStore", async (event, storeKey, storeValue) => {
  try {
    await store.set(storeKey, storeValue);
  } catch (error) {
    console.error("Error setting store:", error);
    throw error;
  }
});
