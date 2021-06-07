"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const Connection_1 = require("../Connection");
class PenjualSql2 {
    constructor() {
        this.hapusSql = `DELETE FROM BARANG WHERE ID = ? `;
        this.daftarBarangSql = `
		SELECT BARANG.*, FILE.thumb, FILE.gbr
		FROM BARANG
		LEFT JOIN FILE ON BARANG.file_id = File.id
		WHERE 
			BARANG.lapak_id = ? 
			AND BARANG.toko_id = ? 
		ORDER BY BARANG.nama`;
        this.updateSql = `UPDATE BARANG SET ? WHERE ID = ? `;
        this.baruSql = `INSERT INTO BARANG SET ?`;
    }
    async daftarBarang(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.daftarBarangSql, [id, Config_1.config.tokoId], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async bacaById(id) {
        let hasil;
        id;
        if (hasil && hasil.length > 0) {
            return hasil[0];
        }
        return null;
    }
    async hapusByLapakId(id) {
        console.log('hapus barang, id ' + id);
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`DELETE FROM BARANG WHERE lapak_id = ? `, [id], (_err, _rows) => {
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
        console.log('hapus barang, id ' + id);
        // let barang: IBarangObj[] = await this.baca({
        // 	id: id
        // });
        // await fileSql.hapus(barang[0].file_id).catch((e) => {
        // 	console.log(e.message);
        // })
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.hapusSql, [id], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async updateLastViewDate(id) {
        return new Promise((resolve, reject) => {
            let query = `
				update BARANG set LAST_VIEW = NOW() where id = ?
	`;
            Connection_1.Connection.pool.query(query, [id], (_err, _rows) => {
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
        // console.log('barang update');
        // console.log(data);
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.updateSql, [
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
    async baru(data) {
        data.toko_id = Config_1.config.tokoId;
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.baruSql, data, (_err, _rows) => {
                if (_err) {
                    console.error;
                    reject(_err);
                }
                else {
                    console.log(_rows);
                    resolve(_rows);
                }
            });
        });
    }
}
exports.penjualSql2 = new PenjualSql2();
