"use strict";
var App = /** @class */ (function () {
    function App() {
        App.dialog.init();
        App.form.init();
        App.daftarBarang.init();
        App.daftarBarang.attach(App.cont);
        App.upload.init();
        App.login.init();
        App.daftarBarang.load2();
    }
    Object.defineProperty(App, "cont", {
        get: function () {
            return App.getEl('div.container');
        },
        enumerable: true,
        configurable: true
    });
    App.getEl = function (query) {
        var el;
        el = document.body.querySelector(query);
        if (el) {
            return el;
        }
        else {
            console.log(document.body);
            console.log(query);
            throw new Error('query not found ');
        }
    };
    App.form = new FormBarangPage();
    App.dialog = new Dialog();
    App.daftarBarang = new DaftarBarangPage();
    App.upload = new PhotoUploadPage();
    App.login = new Login2();
    return App;
}());
window.onload = function () {
    console.log('window onload');
    new App();
};
