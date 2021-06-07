"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Penjual_1 = require("./penjual/Penjual");
const HalBarang_1 = require("./toko/HalBarang");
const HalDepan_1 = require("./toko/HalDepan");
const HalDaftarLapak_1 = require("./toko/HalDaftarLapak");
const Auth_1 = require("./auth/Auth");
const HalLapak_1 = require("./toko/HalLapak");
class Renderer {
    constructor() {
        this.halDepan = new HalDepan_1.HalDepan();
        this.halBarang = new HalBarang_1.HalBarang();
        this.halDaftarLapak = new HalDaftarLapak_1.HalDaftarLapak();
        this.halLapak = new HalLapak_1.HalLapak();
        this.penjual = new Penjual_1.Penjual();
        this.auth = new Auth_1.Auth();
    }
}
exports.renderer = new Renderer();
