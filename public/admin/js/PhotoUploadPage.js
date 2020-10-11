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
var PhotoUploadPage = /** @class */ (function (_super) {
    __extends(PhotoUploadPage, _super);
    // resp.status(200).send({
    // 	gbr_url: folderUnggah + gbrBesarNama,
    // 	baris_info: _rows
    // });
    function PhotoUploadPage() {
        var _this = _super.call(this) || this;
        // private canvasImg2: HTMLCanvasElement = document.createElement('canvas');
        // private canvasThumb2: HTMLCanvasElement = document.createElement('canvas');
        // private rotasi: number = 0;
        _this._selesai = null;
        _this._insertedId = '';
        _this._gbrUrl = '';
        return _this;
    }
    PhotoUploadPage.prototype.createName = function (prefix, pjg) {
        if (pjg === void 0) { pjg = 12; }
        var hasil = prefix;
        var karakter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        var date = new Date();
        for (var i = 0; i < pjg; i++) {
            hasil += karakter.charAt(Math.floor(Math.random() * karakter.length));
        }
        hasil += date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getMilliseconds();
        hasil += '.png';
        console.log('nama: ' + hasil);
        return hasil;
    };
    PhotoUploadPage.prototype.init = function () {
        var _this = this;
        console.group("photo upload");
        this._elHtml = this.getTemplate('div.foto-page');
        console.group('el html');
        console.log(this._elHtml);
        console.groupEnd();
        // this.canvasImg2.width = 800;
        // this.canvasImg2.height = 600;
        // this.canvasThumb2.width = 128;
        // this.canvasThumb2.height = 128;
        // this.uploadTbl.style.display = 'none';
        // this.rotasiTbl.style.display = 'none';
        this.initInput(this.input);
        this.form.onsubmit = function () {
            _this.upload();
            return false;
        };
        // this.rotasiTbl.onclick = () => {
        // 	this.rotasi += 90;
        // 	if (this.rotasi > 360) {
        // 		this.rotasi -= 360;
        // 	}
        // 	this.renderImg(this.canvasBesarHtml, this.rotasi, this.canvasImg2, 128 / 2, 128 / 2);
        // 	this.renderImg(this.canvasThumbHtml, this.rotasi, this.canvasThumb2, 32 / 2, 32 / 2);
        // }
        console.groupEnd();
    };
    PhotoUploadPage.prototype.loadImage3 = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadImage2(file, 800, 800, "gbr_besar", this.fotoCont)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadImage2(file, 128, 128, "thumb", this.thumbCont)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PhotoUploadPage.prototype.loadImage2 = function (file, panjang, lebar, id, cont) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas, img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadImage(file.files[0], {
                            maxWidth: panjang,
                            maxHeight: lebar,
                            canvas: true,
                            orientation: true,
                            imageSmoothingQuality: 'high'
                        })];
                    case 1:
                        img = _a.sent();
                        canvas = img.image;
                        canvas.setAttribute("id", id);
                        cont.appendChild(canvas);
                        return [2 /*return*/];
                }
            });
        });
    };
    PhotoUploadPage.prototype.populateData = function () {
        var formData = new FormData();
        formData.append("gbr_besar", this.canvasBesar.toDataURL());
        formData.append("gbr_kecil", this.canvasThumb.toDataURL());
        return formData;
    };
    PhotoUploadPage.prototype.populateJson = function () {
        var obj = {
            gbr_besar: this.canvasBesar.toDataURL(),
            gbr_kecil: this.canvasThumb.toDataURL(),
            gbr_besar_nama: this.createName('gbr_besar_', 8),
            gbr_kecil_nama: this.createName('gbr_kecil_', 8)
        };
        return JSON.stringify(obj);
    };
    // renderImg(canvasDest: HTMLCanvasElement, sudut: number, canvasSrc: HTMLCanvasElement, x: number, y: number): void {
    // 	let ctxDest: CanvasRenderingContext2D = canvasDest.getContext('2d');
    // 	sudut = (Math.PI / 180.0) * sudut;
    // 	ctxDest.clearRect(0, 0, canvasDest.width, canvasDest.height);
    // 	ctxDest.save();
    // 	ctxDest.translate(x, y);
    // 	ctxDest.rotate(sudut);
    // 	ctxDest.drawImage(canvasSrc, -x, -y);
    // 	ctxDest.restore();
    // 	console.log(canvasDest.width + '/' + canvasDest.height);
    // }
    PhotoUploadPage.prototype.initInput = function (input) {
        var _this = this;
        input.onchange = function () {
            _this.loadImage3(input).then(function () {
                // this.uploadTbl.style.display = 'block';
            }).catch(function (e) {
                App.dialog.p.innerHTML = e.message();
                App.dialog.tampil();
            });
            // let file: File = input.files[0];
            // let reader: FileReader = new FileReader();
            // let image: HTMLImageElement = new Image();
            // this.uploadTbl.style.display = 'none';
            // this.rotasiTbl.style.display = 'none';
            // reader.onload = () => {
            // 	image.onload = () => {
            // 		let ratio: number = Math.min(canvasHtml.width / image.naturalWidth, canvasHtml.height / image.naturalHeight);
            // 		let w2: number = image.naturalWidth * ratio;
            // 		let h2: number = image.naturalHeight * ratio;
            // 		let x: number = 0 + (canvasHtml.width - w2) / 2;
            // 		let y: number = 0 + (canvasHtml.height - h2) / 2;
            // 		this.canvasImg2.getContext('2d').clearRect(0, 0, this.canvasImg2.width, this.canvasImg2.height);
            // 		this.canvasImg2.getContext('2d').drawImage(image, x, y, w2, h2);
            // 		this.renderImg(this.canvasBesarHtml, this.rotasi, this.canvasImg2, 128 / 2, 128 / 2);
            // 		//gambar thumbnail
            // 		ratio = Math.min(canvasThumbHtml.width / image.naturalWidth, canvasThumbHtml.height / image.naturalHeight);
            // 		w2 = image.naturalWidth * ratio;
            // 		h2 = image.naturalHeight * ratio;
            // 		x = 0 + (canvasThumbHtml.width - w2) / 2;
            // 		y = 0 + (canvasThumbHtml.height - h2) / 2;
            // 		this.canvasThumb2.getContext('2d').clearRect(0, 0, this.canvasThumb2.width, this.canvasThumb2.height);
            // 		this.canvasThumb2.getContext('2d').drawImage(image, x, y, w2, h2);
            // 		this.renderImg(this.canvasThumbHtml, this.rotasi, this.canvasThumb2, 32 / 2, 32 / 2);
            // 		this.uploadTbl.style.display = 'inline';
            // 		this.rotasiTbl.style.display = 'inline';
            // 	}
            // 	image.src = (reader.result) as string;
            // };
            // if (file) {
            // 	reader.readAsDataURL(file);
            // }
        };
    };
    PhotoUploadPage.prototype.upload = function () {
        var _this = this;
        try {
            Util.Ajax('post', '/file/baru', this.populateJson())
                .then(function (hasil) {
                console.log(hasil);
                var hasilObj = JSON.parse(hasil);
                _this._insertedId = hasilObj.baris_info.insertId;
                _this._gbrUrl = hasilObj.gbr_url;
                App.dialog.p.innerText = 'Sukses';
                App.dialog.tampil(false);
                App.dialog.okTbl.onclick = function () {
                    App.dialog.detach();
                    _this.selesai();
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
    Object.defineProperty(PhotoUploadPage.prototype, "listCont", {
        get: function () {
            return this.getEl('div.list-cont');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "form", {
        get: function () {
            return this.getEl('form');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "input", {
        get: function () {
            return this.getEl('input');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "uploadTbl", {
        get: function () {
            return this.getEl('input.upload');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "canvasBesar", {
        get: function () {
            return this.getEl('canvas#gbr_besar');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "canvasThumb", {
        get: function () {
            return this.getEl('canvas#thumb');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "tutupTbl", {
        get: function () {
            return this.getEl('button.tutup');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "selesai", {
        get: function () {
            return this._selesai;
        },
        set: function (value) {
            this._selesai = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "insertedId", {
        get: function () {
            return this._insertedId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "gbrUrl", {
        get: function () {
            return this._gbrUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "fotoCont", {
        get: function () {
            return this.getEl('div.foto-cont');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhotoUploadPage.prototype, "thumbCont", {
        get: function () {
            return this.getEl('div.thumb-cont');
        },
        enumerable: true,
        configurable: true
    });
    return PhotoUploadPage;
}(BaseComponent));
