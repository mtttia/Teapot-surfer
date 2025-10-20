import {WebContentsView, Rectangle, View} from 'electron'


export class BrowserManager {
    public views: WebContentsView[] = []
    public boundingBox: Rectangle|null = null
    public activeWebView: WebContentsView|null = null;

    setBBox(boundingBox: Rectangle|null): void {
        this.boundingBox = boundingBox
        if(this.activeWebView !== null) {
            this.activeWebView.setBounds(boundingBox)
        }
    }

    addTab(url:string): number{
        const browserView = new WebContentsView()
        browserView.webContents.loadURL(url)
        this.views.push(browserView)
        return this.views.length - 1
    }

    showTab(tabId:number, view: View){
        this.views.forEach(browserView=>view.removeChildView(browserView))
        if(tabId >= 0 && tabId < this.views.length && this.boundingBox !== null){
            view.addChildView(this.views[tabId])
            this.views[tabId].setBounds(this.boundingBox)
            this.activeWebView = this.views[tabId]
        }
    }
}