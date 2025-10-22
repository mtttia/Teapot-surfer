import {
    BrowserApi,
    ChangeTabProps,
    changeTabRequest,
    CreateTabProps,
    createTabRequest, SetBoundingBoxProps, setBoundingBoxRequest
} from "../../support/ipc/browserTypes";
import {ipcRenderer} from "electron";

export const browserApi: BrowserApi = {
    createTab: (props: CreateTabProps): Promise<number> => {
        return ipcRenderer.invoke(createTabRequest, props);
    },
    changeTab: (props: ChangeTabProps): Promise<number> => {
        return ipcRenderer.invoke(changeTabRequest, props);
    },
    setBoundingBox: (props: SetBoundingBoxProps) => {
        ipcRenderer.send(setBoundingBoxRequest, props)
    }
}