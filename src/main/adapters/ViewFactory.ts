import {WebContentsView} from "electron";
import {injectable} from "inversify";

export enum TabViewType {
    web
}

export interface TabView {
    type:TabViewType
}

export interface WebTabView extends TabView{
    webContentsView:WebContentsView
}

@injectable()
export class ViewFactory{

    createWebTab(url?:string):WebTabView{
        const view = new WebContentsView()
        if(url) view.webContents.loadURL(url)
        return {
            type:TabViewType.web,
            webContentsView:view
        }
    }
}