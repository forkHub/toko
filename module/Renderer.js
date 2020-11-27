"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const BarangSql_1 = require("./entity/BarangSql");
const Config_1 = require("./Config");
class HalDepan {
    async render(barangData, lapak) {
        console.log('render beranda');
        let index = await Util.getFile("view/index.html");
        let header = await Util.getFile("view/header.html");
        let js = await Util.getFile("view/js.html");
        let cari = await Util.getFile("view/cari.html");
        let barang = await this.renderBerandaBarang(barangData, lapak);
        header = header.replace("{{nama_toko}}", Config_1.config.namaToko);
        header = header.replace("{{motto}}", Config_1.config.moto);
        let hasil = index;
        hasil = hasil.replace("{{cari}}", cari);
        hasil = hasil.replace("{{nav_src}}", (("" == lapak) ? "/" : ("/lapak/" + lapak)));
        hasil = hasil.replace("{{header}}", header);
        hasil = hasil.replace("{{content}}", barang);
        hasil = hasil.replace("{{js}}", js);
        return hasil;
    }
    async renderBerandaBarang(barangData, lapak = 'auni') {
        let view = await Util.getFile("view/item.html");
        let hasil = '';
        barangData.forEach((item) => {
            let hasil2 = '';
            hasil2 = (view.replace("{{nama}}", item.nama));
            hasil2 = (hasil2.replace("{{deskripsi}}", item.deskripsi));
            hasil2 = (hasil2.replace("{{deskripsiPanjang}}", item.deskripsi_panjang));
            hasil2 = (hasil2.replace("{{harga}}", item.harga + ''));
            hasil2 = hasil2.replace("{{wa}}", item.wa);
            hasil2 = hasil2.replace("{{wa-link}}", 'https://wa.me/' + item.wa + "?text=Assalamualaikum\n\r[" + item.nama + "]\r\n==========");
            hasil2 = hasil2.replace("{{gbrThumb}}", (item.thumb != null) ? item.thumb : '/gambar/kosong.png');
            hasil2 = hasil2.replace("{{gbrBesar}}", item.gbr);
            hasil2 = hasil2.replace("{{id}}", item.id);
            hasil2 = hasil2.replace("{{lapak}}", lapak);
            hasil += hasil2;
            // console.log("thumb " + item.thumb + "|");
            // console.log("thumb is null " + (item.thumb == null));
            // console.log("thumb is null " + (item.thumb == "null"));
        });
        return hasil;
    }
}
class HalBarang {
    async render(id, lapak) {
        console.log('render ' + id);
        let barang = await BarangSql_1.barangSql.bacaId(id);
        let index = await Util.getFile("view/index.html");
        let header = await Util.getFile("view/header.html");
        let barangStr = await this.renderBarangDetail(barang);
        let js = await Util.getFile("view/item-page/js_hal_item.html");
        header = header.replace("{{nama_toko}}", Config_1.config.namaToko);
        header = header.replace("{{motto}}", Config_1.config.moto);
        let hasil = "";
        hasil = index.replace("{{header}}", header);
        hasil = index.replace("{{cari}}", "");
        if (lapak) {
            hasil = hasil.replace("{{nav_src}}", "/lapak/" + lapak);
        }
        else {
            hasil = hasil.replace("{{nav_src}}", "/");
        }
        hasil = hasil.replace("{{content}}", barangStr);
        hasil = hasil.replace("{{js}}", js);
        console.log('hasil');
        return hasil;
    }
    async renderBarangDetail(barang) {
        let index = await Util.getFile("view/item-page/item-page.html");
        let hasil = '';
        hasil = index.replace("{{gbrBesar}}", barang.gbr ? barang.gbr : "/");
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
    async renderBeranda(barangData, lapak, tulis = false) {
        let hasil = await this.halDepan.render(barangData, lapak);
        if (tulis)
            Util.tulisKeFile("public/index.html", hasil);
        return hasil;
    }
    async renderHalBarang(id, lapak) {
        console.log("render hal barang, id " + id);
        return await this.halBarang.render(id, lapak);
    }
    async renderDaftarBarang(data) {
        return await this.halDepan.renderBerandaBarang(data);
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
