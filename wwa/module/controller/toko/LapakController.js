"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dao_1 = require("../../entity/Dao");
const Render_1 = require("../../render/Render");
class LapakController {
    async renderHal(id) {
        let hasil;
        let barang;
        barang = await Dao_1.dao.toko.lapak.bacaById(id);
        hasil = Render_1.render.toko.lapak.render(barang);
        return hasil;
    }
}
exports.LapakController = LapakController;
