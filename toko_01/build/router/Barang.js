"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
exports.router = express_1.default.Router();
exports.router.get("/hapus/:id", (req, resp) => {
    //todo:
    //auth middle ware
    //sanitation
    try {
        db_1.Connection.connection.query("DELETE FROM BARANG WHERE ID =" + req.params.id, (_err, _rows) => {
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
exports.router.get("/baca/:id", (req, resp) => {
    try {
        db_1.Connection.connection.query("SELECT * FROM BARANG WHERE ID = ?", [req.params.id], (_err, _rows) => {
            if (_err) {
                resp.status(500).send(_err);
            }
            else {
                _rows.nonce = "12345";
                console.log(_rows);
                resp.setHeader("nonce", '12345');
                resp.status(200).send(_rows);
            }
        });
    }
    catch (err) {
        resp.status(500).send(err);
    }
});
exports.router.get("/baca", (req, resp) => {
    try {
        db_1.Connection.connection.query("SELECT * FROM BARANG", (_err, _rows) => {
            if (_err) {
                resp.status(500).send(_err);
            }
            else {
                _rows.nonce = "12345";
                console.log(_rows);
                resp.setHeader("nonce", '12345');
                resp.status(200).send(_rows);
            }
        });
    }
    catch (err) {
        resp.status(500).send(err);
    }
});
//baru
exports.router.post("/baru", (req, resp) => {
    try {
        console.log(req.body);
        db_1.Connection.connection.query(`INSERT INTO BARANG SET ?
			`, {
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            deskripsi_panjang: req.body.deskripsiPanjang,
            harga: req.body.harga,
            thumb_url: req.body.thumbUrl,
            gbr_url: req.body.gbrUrl,
            wa: req.body.wa
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
exports.router.post("/update/:id", (req, resp) => {
    try {
        db_1.Connection.connection.query(`UPDATE BARANG SET ? WHERE ID = ?`, [
            {
                nama: req.body.nama,
                deskripsi: req.body.deskripsi,
                deskripsi_panjang: req.body.deskripsiPanjang,
                harga: req.body.harga,
                thumb_url: req.body.thumbUrl,
                gbr_url: req.body.gbrUrl,
                wa: req.body.wa
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
