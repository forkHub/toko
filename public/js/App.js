var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { anggotaBaru } from "./reg/AnggotaBaru.js";
import { anggotaDaftar } from "./admin/AnggotaDaftar.js";
import { daftarBarangPage } from "./barang/DaftarBarangPage.js";
import { data } from "./Data.js";
import { dialog } from "./Dialog.js";
import { form } from "./barang/FormBarangPage.js";
import { login } from "./Login2.js";
// import { upload } from "./PhotoUploadPage.js";
import { Util } from "./Util.js";
// import { admin } from "./admin/Admin.js";
import { Config, config } from "./Config.js";
import { admin } from "./admin/Admin.js";
import { dev } from "./dev/Dev.js";
class App {
    constructor() {
        console.log('App init');
        dialog.init();
        form.init();
        // upload.init();
        login.init();
        anggotaDaftar.init();
        daftarBarangPage.init();
        config.getNilai(Config.JML_PER_HAL);
        dialog.detach();
        data.cont = App.getEl('div.main-cont');
        this.mulai();
    }
    query() {
    }
    mulai() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('get login status');
            try {
                let h = yield Util.LoginStatus();
                let obj = JSON.parse(h);
                sessionStorage.setItem(Util.sLapak, obj.lapak);
                sessionStorage.setItem(Util.sLapakId, obj.id);
                sessionStorage.setItem(Util.sLevel, obj.level);
                console.log('get config');
                yield Util.updateConfigDariServer();
                if (obj.level == 'user') {
                    sessionStorage.setItem(Util.sLapak, obj.lapak);
                    sessionStorage.setItem(Util.sLapakId, obj.id);
                    daftarBarangPage.attach(data.cont);
                    daftarBarangPage.load2();
                }
                else if (obj.level == 'admin') {
                    admin.menu.attach(data.cont);
                }
                else if (obj.level == 'dev') {
                    dev.menu.attach(data.cont);
                    // dev.menu.na
                }
                else {
                }
            }
            catch (e) {
                if (401 == Util.resp.code) {
                    login.attach(data.cont);
                }
                else {
                    console.error(e);
                    dialog.tampil2(e.message);
                    dialog.okTbl.onclick = () => {
                        window.top.location.reload();
                    };
                }
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
