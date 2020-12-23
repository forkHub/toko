"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from "fs";
const BarangSql_1 = require("./entity/BarangSql");
const Config_1 = require("./Config");
const Util_1 = require("./Util");
class HalDepan {
    async render(barangData, lapak, hal, jml, kataKunci) {
        console.log('render beranda');
        let index = await Util_1.util.getFile("view/index.html");
        let header = await Util_1.util.getFile("view/header.html");
        let js = await Util_1.util.getFile("view/js.html");
        let cari = await Util_1.util.getFile("view/cari.html");
        let barang = await this.renderBerandaBarang(barangData, lapak);
        let halaman = await this.renderHalaman1(hal, jml, kataKunci);
        header = header.replace("{{nama_toko}}", Config_1.config.namaToko);
        header = header.replace("{{motto}}", "");
        let berandaUrl = "/";
        let hasil = index;
        hasil = hasil.replace("{{cari}}", cari);
        hasil = hasil.replace("{{nav_src}}", berandaUrl);
        hasil = hasil.replace("{{header}}", header);
        hasil = hasil.replace("{{content}}", barang);
        hasil = hasil.replace("{{js}}", js);
        hasil = hasil.replace("{{halaman}}", halaman);
        return hasil;
    }
    //
    async renderHalaman1(hal, jml, kataKunci) {
        let halaman = await Util_1.util.getFile("view/halaman1.html");
        let url = "/cari/" + kataKunci + "/";
        let url2 = '';
        if (0 == hal) {
            return '';
        }
        if (0 == jml) {
            return '';
        }
        url2 = url + "1";
        halaman = halaman.replace("{{pertama}}", "<a href='" + url2 + "'>%lt%lt</a > ");
        url2 = url + (((hal - 1) > 0) ? (hal - 1) : "1");
        halaman = halaman.replace("{{sebelumnya}}", "<a href='" + url2 + "'>%lt</a> ");
        halaman = halaman.replace("{{hal}}", hal + "");
        halaman = halaman.replace("{{jumlah}}", jml + " ");
        url2 = url + (((hal + 1) < jml) ? (hal + 1) : jml);
        halaman = halaman.replace("{{selanjutnya}}", "<a href='" + url2 + "'>%gt</a> ");
        url2 = url + jml;
        halaman = halaman.replace("{{terakhir}}", "<a href='" + url2 + "'>%gt%gt</a> ");
        return halaman;
    }
    async renderBerandaBarang(barangData, lapak = 'auni') {
        let view = await Util_1.util.getFile("view/item.html");
        let hasil = '';
        barangData.forEach((item) => {
            let hasil2 = '';
            hasil2 = (view.replace("{{nama}}", item.nama));
            hasil2 = (hasil2.replace("{{deskripsi}}", item.deskripsi));
            hasil2 = (hasil2.replace("{{deskripsiPanjang}}", item.deskripsi_panjang));
            hasil2 = (hasil2.replace("{{harga}}", item.harga + ''));
            hasil2 = hasil2.replace("{{wa}}", item.wa);
            hasil2 = hasil2.replace("{{wa-link}}", Util_1.util.buatWa(item.wa, item.nama));
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
        let index = await Util_1.util.getFile("view/index.html");
        let header = await Util_1.util.getFile("view/header.html");
        let barangStr = await this.renderBarangDetail(barang);
        let js = await Util_1.util.getFile("view/item-page/js_hal_item.html");
        header = header.replace("{{nama_toko}}", Config_1.config.namaToko);
        header = header.replace("{{motto}}", "");
        // console.log('header');
        // console.log(header);
        // console.log('index:');
        // console.log(index);
        let hasil = index;
        hasil = index.replace("{{header}}", header);
        hasil = hasil.replace("{{cari}}", "");
        hasil = hasil.replace("{{nav_src}}", "/");
        hasil = hasil.replace("{{content}}", barangStr);
        hasil = hasil.replace("{{js}}", js);
        hasil = hasil.replace("{{halaman}}", "");
        console.log('hasil');
        return hasil;
    }
    async renderBarangDetail(barang) {
        let index = await Util_1.util.getFile("view/item-page/item-page.html");
        let hasil = '';
        hasil = index.replace("{{gbrBesar}}", barang.gbr ? barang.gbr : "/");
        hasil = hasil.replace("{{nama}}", barang.nama);
        hasil = hasil.replace("{{harga}}", barang.harga);
        hasil = hasil.replace("{{deskripsiPanjang}}", barang.deskripsi_panjang);
        hasil = hasil.replace("{{wa-link}}", Util_1.util.buatWa(barang.wa, barang.nama));
        return hasil;
    }
}
class Renderer {
    constructor() {
        this._halDepan = new HalDepan();
        this._halBarang = new HalBarang();
    }
    get halDepan() {
        return this._halDepan;
    }
    get halBarang() {
        return this._halBarang;
    }
}
exports.render = new Renderer();
