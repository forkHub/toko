"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
const Config_1 = require("../Config");
class HalDaftarLapak {
    async render(opt) {
        console.log('render halaman daftar lapak');
        console.log(opt);
        let index = await Util_1.util.getFile("view/index.html");
        let header = await Util_1.util.getFile("view/header.html");
        let lapakStr = await this.renderLapak(opt.lapakData);
        if (opt.lapakId && opt.lapakId != '') {
            index = index.replace("{{og_deskripsi}}", "Belanja Mudah, Murah dari Rumah");
            index = index.replace("{{og_gambar}}", "");
            index = index.replace("{{og_url}}", "http://aunistore.com/lapak/" + opt.lapakId);
        }
        else {
            index = index.replace("{{og_deskripsi}}", "Belanja Mudah, Murah dari Rumah");
            index = index.replace("{{og_gambar}}", "");
            index = index.replace("{{og_url}}", "http://aunistore.com");
        }
        header = header.replace("{{nama_toko}}", Config_1.config.namaToko);
        header = header.replace("{{motto}}", "");
        let berandaUrl = "/";
        if (opt.lapakId != '') {
            berandaUrl = '/lapak/' + opt.lapakId;
        }
        else {
            berandaUrl = '/';
        }
        let lapakUrl = "/daftarlapak";
        if (opt.lapakId != '') {
            lapakUrl = `/lapak/${opt.lapakId}/daftar`;
        }
        let hasil = index;
        hasil = hasil.replace("{{cari}}", "");
        hasil = hasil.replace("{{nav_src}}", berandaUrl);
        hasil = hasil.replace("{{lapak_daftar_src}}", lapakUrl);
        hasil = hasil.replace("{{header}}", header);
        hasil = hasil.replace("{{content}}", lapakStr);
        hasil = hasil.replace("{{js}}", "");
        hasil = hasil.replace("{{halaman}}", "");
        hasil = hasil.replace("{{daftar-barang-cont-class}}", "daftar-barang-cont-lapak");
        console.log('render hal daftar lapak selesai');
        return hasil;
    }
    async renderLapak(lapakAr) {
        let view = await Util_1.util.getFile("view/daftar_lapak.html");
        let hasil = '';
        lapakAr.forEach((item) => {
            let view2 = view;
            view2 = view2.replace("{{url}}", "/lapak/" + item.id);
            view2 = view2.replace("{{nama}}", item.lapak);
            view2 = view2.replace("{{deskripsi}}", item.deskripsi);
            hasil += view2;
        });
        return hasil;
    }
}
exports.HalDaftarLapak = HalDaftarLapak;
