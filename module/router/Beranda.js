"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../../App");
const BarangSql_1 = require("../entity/BarangSql");
const Connection_1 = require("../Connection");
const Renderer_1 = require("../render/Renderer");
const TokoLog_1 = require("../TokoLog");
const Barang_1 = require("../controller/Barang");
const Auth_1 = require("../Auth");
const Util_1 = require("../Util");
//TODO: dibuat router default
class Beranda {
    init(app) {
        app.get("/cari/:kataKunci/:hal", (_req, resp) => {
            try {
                Barang_1.barangController.cariBarangGet(decodeURI(_req.params.kataKunci), parseInt(_req.params.hal), '')
                    .then((hal) => {
                    resp.status(200).send(hal);
                })
                    .catch((err) => {
                    TokoLog_1.logT.log(err);
                    resp.status(500).send('Error');
                });
            }
            catch (err) {
                TokoLog_1.logT.log(err);
                resp.status(500).send(err.message);
            }
        });
        app.get("/", (_req, resp) => {
            try {
                BarangSql_1.barangSql.baca({
                    publish: 1,
                    orderDateDesc: 1,
                })
                    .then((data) => {
                    return Renderer_1.render.halDepan.render({
                        barangData: data,
                        lapak: '',
                        hal: 0,
                        jml: 0,
                        kataKunci: ''
                    });
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
        app.get("/daftar", (_req, resp) => {
            try {
                Util_1.util.getFile('view/daftar.html').then((h) => {
                    h = h.replace("{{cache}}", Util_1.util.randId);
                    resp.status(200).send(h);
                }).catch((e) => {
                    resp.status(500).send(e.message);
                });
            }
            catch (e) {
                resp.status(500).send(e.message);
            }
        });
        app.get("/hapus-cache", Auth_1.checkAuth, (_req, resp) => {
            try {
                Util_1.util.hapusCache();
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
