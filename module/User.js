"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./Connection");
const GET_USER_SQL = `SELECT * FROM pengguna WHERE ID = ? && PASSWORD = ? LIMIT 1`;
class User {
    getUser(id, password) {
        console.log('User: getUser');
        return new Promise((resolve, reject) => {
            try {
                Connection_1.Connection.connection.query(GET_USER_SQL, [id, password], (_err, _rows) => {
                    if (_err) {
                        reject(_err.message);
                    }
                    else {
                        resolve(_rows);
                    }
                });
            }
            catch (err) {
                reject(err.message);
            }
        });
    }
}
exports.user = new User();
