"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./Connection");
class Pengguna {
    async baca() {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`SELECT * FROM pengguna`, [], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
}
exports.pengguna = new Pengguna();
