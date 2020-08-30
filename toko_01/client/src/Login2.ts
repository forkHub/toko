declare var md5: Function;

class Login2 extends BaseComponent {
	private dialog: Dialog;

	constructor() {
		super();
	}

	init(): void {
		this._elHtml = this.getTemplate('div.form-login');

		this.form.onsubmit = () => {
			return this.formOnSubmit();
		}

		this.dialog = App.dialog;
	}

	formOnSubmit(): boolean {
		console.log(this.password.value);

		try {
			let data: any = {
				user_id: this.userName.value,
				password: md5(this.password.value)
			}

			Util.Ajax("POST", "/auth/login", JSON.stringify(data)).then(() => {
				window.top.location.href = '/admin';
			}).catch((_e) => {
				if (401 == Util.resp.code) {
					this.dialog.tampil2('Username atau password salah');
				}
				else {
					this.dialog.tampil2(Util.resp.message);
				}
			})
		}
		catch (e) {
			this.dialog.tampil2(Util.resp.message);
		}

		return false;
	}

	get form(): HTMLFormElement {
		return this.getEl('form') as HTMLFormElement;
	}

	get userName(): HTMLInputElement {
		return this.getEl('input.user-name') as HTMLInputElement;
	}

	get password(): HTMLInputElement {
		return this.getEl('input.password') as HTMLInputElement;
	}
}