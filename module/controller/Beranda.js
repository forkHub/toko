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
}
exports.berandaController = new BerandaController();
