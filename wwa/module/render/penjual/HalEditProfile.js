"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Config");
const Util_1 = require("../../Util");
class HalEditProfile {
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
				<script type="module" src="/js${Util_1.Util.revisi}/penjual/EditProfilePage.js?r=${Util_1.util.randId}"></script>
				
			</head> 
			<body>
				<div class='container'>
					
					<nav aria-label="breadcrumb" class="menu">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a class="beranda" href="/penjual/beranda/${penjual.id}">Beranda</a></li>
							<li class="breadcrumb-item"><a class="profile" href="/penjual/profile/${penjual.id}">Profile</a></li>
							<li class="breadcrumb-item active" aria-current="page">Edit</li>
						</ol>
					</nav>		

					<h1>Edit Profile</h1>

					<div class='cont'>
						<form action="">

							<div class="form-group">
								<label for="lapak">lapak:</label>
								<input type="text" class="form-control lapak" name="lapak" id="lapak" maxlength="50" placeholder="nama lapak" required value="${penjual.lapak}"/>
							</div>

							<div class="form-group">
								<label for="deskripsi">deskripsi:</label>
								<input type="text" class="form-control deskripsi" name="deskripsi" id="deskripsi" maxlength="50" placeholder="deskripsi" required value="${penjual.deskripsi}"/>
							</div>

							<div class="form-group">
								<label for="wa">no wa:</label>
								<input type="text" class="form-control wa" name="wa" id="wa" maxlength="50" placeholder="6212345" required value="${penjual.wa}"/>
							</div>

							<div class="form-group">
								<label for="alamat">alamat:</label>
								<input type="text" class="form-control alamat" name="alamat" id="alamat" maxlength="50" placeholder="alamat" required value="${penjual.alamat}"/>
							</div>
							
							<div class="form-group">
								<label for="email">email:</label>
								<input type="email" class="form-control email" name="email" id="email" maxlength="50" placeholder="email" required value="${penjual.email}"/>
							</div>
							
							<button type="submit" class="btn btn-primary btn-sm submit tbl-blok">Simpan</button>
							<button type="batal" class="btn btn-primary btn-sm batal tbl-blok">Batal</button>
						</form
					</div>
				</div>
			</body>
		</html>`;
    }
}
exports.HalEditProfile = HalEditProfile;
