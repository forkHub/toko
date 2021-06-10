"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/admin/AuthController");
const Controller_1 = require("../controller/Controller");
const Util_1 = require("../Util");
exports.adminRouter = express_1.default.Router();
exports.adminRouter.get("/anggota/daftar/:auth", AuthController_1.checkAdmin, (_req, resp) => {
    try {
        Controller_1.cont.admin.admin.daftarAnggota().then((data) => {
            resp.status(200).send(data);
        }).catch((e) => {
            Util_1.util.respError(resp, e);
        });
    }
    catch (e) {
        Util_1.util.respError(resp, e);
    }
});
exports.adminRouter.get("/anggota/hapus/id/:id/:auth", AuthController_1.checkAdmin, (req, resp) => {
    try {
        Controller_1.cont.admin.admin.hapusAnggota(parseInt(req.params.id)).then(() => {
            resp.status(200).send('');
        }).catch((e) => {
            Util_1.util.respError(resp, e);
        });
    }
    catch (e) {
        Util_1.util.respError(resp, e);
    }
});
exports.adminRouter.get("/anggota/hapus/nama/:nama/:auth", AuthController_1.checkAdmin, (req, resp) => {
    try {
        console.debug('hapus anggota by name');
        Controller_1.cont.admin.admin.hapusAnggotaByUserName(req.params.nama).then(() => {
            resp.status(200).send('');
        }).catch((e) => {
            Util_1.util.respError(resp, e);
        });
    }
    catch (e) {
        Util_1.util.respError(resp, e);
    }
});
