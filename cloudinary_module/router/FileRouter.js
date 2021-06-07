"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FileController_1 = require("../controller/FileController");
exports.fileRouter = express_1.default.Router();
exports.fileRouter.post("/baca ", (_req, resp) => {
    try {
        FileController_1.fileController.baca().then((list) => {
            list.forEach((item) => {
                item;
                //TODO:
            });
        }).catch();
    }
    catch (e) {
        console.error;
        resp.status(500).send(e);
    }
});
