export type TabId = string;

export interface ITab{
    id: TabId;
}

export interface IWebTab extends ITab{
    url:string
}