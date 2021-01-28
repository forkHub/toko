"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pengguna = {
    id: "id",
    user_id: "user_id",
    lapak: "lapak",
    deskripsi: "deskripsi"
};
var tbl_file = 'FILE';
var file = {
    tabel: tbl_file,
    id: tbl_file + ".id",
    thumb: tbl_file + ".thumb",
    gbr: tbl_file + ".gbr"
};
var tbl_barang = 'BARANG';
var barang = {
    tabel: tbl_barang,
    id: tbl_barang + ".id",
    nama: tbl_barang + ".nama",
    deskripsi: tbl_barang + ".deskripsi",
    deskripsiPanjang: tbl_barang + ".deskripsi_panjang",
    fileId: tbl_barang + ".file_id",
    harga: tbl_barang + ".harga",
    wa: tbl_barang + ".wa",
    publish: tbl_barang + ".publish",
    lapakId: tbl_barang + ".lapak_id",
    lastView: tbl_barang + ".last_view"
};
exports.table = {
    pengguna: pengguna,
    barang: barang,
    file: file
};
