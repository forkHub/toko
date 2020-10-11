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
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super.call(this) || this;
        _this._template = "\n\t\t\t<div class='dialog'>\n\t\t\t\t<div class='box'>\n\t\t\t\t\t<p class='deskripsi'>Contoh dialog </p>\n\t\t\t\t\t<button class=\"btn btn-primary ok\">OK</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t";
        _this.build();
        return _this;
    }
    Dialog.prototype.init = function () {
    };
    Dialog.prototype.tampil = function (def) {
        var _this = this;
        if (def === void 0) { def = true; }
        if (def) {
            this.okTbl.onclick = function () {
                _this.detach();
                // this._elHtml.style.display = 'none';
            };
        }
        this.attach(document.body);
        // this._elHtml.style.display = 'block';
    };
    Dialog.prototype.tampil2 = function (pesan, def) {
        if (def === void 0) { def = true; }
        this.p.innerHTML = pesan;
        this.tampil(def);
    };
    Dialog.prototype.sembunyi = function () {
        this._elHtml.style.display = 'none';
    };
    Object.defineProperty(Dialog.prototype, "okTbl", {
        get: function () {
            return this.getEl('button.ok');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "p", {
        get: function () {
            return this.getEl('p');
        },
        enumerable: true,
        configurable: true
    });
    return Dialog;
}(BaseComponent));
