import { dialog } from "../comp/Dialog.js";
import { Util } from "../Util.js";
let Page = {
    email: () => {
        return Util.getEl('input.email');
    },
    form: () => {
        return Util.getEl('form');
    }
};
window.onload = () => {
    Page.form().onsubmit = () => {
        try {
            let email = Page.email().value;
            Util.Ajax('post', '/auth/lupa', JSON.stringify({ email: email }))
                .then((xml) => {
                if (200 == xml.status) {
                    dialog.tampil('Password baru telah dikirm ke email Anda');
                    dialog.okTbl.onclick = () => {
                        window.top.location.href = '/auth/login';
                    };
                }
                else {
                    dialog.tampil(xml.responseText);
                }
            })
                .catch((err) => {
                console.log(err);
                dialog.tampil(err.message);
            });
        }
        catch (err) {
            console.error(err);
            dialog.tampil(err.message);
        }
        return false;
    };
};
