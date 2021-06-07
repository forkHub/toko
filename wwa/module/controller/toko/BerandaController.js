"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const BerandaSql_1 = require("../../entity/toko/BerandaSql");
const Renderer_1 = require("../../render/Renderer");
class BerandaController {
    /**
     * Render halaman depan
     * @returns string
     */
    async renderBeranda(hal) {
        let limit = (Config_1.config.jmlPerHal);
        let offset = hal * limit;
        let data = await BerandaSql_1.berandaSql.semuaBarang(offset);
        let jmlBarang = await BerandaSql_1.berandaSql.jmlBarang();
        return Renderer_1.renderer.halDepan.render(data, hal, jmlBarang);
    }
    async renderDaftarLapak() {
        let data = await BerandaSql_1.berandaSql.daftarLapak();
        return Renderer_1.renderer.halDaftarLapak.render(data);
    }
    /**
     * cari barang
     */
    async cariBarang(kataKunci, hal) {
        // let dataBarang: IBarangObj[];
        // let jmlBarang: number = 0;
        // let limit: number = parseInt(config.getNilai(Config.JML_PER_HAL));
        // let halAbsolute: number = hal * limit;
        // jmlBarang = await barangSql.jumlahHasilPencarian(decodeURI(kataKunci), limit, halAbsolute);
        // dataBarang = await barangSql.cariBarang(decodeURI(kataKunci), limit, halAbsolute);
        // dataBarang;
        // jmlBarang;
        kataKunci;
        hal;
        return ''; //TODO:
        // return render.halDepan.render(dataBarang, hal, jmlBarang, kataKunci);
    }
}
exports.berandaController = new BerandaController();
