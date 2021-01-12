import { BaseComponent } from "../BaseComponent";
import { data } from "../Data";
class Menu {
    constructor() {
        this.view = new View();
    }
    tampil() {
        this.view.attach(data.cont);
    }
}
class View extends BaseComponent {
    constructor() {
        super();
    }
}
export var menu = new Menu();
