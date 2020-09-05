"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blueimp_md5_1 = __importDefault(require("blueimp-md5"));
const Auth_1 = require("../Auth");
// import { Connection } from "../Connection";
const user = 'auni';
const password = 'Auni2020';
const md5pass = blueimp_md5_1.default(password); //d3a99a8e64a10840d1f4747c5f85866e
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
        console.log('login');
        Auth_1.auth.login(req.body.user_id, req.body.password).then((h) => {
            if (h) {
                req.session.statusLogin = true;
                resp.status(200).send(h);
            }
            else {
                req.session = null;
                resp.status(401).send('username/password salah');
            }
        }).catch((e) => {
            req.session = null;
            console.log(e);
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        req.session = null;
        console.log(e);
        resp.status(500).send(e.message);
    }
});
exports.router.post("/login2", (req, resp) => {
    try {
        if ((user == req.body.user_id) && (md5pass == req.body.password)) {
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
