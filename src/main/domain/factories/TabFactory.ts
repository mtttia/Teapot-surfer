import {WebTab} from "../entities/Tab";
import * as uuid from 'uuid';


export class TabFactory {
    createWebTab(url:string):WebTab{
        return new WebTab(uuid.v4(), url)
    }
}