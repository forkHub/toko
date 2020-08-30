import express from "express";
import { Connection } from "../db/Connection";
import { barangSql } from "../BarangSql";
import { checkAuth } from "./Auth";

export var router = express.Router();

router.post("/hapus/:id", checkAuth, (req: express.Request, resp: express.Response) => {
	try {
		Connection.connection.query(
			"DELETE FROM BARANG WHERE ID =" + req.params.id,
			(_err: any, _rows: { nonce: string; }) => {
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

router.post("/baca/:id", checkAuth, (req: express.Request, resp: express.Response) => {
	try {
		let query: string = `
			SELECT BARANG.*, FILE.thumb_url, FILE.gbr_url 
			FROM BARANG
			LEFT JOIN FILE
			ON BARANG.file_id = FILE.id; 				
			WHERE BARANG.id = ?
		`;

		Connection.connection.query(
			query, [req.params.id], (_err: any, _rows: { nonce: string; }) => {
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
	} catch (err) {
		resp.status(500).send(err);
	}
})

router.post("/baca", checkAuth, (req: express.Request, resp: express.Response) => {
	barangSql.bacaSemua()
		.then((rows: any) => {
			resp.status(200).send(rows);
		})
		.catch((e: any) => {
			console.log(e);
			resp.status(500).send(e);
		});
})

router.post("/baru", checkAuth, (req: express.Request, resp: express.Response) => {
	try {
		console.log(req.body);
		Connection.connection.query(
			`INSERT INTO BARANG SET ?
			`,
			{
				nama: req.body.nama,
				deskripsi: req.body.deskripsi,
				deskripsi_panjang: req.body.deskripsi_panjang,
				harga: req.body.harga,
				wa: req.body.wa,
				file_id: req.body.file_id,
				publish: req.body.publish
			},
			(_err: any, _rows: any) => {
				if (_err) {
					resp.status(500).send(_err)
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

router.post("/update/:id", checkAuth, (req: express.Request, resp: express.Response) => {
	try {
		Connection.connection.query(
			`UPDATE BARANG SET ? WHERE ID = ?`,
			[
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
			],
			(_err: any, _rows: any) => {
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

