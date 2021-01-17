"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../Auth");
const Config_1 = require("../Config");
const ConfigController_1 = require("../ConfigController");
const ConfigSql_1 = require("../entity/ConfigSql");
const TokoLog_1 = require("../TokoLog");
exports.configRouter = express_1.default.Router();
var router = exports.configRouter;
router.get("/simpan", Auth_1.checkAuth, (req, resp) => {
    try {
        ConfigController_1.configController.update2DbSemua().then(() => {
            resp.status(200).send('ok');
        }).catch((e) => {
            resp.status(500).send(e.message);
        });
    }
    catch (err) {
        TokoLog_1.logT.log(err);
        resp.status(500).send(err.message);
    }
});
router.post("/baca", Auth_1.checkAuth, (req, resp) => {
    try {
        resp.status(200).send(Config_1.config.bacaSemua());
    }
    catch (err) {
        TokoLog_1.logT.log(err);
        resp.status(500).send(err.message);
    }
});
router.post("/update/:id", Auth_1.checkAuth, (req, resp) => {
    try {
        ConfigSql_1.configSql.update(req.body, req.params.id)
            .then(() => {
            resp.status(200).send('');
        }).catch((err) => {
            TokoLog_1.logT.log(err);
            resp.status(500).send(err.message);
        });
    }
    catch (err) {
        TokoLog_1.logT.log(err);
        resp.status(500).send(err.message);
    }
});
router.post("/reload", Auth_1.checkAuth, (req, resp) => {
    try {
        ConfigController_1.configController.ambilDariDbSemua().then(() => {
            resp.status(200).send();
        }).catch((e) => {
            TokoLog_1.logT.log(e);
            resp.status(500).send(e.message);
        });
    }
    catch (e) {
        TokoLog_1.logT.log(e);
        resp.status(500).send(e.message);
    }
});
