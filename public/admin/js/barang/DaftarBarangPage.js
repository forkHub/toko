var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseComponent } from "../BaseComponent.js";
import { config } from "../Config.js";
import { data } from "../Data.js";
import { dialog } from "../Dialog.js";
import { form } from "./FormBarangPage.js";
import { login } from "../Login2.js";
import { upload } from "../PhotoUploadPage.js";
import { Util } from "../Util.js";
class DaftarBarangPage extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='daftar-barang-page'>
				<h1>Daftar Barang</h1>
				<button type='button' class='btn btn-primary btn-small tambah'>Tambah Data</button>
				<button type='button' class='btn btn-primary btn-small lihat'>Lihat Lapak</button>
				<button type='button' class='btn btn-primary btn-small logout'>Logout</button>
				<br/>
				<br/>
				<div class='cont'>
					
				</div>
			</div>			
		`;
        this.build();
    }
    init() {
        // this.form = App.form;
        this.tambahTbl.onclick = () => {
            this.tambahClick();
        };
        this.logoutTbl.onclick = () => {
            this.logoutClick();
        };
        this.lihatTbl.onclick = () => {
            if (config.sofwan) {
                window.top.location.href = "/lapak/" + window.sessionStorage.getItem('lapak');
            }
            else {
                window.top.location.href = "/";
            }
        };
    }
    tampil() {
    }
    logoutClick() {
        window.top.location.href = Util.urlLogout;
    }
    tambahClick() {
        this.detach();
        form.view.attach(data.cont);
        form.editMode = false;
        form.default();
        form.resetTinyMCE();
        form.tampil(null, true);
    }
    barangEditlick(item) {
        console.log(item);
        this.detach();
        form.view.attach(data.cont);
        form.objToForm(item);
        form.view.gambarHtml.src = item.thumb;
        form.editMode = true;
        form.resetTinyMCE();
        upload.idLama = item.file_id;
        form.tampil(item, false);
    }
    barangHapusClick(item) {
        let hasil = confirm("Hapus Data?");
        if (hasil) {
            console.log('hapus data');
            Util.Ajax('post', '/barang/hapus/' + item.id, null).then((hasil) => {
                console.log(hasil);
                dialog.p.innerHTML = "Berhasil";
                dialog.tampil();
                dialog.okTbl.onclick = () => {
                    window.top.location.href = Util.urlAdmin;
                };
            }).catch((e) => {
                dialog.p.innerHTML = e;
                dialog.tampil();
            });
        }
    }
    load2() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('load barang ');
            console.log(config);
            let lapak = window.sessionStorage.getItem(Util.sLapakId);
            let obj = {};
            if (lapak && lapak != '') {
                obj.lapak_id = lapak;
            }
            console.log("lapak");
            console.log(lapak);
            Util.Ajax("post", Util.urlBarangBaca, JSON.stringify(obj)).then((str) => {
                let barangAr = JSON.parse(str);
                this.cont.innerHTML = '';
                console.log('load ' + barangAr.length);
                // console.group('load str');
                // console.log(str);
                // console.groupEnd();
                barangAr.forEach((data) => {
                    let view = new ItemBarangView();
                    let item = (data);
                    // console.group('data');
                    // console.log(data);
                    // console.groupEnd();
                    // console.group('item');
                    // console.log(item);
                    // console.groupEnd();
                    view.namaP.innerHTML = item.nama + " (" + (item.publish ? "dipublish" : "draft") + ")";
                    view.gbr.src = item.thumb;
                    view.attach(this.cont);
                    view.editTbl.onclick = () => {
                        this.barangEditlick(item);
                    };
                    view.hapusTbl.onclick = () => {
                        this.barangHapusClick(item);
                    };
                });
            }).catch((e) => {
                if (Util.resp.code == 401) {
                    this.detach();
                    login.attach(data.cont);
                }
                else {
                    dialog.tampil2(e.message);
                }
            });
        });
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
    get logoutTbl() {
        return this.getEl('button.logout');
    }
}
class ItemBarangView extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='item-barang'>
				<div class='atas cont'>
					<img class='gbr' src="">
					<div class='deskripsi'>
						<p class='nama'></p>
						<div class='bawah'>
							<button type='button' class='btn btn-sm btn-primary edit'>Edit</button>
							<button type='button' class='btn btn-sm btn-danger hapus'>Hapus</button>
						</div>
					</div>
				</div>
				<hr/>
			</div>
		`;
        this.build();
    }
    get editTbl() {
        return this.getEl('button.edit');
    }
    get hapusTbl() {
        return this.getEl('button.hapus');
    }
    get gbr() {
        return this.getEl('img');
    }
    get namaP() {
        return this.getEl('div.deskripsi p.nama');
    }
}
export var daftarBarangPage = new DaftarBarangPage();
