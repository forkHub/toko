"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Renderer_1 = require("./Renderer");
class Toko {
    async render(barangData, lapak) {
        // console.log('render');
        await Renderer_1.render.renderBeranda(barangData, lapak);
    }
}
exports.toko = new Toko();
