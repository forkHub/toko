import { BaseComponent } from "../BaseComponent.js";
export class Nav extends BaseComponent {
    constructor() {
        super();
        this._template = `
		<div class="nav">
			<button class='btn btn-primary tutup'>&lt;</button>
			<p class='judul'>Edit Konfigurasi</p>
		</div>`;
        this.build();
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get judulP() {
        return this.getEl('p.judul');
    }
}
