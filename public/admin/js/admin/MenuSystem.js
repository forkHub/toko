import { anggotaDaftar } from "./AnggotaDaftar.js";
import { BaseComponent } from "../BaseComponent.js";
import { daftarBarangPage } from "../barang/DaftarBarangPage.js";
import { data } from "../Data.js";
class MenuSystem extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='menu-system'>
				<button class='btn btn-primary barang'>Daftar Barang</button>
				<button class='btn btn-primary anggota'>Daftar Anggota</button>
			</div>
		`;
        this.build();
        this.barangTbl.onclick = () => {
            //halaman barang
            daftarBarangPage.attach(data.cont);
            daftarBarangPage.load2();
        };
        this.anggotaTbl.onclick = () => {
            //halaman daftar anggota
            anggotaDaftar.attach(data.cont);
            anggotaDaftar.load();
        };
    }
    init() {
    }
    get barangTbl() {
        return this.getEl('button.barang');
    }
    get anggotaTbl() {
        return this.getEl('button.anggota');
    }
}
export var menuSystem = new MenuSystem();
