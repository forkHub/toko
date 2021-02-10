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
class GantiPasswordPage {
    constructor() {
        this._form = new FormFragment();
        this._id = '';
        this._view = new HalTemplate('Form Ganti Password');
        this._form.attach(this._view.bodyCont);
        this._form.form.onsubmit = () => {
            try {
                this.submit()
                    .then(() => {
                    dialog.tampil2('Sukses');
                    dialog.okTbl.onclick = () => {
                        this._view.detach();
                        dialog.detach();
                        this._selesai();
                    };
                })
                    .catch((e) => {
                    console.log(e);
                    dialog.tampil2(e.message, true);
                });
            }
            catch (e) {
                console.log(e);
                dialog.tampil2(e.message, true);
            }
            return false;
        };
    }
    set selesai(value) {
        this._selesai = value;
    }
    get form() {
        return this._form;
    }
    get view() {
        return this._view;
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._form.password1.value != this._form.password2.value) {
                throw Error('password tidak sama');
            }
            let data = {
                id: this._id,
                password: md5(this._form.password1.value)
            };
            yield Util.Ajax('post', Util.urlAnggotaUpdatePassword, JSON.stringify(data));
        });
    }
    tampil(id, selesai) {
        this._view.attach(data.cont);
        this._id = id;
        this._selesai = selesai;
        this._view.nav.tutupTbl.onclick = () => {
            this._view.detach();
            selesai();
        };
    }
}
class FormFragment extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='form-ganti-password'>
				<form>
					<div class="form-group">
						<label for="password1">Password 1:</label>
						<input type="password" class="form-control password1" name="password1" id="password1" required />
					</div>
					<div class="form-group">
						<label for="password2">Password 2:</label>
						<input type="password" class="form-control password2" name="password2" id="password2" required />
					</div>
					<button type='submit' class='btn btn-sm btn-primary'>Ok</button>
				</form>
			</div>`;
        this.build();
    }
    get form() {
        return this.getEl('form');
    }
    get password1() {
        return this.getEl('input.password1');
    }
    get password2() {
        return this.getEl('input.password2');
    }
}
export var gantiPasswordPage = new GantiPasswordPage();
