"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokoLog_1 = require("../TokoLog");
const fs_1 = __importDefault(require("fs"));
const File_1 = require("../entity/File");
class FileController {
    async baru(gbrBesarNama, gbrKecilNama, dataBesar, dataKecil) {
        let buf;
        let folderUnggah = './public/upload/';
        let downloadUrlBesar;
        let downloadUrlKecil;
        downloadUrlBesar = '/upload/' + gbrBesarNama;
        downloadUrlKecil = '/upload/' + gbrKecilNama;
        //simpan gbr besar
        buf = Buffer.from(dataBesar, 'base64');
        await this.tulisFile(folderUnggah + gbrBesarNama, buf);
        TokoLog_1.logT.log('file written ' + folderUnggah + gbrBesarNama);
        //simpan gambar kecil
        buf = Buffer.from(dataKecil, 'base64');
        await this.tulisFile(folderUnggah + gbrKecilNama, buf);
        TokoLog_1.logT.log('file written ' + folderUnggah + gbrKecilNama);
        let _rows = await File_1.fileSql.baru(downloadUrlBesar, downloadUrlKecil);
        return {
            baris: _rows
        };
    }
    async tulisFile(p, data) {
        console.log('tulis file');
        console.log(p);
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(p, data, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.fileController = new FileController();
