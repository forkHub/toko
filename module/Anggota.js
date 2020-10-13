"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./Connection");
class Anggota {
    async baca() {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`SELECT * FROM pengguna`, [], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    console.log(_rows);
                    resolve(_rows);
                }
            });
        });
    }
}
exports.anggota = new Anggota();
