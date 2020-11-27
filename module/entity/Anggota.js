"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("../Connection");
class Anggota {
    constructor() {
        this.GET_USER_SQL = `SELECT * FROM pengguna WHERE ID = ? && PASSWORD = ? LIMIT 1`;
    }
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
    async baru(data) {
        return new Promise((resolve, reject) => {
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
    async bacaId(pool, id, password) {
        return new Promise((resolve, reject) => {
            pool.query(this.GET_USER_SQL, [id, password], (_err, _rows) => {
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
exports.anggota = new Anggota();
