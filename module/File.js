"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./Connection");
const fs_1 = __importDefault(require("fs"));
const Log_1 = require("./Log");
class File {
    constructor() {
        this.qsemua = ``;
        this.qfileTanpaReferensi = ``;
        this.qsemua; //TODO:
        this.qfileTanpaReferensi; //TODO:
    }
    async bacaId(id) {
        return null;
    }
    async baru(gbrBesarData, gbrBesarNama, gbrKecilData, gbrKecilNama) {
        return new Promise((resolve, reject) => {
            let buf;
            let folderUnggah = './public/upload/';
            let folderUrlUnggah = '/upload/';
            //simpan gambar besar;
            buf = Buffer.from(gbrBesarData, 'base64');
            fs_1.default.writeFileSync(folderUnggah + gbrBesarNama, buf);
            Log_1.logW.info('file written ' + folderUnggah + gbrBesarNama);
            //simpan gambar kecil
            buf = Buffer.from(gbrKecilData, 'base64');
            fs_1.default.writeFileSync(folderUnggah + gbrKecilNama, buf);
            Log_1.logW.info('file written ' + folderUnggah + gbrKecilNama);
            //simpan ke database
            Connection_1.Connection.pool.query(`INSERT INTO FILE SET ?
				`, {
                thumb: folderUrlUnggah + gbrKecilNama,
                gbr: folderUrlUnggah + gbrBesarNama
            }, (_err, _rows) => {
                if (_err) {
                    Log_1.logW.info(_err.code + '/' + _err.message);
                    reject(_err);
                }
                else {
                    Log_1.logW.info('ok');
                    resolve(_rows);
                }
            });
        });
    }
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
}
exports.file = new File();
