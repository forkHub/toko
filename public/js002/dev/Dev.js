import { Menu } from "./Menu.js";
class Dev {
    constructor() {
        this._menu = new Menu();
    }
    get menu() {
        return this._menu;
    }
}
export var dev = new Dev();
