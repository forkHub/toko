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
class App {
    constructor() {
        App.dialog.init();
        App.form.init();
        App.daftarBarang.init();
        App.daftarBarang.attach(App.cont);
        App.daftarBarang.load();
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
    static Ajax(type, url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                console.log('send data');
                // console.log(data);
                let xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    if (200 == xhr.status) {
                        resolve(xhr.responseText);
                    }
                    else {
                        reject(new Error('(' + xhr.status + ') ' + xhr.statusText));
                    }
                };
                xhr.onerror = () => {
                    reject(new Error('Error'));
                };
                xhr.open(type, url, true);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.send(data);
            });
        });
    }
}
App.form = new FormPage();
App.dialog = new Dialog();
App.daftarBarang = new DaftarBarangPage();
window.onload = () => {
    new App();
};
