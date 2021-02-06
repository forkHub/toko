"use strict";
//NOTE: FINAL
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.settingAr = [];
        this.settingAr = [
            {
                kunci: Config.NAV_LAPAK,
                nilai: '0',
                deskripsi: 'Tampilkan navigasi lapak di halaman depan'
            },
            {
                kunci: Config.TERKAIT,
                nilai: '0',
                deskripsi: 'Aktifkan barang terkait'
            },
            {
                kunci: Config.NAMA_TOKO,
                nilai: 'Auni Store',
                deskripsi: 'Nama toko'
            },
            {
                kunci: Config.JML_PER_HAL,
                nilai: '25',
                deskripsi: 'Jumlah item per halaman'
            },
            {
                kunci: Config.FOOTER,
                nilai: `<H3>Auni Store</H3>Perum Taman Melati Blok FE 07 Bojong Sari - Sawangan - Depok<br/><br/>`,
                deskripsi: 'Footer'
            },
            {
                kunci: Config.NAV_LOGIN,
                nilai: `1`,
                deskripsi: 'Tampilkan menu login'
            },
            {
                kunci: Config.NAV_CARI,
                nilai: `1`,
                deskripsi: 'Tampilkan menu Pencarian'
            },
            {
                kunci: Config.FIRE_BASE_CONFIG,
                nilai: ``,
                deskripsi: 'firebase config'
            },
            {
                kunci: Config.TOKO_ID,
                nilai: '1',
                deskripsi: 'id dari toko applikasi'
            },
            {
                kunci: Config.MODE_DEV,
                nilai: '0',
                deskripsi: 'mode development atau produksi'
            },
            {
                kunci: Config.WEBSITE,
                nilai: 'http://warungwa.hagarden.xyz',
                deskripsi: 'web site buat share'
            }
        ];
    }
    bacaSemua() {
        return this.settingAr;
    }
    updateNilai(key, nilai) {
        this.getSetting(key).nilai = nilai;
    }
    getSetting(key) {
        for (let i = 0; i < this.settingAr.length; i++) {
            if (this.settingAr[i].kunci == key) {
                return this.settingAr[i];
            }
        }
        return null;
    }
    getNilai(key) {
        for (let i = 0; i < this.settingAr.length; i++) {
            if (this.settingAr[i].kunci == key) {
                return this.settingAr[i].nilai;
            }
        }
        throw new Error('key tidak ketemu: ' + key);
    }
}
exports.Config = Config;
Config.NAV_LAPAK = 'nav_lapak';
Config.NAV_LOGIN = 'nav_login';
Config.NAV_CARI = 'nav_cari';
Config.TERKAIT = 'terkait';
Config.NAMA_TOKO = 'nama_toko';
Config.JML_PER_HAL = 'jml_per_hal';
Config.FOOTER = 'footer';
Config.FIRE_BASE_CONFIG = 'firebase_config';
Config.TOKO_ID = 'toko_id';
Config.MODE_DEV = 'mode development';
Config.WEBSITE = 'website_url';
exports.config = new Config();
