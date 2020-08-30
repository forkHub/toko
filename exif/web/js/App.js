"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class App {
    constructor() {
        let file = document.getElementById('file-input');
        file.onchange = () => {
            this.loadImage3(file);
        };
    }
    loadImage3(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadImage2(file, 200, 200);
            yield this.loadImage2(file, 100, 100);
        });
    }
    loadImage2(file, panjang, lebar) {
        return __awaiter(this, void 0, void 0, function* () {
            let img = yield loadImage(file.files[0], {
                maxWidth: panjang,
                maxHeight: lebar,
                canvas: true,
                orientation: true,
                imageSmoothingQuality: 'high'
            });
            console.log('finish');
            console.log(img);
            document.body.appendChild(img.image);
        });
    }
}
window.onload = () => {
    new App();
};
