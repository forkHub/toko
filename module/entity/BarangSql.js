"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("../Connection");
const assert_1 = require("assert");
const Config_1 = require("../Config");
class BarangSql {
    constructor() {
        this.bacaBaranglapak = `SELECT BARANG.*, FILE.thumb, FILE.gbr 
											FROM BARANG
											LEFT JOIN FILE
											ON BARANG.file_id = FILE.id
											WHERE BARANG.lapak = ?
											ORDER BY BARANG.nama 
											;`;
        this.bacaBarangTerkait = `
		SELECT BARANG.*, FILE.thumb, FILE.gbr
		FROM BARANG
		LEFT JOIN FILE
		ON BARANG.file_id = File.id
		WHERE BARANG.publish = 1
		ORDER BY BARANG.last_view
		LIMIT 5 
	`;
        this.hapusSql = `DELETE FROM BARANG WHERE ID = ?`;
        this.updateSql = `UPDATE BARANG SET ? WHERE ID = ?`;
        this.baruSql = `INSERT INTO BARANG SET ?`;
        //TODO: depecreated
        // private async queryBaca(query: string): Promise<any> {
        // 	return new Promise((resolve, reject) => {
        // 		try {
        // 			this.query(query, resolve, reject);
        // 		} catch (err) {
        // 			rejects(err.message)
        // 		}
        // 	})
        // }
        //TODO: depecreated
        // async bacaId(id: string): Promise<any> {
        // 	return new Promise((resolve, reject) => {
        // 		Connection.pool.query(
        // 			this.bacaIdSql, [id],
        // 			(_err: any, _rows: any) => {
        // 				if (_err) {
        // 					reject(_err);
        // 				}
        // 				else {
        // 					resolve(_rows[0]);
        // 				}
        // 			});
        // 	});
        // }	
    }
    // private bacaIdSql: string = `
    // SELECT BARANG.*, FILE.thumb, FILE.gbr 
    // FROM BARANG
    // LEFT JOIN FILE
    // ON BARANG.file_id = FILE.id
    // WHERE BARANG.id = ?`;
    //TODO: depecreated
    query3(query, resolve, reject) {
        Connection_1.Connection.pool.query(query, (_err, _rows) => {
            if (_err) {
                reject(_err.message);
            }
            else {
                resolve(_rows);
            }
        });
    }
    //TODO: depcreated
    async cari(kataKunci, offset, _lapak) {
        let lapakQuery = ''; //TODO:
        let query = `SELECT BARANG.*, FILE.thumb, FILE.gbr
			FROM BARANG
			LEFT JOIN FILE
			ON BARANG.file_id = FILE.id
			WHERE BARANG.publish = 1
			AND (BARANG.nama like ?
			OR BARANG.deskripsi_panjang like ?)
			${lapakQuery}
			LIMIT ?
			OFFSET ?
			`;
        return new Promise((resolve, reject) => {
            try {
                Connection_1.Connection.pool.query(query, [
                    '%' + kataKunci + '%',
                    '%' + kataKunci + '%',
                    Config_1.config.getNilai(Config_1.Config.JML_PER_HAL),
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
    //TODO: pakai paging, depecreated
    async bacaPublish(_mulai, _jml, lapak) {
        let query = `
			SELECT BARANG.*, FILE.thumb, FILE.gbr 
			FROM BARANG
			LEFT JOIN FILE
			ON BARANG.file_id = FILE.id
			WHERE BARANG.publish = 1`;
        if (lapak != '') {
            query += `AND lapak_id = ` + lapak;
        }
        query += `
			ORDER BY BARANG.last_view DESC
		`;
        return new Promise((resolve, reject) => {
            try {
                this.query3(query, resolve, reject);
            }
            catch (err) {
                assert_1.rejects(err.message);
            }
        });
    }
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
    //TODO depecreated
    async bacaLapakPublishDate() {
        let query = `
		SELECT BARANG.*, FILE.thumb, FILE.gbr
		FROM BARANG
		LEFT JOIN FILE
		ON BARANG.file_id = FILE.id
		WHERE BARANG.publish = 1
		ORDER BY BARANG.LAST_VIEW
			; `;
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
    //TODO depecreated
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
    async baca(opt) {
        let whereQuery = 'WHERE 1 ';
        let offsetQuery = '';
        let limitQuery = '';
        let orderQuery = '';
        let data = [];
        console.log('Barang baca ');
        console.log(opt);
        if (opt.id) {
            whereQuery += 'AND BARANG.id = ? ';
            data.push(opt.id);
        }
        if (opt.lapak_id) {
            whereQuery += 'AND BARANG.lapak_id = ? ';
            data.push(opt.lapak_id);
        }
        if (opt.kataKunci) {
            whereQuery += `AND (BARANG.nama like ? OR BARANG.deskripsi_panjang like ?) `;
            data.push('%' + opt.kataKunci + '%');
            data.push('%' + opt.kataKunci + '%');
        }
        if (opt.publish) {
            whereQuery += `AND BARANG.publish = ? `;
            data.push(opt.publish);
        }
        if (!isNaN(opt.limit)) {
            limitQuery = 'LIMIT ? ';
            data.push(opt.limit);
        }
        if (!isNaN(opt.offset)) {
            offsetQuery = 'OFFSET ? ';
            data.push(opt.offset);
        }
        if (opt.orderDateDesc) {
            orderQuery = 'ORDER BY last_view DESC ';
        }
        else if (opt.orderNamaAsc) {
            orderQuery = 'ORDER BY BARANG.nama ASC ';
        }
        let query = `SELECT BARANG.*, FILE.thumb, FILE.gbr FROM BARANG LEFT JOIN FILE ON BARANG.file_id = FILE.id ${whereQuery} ${orderQuery} ${limitQuery}  ${offsetQuery}`;
        // console.log(query);
        // console.log(data);
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(query, data, (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                    // console.log(_rows);
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
