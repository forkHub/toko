"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../Auth");
const TokoLog_1 = require("../TokoLog");
exports.router = express_1.default.Router();
exports.router.post("/login", (req, resp) => {
    try {
        TokoLog_1.logT.log('login');
        Auth_1.auth.login(req.body.user_id, req.body.password).then((h) => {
            if (h) {
                Auth_1.auth.session(req).level = h.level;
                Auth_1.auth.session(req).statusLogin = true;
                resp.status(200).send(h);
            }
            else {
                req.session = null;
                resp.status(401).send('username/password salah');
            }
        }).catch((e) => {
            req.session = null;
            TokoLog_1.logT.log(e);
            resp.status(501).send(e.message);
        });
    }
    catch (e) {
        req.session = null;
        TokoLog_1.logT.log(e);
        resp.status(502).send(e.message);
    }
});
exports.router.post("/status", (req, resp) => {
    try {
        if (Auth_1.auth.session(req).statusLogin) {
            resp.status(200).send('ok');
        }
        else {
            req.session = null;
            resp.status(401).send('belum login');
        }
    }
    catch (e) {
        TokoLog_1.logT.log(e);
        resp.status(500).send(e.message);
    }
});
exports.router.post("/logout", (req, resp) => {
    try {
        req.session = null;
        resp.status(200).send('ok');
    }
    catch (e) {
        TokoLog_1.logT.log(e);
        resp.status(500).send(e.message);
    }
});
