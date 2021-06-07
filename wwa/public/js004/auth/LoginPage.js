import { dialog } from "../comp/Dialog.js";
import { loading } from "../comp/Loading.js";
import { Util } from "../Util.js";
let LoginPage = {
    form: () => {
        return Util.getEl('form');
    },
    userName: () => {
        return Util.getEl('input.user-name');
    },
    password: () => {
        return Util.getEl('input.password');
    },
    lupa: () => {
        return Util.getEl('button.lupa');
    }
};
window.onload = () => {
    LoginPage.form().onsubmit = () => {
        try {
            let userName = LoginPage.userName().value;
            let password = LoginPage.password().value;
            console.log('el ' + LoginPage.userName());
            console.log('username: ' + userName);
            console.log('password: ' + password);
            let data = JSON.stringify({ user_id: window.encodeURIComponent(userName), password: md5(password) });
            Util.Ajax('post', '/auth/login', data).then((req) => {
                if (200 == req.status) {
                    let hasilObj = JSON.parse(req.responseText);
                    loading.detach();
                    window.sessionStorage.setItem(Util.sLapakId, hasilObj.id + '');
                    window.top.location.href = '/penjual/beranda/' + hasilObj.id;
                }
                else {
                    console.log(req);
                    loading.detach();
                    dialog.tampil(req.responseText);
                }
            }).catch((error) => {
                loading.detach();
                dialog.tampil(error.message);
            });
            return false;
        }
        catch (e) {
            console.log(e.message);
            dialog.tampil(e.message);
            return false;
        }
        return false;
    };
    LoginPage.lupa().onclick = () => {
        window.top.location.href = '/auth/lupa';
    };
};
