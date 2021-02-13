"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const Anggota_1 = require("../entity/Anggota");
const BarangSql_1 = require("../entity/BarangSql");
const Util_1 = require("../Util");
class HalBarang {
    async render(id, lapakId) {
        let opt = {
            id: id
        };
        let barang = await BarangSql_1.barangSql.baca(opt);
        let index = await Util_1.util.getFile("view/index.html");
        let header = await Util_1.util.getFile("view/header_comp.html");
        let barangStr = await this.renderBarangDetail(barang[0]);
        let js = await Util_1.util.getFile("view/item-page/js_hal_item_comp.html");
        //OG
        index = this.renderOg(index, lapakId, barang);
        header = header.replace("{{nama_toko}}", Config_1.config.getNilai(Config_1.Config.NAMA_TOKO));
        header = header.replace("{{motto}}", "");
        index = index.replace("{{header}}", header);
        index = index.replace("{{cari}}", "");
        index = this.renderNav(index, lapakId);
        let anggota;
        if (lapakId != '') {
            anggota = await Anggota_1.anggotaSql.bacaId(lapakId);
            index = await this._util.renderInfoLapak(index, anggota.lapak, anggota.deskripsi);
        }
        else {
            index = index.replace("{{info-lapak}}", '');
        }
        index = index.replace("{{info}}", "");
        index = index.replace("{{content}}", barangStr);
        index = index.replace("{{js}}", js);
        index = index.replace("{{halaman}}", "");
        index = index.replace("{{daftar-barang-cont-class}}", "daftar-barang-cont");
        // index = index.replace("{{footer}}", config.getNilai(Config.FOOTER));
        index = index.replace("{{footer}}", `<p>${anggota.lapak} : ${anggota.alamat} </p>`);
        index = this._util.cache(index, Util_1.util.randId);
        return index;
    }
    renderOg(index, lapakId, barang) {
        index = index.replace("{{og_deskripsi}}", barang[0].deskripsi);
        index = index.replace("{{og_deskripsi}}", barang[0].deskripsi);
        index = index.replace("{{og_site_name}}", Config_1.config.getNilai(Config_1.Config.NAMA_TOKO));
        index = index.replace("{{judul_web}}", Config_1.config.getNilai(Config_1.Config.NAMA_TOKO));
        index = index.replace("{{og_url}}", Config_1.config.getNilai(Config_1.Config.WEBSITE) + "/lapak/" + lapakId + "/barang/" + barang[0].id + "/ref/" + Util_1.util.randId);
        index = index.replace("{{og_title}}", barang[0].nama);
        index = index.replace("{{og_gambar}}", Config_1.config.getNilai(Config_1.Config.WEBSITE) + barang[0].gbr);
        return index;
    }
    renderNav(index, lapak) {
        index = index.replace("{{nav_hal_utama}}", this._util.renderNavTokoUtama);
        index = index.replace("{{nav_beranda}}", this._util.renderNavBeranda(lapak));
        index = index.replace("{{nav_daftar_lapak}}", "");
        index = index.replace("{{nav_login}}", "");
        return index;
    }
    async renderBarangDetail(barang) {
        let index = await Util_1.util.getFile("view/item-page/item-page_comp.html");
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
