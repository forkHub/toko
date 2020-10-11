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
var AppToko = /** @class */ (function () {
    function AppToko() {
        var _this = this;
        this.items = [];
        this.resizeInProgress = false;
        var nodes = document.querySelectorAll('div.item');
        // let tinggi: number = 0;
        nodes.forEach(function (node) {
            var item = new Item();
            item.init(node);
            _this.items.push(item);
        });
        window.onresize = function () {
            _this.atur();
        };
        this.atur();
    }
    AppToko.prototype.jmlKolom = function () {
        if (window.innerWidth > 600) {
            return 5;
        }
        else if (window.innerWidth > 400) {
            return 4;
        }
        else {
            return 3;
        }
    };
    AppToko.prototype.atur = function () {
        var jmlKolom = this.jmlKolom();
        var jmlPerKolom = this.items.length / jmlKolom;
        var items = this.items.slice();
        var cont = AppToko.getEl('div.daftar-barang-cont');
        var koloms = [];
        cont.style.visibility = 'hidden';
        jmlPerKolom = Math.floor(jmlPerKolom);
        console.log('jml kolom ' + jmlKolom);
        console.log('jml per kolom ' + jmlPerKolom);
        console.log('jml item ' + items.length);
        while (cont.children.length > 0) {
            cont.removeChild(cont.children[0]);
        }
        for (var i = 0; i < jmlKolom; i++) {
            var div_1 = document.createElement('div');
            div_1.classList.add('kolom');
            for (var j = 0; j < jmlPerKolom; j++) {
                var item = items.shift();
                if (item) {
                    item.attach(div_1);
                }
            }
            cont.appendChild(div_1);
            koloms.push(div_1);
        }
        //sisa
        var kolom = 0;
        while (items.length > 0) {
            var item = items.shift();
            koloms[kolom].appendChild(item.elHtml);
            kolom++;
            if (kolom = koloms.length) {
                kolom = 0;
            }
        }
        var div = document.createElement('div');
        div.classList.add('clear');
        cont.appendChild(div);
        cont.style.visibility = 'visible';
    };
    AppToko.prototype.hitungTinggi = function () {
        return 0;
    };
    AppToko.prototype.resize = function () {
        var _this = this;
        if (this.resizeInProgress) {
            setTimeout(function () {
                console.log('schedule');
                _this.resize();
            }, 1000);
            return;
        }
        this.resizeInProgress = true;
        var tinggi = 0;
        this.items.forEach(function (item) {
            item.elHtml.style.height = 'initial';
        });
        setTimeout(function () {
            _this.items.forEach(function (item) {
                if (item.elHtml.clientHeight > tinggi) {
                    tinggi = item.elHtml.clientHeight;
                }
                ;
            });
            _this.items.forEach(function (item) {
                item.elHtml.style.height = tinggi + 'px';
            });
            _this.resizeInProgress = false;
        }, 100);
    };
    AppToko.getEl = function (query) {
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
    return AppToko;
}());
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super.call(this) || this;
        _this._ukuranKecil = 0;
        _this._id = '';
        return _this;
    }
    Item.prototype.init = function (el) {
        var _this = this;
        this._elHtml = el;
        this._elHtml.onclick = function (e) {
            e.stopPropagation();
            console.log('item on click');
            window.top.location.href = '/barang/' + _this.idP.innerHTML;
        };
        // this.gbrKecil.onload = () => {
        // 	this.gbrKecil.style.maxHeight = 'initial';
        // }
        this.gbrKecil.onerror = function () {
            _this.gbrKecil.onerror = null;
            _this.gbrKecil.src = 'gambar/kosong.png';
            _this.gbrKecil.style.minHeight = '100px';
        };
        this.gbrKecil.src = this.gbrKecil.getAttribute('gbr');
    };
    Object.defineProperty(Item.prototype, "ukuranKecil", {
        get: function () {
            return this._ukuranKecil;
        },
        set: function (value) {
            this._ukuranKecil = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "idP", {
        get: function () {
            return this.getEl('p.id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "waP", {
        get: function () {
            return this.getEl('p.wa');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "chatTbl", {
        get: function () {
            return this.getEl('a.chat');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "tutupTbl", {
        get: function () {
            return this.getEl('p.tutup button');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "gbrKecil", {
        get: function () {
            return this.getEl('img.kecil');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "gbrBesar", {
        get: function () {
            return this.getEl('img.besar');
        },
        enumerable: true,
        configurable: true
    });
    return Item;
}(BaseComponent));
window.onload = function () {
    new AppToko();
};
