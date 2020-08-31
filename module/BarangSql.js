"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./Connection");
const assert_1 = require("assert");
class BarangSql {
    constructor() {
        this.bacaBarangPulish = `SELECT BARANG.*, FILE.thumb, FILE.gbr 
											FROM BARANG
											LEFT JOIN FILE
											ON BARANG.file_id = FILE.id
											WHERE BARANG.publish = 1;`;
        this.bacaBarangSemua = `SELECT BARANG.*, FILE.thumb, FILE.gbr 
											FROM BARANG
											LEFT JOIN FILE
											ON BARANG.file_id = FILE.id`;
    }
    query(query, resolve, reject) {
        Connection_1.Connection.connection.query(query, (_err, _rows) => {
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
    async bacaSemua() {
        return this.queryBaca(this.bacaBarangSemua);
    }
    async bacaPublish() {
        return this.queryBaca(this.bacaBarangPulish);
    }
}
exports.barangSql = new BarangSql();
