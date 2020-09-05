"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Renderer_1 = require("./Renderer");
class Toko {
    async render() {
        let hasil = await Renderer_1.Renderer.renderHtml();
        Renderer_1.Renderer.tulisKeFile("public/index.html", hasil);
    }
}
exports.toko = new Toko();
