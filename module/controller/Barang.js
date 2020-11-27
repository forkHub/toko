"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BarangSql_1 = require("../entity/BarangSql");
const Renderer_1 = require("../Renderer");
class Barang {
    async update(data, id) {
        BarangSql_1.barangSql.update(data, id);
    }
    async cariBarang(kataKunci) {
        let barangAr = await BarangSql_1.barangSql.cari(kataKunci);
        let str = '';
        // logT.log('hasil cari barang, jml ' + barangAr.length);
        // logT.log(barangAr);
        str = await Renderer_1.render.renderDaftarBarang(barangAr);
        // logT.log('hasil render:');
        // logT.log(str);
        return str;
    }
}
exports.barangController = new Barang();
