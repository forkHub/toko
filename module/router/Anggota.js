"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Anggota_1 = require("../Anggota");
exports.router = express_1.default.Router();
exports.router.post("/baca", (req, resp) => {
    try {
        Anggota_1.anggota.baca().then((hasil) => {
            resp.status(200).send(hasil);
        }).catch((e) => {
            resp.status(500).send(e);
        });
    }
    catch (e) {
        console.log(e);
        resp.status(200).send(e);
    }
});
exports.router.post("/hapus", (req, resp) => {
    try {
        resp.status(200).send(req.params.msg);
    }
    catch (e) {
        console.log(e);
        resp.status(200).send(e);
    }
});
exports.router.post("/baru", (req, resp) => {
    try {
        resp.status(200).send(req.params.msg);
    }
    catch (e) {
        console.log(e);
        resp.status(200).send(e);
    }
});
exports.router.post("/update", (req, resp) => {
    try {
        resp.status(200).send(req.params.msg);
    }
    catch (e) {
        console.log(e);
        resp.status(200).send(e);
    }
});
