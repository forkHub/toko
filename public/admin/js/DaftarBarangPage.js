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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DaftarBarangPage = /** @class */ (function (_super) {
    __extends(DaftarBarangPage, _super);
    function DaftarBarangPage() {
        var _this = _super.call(this) || this;
        _this._template = "\n\t\t\t<div class='daftar-barang-page'>\n\t\t\t\t<h1>Daftar Barang</h1>\n\t\t\t\t<button type='button' class='btn btn-primary tambah'>Tambah Data</button>\n\t\t\t\t<br/>\n\t\t\t\t<br/>\n\t\t\t\t<div class='cont'>\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\t\t\t\n\t\t";
        _this.build();
        return _this;
    }
    DaftarBarangPage.prototype.init = function () {
        var _this = this;
        this.form = App.form;
        this.tambahTbl.onclick = function () {
            _this.tambahClick();
        };
    };
    DaftarBarangPage.prototype.tambahClick = function () {
        this.detach();
        this.form.view.attach(App.cont);
        this.form.editMode = false;
        this.form.default();
        this.form.resetTinyMCE();
    };
    DaftarBarangPage.prototype.barangEditlick = function (item) {
        console.log(item);
        this.detach();
        App.form.view.attach(App.cont);
        App.form.objToForm(item);
        App.form.view.gambarHtml.src = item.thumb;
        App.form.editMode = true;
        this.form.resetTinyMCE();
    };
    DaftarBarangPage.prototype.barangHapusClick = function (item) {
        var hasil = confirm("Hapus Data?");
        if (hasil) {
            console.log('hapus data');
            Util.Ajax('post', '/barang/hapus/' + item.id, null).then(function (hasil) {
                console.log(hasil);
                App.dialog.p.innerHTML = "Berhasil";
                App.dialog.tampil();
                App.dialog.okTbl.onclick = function () {
                    window.top.location.href = Util.urlToko;
                };
            }).catch(function (e) {
                App.dialog.p.innerHTML = e;
                App.dialog.tampil();
            });
        }
    };
    DaftarBarangPage.prototype.load2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Util.Ajax("post", "/barang/baca", null).then(function (str) {
                    var barangAr = JSON.parse(str);
                    _this.cont.innerHTML = '';
                    console.log('load ' + barangAr.length);
                    console.group('load str');
                    console.log(str);
                    console.groupEnd();
                    barangAr.forEach(function (data) {
                        var view = new ItemBarangView();
                        var item = BarangController.responseToObj(data);
                        console.group('data');
                        console.log(data);
                        console.groupEnd();
                        console.group('item');
                        console.log(item);
                        console.groupEnd();
                        view.namaP.innerHTML = item.nama + " (" + (item.publish ? "dipublish" : "draft") + ")";
                        view.gbr.src = item.thumb;
                        view.attach(_this.cont);
                        view.editTbl.onclick = function () {
                            _this.barangEditlick(item);
                        };
                        view.hapusTbl.onclick = function () {
                            _this.barangHapusClick(item);
                        };
                    });
                }).catch(function (e) {
                    if (Util.resp.code == 401) {
                        _this.detach();
                        App.login.attach(App.cont);
                    }
                    else {
                        App.dialog.tampil2(e.message);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(DaftarBarangPage.prototype, "tambahTbl", {
        /*
        async load(): Promise<void> {
            let str: string = await App.Ajax("get", "/barang/baca", null);
            let barangAr: BarangObj[] = JSON.parse(str);
    
            this.cont.innerHTML = '';
    
            console.log('load ' + barangAr.length);
            console.group('load str');
            console.log(str);
            console.groupEnd();
    
            barangAr.forEach((data: BarangObj) => {
                let view: ItemBarangView = new ItemBarangView();
                let item: BarangObj = BarangController.responseToObj(data);
    
                console.group('data');
                console.log(data);
                console.groupEnd();
    
                console.group('item');
                console.log(item);
                console.groupEnd();
    
                view.namaP.innerHTML = item.nama;
                // view.deskripsiP.innerHTML = item.deskripsi;
                // view.hargaP.innerHTML = item.harga + '';
                view.gbr.src = item.thumb;
    
                view.attach(this.cont);
    
                view.editTbl.onclick = () => {
                    this.barangEditlick(item);
                }
                view.hapusTbl.onclick = () => {
                    this.barangHapusClick(item);
                }
            })
    
        }
        */
        get: function () {
            return this.getEl('button.tambah');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaftarBarangPage.prototype, "cont", {
        get: function () {
            return this.getEl('div.cont');
        },
        enumerable: true,
        configurable: true
    });
    return DaftarBarangPage;
}(BaseComponent));
var ItemBarangView = /** @class */ (function (_super) {
    __extends(ItemBarangView, _super);
    function ItemBarangView() {
        var _this = _super.call(this) || this;
        _this._template = "\n\t\t\t<div class='item-barang'>\n\t\t\t\t<div class='atas cont'>\n\t\t\t\t\t<img class='gbr' src=\"\">\n\t\t\t\t\t<div class='deskripsi'>\n\t\t\t\t\t\t<p class='nama'></p>\n\t\t\t\t\t\t<div class='bawah'>\n\t\t\t\t\t\t\t<button type='button' class='btn btn-sm btn-primary edit'>Edit</button>\n\t\t\t\t\t\t\t<button type='button' class='btn btn-sm btn-danger hapus'>Hapus</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<hr/>\n\t\t\t</div>\n\t\t";
        _this.build();
        return _this;
    }
    Object.defineProperty(ItemBarangView.prototype, "editTbl", {
        get: function () {
            return this.getEl('button.edit');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemBarangView.prototype, "hapusTbl", {
        get: function () {
            return this.getEl('button.hapus');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemBarangView.prototype, "gbr", {
        get: function () {
            return this.getEl('img');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemBarangView.prototype, "namaP", {
        get: function () {
            return this.getEl('div.deskripsi p.nama');
        },
        enumerable: true,
        configurable: true
    });
    return ItemBarangView;
}(BaseComponent));
