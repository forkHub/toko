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

	init(): void {

	}

	tampil(def: boolean = true): void {
		if (def) {
			this.okTbl.onclick = () => {
				this.detach();
				// this._elHtml.style.display = 'none';
			}
		}
		this.attach(document.body);
		// this._elHtml.style.display = 'block';
	}

	tampil2(pesan: string, def: boolean = true): void {
		this.p.innerHTML = pesan;
		this.tampil(def);
	}

	sembunyi(): void {
		this._elHtml.style.display = 'none';
	}

	get okTbl(): HTMLButtonElement {
		return this.getEl('button.ok') as HTMLButtonElement;
	}

	get p(): HTMLParagraphElement {
		return this.getEl('p') as HTMLParagraphElement;
	}
}