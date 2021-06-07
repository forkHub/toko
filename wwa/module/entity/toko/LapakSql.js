"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Sql_1 = require("../Sql");
class LapakSql {
    async bacaById(lapakId) {
        return await Sql_1.sql.query(`
			SELECT BARANG.*, FILE.gbr, FILE.thumb FROM BARANG
			LEFT JOIN FILE ON BARANG.file_id = FILE.id
			WHERE BARANG.publish = 1
			AND BARANG.toko_id = ?
			AND BARANG.lapak_id = ?`, [Config_1.config.tokoId, lapakId]);
    }
    ;
}
exports.LapakSql = LapakSql;
