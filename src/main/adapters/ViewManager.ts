import {Tab} from "../domain/entities/Tab";
import {TabView} from "./ViewFactory";
import {TabId} from "../../support/entities/ITab";
import {injectable} from "inversify";

export interface ViewContext{
    tab: Tab,
    view: TabView,
}

@injectable()
export class ViewManager {
    private views: Record<TabId, ViewContext> = {};
    private activeView: TabId

    addView(tab: Tab, view:TabView){
        this.views[tab.id] = {
            tab, view
        }
    }

    getView(tabId: TabId){
        return this.views[tabId];
    }

    listViews():ViewContext[]{
        return Object.values(this.views);
    }

    setActiveView(tabId:TabId){
        this.activeView = tabId;
    }

    getActiveView():ViewContext|null {
        if(this.activeView in this.views)
            return this.views[this.activeView];
        return null
    }

}