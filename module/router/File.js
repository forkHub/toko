"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connection_1 = require("../Connection");
// import fs from "fs";
const Auth_1 = require("../Auth");
const TokoLog_1 = require("../TokoLog");
const File_1 = require("../entity/File");
const FileController_1 = require("../controller/FileController");
exports.router = express_1.default.Router();
exports.router.post("/baca", Auth_1.checkAuth, (req, resp) => {
    try {
        //TODO:
        Connection_1.Connection.pool;
        resp.status(200).send('');
    }
    catch (err) {
        TokoLog_1.logT.log('error');
        resp.status(500).send(err);
    }
});
exports.router.get("/baca/:id", Auth_1.checkAuth, (req, resp) => {
    //TODO: file admin
    resp.status(200).send();
});
exports.router.post("/baru", Auth_1.checkAuth, (req, resp) => {
    try {
        FileController_1.fileController.baru(req.body.gbr_besar_nama, req.body.gbr_kecil_nama, req.body.gbr_besar.split(',')[1], req.body.gbr_kecil.split(',')[1])
            .then((h) => {
            console.log(h);
            resp.status(200).send(h);
        })
            .catch((e) => {
            console.error;
            console.log(e);
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        TokoLog_1.logT.log(e);
        resp.status(500).send(JSON.stringify(e));
    }
});
exports.router.post('/baca/file/kosong', Auth_1.checkAuth, (req, resp) => {
    try {
    }
    catch (e) {
    }
});
exports.router.post("/baca/disk/kosong", Auth_1.checkAuth, (req, resp) => {
    try {
        File_1.fileSql.bacaDiskKosong().then((item) => {
            resp.status(200).send('');
        }).catch((e) => {
            console.log(e);
            resp.status(500).send(e);
        });
    }
    catch (e) {
        console.log(e);
        resp.status(500).send(e);
    }
});
exports.router.post("/hapus/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        console.log('file hapus ' + req.params.id);
        File_1.fileSql.hapus(req.params.id).then(() => {
            resp.status(200).send('');
        }).catch((e) => {
            console.log(e);
            resp.status(500).send(e);
        });
    }
    catch (e) {
        console.log(e);
        resp.status(500).send(e);
    }
});
