"use strict";
var FormBarangPage = /** @class */ (function () {
    function FormBarangPage() {
        this.id = '';
        this._editMode = false;
        this._view = new FormBarangView();
        this._selesai = null;
    }
    FormBarangPage.prototype.resetTinyMCE = function () {
        if (tinymce.activeEditor) {
            tinymce.activeEditor.destroy();
        }
        tinymce.EditorManager.editors = [];
        tinymce.remove('textarea#deskripsi-barang-panjang');
        tinymce.init({
            selector: "textarea#deskripsi-barang-panjang"
        });
    };
    FormBarangPage.prototype.init = function () {
        var _this = this;
        this.view.init();
        this.upload = App.upload;
        this.default();
        this.view.form.onsubmit = function (e) {
            e.stopPropagation();
            console.log(_this._editMode);
            if (_this._editMode) {
                _this.editKirim(1);
            }
            else {
                _this.simpanKirim(1);
            }
            return false;
        };
        this.view.draftTbl.onclick = function () {
            console.group('click draft button');
            if (_this._editMode) {
                _this.editKirim(0);
            }
            else {
                _this.simpanKirim(0);
            }
            console.groupEnd();
        };
        this.view.editFotoTbl.onclick = function () {
            _this.editFotoClick();
        };
        this.view.tutupTbl.onclick = function () {
            window.top.location.href = '/toko';
        };
    };
    FormBarangPage.prototype.editKirim = function (publish) {
        try {
            Util.Ajax('post', '/barang/update/' + this.id, JSON.stringify(this.formToObj(publish)))
                .then(function (hasil) {
                console.log('update sukses');
                console.log(hasil);
                App.dialog.p.innerText = 'Sukses';
                App.dialog.tampil(false);
                App.dialog.okTbl.onclick = function () {
                    console.log('tombol on click');
                    window.top.location.href = Util.urlToko;
                };
            })
                .catch(function (_err) {
                App.dialog.p.innerHTML = _err;
                App.dialog.tampil();
            });
        }
        catch (e) {
            App.dialog.p.innerHTML = e;
            App.dialog.tampil();
        }
    };
    FormBarangPage.prototype.draftKirim = function () {
    };
    FormBarangPage.prototype.simpanKirim = function (publish) {
        try {
            Util.Ajax('post', '/barang/baru', JSON.stringify(this.formToObj(publish)))
                .then(function (hasil) {
                console.log(hasil);
                App.dialog.p.innerText = 'Sukses';
                App.dialog.tampil(false);
                App.dialog.okTbl.onclick = function () {
                    window.top.location.href = Util.urlToko;
                };
            })
                .catch(function (_err) {
                App.dialog.p.innerHTML = _err;
                App.dialog.tampil();
            });
        }
        catch (e) {
            App.dialog.p.innerHTML = e;
            App.dialog.tampil();
        }
    };
    FormBarangPage.prototype.default = function () {
        this.view.namaInput.value = 'nama';
        // this.view.deskripsiBarangInput.value = 'deskripsi';
        this.view.deskripsiPanjangInput.value = 'deskripsi2';
        this.view.hargaBarangInput.value = '1000';
        this.view.wa.value = '12345';
    };
    FormBarangPage.prototype.objToForm = function (data) {
        this.view.namaInput.value = data.nama;
        // this.view.deskripsiBarangInput.value = data.deskripsi;
        this.view.deskripsiPanjangInput.value = data.deskripsi_panjang;
        this.view.hargaBarangInput.value = data.harga + '';
        this.view.wa.value = data.wa;
        this.id = data.id;
        this.view.inputFileId.value = data.file_id;
    };
    FormBarangPage.prototype.formToObj = function (publish) {
        return {
            deskripsi_panjang: tinymce.activeEditor.getContent(),
            file_id: this.view.inputFileId.value,
            harga: this.view.hargaBarangInput.value,
            id: this.view.postIdInput.value,
            nama: this.view.namaInput.value,
            wa: this.view.wa.value,
            publish: publish
        };
    };
    FormBarangPage.prototype.editFotoClick = function () {
        var _this = this;
        this.view.detach();
        this.upload.attach(App.cont);
        this.upload.selesai = function () {
            _this.upload.detach();
            _this.upload.selesai = null;
            _this.view.inputFileId.value = _this.upload.insertedId;
            _this.view.gambarHtml.src = _this.upload.gbrUrl;
            _this.view.attach(App.cont);
            _this.resetTinyMCE();
        };
        this.upload.tutupTbl.onclick = function () {
            _this.upload.detach();
            _this.view.attach(App.cont);
            _this.resetTinyMCE();
        };
    };
    Object.defineProperty(FormBarangPage.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangPage.prototype, "editMode", {
        get: function () {
            return this._editMode;
        },
        set: function (value) {
            this._editMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBarangPage.prototype, "selesai", {
        get: function () {
            return this._selesai;
        },
        set: function (value) {
            this._selesai = value;
        },
        enumerable: true,
        configurable: true
    });
    return FormBarangPage;
}());
