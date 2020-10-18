"use strict";
class Loading extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div>
				<div class='box'>
					<img src='/gbr/loading.gif'/>
					<p>Memuat</p>
				</div>
			</div>
		`;
        this.build();
    }
}
