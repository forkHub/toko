import { BaseComponent } from "./BaseComponent.js";
import { data } from "./Data.js";
import { Util } from "./Util.js";
window.onload = () => {
    data.cont = document.body;
    let img = document.body.querySelector("div.item-fokus img.besar");
    img.onerror = () => {
        console.log('error');
        img.src = "/gambar/kosong.png";
        img.onerror = null;
        img.onload = null;
        img.style.height = '512px';
        img.style.minHeight = '512px';
    };
    img.onload = () => {
        img.style.minHeight = 'initial';
        img.style.height = 'initial';
    };
    img.src = img.getAttribute('gbr');
    document.body.querySelector('div.daftar-barang-cont').style.visibility = 'visible';
    console.log('load barang terkait');
    Util.Ajax("post", Util.urlBarangTerkait, '')
        .then((hasil) => {
        let obj = JSON.parse(hasil);
        let cont = document.body.querySelector('div.barang-terkait-cont');
        console.log(cont);
        obj.forEach((item) => {
            let view = new View();
            view.item = item;
            //TODO: item detail
            view.attach(cont);
        });
    }).catch((e) => {
        console.log('error 1');
        console.error(e);
    })
        .then(() => {
        console.log('update last view');
        let id = document.body.querySelector('div.data').getAttribute('id');
        return Util.Ajax('post', Util.getUrl(Util.urlBarangUpdateTerakhirDilihat, [id]), '');
    })
        .catch((e) => {
        console.error(e);
    });
};
class View extends BaseComponent {
    constructor() {
        super();
        this._template = `
		<div class='item'>
			<img class='kecil' src="/gambar/kosong.png" gbr='{{gbrThumb}}'>
			<p class='nama-barang'><a class='nama' href="{{url}}"></a></p>
			<p class='harga'></p>
			<a class='chat' href="">
				<img src='/gambar/walogo3.png'>
			</a>
			<p class='wa'></p>
			<p class='id'></p>
			<p class='lapak'></p>
		</div>		
		`;
        this.build();
    }
    get img() {
        return this.getEl('img');
    }
    get namaA() {
        return this.getEl('p.nama-barang a.nama');
    }
    get hargaP() {
        return this.getEl('p.harga');
    }
    get waA() {
        return this.getEl('a.wa');
    }
    get waP() {
        return this.getEl('p.wa');
    }
    get idP() {
        return this.getEl('p.id');
    }
    get lapakP() {
        return this.getEl('p.lapak');
    }
    get item() {
        return this._item;
    }
    set item(value) {
        this._item = value;
    }
}
