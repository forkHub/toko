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
import { Util } from "../Util.js";
import { anggotaDetail } from "./AnggotaDetail.js";
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
    }
    init() {
    }
    load() {
        this.load2().then((items) => {
            items.forEach((item) => {
                let view = new Item();
                view.id = item.id;
                view.nama.innerHTML = item.user_id + "-" + item.lapak;
                view.hapus.onclick = () => {
                    dialog.tampil2('Fitur belum tersedia');
                };
                view.lihat.onclick = () => {
                    this.detach();
                    anggotaDetail.tampil(item);
                    anggotaDetail.tutup = () => {
                        this.attach(data.cont);
                    };
                };
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
            data = yield Util.Ajax('post', Util.getUrl(Util.urlAnggotaBacaDisetujui, ["1"]), "");
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
				<button class='btn btn-primary btn-sm menu lihat'>👁️</button> 
				<button class='btn btn-primary btn-sm menu hapus'>❌</button>
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
    get lihat() {
        return this.getEl('button.lihat');
    }
    get hapus() {
        return this.getEl('button.hapus');
    }
}
export var anggotaDaftar = new AnggotaDaftar();
