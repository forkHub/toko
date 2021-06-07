"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SessionData_1 = require("../../SessionData");
const AuthSql_1 = require("../../entity/admin/AuthSql");
const nodemailer_1 = __importDefault(require("nodemailer"));
const Validator_1 = require("../../Validator");
class AuthController {
    async login(userId, password) {
        let hasil = await AuthSql_1.authSql.login(userId, password);
        if (hasil.length == 0) {
            return null;
        }
        if (hasil[0].setuju == 0) {
            return null;
        }
        return {
            id: hasil[0].id,
            lapak: hasil[0].lapak,
            level: hasil[0].level,
            user_id: hasil[0].user_id,
            password: ''
        };
    }
    async daftar(data) {
        Validator_1.v.sanitize(data.alamat, [Validator_1.v.SAN_ESC]);
        Validator_1.v.validate(data.alamat, [], 'alamat', 1);
        await AuthSql_1.authSql.daftar(data);
    }
    async ganti(userId, password, password2) {
        //validasi user ada
        let anggota = await AuthSql_1.authSql.userAda(userId);
        if (anggota.length <= 0) {
            throw Error('User tidak ditemukan');
        }
        //validasi password
        if (password != password2) {
            throw Error('Password tidak sama');
        }
        if (password.length <= 0) {
            throw Error('Password tidak boleh kosong');
        }
        //validasi password regex
        //TODO:
        //execution
        await AuthSql_1.authSql.updatePassword(userId, password);
    }
    async lupa(email) {
        let userAr;
        let user;
        //check email ada
        userAr = await AuthSql_1.authSql.getByEmail(email);
        if (userAr.length == 0) {
            throw new Error('Email tidak ketemu');
        }
        //update password
        user = userAr[0];
        await AuthSql_1.authSql.updatePassword(user.id, this.buatPass());
        //send email
        var transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'mail',
                pass: 'password',
            }
        });
        var mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
        await this.sendMail(transporter, mailOptions);
    }
    async sendMail(transporter, mailOptions) {
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(new Error(error.response));
                }
                else {
                    console.log('Email sent: ' + info.response);
                    resolve();
                }
            });
        });
    }
    buatPass(pjg = 4) {
        let hasil = '';
        while (hasil.length < pjg) {
            hasil += Math.floor(Math.random() * 10);
        }
        return hasil;
    }
}
exports.authController = new AuthController();
//check auth middle ware
function checkAuth(req, resp, next) {
    if (!SessionData_1.session(req).statusLogin) {
        resp.status(401).redirect('/auth/login');
    }
    else {
        next();
    }
}
exports.checkAuth = checkAuth;
function checkPemilikGet(req, resp, next) {
    if (!((SessionData_1.session(req).id + '') == req.params.id)) {
        resp.status(401).send('belum login');
    }
    else {
        next();
    }
}
exports.checkPemilikGet = checkPemilikGet;
function checkPemilikPost(req, resp, next) {
    console.error(req.headers);
    if (!((SessionData_1.session(req).id + '') == req.headers.from)) {
        resp.status(401).send('belum login');
    }
    else {
        next();
    }
}
exports.checkPemilikPost = checkPemilikPost;
function checkAdminUser(req, resp, next) {
    let level = SessionData_1.session(req).level;
    if (level != 'admin' && level != 'user') {
        resp.status(403).send('Perintah tidak diperkenankan');
        return;
    }
    next();
}
exports.checkAdminUser = checkAdminUser;
function isAdmin(req) {
    if (SessionData_1.session(req).level != 'admin') {
        return false;
    }
    return true;
}
exports.isAdmin = isAdmin;
//check auth middle ware
function checkAdmin(req, resp, next) {
    if (SessionData_1.session(req).level != 'admin') {
        resp.status(403).send('Perintah tidak diperkenankan');
        return;
    }
    next();
}
exports.checkAdmin = checkAdmin;
function setCache(_req, resp, next) {
    resp.header("Cache-Control", "max-age=7201");
    next();
}
exports.setCache = setCache;
