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
import { Util } from "../Util.js";
class Setuju {
    constructor() {
        this.view = new View();
        this.view.setujuTbl.click = () => {
            if (0 == this.itemDipilih.item.setuju) {
                //ajax: setuju
            }
        };
        this.view.tolakTbl.click = () => {
            if (1 == this.itemDipilih.item.setuju) {
                //ajax: tolak
            }
        };
    }
    tampil() {
        this.view.attach(data.cont);
        //load data
        this.data().then().catch();
    }
    data() {
        return __awaiter(this, void 0, void 0, function* () {
            let hasil = yield this.loadData();
            this.view.listCont.innerHTML = '';
            hasil.forEach((item, idx) => {
                let view = new ItemView();
                view.nama.innerHTML = item.user_id + '/' + item.lapak;
                view.item = item;
                view.attach(this.view.listCont);
                if (0 == idx) {
                    view.elHtml.classList.add('pilih');
                    this.itemDipilih = view;
                }
            });
        });
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            let hasil = yield Util.Ajax("post", Util.urlAnggotaDaftarSetuju, '');
            let obj = JSON.parse(hasil);
            return obj;
        });
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='setuju'>
				<h3>Persetujuan Anggota</h3>
				<button class='btn btn-normal btn-primary refresh'>Refresh</button>
				<button class='btn btn-normal btn-primary setuju'>Setuju</button>
				<button class='btn btn-normal btn-danger tolak'>Tolak</button>
				<div class='list-cont'>

				</div>
			</div>
		`;
        this.build();
    }
    get listCont() {
        return this.getEl('div.list-cont');
    }
    get setujuTbl() {
        return this.getEl('button.setuju');
    }
    get tolakTbl() {
        return this.getEl('button.tolak');
    }
}
class ItemView extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='item'>
				<p class='nama'></p>
			</div>
		`;
        this.build();
    }
    get nama() {
        return this.getEl('p.nama');
    }
    get item() {
        return this._item;
    }
    set item(value) {
        this._item = value;
    }
}
export var setuju = new Setuju();
