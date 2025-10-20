import {CreateTabProps, ShowTabProps, UpdateBoundingBoxProps} from "../../support/types/browserTypes";

declare global {
    interface Window {
        browser: {
            createTab(props: CreateTabProps): Promise<number>;
            showTab(props: ShowTabProps): Promise<number>
            setBoundingBox(props: UpdateBoundingBoxProps): void;
        };
    }
}

export async function createTab(props: CreateTabProps) {
    return await window.browser.createTab(props);
}

export async function showTab(props: ShowTabProps) {
    return await window.browser.showTab(props);
}

export function setBoundingBox(props: UpdateBoundingBoxProps) {
    window.browser.setBoundingBox(props);
}