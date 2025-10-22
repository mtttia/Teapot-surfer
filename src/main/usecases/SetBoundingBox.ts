import BoundingBoxManager from "../adapters/BoundingBoxManager";
import {Bounds} from "../../support/entities/Bounds";
import {inject, injectable} from "inversify";
import {ViewManager} from "../adapters/ViewManager";
import {TabViewType, WebTabView} from "../adapters/ViewFactory";

@injectable()
export class SetBoundingBox{
    constructor(
        @inject(BoundingBoxManager)
        public boundingBoxManager:BoundingBoxManager,
        @inject(ViewManager)
        public viewManager:ViewManager
    ) {
    }

    execute(bbox:Bounds){
        this.boundingBoxManager.setBoundingBox(bbox)
        const activeView = this.viewManager.getActiveView()
        if(activeView && activeView.view.type == TabViewType.web){
            const webTabView = activeView.view as WebTabView;
            webTabView.webContentsView.setBounds(bbox)
        }
    }
}