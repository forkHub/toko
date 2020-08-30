declare var tinymce: any;

class FormBarangView extends BaseComponent {

	init(): void {
		this._elHtml = this.getTemplate('div.form');
	}

	get form(): HTMLFormElement {
		return this.getEl('form') as HTMLFormElement;
	}

	get namaInput(): HTMLInputElement {
		return this.getEl('form input#nama-barang') as HTMLInputElement;
	}

	get deskripsiPanjangInput(): HTMLTextAreaElement {
		return this.getEl('form textarea#deskripsi-barang-panjang') as HTMLTextAreaElement;
	}

	get hargaBarangInput(): HTMLInputElement {
		return this.getEl('form input#harga-barang') as HTMLInputElement;
	}

	get wa(): HTMLInputElement {
		return this.getEl('form input#wa') as HTMLInputElement;
	}

	get submitTbl(): HTMLButtonElement {
		return this.getEl('button.submit') as HTMLButtonElement;
	}

	get draftTbl(): HTMLButtonElement {
		return this.getEl('button.draft') as HTMLButtonElement;
	}

	get inputFileId(): HTMLInputElement {
		return this.getEl('input[type="hidden"].file_id') as HTMLInputElement;
	}

	get fotoCont(): HTMLDivElement {
		return this.getEl('div.foto-cont') as HTMLDivElement;
	}

	get editFotoTbl(): HTMLButtonElement {
		return this.getEl('button.edit-foto') as HTMLButtonElement;
	}

	get gambarHtml(): HTMLImageElement {
		return this.getEl('img.foto') as HTMLImageElement;
	}

	get postIdInput(): HTMLInputElement {
		return this.getEl('input[type="hidden"].post_id') as HTMLInputElement;
	}

	get tutupTbl(): HTMLButtonElement {
		return this.getEl('button.tutup') as HTMLButtonElement;
	}
}