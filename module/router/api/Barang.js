"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../Auth");
const Barang_1 = require("../../controller/Barang");
const BarangSql_1 = require("../../entity/BarangSql");
const TokoLog_1 = require("../../TokoLog");
var router = express_1.default.Router();
router.post("/baca/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        BarangSql_1.barangSql.bacaId(req.params.id).then().catch();
    }
    catch (err) {
        resp.status(500).send(err);
    }
});
router.post("/baca/lapak/:lapak", Auth_1.checkAuth, (req, resp) => {
    try {
        TokoLog_1.logT.log("barang baca lapak, lapak " + req.params.lapak);
        BarangSql_1.barangSql
            .bacalapak(req.params.lapak)
            .then((rows) => {
            resp.status(200).send(rows);
        })
            .catch((e) => {
            TokoLog_1.logT.log(e);
            resp.status(500).send(e);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
router.post("/baca", Auth_1.checkAuth, (req, resp) => {
    try {
        BarangSql_1.barangSql
            .bacaSemua()
            .then((rows) => {
            resp.status(200).send(rows);
        })
            .catch((e) => {
            TokoLog_1.logT.log(e);
            resp.status(500).send(e);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
router.post("/cari", (req, resp) => {
    try {
        TokoLog_1.logT.log('cari barang, kata kunci ' + req.body.kataKunci);
        Barang_1.barangController.cariBarangJSON(req.body.kataKunci, req.body.hal)
            .then((hasil) => {
            resp.status(200).send(hasil);
        })
            .catch((e) => {
            TokoLog_1.logT.log(e);
            resp.status(500).send(e);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.routerApiBarang = router;
