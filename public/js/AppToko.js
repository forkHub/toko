import { BaseComponent } from "./BaseComponent.js";
class AppToko {
    constructor() {
        this.items = [];
        this.resizeInProgress = false;
        let nodes = document.querySelectorAll('div.item');
        nodes.forEach((node) => {
            let item = new Item();
            item.init(node);
            this.items.push(item);
        });
        window.onresize = () => {
            this.atur();
        };
        this.atur();
    }
    jmlKolom() {
        if (window.innerWidth > 600) {
            return 5;
        }
        else if (window.innerWidth > 400) {
            return 4;
        }
        else {
            return 3;
        }
    }
    atur() {
        let jmlKolom = this.jmlKolom();
        let jmlPerKolom = this.items.length / jmlKolom;
        let items = this.items.slice();
        let cont = AppToko.getEl('div.daftar-barang-cont');
        let koloms = [];
        cont.style.visibility = 'hidden';
        jmlPerKolom = Math.floor(jmlPerKolom);
        while (cont.children.length > 0) {
            cont.removeChild(cont.children[0]);
        }
        for (let i = 0; i < jmlKolom; i++) {
            let div = document.createElement('div');
            div.classList.add('kolom');
            for (let j = 0; j < jmlPerKolom; j++) {
                let item = items.shift();
                if (item) {
                    item.attach(div);
                }
            }
            cont.appendChild(div);
            koloms.push(div);
        }
        //sisa
        let kolom = 0;
        while (items.length > 0) {
            let item = items.shift();
            koloms[kolom].appendChild(item.elHtml);
            kolom++;
            if (koloms.length == kolom) {
                kolom = 0;
            }
        }
        let div = document.createElement('div');
        div.classList.add('clear');
        cont.appendChild(div);
        cont.style.visibility = 'visible';
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
        this._id = '';
    }
    init(el) {
        this._elHtml = el;
        this._elHtml.onclick = (e) => {
            e.stopPropagation();
            console.log('item on click');
            if ('' == this.lapakP.innerHTML) {
                window.top.location.href = '/barang/' + this.idP.innerHTML;
            }
            else {
                window.top.location.href = '/barang/lapak/' + this.lapakP.innerHTML + '/' + this.idP.innerHTML;
            }
        };
        this.gbrKecil.onerror = () => {
            this.gbrKecil.onerror = null;
            this.gbrKecil.onload = null;
            this.gbrKecil.src = '/gambar/kosong.png';
            this.gbrKecil.style.minHeight = '100px';
        };
        this.gbrKecil.src = this.gbrKecil.getAttribute('gbr');
    }
    get ukuranKecil() {
        return this._ukuranKecil;
    }
    set ukuranKecil(value) {
        this._ukuranKecil = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get idP() {
        return this.getEl('p.id');
    }
    get lapakP() {
        return this.getEl('p.lapak');
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
