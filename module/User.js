"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./Connection");
const Log_1 = require("./Log");
const GET_USER_SQL = `SELECT * FROM pengguna WHERE ID = ? && PASSWORD = ? LIMIT 1`;
class Anggota {
    async getUser2(pool, id, password) {
        return new Promise((resolve, reject) => {
            pool.query(GET_USER_SQL, [id, password], (_err, _rows) => {
                if (_err) {
                    reject(_err.message);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async getUser(id, password) {
        Log_1.logW.info('User: getUser');
        let pool = await Connection_1.Connection.getPool();
        return await this.getUser2(pool, id, password);
    }
}
exports.user = new Anggota();
