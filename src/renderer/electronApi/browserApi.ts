import {CreateTabProps, ChangeTabProps, SetBoundingBoxProps, BrowserApi} from "../../support/ipc/browserTypes";

declare global {
    interface Window {
        browser: BrowserApi;
    }
}

export async function createTab(props: CreateTabProps) {
    return await window.browser.createTab(props);
}

export async function showTab(props: ChangeTabProps) {
    return await window.browser.changeTab(props);
}

export function setBoundingBox(props: SetBoundingBoxProps) {
    window.browser.setBoundingBox(props);
}