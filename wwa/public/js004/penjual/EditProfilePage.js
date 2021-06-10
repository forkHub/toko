import { dialog } from "../comp/Dialog.js";
import { Util } from "../Util.js";
import { v } from "../Validator.js";
//TODO: validasi data sama agar tidak perlu disimpan
window.onload = () => {
    Page.form().onsubmit = () => {
        try {
            let data = formToObj();
            let hasil = validasi(data);
            if (!hasil.hasil) {
                throw Error(hasil.pesan);
            }
            Util.AjaxLogin('post', Util.urlPenjualPostEditProfile, JSON.stringify(data)).then((req) => {
                if (200 == req.status) {
                    dialog.tampil('Data berhasil di update');
                    dialog.okTbl.onclick = () => {
                        window.top.location.href = Util.getUrl(Util.urlPenjualProfile, [data.id + '']);
                    };
                }
                else {
                    dialog.tampil(req.responseText);
                }
            }).catch((e) => {
                Util.error(e);
            });
            return false;
        }
        catch (e) {
            Util.error(e);
            return false;
        }
    };
    backup();
    Page.alamat().oninput = () => {
        checkBerubah();
    };
};
let Page = {
    form: () => {
        return Util.getEl('form');
    },
    lapak: () => {
        return Util.getEl('input.lapak');
    },
    deskripsi: () => {
        return Util.getEl('input.deskripsi');
    },
    wa: () => {
        return Util.getEl('input.wa');
    },
    alamat: () => {
        return Util.getEl('input.alamat');
    },
    email: () => {
        return Util.getEl('input.email');
    }
};
let dataLama = {
    alamat: '',
    deskripsi: '',
    email: '',
    lapak: '',
    wa: ''
};
function formToObj() {
    return {
        alamat: Page.alamat().value,
        deskripsi: Page.deskripsi().value,
        email: Page.email().value,
        lapak: Page.lapak().value,
        wa: Page.wa().value,
        id: parseInt(window.sessionStorage.getItem(Util.sLapakId))
    };
}
function sanitize(data) {
    //sanitize
    if (data.alamat) {
        data.alamat = v.escape(data.alamat);
    }
    if (data.deskripsi) {
        data.deskripsi = v.escape(data.deskripsi);
    }
    if (data.email) {
        data.email = v.escape(data.email);
    }
    if (data.lapak) {
        data.lapak = v.escape(data.lapak);
    }
}
//shared
function validasi(data) {
    let hasil = true;
    let pesan = '';
    sanitize(data);
    //validate
    //lapak
    if (!v.checkWa(data.wa))
        throw Error('No Wa tidak valid');
    return { hasil: hasil, pesan: pesan };
}
function backup() {
    dataLama.alamat = Page.alamat().value;
    dataLama.deskripsi = Page.deskripsi().value;
    dataLama.email = Page.email().value;
    dataLama.lapak = Page.email().value;
    dataLama.wa = Page.wa().value;
}
function checkBerubah() {
    let dataBaru = formToObj();
    if (dataBaru.alamat != dataLama.alamat) {
        console.debug('alamat berubah');
        return true;
    }
    return false;
}
