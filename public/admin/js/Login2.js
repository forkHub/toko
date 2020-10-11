"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Login2 = /** @class */ (function (_super) {
    __extends(Login2, _super);
    function Login2() {
        return _super.call(this) || this;
    }
    Login2.prototype.init = function () {
        var _this = this;
        this._elHtml = this.getTemplate('div.form-login');
        this.form.onsubmit = function () {
            return _this.formOnSubmit();
        };
        this.dialog = App.dialog;
    };
    Login2.prototype.formOnSubmit = function () {
        var _this = this;
        console.log(this.password.value);
        try {
            var data = {
                user_id: this.userName.value,
                password: md5(this.password.value)
            };
            Util.Ajax("POST", "/auth/login", JSON.stringify(data)).then(function () {
                window.top.location.href = Util.urlToko;
            }).catch(function (_e) {
                if (401 == Util.resp.code) {
                    _this.dialog.tampil2('Username atau password salah');
                }
                else {
                    _this.dialog.tampil2(Util.resp.message);
                }
            });
        }
        catch (e) {
            this.dialog.tampil2(Util.resp.message);
        }
        return false;
    };
    Object.defineProperty(Login2.prototype, "form", {
        get: function () {
            return this.getEl('form');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Login2.prototype, "userName", {
        get: function () {
            return this.getEl('input.user-name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Login2.prototype, "password", {
        get: function () {
            return this.getEl('input.password');
        },
        enumerable: true,
        configurable: true
    });
    return Login2;
}(BaseComponent));
