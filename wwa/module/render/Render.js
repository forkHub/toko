"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("./auth/Auth");
const Penjual_1 = require("./penjual/Penjual");
const HalBarang_1 = require("./toko/HalBarang");
const HalDaftarLapak_1 = require("./toko/HalDaftarLapak");
const HalDepan_1 = require("./toko/HalDepan");
const HalLapak_1 = require("./toko/HalLapak");
exports.render = {
    toko: {
        beranda: new HalDepan_1.HalDepan(),
        daftarLapak: new HalDaftarLapak_1.HalDaftarLapak(),
        barang: new HalBarang_1.HalBarang(),
        lapak: new HalLapak_1.HalLapak()
    },
    auth: new Auth_1.Auth(),
    penjual: new Penjual_1.Penjual()
};
