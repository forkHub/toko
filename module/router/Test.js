"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Log_1 = require("../Log");
exports.router = express_1.default.Router();
exports.router.get("/logm/:msg", (req, resp) => {
    try {
        Log_1.logM.log(req.params.msg);
        resp.send(Log_1.logM.logs);
    }
    catch (e) {
        console.log(e);
    }
});
