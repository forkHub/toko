"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Connection_1 = require("../../Connection");
class BarangSql {
    constructor() {
        this.bacaByIdSql = `
	SELECT barang.*, file.gbr, file.thumb, pengguna.lapak as lapak_nama
	FROM barang
	LEFT JOIN file ON barang.file_id = file.id
	LEFT JOIN pengguna ON barang.lapak_id = pengguna.id
	WHERE barang.id = ? 
	AND barang.publish = 1
	AND barang.toko_id = ?`;
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
