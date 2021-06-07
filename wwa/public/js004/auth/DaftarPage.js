import { dialog } from "../comp/Dialog.js";
import { Util } from "../Util.js";
let Page = {
    form: () => {
        return Util.getEl('form');
    },
    userId: () => {
        return Util.getEl('input.user_id');
    },
    lapak: () => {
        return Util.getEl('input.lapak');
    },
    deskripsi: () => {
        return Util.getEl('input.deskripsi');
    },
    alamat: () => {
        return Util.getEl('input.alamat');
    },
    email: () => {
        return Util.getEl('input.email');
    },
    wa: () => {
        return Util.getEl('input.wa');
    },
    password1: () => {
        return Util.getEl('input.password1');
    },
    password2: () => {
        return Util.getEl('input.password2');
    }
};
window.onload = () => {
    Page.form().submit = () => {
        try {
            //data
            //sanitize
            let data = {
                alamat: Util.escape(Page.alamat().value),
                deskripsi: Util.escape(Page.deskripsi().value),
                email: Util.escape(Page.email().value),
                lapak: Util.escape(Page.lapak().value),
                password: Util.escape(Page.password1().value),
                user_id: Util.escape(Page.userId().value),
                wa: Util.escape(Page.wa().value)
            };
            //validasi
            //TODO:
            Util.Ajax('post', Util.urlAuthDaftar, JSON.stringify(data)).then((xml) => {
                if (200 == xml.status) {
                    dialog.tampil('sukses');
                    dialog.okTbl.onclick = () => {
                        window.top.location.href = Util.urlAuthLogin;
                    };
                }
                else {
                    console.error(xml.responseText);
                    dialog.tampil(xml.responseText);
                }
            }).catch((e) => {
                console.error(e);
                dialog.tampil(e.message);
            });
            return false;
        }
        catch (e) {
            console.error(e);
            dialog.tampil(e.message);
            return false;
        }
        return false;
    };
};
