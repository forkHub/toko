var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dialog } from "../comp/Dialog.js";
import { PhotoUploadPage } from "./PhotoUploadPage.js";
import { Util } from "../Util.js";
import { v } from "../Validator.js";
class BarangBaruPage {
    constructor() {
        this._selesai = null;
        this.form.onsubmit = (e) => {
            try {
                e.stopPropagation();
                this.submit(1);
                return false;
            }
            catch (e) {
                console.error(e);
                dialog.tampil(e.message);
                return false;
            }
        };
        this.draftTbl.onclick = () => {
            console.group('click draft button');
            this.submit(0);
        };
        this.editFotoTbl.onclick = () => {
            this.editFotoClick();
        };
        tinymce.init({
            selector: "textarea#deskripsi-barang-panjang"
        });
        this.default();
    }
    submit(publish = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            this.publishStatus.value = publish + '';
            yield this.formKirim()
                .then(() => {
                window.location.href = "/penjual/beranda/" + window.sessionStorage.getItem(Util.sLapakId);
            }).catch((e) => {
                console.error(e);
                dialog.tampil(e.message);
            });
        });
    }
    default() {
        this.namaInput.value = 'nama';
        this.deskripsiInput.value = 'deskripsi';
        this.hargaBarangInput.value = '1000';
        this.deskripsiPanjangInput.value = 'deskripsi panjang';
        this.wa.value = '12345';
    }
    formKirim() {
        return __awaiter(this, void 0, void 0, function* () {
            let barangObj = this.formToObj();
            console.group('simpan barang ');
            console.log(barangObj);
            if (this.upload && this.upload.statusUpload) {
                console.group('upload image');
                let id = yield this.upload.upload();
                barangObj.file_id = id;
                console.groupEnd();
            }
            let hasil = yield Util.AjaxLogin('post', Util.urlBarangBaru, JSON.stringify(barangObj));
            console.log(hasil);
            if (200 == hasil.status) {
                console.log('ok');
                console.groupEnd();
                return;
            }
            else {
                console.log('error: ' + hasil.responseText);
                console.groupEnd();
                throw new Error(hasil.responseText);
            }
        });
    }
    buatDate() {
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    formToObj() {
        return {
            deskripsi_panjang: tinymce.activeEditor.getContent(),
            deskripsi: v.escape(this.deskripsiInput.value),
            harga: v.escape(this.hargaBarangInput.value),
            nama: v.escape(this.namaInput.value),
            wa: v.escape(this.wa.value),
            publish: parseInt(this.publishStatus.value),
            last_view: this.buatDate(),
            lapak_id: parseInt(window.sessionStorage.getItem(Util.sLapakId)),
        };
    }
    editFotoClick() {
        this.upload = new PhotoUploadPage();
        this.upload.init();
        this.upload.view.attach(document.body);
        this.upload.selesai = () => {
            this.upload.view.detach();
            this.upload.selesai = null;
            if (this.upload.statusUpload) {
                this.gambarHtml.src = this.upload.view.thumbCont.querySelector('canvas').toDataURL();
            }
        };
    }
    get selesai() {
        return this._selesai;
    }
    set selesai(value) {
        this._selesai = value;
    }
    get form() {
        return Util.getEl('form');
    }
    get namaInput() {
        return Util.getEl('form input#nama-barang');
    }
    get deskripsiInput() {
        return Util.getEl('form input#deskripsi-barang');
    }
    get deskripsiPanjangInput() {
        return Util.getEl('form textarea#deskripsi-barang-panjang');
    }
    get publishStatus() {
        return Util.getEl('form input.publish');
    }
    get wa() {
        return Util.getEl('form input#wa');
    }
    get submitTbl() {
        return Util.getEl('button.submit');
    }
    get draftTbl() {
        return Util.getEl('button.draft');
    }
    get fotoCont() {
        return Util.getEl('div.foto-cont');
    }
    get editFotoTbl() {
        return Util.getEl('button.edit-foto');
    }
    get gambarHtml() {
        return Util.getEl('img.foto');
    }
    get tutupTbl() {
        return Util.getEl('button.tutup');
    }
    get hargaBarangInput() {
        return Util.getEl('form input#harga-barang');
    }
}
window.onload = () => {
    new BarangBaruPage();
};
