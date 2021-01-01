import { anggotaDaftar } from "./AnggotaDaftar.js";
import { BaseComponent } from "../BaseComponent.js";
import { daftarBarangPage } from "../barang/DaftarBarangPage.js";
import { data } from "../Data.js";
import { setuju } from "./Setuju.js";
export class MenuSystem extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='menu-system'>
				<h3>Admin</h3>
				<button class='btn btn-primary barang'>Daftar Barang</button><br/><br/>
				<button class='btn btn-primary setuju'>Persetujuan Anggota</button><br/><br/>
				<button class='btn btn-primary anggota'>Daftar Anggota</button><br/><br/>
			</div>
		`;
        this.build();
        this.barangTbl.onclick = () => {
            //halaman barang
            this.detach();
            daftarBarangPage.attach(data.cont);
            daftarBarangPage.load2();
        };
        this.setujuTbl.onclick = () => {
            this.detach();
            setuju.tampil();
            setuju.tutup = () => {
                setuju.view.detach();
                this.attach(data.cont);
            };
        };
        this.anggotaTbl.onclick = () => {
            this.detach();
            anggotaDaftar.attach(data.cont);
            anggotaDaftar.tutup = () => {
                anggotaDaftar.detach();
                this.attach(data.cont);
            };
            anggotaDaftar.load();
        };
    }
    init() {
    }
    get setujuTbl() {
        return this.getEl('button.setuju');
    }
    get barangTbl() {
        return this.getEl('button.barang');
    }
    get anggotaTbl() {
        return this.getEl('button.anggota');
    }
}
// export var menuSystem: MenuSystem = new MenuSystem();
