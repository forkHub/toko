"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const Connection_1 = require("./Connection");
const TokoLog_1 = require("./TokoLog");
class Auth {
    async login(userName, password) {
        TokoLog_1.logT.log('Auth: login ' + userName + '/' + password);
        let pool = await Connection_1.Connection.getPool();
        let hasil = await User_1.user.getUser2(pool, userName, password);
        TokoLog_1.logT.log(hasil + '');
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
