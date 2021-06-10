"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminSql_1 = require("./admin/AdminSql");
const AuthSql_1 = require("./admin/AuthSql");
const PenjualSql_1 = require("./admin/PenjualSql");
const BarangSql_1 = require("./toko/BarangSql");
const BerandaSql_1 = require("./toko/BerandaSql");
const LapakSql_1 = require("./toko/LapakSql");
exports.dao = {
    admin: {
        auth: AuthSql_1.authSql,
        penjual: PenjualSql_1.penjualSql,
        admin: new AdminSql_1.AdminSql()
    },
    toko: {
        barang: BarangSql_1.barangSql,
        beranda: BerandaSql_1.berandaSql,
        lapak: new LapakSql_1.LapakSql()
    }
};
