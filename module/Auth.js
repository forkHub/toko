"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokoLog_1 = require("./TokoLog");
const SessionData_1 = require("./SessionData");
const Anggota_1 = require("./entity/Anggota");
class Auth {
    async login(userId, password) {
        TokoLog_1.logT.log('Auth: login ');
        let hasil = await Anggota_1.anggota.baca({ user_id: userId, password: password, setuju: 1 });
        if (hasil.length == 0) {
            TokoLog_1.logT.log('login gagal ' + userId + '/' + password);
            return null;
        }
        if (hasil[0].setuju == 0) {
            return null;
        }
        return {
            id: hasil[0].id,
            lapak: hasil[0].lapak,
            level: hasil[0].level,
            user_id: hasil[0].user_id,
            password: ''
        };
    }
}
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
