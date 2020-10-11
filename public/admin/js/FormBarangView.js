"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FormBarangView = /** @class */ (function (_super) {
    __extends(FormBarangView, _super);
    function FormBarangView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormBarangView.prototype.init = function () {
        this._elHtml = this.getTemplate('div.form');
    };
    Object.defineProperty(FormBarangView.prototype, "form", {
        get: function () {
            return this.getEl('form');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "namaInput", {
        get: function () {
            return this.getEl('form input#nama-barang');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "deskripsiPanjangInput", {
        get: function () {
            return this.getEl('form textarea#deskripsi-barang-panjang');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "hargaBarangInput", {
        get: function () {
            return this.getEl('form input#harga-barang');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "wa", {
        get: function () {
            return this.getEl('form input#wa');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "submitTbl", {
        get: function () {
            return this.getEl('button.submit');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "draftTbl", {
        get: function () {
            return this.getEl('button.draft');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "inputFileId", {
        get: function () {
            return this.getEl('input[type="hidden"].file_id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "fotoCont", {
        get: function () {
            return this.getEl('div.foto-cont');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "editFotoTbl", {
        get: function () {
            return this.getEl('button.edit-foto');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "gambarHtml", {
        get: function () {
            return this.getEl('img.foto');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "postIdInput", {
        get: function () {
            return this.getEl('input[type="hidden"].post_id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangView.prototype, "tutupTbl", {
        get: function () {
            return this.getEl('button.tutup');
        },
        enumerable: true,
        configurable: true
    });
    return FormBarangView;
}(BaseComponent));
