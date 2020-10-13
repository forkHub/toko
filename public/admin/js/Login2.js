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
        this.dialog = App.dialog;
    }
    formOnSubmit() {
        console.log(this.password.value);
        try {
            // let data: any = {
            // 	user_id: this.userName.value,
            // 	password: md5(this.password.value)
            // }
            Util.Login(this.userName.value, this.password.value).then(() => {
                window.top.location.href = Util.urlToko;
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
            // Util.Ajax("POST", "/auth/login", JSON.stringify(data)).then(() => {
            // 	window.top.location.href = Util.urlToko;
            // }).catch((_e) => {
            // 	if (401 == Util.resp.code) {
            // 		this.dialog.tampil2('Username atau password salah');
            // 	}
            // 	else {
            // 		this.dialog.tampil2(Util.resp.message);
            // 		this.dialog.okTbl.onclick = () => {
            // 			window.top.location.reload();
            // 		}
            // 	}
            // })
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
}
