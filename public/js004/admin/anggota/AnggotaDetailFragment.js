import { BaseComponent } from "../../BaseComponent.js";
import { dialog } from "../../Dialog.js";
import { Util } from "../../Util.js";
class AnggotaDetailFragment {
    constructor() {
        this._view = new View();
    }
    reload(id) {
        console.log(this.constructor.name + ': reload id ' + id);
        let baca = {
            id: id
        };
        Util.Ajax('post', Util.urlAnggotaBaca, JSON.stringify(baca)).then((hasil) => {
            let hasilObjAr = JSON.parse(hasil);
            let hasilObj = hasilObjAr[0];
            console.log(hasilObj);
            this._view.userNameP.innerHTML = hasilObj.user_id;
            this._view.lapakP.innerHTML = hasilObj.lapak;
            this._view.deskripsiP.innerHTML = hasilObj.deskripsi != '' ? hasilObj.deskripsi : 'Belum ada deskripsi';
            this._view.waP.innerHTML = hasilObj.wa != '' ? hasilObj.wa : 'WA Belum diisi';
            this._view.alamatP.innerHTML = hasilObj.alamat != '' ? hasilObj.alamat : 'Alamat belum diisi';
        }).catch((e) => {
            dialog.tampil2(e.message);
        });
    }
    tampil(id) {
        this.reload(id);
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
				<small>username:</small>
				<p class='username'></p>
				<small>lapak:</small>
				<p class='lapak'></p>
				<small>deskripsi:</small>
				<p class='deskripsi'></p>
				<small>wa:</small>
				<p class='wa'></p>
				<small>alamat:</small>
				<p class='alamat'></p>
			</div>
		`;
        this.build();
    }
    get userNameP() {
        return this.getEl('p.username');
    }
    get lapakP() {
        return this.getEl('p.lapak');
    }
    get deskripsiP() {
        return this.getEl('p.deskripsi');
    }
    get waP() {
        return this.getEl('p.wa');
    }
    get alamatP() {
        return this.getEl('p.alamat');
    }
}
export var anggotaDetailFragment = new AnggotaDetailFragment();