"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const TokoLog_1 = require("./TokoLog");
// import { config } from "./Config";
const ConfigDB_1 = require("./ConfigDB");
class Connection {
    static get pool() {
        return Connection._pool;
    }
    static get connection() {
        return this._connection;
    }
    static getPool() {
        TokoLog_1.logT.log('get pool');
        return new Promise((resolve, reject) => {
            Connection._pool.getConnection((err, connection) => {
                if (err) {
                    TokoLog_1.logT.log(err.code + '/' + err.message);
                    reject(err.message);
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
    static connect() {
        TokoLog_1.logT.log('create connection 1');
        ConfigDB_1.configDB;
        try {
            TokoLog_1.logT.log('create connection start');
            Connection._pool = mysql_1.default.createPool({
                host: ConfigDB_1.configDB.host,
                user: ConfigDB_1.configDB.user,
                password: ConfigDB_1.configDB.pass,
                database: ConfigDB_1.configDB.db,
                port: ConfigDB_1.configDB.port,
                multipleStatements: true
            });
            TokoLog_1.logT.log('create connection end');
        }
        catch (e) {
            TokoLog_1.logT.log('create connection error');
            TokoLog_1.logT.log(e);
        }
        TokoLog_1.logT.log('create connection 2');
    }
}
exports.Connection = Connection;
// export var connection: Conne
