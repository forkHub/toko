"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SessionData {
    constructor() {
        this._statusLogin = false;
        this._level = '';
        this._lapak = '';
        this._id = '';
        this._user_id = '';
    }
    get user_id() {
        return this._user_id;
    }
    set user_id(value) {
        this._user_id = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get lapak() {
        return this._lapak;
    }
    set lapak(value) {
        this._lapak = value;
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
