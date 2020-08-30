"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const Barang_1 = require("./router/Barang");
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
const port = 3009;
db_1.Connection.connect();
app.use(express_1.default.static(__dirname + "\\public"));
app.use(express_1.default.json());
app.use("/barang", Barang_1.router);
app.use("/toko", (_req, _resp) => {
    fs_1.default.readFile("view/index.html", (err, content) => {
        if (err) {
            _resp.status(500).send(err);
        }
        else {
            _resp.status(200).send(content.toString());
        }
    });
});
app.use((_req, _resp, _next) => {
    _resp.status(404).send('Halaman Tidak Ditemukan');
});
app.listen(port, () => {
    console.log("app started at port " + port);
});
