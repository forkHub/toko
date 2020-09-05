"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// import { Config } from "./Config";
class Connection {
    static get connection() {
        return this._connection;
    }
    //TODO: setup withoud db on install
    static connect() {
        // console.log('connect ' + process.env.TOKO_DB_USER);
        Connection._connection = mysql_1.default.createConnection({
            host: process.env.TOKO_DB_HOST,
            user: process.env.TOKO_DB_USER,
            password: process.env.TOKO_DB_PASS,
            database: process.env.TOKO_DB_DB,
            multipleStatements: true
        });
        Connection._connection.connect((error) => {
            let msg = '';
            msg += " ||HOST " + process.env.TOKO_DB_HOST;
            msg += " ||USER " + process.env.TOKO_DB_USER;
            msg += " ||PASS " + process.env.TOKO_DB_PASS;
            msg += " ||DB " + process.env.TOKO_DB_DB;
            if (error) {
                throw new Error(error.message + msg);
                // console.log(error);
            }
            else {
                console.log('connected');
            }
        });
    }
}
exports.Connection = Connection;
// export var connection: Conne
