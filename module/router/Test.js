"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Log_1 = require("../Log");
exports.router = express_1.default.Router();
exports.router.get("/logm/:msg", (req, resp) => {
    try {
        // logM.log(req.params.msg);
        // resp.status(200).send(logM.logs);
        resp.status(200).send(req.params.msg);
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
    Log_1.logW.info(_req.path);
    Log_1.logW.info('404');
    _resp.status(404).send('Halaman Tidak Ditemukan');
});
