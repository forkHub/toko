"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class Connection {
    static get connection() {
        return this._connection;
    }
    //TODO: setup withoud db on install
    static connect() {
        Connection._connection = mysql_1.default.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DB,
            multipleStatements: true
        });
        Connection._connection.connect((error) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('connected');
            }
        });
    }
}
exports.Connection = Connection;
// export var connection: Conne
