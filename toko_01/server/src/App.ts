import express from "express";
import { Connection } from "./db/Connection";
import { router } from "./router/Barang";
import { Renderer } from "./db/Renderer";
import { router as fileRouter } from "./router/File";
import { router as authRouter } from "./router/Auth";
import { router as routerInstall } from "./router/Install";

import cookieSession from "cookie-session";
import { Server } from "http";

const app: express.Express = express();
const port: number = 3009;
Connection.connect();

app.use(express.static(__dirname + "\\public"));
app.use(express.json({ limit: '5mb' }));
app.use(cookieSession({
	name: 'toko_session',
	keys: ['Auni_202002_cookie_session']
}));

app.use("/barang", router);
app.use("/file", fileRouter);
app.use("/auth", authRouter);
app.use("/sys", routerInstall);

app.get("/toko", (_req: express.Request, _resp: express.Response) => {
	try {
		Renderer.renderHtml()
			.then((hasil: string) => {
				return Renderer.writeHtml("public/index.html", hasil)
			}).then(() => {
				_resp.status(200).redirect("/");
			}).catch((err) => {
				_resp.status(500).send(err);
			});
	}
	catch (e) {
		_resp.status(500).send(e);
	}
});

export const server: Server = app.listen(port, () => {
	console.log("app started at port " + port);
});

app.get("/shutdown", (req: express.Request, resp: express.Response) => {
	try {
		console.log('shutdown');

		Connection.connection.end((err) => {
			console.log(err.code + '/' + err.message);
		});

		resp.status(200).send('');

		server.close(() => {
			console.log('server close error');
		})

		process.kill(process.pid, 'SIGTERM');
	} catch (e) {
		console.log(e);
		resp.status(500).send(e);
	}
});

app.use((_req: express.Request, _resp: express.Response, _next: Function) => {
	console.log(_req.path);
	console.log('404');
	_resp.status(404).send('Halaman Tidak Ditemukan');
})

process.on('SIGTERM', () => {
	console.log('process on clode');
	server.close(() => {
		console.log('Process terminated')
	})
})