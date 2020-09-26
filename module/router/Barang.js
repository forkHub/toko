"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BarangSql_1 = require("../BarangSql");
const Auth_1 = require("./Auth");
const Toko_1 = require("../Toko");
const Log_1 = require("../Log");
exports.router = express_1.default.Router();
exports.router.post("/hapus/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        BarangSql_1.barangSql.hapus(req.params.id).then(() => {
            return Toko_1.toko.render();
        }).then(() => {
            resp.status(200).end();
        }).catch((e) => {
            Log_1.logW.log(e);
            resp.status(500).send(e);
        });
    }
    catch (err) {
        resp.status(500).send(err);
    }
});
exports.router.post("/baca/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        BarangSql_1.barangSql.bacaId(req.params.id).then().catch();
    }
    catch (err) {
        resp.status(500).send(err);
    }
});
exports.router.post("/baca", Auth_1.checkAuth, (req, resp) => {
    try {
        BarangSql_1.barangSql
            .bacaSemua()
            .then((rows) => {
            resp.status(200).send(rows);
        })
            .catch((e) => {
            Log_1.logW.log(e);
            resp.status(500).send(e);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.router.post("/baru", Auth_1.checkAuth, (req, resp) => {
    try {
        let data = {
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            deskripsi_panjang: req.body.deskripsi_panjang,
            harga: req.body.harga,
            wa: req.body.wa,
            file_id: req.body.file_id,
            publish: req.body.publish
        };
        BarangSql_1.barangSql.baru(data)
            .then(() => {
            return Toko_1.toko.render();
        }).then(() => {
            resp.status(200).end();
        }).catch((e) => {
            Log_1.logW.log(e);
            resp.status(500).send(e);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.router.post("/update/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        BarangSql_1.barangSql.update({
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            deskripsi_panjang: req.body.deskripsi_panjang,
            harga: req.body.harga,
            wa: req.body.wa,
            file_id: req.body.file_id,
            publish: req.body.publish
        }, req.params.id)
            .then(() => {
            return Toko_1.toko.render();
        }).then(() => {
            resp.status(200).end();
        }).catch((e) => {
            resp.status(500).send(e);
        });
    }
    catch (error) {
        resp.status(500).send(error);
    }
});
