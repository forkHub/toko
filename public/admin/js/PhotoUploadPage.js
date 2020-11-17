var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseComponent } from "./BaseComponent.js";
import { dialog } from "./Dialog.js";
import { Util } from "./Util.js";
class PhotoUploadPage {
    constructor() {
        this._selesai = null;
        this._insertedId = '';
        this._gbrUrl = '';
        this._view = new View();
    }
    createName(prefix, pjg = 12) {
        let hasil = prefix;
        let karakter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let date = new Date();
        for (let i = 0; i < pjg; i++) {
            hasil += karakter.charAt(Math.floor(Math.random() * karakter.length));
        }
        hasil += date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getMilliseconds();
        hasil += '.png';
        console.log('nama: ' + hasil);
        return hasil;
    }
    init() {
        this.initInput(this.view.input);
        this.view.form.onsubmit = () => {
            try {
                this.uploadProcess().then(() => {
                    dialog.p.innerText = 'Sukses';
                    dialog.tampil(false);
                    dialog.okTbl.onclick = () => {
                        dialog.detach();
                        this.selesai();
                    };
                }).catch((e) => {
                    dialog.p.innerText = e.message;
                    dialog.tampil(false);
                    dialog.okTbl.onclick = () => {
                        dialog.detach();
                    };
                });
            }
            catch (e) {
                dialog.p.innerText = e.message;
                dialog.tampil(false);
                dialog.okTbl.onclick = () => {
                    dialog.detach();
                };
                return false;
            }
            return false;
        };
        console.groupEnd();
    }
    loadImage3(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadImage2(file, 800, 800, "gbr_besar", this.view.fotoCont);
            yield this.loadImage2(file, 128, 128, "thumb", this.view.thumbCont);
        });
    }
    loadImage2(file, panjang, lebar, id, cont) {
        return __awaiter(this, void 0, void 0, function* () {
            let canvas;
            let img = yield loadImage(file.files[0], {
                maxWidth: panjang,
                maxHeight: lebar,
                canvas: true,
                orientation: true,
                imageSmoothingQuality: 'high'
            });
            canvas = img.image;
            canvas.setAttribute("id", id);
            cont.appendChild(canvas);
        });
    }
    populateJson() {
        let obj = {
            gbr_besar: this.view.canvasBesar.toDataURL(),
            gbr_kecil: this.view.canvasThumb.toDataURL(),
            gbr_besar_nama: this.createName('gbr_besar_', 8),
            gbr_kecil_nama: this.createName('gbr_kecil_', 8)
        };
        return JSON.stringify(obj);
    }
    initInput(input) {
        //TODO: loading
        input.onchange = () => {
            this.loadImage3(input).then(() => {
                // this.uploadTbl.style.display = 'block';
                //TODO: loading end
            }).catch((e) => {
                dialog.p.innerHTML = e.message();
                dialog.tampil();
            });
        };
    }
    /*
    async upload2(): Promise<void> {
        let hasil: string = await Util.Ajax('post', '/file/baru', this.populateJson());
        console.log(hasil);
        let hasilObj: any = JSON.parse(hasil);
        this._insertedId = hasilObj.baris_info.insertId;
        this._gbrUrl = hasilObj.gbr_url;
    }
    */
    hapusFileLama(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (id && id != '') {
                    yield Util.Ajax('post', Util.urlFileHapus, JSON.stringify({ id: id }));
                }
                else {
                    console.log('hapus file di batalkan, id null');
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    fileBaru() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Util.Ajax('post', '/file/baru', this.populateJson());
        });
    }
    uploadProcess() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('upload file');
            let hasil = yield this.fileBaru();
            console.log(hasil);
            let hasilObj = JSON.parse(hasil);
            this._insertedId = hasilObj.baris_info.insertId;
            this._gbrUrl = hasilObj.gbr_url;
            console.log('hapus file lama ' + this._idLama);
            yield this.hapusFileLama(this._idLama);
        });
    }
    get view() {
        return this._view;
    }
    get selesai() {
        return this._selesai;
    }
    set selesai(value) {
        this._selesai = value;
    }
    get insertedId() {
        return this._insertedId;
    }
    get gbrUrl() {
        return this._gbrUrl;
    }
    get idLama() {
        return this._idLama;
    }
    set idLama(value) {
        this._idLama = value;
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this._elHtml = this.getTemplate('div.foto-page');
    }
    get listCont() {
        return this.getEl('div.list-cont');
    }
    get form() {
        return this.getEl('form');
    }
    get input() {
        return this.getEl('input');
    }
    get uploadTbl() {
        return this.getEl('input.upload');
    }
    get canvasBesar() {
        return this.getEl('canvas#gbr_besar');
    }
    get canvasThumb() {
        return this.getEl('canvas#thumb');
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get fotoCont() {
        return this.getEl('div.foto-cont');
    }
    get thumbCont() {
        return this.getEl('div.thumb-cont');
    }
}
export var upload = new PhotoUploadPage();
