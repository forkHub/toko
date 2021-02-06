"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { config } from "winston";
const Config_1 = require("../Config");
const BarangSql_1 = require("../entity/BarangSql");
const Renderer_1 = require("../render/Renderer");
class BerandaController {
    async beranda() {
        let data = await BarangSql_1.barangSql.baca({
            publish: 1,
            limit: parseInt(Config_1.config.getNilai(Config_1.Config.JML_PER_HAL)),
            orderDateAsc: 1
        });
        return Renderer_1.render.halDepan.render({
            barangData: data,
            lapakId: '',
            hal: 0,
            jml: 0,
            kataKunci: ''
        });
    }
    async cariBarang(kataKunci, hal, lapakId) {
        let daftarBarang;
        let jumlahData;
        let jumlah;
        let hal2 = parseInt(hal) * parseInt(Config_1.config.getNilai(Config_1.Config.JML_PER_HAL));
        jumlahData = await BarangSql_1.barangSql.baca({
            kataKunci: decodeURI(kataKunci),
            publish: 1,
            lapak_id: lapakId
        });
        jumlah = jumlahData.length;
        daftarBarang = await BarangSql_1.barangSql
            .baca({
            kataKunci: decodeURI(kataKunci),
            publish: 1,
            offset: hal2,
            orderDateAsc: 1,
            limit: parseInt(Config_1.config.getNilai(Config_1.Config.JML_PER_HAL)),
            lapak_id: lapakId
        });
        let html = await Renderer_1.render.halDepan.render({
            barangData: daftarBarang,
            hal: parseInt(hal),
            jml: jumlah,
            kataKunci: kataKunci,
            lapakId: lapakId
        });
        return html;
    }
}
exports.berandaController = new BerandaController();
