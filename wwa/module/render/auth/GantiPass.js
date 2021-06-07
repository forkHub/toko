"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../../Util");
class GantiPass {
    render() {
        return `
		<!DOCTYPE html>
		<html lang="id">
		
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1">
		
			<link href='/css/bootstrap.min.css' rel='stylesheet' />
			<link href='/css/css_admin.css' rel='stylesheet' />
			
			<script src="/lib/md5.min.js"></script>
			<script type="module" src="/js${Util_1.Util.revisi}/auth/GantiPasswordPage.js?r=${Util_1.util.randId}"></script>
		
		</head>
		
		<body>
			<div class='container'>
				<div class='form-ganti-pass'>
					<h2>Ganti Password</h2>
					<form class='form-ganti-pass' action="" method="post">

						<div class="form-group">
							<label for="password1">Password Baru:</label>
							<input type="password" class="form-control password1" name="password1" id="password1" required value="" />
						</div>
		
						<div class="form-group">
							<label for="password2">Password Baru (ulangi):</label>
							<input type="password" class="form-control password1" name="password1" id="password1" required value="" />
						</div>

						<button type="submit" class="btn btn-primary submit">OK</button>
					</form>
				</div>
			</div>
		
		
		</body>
		
		</html>`.trimStart().trimEnd();
    }
}
exports.GantiPass = GantiPass;
