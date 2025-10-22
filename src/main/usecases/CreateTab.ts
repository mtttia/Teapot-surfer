import {TabFactory} from "../domain/factories/TabFactory";
import {ViewFactory} from "../adapters/ViewFactory";
import {ViewManager} from "../adapters/ViewManager";
import {inject, injectable} from "inversify";

@injectable()
export class CreateTab {
    constructor(
        @inject(TabFactory)
        private tabFactory: TabFactory,
        @inject(ViewFactory)
        private viewFactory: ViewFactory,
        @inject(ViewManager)
        private viewManager: ViewManager
    ) {
    }

    execute(url:string) {
        const webTab = this.tabFactory.createWebTab(url)
        const webView = this.viewFactory.createWebTab(url)
        this.viewManager.addView(webTab, webView)
        return webTab.id
    }
}