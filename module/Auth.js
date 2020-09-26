"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const Connection_1 = require("./Connection");
const Log_1 = require("./Log");
class Auth {
    async login(userName, password) {
        Log_1.logW.info('Auth: login ' + userName + '/' + password);
        let pool = await Connection_1.Connection.getPool();
        let hasil = await User_1.user.getUser2(pool, userName, password);
        Log_1.logW.info(hasil + '');
        if (hasil.length == 0) {
            return false;
        }
        return true;
    }
    logout() {
        return null;
    }
}
exports.auth = new Auth();
