"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const Connection_1 = require("./module/Connection");
const Barang_1 = require("./module/router/Barang");
const File_1 = require("./module/router/File");
const Auth_1 = require("./module/router/Auth");
const Install_1 = require("./module/router/Install");
const TokoTest_1 = require("./module/router/TokoTest");
const Anggota_1 = require("./module/router/Anggota");
const Lapak_1 = require("./module/router/Lapak");
const TokoLog_1 = require("./module/TokoLog");
const cookie_session_1 = __importDefault(require("cookie-session"));
const Beranda_1 = require("./module/router/Beranda");
// import { routerApiBarang } from "./module/admin/router/Barang";
const Util_1 = require("./module/Util");
const Config_1 = require("./module/router/Config");
const ConfigController_1 = require("./module/ConfigController");
// import { configSql } from "./module/entity/ConfigSql";
// import { config } from "./module/Config";
// import { configController } from "./module/ConfigController";
Util_1.util.buatRandom();
const app = express_1.default();
const port = 3000;
app.use(express_1.default.static(__dirname + "/public"));
app.use(express_1.default.json({ limit: '5mb' }));
app.use(cookie_session_1.default({
    name: 'toko_session',
    keys: ['Auni_202002_cookie_session']
}));
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "data:", "blob:"]
    }
}));
app.use("/barang", Barang_1.router);
app.use("/file", File_1.router);
app.use("/auth", Auth_1.router);
app.use("/sys", Install_1.router);
app.use("/toko_test", TokoTest_1.router);
app.use("/anggota", Anggota_1.router);
app.use("/lapak", Lapak_1.lapakRouter);
app.use("/konfig", Config_1.configRouter);
app.use("/", Beranda_1.berandaRouter);
app.use((_req, _resp, _next) => {
    TokoLog_1.logT.log(_req.path);
    TokoLog_1.logT.log('404');
    _resp.status(404).send('Halaman Tidak Ditemukan');
});
process.on('SIGTERM', () => {
    try {
        TokoLog_1.logT.log('shutdown');
        Connection_1.Connection.pool.end((err) => {
            if (err) {
                TokoLog_1.logT.log('sql shutdown error');
                TokoLog_1.logT.log(err.sqlMessage);
            }
            else {
                TokoLog_1.logT.log('connection tutup');
            }
        });
    }
    catch (e) {
        TokoLog_1.logT.log(e);
    }
});
Connection_1.Connection.connect();
ConfigController_1.configController.ambilDariDbSemua().catch((e) => {
    console.log(e);
}).then(() => {
    ConfigController_1.configController.update2DbSemua();
    console.log('ok');
}).catch((e) => {
    console.log(e);
});
exports.server = app.listen(port, () => {
    TokoLog_1.logT.log("app started");
});
// beranda.init(app);
/*
*/
