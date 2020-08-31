"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const BarangSql_1 = require("./BarangSql");
class Renderer {
    static getFile(file) {
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
    static replaceAll(teksSumber, kataKunci, pengganti) {
        let hasil;
        while (true) {
            hasil = teksSumber.replace(kataKunci, pengganti);
            if (hasil == teksSumber) {
                return hasil;
            }
            else {
                teksSumber = hasil;
            }
        }
    }
    static async renderItem() {
        let view = await Renderer.getFile("view/item.html");
        let barangData = await BarangSql_1.barangSql.bacaPublish();
        let hasil = '';
        barangData.forEach((item) => {
            console.log(item.thumb);
            console.log(item.gbr);
            let hasil2 = '';
            hasil2 = (view.replace("{{nama}}", item.nama));
            hasil2 = (hasil2.replace("{{deskripsi}}", item.deskripsi));
            hasil2 = (hasil2.replace("{{deskripsiPanjang}}", item.deskripsi_panjang));
            hasil2 = (hasil2.replace("{{harga}}", item.harga + ''));
            hasil2 = hasil2.replace("{{wa}}", item.wa);
            hasil2 = hasil2.replace("{{wa-link}}", 'https://wa.me/' + item.wa + "?text=Assalamualaikum");
            hasil2 = hasil2.replace("{{gbrThumb}}", item.thumb);
            hasil2 = hasil2.replace("{{gbrBesar}}", item.gbr);
            hasil += hasil2;
        });
        return hasil;
    }
    static async renderHtml() {
        let view = await Renderer.getFile("view/index.html");
        let hasil = await Renderer.renderItem();
        hasil = view.replace("{{content}}", hasil);
        return hasil;
    }
    static async writeHtml(path, data) {
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
}
exports.Renderer = Renderer;
