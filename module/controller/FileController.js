"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Connection } from "../Connection";
const TokoLog_1 = require("../TokoLog");
const fs_1 = __importDefault(require("fs"));
const FStorage_1 = require("../FStorage");
const FileDisk_1 = require("../entity/FileDisk");
const File_1 = require("../entity/File");
// import { file } from "../entity/File";
class FileController {
    async baru(gbrBesarNama, gbrKecilNama, dataBesar, dataKecil) {
        let buf;
        let folderUnggah = 'public/upload/';
        let downloadUrlBesar;
        let downloadUrlKecil;
        //simpan gbr besar
        buf = Buffer.from(dataBesar, 'base64');
        await this.tulisFile("./" + folderUnggah + gbrBesarNama, buf);
        downloadUrlBesar = await FStorage_1.fstorage.uploadFile(folderUnggah + gbrBesarNama, folderUnggah + gbrBesarNama);
        FileDisk_1.fileDisk.hapusFile("./" + folderUnggah + gbrBesarNama);
        TokoLog_1.logT.log('file written ' + folderUnggah + gbrBesarNama);
        //simpan gambar kecil
        buf = Buffer.from(dataKecil, 'base64');
        fs_1.default.writeFileSync(folderUnggah + gbrKecilNama, buf);
        await this.tulisFile("./" + folderUnggah + gbrKecilNama, buf);
        downloadUrlKecil = await FStorage_1.fstorage.uploadFile(folderUnggah + gbrKecilNama, folderUnggah + gbrKecilNama);
        FileDisk_1.fileDisk.hapusFile("./" + folderUnggah + gbrKecilNama);
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
