import { BaseComponent } from "../../BaseComponent.js";
// import { data } from "../../Data.js";
import { dialog } from "../../Dialog.js";
import { Util } from "../../Util.js";
class AnggotaDetailFragment {
    constructor() {
        this._view = new View();
    }
    tampil(id) {
        let baca = {
            id: id
        };
        Util.Ajax('post', Util.urlAnggotaBaca, JSON.stringify(baca)).then((hasil) => {
            let hasilObjAr = JSON.parse(hasil);
            let hasilObj = hasilObjAr[0];
            this._view.lapakP.innerHTML = hasilObj.lapak;
            this._view.deskripsiP.innerHTML = hasilObj.deskripsi != '' ? hasilObj.deskripsi : 'Belum ada deskripsi';
        }).catch((e) => {
            dialog.tampil2(e.message);
        });
    }
    get view() {
        return this._view;
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='anggota-detail-comp'>
				<small>lapak:</small>
				<p class='lapak'></p>
				<small>deskripsi:</small>
				<p class='deskripsi'></p>
			</div>
		`;
        this.build();
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
}
export var anggotaDetailFragment = new AnggotaDetailFragment();
