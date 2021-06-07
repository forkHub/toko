"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
class ConfigEnv {
    async bacaConfig() {
        try {
            let fileString = await Util_1.util.getFileNoCache('config.json');
            let fileObj = JSON.parse(fileString);
            return fileObj;
        }
        catch (e) {
            return [];
        }
    }
    async simpanConfig(fileString) {
        Util_1.util.tulisKeFile('config.json', fileString);
    }
    async bacaKey(id) {
        let setting = await this.bacaConfig();
        for (let i = 0; i < setting.length; i++) {
            if (setting[i].kunci == id) {
                return setting[i];
            }
        }
        return null;
    }
    async update(data) {
        let setting = await this.bacaConfig();
        for (let i = 0; i < setting.length; i++) {
            if (setting[i].kunci == data.kunci) {
                setting[i].nilai = data.nilai;
                await this.simpanConfig(JSON.stringify(setting));
                return;
            }
        }
        setting.push(data);
        await this.simpanConfig(JSON.stringify(setting));
    }
}
exports.configEnv = new ConfigEnv();
