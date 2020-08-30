"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostObj {
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get wa() {
        return this._wa;
    }
    set wa(value) {
        this._wa = value;
    }
    get thumbUrl() {
        return this._thumbUrl;
    }
    set thumbUrl(value) {
        this._thumbUrl = value;
    }
    get gbrUrl() {
        return this._gbrUrl;
    }
    set gbrUrl(value) {
        this._gbrUrl = value;
    }
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
    get deskripsi() {
        return this._deskripsi;
    }
    set deskripsi(value) {
        this._deskripsi = value;
    }
    get deskripsiPanjang() {
        return this._deskripsiPanjang;
    }
    set deskripsiPanjang(value) {
        this._deskripsiPanjang = value;
    }
    get harga() {
        return this._harga;
    }
    set harga(value) {
        this._harga = value;
    }
}
exports.PostObj = PostObj;
class Post {
    static fromObj(obj) {
        let hasil = new PostObj();
        hasil.id = obj.id;
        hasil.deskripsi = obj.deskripsi;
        hasil.deskripsiPanjang = obj.deskripsiPanjang;
        hasil.gbrUrl = obj.gbrUrl;
        hasil.thumbUrl = obj.thumbUrl;
        hasil.harga = obj.harga;
        hasil.nama = obj.nama;
        hasil.wa = obj.wa;
        console.log('from obj');
        console.log(obj);
        console.log(hasil);
        return hasil;
    }
    static dataToObj(data) {
        return {
            id: data.id,
            deskripsi: data.deskripsi,
            deskripsiPanjang: data.deskripsi_panjang,
            gbrUrl: data.gbr_url,
            harga: data.harga,
            nama: data.nama,
            thumbUrl: data.thumb_url,
            wa: data.wa
        };
    }
    static toObj(obj) {
        return {
            deskripsi: obj.deskripsi,
            deskripsiPanjang: obj.deskripsiPanjang,
            gbrUrl: obj.gbrUrl,
            harga: obj.harga,
            id: obj.id,
            nama: obj.nama,
            thumbUrl: obj.thumbUrl,
            wa: obj.wa
        };
    }
}
exports.Post = Post;
