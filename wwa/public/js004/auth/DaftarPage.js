import { dialog } from "../comp/Dialog.js";
import { Util } from "../Util.js";
import { v } from "../Validator.js";
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
    console.log(Page.form());
    Page.form().onsubmit = () => {
        console.log('form on submit');
        try {
            //data
            //sanitize
            let data = {
                alamat: v.escape(Page.alamat().value).trim(),
                deskripsi: v.escape(Page.deskripsi().value).trim(),
                email: v.escape(Page.email().value).trim(),
                lapak: v.escape(Page.lapak().value).trim(),
                password: v.escape(Page.password1().value).trim(),
                user_id: v.escape(Page.userId().value).trim(),
                wa: v.escape(Page.wa().value).trim()
            };
            data.password = md5(data.password);
            //TODO:
            //validasi
            //validasi min
            //validasi maksimal
            if (!v.checkPassword(data.password))
                throw Error(v.ERR_PASS);
            if (!v.checkWa(data.wa))
                throw Error('No WA tidak valid, format yang disarankan: 62xxx');
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
        }
        catch (e) {
            console.error(e);
            dialog.tampil(e.message);
        }
        return false;
    };
};
