import { BaseComponent } from "../BaseComponent.js";
import { data } from "../Data.js";
class AnggotaDetail {
    constructor() {
        this._view = new View();
        this._view.tutupTbl.onclick = () => {
            this._view.detach();
            this._tutup();
        };
    }
    tampil(pengguna) {
        this._view.lapakP.innerHTML = pengguna.lapak;
        this._view.deskripsiP.innerHTML = pengguna.deskripsi;
        this._view.attach(data.cont);
    }
    set tutup(f) {
        this._tutup = f;
    }
    get view() {
        return this._view;
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='anggota-detail'>
				<div class='nav'>
					<button class='btn btn-primary tutup'>&lt;</button>
					<p class='judul'>Info Anggota</p>
				</div>
				<small>lapak:</small>
				<p class='lapak'></p>
				<small>deskripsi:</small>
				<p class='deskripsi'></p>
			</div>
		`;
        this.build();
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get lapakP() {
        return this.getEl('p.lapak');
    }
    get deskripsiP() {
        return this.getEl('p.deskripsi');
    }
}
export var anggotaDetail = new AnggotaDetail();
