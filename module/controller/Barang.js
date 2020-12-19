"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BarangSql_1 = require("../entity/BarangSql");
const Renderer_1 = require("../Renderer");
class Barang {
    async update(data, id) {
        BarangSql_1.barangSql.update(data, id);
    }
    /**
    * Cari barang dengan kata kunci dan halaman
    * @param kataKunci
    * @param hal
    */
    async cariBarangGet(kataKunci, hal, lapak) {
        let barangAr = await BarangSql_1.barangSql.cari(kataKunci);
        let jml = await BarangSql_1.barangSql.cariJml(kataKunci);
        return await Renderer_1.render.halDepan.render(barangAr, lapak, hal, jml, kataKunci);
    }
    //TODO: buat api return json
    async cariBarangJSON(kataKunci, hal) {
        let jml = await BarangSql_1.barangSql.cariJml(kataKunci);
        let str = '';
        jml;
        return str;
    }
}
exports.barangController = new Barang();