import { BaseComponent } from "../BaseComponent.js";
import { Nav } from "./Nav.js";
export class HalTemplate extends BaseComponent {
    constructor() {
        super();
        this._nav = new Nav();
        this._template = `
			<div class='hal template'>
				<div class="nav-cont">

				</div>
				<br/>
				<div class='body-cont'>
				</div>
			</div>
			`;
        this.build();
        this.nav.attach(this.navCont);
    }
    get nav() {
        return this._nav;
    }
    setting(judul, selesai) {
        this.nav.judulP.innerHTML = judul;
        this.nav.tutupTbl.onclick = () => {
            selesai();
        };
    }
    get navCont() {
        return this.getEl('div.nav-cont');
    }
}
