"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Connection_1 = require("../../Connection");
class BarangSql {
    constructor() {
        this.bacaByIdSql = `
	SELECT BARANG.*, FILE.gbr, FILE.thumb FROM BARANG
	LEFT JOIN FILE ON BARANG.file_id = FILE.id
	WHERE BARANG.id = ? 
	AND BARANG.publish = 1
	AND BARANG.toko_id = ?`;
    }
    async bacaById(id) {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.bacaByIdSql, [id, Config_1.config.tokoId], (_err, _rows) => {
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
