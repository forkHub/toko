"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const Log_1 = require("./Log");
const Config_1 = require("./Config");
class Connection {
    static get pool() {
        return Connection._pool;
    }
    static get connection() {
        return this._connection;
    }
    static getPool() {
        Log_1.logW.info('get pool');
        return new Promise((resolve, reject) => {
            Connection._pool.getConnection((err, connection) => {
                if (err) {
                    Log_1.logW.info(err.code + '/' + err.message);
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
        Log_1.logW.info('create connection');
        try {
            Connection._pool = mysql_1.default.createPool({
                host: Config_1.config.host,
                user: Config_1.config.user,
                password: Config_1.config.pass,
                database: Config_1.config.db,
                port: Config_1.config.port,
                multipleStatements: true
            });
        }
        catch (e) {
            Log_1.logW.info(e);
        }
    }
    static connect2() {
        if (Connection._connection) {
            Log_1.logW.info('already connected ');
            return;
        }
        Connection._connection = mysql_1.default.createConnection({
            host: process.env.TOKO_DB_HOST,
            user: process.env.TOKO_DB_USER,
            password: process.env.TOKO_DB_PASS,
            database: process.env.TOKO_DB_DB,
            port: 3306,
            multipleStatements: true
        });
    }
}
exports.Connection = Connection;
// export var connection: Conne
