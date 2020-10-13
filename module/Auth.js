"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const Connection_1 = require("./Connection");
const TokoLog_1 = require("./TokoLog");
const SessionData_1 = require("./SessionData");
class Auth {
    async login(userName, password) {
        TokoLog_1.logT.log('Auth: login ' + userName + '/' + password);
        let pool = await Connection_1.Connection.getPool();
        let hasil = await User_1.user.getUser(pool, userName, password);
        TokoLog_1.logT.log(hasil + '');
        if (hasil.length == 0) {
            return null;
        }
        return hasil[0];
    }
    logout() {
        return null;
    }
    default(req) {
        if (!req.session) {
            req.session = new SessionData_1.SessionData();
        }
    }
    session(req) {
        this.default(req);
        return req.session;
    }
}
Auth.SD_ADMIN = 'admin';
Auth.SD_SYSTEM = 'system';
exports.auth = new Auth();
//check auth middle ware
function checkAuth(req, resp, next) {
    // auth.default(req);
    if (!exports.auth.session(req).statusLogin) {
        resp.status(401).send('belum login');
    }
    else {
        next();
    }
}
exports.checkAuth = checkAuth;
function checkSystem(req, resp, next) {
    // auth.default(req);
    if (!exports.auth.session(req).statusLogin) {
        resp.status(401).send('belum login');
    }
    else if (exports.auth.session(req).level != Auth.SD_SYSTEM)
        resp.status(401).send('akses ditolak');
    else {
        next();
    }
}
exports.checkSystem = checkSystem;
