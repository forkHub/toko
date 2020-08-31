"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connection_1 = require("../Connection");
const BarangSql_1 = require("../BarangSql");
const Auth_1 = require("./Auth");
exports.router = express_1.default.Router();
exports.router.post("/hapus/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        Connection_1.Connection.connection.query("DELETE FROM BARANG WHERE ID =" + req.params.id, (_err, _rows) => {
            if (_err) {
                console.log(_err);
                resp.status(500).send(_err);
            }
            else {
                // console.log(_rows);
                _rows.nonce = "12345";
                resp.status(200).send(_rows);
            }
        });
    }
    catch (err) {
        resp.status(500).send(err);
    }
});
exports.router.post("/baca/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        let query = `
			SELECT BARANG.*, FILE.thumb_url, FILE.gbr_url 
			FROM BARANG
			LEFT JOIN FILE
			ON BARANG.file_id = FILE.id; 				
			WHERE BARANG.id = ?
		`;
        Connection_1.Connection.connection.query(query, [req.params.id], (_err, _rows) => {
            if (_err) {
                resp.status(500).send(_err);
            }
            else {
                _rows.nonce = "12345";
                // console.log(_rows);
                resp.setHeader("nonce", '12345');
                resp.status(200).send(_rows);
            }
        });
    }
    catch (err) {
        resp.status(500).send(err);
    }
});
exports.router.post("/baca", Auth_1.checkAuth, (req, resp) => {
    BarangSql_1.barangSql.bacaSemua()
        .then((rows) => {
        resp.status(200).send(rows);
    })
        .catch((e) => {
        console.log(e);
        resp.status(500).send(e);
    });
});
exports.router.post("/baru", Auth_1.checkAuth, (req, resp) => {
    try {
        console.log(req.body);
        Connection_1.Connection.connection.query(`INSERT INTO BARANG SET ?
			`, {
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            deskripsi_panjang: req.body.deskripsi_panjang,
            harga: req.body.harga,
            wa: req.body.wa,
            file_id: req.body.file_id,
            publish: req.body.publish
        }, (_err, _rows) => {
            if (_err) {
                resp.status(500).send(_err);
            }
            else {
                resp.status(200).send(_rows);
            }
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
exports.router.post("/update/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        Connection_1.Connection.connection.query(`UPDATE BARANG SET ? WHERE ID = ?`, [
            {
                nama: req.body.nama,
                deskripsi: req.body.deskripsi,
                deskripsi_panjang: req.body.deskripsi_panjang,
                harga: req.body.harga,
                wa: req.body.wa,
                file_id: req.body.file_id,
                publish: req.body.publish
            },
            req.params.id
        ], (_err, _rows) => {
            if (_err) {
                resp.status(500).send(_err);
            }
            else {
                resp.status(200).send(_rows);
            }
        });
    }
    catch (error) {
        resp.status(500).send(error);
    }
});
