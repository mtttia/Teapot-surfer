import pino from "pino";
import {injectable} from "inversify";

@injectable()
export class LoggerAdapter {
    public logger:pino.Logger
    constructor() {
        this.logger = pino()
    }

    getLogger(){
        return this.logger
    }
}