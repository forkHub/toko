"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class FileDisk {
    async bacaFile(dir) {
        return new Promise((_resolve, _reject) => {
            fs_1.default.readdir(dir, (err, files) => {
                if (err) {
                    _reject(err.message);
                }
                else {
                    _resolve(files);
                }
            });
        });
    }
    //TODO: depecreated diganti firebase storage
    async hapusFile(url) {
        console.log('hapus file ' + url);
        return new Promise((resolve, reject) => {
            fs_1.default.unlink(url, (err) => {
                if (err) {
                    console.log(err);
                    resolve();
                }
                resolve();
            });
        });
    }
}
exports.fileDisk = new FileDisk();
