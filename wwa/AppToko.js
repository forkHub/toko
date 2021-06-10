"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./module/router/Router");
class AppToko {
    router(app) {
        app.use("/barang", Router_1.router.toko.barang);
        app.use("/auth", Router_1.router.auth);
        app.use("/lapak", Router_1.router.toko.lapak);
        app.use("/penjual", Router_1.router.penjual);
        app.use("/admin", Router_1.router.admin);
        app.use("/", Router_1.router.toko.beranda);
    }
}
exports.appToko = new AppToko();
