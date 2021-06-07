import { BaseComponent } from "../BaseComponent.js";
import { config2 } from "../Config.js";
import { dialog } from "../comp/Dialog.js";
import { MenuPopup } from "../comp/MenuPopUp.js";
import { Util } from "../Util.js";
class PenjualPage {
    constructor() {
        this.totalBaramg = 0;
        this.tambahTbl.onclick = () => {
            this.tambahClick();
        };
        this.lihatTbl.onclick = () => {
            let session = window.sessionStorage;
            if (session.lapak != '') {
                window.top.location.href = "/lapak/" + window.sessionStorage.getItem(Util.sLapakId);
            }
            else {
                window.top.location.href = "/";
            }
        };
        this.menuTbl.onclick = () => {
            let menu = new MenuPopup();
            menu.tampil([
                {
                    label: 'Profile',
                    f: () => {
                        window.top.location.href = Util.profile + "/" + window.sessionStorage.getItem(Util.sLapakId);
                    }
                },
                {
                    label: 'Logout',
                    f: () => {
                        window.top.location.href = Util.urlLogout;
                    }
                }, {
                    label: 'Share Lapak',
                    f: () => {
                        window.top.location.href = Util.buatWaLapak(window.sessionStorage.getItem(Util.sLapakId));
                    }
                }
            ]);
        };
        this.initBarang(data);
    }
    getEl(query) {
        return Util.getEl(query);
    }
    initBarang(barangAr) {
        barangAr.forEach((data) => {
            let view = new ItemBarangView();
            let item = (data);
            view.namaP.innerHTML = item.nama + " " + (item.publish ? "" : "(draft)") + " ";
            view.id.innerHTML = item.id + "/" + item.file_id;
            view.gbr.src = item.thumb;
            view.attach(this.cont);
            view.editTbl.onclick = () => {
                this.barangEditlick(item);
            };
            view.hapusTbl.onclick = () => {
                this.barangHapusClick(item);
            };
            let lapakId = window.sessionStorage.getItem(Util.sLapakId);
            view.shareTbl.href = "whatsapp://send?text=" + config2.website + "/lapak/" + lapakId + '/barang/' + item.id;
        });
    }
    tambahClick() {
        //TODO: masukkan config
        //TODO: goto tambah barang page
        if (this.totalBaramg >= 25) {
            dialog.tampil('Maaf, Karena keterbatasan tempat, Anda hanya boleh menjual maksimal 25 barang');
            return;
        }
        window.top.location.href = Util.urlBarangBaru + '/' + window.sessionStorage.getItem(Util.sLapakId);
    }
    barangEditlick(item) {
        window.top.location.href = Util.getUrl(Util.urlBarangEditGet, [item.id]);
    }
    barangHapusClick(item) {
        let hasil = confirm("Hapus Data?");
        if (hasil) {
            console.log('hapus data');
            Util.AjaxLogin('post', Util.urlBarangHapus, JSON.stringify({
                id: item.id,
                idFile: item.file_id,
                namaFileBesar: item.gbr,
                namaFileKecil: item.thumb
            }))
                .then((hasil) => {
                if (200 == hasil.status) {
                    window.top.location.reload();
                }
                else {
                    dialog.tampil(hasil.responseText);
                }
            }).catch((e) => {
                dialog.tampil(e.message);
            });
        }
    }
    get menuTbl() {
        return this.getEl('button.menu');
    }
    get tambahTbl() {
        return this.getEl('button.tambah');
    }
    get cont() {
        return this.getEl('div.cont');
    }
    get lihatTbl() {
        return this.getEl('button.lihat');
    }
}
class ItemBarangView extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='item-barang'>
				<div class='id'></div>
				<div class='atas cont flex'>
					<img class='gbr' src="">
					<div class='deskripsi'>
						<p class='nama'></p>
					</div>
				</div>
				<div class='bawah'>
					<a class='share'>Share WA</a>
					<button type='button' class='btn btn-sm btn-primary edit'>Edit</button>
					<button type='button' class='btn btn-sm btn-danger hapus'>Hapus</button>
				</div>
				<hr/>
			</div>
		`;
        this.build();
    }
    get id() {
        return this.getEl('div.id');
    }
    get editTbl() {
        return this.getEl('button.edit');
    }
    get hapusTbl() {
        return this.getEl('button.hapus');
    }
    get shareTbl() {
        return this.getEl('a.share');
    }
    get gbr() {
        return this.getEl('img');
    }
    get namaP() {
        return this.getEl('div.deskripsi p.nama');
    }
}
window.onload = () => {
    new PenjualPage();
};
