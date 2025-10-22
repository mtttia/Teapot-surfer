import {ITab, TabId} from "../entities/ITab";
import {Bounds} from "../entities/Bounds";

export interface CreateTabProps {
    url:string;
}

export interface CreateTabResponse{
    id: TabId
}

export interface ChangeTabProps {
    id:TabId;
}

export interface ChangeTabResponse {
    tab:ITab|null
}

export interface SetBoundingBoxProps {
    bbox: Bounds
}

export interface BrowserApi {
    createTab(props: CreateTabProps): Promise<CreateTabResponse>;
    changeTab(props: ChangeTabProps): Promise<ChangeTabResponse>
    setBoundingBox(props: SetBoundingBoxProps): void;
}

const browserRequest = "browser"

export const createTabRequest = `${browserRequest}.create_tab`
export const changeTabRequest = `${browserRequest}.change_tab`;
export const setBoundingBoxRequest = `${browserRequest}.set_bounding_box`