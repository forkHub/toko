"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../../Util");
class BarangEditBarang {
    render(barang) {
        barang;
        return `
		<!DOCTYPE html>
		<html lang="id">
			<head>
				<title>Edit Barang</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">

				<link href='/css/bootstrap.min.css' rel='stylesheet' />
				<link href='/css/css_admin.css' rel='stylesheet' />

				<script src="/lib/tinymce/tinymce.min.js"></script>
				<script src="/lib/load-image.all.min.js"></script>
				<script src="/lib/md5.min.js"></script>
				
				<script type="module" src="/js${Util_1.Util.revisi}/penjual/EditBarangPage.js?r=${Util_1.util.randId}"></script>
				
			</head> 
			<body>
				<div class="container">
					<h1>Edit Barang</h1>
					
					<div class='foto-cont'>
						<img src='${barang.thumb}' class='foto'>
						<button type="button" class='btn btn-primary edit-foto'>edit</button>
						<button type="button" class='btn btn-danger edit-foto'>hapus</button>
					</div>
					<hr/>

					<form action="">
						<div class="form-group">
							<label for="nama-barang">Nama:</label>
							<input type="text" class="form-control nama-barang" name="nama-barang" id="nama-barang"
								maxlength="50" placeholder="nama barang" required value="${barang.nama}" />
						</div>

						<div class="form-group deskripsi-barang">
							<label for="deskripsi-barang">Deskripsi Singkat:</label>
							<input type="text" class="form-control deskripsi-barang" name="deskripsi-barang"
								id="deskripsi-barang" placeholder="deskripsi singkat" required maxlength="128" value="${barang.deskripsi}" />
						</div>

						<div class="form-group deskripsi-barang-panjang">
							<label for="deskripsi-barang-panjang">Deskripsi Panjang:</label>
							<textarea rows="20" class="form-control" id="deskripsi-barang-panjang"
								name="deskripsi-barang-panjang" placeholder="deskripsi panjang" maxlength="500" value="${barang.deskripsi_panjang}"></textarea>
						</div>

						<div class="form-group">
							<label for="harga-barang">Harga:</label>
							<input type="text" class="form-control" id="harga-barang" name="harga-barang" required
								placeholder="Rp. 1000.000,-" value="${barang.harga}"/>
						</div>

						<div class="form-group">
							<label for="wa">WA (62xxx):</label>
							<input type="text" class="form-control" id="wa" name="wa" placeholder="6212345678" required value="${barang.wa}"/>
						</div>

						<input type="hidden" class='file_id' value="">
						<input type="hidden" class='post_id' value="">
						<input type="hidden" class='lapak_id' value="${barang.lapak_id}">
						<input type="hidden" class='publish' value="1">

						<button type="submit" class="btn btn-primary btn-sm submit tbl-blok">Publikasikan</button>
						<button type="button" class="btn btn-secondary btn-sm draft tbl-blok">Simpan Sebagai Draft</button>
						<button type="button" class="btn btn-danger btn-sm tutup tbl-blok">Batal</button>

					</form>				
				</div>

				<template>

				<div class='foto-page'>
					<div class='cont'>
						<h3>Upload Foto:</h3>
						<form>
							<input type="file" accept="">
							<br />
			
							<p class='foto'>Foto:</p>
							<div class='foto-cont'>
			
							</div>
							<p>Thumbnail:</p>
							<div class='thumb-cont'>
			
							</div>
							<br />
			
							<input type='submit' class='btn btn-primary upload' value='upload'>
							<!-- <button type="button" class='btn btn-primary rotasi'>Putar</button> -->
							<button type="button" class='btn btn-secondary tutup'>tutup</button>
						</form>

					</div>
				</div>
	
				</template>
			</body>
		</html>`;
    }
}
exports.BarangEditBarang = BarangEditBarang;
