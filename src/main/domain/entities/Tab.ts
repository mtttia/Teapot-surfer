import {ITab, IWebTab} from "../../../support/entities/ITab";

export class Tab implements ITab{
    constructor(
        public id:string,
    ) {
    }
}

export class WebTab extends Tab implements IWebTab{
    constructor(id:string,public url:string) {
        super(id);
    }
}