"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const File_1 = require("./draf/File");
const Kons_1 = require("../Kons");
class FileController {
    async baru(gbrBesarNama, gbrKecilNama, dataBesar, dataKecil) {
        let buf;
        let downloadUrlBesar;
        let downloadUrlKecil;
        downloadUrlBesar = Kons_1.kons.folder_download + '/' + gbrBesarNama;
        downloadUrlKecil = Kons_1.kons.folder_download + '/' + gbrKecilNama;
        //simpan gbr besar
        buf = Buffer.from(dataBesar, 'base64');
        await this.tulisFile(Kons_1.kons.folder_upload + "/" + gbrBesarNama, buf);
        console.log('file written ' + Kons_1.kons.folder_upload + "/" + gbrBesarNama);
        //simpan gambar kecil
        buf = Buffer.from(dataKecil, 'base64');
        await this.tulisFile(Kons_1.kons.folder_upload + "/" + gbrKecilNama, buf);
        console.log('file written ' + Kons_1.kons.folder_upload + "/" + gbrKecilNama);
        let _rows = await File_1.fileSql.baru(downloadUrlBesar, downloadUrlKecil);
        return {
            baris: _rows
        };
    }
    async tulisFile(p, data) {
        console.log('tulis file');
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
