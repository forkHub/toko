"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Connection_1 = require("../../Connection");
class AuthSql {
    async login(username, pass) {
        let query = `
			SELECT id, user_id, lapak, level 
			FROM pengguna
			WHERE user_id = ?
			AND password = ?
			AND setuju = 1
			AND toko_id = ${Config_1.config.tokoId}
		`;
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(query, [username, pass], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async daftar(data) {
        let query = `
			INSERT INTO pengguna SET ?
		`;
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(query, [data], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async updatePassword(id, password) {
        let query = `
			UPDATE pengguna SET password = MD5(?)
			WHERE id = ?
			AND setuju = 1
			AND toko_id = ${Config_1.config.tokoId}
		`;
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(query, [password, id], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async getByEmail(email) {
        let query = `
			SELECT id, email 
			FROM pengguna
			WHERE email = ?
			AND setuju = 1
			AND toko_id = ${Config_1.config.tokoId}
		`;
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(query, [email], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async userAda(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`SELECT id FROM pengguna
									WHERE 
									id = ? 
									level = 'user'
									AND toko_id = ?
									AND setuju = 1`, [id, Config_1.config.tokoId], (_err, _rows) => {
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
exports.authSql = new AuthSql();
