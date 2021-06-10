"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../../Util");
class Daftar {
    render() {
        return `
		<!DOCTYPE html>
		<html lang="id">
		
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1">
		
			<link href='/css/bootstrap.min.css' rel='stylesheet' />
			<link href='/css/css_admin.css' rel='stylesheet' />
			
			<script src="/lib/md5.min.js"></script>
			<script type="module" src="/js${Util_1.Util.revisi}/auth/DaftarPage.js?r=${Util_1.util.randId}"></script>
		
		</head>
		
		<body>
			<div class='container'>
				<div class='form-anggota-baru'>
					<h2>Pendaftaran Lapak</h2>
					<form class='form-lapak-baru' action="" method="post">

						<div class="form-group">
							<label for="user_id">User name (untuk login):</label>
							<input type="text" class="form-control user_id" name="user_id" autocomplete="username" id="user_id" required value="" />
						</div>
		
						<div class="form-group">
							<label for="lapak">Nama Lapak:</label>
							<input type="tex" class="form-control lapak" name="lapak" id="lapak" required value="" />
						</div>

						<div class="form-group">
							<label for="deskripsi">Deskripsi:</label>
							<input type="tex" class="form-control deskripsi" name="deskripsi" id="deskripsi" required value="" />
						</div>

						<div class="form-group">
							<label for="alamat">Alamat:</label>
							<input type="tex" class="form-control alamat" name="alamat" id="alamat" required value="" />
						</div>

						<div class="form-group">
							<label for="email">email:</label>
							<input type="email" class="form-control email" name="email" autocomplete="email" id="email" required value="" />
						</div>

						<div class="form-group">
							<label for="wa">wa:</label>
							<input type="text" class="form-control wa" name="wa" id="wa" required value="" />
						</div>

						<div class="form-group">
							<label for="password1">password:</label>
							<input type="password" class="form-control password1" name="password1" id="password1" autocomplete="new-password" required value="" />
						</div>

						<div class="form-group">
							<label for="password2">password (ulangi):</label>
							<input type="password" class="form-control password2" name="password2" id="password2" autocomplete="new-password" required value="" />
						</div>

						<button type="submit" class="btn btn-primary submit">OK</button>
					</form>
				</div>
			</div>
		
		
		</body>
		
		</html>`.trimStart().trimEnd();
    }
}
exports.Daftar = Daftar;
