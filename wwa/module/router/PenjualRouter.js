"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/admin/AuthController");
const Util_1 = require("../Util");
const Renderer_1 = require("../render/Renderer");
const PenjualSql_1 = require("../entity/admin/PenjualSql");
const PenjualController_1 = require("../controller/admin/PenjualController");
const SessionData_1 = require("../SessionData");
const Config_1 = require("../Config");
exports.penjualRouter = express_1.default.Router();
exports.penjualRouter.get("/beranda/:id", AuthController_1.checkAuth, AuthController_1.checkPemilikGet, (req, resp) => {
    try {
        PenjualSql_1.penjualSql.barangDaftar(req.params.id).then((item) => {
            resp.status(200).send(Renderer_1.renderer.penjual.beranda.render(item));
        }).catch((e) => {
            console.error(e);
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.penjualRouter.get("/barang/baru/:id", AuthController_1.checkAuth, (_req, resp) => {
    try {
        let hal = Renderer_1.renderer.penjual.barangBaru.render(_req.params.id);
        resp.status(200).send(hal);
    }
    catch (e) {
        resp.status(500).send(e.message);
    }
});
exports.penjualRouter.get("/barang/edit/:id", AuthController_1.checkAuth, (_req, resp) => {
    try {
        PenjualController_1.penjualController.barangRenderEditPage(parseInt(_req.params.id), SessionData_1.session(_req).id)
            .then((str) => {
            resp.status(200).send(str);
        }).catch((e) => {
            Util_1.util.respError(resp, e);
        });
    }
    catch (e) {
        Util_1.util.respError(resp, e);
    }
});
exports.penjualRouter.get("/profile/:id", AuthController_1.checkAuth, AuthController_1.checkPemilikGet, (_req, resp) => {
    try {
        PenjualSql_1.penjualSql.profileBaca(_req.params.id).then((pengguna) => {
            let hal = Renderer_1.renderer.penjual.profile.render(pengguna[0]);
            resp.status(200).send(hal);
        }).catch((err) => {
            resp.status(200).send(err.message);
        });
    }
    catch (e) {
        resp.status(500).send(e.message);
    }
});
exports.penjualRouter.get("/profile/edit/:id", AuthController_1.checkAuth, AuthController_1.checkPemilikGet, (_req, resp) => {
    try {
        PenjualSql_1.penjualSql.profileBaca(_req.params.id).then((pengguna) => {
            let hal = Renderer_1.renderer.penjual.editProfile.render(pengguna[0]);
            resp.status(200).send(hal);
        }).catch((err) => {
            resp.status(200).send(err.message);
        });
    }
    catch (e) {
        console.error(e);
        resp.status(500).send(e.message);
    }
});
//POST
exports.penjualRouter.post("/barang/hapus", AuthController_1.checkAuth, AuthController_1.checkPemilikPost, (req, resp) => {
    try {
        PenjualController_1.penjualController.barangHapus(req.body.id, req.body.idFile, req.body.namaFileBesar, req.body.namaFileKecil)
            .then(() => {
            resp.status(200).end();
        }).catch((e) => {
            console.error(e);
            resp.status(500).send(e.message);
        });
    }
    catch (err) {
        console.error(err);
        resp.status(500).send(err.message);
    }
});
exports.penjualRouter.post("/barang/baru", AuthController_1.checkAuth, AuthController_1.checkPemilikPost, (req, resp) => {
    try {
        //TODO: sanitize, validate
        PenjualController_1.penjualController.barangBaru({
            nama: req.body.nama,
            deskripsi_panjang: req.body.deskripsi_panjang,
            deskripsi: req.body.deskripsi,
            harga: req.body.harga,
            wa: req.body.wa,
            file_id: req.body.file_id,
            publish: req.body.publish,
            lapak_id: req.body.lapak_id,
            last_view: Util_1.util.buatDate(),
            toko_id: Config_1.config.tokoId
        }).then((id) => {
            resp.status(200).send(id + "");
        }).catch((err) => {
            console.error;
            resp.status(500).send(err.message);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.penjualRouter.post("/barang/baru2", AuthController_1.checkAuth, AuthController_1.checkPemilikPost, (req, resp) => {
    try {
        //TDO: sanitize, validate
        PenjualController_1.penjualController.barangBaru({
            nama: req.body.nama,
            deskripsi_panjang: req.body.deskripsi_panjang,
            deskripsi: req.body.deskripsi,
            harga: req.body.harga,
            wa: req.body.wa,
            file_id: req.body.file_id,
            publish: req.body.publish,
            lapak_id: req.body.lapak_id,
            last_view: Util_1.util.buatDate()
        }).then((id) => {
            resp.status(200).send(id + "");
        }).catch((err) => {
            console.error;
            resp.status(500).send(err.message);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.penjualRouter.post("/barang/edit", AuthController_1.checkAuth, (_req, resp) => {
    try {
        //toko_id, 
        //lapak_id pakai yang ada, tidak diedit
        PenjualController_1.penjualController.barangEdit({
            id: _req.body.id,
            deskripsi: _req.body.deskripsi,
            deskripsi_panjang: _req.body.deskripsi_panjang,
            harga: _req.body.harga,
            last_view: Util_1.util.buatDate(),
            nama: _req.body.nama,
            wa: _req.body.wa,
            file_id: _req.body.file_id,
            publish: _req.body.publish
        }, SessionData_1.session(_req).id).then(() => {
            resp.status(200).send('');
        }).catch((e) => {
            Util_1.util.respError(resp, e);
        });
    }
    catch (e) {
        Util_1.util.respError(resp, e);
    }
});
exports.penjualRouter.post("/upload", AuthController_1.checkAuth, AuthController_1.checkPemilikPost, (_req, resp) => {
    try {
        PenjualController_1.penjualController.gambarUpload(_req.body.gbr_besar_nama, _req.body.gbr_kecil_nama, _req.body.gbr_besar.split(',')[1], _req.body.gbr_kecil.split(',')[1])
            .then((h) => {
            resp.status(200).send(h);
        })
            .catch((e) => {
            console.error(e);
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        console.error(e);
        resp.status(500).send(e);
    }
});
exports.penjualRouter.post("/profile/edit", AuthController_1.checkAuth, AuthController_1.checkPemilikPost, (_req, resp) => {
    try {
        //TODO: sanitize, validate
        PenjualController_1.penjualController.profileEdit({
            alamat: _req.body.alamat,
            deskripsi: _req.body.deskripsi,
            email: _req.body.email,
            lapak: _req.body.lapak,
            wa: _req.body.wa,
            id: _req.body.id
        }).then(() => {
            resp.status(200).send('');
        }).catch((e) => {
            console.error(e);
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        console.error(e);
        resp.status(500).send(e.message);
    }
});
