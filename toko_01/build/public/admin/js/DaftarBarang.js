"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DaftarBarangPage extends BaseComponent {
    init() {
        this._template = `
			<div class='daftar-barang-page'>
				<h1>Daftar Barang</h1>
				<button type='button' class='btn btn-primary tambah'>Tambah Data</button>
				<br/>
				<br/>
				<div class='cont'>
					
				</div>
			</div>			
		`;
        this.build();
        this.tambahTbl.onclick = () => {
            this.detach();
            App.form.attach(App.cont);
            App.form.editMode = true;
        };
    }
    //TODO: loading
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let str = yield App.Ajax("get", "/barang/baca", null);
            let barangAr = JSON.parse(str);
            this.cont.innerHTML = '';
            console.log('load ' + barangAr.length);
            barangAr.forEach((data) => {
                let view = new ItemBarangView();
                let item = Post.dataToObj(data);
                view.namaP.innerHTML = item.nama;
                view.deskripsiP.innerHTML = item.deskripsi;
                view.hargaP.innerHTML = item.harga + '';
                view.gbr.src = item.thumbUrl;
                view.attach(this.cont);
                view.editTbl.onclick = () => {
                    console.log(item);
                    this.detach();
                    App.form.attach(App.cont);
                    App.form.objToForm(Post.fromObj(item));
                    App.form.editMode = true;
                };
                view.hapusTbl.onclick = () => {
                    let hasil = confirm("Hapus Data?");
                    if (hasil) {
                        console.log('hapus data');
                        App.Ajax('get', '/barang/hapus/' + item.id, null).then((hasil) => {
                            console.log(hasil);
                            App.dialog.p.innerHTML = "Berhasil";
                            App.dialog.tampil();
                            App.dialog.okTbl.onclick = () => {
                                window.top.location.href = "/";
                            };
                        }).catch((e) => {
                            App.dialog.p.innerHTML = e;
                            App.dialog.tampil();
                        });
                    }
                };
            });
        });
    }
    get tambahTbl() {
        return this.getEl('button.tambah');
    }
    get cont() {
        return this.getEl('div.cont');
    }
}
class ItemBarangView extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='item-barang'>
				<div class='atas'>
					<img src="">
					<div class='deskripsi'>
						<p class='nama'></p>
						<p class='deskripsi'></p>
						<p class='harga'></p>
					</div>
				</div>
				<div class='bawah'>
					<button type='button' class='btn btn-primary edit'>Edit</button>
					<button type='button' class='btn btn-danger hapus'>Hapus</button>
				</div>
				<hr/>
			</div>
		`;
        this.build();
    }
    get editTbl() {
        return this.getEl('button.edit');
    }
    get hapusTbl() {
        return this.getEl('button.hapus');
    }
    get gbr() {
        return this.getEl('img');
    }
    get namaP() {
        return this.getEl('div.deskripsi p.nama');
    }
    get deskripsiP() {
        return this.getEl('div.deskripsi p.deskripsi');
    }
    get hargaP() {
        return this.getEl('p.harga');
    }
}
