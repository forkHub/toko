"use strict";
// import { Session } from "inspector";
Object.defineProperty(exports, "__esModule", { value: true });
class SessionData {
    constructor() {
        this._statusLogin = false;
        this._level = '';
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
    get statusLogin() {
        return this._statusLogin;
    }
    set statusLogin(value) {
        this._statusLogin = value;
    }
}
exports.SessionData = SessionData;
