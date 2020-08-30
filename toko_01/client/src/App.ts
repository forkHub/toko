
class App {
	static readonly form: FormBarangPage = new FormBarangPage();
	static readonly dialog: Dialog = new Dialog();
	static readonly daftarBarang: DaftarBarangPage = new DaftarBarangPage();
	static readonly upload: PhotoUploadPage = new PhotoUploadPage();
	static readonly login: Login2 = new Login2();

	constructor() {
		App.dialog.init();
		App.form.init();
		App.daftarBarang.init();
		App.daftarBarang.attach(App.cont);
		App.upload.init();
		App.login.init();
		App.daftarBarang.load2();
	}

	static get cont(): HTMLDivElement {
		return App.getEl('div.container') as HTMLDivElement;
	}

	static getEl(query: string): HTMLElement {
		let el: HTMLElement;

		el = document.body.querySelector(query);

		if (el) {
			return el
		} else {
			console.log(document.body);
			console.log(query);
			throw new Error('query not found ');
		}
	}

}

window.onload = () => {
	console.log('window onload');
	new App();
}