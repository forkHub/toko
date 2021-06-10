import { dialog } from "../comp/Dialog.js";
import { Util } from "../Util.js";
let Page = {
    form: () => {
        return Util.getEl('form');
    },
    pass1: () => {
        return Util.getEl('form input.password1');
    },
    pass2: () => {
        return Util.getEl('form input.password2');
    }
};
window.onload = () => {
    Page.form().submit = () => {
        //validasi
        if (Page.pass1().value != Page.pass2().value) {
            dialog.tampil('password tidak sama');
        }
        //validasi regex
        Util.AjaxLogin('post', Util.urlAuthGantiPass, JSON.stringify({
            id: window.sessionStorage.getItem(Util.sLapakId),
            password1: Page.pass1().value,
            password2: Page.pass2().value
        }))
            .then(() => {
            dialog.tampil('password telah diganti');
            dialog.okTbl.onclick = () => {
                window.top.location.href = Util.urlAuthLogin;
            };
        }).catch((e) => {
            dialog.tampil(e.message);
            return false;
        });
        //ajax
        return false;
    };
};
