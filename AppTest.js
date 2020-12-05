"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connection_1 = require("./module/Connection");
const TokoLog_1 = require("./module/TokoLog");
const app = express_1.default();
const port = 3009;
Connection_1.Connection.connect();
exports.server = app.listen(port, () => {
    TokoLog_1.logT.log("app started at port " + port);
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
// app.get("/connect", (_req: express.Request, resp: express.Response) => {
// 	try {
// 		Connection.connect2();
// 		resp.status(200).send('ok');
// 	}
// 	catch (e) {
// 		logT.log(e);
// 		resp.status(500).send(e.message);
// 	}
// })
// app.get("/baca", (_req: express.Request, resp: express.Response) => {
// 	try {
// 		Connection.connect2();
// 		testBaca().then().catch();
// 		resp.status(200).send('ok');
// 	}
// 	catch (e) {
// 		logT.log(e);
// 		resp.status(500).send(e.message);
// 	}
// })
app.get("/test1", (_req, resp) => {
    try {
        Connection_1.Connection.getPool()
            .then((pool) => {
            return testRead(pool);
        }).then(() => {
            resp.status(200).send('success');
        }).catch((e) => {
            TokoLog_1.logT.log(e);
            resp.status(200).send("error: " + e);
        });
    }
    catch (e) {
        TokoLog_1.logT.log(e);
        resp.status(500).send(e.message);
    }
});
app.use((_req, _resp, _next) => {
    TokoLog_1.logT.log(_req.path);
    TokoLog_1.logT.log('404');
    _resp.status(404).send('Halaman Tidak Ditemukan ' + _req.path);
});
process.on('SIGTERM', () => {
    TokoLog_1.logT.log('process on close');
    exports.server.close(() => {
        TokoLog_1.logT.log('Process terminated');
    });
});
