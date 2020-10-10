"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const BarangSql_1 = require("./BarangSql");
class HalDepan {
    async render() {
        console.log('render beranda');
        let index = await Util.getFile("view/index.html");
        let header = await Util.getFile("view/header.html");
        let js = await Util.getFile("view/js.html");
        let barang = await this.renderBerandaBarang();
        let hasil = '';
        hasil = index.replace("{{header}}", header);
        hasil = hasil.replace("{{content}}", barang);
        hasil = hasil.replace("{{js}}", js);
        return hasil;
    }
    async renderBerandaBarang() {
        let view = await Util.getFile("view/item.html");
        let barangData = await BarangSql_1.barangSql.bacaPublish();
        let hasil = '';
        barangData.forEach((item) => {
            let hasil2 = '';
            hasil2 = (view.replace("{{nama}}", item.nama));
            hasil2 = (hasil2.replace("{{deskripsi}}", item.deskripsi));
            hasil2 = (hasil2.replace("{{deskripsiPanjang}}", item.deskripsi_panjang));
            hasil2 = (hasil2.replace("{{harga}}", item.harga + ''));
            hasil2 = hasil2.replace("{{wa}}", item.wa);
            hasil2 = hasil2.replace("{{wa-link}}", 'https://wa.me/' + item.wa + "?text=Assalamualaikum");
            hasil2 = hasil2.replace("{{gbrThumb}}", item.thumb);
            hasil2 = hasil2.replace("{{gbrBesar}}", item.gbr);
            hasil2 = hasil2.replace("{{id}}", item.id);
            hasil += hasil2;
        });
        return hasil;
    }
}
class HalBarang {
    async render(id) {
        console.log('render ' + id);
        let barang = await BarangSql_1.barangSql.bacaId(id);
        let index = await Util.getFile("view/index.html");
        let header = await Util.getFile("view/header.html");
        let barangStr = await this.renderBarangDetail(barang);
        let js = await Util.getFile("view/js_hal_item.html");
        let hasil = index.replace("{{header}}", header);
        hasil = hasil.replace("{{content}}", barangStr);
        hasil = hasil.replace("{{js}}", js);
        console.log('hasil');
        console.log(hasil);
        return hasil;
    }
    async renderBarangDetail(barang) {
        let index = await Util.getFile("view/item-page.html");
        let hasil = '';
        hasil = index.replace("{{gbrBesar}}", barang.gbr);
        console.log('hasil 2');
        console.log(hasil);
        hasil = hasil.replace("{{nama}}", barang.nama);
        hasil = hasil.replace("{{harga}}", barang.harga);
        hasil = hasil.replace("{{deskripsiPanjang}}", barang.deskripsi_panjang);
        hasil = hasil.replace("{{wa-link}}", Util.buatWa(barang.wa));
        return hasil;
    }
}
class Renderer {
    constructor() {
        this.halDepan = new HalDepan();
        this.halBarang = new HalBarang();
    }
    async renderBeranda(tulis = true) {
        let hasil = await this.halDepan.render();
        if (tulis)
            Util.tulisKeFile("public/index.html", hasil);
        return hasil;
    }
    async renderHalBarang(id) {
        return await this.halBarang.render(id);
    }
}
class Util {
    static async getFile(file) {
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
    static async tulisKeFile(path, data) {
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
    static buatWa(wa) {
        return 'https://wa.me/' + wa + "?text=Assalamualaikum";
    }
}
exports.render = new Renderer();
