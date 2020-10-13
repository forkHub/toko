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
class AnggotaDaftar extends BaseComponent {
    constructor() {
        super();
        this.idDipilih = '';
        this._template = `
			<div class=''>
				<p class='judul'>Daftar Anggota</p>
				<div class='cont'></div>
				<button class='btn btn-primary tutup'>Tutup</button>
				<button class='btn btn-danger hapus'>Hapus</button>
			</div>
		`;
        this.build();
        this.tutupTbl.onclick = () => {
            this._tutup();
        };
        this.hapusTbl.onclick = () => {
            if (this.idDipilih == '') {
                App.dialog.tampil2('Belum ada anggota yang dipilih');
            }
            let ok = window.confirm('Hapus Data?');
            if (ok) {
                this.hapus().then(() => {
                    App.dialog.tampil2('Sukses');
                    App.dialog.okTbl.onclick = () => {
                        this.load();
                    };
                }).catch(() => {
                    App.dialog.tampil2('Error');
                });
            }
        };
    }
    set tutup(value) {
        this._tutup = value;
    }
    init() {
    }
    load() {
        this.load2().then().catch(() => {
            App.dialog.tampil2(Util.resp.message);
        });
    }
    load2() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield Util.Ajax('post', Util.urlAnggotaDaftar, "");
            let dataAr = JSON.parse(data);
            // console.log(data);
            // console.log(dataAr);
            this.cont.innerHTML = '';
            dataAr.forEach((item) => {
                // console.log(item);
                let view = new AnggotaDaftarItem();
                view.id = item.id;
                view.nama.innerHTML = item.id + '';
                view.attach(this.cont);
            });
        });
    }
    hapus() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Util.Ajax('post', Util.urlAnggotaHapus, JSON.stringify({ id: this.idDipilih }));
            if (Util.resp.code != 200) {
                throw Error(Util.resp.message);
            }
        });
    }
    get hapusTbl() {
        return this.getEl('button.hapus');
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get cont() {
        return this.getEl('div.cont');
    }
}
class AnggotaDaftarItem extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='item'>
				<span class='nama'>nama</span>
			</div>
		`;
        this.build();
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get nama() {
        return this.getEl('span.nama');
    }
}
