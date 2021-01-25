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
class EditProfile {
    constructor() {
        this._view = new HalTemplate('Form Edit Profile');
        this.editFragment = new EditFragement();
        this.editMode = false; //TODO: depecreated, selalu edit
        this.editFragment.attach(this._view.bodyCont);
        this._view.nav.tutupTbl.onclick = () => {
            this._view.detach();
            this._selesai();
        };
        this.editFragment.form.onsubmit = () => {
            try {
                this.formSubmit().then(() => {
                    dialog.tampil2('Sukses');
                    dialog.okTbl.onclick = () => {
                        dialog.detach();
                        this._view.detach();
                        this._selesai();
                    };
                }).catch((e) => {
                    dialog.tampil2(e.message);
                });
                return false;
            }
            catch (e) {
                dialog.tampil2(e.message);
                return false;
            }
        };
    }
    set selesai(value) {
        this._selesai = value;
    }
    get view() {
        return this._view;
    }
    tampil(editMode, id) {
        if (editMode) {
            this._view.attach(data.cont);
            this.editMode = true;
            this.loadData(id).then((data) => {
                this.dataLama = {
                    deskripsi: data.deskripsi,
                    id: data.id,
                    lapak: data.lapak,
                    level: data.level,
                    password: data.password,
                    setuju: data.setuju,
                    user_id: data.user_id
                };
                this.obj2Form();
            }).catch((e) => {
                dialog.tampil2(e.message);
                dialog.okTbl.onclick = () => {
                    dialog.detach();
                    this._view.detach();
                    this._selesai();
                };
            });
        }
    }
    loadData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let bacaObj = {
                id: id
            };
            let dataStr = yield Util.Ajax('post', Util.urlAnggotaBaca, JSON.stringify(bacaObj));
            let dataObj = JSON.parse(dataStr);
            return dataObj[0];
        });
    }
    formSubmit() {
        return __awaiter(this, void 0, void 0, function* () {
            //validasi user name double
            //data
            let dataObj = this.form2Obj();
            let dataStr = JSON.stringify(dataObj);
            if (this.editMode) {
                yield Util.Ajax('post', Util.urlAnggotaUpdate, dataStr);
            }
            else {
                yield Util.Ajax('post', Util.urlAnggotaUpdate, dataStr);
            }
        });
    }
    form2Obj() {
        return {
            deskripsi: this.editFragment.deskripsiInput.value,
            lapak: this.editFragment.lapakInput.value,
            user_id: this.editFragment.userNameInput.value,
            id: this.dataLama.id
            // password: this.editFragment.password1Input.value
        };
    }
    obj2Form() {
        this.editFragment.lapakInput.value = this.dataLama.lapak;
        this.editFragment.userNameInput.value = this.dataLama.user_id;
        this.editFragment.deskripsiInput.value = this.dataLama.deskripsi;
        this.editFragment.userNameInput.value = this.dataLama.user_id;
        // this.editFragment.password1Input.value = this.dataLama.password;
        // this.editFragment.password2Input.value = this.dataLama.password;
    }
}
class EditFragement extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='edit-profile-form'>
				<form action="">
					<div class="form-group">
						<label for="user-name">UserName:</label>
						<input type="text" class="form-control user-name" name="user-name" id="user-name" required readonly/>
					</div>

					<div class="form-group">
						<label for="nama-lapak">Lapak:</label>
						<input type="text" class="form-control nama-lapak" name="nama-lapak" id="nama-lapak" required />
					</div>

					<div class="form-group">
						<label for="deskripsi-lapak">Deskripsi:</label>
						<input type="text" class="form-control deskripsi-lapak" name="deskripsi-lapak" id="deskripsi-lapak" required />
					</div>

					<div>
						<button type='submit' class='btn btn-primary btn-sm'>Simpan</button>
					</div>
				</form>			
			</div>
		`;
        this.build();
    }
    get form() {
        return this.getEl('form');
    }
    get userNameInput() {
        return this.getEl('input.user-name');
    }
    get lapakInput() {
        return this.getEl('input.nama-lapak');
    }
    get deskripsiInput() {
        return this.getEl('input.deskripsi-lapak');
    }
}
export var editProfile = new EditProfile();
