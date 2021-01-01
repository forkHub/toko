"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { config } from "process";
const Config_1 = require("../Config");
const BarangSql_1 = require("../entity/BarangSql");
const Util_1 = require("../Util");
class HalBarang {
    async render(id, lapak) {
        console.log('render ' + id);
        let opt = {
            id: id
        };
        let barang = await BarangSql_1.barangSql.baca(opt);
        // console.log(barang);
        // console.log("lapak " + lapak);
        // console.log("gambar " + barang[0].thumb);
        // console.log(barang[0]);
        let index = await Util_1.util.getFile("view/index.html");
        let header = await Util_1.util.getFile("view/header.html");
        let barangStr = await this.renderBarangDetail(barang[0]);
        let js = await Util_1.util.getFile("view/item-page/js_hal_item.html");
        index = index.replace("{{og_deskripsi}}", "Belanja Mudah, Murah dari Rumah");
        if (lapak && lapak != '') {
            index = index.replace("{{og_url}}", "http://aunistore.com/barang/lapak/" + lapak + "/barang/" + barang[0].id);
            index = index.replace("{{og_gambar}}", "http://aunistor.com/" + barang[0].thumb);
            index = index.replace("{{og_title}}", barang[0].nama);
        }
        else {
            index = index.replace("{{og_url}}", "http://aunistore.com/barang/" + barang[0].id);
        }
        header = header.replace("{{nama_toko}}", Config_1.config.namaToko);
        header = header.replace("{{motto}}", "");
        let hasil = index;
        hasil = index.replace("{{header}}", header);
        hasil = hasil.replace("{{cari}}", "");
        if (lapak != '') {
            hasil = hasil.replace("{{nav_src}}", "/lapak/" + lapak);
        }
        else {
            hasil = hasil.replace("{{nav_src}}", "/");
        }
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
exports.HalBarang = HalBarang;
