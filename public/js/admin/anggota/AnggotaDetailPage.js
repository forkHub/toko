import { BaseComponent } from "../../BaseComponent.js";
import { data } from "../../Data.js";
import { HalTemplate } from "../../template/HalTemplate.js";
import { Util } from "../../Util.js";
import { anggotaDetailFragment } from "./AnggotaDetailFragment.js";
import { editProfile } from "./EditProfilePage.js";
import { gantiPasswordPage } from "./GantiPasswordPAge.js";
class AnggotaDetailPage {
    constructor() {
        this._view = new HalTemplate('Info Detail Anggota');
        this.tombolFragment = new EditFragment();
        anggotaDetailFragment.view.attach(this._view.bodyCont);
        this._view.nav.judulP.innerHTML = 'Info Detail Anggota: ';
        this._view.nav.tutupTbl.onclick = () => {
            this._view.detach();
            this._selesai();
        };
        this.tombolFragment.attach(this._view.bodyCont);
        this.tombolFragment.editTbl.onclick = () => {
            this._view.detach();
            editProfile.tampil(true, window.sessionStorage.getItem(Util.sLapakId));
            editProfile.selesai = () => {
                this._view.attach(data.cont);
            };
        };
    }
    tampil(id, edit) {
        console.log('AnggotaDetailPage.tampil ' + id);
        console.log(JSON.stringify(this));
        this._view.attach(data.cont);
        anggotaDetailFragment.tampil(id);
        if (!edit) {
            this.tombolFragment.elHtml.style.display = 'block';
        }
        else {
            this.tombolFragment.elHtml.style.display = 'initial';
        }
        this.tombolFragment.passwordTbl.onclick = () => {
            this._view.detach();
            gantiPasswordPage.tampil(id, () => {
                this._view.attach(data.cont);
            });
        };
    }
    set selesai(f) {
        this._selesai = f;
    }
    get view() {
        return this._view;
    }
}
class EditFragment extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='edit-anggota-tombol'>
				<button class='btn btn-primary btn-sm edit'>Edit</button>
				<button class='btn btn-primary btn-sm password'>Ganti Password</button>
			</div>
		`;
        this.build();
    }
    get passwordTbl() {
        return this.getEl('button.password');
    }
    get editTbl() {
        return this.getEl('button.edit');
    }
}
export var anggotaDetailPage = new AnggotaDetailPage();
