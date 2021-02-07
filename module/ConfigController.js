"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./Config");
// import { configDisk } from "./entity/ConfigDisk";
// import { IConfigDb } from "./Type";
class ConfigController {
    constructor() {
    }
    async updateDariEnv() {
        Config_1.config.updateNilai(Config_1.Config.FIRE_BASE_CONFIG, process.env[Config_1.Config.FIRE_BASE_CONFIG]);
        Config_1.config.updateNilai(Config_1.Config.FOOTER, process.env[Config_1.Config.FOOTER]);
        Config_1.config.updateNilai(Config_1.Config.JML_PER_HAL, process.env[Config_1.Config.JML_PER_HAL]);
        Config_1.config.updateNilai(Config_1.Config.MODE_DEV, process.env[Config_1.Config.MODE_DEV]);
        Config_1.config.updateNilai(Config_1.Config.NAMA_TOKO, process.env[Config_1.Config.NAMA_TOKO]);
        Config_1.config.updateNilai(Config_1.Config.NAV_CARI, process.env[Config_1.Config.NAV_CARI]);
        Config_1.config.updateNilai(Config_1.Config.NAV_LAPAK, process.env[Config_1.Config.NAV_LAPAK]);
        Config_1.config.updateNilai(Config_1.Config.NAV_LOGIN, process.env[Config_1.Config.NAV_LOGIN]);
        Config_1.config.updateNilai(Config_1.Config.TERKAIT, process.env[Config_1.Config.TERKAIT]);
        Config_1.config.updateNilai(Config_1.Config.TOKO_ID, process.env[Config_1.Config.TOKO_ID]);
        Config_1.config.updateNilai(Config_1.Config.WEBSITE, process.env[Config_1.Config.WEBSITE]);
    }
}
exports.configController = new ConfigController();
