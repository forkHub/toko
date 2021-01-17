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
const Config_1 = require("../Config");
const Renderer_1 = require("../render/Renderer");
exports.router = express_1.default.Router();
exports.router.get("/:id", (_req, resp) => {
    try {
        Renderer_1.render.halBarang.render(_req.params.id, '')
            .then((data) => {
            // session(_req).lapak = _req.params.id;
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
        console.log('barang baru');
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
exports.router.post("/clone/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        let data = {
            id: req.params.id
        };
        BarangSql_1.barangSql.baca(data).then((h) => {
            if (h.length > 0) {
                let item = h[0];
                return BarangSql_1.barangSql.baru({
                    deskripsi_panjang: item.deskripsi_panjang,
                    harga: item.harga,
                    lapak_id: item.lapak_id,
                    nama: item.nama,
                    publish: item.publish,
                    wa: item.wa
                });
            }
            else {
                return Promise.resolve();
            }
        }).then(() => {
            resp.status(200).send('');
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.router.post("/update/lastview/:id", (req, resp) => {
    try {
        TokoLog_1.logT.log('update terakhir dilihat, id ' + req.params.id);
        BarangSql_1.barangSql.updateLastViewDate(req.params.id)
            .then(() => {
            resp.status(200).end();
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (error) {
        resp.status(500).send(error.message);
    }
});
exports.router.post("/update/:id", Auth_1.checkAuth, (req, resp) => {
    try {
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
exports.router.post("/terkait", (_req, resp) => {
    try {
        if (Config_1.config.getNilai(Config_1.Config.TERKAIT) == '0') {
            resp.status(200).send([]);
            return;
        }
        BarangSql_1.barangSql.query(BarangSql_1.barangSql.bacaBarangTerkait, [])
            .then((hasil) => {
            resp.status(200).send(hasil);
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        resp.status(500).send(e.message);
    }
});
