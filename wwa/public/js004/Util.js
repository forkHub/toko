var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config2 } from "./Config.js";
import { loading } from "./comp/Loading.js";
import { dialog } from "./comp/Dialog.js";
export class Util {
    static getEl(query, parent = null) {
        let el;
        if (!parent)
            parent = document.body;
        el = parent.querySelector(query);
        if (el) {
            return el;
        }
        else {
            console.log(parent);
            console.log(query);
            throw new Error('query not found ');
        }
    }
    static getUrl(url, params) {
        let urlHasil = url;
        console.log('get url');
        params.forEach((item) => {
            urlHasil = urlHasil.replace(/\:[a-z]+/, item);
            console.log('item ' + item);
            console.log('url ' + urlHasil);
        });
        return urlHasil;
    }
    //default error
    static error(e) {
        console.error(e);
        dialog.tampil(e.message);
    }
    //shared
    static buatWaLapak(lapakId) {
        return "whatsapp://send?text=" + config2.website + "/lapak/" + lapakId;
    }
    static AjaxLogin(type, url, dataStr, pf = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let xml;
            xml = yield this.Ajax(type, url, dataStr, pf);
            if (401 == xml.status) {
                window.top.location.href = Util.urlAuthLogin;
                return null;
            }
            else {
                return xml;
            }
        });
    }
    static Ajax(type, url, dataStr, pf = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    console.group('send data');
                    console.log(dataStr);
                    console.groupEnd();
                    loading.attach(document.body);
                    let xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        loading.detach();
                        resolve(xhr);
                    };
                    xhr.onerror = (e) => {
                        console.log('xhr error');
                        console.log(e);
                        loading.detach();
                        reject(new Error(e.message));
                    };
                    xhr.onprogress = (p) => {
                        if (pf) {
                            pf(p);
                        }
                    };
                    xhr.open(type, url, true);
                    xhr.setRequestHeader('Content-type', 'application/json');
                    xhr.setRequestHeader('from', window.sessionStorage.getItem(Util.sLapakId));
                    xhr.setRequestHeader('id', window.sessionStorage.getItem(Util.sLapakId));
                    xhr.send(dataStr);
                }
                catch (e) {
                    console.log('Util error');
                    console.log(e);
                    loading.detach();
                    reject(new Error(e.message));
                }
            });
        });
    }
}
Util.profile = '/penjual/profile';
Util.urlFileUpload = '/penjual/upload';
Util.urlPenjualProfile = '/penjual/profile/:id';
Util.urlPenjualGetEditProfile = '/penjual/profile/edit/:id';
Util.urlPenjualPostEditProfile = '/penjual/profile/edit/';
Util.urlPenjualBeranda = '/penjual/beranda/:id';
Util.urlAuthLogin = '/auth/login';
Util.urlAuthLogout = '/auth/logout';
Util.urlAuthGantiPass = '/auth/ganti';
Util.urlAuthLupaPass = '/auth/lupa';
Util.urlAuthDaftar = '/auth/daftar';
Util.urlBarangBaru = '/penjual/barang/baru';
Util.urlBarangEditGet = '/penjual/barang/edit/:id';
Util.urlBarangEditPost = '/penjual/barang/edit';
Util.urlBarangHapus = '/penjual/barang/hapus';
Util.urlBarangCariGet = '';
Util.sLapakId = 'lapak_id';
Util.sLevel = 'level';
