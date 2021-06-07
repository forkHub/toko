"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: final
class Validator {
    constructor() {
        this.VAL_ANGKA = 1;
        this.VAL_TEKS = 2;
        this.VAL_PASS = 3;
        this.VAL_EMAIL = 5;
        this.VAL_USERNAME = 5;
        this.VAL_WA = 5;
        this.SAN_ESC = 6;
        this.field_nama = '';
        this.field_panjang_min = '';
        this.field_panjang_max = '';
        this.ERR_PASS = 'Password mengandung karakter yang tidak diperbolehkan';
        this.ERR_PANJANG_MIN = `Panjang minimal ${this.field_nama} adalah ${this.field_panjang_min}`;
        this.ERR_PANJANG_MAX = `Panjang minimal ${this.field_nama} adalah ${this.field_panjang_max}`;
    }
    validate(data, tipe, nama, min = -1, max = 999999) {
        this.field_panjang_min = min + '';
        this.field_panjang_max = max + '';
        this.field_nama = nama;
        if (min > 0) {
            this.field_panjang_min = min + '';
            if (data.length < min)
                throw Error(this.ERR_PANJANG_MIN);
        }
        if (max < 999999) {
            this.field_panjang_max = max + '';
            if (data.length > max)
                throw Error(this.ERR_PANJANG_MAX);
        }
        for (let i = 0; i < tipe.length; i++) {
            let n = tipe[i];
            if (this.VAL_ANGKA == n) {
            }
            if (this.VAL_EMAIL == n) {
            }
            if (this.VAL_PASS == n) {
            }
            if (this.VAL_TEKS == n) {
            }
            if (this.VAL_PASS == n) {
            }
            if (this.VAL_WA == n) {
            }
            if (this.VAL_USERNAME == n) {
            }
        }
    }
    static checkUserName(value) {
        let reg = /[0-9]+/;
        let hasil = value.match(reg);
        if (!hasil)
            return false;
        if (hasil.length > 1)
            return false;
        if (hasil[0] != value)
            return false;
        return true;
    }
    static checkAngka(value) {
        let reg = /[0-9]+/;
        let hasil = value.match(reg);
        if (!hasil)
            return false;
        if (hasil.length > 1)
            return false;
        if (hasil[0] != value)
            return false;
        return true;
    }
    static checkWa(value) {
        let reg = /62[0-9]+/;
        let hasil = value.match(reg);
        if (!hasil)
            return false;
        if (hasil.length > 1)
            return false;
        if (hasil[0] != value)
            return false;
        return true;
    }
    static validasiPassword(pass) {
        let reg = /[A-Za-z0-9_.!]+/;
        let hasil = pass.match(reg);
        if (!hasil)
            return false;
        if (hasil.length > 1)
            return false;
        if (hasil[0] != pass)
            return false;
        return true;
    }
    escape(str) {
        let hasil = str;
        while (hasil.indexOf("<") > -1) {
            hasil = hasil.replace("<", "&lt;");
        }
        while (hasil.indexOf(">") > -1) {
            hasil = hasil.replace(">", "&gt;");
        }
        return hasil;
    }
    sanitize(data, tipe) {
        let hasil = data;
        for (let i = 0; i < tipe.length; i++) {
            let t = tipe[i];
            if (this.SAN_ESC == t) {
                hasil = escape(hasil);
            }
        }
        return hasil;
    }
    vs(data, vtipe, stipe, nama, min = -1, max = 999999) {
        let hasil = data;
        hasil = this.sanitize(hasil, stipe);
        this.validate(hasil, vtipe, nama, min, max);
        return hasil;
    }
}
exports.v = new Validator();
