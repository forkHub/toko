"use strict";
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
            App.daftarBarang.attach(App.cont);
            App.daftarBarang.load2();
        };
        this.anggotaTbl.onclick = () => {
            //halaman daftar anggota
            App.anggotaDaftar.attach(App.cont);
            App.anggotaDaftar.load();
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
