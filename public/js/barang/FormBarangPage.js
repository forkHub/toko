var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseComponent } from "../BaseComponent.js";
import { data } from "../Data.js";
import { dialog } from "../Dialog.js";
import { PhotoUploadPage } from "../PhotoUploadPage.js";
import { Util } from "../Util.js";
class FormBarangPage {
    constructor() {
        this._editMode = false;
        this._view = new View();
        this._selesai = null;
        this.dataLama = null;
    }
    tampil(item, _edit) {
        if (_edit) {
            this.copyKeDataLama(item);
            this.view.gambarHtml.src = item.thumb;
        }
        else {
            this.dataLama = null;
            this.default();
        }
        this._editMode = _edit;
        this.upload = null;
        this._view.namaInput.focus;
        this._view.attach(data.cont);
        this.resetTinyMCE();
    }
    copyKeDataLama(barang) {
        this.dataLama = {
            file_id: barang.file_id,
            deskripsi_panjang: barang.deskripsi_panjang,
            harga: barang.harga,
            lapak_id: barang.lapak_id,
            last_view: barang.last_view,
            nama: barang.nama,
            publish: barang.publish,
            wa: barang.wa,
            gbr: barang.gbr,
            id: barang.id,
            // lapak: barang.lapak,
            thumb: barang.thumb
        };
    }
    //TODO: check perubahan
    checkPerubahan() {
        this.dataLama;
        return true;
    }
    resetTinyMCE() {
        if (tinymce.activeEditor) {
            tinymce.activeEditor.destroy();
        }
        tinymce.EditorManager.editors = [];
        tinymce.remove('textarea#deskripsi-barang-panjang');
        tinymce.init({
            selector: "textarea#deskripsi-barang-panjang"
        });
    }
    init() {
        this.view.init();
        this.default();
        this.view.form.onsubmit = (e) => {
            try {
                e.stopPropagation();
                this.kirim(1).then(() => {
                    dialog.tampil2("sukses");
                    dialog.okTbl.onclick = () => {
                        dialog.detach();
                        this._selesai();
                        window.top.location.reload();
                    };
                }).catch((e) => {
                    dialog.tampil2(e.message);
                });
                return false;
            }
            catch (e) {
                dialog.tampil2(e.message);
                return false;
            }
            return false;
        };
        this.view.draftTbl.onclick = () => {
            console.group('click draft button');
            this.kirim(0);
            console.groupEnd();
        };
        this.view.editFotoTbl.onclick = () => {
            this.editFotoClick();
        };
        this.view.tutupTbl.onclick = () => {
            window.top.location.href = Util.urlAdmin;
        };
    }
    kirim(publish) {
        return __awaiter(this, void 0, void 0, function* () {
            let barang = this.formToObj(publish);
            if (false == this.checkPerubahan()) {
                console.log('tidak berubah');
                return;
            }
            else {
                console.log('berubah');
            }
            if (this.upload && this.upload.statusUpload) {
                let id = yield this.upload.upload();
                barang.file_id = id;
            }
            barang.lapak_id = window.sessionStorage.getItem(Util.sLapakId);
            // console.log(window.localStorage);
            // console.log(window.localStorage.getItem(Util.sLapakId));
            if (this._editMode) {
                yield Util.Ajax('post', Util.getUrl(Util.urlBarangUpdate, [this.dataLama.id]), JSON.stringify(barang));
            }
            else {
                yield Util.Ajax('post', Util.urlBarangBaru, JSON.stringify(barang));
            }
        });
    }
    // simpanKirim(publish: number): void {
    // 	try {
    // 		let barang: IBarangObj = this.formToObj(publish);
    // 		Util.Ajax('post', Util.urlBarangBaru, JSON.stringify(this.formToObj(publish)))
    // 			.then((hasil) => {
    // 				console.log(hasil);
    // 				dialog.p.innerText = 'Sukses';
    // 				dialog.tampil(false);
    // 				dialog.okTbl.onclick = () => {
    // 					window.top.location.href = Util.urlAdmin;
    // 				}
    // 			})
    // 			.catch((_err) => {
    // 				dialog.p.innerHTML = _err;
    // 				dialog.tampil();
    // 			});
    // 	}
    // 	catch (e) {
    // 		dialog.p.innerHTML = e;
    // 		dialog.tampil();
    // 	}
    // }
    default() {
        // let lapak: string = window.sessionStorage.getItem(Util.sLapakId);
        this.view.namaInput.value = 'nama';
        this.view.deskripsiPanjangInput.value = 'Deskripsi Barang';
        this.view.hargaBarangInput.value = 'Rp. 1000';
        // this.view.lapakInput.value = lapak;
    }
    objToForm(data) {
        this.view.namaInput.value = data.nama;
        this.view.deskripsiPanjangInput.value = data.deskripsi_panjang;
        this.view.hargaBarangInput.value = data.harga + '';
        this.view.wa.value = data.wa;
        this.view.inputFileId.value = data.file_id;
        this.view.lapakIdInput.value = data.lapak_id;
    }
    buatDate() {
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    formToObj(publish) {
        let desc = this._view.deskripsiPanjangInput.value;
        return {
            deskripsi_panjang: desc,
            file_id: Util.escape(this.view.inputFileId.value),
            harga: Util.escape(this.view.hargaBarangInput.value),
            id: Util.escape(this.view.postIdInput.value),
            nama: Util.escape(this.view.namaInput.value),
            wa: Util.escape(this.view.wa.value),
            publish: publish,
            last_view: this.buatDate(),
            lapak_id: this.view.lapakIdInput.value
        };
    }
    editFotoClick() {
        this.view.detach();
        this.upload = new PhotoUploadPage();
        this.upload.init();
        this.upload.view.attach(data.cont);
        this.upload.selesai = () => {
            this.upload.view.detach();
            this.upload.selesai = null;
            if (this.upload.statusUpload) {
                this.view.gambarHtml.src = this.upload.view.thumbCont.querySelector('canvas').toDataURL();
            }
            else {
                this.view.gambarHtml.src = this.dataLama ? this.dataLama.thumb : '';
            }
            this.view.attach(data.cont);
            this.resetTinyMCE();
        };
    }
    get view() {
        return this._view;
    }
    get editMode() {
        return this._editMode;
    }
    set editMode(value) {
        this._editMode = value;
    }
    get selesai() {
        return this._selesai;
    }
    set selesai(value) {
        this._selesai = value;
    }
}
class View extends BaseComponent {
    init() {
        this._elHtml = this.getTemplate('div.form');
    }
    get form() {
        return this.getEl('form');
    }
    get namaInput() {
        return this.getEl('form input#nama-barang');
    }
    get deskripsiPanjangInput() {
        return this.getEl('form textarea#deskripsi-barang-panjang');
    }
    get hargaBarangInput() {
        return this.getEl('form input#harga-barang');
    }
    get wa() {
        return this.getEl('form input#wa');
    }
    get submitTbl() {
        return this.getEl('button.submit');
    }
    get draftTbl() {
        return this.getEl('button.draft');
    }
    get inputFileId() {
        return this.getEl('input[type="hidden"].file_id');
    }
    get fotoCont() {
        return this.getEl('div.foto-cont');
    }
    get editFotoTbl() {
        return this.getEl('button.edit-foto');
    }
    get gambarHtml() {
        return this.getEl('img.foto');
    }
    get postIdInput() {
        return this.getEl('input[type="hidden"].post_id');
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get lapakInput() {
        return this.getEl('input.lapak');
    }
    get lapakIdInput() {
        return this.getEl('input.lapak_id');
    }
}
export var form = new FormBarangPage();
