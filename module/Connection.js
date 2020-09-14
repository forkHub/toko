"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// import { Config } from "./Config";
class Connection {
    static get pool() {
        return Connection._pool;
    }
    static get connection() {
        return this._connection;
    }
    static getPool() {
        console.log('get pool');
        return new Promise((resolve, reject) => {
            Connection._pool.getConnection((err, connection) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
    //TODO: setup withoud db on install
    static connect() {
        console.log('create connection');
        // Connection._connection = mysql.createConnection({
        // 	host: process.env.TOKO_DB_HOST,
        // 	user: process.env.TOKO_DB_USER,
        // 	password: process.env.TOKO_DB_PASS,
        // 	database: process.env.TOKO_DB_DB,
        // 	port: 3306,
        // 	multipleStatements: true
        // });
        Connection._pool = mysql_1.default.createPool({
            host: process.env.TOKO_DB_HOST,
            user: process.env.TOKO_DB_USER,
            password: process.env.TOKO_DB_PASS,
            database: process.env.TOKO_DB_DB,
            port: 3306,
            multipleStatements: true
        });
        // Connection._connection.connect((error: mysql.MysqlError) => {
        // 	let msg: string = '';
        // 	msg += " ||HOST " + process.env.TOKO_DB_HOST
        // 	msg += " ||USER " + process.env.TOKO_DB_USER
        // 	msg += " ||PASS " + process.env.TOKO_DB_PASS
        // 	msg += " ||DB " + process.env.TOKO_DB_DB
        // 	if (error) {
        // 		throw new Error(error.message + msg);
        // 		// console.log(error);
        // 	}
        // 	else {
        // 		console.log('connected');
        // 	}
        // });
    }
}
exports.Connection = Connection;
// export var connection: Conne
