"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const Connection_1 = require("./module/Connection");
const Barang_1 = require("./module/router/Barang");
const File_1 = require("./module/router/File");
const Auth_1 = require("./module/router/Auth");
const Install_1 = require("./module/router/Install");
const TokoTest_1 = require("./module/router/TokoTest");
const Anggota_1 = require("./module/router/Anggota");
const Lapak_1 = require("./module/router/Lapak");
const TokoLog_1 = require("./module/TokoLog");
const cookie_session_1 = __importDefault(require("cookie-session"));
const Beranda_1 = require("./module/router/Beranda");
// import { routerApiBarang } from "./module/admin/router/Barang";
const Util_1 = require("./module/Util");
const Config_1 = require("./module/router/Config");
Util_1.util.buatRandom();
const app = express_1.default();
const port = 3000;
app.use(express_1.default.static(__dirname + "/public"));
app.use(express_1.default.json({ limit: '5mb' }));
app.use(cookie_session_1.default({
    name: 'toko_session',
    keys: ['Auni_202002_cookie_session']
}));
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "data:", "blob:"]
    }
}));
app.use("/barang", Barang_1.router);
// app.use("/barang", routerApiBarang); //TODO: pakai API
app.use("/file", File_1.router);
app.use("/auth", Auth_1.router);
app.use("/sys", Install_1.router);
app.use("/toko_test", TokoTest_1.router);
app.use("/anggota", Anggota_1.router);
app.use("/lapak", Lapak_1.lapakRouter);
app.use("/konfig", Config_1.configRouter);
app.use("/", Beranda_1.berandaRouter);
app.use((_req, _resp, _next) => {
    TokoLog_1.logT.log(_req.path);
    TokoLog_1.logT.log('404');
    _resp.status(404).send('Halaman Tidak Ditemukan');
});
process.on('SIGTERM', () => {
    try {
        TokoLog_1.logT.log('shutdown');
        Connection_1.Connection.pool.end((err) => {
            if (err) {
                TokoLog_1.logT.log('sql shutdown error');
                TokoLog_1.logT.log(err.sqlMessage);
            }
            else {
                TokoLog_1.logT.log('connection tutup');
            }
        });
    }
    catch (e) {
        TokoLog_1.logT.log(e);
    }
});
Connection_1.Connection.connect();
exports.server = app.listen(port, () => {
    TokoLog_1.logT.log("app started");
});
// beranda.init(app);
/*
app.get("/lapak/:lapak", (_req: express.Request, resp: express.Response) => {
    try {
        logT.log("rendar beranda lapak " + _req.params.lapak);
        barangSql.bacalapakPublish(_req.params.lapak)
            .then((data: any[]) => {
                logT.log(data);
                return render.renderBeranda(data, _req.params.lapak, false);
            })
            .then((data: string) => {
                resp.status(200).header("Cache-Control", "max-age=7200").send(data);
            })
            .catch((err) => {
                logT.log(err);
                resp.status(500).send('Error');
            });
    }
    catch (err) {
        logT.log(err);
        resp.status(500).send('Error');
    }
})

app.get("/", (_req: express.Request, resp: express.Response) => {
    try {
        barangSql.bacaPublish()
            .then((data: any[]) => {
                return render.renderBeranda(data, "", false);
            })
            .then((data: string) => {
                resp.status(200).send(data);
            })
            .then(() => {
                barangSql.updateLastViewDate();
            })
            .catch((err) => {
                logT.log(err);
                resp.status(500).send('Error');
            });
    }
    catch (err) {
        logT.log(err);
        resp.status(500).send('Error');
    }
})
*/
// app.get("/item/:id", (_req: express.Request, resp: express.Response) => {
// 	try {
// 		render.renderHalBarang(_req.params.id, "").then((hasil: string) => {
// 			resp.status(200).send(hasil);
// 		}).catch((err) => {
// 			logT.log(err);
// 			resp.status(500).send('Error');
// 		});
// 	}
// 	catch (err) {
// 		logT.log(err);
// 		resp.status(500).send('Error');
// 	}
// })
/*
app.get("/admin", (_req: express.Request, resp: express.Response) => {
    try {
        resp.sendFile(path.join('index.html'), {
            root: __dirname + '/public/admin'
        });
    }
    catch (e) {
        resp.status(500).send(e);
    }
})

app.get("/shutdown", (req: express.Request, resp: express.Response) => {
    try {
        logT.log('shutdown');

        resp.status(200).end();

        server.close((e) => {
            if (e) {
                logT.log('server close error');
                logT.log(e.message);
            } else {
                logT.log('server tutup');
            }
        })

        Connection.pool.end((err) => {
            if (err) {
                logT.log('sql shutdown error');
                logT.log(err.sqlMessage);
            }
            else {
                logT.log('connection tutup');
            }
        });

        //process.kill(process.pid, 'SIGTERM');
    } catch (e) {
        logT.log(e);
        resp.status(500).send(e);
    }
});

app.use((_req: express.Request, _resp: express.Response, _next: Function) => {
    logT.log(_req.path);
    logT.log('404');
    _resp.status(404).send('Halaman Tidak Ditemukan');
})

process.on('SIGTERM', () => {
    try {
        Connection.pool.end((err) => {
        });
    }
    catch (e) {

    }
})
*/ 
