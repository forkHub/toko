"use strict";
class Dialog extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='dialog'>
				<div class='box'>
					<p class='deskripsi'>Contoh dialog </p>
					<button class="btn btn-primary ok">OK</button>
				</div>
			</div>
			`;
        this.build();
    }
    init() {
        this.detach();
    }
    tampil(def = true) {
        if (def) {
            this.okTbl.onclick = () => {
                this.detach();
            };
        }
        this.attach(document.body);
        this._elHtml.style.display = 'block';
    }
    tampil2(pesan, def = true) {
        this.p.innerHTML = pesan;
        this.tampil(def);
    }
    // sembunyi(): void {
    // 	this._elHtml.style.display = 'none';
    // }
    get okTbl() {
        return this.getEl('button.ok');
    }
    get p() {
        return this.getEl('p');
    }
}
