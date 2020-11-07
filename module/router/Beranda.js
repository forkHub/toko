"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const App_1 = require("../../App");
const BarangSql_1 = require("../BarangSql");
const Connection_1 = require("../Connection");
const Renderer_1 = require("../Renderer");
const TokoLog_1 = require("../TokoLog");
class Beranda {
    init(app) {
        app.get("/lapak/:lapak", (_req, resp) => {
            try {
                TokoLog_1.logT.log("rendar beranda lapak " + _req.params.lapak);
                BarangSql_1.barangSql.bacalapakPublish(_req.params.lapak)
                    .then((data) => {
                    TokoLog_1.logT.log(data);
                    return Renderer_1.render.renderBeranda(data, _req.params.lapak, false);
                })
                    .then((data) => {
                    resp.status(200).header("Cache-Control", "max-age=7200").send(data);
                })
                    .catch((err) => {
                    TokoLog_1.logT.log(err);
                    resp.status(500).send('Error');
                });
            }
            catch (err) {
                TokoLog_1.logT.log(err);
                resp.status(500).send('Error');
            }
        });
        app.get("/", (_req, resp) => {
            // let barangObj: any;
            try {
                BarangSql_1.barangSql.bacaPublish()
                    .then((data) => {
                    // barangObj = data[0];
                    return Renderer_1.render.renderBeranda(data, "", false);
                })
                    .then((data) => {
                    resp.status(200).send(data);
                })
                    .catch((err) => {
                    TokoLog_1.logT.log(err);
                    resp.status(500).send('Error');
                });
            }
            catch (err) {
                TokoLog_1.logT.log(err);
                resp.status(500).send('Error');
            }
        });
        app.get("/admin", (_req, resp) => {
            try {
                resp.sendFile(path_1.default.join('index.html'), {
                    root: __dirname + '/public/admin'
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
                App_1.server.close((e) => {
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
    }
}
exports.beranda = new Beranda();
