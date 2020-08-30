import express from "express";
import { Connection } from "../db/Connection";
import fs from "fs";
import { checkAuth } from "./Auth";

export var router = express.Router();

router.post("/baca", checkAuth, (req: express.Request, resp: express.Response) => {
	//TODO:
	Connection.connection;
	resp.status(200).send();
});

router.get("/baca/:id", checkAuth, (req: express.Request, resp: express.Response) => {
	//TODO:
	resp.status(200).send();
})

router.post("/baru", checkAuth, (req: express.Request, resp: express.Response) => {
	try {
		let data: string;
		let buf: Buffer;
		let gbrBesarNama: string;
		let gbrKecilNama: string;
		let folderUnggah: string = './public/upload/';
		let folderUrlUnggah: string = '/upload/';

		//simpan gambar besar;
		gbrBesarNama = req.body.gbr_besar_nama;
		data = req.body.gbr_besar.split(',')[1];
		buf = Buffer.from(data, 'base64');
		fs.writeFileSync(folderUnggah + gbrBesarNama, buf);
		console.log('file written ' + folderUnggah + gbrBesarNama);

		//simpan gambar kecil
		gbrKecilNama = req.body.gbr_kecil_nama;
		data = req.body.gbr_kecil.split(',')[1];
		buf = Buffer.from(data, 'base64');
		fs.writeFileSync(folderUnggah + gbrKecilNama, buf);
		console.log('file written ' + folderUnggah + gbrKecilNama);

		// console.log();

		//simpan ke database
		Connection.connection.query(
			`INSERT INTO FILE SET ?
			`,
			{
				thumb: folderUrlUnggah + gbrKecilNama,
				gbr: folderUrlUnggah + gbrBesarNama
			},
			(_err, _rows) => {
				if (_err) {
					console.log(_err);
					resp.status(500).send(_err.message)
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

router.post("/hapus/:id", checkAuth, (req: express.Request, resp: express.Response) => {
	//TODO:
	resp.status(200).send();
});