"use strict";
// import express from "express";
// import { checkAuth } from "../../Auth";
// import { barangController } from "../../controller/Barang";
// import { barangSql } from "../../entity/BarangSql";
// import { logT } from "../../TokoLog";
// var router = express.Router();
// //TODO: dipindah ke router
// router.post("/baca", checkAuth, (req: express.Request, resp: express.Response) => {
// 	try {
// 		barangSql
// 			.bacaSemua()
// 			.then((rows: any) => {
// 				resp.status(200).send(rows);
// 			})
// 			.catch((e) => {
// 				logT.log(e);
// 				resp.status(500).send(e);
// 			});
// 	}
// 	catch (e) {
// 		resp.status(500).send(e);
// 	}
// })
// router.post("/cari", (req: express.Request, resp: express.Response) => {
// 	try {
// 		logT.log('cari barang, kata kunci ' + req.body.kataKunci);
// 		barangController.cariBarangJSON(req.body.kataKunci, req.body.hal)
// 			.then((hasil: string) => {
// 				resp.status(200).send(hasil);
// 			})
// 			.catch((e) => {
// 				logT.log(e);
// 				resp.status(500).send(e);
// 			});
// 	}
// 	catch (e) {
// 		resp.status(500).send(e);
// 	}
// })
// export var routerApiBarang = router;
