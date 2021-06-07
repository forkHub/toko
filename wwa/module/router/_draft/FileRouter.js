"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../../controller/admin/AuthController");
const File_1 = require("../../entity/draf/File");
const FileController_1 = require("../../entity/draf/FileController");
exports.router = express_1.default.Router();
exports.router.post("/baru", AuthController_1.checkAuth, (req, resp) => {
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
        console.error;
        resp.status(500).send(JSON.stringify(e));
    }
});
/**
 * baca file db yang tidak punya pasangan di barang
 */
exports.router.post('/baca/file/kosong', AuthController_1.checkAuth, (_req, _resp) => {
    try {
    }
    catch (e) {
    }
});
/**
 * baca file di disk yang gak punya referensi db
 */
exports.router.post("/baca/disk/kosong", AuthController_1.checkAuth, (_req, resp) => {
    try {
        File_1.fileSql.bacaDiskKosong().then((_item) => {
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
/**
 * hapus file di db
 */
exports.router.post("/hapus/:id", AuthController_1.checkAuth, (req, resp) => {
    try {
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
