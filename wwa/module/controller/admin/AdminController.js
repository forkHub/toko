"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dao_1 = require("../../entity/Dao");
class AdminController {
    async hapusAnggota(id) {
        let hasil = await Dao_1.dao.admin.admin.hapusAnggota(id);
        console.debug(hasil);
        await hasil;
    }
    async hapusAnggotaByUserName(userName) {
        let hasil = await Dao_1.dao.admin.admin.hapusAnggotaByUserName(userName);
        console.debug(hasil);
        await hasil;
    }
    async daftarAnggota() {
        return await Dao_1.dao.admin.admin.daftarAnggota();
    }
}
exports.AdminController = AdminController;
