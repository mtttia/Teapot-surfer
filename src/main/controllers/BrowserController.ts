import {CreateTab} from "../usecases/CreateTab";
import {ChangeTab} from "../usecases/ChangeTab";
import {SetBoundingBox} from "../usecases/SetBoundingBox";
import {
    ChangeTabProps,
    ChangeTabResponse,
    CreateTabProps,
    CreateTabResponse,
    SetBoundingBoxProps
} from "../../support/ipc/browserTypes";
import {BrowserWindow, IpcMainEvent} from "electron";
import {injectable, inject} from "inversify";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

@injectable()
export class BrowserController {
    constructor(
        @inject(CreateTab)
        private createTab: CreateTab,
        @inject(ChangeTab)
        private changeTab: ChangeTab,
        @inject(SetBoundingBox)
        private setBoundingBox: SetBoundingBox
    ) {
    }

    onCreateTab(_:IpcMainInvokeEvent, props:CreateTabProps):CreateTabResponse{
        const tabId = this.createTab.execute(props.url)
        return {
            id:tabId,
        }
    }

    onChangeTab(event:IpcMainInvokeEvent, props:ChangeTabProps):ChangeTabResponse{
        const senderWebContents = event.sender;
        const senderWindow = BrowserWindow.fromWebContents(senderWebContents);
        const tab = this.changeTab.execute(senderWindow.contentView, props.id)
        return {
            tab
        }
    }

    onSetBoundingBox(_:IpcMainEvent, props:SetBoundingBoxProps):void{
        this.setBoundingBox.execute(props.bbox)
    }
}