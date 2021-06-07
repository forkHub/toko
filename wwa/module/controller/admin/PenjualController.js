"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Kons_1 = require("../../Kons");
const fs_1 = __importDefault(require("fs"));
const PenjualSql_1 = require("../../entity/admin/PenjualSql");
const Util_1 = require("../../Util");
const FileDisk_1 = require("../../FileDisk");
const Validator_1 = require("../../Validator");
const Render_1 = require("../../render/Render");
class PenjualController {
    async gambarUpload(gbrBesarNama, gbrKecilNama, dataBesar, dataKecil) {
        let buf;
        let downloadUrlBesar;
        let downloadUrlKecil;
        downloadUrlBesar = Kons_1.kons.folder_download + '/' + gbrBesarNama;
        downloadUrlKecil = Kons_1.kons.folder_download + '/' + gbrKecilNama;
        //simpan gbr besar
        buf = Buffer.from(dataBesar, 'base64');
        await this.gambarTulisDisk(Util_1.util.baseDir + Kons_1.kons.folder_upload + "/" + gbrBesarNama, buf);
        //simpan gambar kecil
        buf = Buffer.from(dataKecil, 'base64');
        await this.gambarTulisDisk(Util_1.util.baseDir + Kons_1.kons.folder_upload + "/" + gbrKecilNama, buf);
        let _rows = await PenjualSql_1.penjualSql.gambarBaru(downloadUrlBesar, downloadUrlKecil);
        return {
            baris: _rows
        };
    }
    async gambarTulisDisk(p, data) {
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(p, data, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async barangCheckPemilik(id, idPemilik) {
        let barang;
        barang = (await PenjualSql_1.penjualSql.barangBacaBuatEdit(id))[0];
        if (!barang) {
            throw Error('Barang tidak ditemukan');
        }
        if (barang.lapak_id != idPemilik) {
            throw Error('Akses tidak diperbolehkan');
        }
    }
    async barangRenderEditPage(id, idPemilik) {
        let barang;
        await (this.barangCheckPemilik(id, idPemilik));
        barang = (await PenjualSql_1.penjualSql.barangBacaBuatEdit(id))[0];
        if (!barang) {
            throw Error('Barang tidak ditemukan');
        }
        return Render_1.render.penjual.barangEdit.render(barang);
    }
    async barangEdit(data, idPemilik) {
        //sanitize
        //validate
        //validasi pemilik
        await this.barangCheckPemilik(data.id, idPemilik);
        //eksekusi
        let id = data.id;
        delete (data.id);
        await PenjualSql_1.penjualSql.barangEdit(data, id);
    }
    async barangBaru(barang) {
        //TODO: validate sanitize
        let id = (await PenjualSql_1.penjualSql.barangBaru(barang)).insertId;
        if (id <= 0) {
            throw Error('Proses Insert gagal');
        }
        return id;
    }
    async barangBaru2(barang) {
        //TODO: upload file
        //TODO: file db
        return (await PenjualSql_1.penjualSql.barangBaru(barang)).insertId;
    }
    async barangHapus(id, idFile, namaFileBesar, namaFileKecil) {
        await PenjualSql_1.penjualSql.gambarHapus(idFile).catch((err) => {
            console.error(err);
        });
        await FileDisk_1.fileDisk.hapusFile('./wwa/public/' + namaFileKecil)
            .catch((err) => {
            console.error(err);
        });
        await FileDisk_1.fileDisk.hapusFile('./wwa/public/' + namaFileBesar)
            .catch((err) => {
            console.error(err);
        });
        let hasil = await PenjualSql_1.penjualSql.barangHapus(id);
        if (hasil.affectedRows == 0) {
            console.error(hasil);
            throw Error('Tidak ada barang yang dihapus');
        }
    }
    async profileEdit(data) {
        //sanitasi
        data.alamat = Validator_1.v.sanitize(data.alamat, [Validator_1.v.SAN_ESC]);
        data.deskripsi = Validator_1.v.sanitize(data.deskripsi, [Validator_1.v.SAN_ESC]);
        data.email = Validator_1.v.sanitize(data.email, [Validator_1.v.SAN_ESC]);
        data.lapak = Validator_1.v.sanitize(data.lapak, [Validator_1.v.SAN_ESC]);
        Validator_1.v.validate(data.alamat, [], 'alamat', 1);
        Validator_1.v.validate(data.deskripsi, [], 'deskripsi', 1);
        Validator_1.v.validate(data.email, [Validator_1.v.VAL_EMAIL], 'email', 1);
        Validator_1.v.validate(data.lapak, [], 'lapak', 1);
        Validator_1.v.validate(data.wa, [Validator_1.v.VAL_ANGKA], 'wa', 1);
        Validator_1.v.validate(data.id + '', [Validator_1.v.VAL_ANGKA], 'id', 1);
        let hasil = await PenjualSql_1.penjualSql.profileEdit(data);
        if (hasil.affectedRows == 0) {
            throw Error('Tidak ada data yang diupdate');
            console.log(hasil);
            console.log(data);
        }
    }
}
exports.penjualController = new PenjualController();
