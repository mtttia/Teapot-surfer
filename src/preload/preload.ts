import {contextBridge} from 'electron'
import {browserApi} from "./apis/browserApi";

contextBridge.exposeInMainWorld('browser', browserApi)