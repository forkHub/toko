"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connection_1 = require("./module/Connection");
const Log_1 = require("./module/Log");
const app = express_1.default();
const port = 3009;
Connection_1.Connection.connect();
exports.server = app.listen(port, () => {
    Log_1.logW.info("app started at port " + port);
});
async function testRead(pool) {
    return new Promise((resolve, reject) => {
        pool.query("select * from barang limit 1", (err, rows) => {
            if (err) {
                reject(err.sqlMessage + '/' + err.message);
            }
            else {
                resolve(rows);
            }
        });
    });
}
async function testBaca() {
    return new Promise((resolve, reject) => {
        Connection_1.Connection.pool.query("select * from barang limit 1", (err, rows) => {
            if (err) {
                reject(err.sqlMessage + '/' + err.message);
            }
            else {
                resolve(rows);
            }
        });
    });
}
app.get("/connect", (_req, resp) => {
    try {
        Connection_1.Connection.connect2();
        resp.status(200).send('ok');
    }
    catch (e) {
        Log_1.logW.info(e);
        resp.status(500).send(e.message);
    }
});
app.get("/baca", (_req, resp) => {
    try {
        Connection_1.Connection.connect2();
        testBaca().then().catch();
        resp.status(200).send('ok');
    }
    catch (e) {
        Log_1.logW.info(e);
        resp.status(500).send(e.message);
    }
});
app.get("/test1", (_req, resp) => {
    try {
        // log.info("test");
        // resp.status(200).send('ok');
        // testRead;
        Connection_1.Connection.getPool()
            .then((pool) => {
            return testRead(pool);
        }).then(() => {
            resp.status(200).send('success');
        }).catch((e) => {
            Log_1.logW.info(e);
            resp.status(200).send("error: " + e);
        });
    }
    catch (e) {
        Log_1.logW.info(e);
        resp.status(500).send(e.message);
    }
});
app.use((_req, _resp, _next) => {
    Log_1.logW.info(_req.path);
    Log_1.logW.info('404');
    _resp.status(404).send('Halaman Tidak Ditemukan ' + _req.path);
});
process.on('SIGTERM', () => {
    Log_1.logW.info('process on close');
    exports.server.close(() => {
        Log_1.logW.info('Process terminated');
    });
});
