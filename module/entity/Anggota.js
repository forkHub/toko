"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("../Connection");
// import { util } from "../Util";
const BarangSql_1 = require("./BarangSql");
class Anggota {
    async nonAktifkanAnggota(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`update pengguna set setuju = 2 WHERE id = ?`, [id], (_err, _rows) => {
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
    async baca(opt) {
        console.log(opt);
        let whereQuery = 'WHERE 1 ';
        let data = [];
        let kolom = '* ';
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
        if (opt.level) {
            whereQuery += 'AND pengguna.level = ? ';
            data.push(opt.level);
        }
        let query = ` SELECT ${kolom} FROM pengguna ${whereQuery}`;
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
        await BarangSql_1.barangSql.hapusByLapakId(id);
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query("DELETE FROM pengguna WHERE ID = ?", [id], (_err, _rows) => {
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
