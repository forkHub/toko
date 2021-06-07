"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const Connection_1 = require("../Connection");
const PenjualSql2_1 = require("./PenjualSql2");
class Anggota {
    constructor() {
        this.daftarLapakAktifSql = `
		SELECT id, lapak, deskripsi
		FROM pengguna
		WHERE level = 'user'
		AND toko_id = ?
		AND setuju = 1
	`;
        this.table = 'pengguna';
        this.kolom = `
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
    }
    async userAda(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`SELECT id, lapak, deskripsi
									FROM pengguna
									WHERE level = 'user'
									AND toko_id = ?
									AND setuju = 1`, [id], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async bacaBySetuju(setuju) {
        let hasil;
        hasil = await this.query(`SELECT ${this.kolom}
			FROM ${this.table}
			WHERE pengguna.setuju = ?
				AND pengguna.toko_id = ?
					`, [setuju, Config_1.config.tokoId]);
        if (hasil)
            return hasil;
        return null;
    }
    async bacaDaftarLapakAktif() {
        let hasil;
        hasil = await this.query(this.daftarLapakAktifSql, [Config_1.config.tokoId]);
        if (hasil)
            return hasil;
        return [];
    }
    async bacaById(id) {
        let hasil;
        hasil = await this.query(`SELECT 
				pengguna.id,
				pengguna.user_id,
				pengguna.level,
				pengguna.lapak,
				pengguna.deskripsi,
				pengguna.setuju,
				pengguna.toko_id,
				pengguna.wa,
				pengguna.alamat,
				pengguna.email
			FROM pengguna
			WHERE pengguna.id = ?
				AND pengguna.toko_id = ?
					`, [id, Config_1.config.tokoId]);
        if (hasil)
            return hasil[0];
        return null;
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
            data.toko_id = Config_1.config.tokoId;
            Connection_1.Connection.pool.query(`INSERT INTO pengguna SET ? `, data, (_err, _rows) => {
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
        await PenjualSql2_1.penjualSql2.hapusByLapakId(id);
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
