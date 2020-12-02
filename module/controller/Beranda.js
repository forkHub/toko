"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BarangSql_1 = require("../entity/BarangSql");
const Renderer_1 = require("../Renderer");
class Beranda {
    async hal() {
        let data = await BarangSql_1.barangSql.bacaPublish();
        return Renderer_1.render.renderBeranda(data, "", false);
    }
}
exports.berandaController = new Beranda();
