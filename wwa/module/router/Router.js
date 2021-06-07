"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthRouter_1 = require("./AuthRouter");
const PenjualRouter_1 = require("./PenjualRouter");
const BarangRouter_1 = require("./toko/BarangRouter");
const BerandaRouter_1 = require("./toko/BerandaRouter");
const LapakRouter_1 = require("./toko/LapakRouter");
exports.router = {
    toko: {
        beranda: BerandaRouter_1.berandaRouter,
        barang: BarangRouter_1.barangRouter,
        lapak: LapakRouter_1.lapakRouter
    },
    auth: AuthRouter_1.authRouter,
    penjual: PenjualRouter_1.penjualRouter
};
