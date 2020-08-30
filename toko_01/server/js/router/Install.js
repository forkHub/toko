"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("./Auth");
const Connection_1 = require("../db/Connection");
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
    Connection_1.Connection.connection.query(query, data, (_err, _rows) => {
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
    Connection_1.Connection.connection.query(`CREATE TABLE IF NOT EXISTS BARANG(
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
    Connection_1.Connection.connection.query(`
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
exports.router.get("/hapusdb", Auth_1.checkAuth, (req, resp) => {
    try {
        resp.status(200).send('ok');
    }
    catch (e) {
        console.log(e);
        resp.status(500).send(e);
    }
});
exports.router.get("/setup", Auth_1.checkAuth, (req, resp) => {
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
exports.router.get("/backup", Auth_1.checkAuth, (req, resp) => {
    try {
        //TODO:
        //backup barang, file
        console.log('backup belum selesai');
        resp.status(200).send('');
    }
    catch (e) {
        console.log(e);
        resp.status(500).send(e);
    }
});
exports.router.get("/shutdown", (req, resp) => {
    try {
        console.log('shutdown');
        Connection_1.Connection.connection.end((err) => {
            console.log(err.code + '/' + err.message);
        });
        resp.status(200).send('');
        // server.close(() => {
        // 	console.log('server close error');
        // })
        process.kill(process.pid, 'SIGTERM');
    }
    catch (e) {
        console.log(e);
        resp.status(500).send(e);
    }
});
