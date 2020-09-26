"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connection_1 = require("./module/Connection");
const Barang_1 = require("./module/router/Barang");
const File_1 = require("./module/router/File");
const Auth_1 = require("./module/router/Auth");
const Install_1 = require("./module/router/Install");
const TokoTest_1 = require("./module/router/TokoTest");
const TokoLog_1 = require("./module/TokoLog");
const cookie_session_1 = __importDefault(require("cookie-session"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const port = 3009;
Connection_1.Connection.connect();
app.use(express_1.default.static(__dirname + "/public"));
app.use(express_1.default.json({ limit: '5mb' }));
app.use(cookie_session_1.default({
    name: 'toko_session',
    keys: ['Auni_202002_cookie_session']
}));
app.use("/barang", Barang_1.router);
app.use("/file", File_1.router);
app.use("/auth", Auth_1.router);
app.use("/sys", Install_1.router);
app.use("/toko_test", TokoTest_1.router);
exports.server = app.listen(port, () => {
    TokoLog_1.logT.log("app started at port " + port);
});
app.get("/toko", (_req, resp) => {
    try {
        resp.sendFile(path_1.default.join('/admin_page.html'), {
            root: __dirname + '/public'
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
app.get("/shutdown", (req, resp) => {
    try {
        TokoLog_1.logT.log('shutdown');
        resp.status(200).end();
        exports.server.close((e) => {
            if (e) {
                TokoLog_1.logT.log('server close error');
                TokoLog_1.logT.log(e.message);
            }
            else {
                TokoLog_1.logT.log('server tutup');
            }
        });
        Connection_1.Connection.pool.end((err) => {
            if (err) {
                TokoLog_1.logT.log('sql shutdown error');
                TokoLog_1.logT.log(err.sqlMessage);
            }
            else {
                TokoLog_1.logT.log('connection tutup');
            }
        });
        //process.kill(process.pid, 'SIGTERM');
    }
    catch (e) {
        TokoLog_1.logT.log(e);
        resp.status(500).send(e);
    }
});
app.use((_req, _resp, _next) => {
    TokoLog_1.logT.log(_req.path);
    TokoLog_1.logT.log('404');
    _resp.status(404).send('Halaman Tidak Ditemukan');
});
process.on('SIGTERM', () => {
    TokoLog_1.logT.log('process on close');
    exports.server.close(() => {
        TokoLog_1.logT.log('Process terminated');
    });
});
