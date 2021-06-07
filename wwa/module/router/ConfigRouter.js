"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/admin/AuthController");
const Config_1 = require("../Config");
const ConfigDisk_1 = require("../ConfigDisk");
exports.configRouter = express_1.default.Router();
var router = exports.configRouter;
router.post("/baca", AuthController_1.checkAuth, (_req, resp) => {
    try {
        resp.status(200).send(Config_1.config.bacaSemua());
    }
    catch (err) {
        console.error;
        resp.status(500).send(err.message);
    }
});
router.post("/update/:id", AuthController_1.checkAuth, (req, resp) => {
    try {
        ConfigDisk_1.configDisk.update(req.body)
            .then(() => {
            resp.status(200).send('');
        }).catch((err) => {
            console.error;
            resp.status(500).send(err.message);
        });
    }
    catch (err) {
        console.error;
        resp.status(500).send(err.message);
    }
});
