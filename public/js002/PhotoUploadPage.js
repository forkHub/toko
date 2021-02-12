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
import { loading } from "./Loading.js";
import { Util } from "./Util.js";
export class PhotoUploadPage {
    constructor() {
        this._selesai = null;
        this._view = new View();
        this._statusUpload = false;
        // public get insertedId(): string {
        // return this._insertedId;
        // }
        // public get gbrUrl(): string {
        // 	return this._gbrUrl;
        // }
        // public get idLama(): string {
        // 	return this._idLama;
        // }
        // public set idLama(value: string) {
        // 	this._idLama = value;
        // }
    }
    buatNama(prefix, pjg = 12) {
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
        this._view.uploadTbl.style.display = 'none';
        this._view.input.onchange = () => {
            this._view.fotoCont.innerHTML = '';
            this._view.thumbCont.innerHTML = '';
            this._view.uploadTbl.style.display = 'none';
            this.loadImage(this._view.input).then(() => {
                loading.detach();
                this._statusUpload = true;
                this._view.uploadTbl.style.display = 'initial';
            }).catch((e) => {
                console.log(e);
                dialog.p.innerHTML = e.message;
                this._statusUpload = false;
                dialog.tampil2('gagal dalam memproses gambar');
            });
        };
        this._view.tutupTbl.onclick = () => {
            this._statusUpload = false;
            this._selesai();
        };
        this.view.form.onsubmit = () => {
            this._selesai();
            return false;
        };
    }
    loadImage(file) {
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
                imageSmoothingQuality: 'high',
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
            gbr_besar_nama: this.buatNama('gbr_besar_', 8),
            gbr_kecil_nama: this.buatNama('gbr_kecil_', 8)
        };
        return JSON.stringify(obj);
    }
    // async hapusFileLama(id: string): Promise<void> {
    // 	try {
    // 		if (id && id != '') {
    // 			await Util.Ajax('post', Util.urlFileHapus, JSON.stringify({ id: id }));
    // 		}
    // 		else {
    // 			console.log('hapus file di batalkan, id null');
    // 		}
    // 	}
    // 	catch (e) {
    // 		console.log(e);
    // 	}
    // }
    upload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('upload file');
            let hasil = yield Util.Ajax('post', Util.urlFileUpload, this.populateJson());
            console.log(hasil);
            return JSON.parse(hasil).baris.insertId;
        });
    }
    get view() {
        return this._view;
    }
    get statusUpload() {
        return this._statusUpload;
    }
    set selesai(value) {
        this._selesai = value;
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
// export var upload: PhotoUploadPage = new PhotoUploadPage();
