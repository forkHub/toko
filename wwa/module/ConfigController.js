"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./Config");
const ConfigDisk_1 = require("./ConfigDisk");
class ConfigController {
    constructor() {
    }
    async update2DbSemua() {
        let items = Config_1.config.bacaSemua();
        for (let i = 0; i < items.length; i++) {
            await this.updateDb(items[i]);
        }
    }
    async ambilDariDbSemua() {
        let items = Config_1.config.bacaSemua();
        for (let i = 0; i < items.length; i++) {
            await this.ambilDariDb(items[i].kunci);
        }
    }
    async ambilDariDb(key) {
        let item = await ConfigDisk_1.configDisk.bacaKey(key);
        if (item) {
            let konfig = Config_1.config.getSetting(key);
            konfig.deskripsi = item.deskripsi;
            konfig.nilai = item.nilai;
        }
    }
    async updateDb(item) {
        await ConfigDisk_1.configDisk.update({
            deskripsi: item.deskripsi,
            kunci: item.kunci,
            nilai: item.nilai
        });
    }
}
exports.configController = new ConfigController();
