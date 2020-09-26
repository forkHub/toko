"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
exports.logW = winston_1.default.createLogger({
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
    }
}
exports.logM = new LogM();
class LogT {
    log(msg) {
        exports.logM.log(msg);
        exports.logW.info(msg);
        console.log(msg);
    }
}
exports.logT = new LogT();
