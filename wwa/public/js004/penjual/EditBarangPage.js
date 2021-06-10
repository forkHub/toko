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
import { Util } from "../Util.js";
import { v } from "../Validator.js";
import { PhotoUploadPage } from "./PhotoUploadPage.js";
window.onload = () => {
    new BarangEditPage();
};
class BarangEditPage {
    constructor() {
        this._selesai = null;
        tinymce.init({
            setup: (ed) => {
                ed.on('init', (_args) => {
                    console.debug('tinymce on loaded');
                    this.init();
                });
                ed.on('init', () => {
                    this.updateStatusTombolSimpan();
                });
            },
            selector: "textarea#deskripsi-barang-panjang"
        });
    }
    init() {
        this.form.onsubmit = (e) => {
            try {
                e.stopPropagation();
                this.submit(1);
                return false;
            }
            catch (e) {
                Util.error(e);
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
        this.hapusFotoTbl.onclick = () => {
            if (this.upload) {
                this.upload.view.detach();
                this.upload = null;
                this.gambarHtml.src = this.backupData.thumb;
            }
        };
        //backup data
        this.backupData = {
            deskripsi: barangData.deskripsi,
            deskripsi_panjang: barangData.deskripsi_panjang,
            harga: barangData.harga,
            nama: barangData.nama,
            wa: barangData.wa,
            thumb: barangData.thumb
        };
        //event
        this.namaInput.oninput = () => {
            this.updateStatusTombolSimpan();
        };
        this.deskripsiInput.oninput = () => {
            this.updateStatusTombolSimpan();
        };
        this.hargaBarangInput.oninput = () => {
            this.updateStatusTombolSimpan();
        };
        this.tutupTbl.onclick = () => {
            if (this.checkAdaPerubahan()) {
                let ok = confirm('Perubahan tidak akan disimpan?');
                if (ok) {
                    window.top.location.href = Util.getUrl(Util.urlPenjualBeranda, [window.sessionStorage.getItem(Util.sLapakId)]);
                }
            }
            else {
                window.top.location.href = Util.getUrl(Util.urlPenjualBeranda, [window.sessionStorage.getItem(Util.sLapakId)]);
            }
        };
        this.updateStatusTombolSimpan();
    }
    updateStatusTombolSimpan() {
        this.draftTbl.disabled = true;
        this.submitTbl.disabled = true;
        if (this.checkAdaPerubahan()) {
            this.draftTbl.disabled = false;
            this.submitTbl.disabled = false;
        }
    }
    onInput() {
        this.updateStatusTombolSimpan();
    }
    checkAdaPerubahan() {
        let baru = this.formToObj();
        if (this.backupData.deskripsi != baru.deskripsi) {
            console.log('deskripsi berubah');
            return true;
        }
        if (this.backupData.deskripsi_panjang != baru.deskripsi_panjang) {
            console.log('deskripsi panjang berubah');
            console.log(this.backupData.deskripsi_panjang);
            console.log(baru.deskripsi_panjang);
            return true;
        }
        if (this.backupData.harga != baru.harga) {
            console.log('harga berubah');
            return true;
        }
        if (this.backupData.nama != baru.nama) {
            console.log('nama berubah');
            return true;
        }
        if (this.backupData.wa != baru.wa) {
            console.log('wa berubah');
            return true;
        }
        if (this.upload && this.upload.statusUpload) {
            console.log('upload baru');
            return true;
        }
        return false;
    }
    submit(publish = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            this.publishStatus.value = publish + '';
            yield this.formKirim()
                .then(() => {
                dialog.tampil('Sukses');
                dialog.okTbl.onclick = () => {
                    window.location.href = "/penjual/beranda/" + window.sessionStorage.getItem(Util.sLapakId);
                };
            }).catch((e) => {
                Util.error(e);
            });
        });
    }
    formKirim() {
        return __awaiter(this, void 0, void 0, function* () {
            let barangObj = this.formToObj();
            barangObj.id = this.id.value;
            console.group('simpan barang ');
            console.log(barangObj);
            barangObj.file_id = parseInt(this.fileId.value);
            if (this.upload) {
                if (this.upload.statusUpload) {
                    console.group('upload image');
                    let id = yield this.upload.upload();
                    barangObj.file_id = id;
                    console.groupEnd();
                }
            }
            let hasil = yield Util.AjaxLogin('post', Util.urlBarangEditPost, JSON.stringify(barangObj));
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
            this.updateStatusTombolSimpan();
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
    get hapusFotoTbl() {
        return Util.getEl('button.hapus-foto');
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
    get id() {
        return Util.getEl('form input.id');
    }
    get fileId() {
        return Util.getEl('form input.file_id');
    }
}
