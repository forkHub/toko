"use strict";
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
function session(req) {
    if (!req.session) {
        req.session = new SessionData();
    }
    return req.session;
}
exports.session = session;
