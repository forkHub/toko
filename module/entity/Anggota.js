"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const Connection_1 = require("../Connection");
const BarangSql_1 = require("./BarangSql");
class Anggota {
    constructor() {
        this.daftarLapak = `
		SELECT id, lapak, deskripsi
		FROM pengguna
		WHERE level = 'user'
		AND toko_id = ?
		AND setuju = 1
	`;
    }
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
    async bacaId(id) {
        let hasil;
        hasil = await this.baca({
            id: id
        });
        if (hasil)
            return hasil[0];
        return null;
    }
    async baca(opt) {
        let whereQuery = 'WHERE 1 ';
        let data = [];
        let kolom = `
			pengguna.id, 
			pengguna.user_id, 
			pengguna.level, 
			pengguna.lapak, 
			pengguna.deskripsi, 
			pengguna.setuju,
			pengguna.toko_id,
			pengguna.wa,
			pengguna.alamat,
			pengguna.email `;
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
        whereQuery += ' AND pengguna.toko_id = ? ';
        data.push(Config_1.config.getNilai(Config_1.Config.TOKO_ID));
        let query = ` SELECT ${kolom} FROM pengguna ${whereQuery}`;
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(query, data, (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async query(query, data) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(query, data, (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async baru(data) {
        return new Promise((resolve, reject) => {
            data.toko_id = Config_1.config.getNilai(Config_1.Config.TOKO_ID);
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
exports.anggotaSql = new Anggota();
