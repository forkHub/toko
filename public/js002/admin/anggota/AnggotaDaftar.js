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
import { Nav } from "../../template/Nav.js";
import { Util } from "../../Util.js";
import { anggotaDetailPage } from "./AnggotaDetailPage.js";
import { AnggotaItem } from "./AnggotaItem.js";
class AnggotaDaftar extends BaseComponent {
    constructor() {
        super();
        this.idDipilih = '';
        this.nav = new Nav();
        this._template = `
			<div class='anggota setuju'>
				<div class="nav-cont">
				</div>
				<br/>

				<div class='cont'></div>
			</div>
		`;
        this.build();
        this.nav.judulP.innerHTML = 'Daftar Anggota';
        this.nav.attach(this.navCont);
        this.nav.tutupTbl.onclick = () => {
            this._selesai();
        };
    }
    init() {
    }
    tampil() {
        this.render();
    }
    render() {
        this.cont.innerHTML = '';
        this.loadJSON().then((items) => {
            items.forEach((item) => {
                let view = new AnggotaItem();
                view.id = item.id;
                view.nama.innerHTML = item.user_id + "-" + item.lapak;
                view.hapus.onclick = () => {
                    let ok = window.confirm('Apakah Anda ingin menonaktifkan Anggota ini?');
                    if (ok) {
                        Util.Ajax('post', Util.getUrl(Util.urlAnggotaUpdateSetuju, [view.id, '2']), '').then(() => {
                            this.render();
                        }).catch((e) => {
                            dialog.tampil2(e.message);
                        });
                    }
                    else {
                    }
                };
                view.lihat.onclick = () => {
                    this.detach();
                    anggotaDetailPage.tampil(view.id, true);
                    anggotaDetailPage.selesai = () => {
                        this.attach(data.cont);
                    };
                };
                view.attach(this.cont);
            });
        }).catch(() => {
            dialog.tampil2(Util.resp.message);
        });
    }
    // async nonAktifkan(id: string): Promise<void> {
    // 	await Util.Ajax('post', Util.getUrl(Util.urlAnggotaUpdateSetuju, [id, '2']), '');
    // }
    loadJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            let dataAr;
            data = yield Util.Ajax('post', Util.getUrl(Util.urlAnggotaBacaBerdasarPersetujuan, ["1"]), "");
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
    get cont() {
        return this.getEl('div.cont');
    }
    get navCont() {
        return this.getEl('div.nav-cont');
    }
    set tutup(value) {
        this._selesai = value;
    }
}
export var anggotaDaftar = new AnggotaDaftar();
