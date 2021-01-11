"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./Config");
const ConfigSql_1 = require("./entity/ConfigSql");
class ConfigController {
    constructor() {
    }
    async update2DbSemua() {
        let items = Config_1.config.bacaSemua();
        for (let i = 0; i < items.length; i++) {
            await this.update2Db(items[i]);
        }
    }
    async ambilDariDbSemua() {
        let items = Config_1.config.bacaSemua();
        for (let i = 0; i < items.length; i++) {
            await this.ambilDariDb(items[i].kunci);
        }
    }
    async ambilDariDb(key) {
        let item = await ConfigSql_1.configSql.bacaKey(key);
        if (item.length > 0) {
            let konfig = Config_1.config.getSetting(key);
            konfig.deskripsi = item[0].deskripsi;
            konfig.nilai = item[0].nilai;
        }
    }
    async update2Db(item) {
        let ada = await ConfigSql_1.configSql.bacaKey(item.kunci);
        // console.log('update2db');
        // console.log(item);
        // console.log(ada);
        if (ada.length > 0) {
            await ConfigSql_1.configSql.update({
                deskripsi: item.deskripsi,
                kunci: item.kunci,
                nilai: item.nilai
            }, ada[0].id);
        }
        else {
            await ConfigSql_1.configSql.insert({
                deskripsi: item.deskripsi,
                kunci: item.kunci,
                nilai: item.nilai
            });
        }
    }
}
exports.configController = new ConfigController();
