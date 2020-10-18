"use strict";
// import { MenuSystem } from "./MenuSystem";
class App {
    // static readonly flSofwan: boolean = false;
    constructor() {
        console.log('App init');
        App.dialog.init();
        App.form.init();
        App.upload.init();
        App.login.init();
        App.anggotaDaftar.init();
        App.anggotaBaru.init();
        App.daftarBarang.init();
        App.menuSystem.init();
        App.dialog.detach();
        // App.dialog.elHtml.style.display = 'block';
        let config = App.config;
        config.sofwan = ConfigDef.sofwan;
        if (!config.sofwan) {
            config.lapak = 'auni';
        }
        App.config = config;
        console.log('get login status');
        Util.LoginStatus().then(() => {
            console.log('login ok');
            App.daftarBarang.attach(App.cont);
            App.daftarBarang.load2();
        }).catch((e) => {
            if (401 == Util.resp.code) {
                App.login.attach(App.cont);
                // App.login.seles
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
    static get config() {
        let config = JSON.parse(window.localStorage.getItem('aunistore_config'));
        if (!config) {
            config = ConfigDef;
        }
        return config;
    }
    static set config(config) {
        window.localStorage.setItem('aunistore_config', JSON.stringify(config));
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
App.anggotaBaru = new AnggotaBaru();
App.anggotaDaftar = new AnggotaDaftar();
App.menuSystem = new MenuSystem();
window.onload = () => {
    console.log('window onload');
    new App();
};
