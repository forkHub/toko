"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BarangSql_1 = require("../entity/BarangSql");
const Renderer_1 = require("../render/Renderer");
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
        let barangAr = await BarangSql_1.barangSql.cari(kataKunci, hal, lapak);
        let jml = await BarangSql_1.barangSql.cariJml(kataKunci);
        return await Renderer_1.render.halDepan.render({
            barangData: barangAr,
            lapak: lapak,
            hal: hal,
            jml: jml,
            kataKunci: kataKunci
        });
    }
    //TODO: buat api return json
    async cariBarangJSON(kataKunci, hal) {
        let jml = await BarangSql_1.barangSql.cariJml(kataKunci);
        let str = '';
        jml;
        return str;
    }
    async lihat(id, lapak) {
        let hasil = await Renderer_1.render.halBarang.render(id, lapak);
        //update item
        BarangSql_1.barangSql.updateLastViewDate(id).catch((e) => {
            console.log(e);
        });
        return hasil;
    }
}
exports.barangController = new Barang();
