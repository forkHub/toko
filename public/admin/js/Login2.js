import { BaseComponent } from "./BaseComponent.js";
import { config } from "./Config.js";
import { dialog } from "./Dialog.js";
import { Util } from "./Util.js";
class Login2 extends BaseComponent {
    constructor() {
        super();
    }
    init() {
        this._elHtml = this.getTemplate('div.form-login');
        this.form.onsubmit = () => {
            return this.formOnSubmit();
        };
        if (!config.sofwan) {
            console.log('config auni');
            this.lapakInput.value = 'auni';
            this.lapakInput.readOnly = true;
            this.lapakInput.type = 'hidden';
            this.lapakLabel.style.visibility = 'hidden';
        }
        else {
            console.log('config sofwan');
            this.lapakInput.value = "";
            this.lapakInput.readOnly = false;
            this.lapakInput.type = 'text';
            this.lapakLabel.style.visibility = 'visible';
        }
    }
    formOnSubmit() {
        try {
            Util.Login(this.userName.value, this.password.value).then((hasil) => {
                console.log(hasil);
                let hasilObj = JSON.parse(hasil);
                window.sessionStorage.setItem(Util.sLapak, hasilObj.lapak);
                window.sessionStorage.setItem(Util.sLapakId, hasilObj.id);
                window.top.location.reload();
            }).catch(() => {
                if (401 == Util.resp.code) {
                    dialog.tampil2('Username atau password salah');
                }
                else {
                    dialog.tampil2(Util.resp.message);
                    dialog.okTbl.onclick = () => {
                        window.top.location.reload();
                    };
                }
            });
        }
        catch (e) {
            dialog.tampil2(Util.resp.message);
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
    get lapakInput() {
        return this.getEl('input.lapak');
    }
    get lapakLabel() {
        return this.getEl('label.lapak');
    }
}
export var login = new Login2();
