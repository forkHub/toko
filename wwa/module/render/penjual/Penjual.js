"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HalBarangBaru_1 = require("./HalBarangBaru");
const HalBarangEdit_1 = require("./HalBarangEdit");
const HalBeranda_1 = require("./HalBeranda");
const HalEditProfile_1 = require("./HalEditProfile");
const HalProfile_1 = require("./HalProfile");
class Penjual {
    constructor() {
        this.beranda = new HalBeranda_1.HalBeranda();
        this.barangBaru = new HalBarangBaru_1.BarangBaru();
        this.barangEdit = new HalBarangEdit_1.BarangEditBarang();
        this.profile = new HalProfile_1.Profile();
        this.editProfile = new HalEditProfile_1.HalEditProfile();
    }
}
exports.Penjual = Penjual;
