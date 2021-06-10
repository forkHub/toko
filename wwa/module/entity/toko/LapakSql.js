"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Sql_1 = require("../Sql");
class LapakSql {
    async bacaBarangByLapakid(lapakId) {
        return await Sql_1.sql.query(`
			SELECT barang.*, file.gbr, file.thumb FROM barang
			LEFT JOIN file ON barang.file_id = file.id
			WHERE barang.publish = 1
			AND barang.toko_id = ?
			AND barang.lapak_id = ?`, [Config_1.config.tokoId, lapakId]);
    }
    ;
    async namaLapak(lapakId) {
        return await Sql_1.sql.query(`
			SELECT lapak 
			FROM pengguna
			WHERE 
			setuju = 1
			AND id = ?
			AND toko_id = ?`, [lapakId, Config_1.config.tokoId]);
    }
}
exports.LapakSql = LapakSql;
