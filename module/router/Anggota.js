"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Anggota_1 = require("../entity/Anggota");
exports.router = express_1.default.Router();
/*
router.post("/baca/semua", (req: express.Request, resp: express.Response) => {
    try {
        anggota.baca().then((hasil: any) => {
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
*/
exports.router.post("/baca/setuju/:status", (req, resp) => {
    try {
        Anggota_1.anggota.baca(null).then((hasil) => {
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
exports.router.post("/hapus", (req, resp) => {
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
            lapak: req.body.lapak
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
exports.router.post("/update/:id", (req, resp) => {
    try {
        Anggota_1.anggota.update({
            password: req.body.password,
            level: req.body.level,
            user_id: req.params.user_id,
            lapak: req.body.lapak
        }, req.params.id).then(() => {
            resp.status(200).end();
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (error) {
        resp.status(500).send(error.message);
    }
});
