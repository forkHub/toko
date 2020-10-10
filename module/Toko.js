"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Renderer_1 = require("./Renderer");
class Toko {
    async render() {
        console.log('render');
        await Renderer_1.render.renderBeranda();
    }
}
exports.toko = new Toko();
