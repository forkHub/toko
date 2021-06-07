"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Util_1 = require("../../Util");
class HalBeranda {
    render(barangAr) {
        return `
		<!DOCTYPE html>
		<html lang="id">
			<head>
				<title>${Config_1.config.namaToko} - Daftar Barang</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">

				<link href='/css/bootstrap.min.css' rel='stylesheet' />
				<link href='/css/css_admin.css' rel='stylesheet' />
				<script>let data = ${JSON.stringify(barangAr)}</script>
				<script type="module" src="/js${Util_1.Util.revisi}/penjual/PenjualPage.js?r=${Util_1.util.randId}"></script>
				
			</head> 
			<body>
				<h1>Daftar Barang</h1>
				<div class='tombol-cont'>
					<button type='button' class='btn btn-primary btn-small menu'>|||</button>
					<button type='button' class='btn btn-primary btn-small tambah'>Tambah Data</button>
					<button type='button' class='btn btn-primary btn-small lihat'>Lihat Lapak</button>
					<br/>
					<br/>
				</div>
				<div class='cont'>
				</div>
			</body>
		</html>`;
    }
}
exports.HalBeranda = HalBeranda;
