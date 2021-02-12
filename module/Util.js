"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Config_1 = require("./Config");
// import { config } from "process";
class Util {
    constructor() {
        this.caches = [];
        this._randId = '';
    }
    buatDate() {
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    buatDateLama() {
        let date = new Date(1900, 1, 1);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    arr2String(ar) {
        let hasil = ' ';
        ar.forEach((item, idx) => {
            if (0 === idx) {
                hasil += item;
            }
            else {
                hasil += " ," + item;
            }
        });
        hasil += ' ';
        return hasil;
    }
    buatRandom() {
        this._randId = '';
        for (let i = 0; i < 10; i++) {
            this._randId += (Math.floor(Math.random() * 10) + '');
        }
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
    async getFileNoCache(file) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(file, (err, content) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(content.toString());
                }
            });
        });
    }
    async getFile(file) {
        return new Promise((resolve, reject) => {
            let cache;
            if (Config_1.config.getNilai(Config_1.Config.MODE_DEV) == "1") {
                cache = '';
            }
            else {
                cache = this.ambilDariCache(file);
            }
            if (cache != '') {
                cache = cache.replace('{{revisi}}', Util.revisi);
                resolve(cache);
            }
            fs_1.default.readFile(file, (err, content) => {
                if (err) {
                    reject(err);
                }
                else {
                    this.caches.push({
                        url: file,
                        string: content.toString()
                    });
                    resolve(content.toString().replace('{{revisi}}', Util.revisi));
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
    get randId() {
        return this._randId;
    }
}
Util.revisi = '002';
exports.util = new Util();
