// import { anggotaDaftar } from "./AnggotaDaftar.js";
import { BaseComponent } from "../BaseComponent.js";
// import { daftarBarangPage } from "../barang/DaftarBarangPage.js";
import { data } from "../Data.js";
// import { dialog } from "../Dialog.js";
import { Util } from "../Util.js";
import { setuju } from "./Setuju.js";
export class MenuSystem extends BaseComponent {
    constructor() {
        super();
        //TODO: daftar anggota menu
        this._template = `
			<div class='menu-system'>
			
				<h4>Hal Admin</h4>
				<hr/>
				<button class='btn btn-primary setuju'>Persetujuan Anggota</button><br/><br/>
				<button class='btn btn-primary logout'>Logout</button><br/><br/>
			</div>
		`;
        this.build();
        this.setujuTbl.onclick = () => {
            this.detach();
            setuju.tampil();
            setuju.tutup = () => {
                setuju.view.detach();
                this.attach(data.cont);
            };
        };
        this.logoutTbl.onclick = () => {
            window.top.location.href = Util.urlLogout;
            // Util.Ajax('post', Util.urlLogout, '').then(() => {
            // 	window.top.location.reload();
            // }).catch((e) => {
            // 	dialog.tampil2(e.message);
            // })
        };
        //TODO: aktifkan nanti
        // this.barangTbl.onclick = () => {
        // 	this.detach();
        // 	daftarBarangPage.attach(data.cont);
        // 	daftarBarangPage.load2();
        // }
        // this.anggotaTbl.onclick = () => {
        // 	this.detach();
        // 	anggotaDaftar.attach(data.cont);
        // 	anggotaDaftar.tutup = () => {
        // 		anggotaDaftar.detach();
        // 		this.attach(data.cont);
        // 	}
        // 	anggotaDaftar.load();
        // }
    }
    init() {
    }
    get setujuTbl() {
        return this.getEl('button.setuju');
    }
    get logoutTbl() {
        return this.getEl('button.logout');
    }
}
// export var menuSystem: MenuSystem = new MenuSystem();
