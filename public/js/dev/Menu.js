import { BaseComponent } from "../BaseComponent.js";
// import { config } from "../Config.js";
import { data } from "../Data.js";
import { Nav } from "../template/Nav.js";
import { Util } from "../Util.js";
import { configForm } from "./ConfigForm.js";
export class Menu extends BaseComponent {
    constructor() {
        super();
        this._nav = new Nav();
        this._template = `
			<div class='menu menu-dev'>
				<div class='nav-cont'>
				</div>
				<br/>
				<button class='btn btn-primary btn-sm config'>Config</button>
			</div>
		`;
        this.build();
        // let nav: Nav = new Nav();
        this._nav.judulP.innerHTML = 'Developer';
        this._nav.attach(this.navCont);
        this._nav.tutupTbl.onclick = () => {
            window.top.location.href = Util.urlLogout;
        };
        this.configTbl.onclick = () => {
            this.detach();
            configForm.view.attach(data.cont);
            configForm.view.tutupTbl.onclick = () => {
                configForm.view.detach();
                this.attach(data.cont);
            };
            configForm.tampil();
        };
        configForm.selesai = () => {
            this.attach(data.cont);
        };
    }
    get nav() {
        return this._nav;
    }
    get navCont() {
        return this.getEl('div.nav-cont');
    }
    get configTbl() {
        return this.getEl('button.config');
    }
}
