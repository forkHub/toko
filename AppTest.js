"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connection_1 = require("./wwa/module/Connection");
const app = express_1.default();
const port = 3009;
Connection_1.Connection.connect();
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
app.get("/test1", (_req, resp) => {
    try {
        Connection_1.Connection.getPool()
            .then((pool) => {
            return testRead(pool);
        }).then(() => {
            resp.status(200).send('success');
        }).catch((e) => {
            logT.log(e);
            resp.status(200).send("error: " + e);
        });
    }
    catch (e) {
        logT.log(e);
        resp.status(500).send(e.message);
    }
});
app.use((_req, _resp, _next) => {
    logT.log(_req.path);
    logT.log('404');
    _resp.status(404).send('Halaman Tidak Ditemukan ' + _req.path);
});
process.on('SIGTERM', () => {
    logT.log('process on close');
    server.close(() => {
        logT.log('Process terminated');
    });
});
