"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class FileDisk {
    async bacaDir(dir) {
        return new Promise((_resolve, _reject) => {
            fs_1.default.readdir(dir, (err, files) => {
                if (err) {
                    _reject(err);
                }
                else {
                    _resolve(files);
                }
            });
        });
    }
    async hapusFile(url) {
        return new Promise((resolve, _reject) => {
            fs_1.default.unlink(url, (err) => {
                if (err) {
                    console.error(err);
                    _reject(err);
                }
                resolve();
            });
        });
    }
}
exports.fileDisk = new FileDisk();
