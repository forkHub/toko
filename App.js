"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connection_1 = require("./wwa/module/Connection");
const cookie_session_1 = __importDefault(require("cookie-session"));
const Util_1 = require("./wwa/module/Util");
const AppClodinary_1 = require("./cloudinary_module/AppClodinary");
const AppToko_1 = require("./wwa/AppToko");
const Kons_1 = require("./wwa/module/Kons");
Util_1.util.buatRandom();
Util_1.util.baseDir = __dirname;
const app = express_1.default();
const port = 3000;
app.use(express_1.default.static(__dirname + Kons_1.kons.folder_public));
app.use(express_1.default.json({ limit: '5mb' }));
app.use(cookie_session_1.default({
    name: 'toko_session',
    keys: ['Auni_202002_cookie_session']
}));
AppToko_1.appToko.router(app);
AppClodinary_1.appCloudinary.router(app);
app.use((_req, _resp, _next) => {
    console.log(_req.path);
    _resp.status(404).send(`<html><head><title></title></head><body>Halaman Tidak Ditemukan</body></html>`);
});
process.on('SIGTERM', () => {
    try {
        Connection_1.Connection.pool.end((err) => {
            if (err) {
                console.error;
            }
            else {
            }
        });
    }
    catch (e) {
        console.error;
    }
});
Connection_1.Connection.connect();
exports.server = app.listen(port, () => {
    console.log('app started');
});
