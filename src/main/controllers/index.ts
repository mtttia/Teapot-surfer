import {ipcMain} from "electron";
import {changeTabRequest, createTabRequest, setBoundingBoxRequest} from "../../support/ipc/browserTypes";
import {BrowserController} from "./BrowserController";
import {injectable, inject} from "inversify";

@injectable()
export class IpcRegister{
    constructor(
        @inject(BrowserController)
        private browserController: BrowserController
    ) {
    }

    register(){
        ipcMain.handle(createTabRequest, (e, p) => this.browserController.onCreateTab(e, p))
        ipcMain.handle(changeTabRequest, (e, p) => this.browserController.onChangeTab(e, p))
        ipcMain.on(setBoundingBoxRequest, (e, p) => this.browserController.onSetBoundingBox(e, p))
    }
}