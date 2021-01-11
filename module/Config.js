"use strict";
//NOTE: FINAL
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.settingAr = [];
        this.settingAr = [{
                kunci: Config.NAV_LAPAK,
                nilai: '0',
                deskripsi: 'Tampilkan navigasi lapak di halaman depan'
            },
            {
                kunci: Config.TERKAIT,
                nilai: '0',
                deskripsi: 'Tampilkan barang terkait'
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
Config.TERKAIT = 'terkait';
Config.NAMA_TOKO = 'nama_toko';
Config.JML_PER_HAL = 'jml_per_hal';
Config.FOOTER = 'footer';
exports.config = new Config();
