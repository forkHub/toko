"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Config_1 = require("../Config");
const AuthController_1 = require("../controller/admin/AuthController");
const Renderer_1 = require("../render/Renderer");
const SessionData_1 = require("../SessionData");
exports.authRouter = express_1.default.Router();
exports.authRouter.get("/login", (req, resp) => {
    try {
        resp.status(200).send(Renderer_1.renderer.auth.login.render());
    }
    catch (e) {
        req.session = null;
        console.error;
        resp.status(502).send(e.message);
    }
});
exports.authRouter.get("/logout", (req, resp) => {
    try {
        req.session = null;
        resp.redirect('/auth/login');
    }
    catch (e) {
        console.error(e);
        resp.status(500).send(e.message);
    }
});
exports.authRouter.get("/lupa", (_req, resp) => {
    try {
        resp.status(200).send(Renderer_1.renderer.auth.lupa.render());
    }
    catch (e) {
        console.error(e);
        resp.status(500).send(e.message);
    }
});
exports.authRouter.get("/daftar", (_req, resp) => {
    try {
        resp.status(200).send(Renderer_1.renderer.auth.daftar.render());
    }
    catch (e) {
        console.error(e);
        resp.status(500).send(e.message);
    }
});
exports.authRouter.get("/ganti", AuthController_1.checkAuth, (_req, resp) => {
    try {
        resp.status(200).send(Renderer_1.renderer.auth.ganti.render());
    }
    catch (e) {
        console.error(e);
        resp.status(500).send(e.message);
    }
});
exports.authRouter.post("/login", (req, resp) => {
    try {
        AuthController_1.authController.login(req.body.user_id, req.body.password).then((h) => {
            if (h) {
                SessionData_1.session(req).level = h.level;
                SessionData_1.session(req).statusLogin = true;
                SessionData_1.session(req).lapak = h.lapak;
                SessionData_1.session(req).id = h.id;
                SessionData_1.session(req).user_id = h.user_id;
                resp.status(200).send(h);
            }
            else {
                req.session = null;
                resp.status(402).send('username/password salah');
            }
        }).catch((e) => {
            req.session = null;
            // logT.log(e);
            console.error;
            resp.status(501).send(e.message);
        });
    }
    catch (e) {
        req.session = null;
        // logT.log(e);
        console.error;
        resp.status(502).send(e.message);
    }
});
exports.authRouter.post("/status", (req, resp) => {
    try {
        let status = {
            id: (SessionData_1.session(req).id),
            level: SessionData_1.session(req).level,
            lapak: SessionData_1.session(req).lapak,
            user_id: SessionData_1.session(req).user_id,
            password: ''
        };
        if (SessionData_1.session(req).statusLogin) {
            resp.status(200).send(status);
        }
        else {
            req.session = null;
            resp.status(401).send('belum login');
        }
    }
    catch (e) {
        // logT.log(e);
        console.error;
        resp.status(500).send(e.message);
    }
});
exports.authRouter.post("/lupa", AuthController_1.checkAuth, AuthController_1.checkPemilikPost, (req, resp) => {
    try {
        AuthController_1.authController.lupa(req.body.email).then(() => {
            resp.status(200).send('');
        }).catch((err) => {
            console.error(err);
            resp.status(500).send(err.message);
        });
    }
    catch (e) {
        console.error(e);
        resp.status(500).send(e.message);
    }
});
exports.authRouter.post("/ganti", AuthController_1.checkAuth, AuthController_1.checkPemilikPost, (req, resp) => {
    try {
        AuthController_1.authController.ganti(req.body.id, req.body.password1, req.body.password2).then(() => {
            resp.status(200).send('');
        }).catch((err) => {
            console.error(err);
            resp.status(500).send(err.message);
        });
    }
    catch (e) {
        console.error(e);
        resp.status(500).send(e.message);
    }
});
exports.authRouter.post("/daftar", (req, resp) => {
    try {
        let data = {
            user_id: req.body.user_id,
            alamat: req.body.alamat,
            deskripsi: req.body.deskripsi,
            email: req.body.email,
            lapak: req.body.lapak,
            level: 'user',
            password: req.body.password,
            setuju: 1,
            toko_id: Config_1.config.tokoId,
            wa: req.body.wa
        };
        AuthController_1.authController.daftar(data).then(() => {
            resp.status(200).send('');
        }).catch((err) => {
            console.log(data);
            console.error(err);
            resp.status(500).send(err.message);
        });
    }
    catch (e) {
        console.error(e);
        resp.status(500).send(e.message);
    }
});
