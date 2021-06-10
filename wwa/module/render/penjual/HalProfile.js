"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Util_1 = require("../../Util");
class Profile {
    render(penjual) {
        return `
		<!DOCTYPE html>
		<html lang="id">
			<head>
				<title>${Config_1.config.namaToko} - Daftar Barang</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">

				<link href='/css/bootstrap.min.css' rel='stylesheet' />
				<link href='/css/css_admin.css' rel='stylesheet' />
				
				<script>let data = ${JSON.stringify(penjual)}</script>
				<script type="module" src="/js${Util_1.Util.revisi}/penjual/ProfilePage.js?r=${Util_1.util.randId}"></script>
				
			</head> 
			<body>
				<div class='container'>
					<nav aria-label="breadcrumb" class="menu">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a class="beranda" href="/penjual/beranda/${penjual.id}">Beranda</a></li>
							<li class="breadcrumb-item active" aria-current="page">Profile</li>
						</ol>
					</nav>				
					<h1>Profile</h1>
					<div class='cont'>
						<p class="text-secondary mb-1 font-weight-bold">user name:</p>
						<p class="text-muted font-size-sm">${penjual.user_id}</p>					
						<p class="text-secondary mb-1 font-weight-bold">lapak:</p>
						<p class="text-muted font-size-sm">${penjual.lapak}</p>					
						<p class="text-secondary mb-1 font-weight-bold">deskripsi:</p>
						<p class="text-muted font-size-sm">${penjual.deskripsi}</p>					
						<p class="text-secondary mb-1 font-weight-bold">wa:</p>
						<p class="text-muted font-size-sm">${penjual.wa}</p>					
						<p class="text-secondary mb-1 font-weight-bold">alamat:</p>
						<p class="text-muted font-size-sm">${penjual.alamat}</p>					
						<p class="text-secondary mb-1 font-weight-bold">email:</p>
						<p class="text-muted font-size-sm">${penjual.email}</p>					
					</div>
					<div>
						<button type='button' class='btn btn-primary edit'>Edit</button>
						<button type='button' class='btn btn-primary tutup'>Tutup</button>
					</div>				
				</div>
			</body>
		</html>`;
    }
}
exports.Profile = Profile;
