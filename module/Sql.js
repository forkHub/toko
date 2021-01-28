"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SqlBuilder {
    build(sql) {
        let hasil = '';
        hasil += 'SELECT ';
        sql.kolom.forEach((item, idx) => {
            if (idx == 0) {
                hasil += item;
            }
            else {
                hasil += ' , ' + item;
            }
        });
        if (sql.table && sql.table.nama) {
            hasil += " from " + sql.table.nama + " ";
        }
        if (sql.leftJoin) {
            sql.leftJoin.forEach((item) => {
                if (item.table && item.table.nama) {
                    hasil += ` left join ${item.table.nama} on  ${item.kolom1} ${item.opr} ${item.kolom2} `;
                }
            });
        }
        if (sql.where) {
        }
        if (sql.limit) {
            hasil += ` limit ${sql.limit} `;
        }
        if (sql.offset) {
            hasil += ` offset ${sql.offset} `;
        }
        return hasil;
    }
}
exports.sqlBuilder = new SqlBuilder();
