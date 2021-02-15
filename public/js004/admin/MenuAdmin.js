import { anggotaDaftar } from "./anggota/AnggotaDaftar.js";
import { BaseComponent } from "../BaseComponent.js";
import { data } from "../Data.js";
import { Util } from "../Util.js";
import { setuju } from "./Setuju.js";
import { anggotaNonAktif } from "./anggota/AnggotaNonAktif.js";
export class MenuAdmin extends BaseComponent {
    constructor() {
        super();
        //TODO: daftar anggota menu
        this._template = `
			<div class='menu-system'>
			
				<h4>Hal Admin</h4>
				<hr/>
				<button class='btn btn-primary daftar anggota setuju'>Persetujuan Anggota</button><br/><br/>
				<button class='btn btn-primary daftar anggota aktif'>Anggota Aktif</button><br/><br/>
				<button class='btn btn-primary daftar anggota non-aktif'>Anggota Non Aktif</button><br/><br/>
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
        };
        this.anggotaNonAktifTbl.onclick = () => {
            console.log('anggota non aktif click');
            this.detach();
            anggotaNonAktif.view.hal.attach(data.cont);
            anggotaNonAktif.tampil();
            anggotaNonAktif.view.hal.nav.tutupTbl.onclick = () => {
                anggotaNonAktif.view.hal.detach();
                this.attach(data.cont);
            };
        };
        //TODO: aktifkan nanti
        // this.barangTbl.onclick = () => {
        // 	this.detach();
        // 	daftarBarangPage.attach(data.cont);
        // 	daftarBarangPage.load2();
        // }
        this.anggotaTbl.onclick = () => {
            console.log('anggota aktif click');
            this.detach();
            anggotaDaftar.attach(data.cont);
            anggotaDaftar.tutup = () => {
                anggotaDaftar.detach();
                this.attach(data.cont);
            };
            anggotaDaftar.tampil();
        };
    }
    init() {
    }
    get setujuTbl() {
        return this.getEl('button.daftar.anggota.setuju');
    }
    get logoutTbl() {
        return this.getEl('button.logout');
    }
    //TODO: aktifkan nanti
    // get barangTbl(): HTMLButtonElement {
    // 	return this.getEl('button.barang') as HTMLButtonElement;
    // }
    get anggotaNonAktifTbl() {
        return this.getEl('button.daftar.anggota.non-aktif');
    }
    get anggotaTbl() {
        return this.getEl('button.daftar.anggota.aktif');
    }
}
// export var menuSystem: MenuSystem = new MenuSystem();
