"use strict";
// import winston from "winston";
Object.defineProperty(exports, "__esModule", { value: true });
//NOTE: final
//TODO: d
// const logW: winston.Logger = winston.createLogger({
// 	level: 'info',
// 	format: winston.format.simple(),
// 	transports: [
// 		new winston.transports.File({ filename: ('./public/error.log'), level: 'error' }),
// 		new winston.transports.File({ filename: ('./public/combined.log') })
// 	]
// });
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
    // private logWStatus: boolean = false;
    log(msg) {
        exports.logM.log(msg);
        // if (this.logWStatus) logW.info('test info');
        console.log(msg);
    }
    ambil() {
        return exports.logM.logs;
    }
}
exports.logT = new LogT();
