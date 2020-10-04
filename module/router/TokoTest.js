"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TokoLog_1 = require("../TokoLog");
exports.router = express_1.default.Router();
exports.router.get("/logm/:msg", (req, resp) => {
    try {
        TokoLog_1.logT.log(req.params.msg);
        resp.status(200).send(req.params.msg);
    }
    catch (e) {
        console.log(e);
        resp.status(200).send(e);
    }
});
exports.router.get("/logAmbil", (req, resp) => {
    try {
        resp.status(200).send(TokoLog_1.logT.ambil());
    }
    catch (e) {
        console.log(e);
        resp.status(200).send(e);
    }
});
exports.router.get("/", (req, resp) => {
    try {
        resp.status(200).send('ok');
    }
    catch (e) {
        console.log(e);
        resp.status(200).send(e);
    }
});
exports.router.use((_req, _resp, _next) => {
    TokoLog_1.logT.log(_req.path);
    TokoLog_1.logT.log('404');
    _resp.status(404).send('Halaman Tidak Ditemukan');
});
