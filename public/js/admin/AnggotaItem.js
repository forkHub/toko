import { BaseComponent } from "../BaseComponent.js";
export class AnggotaItem extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='item'>
				<div class='flex'>
					<div class='nama grow'>nama</div>
					<button class='btn btn-primary btn-sm menu lihat'>👁️</button>&nbsp;
					<button class='btn btn-primary btn-sm menu hapus'>❌</button>
				</div>
				<br/>
			</div>
		`;
        this.build();
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get nama() {
        return this.getEl('div.nama');
    }
    get lihat() {
        return this.getEl('button.lihat');
    }
    get hapus() {
        return this.getEl('button.hapus');
    }
}
