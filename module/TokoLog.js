"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
//NOTE: final
const logW = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.simple(),
    transports: [
        new winston_1.default.transports.File({ filename: ('./public/error.log'), level: 'error' }),
        new winston_1.default.transports.File({ filename: ('./public/combined.log') })
    ]
});
class LogM {
    constructor() {
        this._logs = [];
    }
    get logs() {
        return this._logs;
    }
    log(msg) {
        this._logs.push(msg);
        if (this._logs.length > 1000) {
            this._logs.shift();
        }
    }
    bersih() {
        this._logs = [];
    }
}
exports.logM = new LogM();
class LogT {
    constructor() {
        this.logWStatus = false;
    }
    log(msg) {
        exports.logM.log(msg);
        if (this.logWStatus)
            logW.info('test info');
        console.log(msg);
    }
    ambil() {
        return exports.logM.logs;
    }
}
exports.logT = new LogT();
