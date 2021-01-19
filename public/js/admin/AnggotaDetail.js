import { BaseComponent } from "../BaseComponent.js";
import { data } from "../Data.js";
import { dialog } from "../Dialog.js";
import { Nav } from "../template/Nav.js";
import { Util } from "../Util.js";
class AnggotaDetail {
    constructor() {
        this._view = new View();
        this._view.nav.tutupTbl.onclick = () => {
            this._view.detach();
            this._selesai();
        };
    }
    tampil(id) {
        let baca = {
            id: window.sessionStorage.getItem(id)
        };
        Util.Ajax('post', Util.urlAnggotaBaca, JSON.stringify(baca)).then((hasil) => {
            let hasilObjAr = JSON.parse(hasil);
            let hasilObj = hasilObjAr[0];
            this._view.lapakP.innerHTML = hasilObj.lapak;
            this._view.deskripsiP.innerHTML = hasilObj.deskripsi != '' ? hasilObj.deskripsi : 'Belum ada deskripsi';
            //info apa aja
            this._view.attach(data.cont);
        }).catch((e) => {
            dialog.tampil2(e.message);
        });
    }
    set selesai(f) {
        this._selesai = f;
    }
    get view() {
        return this._view;
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this._nav = new Nav();
        this._template = `
			<div class='anggota-detail'>
				<div class="nav-cont">
				</div>
				<br/>
				<small>lapak:</small>
				<p class='lapak'></p>
				<small>deskripsi:</small>
				<p class='deskripsi'></p>
			</div>
		`;
        this.build();
        this.nav.judulP.innerHTML = 'Detail Anggota';
        this.nav.attach(this.navCont);
    }
    get nav() {
        return this._nav;
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get lapakP() {
        return this.getEl('p.lapak');
    }
    get deskripsiP() {
        return this.getEl('p.deskripsi');
    }
    get navCont() {
        return this.getEl('div.nav-cont');
    }
}
export var anggotaDetail = new AnggotaDetail();
