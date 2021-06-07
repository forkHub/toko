import { dialog } from "../comp/Dialog.js";
import { Util } from "../Util.js";
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
function sanitize(data) {
    //sanitize
    if (data.alamat) {
        data.alamat = Util.escape(data.alamat);
    }
    if (data.deskripsi) {
        data.deskripsi = Util.escape(data.deskripsi);
    }
    if (data.email) {
        data.email = Util.escape(data.email);
    }
    if (data.lapak) {
        data.lapak = Util.escape(data.lapak);
    }
}
//shared
function validasi(data) {
    let hasil = true;
    let pesan = '';
    sanitize(data);
    //validate
    if (!Util.checkWa(data.wa)) {
        hasil = false;
        pesan = 'No Wa tidak valid';
    }
    if (data.password && !Util.validasiPassword(data.password)) {
        hasil = false;
        pesan = 'password tidak valid';
    }
    return { hasil: hasil, pesan: pesan };
}
window.onload = () => {
    Page.form().onsubmit = () => {
        try {
            let data = {
                alamat: Page.alamat().value,
                deskripsi: Page.deskripsi().value,
                email: Page.email().value,
                lapak: Page.lapak().value,
                wa: Page.wa().value,
                id: parseInt(window.sessionStorage.getItem(Util.sLapakId))
            };
            let hasil = validasi(data);
            if (!hasil.hasil) {
                throw Error(hasil.pesan);
            }
            //TODO: validasi data sama
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
};
