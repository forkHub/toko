"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.devRouter = express_1.default.Router();
// devRouter.get("/", (_req: express.Request, resp: express.Response) => {
// 	try {
// 		berandaController.beranda()
// 			.then((data: string) => {
// 				resp.status(200).send(data);
// 			})
// 			.catch((err) => {
// 				logT.log(err);
// 				resp.status(500).send(err.message);
// 			});
// 	}
// 	catch (err) {
// 		logT.log(err);
// 		resp.status(500).send(err.message);
// 	}
// })
