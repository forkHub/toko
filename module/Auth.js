"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
class Auth {
    async login(userName, password) {
        console.log('Auth: login ' + userName + '/' + password);
        let hasil = await User_1.user.getUser(userName, password);
        console.log(hasil);
        if (hasil.length == 0) {
            return false;
        }
        else if (hasil.length == 1) {
            return true;
        }
        else {
            throw new Error('internal error');
        }
        return true;
    }
    logout() {
        return null;
    }
}
exports.auth = new Auth();
