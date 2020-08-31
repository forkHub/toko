"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blueimp_md5_1 = __importDefault(require("blueimp-md5"));
const password = 'Auni2020';
const md5pass = blueimp_md5_1.default(password);
function checkAuth(req, resp, next) {
    if (!req.session.statusLogin) {
        resp.status(401).send('belum login');
    }
    else if (false == req.session.statusLogin) {
        resp.status(401).send('belum login');
    }
    else {
        next();
    }
}
exports.checkAuth = checkAuth;
exports.router = express_1.default.Router();
exports.router.post("/login", (req, resp) => {
    try {
        if (("auni" == req.body.user_id) && (md5pass == req.body.password)) {
            req.session.statusLogin = true;
            resp.status(200).send('ok');
        }
        else {
            req.session = null;
            resp.status(401).send('gagal');
            console.log('login failed');
            console.log("user id: " + req.body.user_id);
            console.log("password: " + req.body.password);
            console.log("password server: " + md5pass);
        }
        ;
    }
    catch (e) {
        resp.status(500).send(e.message);
    }
});
exports.router.post("/logout", (req, resp) => {
    try {
        req.session = null;
        resp.status(200).send('ok');
    }
    catch (e) {
        resp.status(500).send(e.message);
    }
});
