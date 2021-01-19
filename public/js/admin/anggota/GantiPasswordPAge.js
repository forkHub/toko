import { BaseComponent } from "../../BaseComponent.js";
import { HalTemplate } from "../../template/HalTemplate.js";
class GantiPasswordPage {
    constructor() {
        this._view = new HalTemplate('Ganti Password');
        this._form = new FormFragment();
        this._form.attach(this._view.bodyCont);
    }
    get selesai() {
        return this._selesai;
    }
    get form() {
        return this._form;
    }
    get view() {
        return this._view;
    }
}
class FormFragment extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='form-ganti-password'>
				<
			</div>`;
    }
}
export var gantiPasswordPage = new GantiPasswordPage();
