"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import md5 from "blueimp-md5";
const Auth_1 = require("../Auth");
const TokoLog_1 = require("../TokoLog");
// import { Connection } from "../Connection";
// const user: string = 'auni';
// const password: string = 'Auni2020';
// const md5pass: string = md5(password);	//d3a99a8e64a10840d1f4747c5f85866e
// export function checkAuth(req: express.Request, resp: express.Response, next: express.NextFunction) {
// 	if (!req.session.statusLogin) {
// 		resp.status(401).send('belum login');
// 	}
// 	else if (false == req.session.statusLogin) {
// 		resp.status(401).send('belum login');
// 	}
// 	else {
// 		next();
// 	}
// }
exports.router = express_1.default.Router();
exports.router.post("/login", (req, resp) => {
    try {
        TokoLog_1.logT.log('login');
        Auth_1.auth.login(req.body.user_id, req.body.password).then((h) => {
            if (h) {
                req.session.statusLogin = true;
                resp.status(200).send(h);
            }
            else {
                req.session = null;
                resp.status(401).send('username/password salah');
            }
        }).catch((e) => {
            req.session = null;
            TokoLog_1.logT.log(e);
            resp.status(501).send(e.message);
        });
    }
    catch (e) {
        req.session = null;
        TokoLog_1.logT.log(e);
        resp.status(502).send(e.message);
    }
});
// router.post("/login2", (req: express.Request, resp: express.Response) => {
// 	try {
// 		if ((user == req.body.user_id) && (md5pass == req.body.password)) {
// 			req.session.statusLogin = true;
// 			resp.status(200).send('ok');
// 		}
// 		else {
// 			req.session = null;
// 			resp.status(401).send('gagal');
// 			logT.log('login failed');
// 			logT.log("user id: " + req.body.user_id);
// 			logT.log("password: " + req.body.password);
// 			logT.log("password server: " + md5pass);
// 		};
// 	}
// 	catch (e) {
// 		logT.log(e);
// 		resp.status(500).send(e.message);
// 	}
// });
exports.router.post("/logout", (req, resp) => {
    try {
        req.session = null;
        resp.status(200).send('ok');
    }
    catch (e) {
        TokoLog_1.logT.log(e);
        resp.status(500).send(e.message);
    }
});
