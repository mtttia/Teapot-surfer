import {BrowserWindow} from "electron";
import path from "path";
import {injectable} from "inversify";

export interface BrowserWindowOptions {
    width: number;
    height: number;
}

@injectable()
export class WindowFactory {
    create(options: BrowserWindowOptions) {
        const win = new BrowserWindow({
            width: options.width,
            height: options.height,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
            },
        })

        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        } else {
            win.loadFile(
                path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
            );
        }

        return win
    }

}