"use strict";
class Login2 extends BaseComponent {
    constructor() {
        super();
    }
    init() {
        this._elHtml = this.getTemplate('div.form-login');
        this.form.onsubmit = () => {
            return this.formOnSubmit();
        };
        if (!App.config.sofwan) {
            this.lapakInput.value = 'auni';
            this.lapakInput.readOnly = true;
            this.lapakInput.type = 'hidden';
        }
        this.dialog = App.dialog;
        // this.rekoverTbl.onclick = () => {
        // 	//TODO: rekover page
        // }
        // this.baruTbl.onclick = () => {
        // 	//TODOL baru page
        // }
    }
    formOnSubmit() {
        // console.log(this.password.value);
        try {
            Util.Login(this.userName.value, this.password.value).then(() => {
                let config = App.config;
                config.lapak = this.lapakInput.value;
                App.config = config;
                window.top.location.reload();
            }).catch(() => {
                if (401 == Util.resp.code) {
                    this.dialog.tampil2('Username atau password salah');
                }
                else {
                    this.dialog.tampil2(Util.resp.message);
                    this.dialog.okTbl.onclick = () => {
                        window.top.location.reload();
                    };
                }
            });
        }
        catch (e) {
            this.dialog.tampil2(Util.resp.message);
        }
        return false;
    }
    get form() {
        return this.getEl('form');
    }
    get userName() {
        return this.getEl('input.user-name');
    }
    get password() {
        return this.getEl('input.password');
    }
    // get rekoverTbl(): HTMLButtonElement {
    // 	return this.getEl('button.rekover') as HTMLButtonElement;
    // }
    // get baruTbl(): HTMLButtonElement {
    // 	return this.getEl('button.baru') as HTMLButtonElement;
    // }
    get lapakInput() {
        return this.getEl('input.lapak');
    }
}
