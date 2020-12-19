"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("../Connection");
const assert_1 = require("assert");
const Config_1 = require("../Config");
class BarangSql {
    constructor() {
        // private bacaBarangPulish: string = `SELECT BARANG.*, FILE.thumb, FILE.gbr 
        // 										FROM BARANG
        // 										LEFT JOIN FILE
        // 										ON BARANG.file_id = FILE.id
        // 										WHERE BARANG.publish = 1`;
        // private bacaBaranglapakPulish: string = `SELECT BARANG.*, FILE.thumb, FILE.gbr 
        // 										FROM BARANG
        // 										LEFT JOIN FILE
        // 										ON BARANG.file_id = FILE.id
        // 										WHERE BARANG.publish = 1
        // 										AND BARANG.lapak = ?;`;
        this.bacaBaranglapak = `SELECT BARANG.*, FILE.thumb, FILE.gbr 
											FROM BARANG
											LEFT JOIN FILE
											ON BARANG.file_id = FILE.id
											WHERE BARANG.lapak = ?;`;
        this.bacaBarangSemua = `SELECT BARANG.*, FILE.thumb, FILE.gbr 
											FROM BARANG
											LEFT JOIN FILE
											ON BARANG.file_id = FILE.id`;
        this.hapusSql = `DELETE FROM BARANG WHERE ID = ?`;
        this.updateSql = `UPDATE BARANG SET ? WHERE ID = ?`;
        this.baruSql = `INSERT INTO BARANG SET ?`;
        this.bacaIdSql = `
		SELECT BARANG.*, FILE.thumb, FILE.gbr 
		FROM BARANG
		LEFT JOIN FILE
		ON BARANG.file_id = FILE.id
		WHERE BARANG.id = ?`;
    }
    query(query, resolve, reject) {
        Connection_1.Connection.pool.query(query, (_err, _rows) => {
            if (_err) {
                reject(_err.message);
            }
            else {
                resolve(_rows);
            }
        });
    }
    async queryBaca(query) {
        return new Promise((resolve, reject) => {
            try {
                this.query(query, resolve, reject);
            }
            catch (err) {
                assert_1.rejects(err.message);
            }
        });
    }
    //TODO: type buat return
    async bacaId(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.bacaIdSql, [id], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows[0]);
                }
            });
        });
    }
    async cari(kataKunci, offset = 0) {
        let query = `SELECT BARANG.*, FILE.thumb, FILE.gbr
			FROM BARANG
			LEFT JOIN FILE
			ON BARANG.file_id = FILE.id
			WHERE BARANG.publish = 1
			AND (BARANG.nama like ?
			OR BARANG.deskripsi_panjang like ?)
			LIMIT ?
			OFFSET ?
			`;
        // let jml: number = await this.cariJml(kataKunci);
        return new Promise((resolve, reject) => {
            try {
                Connection_1.Connection.pool.query(query, [
                    '%' + kataKunci + '%',
                    '%' + kataKunci + '%',
                    Config_1.config.jmlPerHal,
                    offset
                ], (_err, _rows) => {
                    if (_err) {
                        reject(_err.message);
                    }
                    else {
                        resolve(_rows);
                    }
                });
            }
            catch (err) {
                assert_1.rejects(err.message);
            }
        });
    }
    async cariJml(kataKunci) {
        let query = `SELECT COUNT(*) as JML
			FROM BARANG
			WHERE BARANG.publish = 1
			AND (BARANG.nama like ?
			OR BARANG.deskripsi_panjang like ?)
			`;
        return new Promise((resolve, reject) => {
            try {
                Connection_1.Connection.pool.query(query, ['%' + kataKunci + '%', '%' + kataKunci + '%'], (_err, _rows) => {
                    if (_err) {
                        reject(_err.message);
                    }
                    else {
                        resolve(_rows[0].JML);
                    }
                });
            }
            catch (err) {
                assert_1.rejects(err.message);
            }
        });
    }
    async bacaSemua() {
        return this.queryBaca(this.bacaBarangSemua);
    }
    async jumlah() {
        let query = `SELECT COUNT(*) as jumlah
			FROM BARANG
			WHERE BARANG.publish = 1
			`;
        return new Promise((resolve, reject) => {
            try {
                Connection_1.Connection.pool.query(query, (_err, _rows) => {
                    if (_err) {
                        reject(_err.message);
                    }
                    else {
                        resolve(_rows[0].jumlah);
                    }
                });
            }
            catch (err) {
                assert_1.rejects(err.message);
            }
        });
    }
    //TODO: pakai paging
    async bacaPublish(mulai = 0, jml = 25) {
        let query = `
			SELECT BARANG.*, FILE.thumb, FILE.gbr 
			FROM BARANG
			LEFT JOIN FILE
			ON BARANG.file_id = FILE.id
			WHERE BARANG.publish = 1
			ORDER BY BARANG.last_view DESC
			`;
        return new Promise((resolve, reject) => {
            try {
                this.query(query, resolve, reject);
            }
            catch (err) {
                assert_1.rejects(err.message);
            }
        });
    }
    //TODO: belum dipake
    async updateLastViewDate(id) {
        return new Promise((resolve, reject) => {
            let query = `
				update BARANG set LAST_VIEW = NOW() where ID = ?
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
    //TODO belum kepake
    async bacaLapakPublishDate() {
        let query = `
		SELECT BARANG.*, FILE.thumb, FILE.gbr 
		FROM BARANG
		LEFT JOIN FILE
		ON BARANG.file_id = FILE.id
		WHERE BARANG.publish = 1
		ORDER BY BARANG.LAST_VIEW
		;`;
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(query, [], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    // async bacalapakPublish(lapak: string): Promise<any> {
    // 	return new Promise((resolve, reject) => {
    // 		Connection.pool.query(
    // 			this.bacaBaranglapakPulish, [lapak],
    // 			(_err: any, _rows: any) => {
    // 				if (_err) {
    // 					reject(_err);
    // 				}
    // 				else {
    // 					resolve(_rows);
    // 				}
    // 			});
    // 	});
    // }
    async bacalapak(lapak) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.bacaBaranglapak, [lapak], (_err, _rows) => {
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
    async update(data, id) {
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
}
exports.barangSql = new BarangSql();
