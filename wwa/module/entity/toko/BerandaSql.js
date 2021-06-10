"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Connection_1 = require("../../Connection");
const Sql_1 = require("../Sql");
class BerandaSql {
    constructor() {
        this.semuaBarangSql = `SELECT barang.*, file.gbr, file.thumb FROM barang 
											LEFT JOIN file ON barang.file_id = file.id 
											WHERE 
											publish = 1
											AND toko_id = ? 
											AND barang.id IS NOT NULL
											ORDER BY last_view DESC
											LIMIT ?
											OFFSET ?;`.trimStart().trimEnd();
        this.jmlBarangSql = `SELECT count(id) as jml FROM barang 
											WHERE 
											publish = 1
											AND toko_id = ?`;
    }
    async jmlBarang() {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.jmlBarangSql, [Config_1.config.tokoId], (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows[0].jml);
                }
            });
        });
    }
    async semuaBarang(hal) {
        let limit = (Config_1.config.jmlPerHal);
        let tokoId = (Config_1.config.tokoId);
        return await Sql_1.sql.query(this.semuaBarangSql, [tokoId, limit, limit * hal]);
    }
    async daftarLapak() {
        let data = (await Sql_1.sql.query(`
				SELECT id, lapak, deskripsi
				FROM pengguna
				WHERE toko_id = ${Config_1.config.tokoId}
				AND level = 'user'
			`));
        return data;
    }
}
exports.berandaSql = new BerandaSql();
