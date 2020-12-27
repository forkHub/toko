import { BaseComponent } from "../BaseComponent.js";
import { data } from "../Data.js";
import { dialog } from "../Dialog.js";
import { upload } from "../PhotoUploadPage.js";
import { Util } from "../Util.js";
class FormBarangPage {
    constructor() {
        this.id = '';
        this._editMode = false;
        this._view = new View();
        this._selesai = null;
    }
    tampil(_item, _baru) {
        //TODO:
        this._view.namaInput.focus;
    }
    baru() {
        //TODO:
    }
    edit() {
        //TODO:
    }
    simpanState() {
        //TODO: implementasi
    }
    //TODO: check perubahan
    checkPerubahan() {
        return true;
        // let isi2: string = JSON.stringify(this.formToObj(1));
        // if (isi2 != this.isi1) {
        // 	console.log(this.isi1);
        // 	console.log(isi2);
        // 	return true;
        // }
        // return false;
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
        // this.upload = App.upload;
        this.default();
        this.view.form.onsubmit = (e) => {
            e.stopPropagation();
            console.log(this._editMode);
            if (this._editMode) {
                this.editKirim(1);
            }
            else {
                this.simpanKirim(1);
            }
            return false;
        };
        this.view.draftTbl.onclick = () => {
            console.group('click draft button');
            if (this._editMode) {
                this.editKirim(0);
            }
            else {
                this.simpanKirim(0);
            }
            console.groupEnd();
        };
        this.view.editFotoTbl.onclick = () => {
            this.editFotoClick();
        };
        this.view.tutupTbl.onclick = () => {
            window.top.location.href = Util.urlAdmin;
        };
    }
    editKirim(publish) {
        try {
            if (false == this.checkPerubahan()) {
                console.log('tidak berubah');
                return;
            }
            else {
                console.log('berubah');
            }
            Util.Ajax('post', '/barang/update/' + this.id, JSON.stringify(this.formToObj(publish)))
                .then((hasil) => {
                console.log('update sukses');
                console.log(hasil);
                dialog.p.innerText = 'Sukses';
                dialog.tampil(false);
                dialog.okTbl.onclick = () => {
                    console.log('tombol on click');
                    window.top.location.href = Util.urlAdmin;
                };
            })
                .catch((_err) => {
                dialog.p.innerHTML = _err;
                dialog.tampil();
            });
        }
        catch (e) {
            dialog.p.innerHTML = e;
            dialog.tampil();
        }
    }
    simpanKirim(publish) {
        try {
            Util.Ajax('post', '/barang/baru', JSON.stringify(this.formToObj(publish)))
                .then((hasil) => {
                console.log(hasil);
                dialog.p.innerText = 'Sukses';
                dialog.tampil(false);
                dialog.okTbl.onclick = () => {
                    window.top.location.href = Util.urlAdmin;
                };
            })
                .catch((_err) => {
                dialog.p.innerHTML = _err;
                dialog.tampil();
            });
        }
        catch (e) {
            dialog.p.innerHTML = e;
            dialog.tampil();
        }
    }
    default() {
        let lapak = window.sessionStorage.getItem('lapak');
        this.view.namaInput.value = 'nama';
        this.view.deskripsiPanjangInput.value = 'Deskripsi Barang';
        this.view.hargaBarangInput.value = 'Rp. 1000';
        this.view.lapakInput.value = lapak;
        if ('auni' == lapak) {
            this.view.wa.value = '6281219753619'; //https://wa.me/6281219753619?text=Assalamualaikum
        }
        else {
            this.view.wa.value = '62xxx';
        }
    }
    objToForm(data) {
        this.view.namaInput.value = data.nama;
        this.view.deskripsiPanjangInput.value = data.deskripsi_panjang;
        this.view.hargaBarangInput.value = data.harga + '';
        this.view.wa.value = data.wa;
        this.id = data.id;
        this.view.inputFileId.value = data.file_id;
        this.view.lapakInput.value = data.lapak;
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
            lapak: Util.escape(this.view.lapakInput.value),
            last_view: this.buatDate(),
            lapak_id: this.view.lapakIdInput.value
        };
    }
    editFotoClick() {
        this.view.detach();
        upload.view.attach(data.cont);
        upload.reset();
        upload.selesai = () => {
            upload.view.detach();
            upload.selesai = null;
            this.view.inputFileId.value = upload.insertedId;
            this.view.gambarHtml.src = upload.gbrUrl;
            this.view.attach(data.cont);
            this.resetTinyMCE();
        };
        upload.view.tutupTbl.onclick = () => {
            upload.view.detach();
            upload.reset();
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
