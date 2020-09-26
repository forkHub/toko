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
const Test_1 = require("./module/router/Test");
const Log_1 = require("./module/Log");
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
app.use("/test", Test_1.router);
exports.server = app.listen(port, () => {
    Log_1.logW.info("app started at port " + port);
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
        Log_1.logW.info('shutdown');
        resp.status(200).end();
        exports.server.close((e) => {
            if (e) {
                Log_1.logW.info('server close error');
                Log_1.logW.info(e.message);
            }
            else {
                Log_1.logW.info('server tutup');
            }
        });
        Connection_1.Connection.pool.end((err) => {
            if (err) {
                Log_1.logW.info('sql shutdown error');
                Log_1.logW.info(err.sqlMessage);
            }
            else {
                Log_1.logW.info('connection tutup');
            }
        });
        //process.kill(process.pid, 'SIGTERM');
    }
    catch (e) {
        Log_1.logW.info(e);
        resp.status(500).send(e);
    }
});
app.use((_req, _resp, _next) => {
    Log_1.logW.info(_req.path);
    Log_1.logW.info('404');
    _resp.status(404).send('Halaman Tidak Ditemukan');
});
process.on('SIGTERM', () => {
    Log_1.logW.info('process on close');
    exports.server.close(() => {
        Log_1.logW.info('Process terminated');
    });
});
