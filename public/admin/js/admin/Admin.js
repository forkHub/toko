import { MenuAdmin } from "./MenuAdmin.js";
class Admin {
    constructor() {
        this._menu = new MenuAdmin();
    }
    get menu() {
        return this._menu;
    }
    set menu(value) {
        this._menu = value;
    }
}
export var admin = new Admin();
