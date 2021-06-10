"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dao_1 = require("../../entity/Dao");
const Render_1 = require("../../render/Render");
class LapakController {
    async renderHal(id) {
        let hasil;
        let barang;
        let nama;
        let lapakObj;
        barang = await Dao_1.dao.toko.lapak.bacaBarangByLapakid(id);
        lapakObj = await Dao_1.dao.toko.lapak.namaLapak(id);
        nama = (lapakObj[0]).lapak;
        hasil = Render_1.render.toko.lapak.render(barang, nama);
        return hasil;
    }
}
exports.LapakController = LapakController;
