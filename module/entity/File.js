"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("../Connection");
const fs_1 = __importDefault(require("fs"));
const TokoLog_1 = require("../TokoLog");
const FileDisk_1 = require("./FileDisk");
// import { barangSql } from "./BarangSql";
class File {
    constructor() {
        this.qsemua = ``;
        this.qfileTanpaReferensi = ``;
        this.qsemua; //TODO:
        this.qfileTanpaReferensi; //TODO:
    }
    async bacaId(id) {
        return new Promise((resolve, reject) => {
            console.log('baca file by id ' + id);
            Connection_1.Connection.pool.query(`SELECT * FROM file WHERE id = ?`, [id], (_err, _rows) => {
                if (_err) {
                    TokoLog_1.logT.log(_err.code + '/' + _err.message);
                    reject(_err);
                }
                else {
                    TokoLog_1.logT.log('ok');
                    resolve(_rows[0]);
                }
            });
        });
    }
    async baru(gbrBesarData, gbrBesarNama, gbrKecilData, gbrKecilNama) {
        return new Promise((resolve, reject) => {
            let buf;
            let folderUnggah = './public/upload/';
            let folderUrlUnggah = '/upload/';
            //simpan gambar besar;
            buf = Buffer.from(gbrBesarData, 'base64');
            fs_1.default.writeFileSync(folderUnggah + gbrBesarNama, buf);
            TokoLog_1.logT.log('file written ' + folderUnggah + gbrBesarNama);
            //simpan gambar kecil
            buf = Buffer.from(gbrKecilData, 'base64');
            fs_1.default.writeFileSync(folderUnggah + gbrKecilNama, buf);
            TokoLog_1.logT.log('file written ' + folderUnggah + gbrKecilNama);
            //simpan ke database
            Connection_1.Connection.pool.query(`INSERT INTO FILE SET ?
				`, {
                thumb: folderUrlUnggah + gbrKecilNama,
                gbr: folderUrlUnggah + gbrBesarNama
            }, (_err, _rows) => {
                if (_err) {
                    TokoLog_1.logT.log(_err.code + '/' + _err.message);
                    reject(_err);
                }
                else {
                    TokoLog_1.logT.log('ok');
                    resolve(_rows);
                }
            });
        });
    }
    //TODO:
    async tanpaReferensi() {
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
    async bacaBerdasarThumb(thumb) {
        return new Promise((resolve, reject) => {
            console.log('baca file berdasar thumb ' + thumb);
            Connection_1.Connection.pool.query(`SELECT id FROM file WHERE thumb = ?`, thumb, (_err, _rows) => {
                if (_err) {
                    TokoLog_1.logT.log(_err.code + '/' + _err.message);
                    reject(_err);
                }
                else {
                    TokoLog_1.logT.log('ok');
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
                    TokoLog_1.logT.log(_err.code + '/' + _err.message);
                    reject(_err);
                }
                else {
                    TokoLog_1.logT.log('ok');
                    resolve(_rows[0]);
                }
            });
        });
    }
    async bacaBerdasarFile(item, type = 'kecil') {
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
        console.log('hapus');
        console.log('file');
        console.log(file);
        console.log('hapus db id ' + id);
        await this.hapusDb(id);
        console.log('hapus file, thumb ' + file.thumb);
        await FileDisk_1.fileDisk.hapusFile('./public' + file.thumb);
        console.log('hapus file, gbr ' + file.gbr);
        await FileDisk_1.fileDisk.hapusFile('./public' + file.gbr);
    }
    async bacaDiskKosong() {
        let files = await FileDisk_1.fileDisk.bacaFile('./public/upload');
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
            id = await this.bacaBerdasarFile(item, type);
            hasil.push({
                file: item,
                type: type,
                fileId: id
            });
        }
        return hasil;
    }
    //TODO:
    async bacaFileKosong() {
        return [];
    }
    async hapusDb(id) {
        return new Promise((resolve, reject) => {
            TokoLog_1.logT.log('hapus file db, id ' + id);
            Connection_1.Connection.pool.query(`DELETE FROM file WHERE ID = ?`, [id], (_err, _rows) => {
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
exports.file = new File();
