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
import { dialog } from "../Dialog.js";
import { Nav } from "../template/Nav.js";
// import { IConfigDb } from "./Type";
import { Util } from "../Util.js";
class ConfigForm {
    constructor() {
        this._view = new View();
        this.settings = [];
        this.settingViews = [];
        this.formInit();
    }
    formInit() {
        this._view.form.onsubmit = () => {
            try {
                this.simpanKeServer();
                return false;
            }
            catch (e) {
                dialog.tampil2(e.message);
                return false;
            }
            return false;
        };
    }
    tampil() {
        return __awaiter(this, void 0, void 0, function* () {
            let setting = yield Util.Ajax('post', Util.urlConfigBaca, '');
            this.render(JSON.parse(setting));
        });
    }
    simpanKeServer() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.settingViews.length; i++) {
                let item = this.settingViews[i].setting;
                let view = this.settingViews[i];
                item.nilai = view.input.value;
                yield Util.Ajax('post', Util.getUrl(Util.urlConfigUpdate, [item.kunci]), JSON.stringify(item));
            }
            yield Util.Ajax('post', Util.urlConfigReload, '');
        });
    }
    render(data) {
        this.view.elmCont.innerHTML = '';
        this.settings = [];
        this.settingViews = [];
        data.forEach((item) => {
            let settingView = new SettingItemView();
            settingView.label.innerHTML = item.deskripsi;
            settingView.input.classList.add(item.kunci);
            settingView.input.value = item.nilai;
            settingView.setting = item;
            settingView.attach(this.view.elmCont);
            this.settingViews.push(settingView);
            this.settings.push(item);
        });
    }
    get view() {
        return this._view;
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this.nav = new Nav();
        this._template = `
			<div class='config-edit-form'>
				<div class="nav-cont">
				</div>
				<br/>
				<form class='cont'>
					<div class='element-cont'>

					</div>
					<button type='submit' class='btn btn-primary btn-sm simpan'>Simpan</button>
				</form>
			</div>
		`;
        this.build();
        this.nav.attach(this.navCont);
    }
    get navCont() {
        return this.getEl('div.nav-cont');
    }
    get tutupTbl() {
        return this.nav.tutupTbl;
    }
    get form() {
        return this.getEl('form.cont');
    }
    get elmCont() {
        return this.getEl('form.cont div.element-cont');
    }
    get simpanTbl() {
        return this.getEl('button.simpan');
    }
}
class SettingItemView extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class="form-group">
				<label for="lapak_id">lapak:</label>
				<input type="text" class="form-control" required/>
			</div>
		`;
        this.build();
    }
    get label() {
        return this.getEl('label');
    }
    get input() {
        return this.getEl('input');
    }
    get setting() {
        return this._setting;
    }
    set setting(value) {
        this._setting = value;
    }
}
export var configForm = new ConfigForm();
