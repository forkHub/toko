"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GantiPass_1 = require("./GantiPass");
const Login_1 = require("./Login");
const Lupa_1 = require("./Lupa");
class Auth {
    constructor() {
        this.login = new Login_1.Login();
        this.lupa = new Lupa_1.Lupa();
        this.ganti = new GantiPass_1.GantiPass();
    }
}
exports.Auth = Auth;
