"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connection_1 = require("../Connection");
const fs_1 = __importDefault(require("fs"));
const Auth_1 = require("../Auth");
const TokoLog_1 = require("../TokoLog");
const File_1 = require("../entity/File");
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
        let data;
        let buf;
        let gbrBesarNama;
        let gbrKecilNama;
        let folderUnggah = './public/upload/';
        let folderUrlUnggah = '/upload/';
        //simpan gambar besar;
        gbrBesarNama = req.body.gbr_besar_nama;
        data = req.body.gbr_besar.split(',')[1];
        buf = Buffer.from(data, 'base64');
        fs_1.default.writeFileSync(folderUnggah + gbrBesarNama, buf);
        TokoLog_1.logT.log('file written ' + folderUnggah + gbrBesarNama);
        //simpan gambar kecil
        gbrKecilNama = req.body.gbr_kecil_nama;
        data = req.body.gbr_kecil.split(',')[1];
        buf = Buffer.from(data, 'base64');
        fs_1.default.writeFileSync(folderUnggah + gbrKecilNama, buf);
        TokoLog_1.logT.log('file written ' + folderUnggah + gbrKecilNama);
        // log.info();
        //simpan ke database
        Connection_1.Connection.pool.query(`INSERT INTO FILE SET ?
			`, {
            thumb: folderUrlUnggah + gbrKecilNama,
            gbr: folderUrlUnggah + gbrBesarNama
        }, (_err, _rows) => {
            if (_err) {
                TokoLog_1.logT.log(_err.sqlMessage);
                resp.status(500).send(_err.message);
            }
            else {
                TokoLog_1.logT.log('ok');
                resp.status(200).send({
                    gbr_url: folderUrlUnggah + gbrKecilNama,
                    baris_info: _rows
                });
            }
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
        File_1.file.bacaDiskKosong().then((item) => {
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
        File_1.file.hapus(req.params.id).then(() => {
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
