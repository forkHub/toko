"use strict";
class Dialog extends BaseComponent {
    init() {
        this._elHtml = document.querySelector('div.dialog');
    }
    tampil(def = true) {
        if (def) {
            this.okTbl.onclick = () => {
                this._elHtml.style.display = 'none';
            };
        }
        this._elHtml.style.display = 'block';
    }
    sembunyi() {
        this._elHtml.style.display = 'none';
    }
    get okTbl() {
        return this.getEl('button.ok');
    }
    get p() {
        return this.getEl('p');
    }
}
