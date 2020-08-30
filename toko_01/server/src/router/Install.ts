import express from "express";
import { checkAuth } from "./Auth";
import { Connection } from "../db/Connection";
// import { server } from "../App";

export var router: express.Router = express.Router();

var queryTabelFile: string = `CREATE TABLE IF NOT EXISTS FILE ( 
								id INT NOT NULL AUTO_INCREMENT , 
								thumb VARCHAR(255) NOT NULL , 
								gbr VARCHAR(255) NOT NULL , 
								PRIMARY KEY (id)) ENGINE = InnoDB;
							`;

function jalankanQuery(query: string, data: any[] = []): void {
	console.log('jalankan query:');
	console.log(query);

	Connection.connection.query(query, data,
		(_err: any, _rows: any) => {
			if (_err) {
				throw new Error(_err);
			}
			else {
				return;
			}
		});

}

function createTableBarang(): void {
	console.log('buat table barang');
	Connection.connection.query(
		`CREATE TABLE IF NOT EXISTS BARANG(
			id INT NOT NULL AUTO_INCREMENT,
			nama TINYTEXT,
			deskripsi TEXT,
			deskripsi_panjang TEXT,
			file_id INT,
			gbr_url TEXT,
			harga TINYTEXT,
			WA TINYTEXT,
			PRIMARY KEY (id))`,
		(_err: any, _rows: any) => {
			if (_err) {
				throw new Error(_err);
			}
			else {
				return;
			}
		});
}

function createDb(): void {
	console.log('buat database');

	Connection.connection.query(`
		CREATE DATABASE IF NOT EXISTS toko;
		USE toko;
	`, (_err: any, _rows: any) => {
		if (_err) {
			throw new Error(_err);
		}
		else {
			return;
		}
	});
}

router.get("/hapusdb", checkAuth, (req: express.Request, resp: express.Response) => {
	try {
		resp.status(200).send('ok');
	} catch (e) {
		console.log(e);
		resp.status(500).send(e);
	}
});

router.get("/setup", checkAuth, (req: express.Request, resp: express.Response) => {
	try {
		createDb();
		createTableBarang();
		jalankanQuery(queryTabelFile);
		resp.status(200).send('ok');
	} catch (e) {
		console.log(e);
		resp.status(500).send(e);
	}
});

router.get("/backup", checkAuth, (req: express.Request, resp: express.Response) => {
	try {
		//TODO:
		//backup barang, file
		console.log('backup belum selesai');
		resp.status(200).send('');
	} catch (e) {
		console.log(e);
		resp.status(500).send(e);
	}
});

router.get("/shutdown", (req: express.Request, resp: express.Response) => {
	try {
		console.log('shutdown');
		Connection.connection.end((err) => {
			console.log(err.code + '/' + err.message);
		});
		resp.status(200).send('');
		// server.close(() => {
		// 	console.log('server close error');
		// })
		process.kill(process.pid, 'SIGTERM');
	} catch (e) {
		console.log(e);
		resp.status(500).send(e);
	}
});
