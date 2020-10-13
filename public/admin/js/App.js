"use strict";
class App {
    constructor() {
        console.log('App init');
        App.dialog.init();
        App.form.init();
        App.upload.init();
        App.login.init();
        App.anggotaDaftar.init();
        App.anggotaDaftarBaru.init();
        App.daftarBarang.init();
        // App.anggotaDaftar.attach(App.cont);
        // App.anggotaDaftar.load();
        console.log('get login status');
        Util.LoginStatus().then(() => {
            console.log('ok');
            App.daftarBarang.attach(App.cont);
            App.daftarBarang.load2();
        }).catch((e) => {
            if (401 == Util.resp.code) {
                App.login.attach(App.cont);
            }
            else {
                console.error(e);
                App.dialog.tampil2('Error');
                App.dialog.okTbl.onclick = () => {
                    window.top.location.reload();
                };
            }
        });
    }
    static bersih() {
        while (App.cont.firstChild) {
            App.cont.removeChild(App.cont.firstChild);
        }
    }
    static get cont() {
        return App.getEl('div.container');
    }
    static getEl(query) {
        let el;
        el = document.body.querySelector(query);
        if (el) {
            return el;
        }
        else {
            console.log(document.body);
            console.log(query);
            throw new Error('query not found ');
        }
    }
}
App.form = new FormBarangPage();
App.dialog = new Dialog();
App.daftarBarang = new DaftarBarangPage();
App.upload = new PhotoUploadPage();
App.login = new Login2();
App.anggotaDaftarBaru = new AnggotaDaftarBaru();
App.anggotaDaftar = new AnggotaDaftar();
window.onload = () => {
    console.log('window onload');
    new App();
};
