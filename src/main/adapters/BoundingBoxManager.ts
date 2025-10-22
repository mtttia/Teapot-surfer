import {Bounds} from "../../support/entities/Bounds";
import { injectable } from 'inversify';

@injectable()
export default class BoundingBoxManager {
    private bbox: Bounds|null = null;

    setBoundingBox(bbox: Bounds|null):void {
        this.bbox = bbox;
    }

    getBoundingBox():Bounds|null {
        return this.bbox
    }
}