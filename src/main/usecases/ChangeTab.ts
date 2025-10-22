import {ViewManager} from "../adapters/ViewManager";
import {TabId} from "../../support/entities/ITab";
import {View} from "electron";
import {TabViewType, WebTabView} from "../adapters/ViewFactory";
import BoundingBoxManager from "../adapters/BoundingBoxManager";
import {injectable, inject} from "inversify";
import {LoggerAdapter} from "../adapters/LoggerAdapter";

@injectable()
export class ChangeTab {
    constructor(
        @inject(ViewManager)
        private viewManager: ViewManager,
        @inject(BoundingBoxManager)
        private boundingBoxManager: BoundingBoxManager,
        @inject(LoggerAdapter)
        private logger:LoggerAdapter
    ) {
    }

    execute(currentView: View, tabId: TabId) {
        console.log("show:", tabId)
        this.viewManager.listViews()
            .filter(view => view.view.type == TabViewType.web)
            .forEach((view) => currentView.removeChildView((view.view as WebTabView).webContentsView))
        const viewContext = this.viewManager.getView(tabId)
        if(!viewContext){
            return null
        }
        const bounds = this.boundingBoxManager.getBoundingBox()
        if(viewContext.view.type == TabViewType.web && bounds){
            // add it to current view
            const webTabView = viewContext.view as WebTabView
            currentView.addChildView(webTabView.webContentsView);
            webTabView.webContentsView.setBounds(bounds)
        }
        this.viewManager.setActiveView(tabId)
        return viewContext.tab
    }
}