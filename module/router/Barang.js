"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BarangSql_1 = require("../entity/BarangSql");
const TokoLog_1 = require("../TokoLog");
const Auth_1 = require("../Auth");
const Util_1 = require("../Util");
const Barang_1 = require("../controller/Barang");
const SessionData_1 = require("../SessionData");
// import { session } from "../SessionData";
exports.router = express_1.default.Router();
exports.router.get("/:id", (req, resp) => {
    try {
        console.log(req.params);
        console.log('router render barang id ' + req.params.id + "|");
        if (!req.params.id) {
            console.log("id is null");
            throw new Error('id null');
        }
        else {
            console.log(req.params.id);
        }
        if (req.params.id == null) {
            console.log("id is null");
            throw new Error('id null');
        }
        else {
            console.log(req.params.id);
        }
        Barang_1.barangController.lihat(req.params.id, "").then((hasil) => {
            resp.status(200).send(hasil);
        }).catch((err) => {
            console.log('render hal barang error');
            TokoLog_1.logT.log(err);
            resp.status(500).send(err.message);
        });
    }
    catch (err) {
        TokoLog_1.logT.log(err);
        resp.status(500).send(err.message);
    }
});
exports.router.post("/hapus/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        BarangSql_1.barangSql.hapus(req.params.id)
            .then(() => {
            resp.status(200).end();
        }).catch((e) => {
            TokoLog_1.logT.log(e);
            resp.status(500).send(e);
        });
    }
    catch (err) {
        resp.status(500).send(err);
    }
});
exports.router.post("/baru", Auth_1.checkAuth, (req, resp) => {
    try {
        let data = {
            nama: req.body.nama,
            deskripsi_panjang: req.body.deskripsi_panjang,
            harga: req.body.harga,
            wa: req.body.wa,
            file_id: req.body.file_id,
            publish: req.body.publish,
            // lapak: req.body.lapak,
            lapak_id: req.body.lapak_id,
            last_view: Util_1.util.buatDate()
        };
        BarangSql_1.barangSql.baru(data)
            .then(() => {
            resp.status(200).end();
        }).catch((e) => {
            TokoLog_1.logT.log(e);
            resp.status(500).send(e);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.router.post("/update/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        if (SessionData_1.session(req).id != req.params.id) {
            resp.status(401).send('');
            return;
        }
        BarangSql_1.barangSql.update({
            nama: req.body.nama,
            deskripsi_panjang: req.body.deskripsi_panjang,
            harga: req.body.harga,
            wa: req.body.wa,
            file_id: req.body.file_id,
            publish: req.body.publish,
            // lapak: req.body.lapak,
            last_view: Util_1.util.buatDate(),
            lapak_id: req.body.lapak_id
        }, req.params.id)
            .then(() => {
            resp.status(200).end();
        }).catch((e) => {
            resp.status(500).send(e);
        });
    }
    catch (error) {
        resp.status(500).send(error);
    }
});
exports.router.post("/baca/lapak/:lapak/publish/:publish", Auth_1.checkAuth, (req, resp) => {
    try {
        BarangSql_1.barangSql.baca({
            lapak_id: req.params.lapak,
            publish: parseInt(req.params.publish)
        })
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
exports.router.post("/baca/", Auth_1.checkAuth, (req, resp) => {
    try {
        let param = req.body;
        BarangSql_1.barangSql.baca({
            id: param.id,
            kataKunci: param.kataKunci,
            lapak_id: param.lapak_id,
            limit: param.limit,
            offset: param.offset,
            orderDateDesc: param.orderDateDesc,
            orderNamaAsc: param.orderNamaAsc,
            publish: param.publish
        })
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
