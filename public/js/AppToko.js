"use strict";
class AppToko {
    constructor() {
        this.items = [];
        this.resizeInProgress = false;
        let nodes = document.querySelectorAll('item');
        let tinggi = 0;
        nodes.forEach((node) => {
            let item = new Item();
            item.init(node);
            this.items.push(item);
            if (item.elHtml.clientHeight > tinggi) {
                tinggi = item.elHtml.clientHeight;
            }
            ;
        });
        this.items.forEach((item) => {
            item.elHtml.style.height = tinggi + 'px';
        });
        window.onresize = () => {
            this.resize();
        };
        this.resize();
    }
    hitungTinggi() {
        return 0;
    }
    resize() {
        if (this.resizeInProgress) {
            setTimeout(() => {
                console.log('schedule');
                this.resize();
            }, 1000);
            return;
        }
        this.resizeInProgress = true;
        let tinggi = 0;
        this.items.forEach((item) => {
            item.elHtml.style.height = 'initial';
        });
        setTimeout(() => {
            this.items.forEach((item) => {
                if (item.elHtml.clientHeight > tinggi) {
                    tinggi = item.elHtml.clientHeight;
                }
                ;
            });
            this.items.forEach((item) => {
                item.elHtml.style.height = tinggi + 'px';
            });
            this.resizeInProgress = false;
        }, 100);
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
class Item extends BaseComponent {
    constructor() {
        super();
        this._ukuranKecil = 0;
    }
    init(el) {
        this._elHtml = el;
        this._elHtml.onclick = (e) => {
            e.stopPropagation();
            console.log('item on click');
            this._ukuranKecil = this._elHtml.clientHeight;
            this._elHtml.style.height = '100%';
            this._elHtml.classList.add('fokus');
            document.body.style.overflowY = 'hidden';
            this.gbrBesar.onload = () => {
                this.gbrBesar.style.maxHeight = 'initial';
            };
            this.gbrBesar.src = this.gbrBesar.getAttribute('gbr');
        };
        this.gbrKecil.onload = () => {
            this.gbrKecil.style.maxHeight = 'initial';
        };
        this.gbrKecil.src = this.gbrKecil.getAttribute('gbr');
        this.tutupTbl.onclick = (e) => {
            e.stopPropagation();
            this._elHtml.classList.remove('fokus');
            document.body.style.overflowY = 'auto';
            this._elHtml.style.height = this.ukuranKecil + 'px';
        };
        // this.chatTbl.onclick = (e: MouseEvent) => {
        // 	e.stopPropagation();
        // 	window.top.location.href = ''; 
        // }
    }
    get ukuranKecil() {
        return this._ukuranKecil;
    }
    set ukuranKecil(value) {
        this._ukuranKecil = value;
    }
    get waP() {
        return this.getEl('p.wa');
    }
    get chatTbl() {
        return this.getEl('a.chat');
    }
    get tutupTbl() {
        return this.getEl('p.tutup button');
    }
    get gbrKecil() {
        return this.getEl('img.kecil');
    }
    get gbrBesar() {
        return this.getEl('img.besar');
    }
}
window.onload = () => {
    new AppToko();
};
