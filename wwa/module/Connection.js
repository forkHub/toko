"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const ConfigDB_1 = require("./ConfigDB");
class Connection {
    static get pool() {
        return Connection._pool;
    }
    static get connection() {
        return this._connection;
    }
    static getPool() {
        return new Promise((resolve, reject) => {
            Connection._pool.getConnection((err, connection) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
    static connect() {
        try {
            Connection._pool = mysql_1.default.createPool({
                host: ConfigDB_1.configDB.host,
                user: ConfigDB_1.configDB.user,
                password: ConfigDB_1.configDB.pass,
                database: ConfigDB_1.configDB.db,
                port: ConfigDB_1.configDB.port,
                multipleStatements: true
            });
        }
        catch (e) {
            console.error(e);
        }
    }
}
exports.Connection = Connection;
// export var connection: Conne
