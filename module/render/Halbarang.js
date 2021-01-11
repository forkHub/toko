"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        let index = await Util_1.util.getFile("view/index.html");
        let header = await Util_1.util.getFile("view/header.html");
        let barangStr = await this.renderBarangDetail(barang[0]);
        let js = await Util_1.util.getFile("view/item-page/js_hal_item.html");
        index = index.replace("{{og_deskripsi}}", "Belanja Mudah, Murah dari Rumah");
        if (lapak && lapak != '') {
            index = index.replace("{{og_url}}", "http://aunistore.com/barang/lapak/" + lapak + "/barang/" + barang[0].id);
            index = index.replace("{{og_gambar}}", "http://aunistore.com" + barang[0].thumb);
            index = index.replace("{{og_title}}", barang[0].nama);
        }
        else {
            index = index.replace("{{og_url}}", "http://aunistore.com/barang/" + barang[0].id);
        }
        header = header.replace("{{nama_toko}}", Config_1.config.getNilai(Config_1.Config.NAMA_TOKO));
        header = header.replace("{{motto}}", "");
        index = index.replace("{{header}}", header);
        index = index.replace("{{cari}}", "");
        index = index.replace("{{nav_beranda}}", this._util.renderNavBeranda(lapak));
        index = index.replace("{{nav_daftar_lapak}}", this._util.renderNavDaftarLapak(lapak));
        index = index.replace("{{content}}", barangStr);
        index = index.replace("{{js}}", js);
        index = index.replace("{{halaman}}", "");
        index = index.replace("{{daftar-barang-cont-class}}", "daftar-barang-cont");
        index = index.replace("{{footer}}", Config_1.config.getNilai(Config_1.Config.FOOTER));
        console.log('hasil');
        return index;
    }
    async renderBarangDetail(barang) {
        let index = await Util_1.util.getFile("view/item-page/item-page.html");
        let hasil = '';
        hasil = index.replace("{{gbrBesar}}", barang.gbr ? barang.gbr : "/");
        hasil = hasil.replace("{{nama}}", barang.nama);
        hasil = hasil.replace("{{harga}}", barang.harga);
        hasil = hasil.replace("{{deskripsiPanjang}}", barang.deskripsi_panjang);
        hasil = hasil.replace("{{wa-link}}", Util_1.util.buatWa(barang.wa, barang.nama));
        hasil = hasil.replace("{{data-id}}", barang.id);
        return hasil;
    }
    set util(value) {
        this._util = value;
    }
}
exports.HalBarang = HalBarang;
