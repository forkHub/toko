import express from "express";
import md5 from "blueimp-md5";

const password: string = 'Auni2020';
const md5pass: string = md5(password);

export function checkAuth(req: express.Request, resp: express.Response, next: express.NextFunction) {
	if (!req.session.statusLogin) {
		resp.status(401).send('belum login');
	}
	else if (false == req.session.statusLogin) {
		resp.status(401).send('belum login');
	}
	else {
		next();
	}
}

export var router = express.Router();

router.post("/login", (req: express.Request, resp: express.Response) => {
	try {
		if (("auni" == req.body.user_id) && (md5pass == req.body.password)) {
			req.session.statusLogin = true;
			resp.status(200).send('ok');
		}
		else {
			req.session = null;
			resp.status(401).send('gagal');
			console.log('login failed');
			console.log("user id: " + req.body.user_id);
			console.log("password: " + req.body.password);
			console.log("password server: " + md5pass);
		};

	}
	catch (e) {
		resp.status(500).send(e.message);
	}
});

router.post("/logout", (req: express.Request, resp: express.Response) => {
	try {
		req.session = null;
		resp.status(200).send('ok');
	}
	catch (e) {
		resp.status(500).send(e.message);
	}
});



