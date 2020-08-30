"use strict";
class FormPage extends BaseComponent {
    constructor() {
        super();
        this.id = '';
        this._editMode = false;
    }
    get editMode() {
        return this._editMode;
    }
    set editMode(value) {
        this._editMode = value;
    }
    init() {
        this._elHtml = this.getTemplate('div.form');
        this.default();
        this.form.onsubmit = (e) => {
            e.stopPropagation();
            console.log(this._editMode);
            if (this.editMode) {
                this.edit();
            }
            else {
                this.simpan();
            }
            return false;
        };
    }
    edit() {
        try {
            App.Ajax('post', 'barang/update/' + this.id, JSON.stringify(Post.toObj(this.formToObj())))
                .then((hasil) => {
                console.log(hasil);
                App.dialog.p.innerText = 'Sukses';
                App.dialog.tampil(false);
                App.dialog.okTbl.onclick = () => {
                    console.log('tombol on click');
                    window.top.location.href = "/";
                };
            })
                .catch((_err) => {
                App.dialog.p.innerHTML = _err;
                App.dialog.tampil();
            });
        }
        catch (e) {
            App.dialog.p.innerHTML = e;
            App.dialog.tampil();
        }
    }
    simpan() {
        try {
            App.Ajax('post', 'barang/baru', JSON.stringify(Post.toObj(this.formToObj())))
                .then((hasil) => {
                console.log(hasil);
                App.dialog.p.innerText = 'Sukses';
                App.dialog.tampil(false);
                App.dialog.okTbl.onclick = () => {
                    window.top.location.href = "/";
                };
            })
                .catch((_err) => {
                App.dialog.p.innerHTML = _err;
                App.dialog.tampil();
            });
        }
        catch (e) {
            App.dialog.p.innerHTML = e;
            App.dialog.tampil();
        }
    }
    default() {
        this.namaInput.value = 'nama';
        this.deskripsiBarangInput.value = 'deskripsi';
        this.deskripsiPanjangInput.value = 'deskripsi2';
        this.hargaBarangInput.value = '1000';
        this.wa.value = '12345';
        this.gbrUrl.value = 'url-gambar';
        this.thumbUrl.value = 'url thumb';
    }
    objToForm(data) {
        this.namaInput.value = data.nama;
        this.deskripsiBarangInput.value = data.deskripsi;
        this.deskripsiPanjangInput.value = data.deskripsiPanjang;
        this.hargaBarangInput.value = data.harga + '';
        this.gbrUrl.value = data.gbrUrl;
        this.thumbUrl.value = data.thumbUrl;
        this.wa.value = data.wa;
        this.id = data.id;
        console.log(data);
    }
    formToObj() {
        let postObj = new PostObj();
        postObj.nama = this.namaInput.value;
        postObj.deskripsi = this.deskripsiBarangInput.value;
        postObj.deskripsiPanjang = this.deskripsiPanjangInput.value;
        postObj.harga = parseInt(this.hargaBarangInput.value);
        postObj.gbrUrl = this.gbrUrl.value;
        postObj.thumbUrl = this.thumbUrl.value;
        postObj.wa = this.wa.value;
        postObj.id = this.id;
        return postObj;
    }
    get form() {
        return this.getEl('form');
    }
    get namaInput() {
        return this.getEl('form input#nama-barang');
    }
    get deskripsiBarangInput() {
        return this.getEl('form input#deskripsi-barang');
    }
    get deskripsiPanjangInput() {
        return this.getEl('form textarea#deskripsi-barang-panjang');
    }
    get hargaBarangInput() {
        return this.getEl('form input#harga-barang');
    }
    get gbrUrl() {
        return this.getEl('form input#gbr-url');
    }
    get thumbUrl() {
        return this.getEl('form input#thumb-url');
    }
    get wa() {
        return this.getEl('form input#wa');
    }
    get submitTbl() {
        return this.getEl('button.submit');
    }
}
