"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Util {
    constructor() {
        this.caches = [];
    }
    buatDate() {
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    ambilDariCache(url) {
        let hasil = '';
        this.caches.forEach((item) => {
            if (item.url === url) {
                hasil = item.string;
            }
        });
        return hasil;
    }
    hapusCache() {
        this.caches = [];
    }
    async getFile(file) {
        return new Promise((resolve, reject) => {
            let cache;
            cache = this.ambilDariCache(file);
            if (cache != '') {
                console.log('ambil dari cache ' + file);
                resolve(cache);
            }
            fs_1.default.readFile(file, (err, content) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    this.caches.push({
                        url: file,
                        string: content.toString()
                    });
                    resolve(content.toString());
                }
            });
        });
    }
    async tulisKeFile(path, data) {
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(path, data, (err) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve();
                }
            });
        });
    }
    buatWa(wa, namaBarang) {
        return 'https://wa.me/' + wa + "?text==========%0D%0A" + namaBarang + "%0D%0A=========%0D%0AAssalamu'alaikum:";
    }
}
exports.util = new Util();
