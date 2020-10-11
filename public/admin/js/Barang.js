"use strict";
var BarangObj = /** @class */ (function () {
    function BarangObj() {
    }
    Object.defineProperty(BarangObj.prototype, "publish", {
        get: function () {
            return this._publish;
        },
        set: function (value) {
            this._publish = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarangObj.prototype, "file_id", {
        get: function () {
            return this._file_id;
        },
        set: function (value) {
            this._file_id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarangObj.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarangObj.prototype, "wa", {
        get: function () {
            return this._wa;
        },
        set: function (value) {
            this._wa = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarangObj.prototype, "thumb", {
        get: function () {
            return this._thumb;
        },
        set: function (value) {
            this._thumb = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarangObj.prototype, "gbr", {
        get: function () {
            return this._gbr;
        },
        set: function (value) {
            this._gbr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarangObj.prototype, "nama", {
        get: function () {
            return this._nama;
        },
        set: function (value) {
            this._nama = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarangObj.prototype, "deskripsi_panjang", {
        get: function () {
            return this._deskripsi_panjang;
        },
        set: function (value) {
            this._deskripsi_panjang = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarangObj.prototype, "harga", {
        get: function () {
            return this._harga;
        },
        set: function (value) {
            this._harga = value;
        },
        enumerable: true,
        configurable: true
    });
    return BarangObj;
}());
var BarangController = /** @class */ (function () {
    function BarangController() {
    }
    BarangController.responseToObj = function (data) {
        var postObj = new BarangObj();
        // postObj.deskripsi = data.deskripsi;
        postObj.deskripsi_panjang = data.deskripsi_panjang;
        postObj.file_id = data.file_id;
        postObj.gbr = data.gbr;
        postObj.harga = data.harga;
        postObj.id = data.id;
        postObj.nama = data.nama;
        postObj.thumb = data.thumb;
        postObj.wa = data.wa;
        postObj.publish = data.publish;
        return postObj;
    };
    return BarangController;
}());
