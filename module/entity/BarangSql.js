"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const Connection_1 = require("../Connection");
const File_1 = require("./File");
class BarangSql {
    constructor() {
        this.bacaBarangTerkait = `
		SELECT BARANG.*, FILE.thumb, FILE.gbr
		FROM BARANG
		LEFT JOIN FILE
		ON BARANG.file_id = File.id
		WHERE 
			BARANG.publish = 1
			AND BARANG.toko_id = ?
		ORDER BY BARANG.last_view
		LIMIT 5 
	`;
        this.hapusSql = `DELETE FROM BARANG WHERE ID = ?`;
        this.updateSql = `UPDATE BARANG SET ? WHERE ID = ?`;
        this.baruSql = `INSERT INTO BARANG SET ?`;
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
        whereQuery += ' AND BARANG.toko_id = ? ';
        data.push(Config_1.config.getNilai(Config_1.Config.TOKO_ID));
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
        else if (opt.orderDateAsc) {
            orderQuery = 'ORDER BY last_view ASC ';
        }
        let query = `
			SELECT BARANG.*, FILE.thumb, FILE.gbr 
			FROM BARANG 
			LEFT JOIN FILE ON BARANG.file_id = FILE.id 
			${whereQuery} ${orderQuery} ${limitQuery}  ${offsetQuery}`;
        console.log(query);
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
    async hapusByLapakId(id) {
        console.log('hapus barang, id ' + id);
        let barang = await this.baca({
            lapak_id: id
        });
        for (let i = 0; i < barang.length; i++) {
            await this.hapus(barang[i].id);
        }
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(`DELETE FROM BARANG WHERE lapak_id = ?`, [id], (_err, _rows) => {
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
        let barang = await this.baca({
            id: id
        });
        await File_1.file.hapus(barang[0].file_id).catch((e) => {
            console.log(e.message);
        });
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
        console.log('barang update');
        console.log(data);
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
        console.log('barang baru');
        console.log(data);
        data.toko_id = Config_1.config.getNilai(Config_1.Config.TOKO_ID);
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
