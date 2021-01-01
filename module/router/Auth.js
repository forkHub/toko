"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { stat } from "fs";
const Auth_1 = require("../Auth");
const SessionData_1 = require("../SessionData");
const TokoLog_1 = require("../TokoLog");
exports.router = express_1.default.Router();
exports.router.post("/login", (req, resp) => {
    try {
        TokoLog_1.logT.log('login');
        Auth_1.auth.login(req.body.user_id, req.body.password).then((h) => {
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
        let status = {
            id: SessionData_1.session(req).id,
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
        TokoLog_1.logT.log(e);
        resp.status(500).send(e.message);
    }
});
exports.router.get("/logout", (req, resp) => {
    try {
        TokoLog_1.logT.log('logout');
        req.session = null;
        resp.redirect('/');
    }
    catch (e) {
        TokoLog_1.logT.log(e);
        resp.status(500).send(e.message);
    }
});
