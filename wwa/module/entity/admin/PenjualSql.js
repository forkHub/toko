"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Connection_1 = require("../../Connection");
const Sql_1 = require("../Sql");
class PenjualSql {
    constructor() {
        this.hapusbarangSql = `DELETE FROM barang WHERE ID = ? `;
        this.baruSql = `INSERT INTO barang SET ?`;
        this.daftarbarangSql = `
		SELECT barang.*, file.gbr, file.thumb FROM barang 
		LEFT JOIN file ON barang.file_id = file.id 
		WHERE 
		lapak_id = ?
		AND toko_id = ? 
		AND barang.id IS NOT NULL
		ORDER BY last_view DESC;`.trimStart().trimEnd();
    }
    //TODO: query dibuat selektif
    async profileBaca(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`SELECT * FROM pengguna WHERE id = ?`, [id], (_err, _rows) => {
                if (_err) {
                    console.error(_err);
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async profileEdit(data) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`UPDATE pengguna SET ? WHERE id = ?`, [data, data.id], (_err, _rows) => {
                if (_err) {
                    console.error(_err);
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async gambarBaru(gbrBesarRelUrl, gbrKecilRelurl) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`INSERT INTO file SET ?`, {
                thumb: gbrKecilRelurl,
                gbr: gbrBesarRelUrl
            }, (_err, _rows) => {
                if (_err) {
                    console.error;
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async gambarHapus(_id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`DELETE FROM file WHERE ID = ?`, [_id], (_err, _rows) => {
                if (_err) {
                    console.error(_err);
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async barangBaru(data) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.baruSql, data, (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async barangEdit(data, id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`UPDATE barang SET ? WHERE id =?`, [data, id], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async barangHapus(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.hapusbarangSql, [id], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async barangDaftar(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.daftarbarangSql, [id, Config_1.config.tokoId], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async barangBacaBuatEdit(id) {
        return (await Sql_1.sql.query(`
				SELECT barang.*, file.gbr, file.thumb FROM barang 
				LEFT JOIN file ON barang.file_id = file.id 
				WHERE barang.id = ?`, [id]));
    }
    async barangCheckPemilik(id) {
        return (await Sql_1.sql.query(`
				SELECT barang.lapak_id 
				FROM barang 
				WHERE barang.id = ?`, [id]));
    }
}
exports.penjualSql = new PenjualSql();
