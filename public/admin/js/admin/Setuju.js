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
class Setuju {
    constructor() {
        this._view = new View();
        this._view.tutupTbl.onclick = () => {
            console.log('tutup');
            this._tutup();
        };
    }
    get view() {
        return this._view;
    }
    tampil() {
        this.view.attach(data.cont);
        this.renderData().then().catch((e) => {
            dialog.tampil2(e.message);
        });
    }
    renderData() {
        return __awaiter(this, void 0, void 0, function* () {
            let hasil = yield this.loadData();
            this.view.listCont.innerHTML = '';
            hasil.forEach((item, idx) => {
                let view = new ItemView();
                view.nama.innerHTML = item.user_id + ' - ' + item.lapak;
                view.item = item;
                view.okTbl.onclick = () => {
                    Util.Ajax("post", Util.getUrl(Util.urlAnggotaUpdateSetuju, [item.id, "1"]), "")
                        .then(() => {
                        this.renderData();
                    })
                        .catch((e) => {
                        dialog.tampil2(e.message);
                    });
                };
                view.tolakTbl.onclick = () => {
                    Util.Ajax("post", Util.getUrl(Util.urlAnggotaUpdateSetuju, [item.id, "2"]), "")
                        .then(() => {
                        this.renderData();
                    })
                        .catch((e) => {
                        dialog.tampil2(e.message);
                    });
                };
                view.attach(this.view.listCont);
                if (0 == idx) {
                    view.elHtml.classList.add('pilih');
                }
            });
        });
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            let hasil = yield Util.Ajax("post", Util.getUrl(Util.urlAnggotaBacaDisetujui, ["0"]), "");
            let obj = JSON.parse(hasil);
            return obj;
        });
    }
    set tutup(value) {
        this._tutup = value;
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='setuju'>
				<div class='nav'>
					<button class='btn btn-primary tutup'>&lt;</button>
					<p class='judu'>Persetujuan Anggota</p>
				</div>
				<div class='list-cont'>

				</div>
			</div>
		`;
        this.build();
    }
    get listCont() {
        return this.getEl('div.list-cont');
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
}
class ItemView extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='item'>
				<span class='nama'></span>
				<button class='btn btn-sm ok'>✔</button> 
				<button class='btn btn-sm tolak'>❌</button>
			</div>
		`;
        this.build();
    }
    get nama() {
        return this.getEl('span.nama');
    }
    get okTbl() {
        return this.getEl('button.ok');
    }
    get tolakTbl() {
        return this.getEl('button.tolak');
    }
    get item() {
        return this._item;
    }
    set item(value) {
        this._item = value;
    }
}
export var setuju = new Setuju();
