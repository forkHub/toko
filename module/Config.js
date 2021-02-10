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
Config.NAV_LAPAK = 'NODE_NAV_LAPAK';
Config.NAV_LOGIN = 'NODE_NAV_LOGIN';
Config.NAV_CARI = 'NODE_NAV_CARI';
Config.TERKAIT = 'NODE_TERKAIT';
Config.NAMA_TOKO = 'NODE_NAMA_TOKO';
Config.DESKRIPSI_TOKO = 'NODE_DESKRIPSI_TOKO';
Config.JML_PER_HAL = 'NODE_JML_PER_HAL';
Config.FOOTER = 'NODE_FOOTER';
Config.FIRE_BASE_CONFIG = 'NODE_FIRE_BASE_CONFIG';
Config.TOKO_ID = 'NODE_TOKO_ID';
Config.MODE_DEV = 'NODE_MODE_DEV';
Config.WEBSITE = 'NODE_WEB_SITE';
exports.config = new Config();
