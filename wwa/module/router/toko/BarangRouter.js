"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BarangSql_1 = require("../../entity/toko/BarangSql");
const Renderer_1 = require("../../render/Renderer");
exports.barangRouter = express_1.default.Router();
exports.barangRouter.get("/baca/id/:id", (req, resp) => {
    try {
        // console.log('barang router baca item ' + req.params.id);
        BarangSql_1.barangSql.bacaById(parseInt(req.params.id))
            .then((item) => {
            resp.status(200).send(Renderer_1.renderer.halBarang.render(item[0]));
        }).catch((e) => {
            console.error(e);
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
});
