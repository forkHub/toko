"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Barang {
    insert(barang) {
        fs_1.default.writeFileSync("barang.txt", JSON.stringify(barang));
    }
    delete(barang) {
        barang;
    }
    update(barang) {
        barang;
    }
    getById(id) {
        id;
        return null;
    }
    get() {
        // fs.readFile()
        // readFile
        let content = fs_1.default.readFileSync("barang.txt");
        console.log(content.toString());
        return [];
    }
}
exports.Barang = Barang;
class BarangObj {
    constructor() {
        this._id = 0;
        this._nama = '';
        this._deskripsiSingkat = '';
        this._deskripsiPanjang = '';
    }
    get harga() {
        return this._harga;
    }
    set harga(value) {
        this._harga = value;
    }
    get deskripsiPanjang() {
        return this._deskripsiPanjang;
    }
    set deskripsiPanjang(value) {
        this._deskripsiPanjang = value;
    }
    get deskripsiSingkat() {
        return this._deskripsiSingkat;
    }
    set deskripsiSingkat(value) {
        this._deskripsiSingkat = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
}
exports.BarangObj = BarangObj;
