import { anggotaBaru } from "./reg/AnggotaBaru.js";
import { anggotaDaftar } from "./reg/AnggotaDaftar.js";
import { daftarBarangPage } from "./barang/DaftarBarangPage.js";
import { data } from "./Data.js";
import { dialog } from "./Dialog.js";
import { form } from "./barang/FormBarangPage.js";
import { login } from "./Login2.js";
import { menuSystem } from "./MenuSystem.js";
import { upload } from "./PhotoUploadPage.js";
import { Util } from "./Util.js";
class App {
    constructor() {
        console.log('App init');
        dialog.init();
        form.init();
        upload.init();
        login.init();
        anggotaDaftar.init();
        anggotaBaru.init();
        daftarBarangPage.init();
        menuSystem.init();
        dialog.detach();
        data.cont = App.getEl('div.main-cont');
        console.log('get login status');
        Util.LoginStatus().then((h) => {
            console.log('login ok ' + h);
            sessionStorage.setItem(Util.sLapak, JSON.parse(h).lapak);
            daftarBarangPage.attach(data.cont);
            daftarBarangPage.load2();
        }).catch((e) => {
            if (401 == Util.resp.code) {
                login.attach(data.cont);
            }
            else {
                console.error(e);
                dialog.tampil2('Error');
                dialog.okTbl.onclick = () => {
                    window.top.location.reload();
                };
            }
        });
    }
    static bersih() {
        while (data.cont.firstChild) {
            data.cont.removeChild(data.cont.firstChild);
        }
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
window.onload = () => {
    console.log('window onload');
    new App();
};
