"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
const Config_1 = require("../Config");
const Anggota_1 = require("../entity/Anggota");
class HalDepan {
    set util(value) {
        this._util = value;
    }
    async render(opt) {
        let index = await Util_1.util.getFile("view/index.html");
        let header = await Util_1.util.getFile("view/header_comp.html");
        let js = await Util_1.util.getFile("view/js_comp.html");
        let cari = await Util_1.util.getFile("view/cari_comp.html");
        let barang;
        let halaman = await this.renderHalaman1(opt.hal, opt.jml, opt.kataKunci);
        let anggota;
        if (opt.lapakId != '') {
            anggota = await Anggota_1.anggotaSql.bacaId(opt.lapakId);
            index = await this._util.renderInfoLapak(index, anggota.lapak, anggota.deskripsi);
            barang = await this.renderBerandaBarang(opt.barangData, false, '');
        }
        else {
            barang = await this.renderBerandaBarang(opt.barangData, false, '');
            index = index.replace("{{info-lapak}}", '');
        }
        index = await this.renderOg(index, opt);
        header = header.replace("{{nama_toko}}", Config_1.config.getNilai(Config_1.Config.NAMA_TOKO));
        header = header.replace("{{motto}}", "");
        index = this.renderNav(index, opt, cari);
        //info jika data kosong
        index = this.renderInfo(index, opt);
        index = index.replace("{{header}}", header);
        index = index.replace("{{content}}", barang);
        index = index.replace("{{js}}", js);
        index = index.replace("{{halaman}}", halaman);
        index = index.replace("{{daftar-barang-cont-class}}", "daftar-barang-cont");
        if (opt.lapakId) {
            index = index.replace("{{footer}}", `<p>${anggota.lapak} : ${anggota.alamat} </p>`);
        }
        else {
            index = index.replace("{{footer}}", Config_1.config.getNilai(Config_1.Config.FOOTER));
        }
        //cache
        index = this._util.cache(index, Util_1.util.randId);
        return index;
    }
    renderInfo(index, opt) {
        if (opt.barangData.length == 0) {
            if (!opt.kataKunci || opt.kataKunci == '') {
                index = index.replace("{{info}}", "Belum ada barang yang dijual");
                index = index.replace("{{class_info}}", "isi");
            }
            else {
                index = index.replace("{{info}}", "Pencarian tidak menemukan hasil");
                index = index.replace("{{class_info}}", "isi");
            }
        }
        else {
            if (opt.kataKunci && opt.kataKunci != '') {
                index = index.replace("{{info}}", "Hasil pencarian dengan kata kunci: " + opt.kataKunci);
                index = index.replace("{{class_info}}", "isi");
            }
            else {
                index = index.replace("{{info}}", "");
                index = index.replace("{{class_info}}", "");
            }
        }
        return index;
    }
    renderNav(index, opt, cari) {
        if (Config_1.config.getNilai(Config_1.Config.NAV_CARI) == '1' && opt.lapakId == '') {
            cari = cari.replace("{{lapak}}", opt.lapakId);
            index = index.replace("{{cari}}", cari);
        }
        else {
            index = index.replace("{{cari}}", "");
        }
        //navigasi hal utama
        if (opt.kataKunci && opt.kataKunci != '') {
            index = index.replace("{{nav_hal_utama}}", "");
        }
        else {
            index = index.replace("{{nav_hal_utama}}", this._util.renderNavTokoUtama(opt.lapakId) + " ");
        }
        //navigasi beranda
        if (opt.kataKunci && opt.kataKunci != '') {
            index = index.replace("{{nav_beranda}}", this._util.renderNavBeranda(opt.lapakId));
        }
        else {
            index = index.replace("{{nav_beranda}}", "");
        }
        //navigasi lapak
        if (Config_1.config.getNilai(Config_1.Config.NAV_LAPAK) == '1') {
            if (opt.kataKunci && opt.kataKunci != '') {
                index = index.replace("{{nav_daftar_lapak}}", "");
            }
            else {
                index = index.replace("{{nav_daftar_lapak}}", this._util.renderNavDaftarLapak(opt.lapakId));
            }
        }
        else {
            index = index.replace("{{nav_daftar_lapak}}", "");
        }
        if (Config_1.config.getNilai(Config_1.Config.NAV_LOGIN) == "1") {
            index = index.replace("{{nav_login}}", `<a href='/admin'>LOGIN</a>`);
        }
        else {
            index = index.replace("{{nav_login}}", ``);
        }
        return index;
    }
    async renderOg(index, opt) {
        index = index.replace("{{og_site_name}}", Config_1.config.getNilai(Config_1.Config.NAMA_TOKO));
        index = index.replace("{{judul_web}}", Config_1.config.getNilai(Config_1.Config.NAMA_TOKO));
        if (opt.lapakId && opt.lapakId != '') {
            let lapak = await Anggota_1.anggotaSql.baca({ id: opt.lapakId });
            index = index.replace("{{og_deskripsi}}", lapak[0].deskripsi);
            index = index.replace("{{og_gambar}}", "");
            index = index.replace("{{og_url}}", Config_1.config.getNilai(Config_1.Config.WEBSITE) + "/lapak/" + opt.lapakId);
            index = index.replace("{{og_title}}", lapak[0].lapak);
        }
        else {
            index = index.replace("{{og_deskripsi}}", Config_1.config.getNilai(Config_1.Config.DESKRIPSI_TOKO));
            index = index.replace("{{og_gambar}}", "");
            index = index.replace("{{og_url}}", Config_1.config.getNilai(Config_1.Config.WEBSITE));
            index = index.replace("{{og_title}}", Config_1.config.getNilai(Config_1.Config.NAMA_TOKO));
        }
        return index;
    }
    //
    async renderHalaman1(hal, jml, kataKunci) {
        let halaman = await Util_1.util.getFile("view/halaman1_comp.html");
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
    async renderBerandaBarang(barangData, depan, namaLapak) {
        let view = await Util_1.util.getFile("view/item_comp.html");
        let hasil = '';
        barangData.forEach((item) => {
            let url = '/barang/' + item.id;
            let hasil2 = '';
            url = '/lapak/' + item.lapak_id + '/barang/' + item.id;
            hasil2 = (view.replace("{{nama}}", item.nama));
            hasil2 = hasil2.replace("{{url}}", url);
            hasil2 = (hasil2.replace("{{deskripsi}}", ""));
            hasil2 = (hasil2.replace("{{deskripsiPanjang}}", item.deskripsi_panjang));
            hasil2 = (hasil2.replace("{{harga}}", (depan ? namaLapak : item.harga + '')));
            hasil2 = hasil2.replace("{{wa}}", item.wa);
            hasil2 = hasil2.replace("{{wa-link}}", Util_1.util.buatWa(item.wa, item.nama));
            hasil2 = hasil2.replace("{{gbrThumb}}", (item.thumb != null) ? item.thumb : '/gambar/kosong.png');
            hasil2 = hasil2.replace("{{gbrBesar}}", item.gbr);
            hasil2 = hasil2.replace("{{id}}", item.id);
            hasil2 = hasil2.replace("{{lapak}}", item.lapak_id);
            hasil += hasil2;
        });
        if (hasil == '') {
            hasil = "<p>Belum Ada Barang</p>";
        }
        return hasil;
    }
}
exports.HalDepan = HalDepan;
