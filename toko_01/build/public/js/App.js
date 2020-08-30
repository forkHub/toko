"use strict";
class App {
    constructor() {
        this.views = [];
        let item = document.querySelectorAll('item');
        item.forEach((item) => {
            let view = new Item();
            view.init(item);
            this.views.push(view);
            console.log(item);
        });
    }
    static getEl(query) {
        let el;
        el = document.body.querySelector(query);
        if (el) {
            return el;
        }
        else {
            console.log(document.body);
            console.log(query);
            throw new Error('query not found ');
        }
    }
}
class Item extends BaseComponent {
    constructor() {
        super();
    }
    init(el) {
        this._elHtml = el;
        this._elHtml.onclick = (e) => {
            e.stopPropagation();
            console.log('item on click');
            this._elHtml.classList.add('fokus');
        };
        this.tutupTbl.onclick = (e) => {
            e.stopPropagation();
            this._elHtml.classList.remove('fokus');
        };
        this.chatTbl.onclick = (e) => {
            e.stopPropagation();
            window.top.location.href = ''; //TODO: chat
        };
    }
    get waP() {
        return this.getEl('p.wa');
    }
    get chatTbl() {
        return this.getEl('button.chat');
    }
    get tutupTbl() {
        return this.getEl('p.tutup button');
    }
}
window.onload = () => {
    new App();
};
