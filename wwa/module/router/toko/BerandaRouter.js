"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const App_1 = require("../../../../App");
const Connection_1 = require("../../Connection");
const AuthController_1 = require("../../controller/admin/AuthController");
const Util_1 = require("../../Util");
const BerandaController_1 = require("../../controller/toko/BerandaController");
exports.berandaRouter = express_1.default.Router();
/**
 * Cari Barang
 */
exports.berandaRouter.get("/cari/:kunci/hal/:hal", (_req, resp) => {
    try {
        BerandaController_1.berandaController.cariBarang(decodeURI(_req.params.kunci), parseInt(_req.params.hal))
            .then((data) => {
            resp.status(200).send(data);
        }).catch((err) => {
            console.error;
            resp.status(500).send(err.message);
        });
    }
    catch (err) {
        console.error;
        resp.status(500).send(err.message);
    }
});
/**
 * Tampilkan semua barang
 */
exports.berandaRouter.get("/", (_req, resp) => {
    try {
        console.log('beranda');
        BerandaController_1.berandaController.renderBeranda(0)
            .then((data) => {
            resp.status(200).send(data);
        })
            .catch((err) => {
            console.error(err);
            resp.status(500).send(err.message);
        });
    }
    catch (err) {
        console.error(err);
        resp.status(500).send(err.message);
    }
});
exports.berandaRouter.get("/hal/:hal", (_req, resp) => {
    try {
        BerandaController_1.berandaController.renderBeranda(parseInt(_req.params.hal))
            .then((data) => {
            resp.status(200).send(data);
        })
            .catch((err) => {
            console.error;
            resp.status(500).send(err.message);
        });
    }
    catch (err) {
        console.error;
        resp.status(500).send(err.message);
    }
});
/**
 * Test
 */
exports.berandaRouter.get("/test", (_req, resp) => {
    try {
        Util_1.util.getFile('wwa/view/test.html').then((h) => {
            h = h.replace("{{cache}}", Util_1.util.randId);
            h = h.replace("{{cache}}", Util_1.util.randId);
            h = h.replace("{{cache}}", Util_1.util.randId);
            h = h.replace("{{cache}}", Util_1.util.randId);
            h = h.replace("{{cache}}", Util_1.util.randId);
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
exports.berandaRouter.get("/hapus-cache", AuthController_1.checkAuth, (_req, resp) => {
    try {
        Util_1.util.hapusCache();
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.berandaRouter.get("/shutdown", (req, resp) => {
    try {
        req;
        resp.status(200).end();
        App_1.server.close((e) => {
            if (e) {
                console.error;
            }
        });
        Connection_1.Connection.pool.end((err) => {
            if (err) {
                console.error;
            }
        });
        //process.kill(process.pid, 'SIGTERM');
    }
    catch (e) {
        console.error;
        resp.status(500).send(e.message);
    }
});
/**
 * daftar lapak aktif
 */
exports.berandaRouter.get("/daftar_lapak", (_req, resp) => {
    try {
        BerandaController_1.berandaController.renderDaftarLapak()
            .then((hal) => {
            resp.status(200).send(hal);
        }).catch((e) => {
            console.error(e);
        });
    }
    catch (err) {
        Util_1.util.respError(resp, err);
    }
});
