"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/admin/AuthController");
const AnggotaSql_1 = require("../entity/draf/AnggotaSql");
const HalBarang_1 = require("../entity/draf/HalBarang");
const SessionData_1 = require("../SessionData");
exports.router = express_1.default.Router();
exports.router.post("/hapus/:id", AuthController_1.checkAuth, AuthController_1.checkAdmin, (req, resp) => {
    try {
        HalBarang_1.halBarang.hapusByLapakId(req.params.id).then(() => {
            return AnggotaSql_1.anggotaSql.hapus(req.params.id);
        }).then(() => {
            resp.status(200).send('');
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (err) {
        resp.status(500).send(err.message);
    }
});
exports.router.post("/baru", (req, resp) => {
    try {
        let data = {
            password: req.body.password,
            level: "user",
            user_id: req.body.user_id,
            lapak: req.body.lapak,
            deskripsi: req.body.deskripsi,
            wa: req.body.wa,
            alamat: req.body.alamat,
        };
        AnggotaSql_1.anggotaSql.baru(data)
            .then((data) => {
            resp.status(200).send(data.insertId + '');
        }).catch((e) => {
            console.error(e);
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        resp.status(500).send(e.message);
    }
});
exports.router.post("/update", AuthController_1.checkAuth, AuthController_1.checkAdminUser, (req, resp) => {
    try {
        if (!AuthController_1.isAdmin(req) && SessionData_1.session(req).user_id != req.body.user_id) {
            resp.status(403).send('Perintah tidak diperkenankan');
            return;
        }
        let opt = {};
        if (req.body.deskripsi)
            opt.deskripsi = req.body.deskripsi;
        if (req.body.lapak)
            opt.lapak = req.body.lapak;
        if (req.body.password)
            opt.password = req.body.password;
        if (req.body.setuju)
            opt.setuju = req.body.setuju;
        if (req.body.user_id)
            opt.user_id = req.body.user_id;
        if (req.body.wa)
            opt.wa = req.body.wa;
        if (req.body.alamat)
            opt.alamat = req.body.alamat;
        AnggotaSql_1.anggotaSql.update(opt, req.body.id).then(() => {
            resp.status(200).end();
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (error) {
        resp.status(500).send(error.message);
    }
});
exports.router.post("/update/password", AuthController_1.checkAuth, AuthController_1.checkAdminUser, (req, resp) => {
    try {
        if (!AuthController_1.isAdmin(req) && SessionData_1.session(req).user_id != req.body.user_id) {
            resp.status(403).send('Perintah tidak diperkenankan');
            return;
        }
        let opt = {
            password: req.body.password,
            id: req.body.id
        };
        //validate 
        if (!opt.password || opt.password == '') {
            resp.status(500).send('Password tidak boleh kosong');
            return;
        }
        AnggotaSql_1.anggotaSql.update(opt, opt.id).then(() => {
            resp.status(200).end();
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (error) {
        resp.status(500).send(error.message);
    }
});
exports.router.post("/update/id/:id/setuju/:setuju", AuthController_1.checkAuth, AuthController_1.checkAdmin, (req, resp) => {
    try {
        let opt = {
            setuju: parseInt(req.params.setuju),
        };
        AnggotaSql_1.anggotaSql.update(opt, parseInt(req.params.id)).then(() => {
            resp.status(200).end();
        }).catch((e) => {
            console.error;
            resp.status(500).send(e.message);
        });
    }
    catch (error) {
        resp.status(500).send(error.message);
    }
});
exports.router.post("/baca/setuju/:setuju", AuthController_1.checkAuth, AuthController_1.checkAdmin, (req, resp) => {
    try {
        if (SessionData_1.session(req).level != 'admin') {
            resp.status(403).send('Perintah tidak diperkenankan');
        }
        AnggotaSql_1.anggotaSql.bacaBySetuju((req.params.setuju)).then((hasil) => {
            resp.status(200).send(hasil);
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        console.log(e);
        resp.status(200).send(e.message);
    }
});
exports.router.post("/baca/:id", (req, resp) => {
    try {
        AnggotaSql_1.anggotaSql.bacaById(req.params.id).then((h) => {
            resp.status(200).send(h);
        }).catch((e) => {
            console.error;
            resp.status(500).send(e.message);
        });
    }
    catch (err) {
        console.error;
        resp.status(500).send(err.message);
    }
});
