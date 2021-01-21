var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseComponent } from "../../BaseComponent.js";
import { data } from "../../Data.js";
import { dialog } from "../../Dialog.js";
import { HalTemplate } from "../../template/HalTemplate.js";
import { Util } from "../../Util.js";
import { anggotaDetailPage } from "./AnggotaDetailPage.js";
import { AnggotaItem } from "./AnggotaItem.js";
class AnggotaNonAktif {
    constructor() {
        this._view = new View();
        this._view.hal.nav.judulP.innerHTML = 'Daftar anggtoa non aktif';
    }
    get view() {
        return this._view;
    }
    tampil() {
        this.render();
    }
    loadJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            let dataAr;
            data = yield Util.Ajax('post', Util.getUrl(Util.urlAnggotaBacaBerdasarPersetujuan, ["2"]), "");
            dataAr = JSON.parse(data);
            return dataAr;
        });
    }
    render() {
        this._view.elHtml.innerHTML = '';
        this.loadJSON().then((items) => {
            items.forEach((item) => {
                let view = new AnggotaItem();
                view.id = item.id;
                view.nama.innerHTML = item.user_id + "-" + item.lapak;
                view.hapus.onclick = () => {
                    let confirm = window.confirm('Apakah anda akan menghapus data anggota?');
                    if (confirm) {
                        Util.Ajax('post', Util.getUrl(Util.urlAnggotaHapus, [view.id]), '').then(() => {
                            dialog.tampil2('anggota telah dihapus');
                            dialog.okTbl.onclick = () => {
                                this.render();
                                dialog.detach();
                            };
                        }).catch((e) => {
                            dialog.tampil2(e.message);
                        });
                    }
                };
                view.lihat.onclick = () => {
                    this._view.hal.detach();
                    anggotaDetailPage.view.attach(data.cont);
                    anggotaDetailPage.tampil(view.id, false);
                    anggotaDetailPage.selesai = () => {
                        this._view.hal.attach(data.cont);
                    };
                };
                view.attach(this._view.elHtml);
            });
        }).catch(() => {
            dialog.tampil2(Util.resp.message);
        });
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this._hal = new HalTemplate('Daftar anggtoa non aktif');
        this._template = `
			<div class='anggota non-aktif'>

			</div>
		`;
        this.build();
        this.attach(this._hal.elHtml);
    }
    get hal() {
        return this._hal;
    }
}
export var anggotaNonAktif = new AnggotaNonAktif();
