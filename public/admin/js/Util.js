"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Util {
    static Login(nama, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = JSON.stringify({ user_id: nama, password: md5(pass) });
            yield Util.Ajax("POST", Util.urlLogin, data);
        });
    }
    static LoginStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Util.Ajax("POST", Util.urlLoginStatus, "");
            console.log('login ok ' + Util.resp.code);
            if (401 == Util._resp.code)
                throw Error('');
            return Util._resp.message;
        });
    }
    static Ajax(type, url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    console.group('send data');
                    console.log(data);
                    console.groupEnd();
                    let xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        if (200 == xhr.status) {
                            Util._resp.code = 200;
                            resolve(xhr.responseText);
                        }
                        else {
                            console.log('response error');
                            Util._resp.code = xhr.status;
                            Util._resp.message = xhr.statusText;
                            reject(new Error('(' + xhr.status + ') ' + xhr.statusText));
                        }
                    };
                    xhr.onerror = () => {
                        console.log('xhr error');
                        Util._resp.code = 500;
                        Util._resp.message = 'Error';
                        reject(new Error('Error'));
                    };
                    xhr.open(type, url, true);
                    xhr.setRequestHeader('Content-type', 'application/json');
                    xhr.send(data);
                }
                catch (e) {
                    console.log('Util error');
                    console.log(e);
                    Util._resp.code = 500;
                    Util._resp.message = 'Error';
                    reject(new Error('Error'));
                }
            });
        });
    }
    static get resp() {
        return Util._resp;
    }
}
Util.urlToko = '/admin';
Util.urlAnggotaDaftar = "/anggota/baca";
Util.urlAnggotaBaru = "/anggota/baru";
Util.urlAnggotaHapus = "/anggota/hapus";
Util.urlLoginStatus = '/auth/status';
Util.urlLogin = '/auth/login';
Util._resp = {
    code: 0,
    message: ''
};
