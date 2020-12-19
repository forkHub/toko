import { BaseComponent } from "./BaseComponent.js";
class Loading extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='loading'>
				<div class='box'>
					<img src='/admin/gbr/loading.gif'/>
					<p>Memuat</p> 
				</div>
			</div>
		`;
        this.build();
    }
    tampil() {
        this.attach(document.body);
    }
}
export var loading = new Loading();
