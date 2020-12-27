"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TokoLog_1 = require("../TokoLog");
const BarangSql_1 = require("../entity/BarangSql");
const Renderer_1 = require("../render/Renderer");
const Config_1 = require("../Config");
exports.lapakRouter = express_1.default.Router();
var router = exports.lapakRouter;
router.get("/:id", (_req, resp) => {
    console.log('render lapak ' + _req.params.id);
    try {
        BarangSql_1.barangSql
            .baca({
            lapak_id: _req.params.id,
            publish: 1,
            orderDateDesc: 1
        })
            .then((data) => {
            return Renderer_1.render.halDepan
                .render({
                barangData: data,
                lapak: _req.params.id,
                hal: parseInt(_req.params.hal),
                jml: Config_1.config.jmlPerHal,
                kataKunci: _req.params.kunci
            });
        })
            .then((data) => {
            resp.status(200).send(data);
        })
            .catch((err) => {
            TokoLog_1.logT.log(err);
            resp.status(500).send('Error');
        });
    }
    catch (err) {
        TokoLog_1.logT.log(err);
        resp.status(500).send('Error');
    }
});
router.get("/:id/cari/:kunci/hal/:hal", (_req, resp) => {
    try {
        BarangSql_1.barangSql
            .baca({
            lapak_id: _req.params.id,
            kataKunci: decodeURI(_req.params.kunci),
            publish: 1,
            offset: _req.params.hal,
            orderDateDesc: 1
        })
            .then((data) => {
            return Renderer_1.render.halDepan.render({
                barangData: data,
                lapak: _req.params.id,
                hal: parseInt(_req.params.hal),
                jml: Config_1.config.jmlPerHal,
                kataKunci: _req.params.kunci
            });
        })
            .then((data) => {
            resp.status(200).send(data);
        })
            .catch((err) => {
            TokoLog_1.logT.log(err);
            resp.status(500).send('Error');
        });
    }
    catch (err) {
        TokoLog_1.logT.log(err);
        resp.status(500).send('Error');
    }
});
// lapakRouter.get("/:id", (_req: express.Request, resp: express.Response) => {
// 	try {
// 		barangSql.bacaPublish(0, 25, _req.params.id)
// 			.then((data: any[]) => {
// 				return render.halDepan.render({
// 					barangData: data,
// 					lapak: _req.params.id,
// 					hal: 0,
// 					jml: 0,
// 					kataKunci: ''
// 				});
// 			})
// 			.then((data: string) => {
// 				resp.status(200).send(data);
// 			})
// 			.catch((err) => {
// 				logT.log(err);
// 				resp.status(500).send('Error');
// 			});
// 	}
// 	catch (err) {
// 		logT.log(err);
// 		resp.status(500).send('Error');
// 	}
// })
exports.lapakRouter.get("/:id/barang/:barangId", (_req, resp) => {
    try {
        BarangSql_1.barangSql
            .baca({
            lapak_id: _req.params.id,
            publish: 1,
            orderDateDesc: 1,
            id: _req.params.barangId
        })
            .then((data) => {
            return Renderer_1.render.halBarang.render(_req.params.barangId, _req.params.id);
        })
            .then((data) => {
            resp.status(200).send(data);
        })
            .catch((err) => {
            TokoLog_1.logT.log(err);
            resp.status(500).send('Error');
        });
    }
    catch (err) {
        TokoLog_1.logT.log(err);
        resp.status(500).send('Error');
    }
});
