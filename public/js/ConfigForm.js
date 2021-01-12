var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseComponent } from "./BaseComponent";
// import { IConfigDb } from "./Type";
import { Util } from "./Util";
class ConfigForm {
    constructor() {
        this.view = new View();
        this.settings = [];
        this.settingViews = [];
        // this.view;
    }
    simpanKeServer() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.settingViews.length; i++) {
                let item = this.settingViews[i].setting;
                yield Util.Ajax('post', Util.getUrl(Util.urlConfigUpdate, [item.key]), '');
            }
            yield Util.Ajax('post', Util.urlConfigReload, '');
        });
    }
    render(data) {
        this.view.cont.innerHTML = '';
        this.settings = [];
        this.settingViews = [];
        data.forEach((item) => {
            let settingView = new SettingItemView();
            settingView.label.innerHTML = item.deskripsi;
            settingView.input.classList.add(item.key);
            settingView.input.value = item.nilai;
            settingView.setting = item;
            settingView.attach(this.view.cont);
            this.settingViews.push(settingView);
            this.settings.push(item);
        });
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='config-edit-form'>
				<div class="nav-cont">
					<button class='btn btn-primary tutup'>&lt;</button>
					<p class='judul'>Edit Konfigurasi</p>
				</div>
				<div class='cont'>

				</div>
				<button class='btn btn-primary btn-sm simpan'>Simpan</button>
			</div>
		`;
        this.build();
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get cont() {
        return this.getEl('div.cont');
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
