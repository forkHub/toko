"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const Connection_1 = require("./Connection");
const TokoLog_1 = require("./TokoLog");
class Auth {
    async login(userName, password) {
        TokoLog_1.logT.log('Auth: login ' + userName + '/' + password);
        let pool = await Connection_1.Connection.getPool();
        let hasil = await User_1.user.getUser(pool, userName, password);
        TokoLog_1.logT.log(hasil + '');
        if (hasil.length == 0) {
            return false;
        }
        return true;
    }
    logout() {
        return null;
    }
    checkAuth(req, resp, next) {
        if (!req.session.statusLogin) {
            resp.status(401).send('belum login');
        }
        else if (false == req.session.statusLogin) {
            resp.status(401).send('belum login');
        }
        else {
            next();
        }
    }
}
exports.auth = new Auth();
//check auth middle ware
function checkAuth(req, resp, next) {
    if (!req.session.statusLogin) {
        resp.status(401).send('belum login');
    }
    else if (false == req.session.statusLogin) {
        resp.status(401).send('belum login');
    }
    else {
        next();
    }
}
exports.checkAuth = checkAuth;
