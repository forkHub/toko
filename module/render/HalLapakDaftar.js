"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
const Config_1 = require("../Config");
// import { configController } from "../ConfigController";
class HalDaftarLapak {
    async render(opt) {
        console.log('render halaman daftar lapak');
        console.log(opt);
        let index = await Util_1.util.getFile("view/index.html");
        let header = await Util_1.util.getFile("view/header.html");
        let lapakStr = await this.renderLapak(opt.lapakData);
        lapakStr = `<h2>Daftar Lapak: </h2>` + lapakStr;
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
        header = header.replace("{{nama_toko}}", Config_1.config.getNilai(Config_1.Config.NAMA_TOKO));
        header = header.replace("{{motto}}", "");
        index = index.replace("{{nav_hal_utama}}", '');
        index = index.replace("{{nav_beranda}}", this._renderUtil.renderNavBeranda(opt.lapakId));
        index = index.replace("{{nav_daftar_lapak}}", "");
        index = index.replace("{{nav_login}}", ``);
        index = index.replace("{{cari}}", "");
        index = index.replace("{{header}}", header);
        index = index.replace("{{content}}", lapakStr);
        index = index.replace("{{js}}", "");
        index = index.replace("{{halaman}}", "");
        index = index.replace("{{daftar-barang-cont-class}}", "daftar-barang-cont-lapak");
        index = index.replace("{{footer}}", Config_1.config.getNilai(Config_1.Config.FOOTER));
        index = this._renderUtil.cache(index, Util_1.util.randId);
        console.log('render hal daftar lapak selesai');
        return index;
    }
    async renderLapak(lapakAr) {
        let view = await Util_1.util.getFile("view/daftar_lapak.html");
        let hasil = '';
        lapakAr.forEach((item) => {
            let view2 = view;
            view2 = view2.replace("{{url}}", "/lapak/" + item.id);
            view2 = view2.replace("{{nama}}", item.lapak);
            view2 = view2.replace("{{deskripsi}}", item.deskripsi ? item.deskripsi : ' - deskripsi tidak tersedia - ');
            hasil += view2;
        });
        if (hasil == '') {
            return `<p>Tidak ada lapak yang terdaftar</p>`;
        }
        return hasil;
    }
    set renderUtil(value) {
        this._renderUtil = value;
    }
}
exports.HalDaftarLapak = HalDaftarLapak;
