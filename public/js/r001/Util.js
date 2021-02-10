var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Config, config } from "./Config.js";
import { data } from "./Data.js";
// import { dialog } from "./Dialog.js";
import { loading } from "./Loading.js";
export class Util {
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
    static buatWaLapak(lapakId) {
        return "whatsapp://send?text=" + config.getNilai(Config.WEBSITE) + "/lapak/" + lapakId;
    }
    static escape(str) {
        let hasil = str;
        while (hasil.indexOf("<") > -1) {
            hasil = hasil.replace("<", "&lt;");
        }
        while (hasil.indexOf(">") > -1) {
            hasil = hasil.replace(">", "&gt;");
        }
        return hasil;
    }
    static Login(nama, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = JSON.stringify({ user_id: window.encodeURIComponent(nama), password: md5(pass) });
            console.log("login " + data);
            return Util.Ajax("POST", Util.urlLogin, data);
        });
    }
    static LoginStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            let hasil = yield Util.Ajax("POST", Util.urlLoginStatus, "");
            console.log('login ok ' + Util.resp.code);
            console.log('login ok ' + hasil);
            if (401 == Util._resp.code)
                throw Error('Belum Login');
            return hasil;
        });
    }
    static updateConfigDariServer() {
        return __awaiter(this, void 0, void 0, function* () {
            let hasil = yield Util.Ajax('post', Util.urlConfigBaca, '');
            let hasilAr = JSON.parse(hasil);
            hasilAr.forEach((item) => {
                config.updateNilai(item.kunci, item.nilai);
            });
        });
    }
    static Ajax(type, url, dataStr) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    console.group('send data');
                    console.log(dataStr);
                    console.groupEnd();
                    loading.attach(data.cont);
                    let xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        if (200 == xhr.status) {
                            Util._resp.code = xhr.status;
                            loading.detach();
                            resolve(xhr.responseText);
                        }
                        else {
                            console.log('response error');
                            Util._resp.code = xhr.status;
                            Util._resp.message = xhr.responseText;
                            loading.detach();
                            reject(new Error('(' + xhr.status + ') ' + xhr.responseText));
                        }
                    };
                    xhr.onerror = (e) => {
                        console.log('xhr error');
                        console.log(e);
                        Util._resp.code = xhr.status;
                        Util._resp.message = e.message;
                        loading.detach();
                        reject(new Error('Error'));
                    };
                    xhr.open(type, url, true);
                    xhr.setRequestHeader('Content-type', 'application/json');
                    xhr.send(dataStr);
                }
                catch (e) {
                    console.log('Util error');
                    console.log(e);
                    Util._resp.code = 500;
                    Util._resp.message = e.message;
                    loading.detach();
                    reject(new Error(e.message));
                }
            });
        });
    }
    static get resp() {
        return Util._resp;
    }
}
Util.urlAdmin = '/admin';
Util.urlFileUpload = '/file/baru';
Util.urlAnggotaBaru = "/anggota/baru";
Util.urlAnggotaHapus = "/anggota/hapus/:id";
Util.urlAnggotaBacaBerdasarPersetujuan = '/anggota/baca/setuju/:setuju';
Util.urlAnggotaEdit = '/anggota/edit';
Util.urlAnggotaUpdateSetuju = '/anggota/update/id/:id/setuju/:setuju';
Util.urlAnggotaBaca = '/anggota/baca'; //TODO: diganti
Util.urlAnggotaUpdate = '/anggota/update';
Util.urlAnggotaUpdatePassword = '/anggota/update/password';
Util.urlLoginStatus = '/auth/status';
Util.urlLogin = '/auth/login';
Util.urlLogout = '/auth/logout';
Util.urlFileHapus = '/file/hapus/:id';
Util.urlBarangBaca = '/barang/baca/'; //TODO: diganti
Util.urlBarangBaru = '/barang/baru/';
Util.urlBarangUpdate = '/barang/update/:id';
Util.urlBarangCariPost = '/barang/cari';
Util.urlBarangTerkait = '/barang/terkait';
Util.urlBarangUpdateTerakhirDilihat = '/barang/update/lastview/:id';
Util.urlConfigUpdate = '/konfig/update/:id';
Util.urlConfigReload = '/konfig/reload';
Util.urlConfigBaca = '/konfig/baca';
Util.sLapak = 'lapak'; //TODO: dihapus
Util.sLapakId = 'lapak_id';
Util.sLevel = 'level';
Util._resp = {
    code: 0,
    message: ''
};
