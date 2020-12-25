import { MenuSystem } from "./MenuSystem.js";
class Admin {
    constructor() {
        this._menu = new MenuSystem();
    }
    get menu() {
        return this._menu;
    }
    set menu(value) {
        this._menu = value;
    }
}
export var admin = new Admin();
