"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BarangSql_1 = require("../BarangSql");
const TokoLog_1 = require("../TokoLog");
const Auth_1 = require("../Auth");
const Renderer_1 = require("../Renderer");
const Util_1 = require("../Util");
exports.router = express_1.default.Router();
exports.router.post("/hapus/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        BarangSql_1.barangSql.hapus(req.params.id)
            // .then(() => {
            // 	return barangSql.bacaPublish()
            // })
            // .then((data: any[]) => {
            // 	return toko.render(data);
            // })
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
exports.router.post("/baca/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        BarangSql_1.barangSql.bacaId(req.params.id).then().catch();
    }
    catch (err) {
        resp.status(500).send(err);
    }
});
exports.router.post("/baca/lapak/:lapak", Auth_1.checkAuth, (req, resp) => {
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
exports.router.post("/baca", Auth_1.checkAuth, (req, resp) => {
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
exports.router.post("/baru", Auth_1.checkAuth, (req, resp) => {
    try {
        let data = {
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            deskripsi_panjang: req.body.deskripsi_panjang,
            harga: req.body.harga,
            wa: req.body.wa,
            file_id: req.body.file_id,
            publish: req.body.publish,
            lapak: req.body.lapak
        };
        BarangSql_1.barangSql.baru(data)
            // .then(() => {
            // 	return barangSql.bacaPublish();
            // })
            // .then((data: any[]) => {
            // 	return toko.render(data);
            // })
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
        BarangSql_1.barangSql.update({
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            deskripsi_panjang: req.body.deskripsi_panjang,
            harga: req.body.harga,
            wa: req.body.wa,
            file_id: req.body.file_id,
            publish: req.body.publish,
            lapak: req.body.lapak,
            last_view: Util_1.util.buatDate()
        }, req.params.id)
            // .then(() => {
            // 	return barangSql.bacaPublish();
            // })
            // .then((data: any[]) => {
            // 	return toko.render(data)
            // })
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
exports.router.get("/", (req, resp) => {
    try {
        TokoLog_1.logT.log('barang ok');
        resp.status(200).send('barang ok');
    }
    catch (err) {
        TokoLog_1.logT.log('barang error');
        resp.status(500).send(err);
    }
});
exports.router.get("/lapak/:lapak/:id", (req, resp) => {
    try {
        console.log('render lapak ');
        Renderer_1.render.renderHalBarang(req.params.id, req.params.lapak)
            .then((hasil) => {
            resp.status(200).send(hasil);
        }).catch((err) => {
            TokoLog_1.logT.log(err);
            resp.status(500).send('Error');
        });
    }
    catch (e) {
        TokoLog_1.logT.log(e);
        resp.status(500).send("Error");
    }
});
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
        Renderer_1.render.renderHalBarang(req.params.id, "")
            .then((hasil) => {
            resp.status(200).send(hasil);
        }).catch((err) => {
            console.log('render hal barang error');
            TokoLog_1.logT.log(err);
            resp.status(500).send('Error');
        });
    }
    catch (err) {
        TokoLog_1.logT.log(err);
        resp.status(500).send('Error');
    }
});
