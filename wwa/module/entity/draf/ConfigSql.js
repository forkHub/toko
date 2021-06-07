"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("../../Connection");
class ConfigSql {
    async baca() {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`SELECT * FROM KONFIG`, [], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async insert(item) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`INSERT INTO KONFIG SET ?`, item, (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async bacaKey(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`SELECT * FROM KONFIG WHERE kunci = ?`, [id], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async update(data, id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`UPDATE KONFIG SET ? WHERE kunci = ?`, [data, id], (_err, _rows) => {
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
exports.configSql = new ConfigSql();
