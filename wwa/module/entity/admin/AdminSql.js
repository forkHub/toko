"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Sql_1 = require("../Sql");
class AdminSql {
    async hapusAnggotaByUserName(userName) {
        let hasil = await Sql_1.sql.query(`
			DELETE 
			FROM pengguna
			WHERE
			user_id = ?
			AND toko_id = ?
		`, [userName, Config_1.config.tokoId]);
        return hasil;
    }
    async hapusAnggota(id) {
        let hasil = await Sql_1.sql.query(`
			DELETE 
			FROM pengguna
			WHERE
			id = ?
			AND toko_id = ?
		`, [id, Config_1.config.tokoId]);
        return hasil;
    }
    async daftarAnggota() {
        return await Sql_1.sql.query(`
			SELECT * 
			FROM barang
			WHERE toko_id = ?
		`, [Config_1.config.tokoId]);
    }
}
exports.AdminSql = AdminSql;
