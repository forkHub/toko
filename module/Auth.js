"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./Connection");
const TokoLog_1 = require("./TokoLog");
const SessionData_1 = require("./SessionData");
const Anggota_1 = require("./entity/Anggota");
class Auth {
    async login(userName, password) {
        TokoLog_1.logT.log('Auth: login ');
        let pool = await Connection_1.Connection.getPool();
        let hasil = await Anggota_1.anggota.bacaId(pool, userName, password);
        if (hasil.length == 0) {
            TokoLog_1.logT.log('login gagal ' + userName + '/' + password);
            return null;
        }
        // return hasil[0];
        return {
            id: hasil[0].id,
            lapak: hasil[0].lapak
        };
    }
    logout() {
        return null;
    }
}
Auth.SD_ADMIN = 'admin';
Auth.SD_SYSTEM = 'system';
exports.auth = new Auth();
//check auth middle ware
function checkAuth(req, resp, next) {
    if (!SessionData_1.session(req).statusLogin) {
        resp.status(401).send('belum login');
    }
    else {
        next();
    }
}
exports.checkAuth = checkAuth;
function setCache(_req, resp, next) {
    resp.header("Cache-Control", "max-age=7201");
    next();
}
exports.setCache = setCache;
function checkSystem(req, resp, next) {
    // auth.default(req);
    if (SessionData_1.session(req).statusLogin) {
        resp.status(401).send('belum login');
    }
    else if (SessionData_1.session(req).level != Auth.SD_SYSTEM)
        resp.status(401).send('akses ditolak');
    else {
        next();
    }
}
exports.checkSystem = checkSystem;
