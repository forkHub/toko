"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.settingAr = [];
        this.settingAr = [{
                key: Config.NAV_LAPAK,
                nilai: '0',
                deskripsi: 'Tampilkan navigasi lapak di halaman depan'
            },
            {
                key: Config.TERKAIT,
                nilai: '0',
                deskripsi: 'Tampilkan barang terkait'
            },
            {
                key: Config.NAMA_TOKO,
                nilai: 'Auni Store',
                deskripsi: 'Nama toko'
            },
            {
                key: Config.JML_PER_HAL,
                nilai: '25',
                deskripsi: 'Jumlah item per halaman'
            },
            {
                key: Config.FOOTER,
                nilai: `<H3>Auni Store</H3>Perum Taman Melati Blok FE 07 Bojong Sari - Sawangan - Depok<br/><br/>`,
                deskripsi: 'Jumlah item per halaman'
            }
        ];
    }
    getNilai(key) {
        for (let i = 0; i < this.settingAr.length; i++) {
            if (this.settingAr[i].key == key) {
                return this.settingAr[i].nilai;
            }
        }
        throw new Error('key tidak ketemu: ' + key);
    }
}
exports.Config = Config;
//key
Config.NAV_LAPAK = 'nav lapak';
Config.TERKAIT = 'terkait';
Config.NAMA_TOKO = 'nama_toko';
Config.JML_PER_HAL = 'jumlah per halaman';
Config.FOOTER = 'footer';
exports.config = new Config();
// interface IConfig {
// 	sofwan: boolean,
// 	namaToko: string,
// 	moto: string,
// 	jmlPerHal: number,
// 	base: string
// }
// export var config: IConfig = {
// 	sofwan: false,
// 	jmlPerHal: 25,
// 	base: 'http://localhost/',
// 	namaToko: 'Auni Store',
// 	moto: 'Belanja cepat, mudah, murah dari rumah'
// } 
