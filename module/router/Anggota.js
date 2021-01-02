"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../Auth");
const Anggota_1 = require("../entity/Anggota");
exports.router = express_1.default.Router();
exports.router.post("/baca/setuju/:setuju", Auth_1.checkAuth, (req, resp) => {
    try {
        Anggota_1.anggota.baca({
            setuju: parseInt(req.params.setuju)
        }).then((hasil) => {
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
exports.router.post("/hapus/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        Anggota_1.anggota.hapus(req.params.id).then(() => {
            resp.status(200).end();
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
            level: req.body.level,
            user_id: req.body.user_id,
            lapak: req.body.lapak,
            deskripsi: req.body.deskripsi
        };
        Anggota_1.anggota.baru(data)
            .then(() => {
            resp.status(200).end();
        }).catch((e) => {
            console.log(e.errno);
            resp.status(500).send(e.message);
            //TODO: err 1062 duplicate entry
        });
    }
    catch (e) {
        resp.status(500).send(e.message);
    }
});
exports.router.post("/update/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        let opt = {};
        opt.deskripsi;
        opt.lapak;
        opt.level;
        opt.password;
        opt.setuju;
        opt.user_id;
        Anggota_1.anggota.update(opt, req.params.id).then(() => {
            resp.status(200).end();
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (error) {
        resp.status(500).send(error.message);
    }
});
exports.router.post("/update/id/:id/setuju/:setuju", Auth_1.checkAuth, (req, resp) => {
    try {
        let opt = {
            setuju: parseInt(req.params.setuju)
        };
        Anggota_1.anggota.update(opt, req.params.id).then(() => {
            resp.status(200).end();
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (error) {
        resp.status(500).send(error.message);
    }
});
exports.router.post("/baca", (req, resp) => {
    try {
        console.log(req.body);
        Anggota_1.anggota.baca({
            id: req.body.id,
            lapak: req.body.lapak,
            setuju: req.body.setuju,
            deskripsi: req.body.deskripsi,
            level: req.body.level,
            password: req.body.password,
            user_id: req.body.user_id
        }).then((h) => {
            resp.status(200).send(h);
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (err) {
        resp.status(500).send(err.message);
    }
});
