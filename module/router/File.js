"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connection_1 = require("../Connection");
const fs_1 = __importDefault(require("fs"));
const Auth_1 = require("./Auth");
exports.router = express_1.default.Router();
exports.router.post("/baca", Auth_1.checkAuth, (req, resp) => {
    //TODO:
    Connection_1.Connection.pool;
    resp.status(200).send();
});
exports.router.get("/baca/:id", Auth_1.checkAuth, (req, resp) => {
    //TODO:
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
        console.log('file written ' + folderUnggah + gbrBesarNama);
        //simpan gambar kecil
        gbrKecilNama = req.body.gbr_kecil_nama;
        data = req.body.gbr_kecil.split(',')[1];
        buf = Buffer.from(data, 'base64');
        fs_1.default.writeFileSync(folderUnggah + gbrKecilNama, buf);
        console.log('file written ' + folderUnggah + gbrKecilNama);
        // console.log();
        //simpan ke database
        Connection_1.Connection.connection.query(`INSERT INTO FILE SET ?
			`, {
            thumb: folderUrlUnggah + gbrKecilNama,
            gbr: folderUrlUnggah + gbrBesarNama
        }, (_err, _rows) => {
            if (_err) {
                console.log(_err);
                resp.status(500).send(_err.message);
            }
            else {
                console.log('ok');
                resp.status(200).send({
                    gbr_url: folderUrlUnggah + gbrKecilNama,
                    baris_info: _rows
                });
            }
        });
    }
    catch (e) {
        console.log(e);
        resp.status(500).send(JSON.stringify(e));
    }
});
exports.router.post("/hapus/:id", Auth_1.checkAuth, (req, resp) => {
    //TODO:
    resp.status(200).send();
});
