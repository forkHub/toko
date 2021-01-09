"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TokoLog_1 = require("../TokoLog");
const BarangSql_1 = require("../entity/BarangSql");
const Renderer_1 = require("../render/Renderer");
const Config_1 = require("../Config");
const SessionData_1 = require("../SessionData");
// import { anggota } from "../entity/Anggota";
// import { table } from "../../Table";
exports.lapakRouter = express_1.default.Router();
var router = exports.lapakRouter;
router.get("/daftar", (_req, resp) => {
    try {
        BarangSql_1.barangSql.query(`
			SELECT id, lapak, deskripsi
			FROM pengguna
			WHERE level = 'user'
			AND setuju = 1
		`, [])
            .then((data) => {
            return Renderer_1.render.halDaftarLapak.render({
                lapakData: data,
                hal: 0,
                jml: 0,
                lapakId: ""
            });
        })
            .then((data) => {
            // session(_req).lapak = '';
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
router.get("/:id/daftar", (req, resp) => {
    try {
        BarangSql_1.barangSql.query(`
			SELECT id, lapak, deskripsi
			FROM pengguna
			WHERE level = 'user'
			AND setuju = 1
		`, [])
            .then((data) => {
            return Renderer_1.render.halDaftarLapak.render({
                lapakData: data,
                hal: 0,
                jml: 0,
                lapakId: req.params.id
            });
        })
            .then((data) => {
            // session(req).lapak = '';
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
router.get("/:id", (_req, resp) => {
    console.log('render lapak ' + _req.params.id);
    try {
        BarangSql_1.barangSql
            .baca({
            lapak_id: _req.params.id,
            publish: 1,
            orderDateDesc: 1
        })
            .then((data) => {
            return Renderer_1.render.halDepan
                .render({
                barangData: data,
                lapakId: _req.params.id,
                hal: parseInt(_req.params.hal),
                jml: parseInt(Config_1.config.getNilai(Config_1.Config.JML_PER_HAL)),
                kataKunci: _req.params.kunci
            });
        })
            .then((data) => {
            SessionData_1.session(_req).lapak = _req.params.id;
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
router.get("/:id/cari/:kunci/hal/:hal", (_req, resp) => {
    try {
        BarangSql_1.barangSql
            .baca({
            lapak_id: _req.params.id,
            kataKunci: decodeURI(_req.params.kunci),
            publish: 1,
            offset: parseInt(_req.params.hal),
            orderDateDesc: 1,
            limit: 25
        })
            .then((data) => {
            return Renderer_1.render.halDepan.render({
                barangData: data,
                lapakId: _req.params.id,
                hal: parseInt(_req.params.hal),
                jml: parseInt(Config_1.config.getNilai(Config_1.Config.JML_PER_HAL)),
                kataKunci: _req.params.kunci
            });
        })
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
router.get("/:id/barang/:barangId", (_req, resp) => {
    try {
        BarangSql_1.barangSql
            .baca({
            lapak_id: _req.params.id,
            publish: 1,
            orderDateDesc: 1,
            id: _req.params.barangId
        })
            .then((data) => {
            return Renderer_1.render.halBarang.render(_req.params.barangId, _req.params.id);
        })
            .then((data) => {
            SessionData_1.session(_req).lapak = _req.params.id;
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
