"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from "fs";
// import { barangSql } from "../entity/BarangSql";
// import { config } from "../Config";
// import { BarangObj } from "../Type";
// import { util } from "../Util";
const HalDepan_1 = require("./HalDepan");
const Halbarang_1 = require("./Halbarang");
const HalLapakDaftar_1 = require("./HalLapakDaftar");
const Util_1 = require("./Util");
class Renderer {
    constructor() {
        this._halDepan = new HalDepan_1.HalDepan();
        this._halBarang = new Halbarang_1.HalBarang();
        this._halDaftarLapak = new HalLapakDaftar_1.HalDaftarLapak();
        this.util = new Util_1.RenderUtil();
        this._halBarang.util = this.util;
        this.halDaftarLapak.renderUtil = this.util;
    }
    get halDaftarLapak() {
        return this._halDaftarLapak;
    }
    get halDepan() {
        return this._halDepan;
    }
    get halBarang() {
        return this._halBarang;
    }
}
exports.render = new Renderer();
