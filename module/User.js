"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { logT } from "./TokoLog";
const GET_USER_SQL = `SELECT * FROM pengguna WHERE ID = ? && PASSWORD = ? LIMIT 1`;
class Anggota {
    async getUser(pool, id, password) {
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
}
exports.user = new Anggota();
