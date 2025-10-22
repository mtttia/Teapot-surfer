import {WindowFactory} from "../adapters/WindowFactory";
import {inject, injectable} from "inversify";

@injectable()
export class CreateBrowserWindow {
    constructor(
        @inject(WindowFactory)
        private windowsFactory:WindowFactory) {
    }

    execute(){
        return this.windowsFactory.create({width: 800, height: 600})
    }
}