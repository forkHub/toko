"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("../../Connection");
const FileDisk_1 = require("./FileDisk");
class File {
    constructor() {
        this.qsemua = `
		select * from file
	`;
        this.qfileTanpaReferensi = `
		select * from file 
		left join barang on barang.file_id = file.id
		where barang.id is null;
	`;
    }
    async bacaId(id) {
        return new Promise((resolve, reject) => {
            console.log('baca file by id ' + id);
            Connection_1.Connection.pool.query(`SELECT * FROM file WHERE id = ?`, [id], (_err, _rows) => {
                if (_err) {
                    console.error(_err);
                    reject(_err);
                }
                else {
                    resolve(_rows[0]);
                }
            });
        });
    }
    async baru(gbrBesarRelUrl, gbrKecilRelurl) {
        return new Promise((resolve, reject) => {
            //simpan ke database 
            Connection_1.Connection.pool.query(`INSERT INTO FILE SET ?
				`, {
                thumb: gbrKecilRelurl,
                gbr: gbrBesarRelUrl
            }, (_err, _rows) => {
                if (_err) {
                    console.error;
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async tanpaReferensi() {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.qfileTanpaReferensi, (_err, _rows) => {
                if (_err) {
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
    async bacaBerdasarThumb(thumb) {
        return new Promise((resolve, reject) => {
            console.log('baca file berdasar thumb ' + thumb);
            Connection_1.Connection.pool.query(`SELECT id FROM file WHERE thumb = ?`, thumb, (_err, _rows) => {
                if (_err) {
                    console.error;
                    reject(_err);
                }
                else {
                    // logT.log('ok');
                    resolve(_rows[0]);
                }
            });
        });
    }
    async bacaBerdasarGbr(gbr) {
        return new Promise((resolve, reject) => {
            console.log('baca file berdasar gbr ' + gbr);
            Connection_1.Connection.pool.query(`SELECT id FROM file WHERE gbr = ?`, gbr, (_err, _rows) => {
                if (_err) {
                    console.error;
                    reject(_err);
                }
                else {
                    resolve(_rows[0]);
                }
            });
        });
    }
    async bacaBerdasarFileUrl(item, type = 'kecil') {
        if ('kecil' == type) {
            return await this.bacaBerdasarThumb(item);
        }
        else if ('besar' == type) {
            return await this.bacaBerdasarGbr(item);
        }
        else {
            return '';
        }
    }
    async baca() {
        return new Promise((resolve, reject) => {
            Connection_1.Connection.pool.query(this.qsemua, (_err, _rows) => {
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
        let file = await this.bacaId(id);
        console.group('hapus file');
        console.log(file);
        console.log('hapus file db, id ' + id);
        await this.hapusDb(id);
        console.log('hapus file, thumb ' + file.thumb);
        await FileDisk_1.fileDisk.hapusFile('./wwa/public' + file.thumb);
        console.log('hapus file, gbr ' + file.gbr);
        await FileDisk_1.fileDisk.hapusFile('./wwa/public' + file.gbr);
        console.groupEnd();
    }
    /**
     * baca file di disk dan check apakah ada referensi di database
     * bila tidak ada maka bisa dihapus
     * @returns IDaftarFile[]
     */
    async bacaDiskKosong() {
        let files = await FileDisk_1.fileDisk.bacaDir('./public/upload');
        let hasil = [];
        for (let i = 0; i < files.length; i++) {
            let item = files[i];
            let type;
            let id;
            if (item.indexOf('gbr_besar') > -1) {
                type = 'besar';
            }
            else if (item.indexOf('gbr_kecil') > -1) {
                type = 'kecil';
            }
            else {
                throw Error('');
            }
            id = await this.bacaBerdasarFileUrl(item, type);
            hasil.push({
                file: item,
                type: type,
                fileId: id
            });
        }
        return hasil;
    }
    async hapusDb(id) {
        return new Promise((resolve, reject) => {
            console.log('hapus file db, id ' + id);
            Connection_1.Connection.pool.query(`DELETE FROM file WHERE ID = ?`, [id], (_err, _rows) => {
                if (_err) {
                    console.error;
                    reject(_err);
                }
                else {
                    resolve(_rows);
                }
            });
        });
    }
}
exports.fileSql = new File();
