"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminController_1 = require("./admin/AdminController");
const AuthController_1 = require("./admin/AuthController");
const PenjualController_1 = require("./admin/PenjualController");
const BarangController_1 = require("./toko/BarangController");
const BerandaController_1 = require("./toko/BerandaController");
const LapakController_1 = require("./toko/LapakController");
exports.cont = {
    admin: {
        auth: AuthController_1.authController,
        penjual: PenjualController_1.penjualController,
        admin: new AdminController_1.AdminController()
    },
    toko: {
        barang: BarangController_1.barangController,
        beranda: BerandaController_1.berandaController,
        lapak: new LapakController_1.LapakController()
    }
};
