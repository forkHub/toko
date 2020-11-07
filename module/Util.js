"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    buatDate() {
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
}
exports.util = new Util();
