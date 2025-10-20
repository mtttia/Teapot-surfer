import {contextBridge, ipcRenderer} from 'electron'
import {CreateTabProps, ShowTabProps, UpdateBoundingBoxProps} from "../support/types/browserTypes";

contextBridge.exposeInMainWorld('browser', {
    createTab: (props: CreateTabProps): Promise<number> => {
        return ipcRenderer.invoke('browser.create-tab', props);
    },
    showTab: (props: ShowTabProps): Promise<number> => {
        return ipcRenderer.invoke('browser.show-tab', props);
    },
    setBoundingBox: (props: UpdateBoundingBoxProps) => {
        ipcRenderer.send('browser.set-bounding-box', props)
    }
})