"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BarangSql_1 = require("../entity/BarangSql");
const Renderer_1 = require("../Renderer");
class Beranda {
    /**
     * halaman depan
     */
    async halamanDepan(hal, lapak, kataKunci) {
        let data = await BarangSql_1.barangSql.bacaPublish();
        let jml = 0; //TODO: diganti dengan jumlah barang sesungguhnya
        return Renderer_1.render.halDepan.render(data, lapak, hal, jml, kataKunci);
    }
}
exports.berandaController = new Beranda();
