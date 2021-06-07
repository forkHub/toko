"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("../../controller/Controller");
const Util_1 = require("../../Util");
exports.lapakRouter = express_1.default.Router();
exports.lapakRouter.get("/:id", (_req, resp) => {
    try {
        Controller_1.cont.toko.lapak.renderHal(parseInt(_req.params.id))
            .then((hal) => {
            resp.status(200).send(hal);
        })
            .catch((err) => {
            Util_1.util.respError(resp, err);
        });
    }
    catch (err) {
        Util_1.util.respError(resp, err);
    }
});
