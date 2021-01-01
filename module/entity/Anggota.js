"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("../Connection");
class Anggota {
    async baca(opt) {
        console.log(opt);
        let whereQuery = 'WHERE 1 ';
        let data = [];
        if (opt.id) {
            whereQuery += 'AND pengguna.id = ? ';
            data.push(opt.id);
        }
        if (opt.user_id) {
            whereQuery += 'AND pengguna.user_id = ? ';
            data.push(opt.user_id);
        }
        if (opt.password) {
            whereQuery += 'AND pengguna.password = ? ';
            data.push(opt.password);
        }
        if (!isNaN(opt.setuju)) {
            whereQuery += 'AND pengguna.setuju = ? ';
            data.push(opt.setuju);
        }
        let query = ` SELECT * FROM pengguna ${whereQuery}`;
        console.log(query);
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(query, data, (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    // console.log(_rows);
                    resolve(_rows);
                }
            });
        });
    }
    async baru(data) {
        return new Promise((resolve, reject) => {
            // console.log('anggota baru');
            // console.log(data);
            Connection_1.Connection.pool.query(`INSERT INTO pengguna SET ?`, data, (_err, _rows) => {
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
    async update(data, id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query("UPDATE pengguna SET ? WHERE ID = ?", [
                data,
                id
            ], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async hapus(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query("DELETE FROM BARANG WHERE ID = ?", [id], (_err, _rows) => {
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
exports.anggota = new Anggota();
