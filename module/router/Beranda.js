"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const App_1 = require("../../App");
const Connection_1 = require("../Connection");
const TokoLog_1 = require("../TokoLog");
const Auth_1 = require("../Auth");
const Util_1 = require("../Util");
const Beranda_1 = require("../controller/Beranda");
const Config_1 = require("../Config");
exports.berandaRouter = express_1.default.Router();
exports.berandaRouter.get("/cari/:kunci/hal/:hal", (_req, resp) => {
    try {
        Beranda_1.berandaController.cariBarang(decodeURI(_req.params.kunci), _req.params.hal, '')
            .then((data) => {
            resp.status(200).send(data);
        }).catch((err) => {
            TokoLog_1.logT.log(err);
            resp.status(500).send(err.message);
        });
        // barangSql
        // 	.baca({
        // 		kataKunci: decodeURI(_req.params.kunci),
        // 		publish: 1,
        // 		offset: parseInt(_req.params.hal),
        // 		orderDateAsc: 1,
        // 		limit: parseInt(config.getNilai(Config.JML_PER_HAL))
        // 	})
        // 	.then((data: IBarangObj[]) => {
        // 		return render.halDepan.render({
        // 			barangData: data,
        // 			lapakId: '',
        // 			hal: parseInt(_req.params.hal),
        // 			jml: parseInt(config.getNilai(Config.JML_PER_HAL)),
        // 			kataKunci: _req.params.kunci
        // 		});
        // 	})
        // 	.then((data: string) => {
        // 		resp.status(200).send(data);
        // 	})
        // 	.catch((err) => {
        // 		logT.log(err);
        // 		resp.status(500).send(err.message);
        // 	});
    }
    catch (err) {
        TokoLog_1.logT.log(err);
        resp.status(500).send(err.message);
    }
});
exports.berandaRouter.get("/", (_req, resp) => {
    try {
        Beranda_1.berandaController.beranda()
            .then((data) => {
            resp.status(200).send(data);
        })
            .catch((err) => {
            TokoLog_1.logT.log(err);
            resp.status(500).send(err.message);
        });
    }
    catch (err) {
        TokoLog_1.logT.log(err);
        resp.status(500).send(err.message);
    }
});
exports.berandaRouter.get("/daftar", (_req, resp) => {
    try {
        Util_1.util.getFile('view/anggota_daftar.html').then((h) => {
            h = h.replace("{{cache}}", Util_1.util.randId);
            h = h.replace("{{toko}}", Config_1.config.getNilai(Config_1.Config.NAMA_TOKO));
            resp.status(200).send(h);
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        resp.status(500).send(e.message);
    }
});
exports.berandaRouter.get("/admin", (_req, resp) => {
    try {
        Util_1.util.getFile('view/admin.html').then((h) => {
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
exports.berandaRouter.get("/hapus-cache", Auth_1.checkAuth, (_req, resp) => {
    try {
        Util_1.util.hapusCache();
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.berandaRouter.get("/shutdown", (req, resp) => {
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
// export var beranda: Beranda = new Beranda();
