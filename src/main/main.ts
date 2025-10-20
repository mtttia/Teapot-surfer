import {app, BrowserWindow, ipcMain, IpcMainEvent} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import {BrowserManager} from "./browser/BrowserManager";
import {CreateTabProps, ShowTabProps, UpdateBoundingBoxProps} from "../support/types/browserTypes";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const browserManager = new BrowserManager();


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'index.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

const handleBrowserCreateTab = (event: IpcMainEvent, createTabProps:CreateTabProps) => {
    console.log("new tab")
    return browserManager.addTab(createTabProps.url)
}

const handleBrowserShowTab = (event: IpcMainEvent, showTabProps:ShowTabProps) => {
    console.log("show tab", showTabProps.id)
    const senderWebContents = event.sender;
    const senderWindow = BrowserWindow.fromWebContents(senderWebContents);
    browserManager.showTab(showTabProps.id, senderWindow.contentView)
    return showTabProps.id
}

const handleBrowserSetBoundingBox = (event: IpcMainEvent, updateBoundingBoxProps:UpdateBoundingBoxProps) => {
    console.log("bbox arrived", updateBoundingBoxProps.bbox)
    browserManager.setBBox(updateBoundingBoxProps.bbox)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

    ipcMain.handle('browser.create-tab', handleBrowserCreateTab)
    ipcMain.handle('browser.show-tab', handleBrowserShowTab)
    ipcMain.on('browser.set-bounding-box', handleBrowserSetBoundingBox)

    createWindow()

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
