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
import { dialog } from "../Dialog.js";
import { Util } from "../Util.js";
class AnggotaDaftar extends BaseComponent {
    constructor() {
        super();
        this.idDipilih = '';
        this._template = `
			<div class='anggota setuju'>
				<div class='nav'>
					<button class='btn btn-primary tutup'>&lt;</button>
					<p class='judul'>Daftar Anggota</p>
				</div>

				<div class='cont'></div>
				<button class='btn btn-danger hapus'>Hapus</button>
			</div>
		`;
        this.build();
        this.tutupTbl.onclick = () => {
            this._tutup();
        };
        this.hapusTbl.onclick = () => {
            if (this.idDipilih == '') {
                dialog.tampil2('Belum ada anggota yang dipilih');
            }
            let ok = window.confirm('Hapus Data?');
            if (ok) {
                this.hapus().then(() => {
                    dialog.tampil2('Sukses');
                    dialog.okTbl.onclick = () => {
                        this.load();
                    };
                }).catch(() => {
                    dialog.tampil2('Error');
                });
            }
        };
    }
    init() {
    }
    load() {
        this.load2().then((items) => {
            items.forEach((item) => {
                let view = new Item();
                view.id = item.id;
                view.attach(this.cont);
            });
        }).catch(() => {
            dialog.tampil2(Util.resp.message);
        });
    }
    load2() {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            let dataAr;
            let opt;
            opt = {
                setuju: 0
            };
            data = yield Util.Ajax('post', Util.urlAnggotaDaftar, JSON.stringify(opt));
            dataAr = JSON.parse(data);
            return dataAr;
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
    set tutup(value) {
        this._tutup = value;
    }
}
class Item extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='item'>
				<span class='nama'>nama</span>
				<button class='btn btn-primary btn-sm menu ok'>✔</button>
				<button class='btn btn-primary btn-sm menu tolak'>❌</button>
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
    get ok() {
        return this.getEl('button.ok');
    }
    get tolak() {
        return this.getEl('button.tolak');
    }
}
export var anggotaDaftar = new AnggotaDaftar();
