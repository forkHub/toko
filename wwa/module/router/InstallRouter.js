"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/admin/AuthController");
const Connection_1 = require("../Connection");
// import { logT } from "../TokoLog";
// import { server } from "../App";
exports.router = express_1.default.Router();
var queryTabelFile = `CREATE TABLE IF NOT EXISTS FILE ( 
								id INT NOT NULL AUTO_INCREMENT , 
								thumb VARCHAR(255) NOT NULL , 
								gbr VARCHAR(255) NOT NULL , 
								PRIMARY KEY (id)) ENGINE = InnoDB;
							`;
function jalankanQuery(query, data = []) {
    console.log('jalankan query:');
    console.log(query);
    Connection_1.Connection.pool.query(query, data, (_err, _rows) => {
        if (_err) {
            throw new Error(_err);
        }
        else {
            return;
        }
    });
}
function createTableBarang() {
    console.log('buat table barang');
    Connection_1.Connection.pool.query(`CREATE TABLE IF NOT EXISTS BARANG(
			id INT NOT NULL AUTO_INCREMENT,
			nama TINYTEXT,
			deskripsi TEXT,
			deskripsi_panjang TEXT,
			file_id INT,
			gbr_url TEXT,
			harga TINYTEXT,
			WA TINYTEXT,
			PRIMARY KEY (id))`, (_err, _rows) => {
        if (_err) {
            throw new Error(_err);
        }
        else {
            return;
        }
    });
}
function createDb() {
    console.log('buat database');
    Connection_1.Connection.pool.query(`
		CREATE DATABASE IF NOT EXISTS toko;
		USE toko;
	`, (_err, _rows) => {
        if (_err) {
            throw new Error(_err);
        }
        else {
            return;
        }
    });
}
exports.router.get("/hapusdb", AuthController_1.checkAuth, (_req, resp) => {
    try {
        resp.status(200).send('ok');
    }
    catch (e) {
        console.log(e);
        resp.status(500).send(e);
    }
});
exports.router.get("/setup", AuthController_1.checkAuth, (_req, resp) => {
    try {
        createDb();
        createTableBarang();
        jalankanQuery(queryTabelFile);
        resp.status(200).send('ok');
    }
    catch (e) {
        console.log(e);
        resp.status(500).send(e);
    }
});
exports.router.get("/shutdown", (_req, resp) => {
    try {
        console.log('shutdown');
        Connection_1.Connection.pool.end((err) => {
            console.log(err.code + '/' + err.message);
        });
        resp.status(200).send('');
        process.kill(process.pid, 'SIGTERM');
    }
    catch (e) {
        console.log(e);
        resp.status(500).send(e);
    }
});
