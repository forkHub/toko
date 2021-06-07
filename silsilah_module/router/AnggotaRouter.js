"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
//TODO: di rubah ke baca
exports.router.post("/baru", (req, resp) => {
    try {
        req;
        resp;
    }
    catch (e) {
        console.error;
        resp.status(200).send(e.message);
    }
});
