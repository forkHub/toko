import { BaseComponent } from "./BaseComponent.js";
import { Util } from "./Util.js";
class AppToko {
    constructor() {
        this.items = [];
        console.log('App start');
        this.daftarItem();
        this.formCari.onsubmit = () => {
            return this.cariBarangGet();
        };
    }
    cariBarangGet() {
        try {
            window.top.location.href = Util.urlBarangCariGet + window.encodeURI(this.kataKunciInput.value) + "/0";
        }
        catch (e) {
            console.log(e);
            return false;
        }
        return false;
    }
    daftarItem() {
        let nodes = document.querySelectorAll('div.item');
        this.items = [];
        nodes.forEach((node) => {
            let item = new Item();
            item.init(node);
            this.items.push(item);
        });
        setTimeout(() => {
            this.items.forEach((item) => {
                item.loadImage();
                item.tombol.onclick = (e) => {
                    e.stopPropagation();
                    window.top.location.href = item.tombol.getAttribute('href');
                };
            });
        }, 1000);
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
    get formCari() {
        return AppToko.getEl('form.cari');
    }
    get kataKunciInput() {
        return AppToko.getEl('form.cari input.cari');
    }
    get daftarBarang() {
        return AppToko.getEl('div.daftar-barang-cont');
    }
    get halamanDiv() {
        return AppToko.getEl('div.halaman');
    }
    get halPertama() {
        return AppToko.getEl('div.halaman div.content span.pertama');
    }
    get halSebelumnya() {
        return AppToko.getEl('div.halaman div.content span.sebelumnya');
    }
    get halAngka0() {
        return AppToko.getEl('div.halaman div.content span.angka0');
    }
    get halAngka1() {
        return AppToko.getEl('div.halaman div.content span.angka1');
    }
    get halAngka2() {
        return AppToko.getEl('div.halaman div.content span.angka2');
    }
    get halSelanjutnya() {
        return AppToko.getEl('div.halaman div.content span.selanjutnya');
    }
    get halTerakhir() {
        return AppToko.getEl('div.halaman div.content span.terakhir');
    }
}
class Item extends BaseComponent {
    constructor() {
        super();
        this._ukuranKecil = 0;
        this._id = '';
    }
    loadImage() {
        this.gbrKecil.onerror = () => {
            this.gbrKecil.onerror = null;
            this.gbrKecil.onload = null;
            this.gbrKecil.src = '/gambar/kosong.png';
            this.gbrKecil.style.width = '80%';
            console.log(this.gbrKecil);
        };
        this.gbrKecil.src = this.gbrKecil.getAttribute('gbr');
        if (this.gbrKecil.src == null) {
            console.log(this.gbrKecil);
        }
        if (this.gbrKecil.src.indexOf('/gambar/kosong.png') > -1) {
            this.gbrKecil.style.width = '80%';
        }
    }
    init(el) {
        this._elHtml = el;
        this._elHtml.onclick = (e) => {
            e.stopPropagation();
            console.log('item on click');
            window.top.location.href = '/barang/baca/id/' + this.idP.innerHTML;
        };
    }
    get tombol() {
        return this.getEl('button');
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
    console.log('window on load');
    new AppToko();
};
