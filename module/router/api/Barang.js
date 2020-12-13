"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
exports.router.post("/cari/:kataKunci", (req, resp) => {
    try {
        //TODO:
        resp.status(200).send('');
    }
    catch (err) {
        resp.status(500).send(err);
    }
});
